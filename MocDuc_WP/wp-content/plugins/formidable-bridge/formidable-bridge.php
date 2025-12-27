<?php
/**
 * Plugin Name: Formidable Bridge API
 * Description: Cầu nối REST API để gửi Formidable entries từ trang landing public.
 * Version: 2.0
 * Author: MocDuc Team
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Khởi tạo plugin khi WordPress đã load xong
 */
class FormidableBridgeAPI {
    
    /**
     * Constructor - Khởi tạo các hook cần thiết
     */
    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
        add_action( 'init', array( $this, 'handle_cors' ) );
    }
    
    /**
     * Xử lý CORS để cho phép client gọi từ domain khác
     */
    public function handle_cors() {
        // Chỉ xử lý CORS cho REST API requests
        if ( strpos( $_SERVER['REQUEST_URI'], '/wp-json/' ) !== false ) {
            header( 'Access-Control-Allow-Origin: *' );
            header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
            header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );
            
            // Xử lý preflight OPTIONS request
            if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
                exit(0);
            }
        }
    }
    
    /**
     * Đăng ký các REST API routes
     */
    public function register_routes() {
        // Endpoint để gửi form entry
        register_rest_route( 'formidable-bridge/v1', '/submit', array(
            'methods' => 'POST',
            'callback' => array( $this, 'submit_formidable_entry' ),
            'permission_callback' => '__return_true',
            'args' => array(
                'form_id' => array(
                    'required' => true,
                    'validate_callback' => function( $param ) {
                        return is_numeric( $param ) && $param > 0;
                    },
                    'sanitize_callback' => 'absint',
                ),
                'fields' => array(
                    'required' => true,
                    'validate_callback' => function( $param ) {
                        return is_array( $param );
                    },
                ),
            ),
        ));
        
        // Endpoint để lấy thông tin form (field IDs, validation rules...)
        register_rest_route( 'formidable-bridge/v1', '/form/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array( $this, 'get_form_info' ),
            'permission_callback' => '__return_true',
            'args' => array(
                'id' => array(
                    'validate_callback' => function( $param ) {
                        return is_numeric( $param ) && $param > 0;
                    },
                    'sanitize_callback' => 'absint',
                ),
            ),
        ));
    }
    
    /**
     * Xử lý việc gửi form entry
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function submit_formidable_entry( WP_REST_Request $request ) {
        try {
            // Rate limiting cơ bản - tối đa 10 requests/phút từ 1 IP
            if ( ! $this->check_rate_limit( $_SERVER['REMOTE_ADDR'] ) ) {
                return new WP_Error( 
                    'rate_limit_exceeded', 
                    'Vượt quá giới hạn gửi form. Vui lòng thử lại sau.', 
                    array( 'status' => 429 ) 
                );
            }
            
            $params = $request->get_json_params();
            
            // Validate parameters
            if ( empty( $params['form_id'] ) || empty( $params['fields'] ) ) {
                return new WP_Error( 
                    'missing_params', 
                    'Thiếu thông tin form_id hoặc fields', 
                    array( 'status' => 400 ) 
                );
            }
            
            $form_id = absint( $params['form_id'] );
            $fields = $params['fields'];
            
            // Kiểm tra Formidable có active không
            if ( ! class_exists( 'FrmEntry' ) || ! class_exists( 'FrmForm' ) ) {
                $this->log_error( 'Formidable Forms plugin not active' );
                return new WP_Error( 
                    'formidable_missing', 
                    'Plugin Formidable Forms chưa được kích hoạt', 
                    array( 'status' => 500 ) 
                );
            }
            
            // Kiểm tra form có tồn tại không
            $form = FrmForm::getOne( $form_id );
            if ( ! $form ) {
                return new WP_Error( 
                    'form_not_found', 
                    'Không tìm thấy form với ID: ' . $form_id, 
                    array( 'status' => 404 ) 
                );
            }
            
            // Sanitize và validate fields
            $sanitized_fields = $this->sanitize_fields( $fields );
            
            // Tạo entry mới
            $entry_data = array(
    'form_id'   => $form_id,
    'item_key'  => uniqid(), // thêm khóa duy nhất
    'item_meta' => $sanitized_fields,
    // 'created_at'=> current_time( 'mysql' ,1 ),
);

            
            $entry_id = FrmEntry::create( $entry_data );
            
            if ( is_wp_error( $entry_id ) ) {
                $this->log_error( 'Failed to create entry: ' . $entry_id->get_error_message() );
                return new WP_Error( 
                    'entry_creation_failed', 
                    'Không thể tạo entry: ' . $entry_id->get_error_message(), 
                    array( 'status' => 500 ) 
                );
            }
            
            // Log successful submission
            $this->log_info( "Form entry created successfully. Entry ID: {$entry_id}, Form ID: {$form_id}" );
            
            // Chạy actions sau khi tạo entry thành công (để gửi email, webhook...)
            do_action( 'formidable_bridge_entry_created', $entry_id, $form_id, $sanitized_fields );
            
            return new WP_REST_Response( array(
                'success' => true,
                'entry_id' => $entry_id,
                'form_id' => $form_id,
                'message' => 'Form đã được gửi thành công!',
                'timestamp' => current_time( 'mysql' )
            ), 200 );
            
        } catch ( Exception $e ) {
            $this->log_error( 'Exception in submit_formidable_entry: ' . $e->getMessage() );
            return new WP_Error( 
                'internal_error', 
                'Có lỗi xảy ra khi xử lý form', 
                array( 'status' => 500 ) 
            );
        }
    }
    
    /**
     * Lấy thông tin về form (field IDs, labels...)
     * @param WP_REST_Request $request
     * @return WP_REST_Response|WP_Error
     */
    public function get_form_info( WP_REST_Request $request ) {
        $form_id = absint( $request['id'] );
        
        if ( ! class_exists( 'FrmForm' ) || ! class_exists( 'FrmField' ) ) {
            return new WP_Error( 
                'formidable_missing', 
                'Plugin Formidable Forms chưa được kích hoạt', 
                array( 'status' => 500 ) 
            );
        }
        
        $form = FrmForm::getOne( $form_id );
        if ( ! $form ) {
            return new WP_Error( 
                'form_not_found', 
                'Không tìm thấy form với ID: ' . $form_id, 
                array( 'status' => 404 ) 
            );
        }
        
        $fields = FrmField::get_all_for_form( $form_id );
        $field_info = array();
        
        foreach ( $fields as $field ) {
            $field_info[] = array(
                'id' => $field->id,
                'name' => $field->name,
                'type' => $field->type,
                'required' => $field->required == '1',
                'field_key' => $field->field_key,
                'description' => $field->description,
            );
        }
        
        return new WP_REST_Response( array(
            'form_id' => $form_id,
            'form_name' => $form->name,
            'fields' => $field_info,
            'status' => $form->status,
        ), 200 );
    }
    
    /**
     * Sanitize dữ liệu fields từ client
     * @param array $fields
     * @return array
     */
    private function sanitize_fields( $fields ) {
        $sanitized = array();
        
        foreach ( $fields as $field_id => $value ) {
            $field_id = absint( $field_id );
            
            if ( is_array( $value ) ) {
                // Xử lý checkbox, multi-select...
                $sanitized[$field_id] = array_map( 'sanitize_text_field', $value );
            } elseif ( is_string( $value ) ) {
                // Xử lý text, textarea, email...
                if ( is_email( $value ) ) {
                    $sanitized[$field_id] = sanitize_email( $value );
                } elseif ( filter_var( $value, FILTER_VALIDATE_URL ) ) {
                    $sanitized[$field_id] = esc_url_raw( $value );
                } else {
                    $sanitized[$field_id] = sanitize_textarea_field( $value );
                }
            } else {
                $sanitized[$field_id] = sanitize_text_field( $value );
            }
        }
        
        return $sanitized;
    }
    
    /**
     * Rate limiting cơ bản
     * @param string $ip
     * @return bool
     */
    private function check_rate_limit( $ip ) {
        $transient_key = 'formidable_bridge_rate_limit_' . md5( $ip );
        $requests = get_transient( $transient_key );
        
        if ( $requests === false ) {
            // Chưa có request nào từ IP này
            set_transient( $transient_key, 1, 60 ); // 60 giây
            return true;
        }
        
        if ( $requests >= 10 ) {
            // Vượt quá 10 requests trong 1 phút
            return false;
        }
        
        // Tăng counter
        set_transient( $transient_key, $requests + 1, 60 );
        return true;
    }
    
    /**
     * Log lỗi
     * @param string $message
     */
    private function log_error( $message ) {
        if ( function_exists( 'error_log' ) ) {
            error_log( '[Formidable Bridge Error] ' . $message );
        }
    }
    
    /**
     * Log thông tin
     * @param string $message
     */
    private function log_info( $message ) {
        if ( function_exists( 'error_log' ) && WP_DEBUG_LOG ) {
            error_log( '[Formidable Bridge Info] ' . $message );
        }
    }
}

// Khởi tạo plugin
new FormidableBridgeAPI();
