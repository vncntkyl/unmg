-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2023 at 11:32 PM
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
(1, 'United Neon Advertising Inc'),
(2, 'Tap Ads Media Corp'),
(3, 'InnovationOne'),
(4, 'Onion Bulb Productions');

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
(1, 1, 'Information Systems and Technology Integration', 0, 0),
(4, 2, 'Sales', 0, 0),
(5, 3, 'Marketing', 0, 0),
(6, 1, 'Sales', 0, 0),
(7, 1, 'Finance', 0, 0),
(8, 1, 'Affiliates', 0, 0),
(9, 2, 'Operations', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form`
--

CREATE TABLE `hr_eval_form` (
  `hr_eval_form_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `approved_by` varchar(255) NOT NULL,
  `approved_by_2` varchar(255) NOT NULL,
  `ratees_comment` text NOT NULL,
  `recommendation` text NOT NULL,
  `CreationDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form`
--

INSERT INTO `hr_eval_form` (`hr_eval_form_id`, `users_id`, `approved_by`, `approved_by_2`, `ratees_comment`, `recommendation`, `CreationDate`) VALUES
(3, 2, '', '', '', '', '2023-06-15 02:08:27');

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
(3, 3, 2, NULL);

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
(1, 3, 3, 1, 20),
(2, 3, 3, 2, 35),
(3, 3, 3, 3, 15),
(4, 3, 3, 4, 30);

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
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_fq`
--

CREATE TABLE `hr_eval_form_sp_fq` (
  `eval_form_sp_fq_id` int(11) NOT NULL,
  `results` text NOT NULL,
  `remarks` text NOT NULL,
  `fq_review_date` date NOT NULL,
  `hr_eval_form_pillars_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_fq`
--

INSERT INTO `hr_eval_form_sp_fq` (`eval_form_sp_fq_id`, `results`, `remarks`, `fq_review_date`, `hr_eval_form_pillars_id`, `hr_eval_form_sp_id`) VALUES
(1, '', '', '0000-00-00', 1, 1),
(2, '', '', '0000-00-00', 2, 1),
(3, '', '', '0000-00-00', 3, 1),
(4, '', '', '0000-00-00', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_myr`
--

CREATE TABLE `hr_eval_form_sp_myr` (
  `hr_eval_form_sp_myr_id` int(11) NOT NULL,
  `results` text NOT NULL,
  `status` text NOT NULL,
  `remarks` text NOT NULL,
  `actions_to_address` text NOT NULL,
  `myr_review_date` date NOT NULL,
  `hr_eval_form_pillars_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_myr`
--

INSERT INTO `hr_eval_form_sp_myr` (`hr_eval_form_sp_myr_id`, `results`, `status`, `remarks`, `actions_to_address`, `myr_review_date`, `hr_eval_form_pillars_id`, `hr_eval_form_sp_id`) VALUES
(1, '', '', '', '', '0000-00-00', 1, 1),
(2, '', '', '', '', '0000-00-00', 2, 1),
(3, '', '', '', '', '0000-00-00', 3, 1),
(4, '', '', '', '', '0000-00-00', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_tq`
--

CREATE TABLE `hr_eval_form_sp_tq` (
  `hr_eval_form_sp_tq_id` int(11) NOT NULL,
  `results` text NOT NULL,
  `reason_for_variance` text NOT NULL,
  `tq_review_date` date NOT NULL,
  `hr_eval_form_pillars_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_tq`
--

INSERT INTO `hr_eval_form_sp_tq` (`hr_eval_form_sp_tq_id`, `results`, `reason_for_variance`, `tq_review_date`, `hr_eval_form_pillars_id`, `hr_eval_form_sp_id`) VALUES
(1, '', '', '0000-00-00', 1, 1),
(2, '', '', '0000-00-00', 2, 1),
(3, '', '', '0000-00-00', 3, 1),
(4, '', '', '0000-00-00', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_yee`
--

CREATE TABLE `hr_eval_form_sp_yee` (
  `hr_eval_form_sp_yee_id` int(11) NOT NULL,
  `results` text NOT NULL,
  `remarks` text NOT NULL,
  `yee_review_date` date NOT NULL,
  `hr_eval_form_pillars_id` int(11) NOT NULL,
  `hr_eval_form_sp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_yee`
--

INSERT INTO `hr_eval_form_sp_yee` (`hr_eval_form_sp_yee_id`, `results`, `remarks`, `yee_review_date`, `hr_eval_form_pillars_id`, `hr_eval_form_sp_id`) VALUES
(1, '', '', '0000-00-00', 1, 1),
(2, '', '', '0000-00-00', 2, 1),
(3, '', '', '0000-00-00', 3, 1),
(4, '', '', '0000-00-00', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hr_eval_form_sp_yee_rating`
--

CREATE TABLE `hr_eval_form_sp_yee_rating` (
  `eval_form_sp_yee_rating_id` int(11) NOT NULL,
  `agreed_rating` decimal(10,0) NOT NULL,
  `wtd_rating` decimal(10,0) NOT NULL,
  `hr_eval_form_sp_yee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hr_eval_form_sp_yee_rating`
--

INSERT INTO `hr_eval_form_sp_yee_rating` (`eval_form_sp_yee_rating_id`, `agreed_rating`, `wtd_rating`, `hr_eval_form_sp_yee_id`) VALUES
(1, 0, 0, 1),
(2, 0, 0, 2),
(3, 0, 0, 3),
(4, 0, 0, 4);

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
(1, 1, 'Earned 1000', 10),
(2, 1, 'Gastos 5k only this month', 5),
(3, 2, 'loan with only 2k', 5),
(4, 3, 'delighted sa output', 20),
(5, 3, 'babalikan ng customers and clients', 10),
(6, 3, 'service excellence', 5),
(7, 4, 'makabenta ng marami', 5),
(8, 4, 'nakafocus sa customer needs', 5),
(9, 4, 'data driven ang decisions', 5),
(10, 5, 'maging friends sa lahat', 10),
(11, 6, 'sapat na resources for all', 10),
(12, 7, 'collab with everyone', 10);

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
(1, 1, 3, 'Financial Objective 1'),
(2, 1, 3, 'Financial Objective 2'),
(3, 2, 3, 'delight objective 1'),
(4, 3, 3, 'operational objective 1'),
(5, 4, 3, 'organizational objective 1'),
(6, 4, 3, 'organizational objective 2'),
(7, 4, 3, 'organizational objective 3');

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
(1, 1, 'Naubos', 1),
(2, 2, '5k below na lang natira', 1),
(3, 3, 'nakaipon 10k', 1),
(4, 4, 'lagpas 10k naipon', 1),
(5, 1, 'jusq ubos sweldo', 2),
(6, 2, '1000 nalang HAHA', 2),
(7, 3, 'sumakto sa 5k', 2),
(8, 4, 'gastos is below 5k', 2),
(9, 1, 'hanap kana sideline for loan galore mo', 3),
(10, 2, 'lumagpas na sa loan', 3),
(11, 3, 'nakareach sa budget', 3),
(12, 4, 'di nagloan', 3),
(13, 1, 'shinout out sa fb pero sinabihang scammer', 4),
(14, 2, 'shinout out na lang sa fb', 4),
(15, 3, 'binayaran ng tama', 4),
(16, 4, 'binigyan ng tip', 4),
(17, 1, 'ghost agad autoblock di na hiningi yung product', 5),
(18, 2, 'thank you next', 5),
(19, 3, 'saks lang', 5),
(20, 4, 'binalik balikan ng maraming clients', 5),
(21, 1, 'natuyuan na ng dugo', 6),
(22, 2, 'natuwa pero di uulit', 6),
(23, 3, '5 star rating sa linkedin', 6),
(24, 4, 'sumobra', 6),
(25, 1, 'nabulok ang products', 7),
(26, 2, 'nakabenta n slight', 7),
(27, 3, 'nabenta lahat', 7),
(28, 4, 'hinanapan ng additional stocks', 7),
(29, 1, 'customer is not always right', 8),
(30, 2, 'hinihingi tots ni client pero di sinusunod', 8),
(31, 3, 'sumunod sa customer', 8),
(32, 4, 'nagfocus tapos nagbigay ng insights na helpful for client', 8),
(33, 1, 'paladesisyon', 9),
(34, 2, 'mix and match ng data and emotions', 9),
(35, 3, 'everything is well made and transparent according sa presented data.', 9),
(36, 4, 'very data centered', 9),
(37, 1, 'naging kaaway lahat', 10),
(38, 2, 'nakipagfriends pero binackstab', 10),
(39, 3, 'naging friends naman lahat', 10),
(40, 4, 'naging friends lahat pati sa other company', 10),
(41, 1, 'sinolo yung resources', 11),
(42, 2, '10 90 hatian. 10 sa iba tas 90 sakin', 11),
(43, 3, 'balanced lahat', 11),
(44, 4, 'nagpaubaya', 11),
(45, 1, 'di nakisama', 12),
(46, 2, 'nakipagcollab once at di na umulit', 12),
(47, 3, 'nakacollab na yung mga need', 12),
(48, 4, 'nakipagcollab sa lahat pati sa guard duties', 12);

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
  `primary_evaluator` int(11) NOT NULL,
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
(2, 23052908, '../images/profile_2.jpg', 'Mr.', 'Riñoza', 'Vincent Kyle', 'Torres', '', 'Vincent', 1, 1, 'Information Systems and Technology Integration', 'Web Developer', 'project based', '09490376783', '478 Zone 6 Ajose Compound, Borol 2nd, Balagtas, Bulacan 3016', 23052907, NULL, NULL, 'LOCAL', 'FILIPINO', '2023-05-29', NULL, NULL),
(14, 23052907, NULL, NULL, 'Aspan', 'John Vincent', 'Villanueva', NULL, 'JV', 1, 1, 'Information Systems and Technology Integration', 'Web Developer', 'project based', '09754881265', 'Manila', 23052908, NULL, NULL, 'LOCAL', 'filipino', '2023-05-29', NULL, NULL);

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
(1, 2, 'vncntkyl', '3cc31cd246149aec68079241e71e98f6', 'kyle.rinoza2009@gmail.com', 6, 'active', 'active'),
(2, 14, 'jvaspan', '83713ed427153685bc864acbc5cb4cf2', 'johnvincentaspan@gmail.com', 6, 'active', 'active');

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
  ADD PRIMARY KEY (`eval_form_sp_fq_id`),
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_pillars_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_myr`
--
ALTER TABLE `hr_eval_form_sp_myr`
  ADD PRIMARY KEY (`hr_eval_form_sp_myr_id`),
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_pillars_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_tq`
--
ALTER TABLE `hr_eval_form_sp_tq`
  ADD PRIMARY KEY (`hr_eval_form_sp_tq_id`),
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_pillars_id`),
  ADD KEY `hr_eval_form_sp_id` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_yee`
--
ALTER TABLE `hr_eval_form_sp_yee`
  ADD PRIMARY KEY (`hr_eval_form_sp_yee_id`),
  ADD KEY `hr_eval_form_pillars_id` (`hr_eval_form_pillars_id`),
  ADD KEY `hr_eval_form_sp_yee_ibfk_2` (`hr_eval_form_sp_id`);

--
-- Indexes for table `hr_eval_form_sp_yee_rating`
--
ALTER TABLE `hr_eval_form_sp_yee_rating`
  ADD PRIMARY KEY (`eval_form_sp_yee_rating_id`),
  ADD KEY `hr_eval_form_sp_yee_id` (`hr_eval_form_sp_yee_id`);

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
  ADD UNIQUE KEY `EMPLOYEE_ID` (`employee_id`),
  ADD KEY `company` (`company`),
  ADD KEY `department` (`department`),
  ADD KEY `primary_evaluator` (`primary_evaluator`),
  ADD KEY `secondary_evaluator` (`secondary_evaluator`),
  ADD KEY `tertiary_evaluator` (`tertiary_evaluator`);

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
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `hr_eval_form`
--
ALTER TABLE `hr_eval_form`
  MODIFY `hr_eval_form_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hr_eval_form_fp`
--
ALTER TABLE `hr_eval_form_fp`
  MODIFY `hr_eval_form_fp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hr_eval_form_pillars`
--
ALTER TABLE `hr_eval_form_pillars`
  MODIFY `hr_eval_form_pillar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp`
--
ALTER TABLE `hr_eval_form_sp`
  MODIFY `hr_eval_form_sp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_fq`
--
ALTER TABLE `hr_eval_form_sp_fq`
  MODIFY `eval_form_sp_fq_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_myr`
--
ALTER TABLE `hr_eval_form_sp_myr`
  MODIFY `hr_eval_form_sp_myr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_tq`
--
ALTER TABLE `hr_eval_form_sp_tq`
  MODIFY `hr_eval_form_sp_tq_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_yee`
--
ALTER TABLE `hr_eval_form_sp_yee`
  MODIFY `hr_eval_form_sp_yee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_eval_form_sp_yee_rating`
--
ALTER TABLE `hr_eval_form_sp_yee_rating`
  MODIFY `eval_form_sp_yee_rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_kpi`
--
ALTER TABLE `hr_kpi`
  MODIFY `kpi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hr_objectives`
--
ALTER TABLE `hr_objectives`
  MODIFY `objective_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hr_pillars`
--
ALTER TABLE `hr_pillars`
  MODIFY `pillar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hr_target_metrics`
--
ALTER TABLE `hr_target_metrics`
  MODIFY `target_metrics_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `hr_users`
--
ALTER TABLE `hr_users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `hr_user_accounts`
--
ALTER TABLE `hr_user_accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Constraints for table `hr_eval_form_fp`
--
ALTER TABLE `hr_eval_form_fp`
  ADD CONSTRAINT `hr_eval_form_fp_ibfk_7` FOREIGN KEY (`eval_form_id`) REFERENCES `hr_eval_form` (`hr_eval_form_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_fp_ibfk_8` FOREIGN KEY (`created_by`) REFERENCES `hr_users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_fp_ibfk_9` FOREIGN KEY (`approved_by`) REFERENCES `hr_users` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `hr_eval_form_sp_fq_ibfk_1` FOREIGN KEY (`hr_eval_form_pillars_id`) REFERENCES `hr_eval_form_pillars` (`hr_eval_form_pillar_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_fq_ibfk_2` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_myr`
--
ALTER TABLE `hr_eval_form_sp_myr`
  ADD CONSTRAINT `hr_eval_form_sp_myr_ibfk_1` FOREIGN KEY (`hr_eval_form_pillars_id`) REFERENCES `hr_eval_form_pillars` (`hr_eval_form_pillar_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_myr_ibfk_2` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_tq`
--
ALTER TABLE `hr_eval_form_sp_tq`
  ADD CONSTRAINT `hr_eval_form_sp_tq_ibfk_1` FOREIGN KEY (`hr_eval_form_pillars_id`) REFERENCES `hr_eval_form_pillars` (`hr_eval_form_pillar_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_tq_ibfk_2` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_yee`
--
ALTER TABLE `hr_eval_form_sp_yee`
  ADD CONSTRAINT `hr_eval_form_sp_yee_ibfk_1` FOREIGN KEY (`hr_eval_form_pillars_id`) REFERENCES `hr_eval_form_pillars` (`hr_eval_form_pillar_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_eval_form_sp_yee_ibfk_2` FOREIGN KEY (`hr_eval_form_sp_id`) REFERENCES `hr_eval_form_sp` (`hr_eval_form_sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_eval_form_sp_yee_rating`
--
ALTER TABLE `hr_eval_form_sp_yee_rating`
  ADD CONSTRAINT `hr_eval_form_sp_yee_rating_ibfk_1` FOREIGN KEY (`hr_eval_form_sp_yee_id`) REFERENCES `hr_eval_form_sp_yee` (`hr_eval_form_sp_yee_id`);

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
  ADD CONSTRAINT `hr_users_ibfk_3` FOREIGN KEY (`primary_evaluator`) REFERENCES `hr_users` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_users_ibfk_4` FOREIGN KEY (`secondary_evaluator`) REFERENCES `hr_users` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hr_users_ibfk_5` FOREIGN KEY (`tertiary_evaluator`) REFERENCES `hr_users` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
