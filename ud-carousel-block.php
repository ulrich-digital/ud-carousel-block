<?php
/**
 * Plugin Name:     UD Block: Carousel
 * Description:     Ein moderner Carousel-Block auf Basis von Swiper.js
 * Version:         1.0.0
 * Author:          ulrich.digital gmbh
 * Author URI:      https://ulrich.digital/
 * License:         GPL v2 or later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     carousel-block-ud
 */

defined('ABSPATH') || exit;

// Basis-Includes
foreach ([
    'block-register.php',
    'enqueue.php',
    'helpers.php',
    'render.php',
    'class-carousel.php',
    'settings.php',
] as $file) {
    require_once __DIR__ . '/includes/' . $file;
}

// Admin-spezifische Includes
if (is_admin()) {
    foreach ([
        'class-block-filters.php',
        'class-settings-page.php',
        'class-settings-utils.php',
    ] as $file) {
        require_once __DIR__ . '/includes/admin/' . $file;
    }
}
