<?php
require_once get_template_directory() . '/inc/seo.php';
require_once get_template_directory() . '/inc/sitemap.php';

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
        
        // Thêm defer và type="module" cho script
        add_filter('script_loader_tag', function($tag, $handle) {
            if ($handle === 'vite-script') {
                $tag = str_replace('<script ', '<script type="module" defer ', $tag);
                return $tag;
            }
            return $tag;
        }, 10, 2);
    }
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_assets');

function mytheme_enqueue_rank_math_acf_analysis($hook) {
    if (!in_array($hook, array('post.php', 'post-new.php'), true)) {
        return;
    }

    if (!function_exists('rank_math')) {
        return;
    }

    $screen = get_current_screen();
    if (!$screen || !in_array($screen->post_type, array('project', 'blogs', 'post'), true)) {
        return;
    }

    $script_path = get_template_directory() . '/assets/js/rank-math-acf-analysis.js';
    if (!file_exists($script_path)) {
        return;
    }

    wp_enqueue_script(
        'mocduc-rank-math-acf-analysis',
        get_template_directory_uri() . '/assets/js/rank-math-acf-analysis.js',
        array('wp-hooks', 'rank-math-analyzer'),
        filemtime($script_path),
        true
    );

    wp_localize_script(
        'mocduc-rank-math-acf-analysis',
        'mocducRankMathAcf',
        array(
            'postType' => $screen->post_type,
            'fields' => array(
                'project' => array(
                    'project_description',
                    'project_content',
                    'project_location',
                    'project_duration',
                    'project_budget',
                ),
                'blogs' => array(
                    'title',
                    'content_blog',
                ),
                'post' => array(
                    'title',
                    'content_blog',
                ),
            ),
        )
    );
}
add_action('admin_enqueue_scripts', 'mytheme_enqueue_rank_math_acf_analysis');

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
    
    // Setting cho email
    $wp_customize->add_setting('company_email', array(
        'default'           => 'info@mocduc.com',
        'sanitize_callback' => 'sanitize_email',
    ));
    
    // Control cho email
    $wp_customize->add_control('company_email', array(
        'label'   => __('Email', 'mytheme'),
        'section' => 'company_info',
        'type'    => 'email',
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
    // Setting cho Facebook
    $wp_customize->add_setting('company_facebook', array(
        'default'           => 'https://facebook.com/mocduc',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    // Control cho Facebook
    $wp_customize->add_control('company_facebook', array(
        'label'   => __('Facebook URL', 'mytheme'),
        'section' => 'company_info',
        'type'    => 'url',
    ));
    
    // Setting cho TikTok
    $wp_customize->add_setting('company_tiktok', array(
        'default'           => 'https://tiktok.com/@mocduc',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    // Control cho TikTok
    $wp_customize->add_control('company_tiktok', array(
        'label'   => __('TikTok URL', 'mytheme'),
        'section' => 'company_info',
        'type'    => 'url',
    ));
    
    // Setting cho Zalo
    $wp_customize->add_setting('company_zalo', array(
        'default'           => 'https://zalo.me/0905300703',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    // Control cho Zalo
    $wp_customize->add_control('company_zalo', array(
        'label'   => __('Zalo URL', 'mytheme'),
        'section' => 'company_info',
        'type'    => 'url',
    ));
    
    // Setting cho Google Site Verification
    $wp_customize->add_setting('google_site_verification', array(
        'default'           => '9u7rBdM7OEsSwoF4lSU--lxbPnLBCcm0vCI2DOvTTBo',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    // Control cho Google Site Verification
    $wp_customize->add_control('google_site_verification', array(
        'label'       => __('Google Site Verification', 'mytheme'),
        'description' => __('Nhập mã xác minh Google Site Verification', 'mytheme'),
        'section'     => 'company_info',
        'type'        => 'text',
    ));
    
    // Section cho Header Settings
    $wp_customize->add_section('header_settings', array(
        'title'    => __('Cài đặt Header', 'mytheme'),
        'priority' => 25,
    ));
    
    // Setting cho Menu Items
    $wp_customize->add_setting('header_menu_items', array(
        'default'           => json_encode([
            ['label' => 'Trang chủ', 'href' => '/'],
            ['label' => 'Giới thiệu', 'href' => '/about-us'],
            ['label' => 'Dự án', 'href' => '/projects'],
            ['label' => 'Dịch vụ', 'href' => '/services'],
            ['label' => 'Tin tức', 'href' => '/blogs'],
            ['label' => 'Liên hệ', 'href' => '/contact']
        ]),
        'sanitize_callback' => 'wp_kses_post',
    ));
    
    // Control cho Menu Items
    $wp_customize->add_control('header_menu_items', array(
        'label'       => __('Menu Items (JSON)', 'mytheme'),
        'description' => __('Định dạng: [{"label":"Tên menu","href":"/link"}]', 'mytheme'),
        'section'     => 'header_settings',
        'type'        => 'textarea',
    ));
    
    // Setting cho Header Background Color
    $wp_customize->add_setting('header_bg_color', array(
        'default'           => '#ffffff',
        'sanitize_callback' => 'sanitize_hex_color',
    ));
    
    // Control cho Header Background Color
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header_bg_color', array(
        'label'   => __('Màu nền Header', 'mytheme'),
        'section' => 'header_settings',
    )));
    
    // Setting cho Header Text Color
    $wp_customize->add_setting('header_text_color', array(
        'default'           => '#000000',
        'sanitize_callback' => 'sanitize_hex_color',
    ));
    
    // Control cho Header Text Color
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header_text_color', array(
        'label'   => __('Màu chữ Header', 'mytheme'),
        'section' => 'header_settings',
    )));
    
    // Setting cho Header Logo
    $wp_customize->add_setting('header_logo', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    // Control cho Header Logo
    $wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'header_logo', array(
        'label'     => __('Logo Header', 'mytheme'),
        'section'   => 'header_settings',
        'mime_type' => 'image',
    )));
    
    // Setting cho Header CTA Button Text
    $wp_customize->add_setting('header_cta_text', array(
        'default'           => 'Liên hệ ngay',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    // Control cho Header CTA Button Text
    $wp_customize->add_control('header_cta_text', array(
        'label'   => __('Text nút CTA', 'mytheme'),
        'section' => 'header_settings',
        'type'    => 'text',
    ));
    
    // Setting cho Header CTA Button Link
    $wp_customize->add_setting('header_cta_link', array(
        'default'           => '/contact',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    // Control cho Header CTA Button Link
    $wp_customize->add_control('header_cta_link', array(
        'label'   => __('Link nút CTA', 'mytheme'),
        'section' => 'header_settings',
        'type'    => 'url',
    ));
    
    // Setting cho Header CTA Button Color
    $wp_customize->add_setting('header_cta_color', array(
        'default'           => '#8A7258',
        'sanitize_callback' => 'sanitize_hex_color',
    ));
    
    // Control cho Header CTA Button Color
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header_cta_color', array(
        'label'   => __('Màu nút CTA', 'mytheme'),
        'section' => 'header_settings',
    )));
}
add_action('customize_register', 'mytheme_customize_register');

// Thêm meta tags cần thiết
function mytheme_head_meta_tags() {
    // Charset và viewport đã được WordPress xử lý, chỉ thêm các meta khác
    $verification_code = get_theme_mod('google_site_verification', '9u7rBdM7OEsSwoF4lSU--lxbPnLBCcm0vCI2DOvTTBo');
    if (!empty($verification_code)) {
        echo '<meta name="google-site-verification" content="' . esc_attr($verification_code) . '" />' . "\n";
    }
    
    // Thêm meta cho React app
    echo '<meta name="format-detection" content="telephone=no" />' . "\n";
}
add_action('wp_head', 'mytheme_head_meta_tags');

// Localize script để truyền dữ liệu từ WordPress vào React - cải thiện xử lý lỗi
function mytheme_localize_scripts() {
    // Đảm bảo script đã được enqueue trước khi localize
    if (!wp_script_is('vite-script', 'enqueued')) {
        return;
    }
    
    // Parse menu items từ JSON - cập nhật theo headerContext.json
    $menu_items_json = get_theme_mod('header_menu_items', json_encode([
        ['label' => 'Trang chủ', 'href' => '/'],
        ['label' => 'Về chúng tôi', 'href' => '/about-us'],
        ['label' => 'Dịch vụ', 'href' => '/services'],
        ['label' => 'Dự án', 'href' => '/projects'],
        ['label' => 'Tin tức', 'href' => '/blogs'],
        ['label' => 'Liên hệ', 'href' => '/contact']
    ]));
    
    $menu_items = json_decode($menu_items_json, true);
    if (!is_array($menu_items) || empty($menu_items)) {
        $menu_items = [
            ['label' => 'Trang chủ', 'href' => '/'],
            ['label' => 'Về chúng tôi', 'href' => '/about-us'],
            ['label' => 'Dịch vụ', 'href' => '/services'],
            ['label' => 'Dự án', 'href' => '/projects'],
            ['label' => 'Tin tức', 'href' => '/blogs'],
            ['label' => 'Liên hệ', 'href' => '/contact']
        ];
    }
    
    // Lấy logo URLs với fallback an toàn
    $custom_logo_id = get_theme_mod('custom_logo');
    $custom_logo_url = $custom_logo_id ? wp_get_attachment_image_url($custom_logo_id, 'full') : '';
    
    $header_logo_id = get_theme_mod('header_logo');
    $header_logo_url = $header_logo_id ? wp_get_attachment_url($header_logo_id) : '';
    
    $site_icon_url = get_site_icon_url();
    
    $wp_data = array(
        // Company info
        'company' => array(
            'name' => get_theme_mod('company_name', 'CÔNG TY TNHH TƯ VẤN THIẾT KẾ THI CÔNG NỘI THẤT MỘC ĐỨC'),
            'phone' => get_theme_mod('company_phone', '0905 300 703'),
            'email' => get_theme_mod('company_email', 'info@mocduc.com'),
            'address' => get_theme_mod('company_address', '84-86 Đ. Nguyên Công Trứ, An Khê, TP. Đà Nẵng'),
            'facebook' => get_theme_mod('company_facebook', 'https://facebook.com/mocduc'),
            'tiktok' => get_theme_mod('company_tiktok', 'https://tiktok.com/@mocduc'),
            'zalo' => get_theme_mod('company_zalo', 'https://zalo.me/0905300703'),
            'logo_url' => $custom_logo_url ?: '',
            'site_icon_url' => $site_icon_url ?: '',
        ),
        // Header settings
        'header' => array(
            'menu_items' => $menu_items,
            'bg_color' => get_theme_mod('header_bg_color', '#ffffff'),
            'text_color' => get_theme_mod('header_text_color', '#000000'),
            'logo_url' => $header_logo_url ?: '',
            'cta' => array(
                'text' => get_theme_mod('header_cta_text', 'Liên hệ ngay'),
                'link' => get_theme_mod('header_cta_link', '/contact'),
                'color' => get_theme_mod('header_cta_color', '#8A7258'),
            ),
        ),
        // Thêm timestamp để debug
        'timestamp' => current_time('timestamp'),
        'debug' => array(
            'theme_dir' => get_template_directory(),
            'theme_uri' => get_template_directory_uri(),
        )
    );
    
    wp_localize_script('vite-script', 'wpData', $wp_data);
}
add_action('wp_enqueue_scripts', 'mytheme_localize_scripts', 20);
