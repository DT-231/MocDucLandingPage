<?php
function mytheme_enqueue_assets() {
    $theme_uri = get_template_directory_uri();
    $theme_dir = get_template_directory();

    // Lấy file CSS
    $css_files = glob($theme_dir . '/dist/assets/*.css');
    if (!empty($css_files)) {
        $css_file = basename($css_files[0]);
        wp_enqueue_style('vite-style', $theme_uri . '/dist/assets/' . $css_file, array(), filemtime($css_files[0]));
    }

    // Lấy file JS
    $js_files = glob($theme_dir . '/dist/assets/*.js');
    if (!empty($js_files)) {
        $js_file = basename($js_files[0]);
        wp_enqueue_script('vite-script', $theme_uri . '/dist/assets/' . $js_file, array(), filemtime($js_files[0]), true);
        
        // Thêm type="module" cho script
        add_filter('script_loader_tag', function($tag, $handle) {
            if ($handle === 'vite-script') {
                return str_replace('<script ', '<script type="module" ', $tag);
            }
            return $tag;
        }, 10, 2);
    }
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_assets');

// Tắt jQuery nếu không cần thiết để tránh xung đột
function remove_jquery() {
    if (!is_admin()) {
        wp_deregister_script('jquery');
    }
}
add_action('wp_enqueue_scripts', 'remove_jquery');

// Thêm theme support
function mytheme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    
    // Hỗ trợ Site Icon (Favicon) từ WordPress Customizer
    add_theme_support('custom-logo');
    add_theme_support('site-icon');
}
add_action('after_setup_theme', 'mytheme_setup');

// Tùy chỉnh favicon từ WordPress Customizer
function mytheme_custom_favicon() {
    if (has_site_icon()) {
        // WordPress sẽ tự động thêm favicon nếu đã set trong Customizer
        return;
    } else {
        // Fallback favicon nếu chưa set trong admin
        $favicon_url = get_template_directory_uri() . '/dist/assets/Logo-Bpev27Tk.png';
        echo '<link rel="icon" type="image/png" href="' . esc_url($favicon_url) . '" />' . "\n";
    }
}
add_action('wp_head', 'mytheme_custom_favicon');

// Thêm các tùy chỉnh khác vào Customizer (optional)
function mytheme_customize_register($wp_customize) {
    // Section cho thông tin công ty
    $wp_customize->add_section('company_info', array(
        'title'    => __('Thông tin Công ty', 'mytheme'),
        'priority' => 30,
    ));
    
    // Setting cho tên công ty
    $wp_customize->add_setting('company_name', array(
        'default'           => 'CÔNG TY TNHH TƯ VẤN THIẾT KẾ THI CÔNG NỘI THẤT MỘC ĐỨC',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    // Control cho tên công ty
    $wp_customize->add_control('company_name', array(
        'label'   => __('Tên Công ty', 'mytheme'),
        'section' => 'company_info',
        'type'    => 'text',
    ));
    
    // Setting cho số điện thoại
    $wp_customize->add_setting('company_phone', array(
        'default'           => '0905 300 703',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    // Control cho số điện thoại
    $wp_customize->add_control('company_phone', array(
        'label'   => __('Số điện thoại', 'mytheme'),
        'section' => 'company_info',
        'type'    => 'text',
    ));
    
    // Setting cho địa chỉ
    $wp_customize->add_setting('company_address', array(
        'default'           => '84-86 Đ. Nguyên Công Trứ, An Khê, TP. Đà Nẵng',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    // Control cho địa chỉ
    $wp_customize->add_control('company_address', array(
        'label'   => __('Địa chỉ', 'mytheme'),
        'section' => 'company_info',
        'type'    => 'textarea',
    ));
}
add_action('customize_register', 'mytheme_customize_register');

// Localize script để truyền dữ liệu từ WordPress vào React
function mytheme_localize_scripts() {
    $company_data = array(
        'name' => get_theme_mod('company_name', 'CÔNG TY TNHH TƯ VẤN THIẾT KẾ THI CÔNG NỘI THẤT MỘC ĐỨC'),
        'phone' => get_theme_mod('company_phone', '0905 300 703'),
        'address' => get_theme_mod('company_address', '84-86 Đ. Nguyên Công Trứ, An Khê, TP. Đà Nẵng'),
        'logo_url' => get_custom_logo() ? wp_get_attachment_image_url(get_theme_mod('custom_logo'), 'full') : '',
        'site_icon_url' => get_site_icon_url(),
    );
    
    wp_localize_script('vite-script', 'wpData', $company_data);
}
add_action('wp_enqueue_scripts', 'mytheme_localize_scripts', 20);

