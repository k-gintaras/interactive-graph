-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 26, 2016 at 06:15 PM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `organbathsimulation`
--
CREATE DATABASE IF NOT EXISTS `organbathsimulation` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `organbathsimulation`;

-- --------------------------------------------------------

--
-- Table structure for table `lecturerdata`
--

CREATE TABLE IF NOT EXISTS `lecturerdata` (
  `type` text NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lecturerdata`
--

INSERT INTO `lecturerdata` (`type`, `value`) VALUES
('exercisePassword', '111'),
('lecturerPassword', '111');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
  `s_id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `exercise` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`s_id`, `name`, `exercise`, `data`, `image`) VALUES
(17, 'ubaby', 'agonists', '0stringToSplitQuestions0stringToSplitQuestions0stringToSplitQuestionsFull&nbspagonist&nbspis&nbspa&nbspdrug&nbspthat&nbspproduces&nbspthe&nbspmaximum&nbsppossible&nbspeffect&nbsp(100%&nbspefficacy),&nbspwhile&nbspa&nbsppartial&nbspagonist&nbspis&nbspa&nbspdrug&nbspthat&nbspis&nbspunable&nbspto&nbspproduce&nbsp100%&nbspefficacy&nbspeven&nbspwhen&nbspall&nbspthe&nbspreceptors&nbspare&nbspoccupied.stringToSplitStudentDataAcetylcholine;0,0,0,0,0,0;0,0,0,0,0,0;0;0;0stringToSplitCompoundsMethacholine;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0;0;0stringToSplitCompoundsCarbachol;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0;0;0stringToSplitCompoundsButrylcholine;0,0,0,0,0,0,0;0,0,0,0,0,0,0;0;0;0', 'agonists/ubabyagonists.png'),
(18, 'ubaby', 'antagonist', '0,0,0,0,0,0,0,0,0,0userInputsSplitter0,0,0,0userInputsSplitter0,0,0,0userInputsSplitter0,0,0userInputsSplitter0,0,0userInputsSplitter0,0,0userInputsSplitter0,0,0userInputsSplitter0,0,0userInputsSplitter0,0,0userInputsSplitter0', 'antagonist/ubabyantagonist1.pngthisStringHasImageantagonist/ubabyantagonist2.png'),
(19, 'ubaby', 'binding-assay', '0,0,0,0,0,0,0userInputsSplitter0,0,0,0userInputTasksSplitter0,0,0,0userInputsSplitter0,0,0,0,0,0,0,0,0,0,0userInputTasksSplitter0,0,0,0,0,0,0,0,0,0,0userInputTasksSplitter0,0,0,0,0,0,0,0,0,0,0userInputsSplitter0,0,0userInputsSplitter', 'binding-assay/ubabybinding-assay1.pngthisStringHasImagebinding-assay/ubabybinding-assay2.pngthisStringHasImagebinding-assay/ubabybinding-assay3.pngthisStringHasImagebinding-assay/ubabybinding-assay4.pngthisStringHasImagebinding-assay/ubabybinding-assay5.png'),
(21, 'ubaby2', 'binding-assay', '0,0,0,0,0,0,0userInputsSplitter0,0,0,0userInputTasksSplitter0,0,0,0userInputsSplitter0,0,0,0,0,0,0,0,0,0,0userInputTasksSplitter0,0,0,0,0,0,0,0,0,0,0userInputTasksSplitter0,0,0,0,0,0,0,0,0,0,0userInputsSplitter0,0,0userInputsSplitter', 'binding-assay/ubaby2binding-assay1.pngthisStringHasImagebinding-assay/ubaby2binding-assay2.pngthisStringHasImagebinding-assay/ubaby2binding-assay3.pngthisStringHasImagebinding-assay/ubaby2binding-assay4.pngthisStringHasImagebinding-assay/ubaby2binding-assay5.png'),
(23, 'ubaby2', 'pharmacokinetics', '1,0,4,4,8,5userInputsSplitter1,9,6,1,9,3,0,1', 'pharmacokinetics/ubaby2pharmacokinetics1.pngthisStringHasImagepharmacokinetics/ubaby2pharmacokinetics2.pngthisStringHasImage');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
