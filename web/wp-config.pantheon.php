<?php
/**
 * If on Pantheon.
 *
 * @package Pantheon
 */

if ( isset( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {

	$environment = $_ENV['PANTHEON_ENVIRONMENT'];

	/**
	 * Wordfence Configuration.
	 */
	define( 'WFWAF_ENABLED', false );
	define( 'WORDFENCE_DISABLE_LIVE_TRAFFIC', true );
	define( 'WFWAF_STORAGE_ENGINE', 'mysqli' );

	/**
	 * Prevent ftp_fget error on Pantheon
	 *
	 * @link https://wordpress.org/support/topic/ftp_nlist-warnings/#post-12155716
	 */
	if ( ! defined( 'FS_METHOD' ) ) {
		define( 'FS_METHOD', 'direct' );
	}

	/**
	 * Set root path
	 */
	$root_path = realpath( __DIR__ . '/..' );

	/**
	 * Include the Composer autoload
	 */
	require_once( $root_path . '/web/wp-content/vendor/autoload.php' );

	define( 'WFWAF_LOG_PATH', $root_path . '/web/wp-content/uploads/wflogs/' );

	/**
	 * Force SSL
	 */
	define( 'FORCE_SSL_ADMIN', true );

	/**
	 * Limit post revisions
	 */
	define( 'WP_POST_REVISIONS', 3 );

	// ** MySQL settings - included in the Pantheon Environment ** //
	/** The name of the database for WordPress */
	define( 'DB_NAME', $_ENV['DB_NAME'] );

	/** MySQL database username */
	define( 'DB_USER', $_ENV['DB_USER'] );

	/** MySQL database password */
	define( 'DB_PASSWORD', $_ENV['DB_PASSWORD'] );

	/** MySQL hostname; on Pantheon this includes a specific port number. */
	define( 'DB_HOST', $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT'] );

	/** Database Charset to use in creating database tables. */
	define( 'DB_CHARSET', 'utf8' );

	/** The Database Collate type. Don't change this if in doubt. */
	define( 'DB_COLLATE', '' );

	/**
	 * WordPress Database Table prefix.
	 *
	 * You can have multiple installations in one database if you give each
	 * a unique prefix. Only numbers, letters, and underscores please!
	 */
	// phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited
	$table_prefix = getenv( 'DB_PREFIX' ) !== false ? getenv( 'DB_PREFIX' ) : 'wp_';
	// phpcs:enable

	defined( 'WP_DEBUG_LOG' ) || define( 'WP_DEBUG_LOG', __DIR__ . '/wp-content/uploads/debug.log' ); // Moves the log file to a location writable while in git mode. Only works in WP 5.1.

	/**#@+
	   * Authentication Unique Keys and Salts.
	   *
	   * Change these to different unique phrases!
	   * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
	   * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
	   *
	   * Pantheon sets these values for you also. If you want to shuffle them you
	   * can do so via your dashboard.
	   *
	   * @since 2.6.0
	   */
	define( 'AUTH_KEY', $_ENV['AUTH_KEY'] );
	define( 'SECURE_AUTH_KEY', $_ENV['SECURE_AUTH_KEY'] );
	define( 'LOGGED_IN_KEY', $_ENV['LOGGED_IN_KEY'] );
	define( 'NONCE_KEY', $_ENV['NONCE_KEY'] );
	define( 'AUTH_SALT', $_ENV['AUTH_SALT'] );
	define( 'SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT'] );
	define( 'LOGGED_IN_SALT', $_ENV['LOGGED_IN_SALT'] );
	define( 'NONCE_SALT', $_ENV['NONCE_SALT'] );
	/**#@-*/

	/** A couple extra tweaks to help things run well on Pantheon. */
	if ( isset( $_SERVER['HTTP_HOST'] ) ) {
		// HTTP is still the default scheme for now.
		$scheme = 'https';
		// If we have detected that the end use is HTTPS, make sure we pass that
		// through here, so <img> tags and the like don't generate mixed-mode
		// content warnings.
		if ( isset( $_SERVER['HTTP_USER_AGENT_HTTPS'] ) && 'ON' === $_SERVER['HTTP_USER_AGENT_HTTPS'] ) {
			$scheme = 'https';
		}

		// phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		// phpcs:disable WordPress.Security.ValidatedSanitizedInput.MissingUnslash
		define( 'WP_HOME', $scheme . '://' . $_SERVER['HTTP_HOST'] );
		define( 'WP_SITEURL', $scheme . '://' . $_SERVER['HTTP_HOST'] . '/wp' );
		// phpcs:enable
	}

	// Don't show deprecations; useful under PHP 5.5.
	error_reporting( E_ALL ^ E_DEPRECATED );

	// Force the use of a safe temp directory when in a container.
	if ( defined( 'PANTHEON_BINDING' ) ) :
		define( 'WP_TEMP_DIR', sprintf( '/srv/bindings/%s/tmp', PANTHEON_BINDING ) );
	endif;

	// FS writes aren't permitted on Pantheon and with Composer, so we should let WordPress know to disable relevant UI.
	define( 'DISALLOW_FILE_EDIT', true );
	define( 'DISALLOW_FILE_MODS', true );

}
