<?php
/**
 * Plugin Name: WP-CFM Customization
 * Description: Provides customization for how the WP-CFM plugin functions on the site.
 *
 * @package  ForumOne_MuPlugins
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Use YAML for WP-CFM config files.
 *
 * @param  string $format - Default is 'json' format.
 *
 * @return string
 */
function f1_use_yaml_config_format( $format ) {
	$format = 'yaml'; // Value can be 'yaml' or 'yml'.
	return $format;
}
add_filter( 'wpcfm_config_format', 'f1_use_yaml_config_format' );

/**
 * Change the default path for the bundle files.
 *
 * @param string $config_path The filesystem path or URL for the configuration.
 *
 * @return string
 */
function f1_change_config_path( $config_path ) {

	// Check for Pantheon configuration and configure WP-CFM configuration paths for a Pantheon.
	$pantheon_config = dirname( __FILE__ ) . '/../../../pantheon.yml';
	if ( is_readable( $pantheon_config ) ) {
		$path = explode( '/', $config_path );

		// Check for Pantheon Environment and use predefined configuration.
		if ( defined( 'PANTHEON_ENVIRONMENT' ) && ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {

			// Ensure all multidev environments are seen as Dev.
			if ( ! in_array( $path[ count( $path ) - 1 ], array( 'test', 'live' ) ) ) {
				$path[ count( $path ) - 1 ] = 'dev';

				// If this is the F1 Staging or Release environment then treat as Test.
				if ( in_array( $_ENV['PANTHEON_ENVIRONMENT'], array( 'f1-stage', 'f1-release' ) ) ) {
					$path[ count( $path ) - 1 ] = 'test';
				}

				return implode( '/', $path );
			}

			return $config_path;
		}

		if ( filter_var( $config_path, FILTER_VALIDATE_URL ) ) {
			return '/private/config/' . $path[ count( $path ) - 1 ];
		}

		return dirname( __DIR__ ) . '/../private/config/' . $path[ count( $path ) - 1 ];
	}

	return $config_path;
}
add_filter( 'wpcfm_config_dir', 'f1_change_config_path' );
add_filter( 'wpcfm_config_url', 'f1_change_config_path' );

/**
 * Defines environments.
 *
 * @param array $environments - Default is an empty array [] meaning multi environment config is disabled.
 * @return array
 */
function f1_enable_multi_env( $environments ) {
	// Check for Pantheon Environment variable and use that if present.
	if ( defined( 'PANTHEON_ENVIRONMENT' ) && ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
		return $environments;
	}

	// Check for local Pantheon development Environment variable and configure for that.
	$pantheon_config = dirname( __FILE__ ) . '/../../../pantheon.yml';
	if ( ! defined( 'PANTHEON_ENVIRONMENT' ) && is_readable( $pantheon_config ) ) {
		// Define an array containing the hosting environment names.
		// Or detect these with your own code logic if all are available in `$_ENV` or `$_SERVER` super-globals.
		return array(
			'dev',
			'test',
			'live',
		);
	}

	return array(
		'dev',
		'stage',
		'prod',
	);
}
add_filter( 'wpcfm_multi_env', 'f1_enable_multi_env' );

/**
 * Determines the current WordPress environment.
 *
 * @return string
 */
function f1_get_current_environment() {

	// Check for WordPress Core environment.
	// Note: we don't use `wp_get_environment_type()` as the default is 'production' when the constant isn't set.
	if ( defined( 'WP_ENVIRONMENT_TYPE' ) && ! empty( $_ENV['WP_ENVIRONMENT_TYPE'] ) ) {
		return $_ENV['WP_ENVIRONMENT_TYPE'];
	}

	// Check for .env environment.
	if ( defined( 'WORDPRESS_ENV' ) && ! empty( $_ENV['WORDPRESS_ENV'] ) ) {
		return $_ENV['WORDPRESS_ENV'];
	}

	// Check for Pantheon Environment variable and use that if present.
	if ( defined( 'PANTHEON_ENVIRONMENT' ) && ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
		return $_ENV['PANTHEON_ENVIRONMENT'];
	}

	// Default to a Development environment.
	return 'development';

}

/**
 * Sets the current WP-CFM environment based on a database naming convention
 * or the Pantheon environment.
 *
 * @param string $env Default is an empty string ''.
 *
 * @return string
 */
function f1_set_current_env( $env ) {
	// Detect with your own code logic the current environment the WordPress site is running.
	// Generally this will be defined in a constant inside `$_ENV` or `$_SERVER` super-globals.
	$config_env = f1_get_current_environment();
	$dev_env = 'dev';
	$stage_env = 'stage';
	$prod_env = 'prod';

	// Allow changing to Test & Live configs in local development.
	$pantheon_config = dirname( __FILE__ ) . '/../../../pantheon.yml';
	if ( ( defined( 'PANTHEON_ENVIRONMENT' ) && ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) || is_readable( $pantheon_config ) ) {
		$stage_env = 'test';
		$prod_env = 'live';
	}

	$prod_aliases = array(
		'prod',
		'production',
		'www',
		'live',
	);

	$stage_aliases = array(
		'release',
		'stage',
		'staging',
		'stable',
		'test',
		'f1-main',
		'f1-release',
		'f1-stage',
		'f1-staging',
	);

	switch ( true ) {
		case ( in_array( $config_env, $prod_aliases, true ) ):
			$env = $prod_env;
			break;
		case ( in_array( $config_env, $stage_aliases, true ) ):
			$env = $stage_env;
			break;
		default:
			$env = $dev_env;
	}

	return $env;
}
add_filter( 'wpcfm_current_env', 'f1_set_current_env' );
