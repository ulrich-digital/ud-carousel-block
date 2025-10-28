<?php

/**
 * Settings-Integration für den Carousel-Block
 */

defined('ABSPATH') || exit;

/**
 * Registriert die Admin-Klassen für den Carousel-Block.
 */
function ud_carousel_block_register_admin_settings() {
    if ( class_exists( 'Carousel_Block_Filters' ) ) {
        new Carousel_Block_Filters();
    }

    if ( class_exists( 'Carousel_Settings_Page' ) ) {
        new Carousel_Settings_Page();
    }

    if ( class_exists( 'Carousel_Settings_Utils' ) ) {
        new Carousel_Settings_Utils();
    }
}
add_action( 'init', 'ud_carousel_block_register_admin_settings' );
