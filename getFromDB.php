<?php
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
define( 'BLOCK_LOAD', true );
require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php' );
require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-includes/wp-db.php' );
global $table_prefix;

$wpdb = new wpdb( DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);
$table_name = $table_prefix . 'bbcs_' . $input["name"];

echo json_encode($wpdb->get_results( "SELECT * FROM $table_name" ));