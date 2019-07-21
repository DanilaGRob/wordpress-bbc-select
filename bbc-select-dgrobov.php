<?php
/**
 * Plugin Name: BBC-Select
 * Author:  Danila Grobov
 * Description: Plugin that adds a widget to the elementor plugin that mimics the behavior of the one that bbc created - https://www.bbc.com/news/health-46865204.
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
define( 'PLUGIN_DIR', plugins_url('', __FILE__) );

function callback() {
    wp_enqueue_script( 'react_script', PLUGIN_DIR . '/dist/main.js');
    echo '<div id="app"></div>';
}
add_shortcode( 'bbc-select', 'callback');
