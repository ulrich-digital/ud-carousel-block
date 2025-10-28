<?php

/**
 * Hilfsfunktionen für den Carousel-Block
 */

defined('ABSPATH') || exit;

/**
 * Prüft, ob der Carousel-Block im aktuellen Inhalt vorkommt.
 *
 * @param int|WP_Post|null $post Optional. Post-ID oder -Objekt. Default: aktueller Post.
 * @return bool
 */
function ud_carousel_block_has_block( $post = null ) {
    if ( ! $post ) {
        $post = get_post();
    }

    if ( ! $post instanceof WP_Post ) {
        return false;
    }

    return has_block( 'ud/carousel-block', $post->post_content );
}

/**
 * Gibt die Version des Plugins zurück (z. B. für Cache-Busting).
 *
 * @return string
 */
function ud_carousel_block_version() {
    return '1.0.0';
}
