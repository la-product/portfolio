<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';


$config = require './config.php';
$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$name = htmlspecialchars(trim($_POST["name"]), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($_POST["message"]), ENT_QUOTES, 'UTF-8');

if (!preg_match("/^[a-zA-Zá-žÁ-Ž\s]+$/", $name)) {
    die("Invalid name. Only letters and spaces are allowed.");
}
if (!preg_match("/^[a-zA-Zá-žÁ-Ž\s]+$/", $name)) {
    die("Invalid name. Only letters and spaces are allowed.");
}
if (strlen($message) < 10) {
    die("Message is too short. Please enter at least 10 characters.");
}
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->Host = $config['smtp_host'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $config['smtp_port'];
    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    $mail->setFrom($email, $name);
    $mail->addAddress("dominik.kovacik@gmail.com");
    $mail->Subject = "Email from your website";
    $mail->isHTML(true);
    $mail->Body = "<p>You have received a new message from your website</p>
                    <p><strong>Name:</strong> $name</p>
                    <p><strong>Email:</strong> $email</p>
                    <p><strong>Message:</strong><br> $message</p>";
    $mail->AltBody = "You have received a new message from your website
        contact form.\n\n" .
        "Name: $name\n" .
        "Email: $email\n\n" .
        "Message:\n$message";
    $mail->send();
    header("Location: ./index.html?status=success");
    exit();
} catch (Exception $e) {
    header("Location: ./index.html?status=error");
    exit();
}
