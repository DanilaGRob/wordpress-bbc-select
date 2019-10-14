<?php
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
define('BLOCK_LOAD', true);
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-config.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-includes/wp-db.php');
global $table_prefix;
$wpdb = new wpdb(DB_USER, DB_PASSWORD, DB_NAME, DB_HOST);

function getArrayDifference($first, $second)
{
    return array_udiff($first, $second, function ($a, $b) {
        if ($a->id === $b->id) {
            return 0;
        }
        return ($a->id > $b->id) ? 1 : -1;
    });
}
function getArrayIntersection($first, $second)
{
    return  array_uintersect($first, $second, function ($a, $b) {
        $aNoId = clone ($a);
        unset($aNoId->id);
        $bNoId = clone ($b);
        unset($bNoId->id);
        if ($a->id === $b->id && ($aNoId !== $bNoId)) {
            return 0;
        }
        return ($a->id > $b->id) ? 1 : -1;
    });
}
function updateDb($array, $table_name)
{
    array_map(
        function ($object) use ($table_name) {
            global $wpdb;
            $values = "";
            var_dump($object);
            foreach ((array) get_object_vars($object) as $key => $value) {
                $values = $values . "" . $wpdb->_escape($key) . "='" . $wpdb->_escape($value) . "', ";
            }
            $values = substr($values, 0, -2);
            $wpdb->query("UPDATE $table_name SET $values WHERE id='" . $wpdb->_escape($object->id) . "'");
        },
        $array
    );
}
function insertDb($array,  $table_name)
{
    array_map(
        function ($object) use ($table_name) {
            global $wpdb;
            $values = "";
            foreach ((array) get_object_vars($object) as $value) {
                $values = $values . "'" . $wpdb->_escape($value) . "', ";
            }
            $values = substr($values, 0, -2);
            var_dump($values);
            $wpdb->query("INSERT INTO  $table_name VALUES( $values )");
        },
        $array
    );
}
function deleteDb($array, $table_name)
{
    array_map(
        function ($object) use ($table_name) {
            global $wpdb;
            $wpdb->query("DELETE FROM $table_name WHERE id='" . $wpdb->_escape($object->id) . "'");
        },
        $array
    );
}

$table_name = $table_prefix . 'bbcs_' . $input["name"];
$dbData = $wpdb->get_results("SELECT * FROM $table_name");
$formatedInput = array_map(function ($object) {
    return (object) $object;
}, $input["data"]);

if ($input["name"] != "food") {
    updateDb(getArrayIntersection($formatedInput, $dbData), $table_name);
    insertDb(getArrayDifference($formatedInput, $dbData), $table_name);
    deleteDb(getArrayDifference($dbData, $formatedInput), $table_name);
} else {
    $table_name_types = $table_name . "_types";
    $dbDataTypes = $wpdb->get_results("SELECT * FROM $table_name_types");
    $foodWithoutTypes = array_map(function ($food) {
        $foodWithout = clone ($food);
        unset($foodWithout->types);
        return $foodWithout;
    }, $formatedInput);
    $onlyTypes = [];
    array_map(function ($food) use (&$onlyTypes) {
        array_map(function ($type) use (&$onlyTypes) {
            array_push($onlyTypes, (object) $type);
        }, $food->types);
    }, $formatedInput);


    updateDb(getArrayIntersection($foodWithoutTypes, $dbData), $table_name);
    insertDb(getArrayDifference($foodWithoutTypes, $dbData), $table_name);
    deleteDb(getArrayDifference($dbData, $foodWithoutTypes), $table_name);

    updateDb(getArrayIntersection($onlyTypes, $dbDataTypes), $table_name_types);
    insertDb(getArrayDifference($onlyTypes, $dbDataTypes), $table_name_types);
    // deleteDb(getArrayDifference($dbDataTypes, $onlyTypes), $table_name_types);
}
