Application Passwords Plugin for Roundcube
==========================================
This RoundCube plugin adds support for managing application-specific
passwords to Roundcube's settings task. Currently only SQL-based stores
for application-specific passwords are supported.

Application-specific passwords allow users to create a unique password for 
each application interacting with the email server. Additionally the usage 
of regular user passwords may be completely disabled for email protocols 
such as SMTP, IMAP or POP3 to lower the risk of stealing username and 
password combination by eavesdropping in insecure networks.

License
-------
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see http://www.gnu.org/licenses/.

Installation
------------
- Clone from github:
    HOME_RC/plugins$ git clone [https://github.com/dweuthen/roundcube-application_passwords.git](https://github.com/dweuthen/roundcube-application_passwords.git) application_passwords

- Activate the plugin into HOME_RC/config/main.inc.php:
    $rcmail_config['plugins'] = array('application_passwords');

Configuration
-------------
Copy config.inc.php.dist to config.inc.php and set the options as described
within the file.

The SQL queries in config.php.dist work with belows example setup.

Example Setup
-------------

This plugin has been developed on a Debian-based Exim/Dovecot email server 
where domains and users are managed in MySQL. 

Dovecot expects that user and password database lookups only return a single 
result set. Therefore salted password hashes cannot be used for application-
specific passwords, as multiple password hashes would be returned (one for 
each application). As an alternative, a strong hash function such as SHA512 
can be used to store the application-specific passwords. The used hash 
function must be supported by the SQL server as the database server has to 
apply it to the submitted plain text password in the where-clause. 

In theory other methods of storing encrypting passwords are supported but have
not been tested.

The database tables used in this example setup have been created with the 
following SQL statements:

> CREATE TABLE `users` (
>  `username` varchar(128) NOT NULL,
>  `domain` varchar(128) NOT NULL,
>  `password` varchar(255) DEFAULT NULL,
>  `uid` smallint(5) unsigned DEFAULT NULL,
>  `gid` smallint(5) unsigned DEFAULT NULL,
>  `home` varchar(255) DEFAULT NULL,
>  `mail` varchar(255) DEFAULT NULL
> ) ENGINE=InnoDB DEFAULT CHARSET=latin1 

> CREATE TABLE `applications` (
>   `username` varchar(128) NOT NULL,
>   `domain` varchar(128) NOT NULL,
>   `application` varchar(128) NOT NULL,
>   `password` varchar(255) DEFAULT NULL,
>   `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
> ) ENGINE=InnoDB DEFAULT CHARSET=latin1

In order to authenticate applications in Dovecot the following "password_query" is 
used:

> SELECT username, domain, NULL AS password, 'Y' as nopassword FROM applications WHERE username = '%n' AND domain = '%d' AND password = SHA2('%w',"512")

The "user_query" is still set to query the user table:

>  SELECT home, uid, gid FROM users WHERE username = '%n' AND domain = '%d'

Notes
-----
Tested with RoundCube 1.0.1 on Debian Wheezy (PHP 5.4.4, MySQL 5.5.37)
Parts of the code was taken from Aleksander Machniak's Password Plugin for 
Roundcube and the author was inspired by Google's implementation of 
application-specific passwords.

Author
------
Daniel Weuthen <daniel@weuthen-net.de>
