<?php
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
define('BLOCK_LOAD', true);
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-config.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-includes/wp-db.php');
global $table_prefix;

$wpdb = new wpdb(DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);
$table_name = $table_prefix . 'bbcs_' . $input["name"];
if ($input["name"] != "food")
    echo json_encode($wpdb->get_results("SELECT * FROM $table_name"));
else {
    $food_array = $wpdb->get_results("SELECT * FROM $table_name");
    $food_array = array_map(
        function ($food_item) {
            global $wpdb;
            global $table_name;
            $food_withTypes = clone $food_item;
            $food_types = $wpdb->get_results("
                SELECT FT.id, FT.amount, FT.type, FT.foodId
                FROM " . $table_name . "_types AS FT
                INNER JOIN $table_name ON FT.foodId=$table_name.id;
            ");
            $food_withTypes->types = $food_types;
            return $food_withTypes;
        },
        $food_array
    );
    echo json_encode($food_array);
}
