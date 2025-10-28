<?php

/**
 * Registrierung des Carousel-Blocks
 */

defined('ABSPATH') || exit;

function ud_register_carousel_block() {
    // Hauptblock
    register_block_type_from_metadata(__DIR__ . '/../');

    // Slide-Block (Child)
    register_block_type_from_metadata(__DIR__ . '/../blocks/slide/');
}

add_action('init', 'ud_register_carousel_block');
