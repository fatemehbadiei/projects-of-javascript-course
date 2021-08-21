<?php
$q = new WP_Query( array(
    'meta_query' => array(
        'relation' => 'AND',
        'state_clause' => array(
            'key' => '_regular_price',
            'compare' => '>',
            'value' => '40',
        ),
        'city_clause' => array(
            'key' => '_stock',
            'compare' => '>',
            'value' => '100',
        ),
    ),
) );
