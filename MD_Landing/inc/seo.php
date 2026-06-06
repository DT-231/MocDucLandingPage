<?php

if (!defined('ABSPATH')) {
    exit;
}

function mocduc_seo_get_request_path() {
    $request_uri = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '/';
    $path = wp_parse_url($request_uri, PHP_URL_PATH);
    $home_path = wp_parse_url(home_url('/'), PHP_URL_PATH);

    if (!$path) {
        return '/';
    }

    if ($home_path && $home_path !== '/' && strpos($path, $home_path) === 0) {
        $path = substr($path, strlen($home_path) - 1);
    }

    $path = '/' . ltrim($path, '/');
    return untrailingslashit($path) ?: '/';
}

function mocduc_seo_plain_text($value, $limit = 180) {
    $text = trim(preg_replace('/\s+/', ' ', wp_strip_all_tags((string) $value)));

    if (!$text) {
        return '';
    }

    if (function_exists('mb_strlen') && mb_strlen($text) > $limit) {
        return rtrim(mb_substr($text, 0, $limit - 1)) . '...';
    }

    if (strlen($text) > $limit) {
        return rtrim(substr($text, 0, $limit - 1)) . '...';
    }

    return $text;
}

function mocduc_seo_get_acf_value($field_name, $post_id) {
    if (function_exists('get_field')) {
        return get_field($field_name, $post_id);
    }

    return get_post_meta($post_id, $field_name, true);
}

function mocduc_seo_image_url($image) {
    if (is_array($image)) {
        if (!empty($image['url'])) {
            return $image['url'];
        }

        if (!empty($image['ID'])) {
            return wp_get_attachment_image_url((int) $image['ID'], 'full');
        }

        if (!empty($image['id'])) {
            return wp_get_attachment_image_url((int) $image['id'], 'full');
        }
    }

    if (is_numeric($image)) {
        return wp_get_attachment_image_url((int) $image, 'full');
    }

    if (is_string($image) && filter_var($image, FILTER_VALIDATE_URL)) {
        return $image;
    }

    return '';
}

function mocduc_seo_get_project_image($post_id) {
    $facebook_image = get_post_meta($post_id, 'rank_math_facebook_image', true);
    $twitter_image = get_post_meta($post_id, 'rank_math_twitter_image', true);

    foreach (array($facebook_image, $twitter_image) as $rank_math_image) {
        $url = mocduc_seo_image_url($rank_math_image);
        if ($url) {
            return $url;
        }
    }

    $gallery = mocduc_seo_get_acf_value('project_gallery', $post_id);

    if (is_array($gallery) && !empty($gallery)) {
        $url = mocduc_seo_image_url(reset($gallery));
        if ($url) {
            return $url;
        }
    }

    return get_the_post_thumbnail_url($post_id, 'full') ?: '';
}

function mocduc_seo_get_blog_image($post_id) {
    $facebook_image = get_post_meta($post_id, 'rank_math_facebook_image', true);
    $twitter_image = get_post_meta($post_id, 'rank_math_twitter_image', true);

    foreach (array($facebook_image, $twitter_image) as $rank_math_image) {
        $url = mocduc_seo_image_url($rank_math_image);
        if ($url) {
            return $url;
        }
    }

    $featured_image = mocduc_seo_get_acf_value('featured_image', $post_id);
    $url = mocduc_seo_image_url($featured_image);

    if ($url) {
        return $url;
    }

    return get_the_post_thumbnail_url($post_id, 'full') ?: '';
}

function mocduc_seo_default_image() {
    $site_icon = get_site_icon_url();

    if ($site_icon) {
        return $site_icon;
    }

    return get_template_directory_uri() . '/dist/assets/Logo-Bpev27Tk.png';
}

function mocduc_seo_replace_rank_math_vars($value, $post) {
    if (!$value) {
        return '';
    }

    if (class_exists('\RankMath\Helper')) {
        return \RankMath\Helper::replace_vars($value, $post);
    }

    return $value;
}

