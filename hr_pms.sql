-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2023 at 11:59 AM
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
(1, 'United Neon Advertising Inc.');

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
(1, 1, 'Information Technology and Systems Integration', 0, 0),
(11, 1, 'Board Of Director', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form`
--

CREATE TABLE `hr_eval_form` (
  `hr_eval_form_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `myr_rater_1` int(11) NOT NULL,
  `myr_rater_2` int(11) NOT NULL,
  `myr_rater_3` int(11) NOT NULL,
  `rater_1` int(11) DEFAULT NULL,
  `rater_2` int(11) DEFAULT NULL,
  `rater_3` int(11) DEFAULT NULL,
  `ratees_comment` text NOT NULL,
  `recommendation` text NOT NULL,
  `CreationDate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form`
--

INSERT INTO `hr_eval_form` (`hr_eval_form_id`, `users_id`, `myr_rater_1`, `myr_rater_2`, `myr_rater_3`, `rater_1`, `rater_2`, `rater_3`, `ratees_comment`, `recommendation`, `CreationDate`) VALUES
(1, 19, 0, 0, 0, NULL, NULL, NULL, '', '', 1),
(2, 13, 0, 0, 0, NULL, NULL, NULL, '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_fp`
--

CREATE TABLE `hr_eval_form_fp` (
  `hr_eval_form_fp_id` int(11) NOT NULL,
  `eval_form_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `approved_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_fp`
--

INSERT INTO `hr_eval_form_fp` (`hr_eval_form_fp_id`, `eval_form_id`, `created_by`, `approved_by`) VALUES
(1, 1, 13, 14),
(2, 2, 19, NULL);

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
(1, 1, 1, 1, 30),
(2, 1, 1, 2, 35),
(3, 1, 1, 3, 20),
(4, 1, 1, 4, 15),
(5, 2, 2, 1, 25);

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
  `achievements` text NOT NULL,
  `results` text NOT NULL,
  `weighted` float(10,2) NOT NULL,
  `remarks` text NOT NULL,
  `fq_review_date` date NOT NULL,
  `hr_eval_form_kpi_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_fq`
--

INSERT INTO `hr_eval_form_sp_fq` (`ID`, `achievements`, `results`, `weighted`, `remarks`, `fq_review_date`, `hr_eval_form_kpi_id`, `hr_eval_form_sp_id`) VALUES
(1, 'hello', '', 0.00, '', '0000-00-00', 1, 1),
(2, '', '', 0.00, '', '0000-00-00', 2, 1),
(3, '', '', 0.00, '', '0000-00-00', 3, 1),
(4, '', '', 0.00, '', '0000-00-00', 4, 1),
(5, '', '', 0.00, '', '0000-00-00', 5, 1),
(6, '', '', 0.00, '', '0000-00-00', 6, 1),
(7, '', '', 0.00, '', '0000-00-00', 7, 1),
(8, '', '', 0.00, '', '0000-00-00', 8, 1),
(9, '', '', 0.00, '', '0000-00-00', 9, 1),
(10, '', '', 0.00, '', '0000-00-00', 10, 1),
(11, '', '', 0.00, '', '0000-00-00', 11, 1),
(12, '', '', 0.00, '', '0000-00-00', 12, 1);

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
(1, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_myr`
--

CREATE TABLE `hr_eval_form_sp_myr` (
  `ID` int(11) NOT NULL,
  `achievements` text NOT NULL,
  `results` text NOT NULL,
  `status` text NOT NULL,
  `remarks` text NOT NULL,
  `myr_review_date` date NOT NULL,
  `hr_eval_form_kpi_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_myr`
--

INSERT INTO `hr_eval_form_sp_myr` (`ID`, `achievements`, `results`, `status`, `remarks`, `myr_review_date`, `hr_eval_form_kpi_id`, `hr_eval_form_sp_id`) VALUES
(1, '', '1', '', '', '0000-00-00', 1, 1),
(2, '', '1', '', '', '0000-00-00', 2, 1),
(3, '', '1', '', '', '0000-00-00', 3, 1),
(4, '', '1', '', '', '0000-00-00', 4, 1),
(5, '', '1', '', '', '0000-00-00', 5, 1),
(6, '', '1', '', '', '0000-00-00', 6, 1),
(7, '', '1', '', '', '0000-00-00', 7, 1),
(8, '', '1', '', '', '0000-00-00', 8, 1),
(9, '', '1', '', '', '0000-00-00', 9, 1),
(10, '', '1', '', '', '0000-00-00', 10, 1),
(11, '', '1', '', '', '0000-00-00', 11, 1),
(12, '', '1', '', '', '0000-00-00', 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_myr_rating`
--

CREATE TABLE `hr_eval_form_sp_myr_rating` (
  `myr_rating_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL,
  `ratee_achievement` text NOT NULL,
  `rater_1` int(11) DEFAULT NULL,
  `rater_2` int(11) DEFAULT NULL,
  `rater_3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_myr_rating`
--

INSERT INTO `hr_eval_form_sp_myr_rating` (`myr_rating_id`, `hr_eval_form_sp_id`, `ratee_achievement`, `rater_1`, `rater_2`, `rater_3`) VALUES
(1, 0, '1', NULL, NULL, NULL),
(2, 1, 'Hello this is norvin and this is my second quarter achievements', NULL, NULL, NULL);

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
(1, 1, 0.35, 0.70, 1.05, NULL, 1.40),
(2, 2, 0.30, 0.60, 0.90, NULL, 1.20),
(3, 3, 0.20, 0.40, 0.60, NULL, 0.60),
(4, 4, 0.15, 0.30, 0.45, NULL, 0.45);

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
(1, 1, 1.00, 2.00, 3.00, NULL, 3.65);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_tq`
--

CREATE TABLE `hr_eval_form_sp_tq` (
  `ID` int(11) NOT NULL,
  `achievements` text NOT NULL,
  `results` text NOT NULL,
  `remarks` text NOT NULL,
  `tq_review_date` date NOT NULL,
  `hr_eval_form_kpi_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_tq`
--

INSERT INTO `hr_eval_form_sp_tq` (`ID`, `achievements`, `results`, `remarks`, `tq_review_date`, `hr_eval_form_kpi_id`, `hr_eval_form_sp_id`) VALUES
(1, '', '', '', '0000-00-00', 1, 1),
(2, '', '', '', '0000-00-00', 2, 1),
(3, '', '', '', '0000-00-00', 3, 1),
(4, '', '', '', '0000-00-00', 4, 1),
(5, '', '', '', '0000-00-00', 5, 1),
(6, '', '', '', '0000-00-00', 6, 1),
(7, '', '', '', '0000-00-00', 7, 1),
(8, '', '', '', '0000-00-00', 8, 1),
(9, '', '', '', '0000-00-00', 9, 1),
(10, '', '', '', '0000-00-00', 10, 1),
(11, '', '', '', '0000-00-00', 11, 1),
(12, '', '', '', '0000-00-00', 12, 1);

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
(1, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_yee`
--

CREATE TABLE `hr_eval_form_sp_yee` (
  `ID` int(11) NOT NULL,
  `achievements` text NOT NULL,
  `results` text NOT NULL,
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

INSERT INTO `hr_eval_form_sp_yee` (`ID`, `achievements`, `results`, `remarks`, `agreed_rating`, `wtd_rating`, `yee_review_date`, `hr_eval_form_kpi_id`, `hr_eval_form_sp_id`) VALUES
(1, '', '', '', 0, 0, '0000-00-00', 1, 1),
(2, '', '', '', 0, 0, '0000-00-00', 2, 1),
(3, '', '', '', 0, 0, '0000-00-00', 3, 1),
(4, '', '', '', 0, 0, '0000-00-00', 4, 1),
(5, '', '', '', 0, 0, '0000-00-00', 5, 1),
(6, '', '', '', 0, 0, '0000-00-00', 6, 1),
(7, '', '', '', 0, 0, '0000-00-00', 7, 1),
(8, '', '', '', 0, 0, '0000-00-00', 8, 1),
(9, '', '', '', 0, 0, '0000-00-00', 9, 1),
(10, '', '', '', 0, 0, '0000-00-00', 10, 1),
(11, '', '', '', 0, 0, '0000-00-00', 11, 1),
(12, '', '', '', 0, 0, '0000-00-00', 12, 1);

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
(1, 1, 'gfddfgdgdfgg');

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
(1, 1, 'Accomplishments need to be at least 85% accurate.', 10),
(2, 1, 'Tasks need to be at least 85% complete.', 10),
(3, 1, 'Completion should be within the set timeline.', 10),
(4, 2, 'Complete and complete all pending lark approval procedures.', 10),
(5, 2, 'Correct and complete all information to be indicated on organizational management.', 5),
(6, 3, 'Receive a satisfactory rating from the key stakeholders.', 20),
(7, 4, 'proper and comprehensive process documentation for IT activities, services, and processes.', 10),
(8, 4, 'signed-off IT process documentations', 5),
(9, 4, 'signed-off IT activities documentations.', 5),
(10, 5, 'Processes', 5),
(11, 5, 'Assessments', 5),
(12, 5, 'Recording/Monitoring', 5);

-- --------------------------------------------------------

--
-- Table structure for table `hr_kpi_year_duration`
--

CREATE TABLE `hr_kpi_year_duration` (
  `kpi_year_duration_id` int(11) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_kpi_year_duration`
--

INSERT INTO `hr_kpi_year_duration` (`kpi_year_duration_id`, `from_date`, `to_date`) VALUES
(1, '2023-01-29', '2023-12-21'),
(2, '2021-01-31', '2021-12-23'),
(3, '2023-07-25', '2024-07-31');

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
(1, 1, 1, 'To measure overall quality of work'),
(2, 2, 1, 'To correct and complete all pending Lark approval procedures and organizational management.'),
(3, 2, 1, 'To receive a stakeholders feedback to improve team support.'),
(4, 3, 1, 'Creation of process documentations for IT activities, services, and processes.'),
(5, 4, 1, 'To develop documentation skills');

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
-- Table structure for table `hr_request_discussion`
--

CREATE TABLE `hr_request_discussion` (
  `ID` int(11) NOT NULL,
  `consultation_subject` text NOT NULL,
  `description` text NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_request_discussion`
--

INSERT INTO `hr_request_discussion` (`ID`, `consultation_subject`, `description`, `creation_date`) VALUES
(1, 'Hello', 'Goodbye', '2023-07-16 23:34:55'),
(2, 'sdfsfsfd', 'sdfsfsdfsdf', '2023-07-17 03:09:35'),
(3, 'title', 'hello', '2023-07-18 07:27:01');

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
(1, 1, 'Quality of work is below expected, completion are below expected as well. Timelines weren\'t followed.', 1),
(2, 2, 'Quality of work is 85% accurate, 85% complete, but completed late.', 1),
(3, 3, 'Quality of work delivered is 85% accurate, 85% complete, and completed within the deadline.', 1),
(4, 4, 'Quality of work delivered is 100% accurate, 100% complete, and completed prior the deadline.', 1),
(5, 1, 'Quality of work is below expected, completion are below expected as well. Timelines weren\'t followed.', 2),
(6, 2, 'Quality of work is 85% accurate, 85% complete, but completed late.', 2),
(7, 3, 'Quality of work delivered is 85% accurate, 85% complete, and completed within the deadline.', 2),
(8, 4, 'Quality of work delivered is 100% accurate, 100% complete, and completed prior the deadline.', 2),
(9, 1, 'Quality of work is below expected, completion are below expected as well. Timelines weren\'t followed.', 3),
(10, 2, 'Quality of work is 85% accurate, 85% complete, but completed late.', 3),
(11, 3, 'Quality of work delivered is 85% accurate, 85% complete, and completed within the deadline.', 3),
(12, 4, 'Quality of work delivered is 100% accurate, 100% complete, and completed prior the deadline.', 3),
(13, 1, 'Corrected and completed only few of all pending approval procedures, not all information has shown in organization management. Back-jobs are redundant and has repetitive concerns.', 4),
(14, 2, 'Corrected and completed less than 100% of all pending lark approval procedures and all information shown in organizational management, also has back-jobs and concerns.', 4),
(15, 3, 'Corrected and completed 100%  of all pending lark approval procedures and all information shown in organizational management, but with pending back-jobs and consents.', 4),
(16, 4, 'Corrected and completed 100% of all pending lark approval procedures and all information shown in the organizational management, with no back-jobs and concerns.', 4),
(17, 1, 'Corrected and completed only few of all pending approval procedures, not all information has shown in organization management. Back-jobs are redundant and has repetitive concerns.', 5),
(18, 2, 'Corrected and completed less than 100% of all pending lark approval procedures and all information shown in organizational management, also has back-jobs and concerns.', 5),
(19, 3, 'Corrected and completed 100%  of all pending lark approval procedures and all information shown in organizational management, but with pending back-jobs and consents.', 5),
(20, 4, 'Corrected and completed 100% of all pending lark approval procedures and all information shown in the organizational management, with no back-jobs and concerns.', 5),
(21, 1, 'Receive less than 75% rating from key stakeholders', 6),
(22, 2, 'Receive less than 85% satisfactory rating from key stakeholders.', 6),
(23, 3, 'Receive at least 85% satisfactory rating from key stakeholders.', 6),
(24, 4, 'Receive more than 85% satisfactory rating from key stakeholders.', 6),
(25, 1, 'Drafted processes documentations, but haven\'t signed off anything.', 7),
(26, 2, 'Signed off not less than 3 comprehenisive process documentation for IT processes and activities', 7),
(27, 3, 'Signed off not less than 5 comprehensive process documentation for IT processes and activities.', 7),
(28, 4, 'Signed off more than 10 comprehensive process documentation for IT processes and activities.', 7),
(29, 1, 'Drafted processes documentations, but haven\'t signed off anything.', 8),
(30, 2, 'Signed off not less than 3 comprehenisive process documentation for IT processes and activities', 8),
(31, 3, 'Signed off not less than 5 comprehensive process documentation for IT processes and activities.', 8),
(32, 4, 'Signed off more than 10 comprehensive process documentation for IT processes and activities.', 8),
(33, 1, 'Drafted processes documentations, but haven\'t signed off anything.', 9),
(34, 2, 'Signed off not less than 3 comprehenisive process documentation for IT processes and activities', 9),
(35, 3, 'Signed off not less than 5 comprehensive process documentation for IT processes and activities.', 9),
(36, 4, 'Signed off more than 10 comprehensive process documentation for IT processes and activities.', 9),
(37, 1, 'Shows interest in the activity but did the tasks just to comply', 10),
(38, 2, 'Need more exposure to learn and to be more creative', 10),
(39, 3, 'Documentation shows informative information that will let the department productive', 10),
(40, 4, 'Documentation shows exceptional and usable information for decision making and growth.', 10),
(41, 1, 'Shows interest in the activity but did the tasks just to comply', 11),
(42, 2, 'Need more exposure to learn and to be more creative', 11),
(43, 3, 'Documentation shows informative information that will let the department productive', 11),
(44, 4, 'Documentation shows exceptional and usable information for decision making and growth.', 11),
(45, 1, 'Shows interest in the activity but did the tasks just to comply', 12),
(46, 2, 'Need more exposure to learn and to be more creative', 12),
(47, 3, 'Documentation shows informative information that will let the department productive', 12),
(48, 4, 'Documentation shows exceptional and usable information for decision making and growth.', 12);

-- --------------------------------------------------------

--
-- Table structure for table `hr_users`
--

CREATE TABLE `hr_users` (
  `users_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `salutation` varchar(5) DEFAULT NULL,
  `last_name` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `middle_name` varchar(30) DEFAULT NULL,
  `suffix` varchar(5) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `company` int(11) NOT NULL,
  `department` int(11) DEFAULT NULL,
  `team` varchar(100) DEFAULT NULL COMMENT 'team in the department',
  `job_description` varchar(255) NOT NULL,
  `contract_type` enum('regular','probationary','project based','consultant') NOT NULL,
  `contact_no` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `primary_evaluator` int(11) DEFAULT NULL,
  `secondary_evaluator` int(11) DEFAULT NULL,
  `tertiary_evaluator` int(11) DEFAULT NULL,
  `employment_category` enum('EXPAT','LOCAL') NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `hire_date` date DEFAULT NULL,
  `request_consult` int(11) DEFAULT NULL,
  `for_regularization` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_users`
--

INSERT INTO `hr_users` (`users_id`, `employee_id`, `picture`, `salutation`, `last_name`, `first_name`, `middle_name`, `suffix`, `nickname`, `company`, `department`, `team`, `job_description`, `contract_type`, `contact_no`, `address`, `primary_evaluator`, `secondary_evaluator`, `tertiary_evaluator`, `employment_category`, `nationality`, `hire_date`, `request_consult`, `for_regularization`) VALUES
(1, 1010101, NULL, NULL, 'Root', 'Admin', '', NULL, 'Super Admin', 1, 1, NULL, 'Super Admin', 'consultant', '09999999999', '4th Floor HPL Bldg, Sen. Gil Puyat Ave., Makati, Philippines', 23052908, NULL, NULL, 'LOCAL', 'Filipino', '0001-01-01', NULL, NULL),
(10, 22081701, NULL, NULL, 'Leynes', 'Christopher', 'Patena', NULL, 'Chris', 1, 1, 'Information Systems & Technology Integration', 'It Specialist - External', 'regular', '09991113498', 'Makati, Philippines', 21020804, 21020804, 21020804, 'LOCAL', 'Filipino', '2023-02-20', NULL, NULL),
(11, 12010238, NULL, NULL, 'Lim', 'Jobert', 'De Ocampo', NULL, 'Jobert', 1, 1, 'Information Systems & Technology Integration', 'Senior It Specialist', 'regular', '09991113498', 'Makati, Philippines', 21020804, 21020804, 21020804, 'LOCAL', 'Filipino', '2012-01-02', NULL, NULL),
(12, 21100522, NULL, NULL, 'Monserrate', 'Anthony', 'Gumop-as', 'Jr.', 'Anthony', 1, 1, 'Information Systems & Technology Integration', 'It Associate', 'regular', '09991113498', 'Makati, Philippines', 21020804, 21020804, 21020804, 'LOCAL', 'Filipino', '2021-10-05', NULL, NULL),
(13, 22111627, NULL, NULL, 'Perez', 'Jacqueline', 'Suazo', NULL, 'Jackie', 1, 1, 'Information Systems & Technology Integration', 'It Associate', 'probationary', '09991113498', 'Makati, Philippines', 21020804, 21020804, 21020804, 'LOCAL', 'Filipino', '2022-11-16', NULL, NULL),
(14, 21020804, NULL, NULL, 'Ramilo', 'Michael', 'Lauta', NULL, 'Mike', 1, 1, 'Information Systems & Technology Integration', 'Information Technology & Systems Integration Head', 'regular', '09991113498', 'Makati, Philippines', 88010102, 88010102, 88010102, 'LOCAL', 'Filipino', '2021-02-08', NULL, NULL),
(15, 22111602, NULL, NULL, 'Ramos', 'Lorraine Ann', '.', NULL, 'Raine', 1, 1, 'Information Systems & Technology Integration', 'Web Developer', 'regular', '09991113498', 'Makati, Philippines', 21020804, 21020804, 21020804, 'LOCAL', 'Filipino', '2023-05-29', NULL, NULL),
(16, 88010102, NULL, NULL, 'Lim', 'Daniel Christopher', 'Chua', NULL, 'Danny', 1, 11, 'Board Of Director', 'Ceo/managing Director', 'regular', '09991113498', 'Makati, Philippines', NULL, NULL, NULL, 'LOCAL', 'Filipino', '1991-03-01', NULL, NULL),
(19, 23052906, NULL, 'Mr.', 'Perez', 'Norvin Kyle', 'Benitez', NULL, 'Norvin', 1, 1, 'Information Systems & Technology Integration', 'Developer', 'regular', '09123456789', 'malate manila', 22081701, 12010238, 21020804, 'LOCAL', 'Filipino', '2023-07-17', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hr_user_accounts`
--

CREATE TABLE `hr_user_accounts` (
  `account_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT 'company job level',
  `user_status` enum('active','resigned','terminated') NOT NULL COMMENT 'employment status',
  `account_status` enum('active','inactive','deleted') NOT NULL COMMENT 'system account status'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_user_accounts`
--

INSERT INTO `hr_user_accounts` (`account_id`, `users_id`, `username`, `password`, `email_address`, `user_type`, `user_status`, `account_status`) VALUES
(1, 1, 'admin', '17c4520f6cfd1ab53d8745e84681eb49', 'admin@admin.com', 1, 'active', 'active'),
(2, 10, '22081701', '74acfff97151e8467617bc6f3778ad61', 'christopher.leynes@unitedneon.com', 6, 'active', 'active'),
(3, 11, '12010238', '28aae2e53f32e77253668682916113d4', 'jobert.lim@unitedneon.com', 6, 'active', 'active'),
(4, 12, '21100522', 'ca63fafb3fbb76875fd35fb58ac4258b', 'anthonyjr..monserrate@unitedneon.com', 6, 'active', 'active'),
(5, 13, '22111627', '925efb9db79e593ba23631d2b3dce8ca', 'jacqueline.perez@unitedneon.com', 6, 'active', 'active'),
(6, 14, '21020804', '0192023a7bbd73250516f069df18b500', 'michael.ramilo@unitedneon.com', 4, 'active', 'active'),
(7, 15, '22111602', '4f6e87d9dfa01c7a7b7704f554e649e5', 'lorraineann.ramos@unitedneon.com', 6, 'active', 'active'),
(8, 16, '88010102', '4f8f5631fd4406c206cfb7c4b8cf8fd9', 'danielchristopher.lim@unitedneon.com', 3, 'active', 'active'),
(9, 19, 'norvinkyle', '0192023a7bbd73250516f069df18b500', 'norvinkyle@gmail.com', 6, 'active', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `hr_user_level`
--

CREATE TABLE `hr_user_level` (
  `job_level_id` int(11) NOT NULL,
  `job_level_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_user_level`
--

INSERT INTO `hr_user_level` (`job_level_id`, `job_level_name`) VALUES
(1, 'super admin'),
(2, 'admin'),
(3, 'executive'),
(4, 'manager'),
(5, 'supervisor'),
(6, 'rank and file');

--
-- Indexes for dumped tables
--

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
  ADD KEY `eval_form_id` (`eval_form_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `hr_eval_form_fp_ibfk_9` (`approved_by`);

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
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_kpi_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`);

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
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_kpi_id`),
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
  ADD PRIMARY KEY (`eval_form_sp_pillar_ratings_id`);

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
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_kpi_id`),
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
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_kpi_id`),
  ADD KEY `hr_eval_form_sp_yee_ibfk_2` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_yee_rating`
--
ALTER TABLE `hr_eval_form_sp_yee_rating`
  ADD PRIMARY KEY (`yee_rating_id`),
  ADD KEY `hr_eval_form_sp_yee_id` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_kpi`
--
ALTER TABLE `hr_kpi`
  ADD PRIMARY KEY (`kpi_id`),
  ADD KEY `objective_id` (`objective_id`);

--
-- Indexes for table `hr_kpi_year_duration`
--
ALTER TABLE `hr_kpi_year_duration`
  ADD PRIMARY KEY (`kpi_year_duration_id`);

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
-- Indexes for table `hr_request_discussion`
--
ALTER TABLE `hr_request_discussion`
  ADD PRIMARY KEY (`ID`);

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
  ADD UNIQUE KEY `EMPLOYEE_ID` (`employee_id`),
  ADD KEY `company` (`company`),
  ADD KEY `department` (`department`),
  ADD KEY `primary_evaluator` (`primary_evaluator`),
  ADD KEY `secondary_evaluator` (`secondary_evaluator`),
  ADD KEY `tertiary_evaluator` (`tertiary_evaluator`),
  ADD KEY `request_consult` (`request_consult`);

--
-- Indexes for table `hr_user_accounts`
--
ALTER TABLE `hr_user_accounts`
  ADD PRIMARY KEY (`account_id`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `user_type` (`user_type`);

--
-- Indexes for table `hr_user_level`
--
ALTER TABLE `hr_user_level`
  ADD PRIMARY KEY (`job_level_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hr_company`
--
ALTER TABLE `hr_company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_departments`
--
ALTER TABLE `hr_departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  MODIFY `hr_eval_form_pillar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp`
--
ALTER TABLE `hr_eval_form_sp`
  MODIFY `hr_eval_form_sp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_fq`
--
ALTER TABLE `hr_eval_form_sp_fq`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_fq_rating`
--
ALTER TABLE `hr_eval_form_sp_fq_rating`
  MODIFY `fq_rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_myr`
--
ALTER TABLE `hr_eval_form_sp_myr`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_myr_rating`
--
ALTER TABLE `hr_eval_form_sp_myr_rating`
  MODIFY `myr_rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_tq_rating`
--
ALTER TABLE `hr_eval_form_sp_tq_rating`
  MODIFY `tq_rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_yee`
--
ALTER TABLE `hr_eval_form_sp_yee`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_yee_rating`
--
ALTER TABLE `hr_eval_form_sp_yee_rating`
  MODIFY `yee_rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hr_kpi`
--
ALTER TABLE `hr_kpi`
  MODIFY `kpi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hr_kpi_year_duration`
--
ALTER TABLE `hr_kpi_year_duration`
  MODIFY `kpi_year_duration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hr_objectives`
--
ALTER TABLE `hr_objectives`
  MODIFY `objective_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hr_pillars`
--
ALTER TABLE `hr_pillars`
  MODIFY `pillar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_request_discussion`
--
ALTER TABLE `hr_request_discussion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hr_target_metrics`
--
ALTER TABLE `hr_target_metrics`
  MODIFY `target_metrics_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `hr_users`
--
ALTER TABLE `hr_users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `hr_user_accounts`
--
ALTER TABLE `hr_user_accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `hr_user_level`
--
ALTER TABLE `hr_user_level`
  MODIFY `job_level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `hr_users_ibfk_1` FOREIGN KEY (`company`) REFERENCES `hr_company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_users_ibfk_2` FOREIGN KEY (`department`) REFERENCES `hr_departments` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_users_ibfk_3` FOREIGN KEY (`request_consult`) REFERENCES `hr_request_discussion` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_user_accounts`
--
ALTER TABLE `hr_user_accounts`
  ADD CONSTRAINT `hr_user_accounts_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `hr_users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_user_accounts_ibfk_2` FOREIGN KEY (`user_type`) REFERENCES `hr_user_level` (`job_level_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
