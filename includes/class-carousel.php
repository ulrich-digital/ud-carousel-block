<?php

/**
 * Klasse für den UD Carousel Block (Swiper-Version)
 */

defined('ABSPATH') || exit;

class UD_Carousel_Block {

    /**
     * Konstruktor: hängt alle notwendigen Hooks ein.
     */
    public function __construct() {
        add_action('init', [ $this, 'register_block' ]);
    }

    /**
     * Registrierung des Blocks.
     * Nutzt die block.json im Hauptverzeichnis.
     */
    public function register_block() {
        register_block_type_from_metadata(
            plugin_dir_path(__DIR__) . '/', 
            [
                'render_callback' => [ $this, 'render' ],
            ]
        );
    }

    /**
     * Render-Callback (optional).
     * Gibt den Block-Inhalt aus, ergänzt um Wrapper und Swiper-spezifische Markup-Elemente.
     *
     * @param array  $attributes Block-Attribute aus block.json
     * @param string $content    Verschachtelte Blöcke (Slides)
     * @return string
     */
    public function render( $attributes, $content ) {
        $classes = [ 'ud-carousel-block', 'swiper' ];

        if ( ! empty( $attributes['loop'] ) ) {
            $classes[] = 'has-loop';
        }
        if ( ! empty( $attributes['pagination'] ) ) {
            $classes[] = 'has-pagination';
        }
        if ( ! empty( $attributes['navigation'] ) ) {
            $classes[] = 'has-navigation';
        }

        ob_start(); ?>
        <div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>"
             data-slides-per-view="<?php echo esc_attr( $attributes['slidesPerView'] ?? 3 ); ?>"
             data-space-between="<?php echo esc_attr( $attributes['spaceBetween'] ?? 15 ); ?>"
             data-loop="<?php echo esc_attr( $attributes['loop'] ? 'true' : 'false' ); ?>"
             data-autoplay="<?php echo esc_attr( $attributes['autoplay'] ? 'true' : 'false' ); ?>"
             data-autoplay-speed="<?php echo esc_attr( $attributes['autoplaySpeed'] ?? 3000 ); ?>"
             data-speed="<?php echo esc_attr( $attributes['speed'] ?? 300 ); ?>"
        >
            <div class="swiper-wrapper">
                <?php echo $content; ?>
            </div>

            <?php if ( ! empty( $attributes['pagination'] ) ) : ?>
                <div class="swiper-pagination"></div>
            <?php endif; ?>

            <?php if ( ! empty( $attributes['navigation'] ) ) : ?>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }
}

// Initialisieren
new UD_Carousel_Block();
