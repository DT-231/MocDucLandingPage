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
}
add_action('after_setup_theme', 'mytheme_setup');