function mocduc_seo_find_post_by_slug($slug, $post_types) {
    $posts = get_posts(array(
        'name' => sanitize_title($slug),
        'post_type' => $post_types,
        'post_status' => 'publish',
        'numberposts' => 1,
        'suppress_filters' => false,
    ));

    return !empty($posts) ? $posts[0] : null;
}

function mocduc_seo_project_data($post) {
    $rank_math_title = mocduc_seo_replace_rank_math_vars(get_post_meta($post->ID, 'rank_math_title', true), $post);
    $rank_math_description = mocduc_seo_replace_rank_math_vars(get_post_meta($post->ID, 'rank_math_description', true), $post);

    $description = $rank_math_description;
    if (!$description) {
        $description = mocduc_seo_plain_text(mocduc_seo_get_acf_value('project_description', $post->ID));
    }
    if (!$description) {
        $description = mocduc_seo_plain_text(mocduc_seo_get_acf_value('project_content', $post->ID));
    }
    if (!$description) {
        $description = mocduc_seo_plain_text($post->post_content);
    }

    return array(
        'title' => mocduc_seo_plain_text($rank_math_title ?: get_the_title($post)),
        'description' => $description ?: sprintf('Du an %s cua Moc Duc.', get_the_title($post)),
        'canonical' => home_url('/project/' . $post->ID . '/' . $post->post_name),
        'image' => mocduc_seo_get_project_image($post->ID) ?: mocduc_seo_default_image(),
        'type' => 'article',
        'post' => $post,
    );
}

function mocduc_seo_blog_data($post) {
    $rank_math_title = mocduc_seo_replace_rank_math_vars(get_post_meta($post->ID, 'rank_math_title', true), $post);
    $rank_math_description = mocduc_seo_replace_rank_math_vars(get_post_meta($post->ID, 'rank_math_description', true), $post);
    $acf_title = mocduc_seo_get_acf_value('title', $post->ID);

    $description = $rank_math_description;
    if (!$description) {
        $description = mocduc_seo_plain_text(mocduc_seo_get_acf_value('content_blog', $post->ID));
    }
    if (!$description) {
        $description = mocduc_seo_plain_text($post->post_content);
    }

    return array(
        'title' => mocduc_seo_plain_text($rank_math_title ?: $acf_title ?: get_the_title($post)),
        'description' => $description ?: sprintf('Bai viet %s cua Moc Duc.', get_the_title($post)),
        'canonical' => home_url('/blogs/' . $post->post_name),
        'image' => mocduc_seo_get_blog_image($post->ID) ?: mocduc_seo_default_image(),
        'type' => 'article',
        'post' => $post,
    );
}

function mocduc_seo_static_routes() {
    return array(
        '/' => array(
            'title' => 'Moc Duc Furniture',
            'description' => 'Moc Duc chuyen tu van, thiet ke va thi cong noi that tron goi.',
            'canonical' => home_url('/'),
        ),
        '/about-us' => array(
            'title' => 'Ve chung toi',
            'description' => 'Tim hieu ve Moc Duc, don vi tu van, thiet ke va thi cong noi that.',
            'canonical' => home_url('/about-us'),
        ),
        '/projects' => array(
            'title' => 'Du an noi that',
            'description' => 'Danh sach cac du an thiet ke va thi cong noi that cua Moc Duc.',
            'canonical' => home_url('/projects'),
        ),
        '/services' => array(
            'title' => 'Dich vu',
            'description' => 'Dich vu tu van, thiet ke va thi cong noi that tron goi cua Moc Duc.',
            'canonical' => home_url('/services'),
        ),
        '/blogs' => array(
            'title' => 'Tin tuc',
            'description' => 'Tin tuc, kinh nghiem va kien thuc ve thiet ke thi cong noi that.',
            'canonical' => home_url('/blogs'),
        ),
        '/contact' => array(
            'title' => 'Lien he',
            'description' => 'Lien he Moc Duc de duoc tu van thiet ke va thi cong noi that.',
            'canonical' => home_url('/contact'),
        ),
    );
}

