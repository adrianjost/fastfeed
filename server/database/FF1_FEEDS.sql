-- phpMyAdmin SQL Dump
-- version 3.5.8.1
-- http://www.phpmyadmin.net
--
-- Host: hackedit.de.mysql:3306
-- Erstellungszeit: 16. Apr 2017 um 11:08
-- Server Version: 5.5.53-MariaDB-1~wheezy
-- PHP-Version: 5.4.45-0+deb7u8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `hackedit_de`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `FF1_FEEDS`
--

CREATE TABLE IF NOT EXISTS `FF1_FEEDS` (
  `feedid` int(5) NOT NULL AUTO_INCREMENT,
  `url` varchar(2000) NOT NULL COMMENT 'Website URL',
  `feedurl` varchar(2000) NOT NULL COMMENT 'URL to RSS-Feed',
  `iconurl` varchar(2000) NOT NULL COMMENT 'URL to Favicon of Website',
  `title` varchar(64) NOT NULL COMMENT 'Name of Website',
  `description` text NOT NULL COMMENT 'Short description of Website',
  PRIMARY KEY (`feedid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Daten für Tabelle `FF1_FEEDS`
--

INSERT INTO `FF1_FEEDS` (`feedid`, `url`, `feedurl`, `iconurl`, `title`, `description`) VALUES
(1, 'https://fastwp.de', 'https://fastwp.de/feed', 'https://fastwp.de/favicon.ico', 'FastWP', 'Wordpress News, Snippets, Plugins und Tipps für eine bessere Performance. Hier findest du alles was du als Wordpress Blogger wissen musst.'),
(2, 'https://motherboard.vice.com/de', 'https://motherboard.vice.com/de/rss', 'https://vice-web-statics-cdn.vice.com/favicons/motherboard/apple-touch-icon-120x120.png', 'MOTHERBOARD (VICE)', 'The future is wonderful, the future is terrifying.'),
(3, 'https://news.vice.com/', 'https://news.vice.com/feed', 'https://news.vice.com/wp-content/themes/vicenews/assets/img/vicenews_logo_sq.jpg', 'VICE News', 'See what''s on VICE News');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
