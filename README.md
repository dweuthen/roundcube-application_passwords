Application-specific passwords
==============================

This RoundCube plugin adds support for managing application-specific passwords to settings.

Installation
------------
- Clone from github:
    HOME_RC/plugins$ git clone [https://github.com/dweuthen/roundcube-application_passwords.git](https://github.com/dweuthen/roundcube-application_passwords.git) application_passwords

- Activate the plugin into HOME_RC/config/main.inc.php:
    $rcmail_config['plugins'] = array('application_passwords');


Configuration
-------------
Rename/move config.php.dist in the plugin directory to config.php

Edit config.php with you favourite text editor and adjust the parameters to your needs.

License
-------
GPLv3+

Notes
-----
Tested with RoundCube 1.0.1 on Debian Wheezy (PHP 5.4.4, MySQL 5.5.37)

Author
------
Daniel Weuthen <daniel@weuthen-net.de>
