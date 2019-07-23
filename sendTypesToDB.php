<?php
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
define( 'BLOCK_LOAD', true );
require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-config.php' );
require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-includes/wp-db.php' );
global $table_prefix;

$wpdb = new wpdb( DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);
$table_name = $table_prefix . 'bbcs_types';

$dbData = $wpdb->get_results("SELECT * FROM $table_name");
$formatedInput = array_map(function ($object) { return (object)$object; }, $input);
$itemsToDelete = array_udiff($dbData, $formatedInput, function ($a, $b) { 
    if ($a->id===$b->id) {
        return 0;
    }
    return ($a->id > $b->id)?1:-1;
});

$itemsToInsert = array_udiff($formatedInput, $dbData, function ($a, $b) { 
    if ($a->id===$b->id) {
        return 0;
    }
    return ($a->id>$b->id)?1:-1;
});

$itemsToChange = array_uintersect($formatedInput,$dbData, function ($a, $b) { 
    if ($a->id===$b->id && ($a->units !== $b->units || $a->typeName !== $b->typeName)) 
    { 
        return 0; 
    } 
    return ($a->id>$b->id)?1:-1; 
    
});

array_map( 
    function ($object) { 
        global $wpdb;
        global $table_name;
        $wpdb->query("INSERT INTO $table_name VALUES( '$object->id', '$object->units', '$object->typeName' )");
    }, 
    $itemsToInsert
);

array_map( 
    function ($object) { 
        global $wpdb; 
        global $table_name;
        $wpdb->query("UPDATE $table_name SET units='$object->units', typeName='$object->typeName' WHERE id='$object->id'"); 
    }, 
    $itemsToChange
);

array_map( 
    function ($object) {  
        global $wpdb;
        global $table_name;
        $wpdb->query("DELETE FROM $table_name WHERE id='$object->id'"); 
    }, 
    $itemsToDelete
);