<?php
add_action( 'wp_enqueue_scripts', 'your_child_theme_enqueue_styles' );

function your_child_theme_enqueue_styles()
{
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/public/script/app.css', array( 'parent-style' ), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_script( 'child-script', get_stylesheet_directory_uri() . '/public/style/app.js', array(), wp_get_theme()->get( 'Version' ), true );
}