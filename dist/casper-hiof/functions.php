<?php
 
 /*
  * Begin Custom Functions -
  * This will be loaded directly before the parent theme functions.
  */
 
 function enqueue_child_theme_styles() {
     wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
     wp_enqueue_style( 'child-style', get_stylesheet_uri(), array('parent-style')  );
 }

 add_action( 'wp_enqueue_scripts', 'enqueue_child_theme_styles', PHP_INT_MAX);



// Function to add source sans pro to hte head
//function add_ssp_font(){
//  echo '<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">' . "\n";
//}
//
//
//
//add_action( 'wp_head', 'add_ssp_font' );



function remove_casper_scripts_actions() {
  remove_action('wp_enqueue_scripts','casper_scripts');
}

// Call remove remove_casper_scripts_actions during init
add_action('init','remove_casper_scripts_actions');



//add_action('wp_enqueue_scripts','fancy_theme_blogtitle', 3);






if ( ! function_exists( 'casper_scripts' ) ) :
/**
 * Enqueue scripts and styles.
 */
function casper_scripts_hiof() {
  wp_enqueue_style('casper-google-fonts', '//fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,700,900,400italic,700italic');
  wp_enqueue_style( 'casper-style', get_stylesheet_uri() );
  wp_enqueue_script( 'casper-index', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true );

  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
  }
}
endif; // casper_scripts
add_action( 'wp_enqueue_scripts', 'casper_scripts_hiof' );











 ?>