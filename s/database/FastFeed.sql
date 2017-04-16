-- phpMyAdmin SQL Dump
-- version 3.5.8.1
-- http://www.phpmyadmin.net
--
-- Host: hackedit.de.mysql:3306
-- Erstellungszeit: 16. Apr 2017 um 10:38
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
-- Tabellenstruktur für Tabelle `FF1_FEEDABOS`
--

CREATE TABLE IF NOT EXISTS `FF1_FEEDABOS` (
  `aboid` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  `feedid` int(5) NOT NULL,
  PRIMARY KEY (`aboid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='List of all Abos by Users' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `FF1_FEEDDATA`
--

CREATE TABLE IF NOT EXISTS `FF1_FEEDDATA` (
  `articleid` int(10) NOT NULL AUTO_INCREMENT COMMENT 'unique ID',
  `cdate` int(10) NOT NULL COMMENT 'UNIX Timestamp',
  `feedid` int(5) NOT NULL COMMENT 'related feedID from FEEDS',
  `url` varchar(1000) NOT NULL COMMENT 'URL to Article',
  `title` varchar(200) NOT NULL COMMENT 'Title of Article',
  `preview` text NOT NULL COMMENT 'Preview of Article',
  `fullarticle` text COMMENT 'Full Article',
  UNIQUE KEY (`articleid`),
  PRIMARY KEY (`url`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `FF1_FEEDS`
--

CREATE TABLE IF NOT EXISTS `FF1_FEEDS` (
  `feedid` int(5) NOT NULL AUTO_INCREMENT,
  `url` varchar(1000) NOT NULL COMMENT 'Website URL',
  `feedurl` varchar(1000) NOT NULL COMMENT 'URL to RSS-Feed',
  `iconurl` varchar(1000) NOT NULL COMMENT 'URL to Favicon of Website',
  `title` varchar(64) NOT NULL COMMENT 'Name of Website',
  `description` text NOT NULL COMMENT 'Short description of Website',
  PRIMARY KEY (`feedid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `FF1_FEEDUSERS`
--

CREATE TABLE IF NOT EXISTS `FF1_FEEDUSERS` (
  `userid` int(10) NOT NULL AUTO_INCREMENT,
  `lasuse` int(10) NOT NULL COMMENT 'Date of last Query with userid',
  PRIMARY KEY (`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
