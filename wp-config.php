<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'furnituredb' );

/** MySQL database username */
define( 'DB_USER', 'mysql' );

/** MySQL database password */
define( 'DB_PASSWORD', 'mysql' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '|c*K-w}njCKF{7x^g/tPU{{yL<>??qYH4z AE^GDsl;%Bu_>>~*os$0U1gh-nC^@' );
define( 'SECURE_AUTH_KEY',  '(bTnej>[0,9!KAzh<Bqc)#6jFH?a5w&.r-U.faU^n|K63B!C_a=u=JG*sU@uTrxq' );
define( 'LOGGED_IN_KEY',    'RBY0;2-<&o]QPol*y;NoI)GlTq&I7_iNlPb@}U<2<M{Zl 9a98s>2qa#b>m+ipwG' );
define( 'NONCE_KEY',        'l=,2RB:55=ftk$tZiy>ekpmzQDm>yqOws0R:&235Fl!Z2Ht$(x.s`35HRW88wP L' );
define( 'AUTH_SALT',        'L`PKo%$4q4UUr4<mgs G28i<WR#U:lrl!Z}#.zB*rdcpW4ZdWcJh=` M@-C^x:rC' );
define( 'SECURE_AUTH_SALT', 'ka]x$<x4*:kSA=OA_+iN]Dk6HtL)@YIAhP]bVL{r;pFooTMbdnh7M`e%spq(uvF2' );
define( 'LOGGED_IN_SALT',   'kP|.f3~pYnQqc#r8~jC+(d5NC+6Pc%_1-#4~#0Mr5v{WmqBMCAA*_-8Gg/:rx>B|' );
define( 'NONCE_SALT',       'i&@_IP?+a6G1.fS`+pyE-<J.e3mWJAdm6|Zp>][!44RbY<kN0xA)@{S;t?f*Ir ~' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
