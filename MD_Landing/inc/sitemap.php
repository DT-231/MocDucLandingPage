<?php

if (!defined('ABSPATH')) {
    exit;
}

function mocduc_sitemap_static_paths() {
    return array(
        '/',
        '/about-us',
        '/projects',
        '/services',
        '/blogs',
        '/contact',
    );
}

function mocduc_sitemap_project_url($post) {
    return home_url('/project/' . $post->ID . '/' . $post->post_name);
}

function mocduc_sitemap_blog_url($post) {
    return home_url('/blogs/' . $post->post_name);
}

function mocduc_sitemap_get_posts($post_type) {
    return get_posts(array(
        'post_type' => $post_type,
        'post_status' => 'publish',
        'numberposts' => -1,
        'orderby' => 'modified',
        'order' => 'DESC',
        'suppress_filters' => false,
    ));
}

function mocduc_sitemap_entries() {
    $entries = array();

    foreach (mocduc_sitemap_static_paths() as $path) {
        $entries[] = array(
            'loc' => home_url($path),
            'lastmod' => gmdate('c'),
            'changefreq' => $path === '/' ? 'weekly' : 'monthly',
            'priority' => $path === '/' ? '1.0' : '0.8',
        );
    }

    foreach (mocduc_sitemap_get_posts('project') as $post) {
        $entries[] = array(
            'loc' => mocduc_sitemap_project_url($post),
            'lastmod' => get_post_modified_time('c', true, $post),
            'changefreq' => 'monthly',
            'priority' => '0.8',
        );
    }

    foreach (mocduc_sitemap_get_posts(array('blogs', 'post')) as $post) {
        $entries[] = array(
            'loc' => mocduc_sitemap_blog_url($post),
            'lastmod' => get_post_modified_time('c', true, $post),
            'changefreq' => 'weekly',
            'priority' => '0.7',
        );
    }

    return $entries;
}

function mocduc_sitemap_add_rewrite_rule() {
    add_rewrite_rule('^mocduc-spa-sitemap\.xml$', 'index.php?mocduc_spa_sitemap=1', 'top');
}
add_action('init', 'mocduc_sitemap_add_rewrite_rule');

function mocduc_sitemap_add_query_var($vars) {
    $vars[] = 'mocduc_spa_sitemap';
    return $vars;
}
add_filter('query_vars', 'mocduc_sitemap_add_query_var');

function mocduc_sitemap_template_redirect() {
    if (!get_query_var('mocduc_spa_sitemap')) {
        return;
    }

    status_header(200);
    header('Content-Type: application/xml; charset=UTF-8');

    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    foreach (mocduc_sitemap_entries() as $entry) {
        echo "  <url>\n";
        echo '    <loc>' . esc_url($entry['loc']) . "</loc>\n";
        echo '    <lastmod>' . esc_html($entry['lastmod']) . "</lastmod>\n";
        echo '    <changefreq>' . esc_html($entry['changefreq']) . "</changefreq>\n";
        echo '    <priority>' . esc_html($entry['priority']) . "</priority>\n";
        echo "  </url>\n";
    }

    echo "</urlset>\n";
    exit;
}
add_action('template_redirect', 'mocduc_sitemap_template_redirect', 0);

function mocduc_sitemap_robots($output) {
    $sitemap_url = home_url('/mocduc-spa-sitemap.xml');

    if (strpos($output, $sitemap_url) !== false) {
        return $output;
    }

    return trim($output) . "\nSitemap: " . esc_url($sitemap_url) . "\n";
}
add_filter('robots_txt', 'mocduc_sitemap_robots');
