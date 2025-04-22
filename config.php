<?php

// reCaptcha Setup
// ===============

// Insert below your reCaptcha Site and Secret Keys
// Go to https://www.google.com/recaptcha/admin/create if you don't have the keys yet

$publickey = "YOUR_SITE_KEY"; // Site key
$privatekey = "YOUR_SECRET_KEY"; // Secret key

// Mail Setup
// ==========

// Sender Name and <email address> separated by space
$mail_sender = 'Support <admin@domain.com>';
// Your Email Address where new emails will be sent to
$to_email = 'example@domain.com';
// Email Subject
$mail_subject = 'Support Request';

// Email content can be modified in the sendmail.php file.

?>