function mocduc_seo_get_route_data() {
    static $route_data = null;

    if ($route_data !== null) {
        return $route_data;
    }

    $path = mocduc_seo_get_request_path();
    $route_data = false;

    if (preg_match('#^/project/(\d+)(?:/([^/]+))?$#', $path, $matches)) {
        $post = get_post((int) $matches[1]);

        if ($post && $post->post_type === 'project' && $post->post_status === 'publish') {
            $route_data = mocduc_seo_project_data($post);
        }
    } elseif (preg_match('#^/blogs/([^/]+)$#', $path, $matches)) {
        $post = mocduc_seo_find_post_by_slug($matches[1], array('blogs', 'post'));

        if ($post) {
            $route_data = mocduc_seo_blog_data($post);
        }
    } else {
        $static_routes = mocduc_seo_static_routes();

        if (isset($static_routes[$path])) {
            $route_data = $static_routes[$path];
            $route_data['image'] = mocduc_seo_default_image();
            $route_data['type'] = 'website';
        }
    }

    return $route_data;
}

function mocduc_seo_force_spa_route_status() {
    if (!mocduc_seo_get_route_data()) {
        return;
    }

    global $wp_query;

    if ($wp_query && $wp_query->is_404()) {
        $wp_query->is_404 = false;
        status_header(200);
    }
}
add_action('template_redirect', 'mocduc_seo_force_spa_route_status', 0);

function mocduc_seo_filter_title($title) {
    $route_data = mocduc_seo_get_route_data();
    return $route_data && !empty($route_data['title']) ? $route_data['title'] : $title;
}
add_filter('rank_math/frontend/title', 'mocduc_seo_filter_title', 20);

function mocduc_seo_filter_description($description) {
    $route_data = mocduc_seo_get_route_data();
    return $route_data && !empty($route_data['description']) ? $route_data['description'] : $description;
}
add_filter('rank_math/frontend/description', 'mocduc_seo_filter_description', 20);

function mocduc_seo_filter_canonical($canonical) {
    $route_data = mocduc_seo_get_route_data();
    return $route_data && !empty($route_data['canonical']) ? $route_data['canonical'] : $canonical;
}
add_filter('rank_math/frontend/canonical', 'mocduc_seo_filter_canonical', 20);

function mocduc_seo_filter_og_title($title) {
    return mocduc_seo_filter_title($title);
}
add_filter('rank_math/opengraph/facebook/og_title', 'mocduc_seo_filter_og_title', 20);
add_filter('rank_math/opengraph/twitter/twitter_title', 'mocduc_seo_filter_og_title', 20);

function mocduc_seo_filter_og_description($description) {
    return mocduc_seo_filter_description($description);
}
add_filter('rank_math/opengraph/facebook/og_description', 'mocduc_seo_filter_og_description', 20);
add_filter('rank_math/opengraph/twitter/twitter_description', 'mocduc_seo_filter_og_description', 20);

function mocduc_seo_filter_og_image($image) {
    $route_data = mocduc_seo_get_route_data();
    return $route_data && !empty($route_data['image']) ? $route_data['image'] : $image;
}
add_filter('rank_math/opengraph/facebook/image', 'mocduc_seo_filter_og_image', 20);
add_filter('rank_math/opengraph/twitter/image', 'mocduc_seo_filter_og_image', 20);

function mocduc_seo_filter_og_url($url) {
    return mocduc_seo_filter_canonical($url);
}
add_filter('rank_math/opengraph/url', 'mocduc_seo_filter_og_url', 20);

function mocduc_seo_filter_og_type($type) {
    $route_data = mocduc_seo_get_route_data();
    return $route_data && !empty($route_data['type']) ? $route_data['type'] : $type;
}
add_filter('rank_math/opengraph/type', 'mocduc_seo_filter_og_type', 20);

function mocduc_seo_filter_robots($robots) {
    if (!mocduc_seo_get_route_data()) {
        return $robots;
    }

    $robots['index'] = 'index';
    $robots['follow'] = 'follow';
    return $robots;
}
add_filter('rank_math/frontend/robots', 'mocduc_seo_filter_robots', 20);
