<?php
// File template chính của theme
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>
  <div id="root"></div>
  
  <script>
    // Debug script để kiểm tra xem React có load được không
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM loaded');
      const rootElement = document.getElementById('root');
      if (rootElement) {
        console.log('Root element found');
      } else {
        console.error('Root element not found');
      }
    });
  </script>
  
  <?php wp_footer(); ?>
</body>
</html>


