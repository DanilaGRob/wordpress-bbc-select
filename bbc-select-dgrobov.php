<?php
/**
 * Plugin Name: BBC-Select
 * Author:  Danila Grobov
 * Description: Plugin that adds a widget to the elementor plugin that mimics the behavior of the one that bbc created - https://www.bbc.com/news/health-46865204.
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
define( 'PLUGIN_DIR', plugins_url('', __FILE__) );

function formatConstants( $array )
{
    $constants = "";
    while ($const = current($array)) {
        $constants = $constants . 'export const ' . key($array) . ' = "' . $const . '";' . "\n";
        next($array);
    }
    return $constants;
}

$file = '../../../'. plugin_dir_path(__FILE__)  .'/constants.js';

$constants = [
    "PLUGIN_DIR" => PLUGIN_DIR
];

file_put_contents($file, formatConstants($constants));

function app() {
    wp_enqueue_script( 'react_script', PLUGIN_DIR . '/dist/app.js');
    echo '<div id="app"></div>';
}
add_shortcode( 'bbc-select', 'app');

add_action( 'admin_menu', 'admin_menu' );  
function admin(){
    wp_enqueue_media();
    wp_enqueue_script( 'react_script', PLUGIN_DIR . '/dist/admin.js');
    echo '<div id="app"></div>';
}
function admin_menu(){    
    $page_title =  'BBC-Select';   
    $menu_title = 'BBC-Select';   
    $capability = 'manage_options';
    $menu_slug  = 'bbc-select';   
    $function   = 'admin';   
    $icon_url   = 'dashicons-heart';   
    $position   = 4;    
    add_menu_page( 
        $page_title,                  
        $menu_title,                   
        $capability,                   
        $menu_slug,                   
        $function,                   
        $icon_url,                   
        $position 
    ); 
} 
function my_plugin_create_db() {
	global $wpdb;
	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

	$charset_collate = $wpdb->get_charset_collate();

	$table_name = $wpdb->prefix . 'bbcs_types';
	$sql = "CREATE TABLE $table_name (
		id varchar(255) NOT NULL,
		units varchar(255),
		typeName varchar(255),
		UNIQUE KEY id (id)
	) $charset_collate;";

	dbDelta( $sql );

	$table_name = $wpdb->prefix . 'bbcs_comps';
	$sql = "CREATE TABLE $table_name (
		id varchar(255) NOT NULL,
		image varchar(255) ,
		amount varchar(255) ,
		type varchar(255),
        description varchar(512),
		UNIQUE KEY id (id)
	) $charset_collate;";

	dbDelta( $sql );
}
register_activation_hook( __FILE__, 'my_plugin_create_db' );