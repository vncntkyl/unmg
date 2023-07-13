-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2023 at 10:02 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hr_pms`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `evaluation_form`
-- (See below for the actual view)
--
CREATE TABLE `evaluation_form` (
);

-- --------------------------------------------------------

--
-- Table structure for table `hr_color_status`
--

CREATE TABLE `hr_color_status` (
  `ID` int(11) NOT NULL,
  `range_from` decimal(10,2) NOT NULL,
  `range_to` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_color_status`
--

INSERT INTO `hr_color_status` (`ID`, `range_from`, `range_to`) VALUES
(1, 1.00, 1.75),
(2, 1.76, 2.50),
(3, 2.51, 3.25),
(4, 3.26, 4.00);

-- --------------------------------------------------------

--
-- Table structure for table `hr_company`
--

CREATE TABLE `hr_company` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_company`
--

INSERT INTO `hr_company` (`company_id`, `company_name`) VALUES
(1, 'United Neon Advertising Inc'),
(2, 'United Transit Ads Systems Inc');

-- --------------------------------------------------------

--
-- Table structure for table `hr_departments`
--

CREATE TABLE `hr_departments` (
  `department_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  `inactive` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_departments`
--

INSERT INTO `hr_departments` (`department_id`, `company_id`, `department_name`, `deleted`, `inactive`) VALUES
(1, 1, 'Information Systems and Technology Integration', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form`
--

