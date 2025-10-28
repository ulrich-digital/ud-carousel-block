<?php

/**
 * Enqueue von Styles und Scripts für den Carousel-Block
 */

defined('ABSPATH') || exit;

function ud_enqueue_carousel_block_assets() {
    if (is_admin()) {
        return;
    }
}
add_action('wp_enqueue_scripts', 'ud_enqueue_carousel_block_assets');
