-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2023 at 09:37 AM
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
(1, 1, 'Information Technology and Systems Integration', 0, 0);

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

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp`
--

CREATE TABLE `hr_eval_form_sp` (
  `hr_eval_form_sp_id` int(11) NOT NULL,
  `eval_form_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `wtd_rating` decimal(10,2) NOT NULL,
  `yee_review_date` date NOT NULL,
  `hr_eval_form_kpi_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 1010101, NULL, NULL, 'Root', 'Admin', '', NULL, 'Super Admin', 1, 1, NULL, 'Super Admin', 'consultant', '09999999999', '4th Floor HPL Bldg, Sen. Gil Puyat Ave., Makati, Philippines', 23052908, NULL, NULL, 'LOCAL', 'Filipino', '0001-01-01', NULL, NULL);

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
(1, 1, 'admin', '17c4520f6cfd1ab53d8745e84681eb49', 'admin@admin.com', 1, 'active', 'active');

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
-- Indexes for table `hr_eval_form_sp_myr`
--
ALTER TABLE `hr_eval_form_sp_myr`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_kpi_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`);

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
-- Indexes for table `hr_eval_form_sp_yee`
--
ALTER TABLE `hr_eval_form_sp_yee`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_kpi_id`),
  ADD KEY `hr_eval_form_sp_yee_ibfk_2` (`hr_eval_form_sp_id`);

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
  MODIFY `hr_eval_form_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_eval_form_fp`
--
ALTER TABLE `hr_eval_form_fp`
  MODIFY `hr_eval_form_fp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_eval_form_pillars`
--
ALTER TABLE `hr_eval_form_pillars`
  MODIFY `hr_eval_form_pillar_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp`
--
ALTER TABLE `hr_eval_form_sp`
  MODIFY `hr_eval_form_sp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_fq`
--
ALTER TABLE `hr_eval_form_sp_fq`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_myr`
--
ALTER TABLE `hr_eval_form_sp_myr`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_pillar_ratings`
--
ALTER TABLE `hr_eval_form_sp_pillar_ratings`
  MODIFY `eval_form_sp_pillar_ratings_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_quarterly_ratings`
--
ALTER TABLE `hr_eval_form_sp_quarterly_ratings`
  MODIFY `quarterly_ratings_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_tq`
--
ALTER TABLE `hr_eval_form_sp_tq`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_yee`
--
ALTER TABLE `hr_eval_form_sp_yee`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_kpi`
--
ALTER TABLE `hr_kpi`
  MODIFY `kpi_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_kpi_year_duration`
--
ALTER TABLE `hr_kpi_year_duration`
  MODIFY `kpi_year_duration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hr_objectives`
--
ALTER TABLE `hr_objectives`
  MODIFY `objective_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_pillars`
--
ALTER TABLE `hr_pillars`
  MODIFY `pillar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_request_discussion`
--
ALTER TABLE `hr_request_discussion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hr_target_metrics`
--
ALTER TABLE `hr_target_metrics`
  MODIFY `target_metrics_id` int(11) NOT NULL AUTO_INCREMENT;

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