CREATE TABLE `hr_eval_form` (
  `hr_eval_form_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `rater_1` int(11) NOT NULL,
  `rater_2` int(11) DEFAULT NULL,
  `rater_3` int(11) DEFAULT NULL,
  `recipient_signatory` varchar(255) NOT NULL,
  `ratees_comment` text NOT NULL,
  `recommendation` text NOT NULL,
  `CreationDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form`
--

INSERT INTO `hr_eval_form` (`hr_eval_form_id`, `users_id`, `rater_1`, `rater_2`, `rater_3`, `recipient_signatory`, `ratees_comment`, `recommendation`, `CreationDate`) VALUES
(1, 4, 0, 0, 0, '', '', '', '2023-06-14 09:31:01'),
(2, 5, 0, NULL, NULL, '', '', '', '2023-06-26 09:11:47');

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_fp`
--

CREATE TABLE `hr_eval_form_fp` (
  `hr_eval_form_fp_id` int(11) NOT NULL,
  `eval_form_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_fp`
--

INSERT INTO `hr_eval_form_fp` (`hr_eval_form_fp_id`, `eval_form_id`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_pillars`
--

CREATE TABLE `hr_eval_form_pillars` (
  `hr_eval_form_pillar_id` int(11) NOT NULL,
  `hr_eval_form_id` int(11) NOT NULL,
  `hr_eval_form_fp_id` int(11) NOT NULL,
  `pillar_id` int(11) NOT NULL,
  `pillar_percentage` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_pillars`
--

INSERT INTO `hr_eval_form_pillars` (`hr_eval_form_pillar_id`, `hr_eval_form_id`, `hr_eval_form_fp_id`, `pillar_id`, `pillar_percentage`) VALUES
(1, 1, 1, 1, 35),
(2, 1, 1, 2, 30),
(3, 1, 1, 3, 20),
(4, 1, 1, 4, 15),
(5, 2, 2, 1, 25),
(6, 2, 2, 2, 25),
(7, 2, 2, 3, 25),
(8, 2, 2, 4, 25);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp`
--

CREATE TABLE `hr_eval_form_sp` (
  `hr_eval_form_sp_id` int(11) NOT NULL,
  `eval_form_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp`
--

INSERT INTO `hr_eval_form_sp` (`hr_eval_form_sp_id`, `eval_form_id`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_fq`
--

CREATE TABLE `hr_eval_form_sp_fq` (
  `ID` int(11) NOT NULL,
  `results` int(11) NOT NULL,
  `remarks` text NOT NULL,
  `fq_review_date` date NOT NULL,
  `hr_eval_form_kpi_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_fq`
--

INSERT INTO `hr_eval_form_sp_fq` (`ID`, `results`, `remarks`, `fq_review_date`, `hr_eval_form_kpi_id`, `hr_eval_form_sp_id`) VALUES
(1, 1, '', '0000-00-00', 1, 1),
(2, 1, '', '0000-00-00', 2, 1),
(3, 1, '', '0000-00-00', 3, 1),
(4, 1, '', '0000-00-00', 4, 1),
(5, 1, '', '0000-00-00', 5, 1),
(6, 1, '', '0000-00-00', 6, 1),
(7, 1, '', '0000-00-00', 7, 1),
(8, 1, '', '0000-00-00', 8, 1),
(9, 1, '', '0000-00-00', 9, 1),
(10, 1, '', '0000-00-00', 10, 2),
(11, 1, '', '0000-00-00', 11, 2),
(12, 1, '', '0000-00-00', 12, 2),
(13, 1, '', '0000-00-00', 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_fq_rating`
--

CREATE TABLE `hr_eval_form_sp_fq_rating` (
  `fq_rating_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL,
  `ratee_achievement` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_fq_rating`
--

INSERT INTO `hr_eval_form_sp_fq_rating` (`fq_rating_id`, `hr_eval_form_sp_id`, `ratee_achievement`) VALUES
(1, 1, 'Hello this is Norvin and these are my achievements on First Quarter:'),
(2, 2, 'Hello this is Russel and these are my achievements on First Quarter:');

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_myr`
--

CREATE TABLE `hr_eval_form_sp_myr` (
  `ID` int(11) NOT NULL,
  `results` int(11) NOT NULL,
  `status` text NOT NULL,
  `remarks` text NOT NULL,
  `myr_review_date` date NOT NULL,
  `hr_eval_form_kpi_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_myr`
--

INSERT INTO `hr_eval_form_sp_myr` (`ID`, `results`, `status`, `remarks`, `myr_review_date`, `hr_eval_form_kpi_id`, `hr_eval_form_sp_id`) VALUES
(1, 2, '', '', '0000-00-00', 1, 1),
(2, 2, '', '', '0000-00-00', 2, 1),
(3, 2, '', '', '0000-00-00', 3, 1),
(4, 2, '', '', '0000-00-00', 4, 1),
(5, 2, '', '', '0000-00-00', 5, 1),
(6, 2, '', '', '0000-00-00', 6, 1),
(7, 2, '', '', '0000-00-00', 7, 1),
(8, 2, '', '', '0000-00-00', 8, 1),
(9, 2, '', '', '0000-00-00', 9, 1),
(10, 0, '', '', '0000-00-00', 10, 2),
(11, 0, '', '', '0000-00-00', 11, 2),
(12, 0, '', '', '0000-00-00', 12, 2),
(13, 0, '', '', '0000-00-00', 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_myr_rating`
--

CREATE TABLE `hr_eval_form_sp_myr_rating` (
  `myr_rating_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL,
  `ratee_achievement` text NOT NULL,
  `actions_to_address` text NOT NULL,
  `rater_1` int(11) DEFAULT NULL,
  `rater_2` int(11) DEFAULT NULL,
  `rater_3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_myr_rating`
--

INSERT INTO `hr_eval_form_sp_myr_rating` (`myr_rating_id`, `hr_eval_form_sp_id`, `ratee_achievement`, `actions_to_address`, `rater_1`, `rater_2`, `rater_3`) VALUES
(1, 1, 'Hello this is Norvin and these are my achievements on midyear:\nSleep', '', NULL, NULL, NULL),
(4, 2, 'dgfdfgddf', '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_pillar_ratings`
--

CREATE TABLE `hr_eval_form_sp_pillar_ratings` (
  `eval_form_sp_pillar_ratings_id` int(11) NOT NULL,
  `eval_form_pillars_id` int(11) NOT NULL,
  `firstQuarterTotalResult` decimal(10,2) NOT NULL,
  `midYearTotalResult` decimal(10,2) NOT NULL,
  `ThirdQuarterTotalResult` decimal(10,2) NOT NULL,
  `fourthQuarterTotalResult` decimal(10,2) DEFAULT NULL COMMENT 'for Probationary',
  `YearEndTotalResult` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_pillar_ratings`
--

INSERT INTO `hr_eval_form_sp_pillar_ratings` (`eval_form_sp_pillar_ratings_id`, `eval_form_pillars_id`, `firstQuarterTotalResult`, `midYearTotalResult`, `ThirdQuarterTotalResult`, `fourthQuarterTotalResult`, `YearEndTotalResult`) VALUES
(1, 1, 4.00, 3.00, 3.00, NULL, 3.00),
(2, 2, 3.00, 3.00, 3.00, NULL, 3.00),
(3, 3, 2.50, 2.50, 2.50, NULL, 2.50),
(4, 4, 2.40, 4.20, 2.50, NULL, 2.50);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_quarterly_ratings`
--

CREATE TABLE `hr_eval_form_sp_quarterly_ratings` (
  `quarterly_ratings_id` int(11) NOT NULL,
  `eval_form_id` int(11) NOT NULL,
  `FirstQuarterRating` decimal(10,2) NOT NULL,
  `MidYearRating` decimal(10,2) NOT NULL,
  `ThirdQuarterRating` decimal(10,2) NOT NULL,
  `FourthQuarterRating` decimal(10,2) DEFAULT NULL COMMENT 'for Probationary',
  `YearEndRating` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_quarterly_ratings`
--

INSERT INTO `hr_eval_form_sp_quarterly_ratings` (`quarterly_ratings_id`, `eval_form_id`, `FirstQuarterRating`, `MidYearRating`, `ThirdQuarterRating`, `FourthQuarterRating`, `YearEndRating`) VALUES
(1, 3, 3.16, 3.00, 4.00, NULL, 1.00),
(2, 4, 2.36, 1.25, 1.55, 1.79, 2.00),
(3, 5, 3.30, 3.50, 3.70, NULL, 3.90);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_tq`
--

CREATE TABLE `hr_eval_form_sp_tq` (
  `ID` int(11) NOT NULL,
  `results` int(11) NOT NULL,
  `remarks` text NOT NULL,
  `tq_review_date` date NOT NULL,
  `hr_eval_form_kpi_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_tq`
--

INSERT INTO `hr_eval_form_sp_tq` (`ID`, `results`, `remarks`, `tq_review_date`, `hr_eval_form_kpi_id`, `hr_eval_form_sp_id`) VALUES
(1, 3, '', '0000-00-00', 1, 1),
(2, 3, '', '0000-00-00', 2, 1),
(3, 3, '', '0000-00-00', 3, 1),
(4, 3, '', '0000-00-00', 4, 1),
(5, 3, '', '0000-00-00', 5, 1),
(6, 3, '', '0000-00-00', 6, 1),
(7, 3, '', '0000-00-00', 7, 1),
(8, 3, '', '0000-00-00', 8, 1),
(9, 3, '', '0000-00-00', 9, 1),
(10, 0, '', '0000-00-00', 10, 2),
(11, 0, '', '0000-00-00', 11, 2),
(12, 0, '', '0000-00-00', 12, 2),
(13, 0, '', '0000-00-00', 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_tq_rating`
--

CREATE TABLE `hr_eval_form_sp_tq_rating` (
  `tq_rating_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL,
  `ratee_achievement` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_tq_rating`
--

INSERT INTO `hr_eval_form_sp_tq_rating` (`tq_rating_id`, `hr_eval_form_sp_id`, `ratee_achievement`) VALUES
(1, 1, 'Hello this is Norvin and these are my achievements on Third Quarter:\r\n'),
(2, 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_yee`
--

CREATE TABLE `hr_eval_form_sp_yee` (
  `ID` int(11) NOT NULL,
  `results` int(11) NOT NULL,
  `remarks` text NOT NULL,
  `agreed_rating` decimal(10,0) NOT NULL,
  `wtd_rating` decimal(10,0) NOT NULL,
  `yee_review_date` date NOT NULL,
  `hr_eval_form_kpi_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_yee`
--

INSERT INTO `hr_eval_form_sp_yee` (`ID`, `results`, `remarks`, `agreed_rating`, `wtd_rating`, `yee_review_date`, `hr_eval_form_kpi_id`, `hr_eval_form_sp_id`) VALUES
(1, 4, 'Voluptates reprehenderit debitis', 0, 0, '0000-00-00', 1, 1),
(2, 4, 'Voluptates reprehenderit debitis', 0, 0, '0000-00-00', 2, 1),
(3, 4, 'Voluptates reprehenderit debitis', 0, 0, '0000-00-00', 3, 1),
(4, 4, 'Voluptates reprehenderit debitis', 0, 0, '0000-00-00', 4, 1),
(5, 2, 'Voluptates reprehenderit debitis', 0, 0, '0000-00-00', 5, 1),
(6, 3, 'Voluptates reprehenderit debitis', 0, 0, '0000-00-00', 6, 1),
(7, 3, 'Voluptates reprehenderit debitis', 0, 0, '0000-00-00', 7, 1),
(8, 3, 'Voluptates reprehenderit debitis', 0, 0, '0000-00-00', 8, 1),
(9, 3, 'Voluptates reprehenderit debitis', 0, 0, '0000-00-00', 9, 1),
(10, 0, '', 0, 0, '0000-00-00', 10, 2),
(11, 0, '', 0, 0, '0000-00-00', 11, 2),
(12, 0, '', 0, 0, '0000-00-00', 12, 2),
(13, 0, '', 0, 0, '0000-00-00', 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_yee_rating`
--

CREATE TABLE `hr_eval_form_sp_yee_rating` (
  `yee_rating_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL,
  `ratee_achievement` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_yee_rating`
--

INSERT INTO `hr_eval_form_sp_yee_rating` (`yee_rating_id`, `hr_eval_form_sp_id`, `ratee_achievement`) VALUES
(1, 1, 'Hello this is Norvin and these are my achievements on yearend:\r\n'),
(2, 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `hr_kpi`
--

CREATE TABLE `hr_kpi` (
  `kpi_id` int(11) NOT NULL,
  `objective_id` int(11) NOT NULL,
  `kpi_desc` text NOT NULL,
  `kpi_weight` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_kpi`
--

INSERT INTO `hr_kpi` (`kpi_id`, `objective_id`, `kpi_desc`, `kpi_weight`) VALUES
(1, 1, 'KPI 1', 35),
(2, 2, 'KPI 2', 15),
(3, 2, 'KPI 2.1', 15),
(4, 3, 'KPI 3', 5),
(5, 3, 'KPI 3.1', 5),
(6, 4, 'KPI 3.2', 10),
(7, 5, 'KPI 4.1', 5),
(8, 6, 'KPI 4.2', 5),
(9, 6, 'KPI 4.3', 5),
(10, 7, 'KPI 1', 25),
(11, 8, 'KPI 2', 25),
(12, 9, 'KPI 3', 25),
(13, 10, 'KPI 4', 25);

-- --------------------------------------------------------

--
-- Table structure for table `hr_objectives`
--

CREATE TABLE `hr_objectives` (
  `objective_id` int(11) NOT NULL,
  `hr_eval_form_pillar_id` int(11) NOT NULL,
  `hr_eval_form_fp_id` int(11) NOT NULL,
  `objective` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_objectives`
--

INSERT INTO `hr_objectives` (`objective_id`, `hr_eval_form_pillar_id`, `hr_eval_form_fp_id`, `objective`) VALUES
(1, 1, 1, 'Objective 1'),
(2, 2, 1, 'Objective 2'),
(3, 3, 1, 'Objective 3'),
(4, 3, 1, 'Objective 3.1'),
(5, 4, 1, 'Objective 4'),
(6, 4, 1, 'Objective 4.1'),
(7, 5, 2, 'Objective 1'),
(8, 6, 2, 'Objective 2'),
(9, 7, 2, 'Objective 3'),
(10, 8, 2, 'Objective 4');

-- --------------------------------------------------------

--
-- Table structure for table `hr_pillars`
--

CREATE TABLE `hr_pillars` (
  `pillar_id` int(11) NOT NULL,
  `pillar_name` varchar(255) NOT NULL,
  `pillar_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_pillars`
--

INSERT INTO `hr_pillars` (`pillar_id`, `pillar_name`, `pillar_description`) VALUES
(1, 'Financial Bottomline', 'Performance Excellence'),
(2, 'Customer Delight', 'Elevate Customer'),
(3, 'Operational Excellence', 'Agility in Innovation'),
(4, 'Organizational Capacity', 'Learning and Development');

-- --------------------------------------------------------

--
-- Table structure for table `hr_target_metrics`
--

CREATE TABLE `hr_target_metrics` (
  `target_metrics_id` int(11) NOT NULL,
  `target_metrics_score` int(11) NOT NULL,
  `target_metrics_desc` text NOT NULL,
  `kpi_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_target_metrics`
--

INSERT INTO `hr_target_metrics` (`target_metrics_id`, `target_metrics_score`, `target_metrics_desc`, `kpi_id`) VALUES
(1, 1, 'Metric 1', 1),
(2, 2, 'Metric 2', 1),
(3, 3, 'Metric 3', 1),
(4, 4, 'Metric 4', 1),
(5, 1, 'Metric 1', 2),
(6, 2, 'Metric 2', 2),
(7, 3, 'Metric 3', 2),
(8, 4, 'Metric 4', 2),
(9, 1, 'Metric 1', 3),
(10, 2, 'Metric 2', 3),
(11, 3, 'Metric 3', 3),
(12, 4, 'Metric 4', 3),
(13, 1, 'Metric 1', 4),
(14, 2, 'Metric 2', 4),
(15, 3, 'Metric 3', 4),
(16, 4, 'Metric 4', 4),
(17, 1, 'Metric 1', 5),
(18, 2, 'Metric 2', 5),
(19, 3, 'Metric 3', 5),
(20, 4, 'Metric 4', 5),
(21, 1, 'Metric 1', 6),
(22, 2, 'Metric 2', 6),
(23, 3, 'Metric 3', 6),
(24, 4, 'Metric 4', 6),
(25, 1, 'Metric 1', 7),
(26, 2, 'Metric 2', 7),
(27, 3, 'Metric 3', 7),
(28, 4, 'Metric 4', 7),
(29, 1, 'Metric 1', 8),
(30, 2, 'Metric 2', 8),
(31, 3, 'Metric 3', 8),
(32, 4, 'Metric 4', 8),
(33, 1, 'Metric 1', 9),
(34, 2, 'Metric 2', 9),
(35, 3, 'Metric 3', 9),
(36, 4, 'Metric 4', 9),
(37, 1, 'Metric 1.1', 10),
(38, 2, 'Metric 1.2', 10),
(39, 3, 'Metric 1.3', 10),
(40, 4, 'Metric 1.4', 10),
(41, 1, 'Metric 2.1', 11),
(42, 2, 'Metric 2.2', 11),
(43, 3, 'Metric 2.3', 11),
(44, 4, 'Metric 2.4', 11),
(45, 1, 'Metric 3.1', 12),
(46, 2, 'Metric 3.2', 12),
(47, 3, 'Metric 3.3', 12),
(48, 4, 'Metric 3.4', 12),
(49, 1, 'Metric 4.1', 13),
(50, 2, 'Metric 4.2', 13),
(51, 3, 'Metric 4.3', 13),
(52, 4, 'Metric 4.4', 13);

-- --------------------------------------------------------

--
-- Table structure for table `hr_users`
--

CREATE TABLE `hr_users` (
  `users_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `rater_1` int(11) NOT NULL,
  `rater_2` int(11) DEFAULT NULL,
  `rater_3` int(11) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `salutation` varchar(5) DEFAULT NULL,
  `last_name` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `middle_name` varchar(30) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` int(11) NOT NULL DEFAULT 0,
  `user_status` int(11) NOT NULL,
  `job_description` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_no` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `inactive` int(11) NOT NULL DEFAULT 0,
  `deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_users`
--

INSERT INTO `hr_users` (`users_id`, `emp_id`, `rater_1`, `rater_2`, `rater_3`, `picture`, `salutation`, `last_name`, `first_name`, `middle_name`, `company_id`, `department_id`, `username`, `password`, `user_type`, `user_status`, `job_description`, `email`, `contact_no`, `address`, `inactive`, `deleted`) VALUES
(1, 23052907, 23052906, NULL, NULL, '../images/profile_1.png', 'Mr.', 'Aspan', 'John Vincent', 'Villanueva', 1, 1, 'loginsample', '0192023a7bbd73250516f069df18b500', 5, 0, 'Senior Backend Developer', 'vincentaspan14@gmail.com', '09159455334', '152 Real Velasquez St. Santa Maria, Laguna', 1, 0),
(2, 23052908, 23052906, NULL, NULL, '../images/profile_2.jpg', 'Mr.', 'Riñoza', 'Vincent Kyle', 'Torres', 1, 1, 'vncntkyl', '0192023a7bbd73250516f069df18b500', 5, 0, 'Junior Front End Web Developer', 'kyle.rinoza2009@gmail.com', '09490376783', 'Balagtas, Bulacan', 0, 0),
(4, 23052906, 23052908, 23052907, NULL, NULL, 'Mr.', 'Perez', 'Norvin Kyle', 'Benitez', 1, 1, 'norvinkyle', '0192023a7bbd73250516f069df18b500', 7, 0, 'Web Developer', 'norvinkyleperez@gmail.com', '0948759461', 'Quirino', 0, 0),
(5, 23052910, 23052906, 23052906, NULL, NULL, 'Mr.', 'Tubigan', 'Russel', 'Nizal', 1, 1, 'russel', '0192023a7bbd73250516f069df18b500', 7, 0, 'Lawyer', 'russel@gmail.com', '09123456789', 'Manila', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `hr_usertype`
--

CREATE TABLE `hr_usertype` (
  `user_type` int(11) NOT NULL,
  `user_type_description` varchar(255) NOT NULL,
  `user_access` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `hr_usertype`
--

INSERT INTO `hr_usertype` (`user_type`, `user_type_description`, `user_access`) VALUES
(1, 'Super Admin', ''),
(2, 'Admin', ''),
(3, 'Group Head', ''),
(4, 'Department Manager', ''),
(5, 'Division Supervisor', ''),
(6, 'Immediate Superior', ''),
(7, 'Rank and File', '');

-- --------------------------------------------------------

--
-- Structure for view `evaluation_form`
--
DROP TABLE IF EXISTS `evaluation_form`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `evaluation_form`  AS SELECT `hr_eval_form`.`users_id` AS `users_id`, `hr_eval_form`.`rater_1` AS `rater_1`, `hr_eval_form`.`rater_2` AS `rater_2`, `hr_eval_form`.`rater_3` AS `rater_3`, `hr_eval_form`.`recipient_signatory` AS `recipient_signatory`, `hr_objectives`.`hr_eval_form_pillar_id` AS `hr_eval_form_pillar_id`, `hr_eval_form_pillars`.`pillar_id` AS `pillar_id`, `hr_pillars`.`pillar_name` AS `pillar_name`, `hr_pillars`.`pillar_description` AS `pillar_description`, `hr_eval_form_pillars`.`pillar_percentage` AS `pillar_percentage`, `hr_objectives`.`hr_eval_form_fp_id` AS `hr_eval_form_fp_id`, `hr_objectives`.`objective` AS `objective`, `hr_kpi`.`objective_id` AS `objective_id`, `hr_kpi`.`kpi_desc` AS `kpi_desc`, `hr_kpi`.`kpi_weight` AS `kpi_weight`, `hr_eval_form`.`hr_eval_form_id` AS `hr_eval_form_id`, `hr_eval_form_sp_fq`.`results` AS `fq_results`, `hr_fq_desc`.`target_metrics_desc` AS `fq_desc`, `hr_eval_form_sp_fq`.`remarks` AS `fq_remarks`, `hr_eval_form_sp_fq`.`fq_review_date` AS `fq_review_date`, `hr_eval_form_sp_fq_rating`.`ratee_achievement` AS `fq_ratee_achievement`, `hr_eval_form_sp_myr`.`results` AS `myr_results`, `hr_myr_desc`.`target_metrics_desc` AS `myr_desc`, `hr_eval_form_sp_myr`.`status` AS `myr_status`, `hr_eval_form_sp_myr`.`remarks` AS `myr_remarks`, `hr_eval_form_sp_myr`.`actions_to_address` AS `myr_address_action`, `hr_eval_form_sp_myr`.`myr_review_date` AS `myr_review_date`, `hr_eval_form_sp_myr_rating`.`ratee_achievement` AS `myr_ratee_achievement`, `hr_eval_form_sp_myr_rating`.`rater_1` AS `myr_rater1`, `hr_eval_form_sp_myr_rating`.`rater_2` AS `myr_rater2`, `hr_eval_form_sp_myr_rating`.`rater_3` AS `myr_rater3`, `hr_eval_form_sp_tq`.`results` AS `tq_results`, `hr_tq_desc`.`target_metrics_desc` AS `tq_desc`, `hr_eval_form_sp_tq`.`remarks` AS `tq_remarks`, `hr_eval_form_sp_tq`.`tq_review_date` AS `tq_review_date`, `hr_eval_form_sp_tq_rating`.`ratee_achievement` AS `tq_ratee_achievement`, `hr_eval_form_sp_yee`.`results` AS `yee_results`, `hr_yee_desc`.`target_metrics_desc` AS `yee_desc`, `hr_eval_form_sp_yee`.`remarks` AS `yee_remarks`, `hr_eval_form_sp_yee`.`agreed_rating` AS `agreed_rating`, `hr_eval_form_sp_yee`.`wtd_rating` AS `wtd_rating`, `hr_eval_form_sp_yee_rating`.`ratee_achievement` AS `yee_achievement` FROM ((((((((((((((((((`hr_eval_form` join `hr_eval_form_fp` on(`hr_eval_form_fp`.`eval_form_id` = `hr_eval_form`.`hr_eval_form_id`)) join `hr_objectives` on(`hr_objectives`.`hr_eval_form_fp_id` = `hr_eval_form_fp`.`hr_eval_form_fp_id`)) join `hr_eval_form_pillars` on(`hr_eval_form_pillars`.`hr_eval_form_pillar_id` = `hr_objectives`.`hr_eval_form_pillar_id`)) join `hr_pillars` on(`hr_pillars`.`pillar_id` = `hr_eval_form_pillars`.`pillar_id`)) join `hr_kpi` on(`hr_kpi`.`objective_id` = `hr_objectives`.`objective_id`)) join `hr_eval_form_sp` on(`hr_eval_form_sp`.`eval_form_id` = `hr_eval_form`.`hr_eval_form_id`)) join `hr_target_metrics` `hr_fq_desc` on(`hr_fq_desc`.`kpi_id` = `hr_kpi`.`kpi_id`)) join `hr_target_metrics` `hr_myr_desc` on(`hr_myr_desc`.`kpi_id` = `hr_kpi`.`kpi_id`)) join `hr_target_metrics` `hr_tq_desc` on(`hr_tq_desc`.`kpi_id` = `hr_kpi`.`kpi_id`)) join `hr_target_metrics` `hr_yee_desc` on(`hr_yee_desc`.`kpi_id` = `hr_kpi`.`kpi_id`)) join `hr_eval_form_sp_fq` on(`hr_eval_form_sp_fq`.`hr_eval_form_kpi_id` = `hr_kpi`.`kpi_id`)) join `hr_eval_form_sp_fq_rating` on(`hr_eval_form_sp_fq_rating`.`hr_eval_form_sp_id` = `hr_eval_form_sp`.`hr_eval_form_sp_id`)) join `hr_eval_form_sp_myr` on(`hr_eval_form_sp_myr`.`hr_eval_form_kpi_id` = `hr_kpi`.`kpi_id`)) join `hr_eval_form_sp_myr_rating` on(`hr_eval_form_sp_myr_rating`.`hr_eval_form_sp_id` = `hr_eval_form_sp`.`hr_eval_form_sp_id`)) join `hr_eval_form_sp_tq` on(`hr_eval_form_sp_tq`.`hr_eval_form_kpi_id` = `hr_kpi`.`kpi_id`)) join `hr_eval_form_sp_tq_rating` on(`hr_eval_form_sp_tq_rating`.`hr_eval_form_sp_id` = `hr_eval_form_sp`.`hr_eval_form_sp_id`)) join `hr_eval_form_sp_yee` on(`hr_eval_form_sp_yee`.`hr_eval_form_kpi_id` = `hr_kpi`.`kpi_id`)) join `hr_eval_form_sp_yee_rating` on(`hr_eval_form_sp_yee_rating`.`hr_eval_form_sp_id` = `hr_eval_form_sp`.`hr_eval_form_sp_id`)) WHERE `hr_fq_desc`.`target_metrics_score` = `hr_eval_form_sp_fq`.`results` AND `hr_myr_desc`.`target_metrics_score` = `hr_eval_form_sp_myr`.`results` AND `hr_tq_desc`.`target_metrics_score` = `hr_eval_form_sp_tq`.`results` AND `hr_yee_desc`.`target_metrics_score` = `hr_eval_form_sp_yee`.`results` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hr_color_status`
--
ALTER TABLE `hr_color_status`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `hr_company`
--
ALTER TABLE `hr_company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `hr_departments`
--
ALTER TABLE `hr_departments`
  ADD PRIMARY KEY (`department_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `hr_eval_form`
--
ALTER TABLE `hr_eval_form`
  ADD PRIMARY KEY (`hr_eval_form_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `hr_eval_form_fp`
--
ALTER TABLE `hr_eval_form_fp`
  ADD PRIMARY KEY (`hr_eval_form_fp_id`),
  ADD KEY `eval_form_id` (`eval_form_id`);

--
-- Indexes for table `hr_eval_form_pillars`
--
ALTER TABLE `hr_eval_form_pillars`
  ADD PRIMARY KEY (`hr_eval_form_pillar_id`),
  ADD KEY `hr_eval_form_id` (`hr_eval_form_id`),
  ADD KEY `pillar_id` (`pillar_id`),
  ADD KEY `hr_eval_form_fp_id` (`hr_eval_form_fp_id`);

--
-- Indexes for table `hr_eval_form_sp`
--
ALTER TABLE `hr_eval_form_sp`
  ADD PRIMARY KEY (`hr_eval_form_sp_id`),
  ADD KEY `hr_eval_form_sp_ibfk_1` (`eval_form_id`);

--
-- Indexes for table `hr_eval_form_sp_fq`
--
ALTER TABLE `hr_eval_form_sp_fq`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`),
  ADD KEY `hr_eval_form_kpi_id` (`hr_eval_form_kpi_id`);

--
-- Indexes for table `hr_eval_form_sp_fq_rating`
--
ALTER TABLE `hr_eval_form_sp_fq_rating`
  ADD PRIMARY KEY (`fq_rating_id`),
  ADD KEY `hr_eval_form_sp_fq_rating_ibfk_1` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_myr`
--
ALTER TABLE `hr_eval_form_sp_myr`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `hr_eval_form_kpi_id` (`hr_eval_form_kpi_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_myr_rating`
--
ALTER TABLE `hr_eval_form_sp_myr_rating`
  ADD PRIMARY KEY (`myr_rating_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`),
  ADD KEY `rater_1` (`rater_1`),
  ADD KEY `rater_2` (`rater_2`),
  ADD KEY `rater_3` (`rater_3`);

--
-- Indexes for table `hr_eval_form_sp_pillar_ratings`
--
ALTER TABLE `hr_eval_form_sp_pillar_ratings`
  ADD PRIMARY KEY (`eval_form_sp_pillar_ratings_id`),
  ADD KEY `eval_form_pillars_id` (`eval_form_pillars_id`);

--
-- Indexes for table `hr_eval_form_sp_quarterly_ratings`
--
ALTER TABLE `hr_eval_form_sp_quarterly_ratings`
  ADD PRIMARY KEY (`quarterly_ratings_id`);

--
-- Indexes for table `hr_eval_form_sp_tq`
--
ALTER TABLE `hr_eval_form_sp_tq`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `hr_eval_form_kpi_id` (`hr_eval_form_kpi_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_tq_rating`
--
ALTER TABLE `hr_eval_form_sp_tq_rating`
  ADD PRIMARY KEY (`tq_rating_id`),
  ADD KEY `hr_eval_form_sp_tq_rating_ibfk_1` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_yee`
--
ALTER TABLE `hr_eval_form_sp_yee`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `hr_eval_form_kpi_id` (`hr_eval_form_kpi_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_yee_rating`
--
ALTER TABLE `hr_eval_form_sp_yee_rating`
  ADD PRIMARY KEY (`yee_rating_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_kpi`
--
ALTER TABLE `hr_kpi`
  ADD PRIMARY KEY (`kpi_id`),
  ADD KEY `objective_id` (`objective_id`);

--
-- Indexes for table `hr_objectives`
--
ALTER TABLE `hr_objectives`
  ADD PRIMARY KEY (`objective_id`),
  ADD KEY `hr_objectives_ibfk_1` (`hr_eval_form_fp_id`),
  ADD KEY `hr_objectives_ibfk_2` (`hr_eval_form_pillar_id`);

--
-- Indexes for table `hr_pillars`
--
ALTER TABLE `hr_pillars`
  ADD PRIMARY KEY (`pillar_id`);

--
-- Indexes for table `hr_target_metrics`
--
ALTER TABLE `hr_target_metrics`
  ADD PRIMARY KEY (`target_metrics_id`),
  ADD KEY `kpi_id` (`kpi_id`);

--
-- Indexes for table `hr_users`
--
ALTER TABLE `hr_users`
  ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `emp_id` (`emp_id`),
  ADD KEY `hr_users_ibfk_1` (`rater_1`),
  ADD KEY `rater_2` (`rater_2`),
  ADD KEY `rater_3` (`rater_3`);

--
-- Indexes for table `hr_usertype`
--
ALTER TABLE `hr_usertype`
  ADD PRIMARY KEY (`user_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hr_color_status`
--
ALTER TABLE `hr_color_status`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_company`
--
ALTER TABLE `hr_company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hr_departments`
--
ALTER TABLE `hr_departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hr_eval_form`
--
ALTER TABLE `hr_eval_form`
  MODIFY `hr_eval_form_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hr_eval_form_fp`
--
ALTER TABLE `hr_eval_form_fp`
  MODIFY `hr_eval_form_fp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hr_eval_form_pillars`
--
ALTER TABLE `hr_eval_form_pillars`
  MODIFY `hr_eval_form_pillar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp`
--
ALTER TABLE `hr_eval_form_sp`
  MODIFY `hr_eval_form_sp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_fq`
--
ALTER TABLE `hr_eval_form_sp_fq`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_fq_rating`
--
ALTER TABLE `hr_eval_form_sp_fq_rating`
  MODIFY `fq_rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_myr`
--
ALTER TABLE `hr_eval_form_sp_myr`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_myr_rating`
--
ALTER TABLE `hr_eval_form_sp_myr_rating`
  MODIFY `myr_rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_pillar_ratings`
--
ALTER TABLE `hr_eval_form_sp_pillar_ratings`
  MODIFY `eval_form_sp_pillar_ratings_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_quarterly_ratings`
--
ALTER TABLE `hr_eval_form_sp_quarterly_ratings`
  MODIFY `quarterly_ratings_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_tq`
--
ALTER TABLE `hr_eval_form_sp_tq`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_tq_rating`
--
ALTER TABLE `hr_eval_form_sp_tq_rating`
  MODIFY `tq_rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_yee`
--
ALTER TABLE `hr_eval_form_sp_yee`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_yee_rating`
--
ALTER TABLE `hr_eval_form_sp_yee_rating`
  MODIFY `yee_rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hr_kpi`
--
ALTER TABLE `hr_kpi`
  MODIFY `kpi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `hr_objectives`
--
ALTER TABLE `hr_objectives`
  MODIFY `objective_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `hr_pillars`
--
ALTER TABLE `hr_pillars`
  MODIFY `pillar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_target_metrics`
--
ALTER TABLE `hr_target_metrics`
  MODIFY `target_metrics_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `hr_users`
--
ALTER TABLE `hr_users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `hr_usertype`
--
ALTER TABLE `hr_usertype`
  MODIFY `user_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hr_departments`
--
ALTER TABLE `hr_departments`
  ADD CONSTRAINT `hr_departments_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `hr_company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form`
--
ALTER TABLE `hr_eval_form`
  ADD CONSTRAINT `hr_eval_form_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `hr_users` (`users_id`);

--
-- Constraints for table `hr_eval_form_fp`
--
ALTER TABLE `hr_eval_form_fp`
  ADD CONSTRAINT `hr_eval_form_fp_ibfk_7` FOREIGN KEY (`eval_form_id`) REFERENCES `hr_eval_form` (`hr_eval_form_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_pillars`
--
ALTER TABLE `hr_eval_form_pillars`
  ADD CONSTRAINT `hr_eval_form_pillars_ibfk_1` FOREIGN KEY (`hr_eval_form_id`) REFERENCES `hr_eval_form` (`hr_eval_form_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_pillars_ibfk_2` FOREIGN KEY (`pillar_id`) REFERENCES `hr_pillars` (`pillar_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_pillars_ibfk_3` FOREIGN KEY (`hr_eval_form_fp_id`) REFERENCES `hr_eval_form_fp` (`hr_eval_form_fp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp`
--
ALTER TABLE `hr_eval_form_sp`
  ADD CONSTRAINT `hr_eval_form_sp_ibfk_1` FOREIGN KEY (`eval_form_id`) REFERENCES `hr_eval_form` (`hr_eval_form_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_fq`
--
ALTER TABLE `hr_eval_form_sp_fq`
  ADD CONSTRAINT `hr_eval_form_sp_fq_ibfk_1` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_fq_ibfk_2` FOREIGN KEY (`hr_eval_form_kpi_id`) REFERENCES `hr_kpi` (`kpi_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_fq_rating`
--
ALTER TABLE `hr_eval_form_sp_fq_rating`
  ADD CONSTRAINT `hr_eval_form_sp_fq_rating_ibfk_1` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_myr`
--
ALTER TABLE `hr_eval_form_sp_myr`
  ADD CONSTRAINT `hr_eval_form_sp_myr_ibfk_1` FOREIGN KEY (`hr_eval_form_kpi_id`) REFERENCES `hr_kpi` (`kpi_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_myr_ibfk_2` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_myr_rating`
--
ALTER TABLE `hr_eval_form_sp_myr_rating`
  ADD CONSTRAINT `hr_eval_form_sp_myr_rating_ibfk_1` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_myr_rating_ibfk_2` FOREIGN KEY (`rater_1`) REFERENCES `hr_users` (`rater_1`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_myr_rating_ibfk_3` FOREIGN KEY (`rater_2`) REFERENCES `hr_users` (`rater_2`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_myr_rating_ibfk_4` FOREIGN KEY (`rater_3`) REFERENCES `hr_users` (`rater_3`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_pillar_ratings`
--
ALTER TABLE `hr_eval_form_sp_pillar_ratings`
  ADD CONSTRAINT `hr_eval_form_sp_pillar_ratings_ibfk_1` FOREIGN KEY (`eval_form_pillars_id`) REFERENCES `hr_eval_form_pillars` (`hr_eval_form_pillar_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_tq`
--
ALTER TABLE `hr_eval_form_sp_tq`
  ADD CONSTRAINT `hr_eval_form_sp_tq_ibfk_1` FOREIGN KEY (`hr_eval_form_kpi_id`) REFERENCES `hr_kpi` (`kpi_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_tq_ibfk_2` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_tq_rating`
--
ALTER TABLE `hr_eval_form_sp_tq_rating`
  ADD CONSTRAINT `hr_eval_form_sp_tq_rating_ibfk_1` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_yee`
--
ALTER TABLE `hr_eval_form_sp_yee`
  ADD CONSTRAINT `hr_eval_form_sp_yee_ibfk_1` FOREIGN KEY (`hr_eval_form_kpi_id`) REFERENCES `hr_kpi` (`kpi_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_yee_ibfk_2` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_yee_rating`
--
ALTER TABLE `hr_eval_form_sp_yee_rating`
  ADD CONSTRAINT `hr_eval_form_sp_yee_rating_ibfk_1` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_kpi`
--
ALTER TABLE `hr_kpi`
  ADD CONSTRAINT `hr_kpi_ibfk_1` FOREIGN KEY (`objective_id`) REFERENCES `hr_objectives` (`objective_id`);

--
-- Constraints for table `hr_objectives`
--
ALTER TABLE `hr_objectives`
  ADD CONSTRAINT `hr_objectives_ibfk_1` FOREIGN KEY (`hr_eval_form_fp_id`) REFERENCES `hr_eval_form_fp` (`hr_eval_form_fp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_objectives_ibfk_2` FOREIGN KEY (`hr_eval_form_pillar_id`) REFERENCES `hr_eval_form_pillars` (`hr_eval_form_pillar_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_target_metrics`
--
ALTER TABLE `hr_target_metrics`
  ADD CONSTRAINT `hr_target_metrics_ibfk_1` FOREIGN KEY (`kpi_id`) REFERENCES `hr_kpi` (`kpi_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_users`
--
ALTER TABLE `hr_users`
  ADD CONSTRAINT `hr_users_ibfk_1` FOREIGN KEY (`rater_1`) REFERENCES `hr_users` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_users_ibfk_2` FOREIGN KEY (`rater_2`) REFERENCES `hr_users` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_users_ibfk_3` FOREIGN KEY (`rater_3`) REFERENCES `hr_users` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
