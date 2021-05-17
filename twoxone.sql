-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2021 at 09:50 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `twoxone`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `booking_ticket` int(11) NOT NULL,
  `booking_total_price` int(11) NOT NULL,
  `booking_payment_method` int(11) NOT NULL,
  `booking_status` varchar(250) DEFAULT NULL,
  `booking_created_at` timestamp NULL DEFAULT current_timestamp(),
  `booking_updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `premiere_id`, `user_id`, `booking_ticket`, `booking_total_price`, `booking_payment_method`, `booking_status`, `booking_created_at`, `booking_updated_at`) VALUES
(72, 13, 41, 3, 10, 1, 'OK', '2021-04-25 16:47:37', '2021-04-25 16:47:37'),
(73, 13, 0, 3, 10, 2, 'OK', '2021-04-25 16:48:13', '2021-04-25 16:48:13'),
(77, 13, 0, 3, 10, 4, 'OK', '2021-04-25 16:53:28', '2021-04-25 16:53:28'),
(78, 13, 0, 3, 10, 5, 'OK', '2021-04-25 16:53:32', '2021-04-25 16:53:32'),
(79, 13, 0, 3, 10, 6, 'OK', '2021-04-25 16:53:35', '2021-04-25 16:53:35'),
(80, 13, 0, 3, 10, 7, 'OK', '2021-04-25 16:53:39', '2021-04-25 16:53:39'),
(81, 17, 19, 3, 10, 8, 'OK', '2021-04-25 16:53:42', '2021-04-25 16:53:42'),
(82, 17, 19, 3, 10, 1, 'OK', '2021-05-03 07:06:38', '2021-05-03 07:06:38');

-- --------------------------------------------------------

--
-- Table structure for table `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `booking_seat_location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_seat`
--

INSERT INTO `booking_seat` (`booking_seat_id`, `booking_id`, `booking_seat_location`) VALUES
(47, 66, 'A1'),
(48, 66, 'B1'),
(49, 66, 'C1'),
(50, 67, 'A1'),
(51, 67, 'B1'),
(52, 67, 'C1'),
(53, 68, 'A1'),
(54, 68, 'B1'),
(55, 68, 'C1'),
(56, 69, 'A1'),
(57, 69, 'B1'),
(58, 69, 'C1'),
(59, 70, 'A1'),
(60, 70, 'B1'),
(61, 70, 'C1'),
(62, 71, 'A1'),
(63, 71, 'B1'),
(64, 71, 'C1'),
(65, 76, 'A1'),
(66, 77, 'A1'),
(67, 78, 'A1'),
(68, 79, 'A1'),
(69, 80, 'A1'),
(70, 81, 'A1');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location_name` varchar(120) NOT NULL,
  `location_address` varchar(250) NOT NULL,
  `location_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `location_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location_name`, `location_address`, `location_created_at`, `location_updated_at`) VALUES
(10, 'Bogor', 'Bogor Trade Mall Lt 4', '2021-04-13 15:15:55', '2021-04-13 15:15:55'),
(12, 'Jakarta', 'Jakarta Pusat, Pondok Indah Mall', '2021-04-25 23:11:48', '2021-04-25 23:11:48'),
(13, 'Purwokerto', 'Alun-alun Purwekerto', '2021-04-25 23:22:13', '2021-04-25 23:22:13');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(250) NOT NULL,
  `movie_category` varchar(150) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_director` varchar(150) NOT NULL,
  `movie_duration` time NOT NULL,
  `movie_cast` varchar(250) NOT NULL,
  `movie_image` varchar(100) NOT NULL,
  `movie_synopsis` varchar(1024) NOT NULL,
  `movie_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `movie_updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_category`, `movie_release_date`, `movie_director`, `movie_duration`, `movie_cast`, `movie_image`, `movie_synopsis`, `movie_created_at`, `movie_updated_at`) VALUES
(210, 'Batman', 'Action', '2001-12-12', 'Test', '02:13:00', 'Tom', '2021-05-09T16-10-37.137ZTW.png', 'A', '2021-05-09 16:10:37', '2021-05-09 16:10:37'),
(211, 'Spider-Man: Homecoming', 'Action,Adventure,Comedy', '2020-08-27', 'Test', '02:13:00', 'Tom', '2021-05-10T04-25-35.445Zlogos_google-pay.png', 'A', '2021-05-10 04:25:36', '2021-05-10 04:25:36');

-- --------------------------------------------------------

--
-- Table structure for table `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `premiere_name` varchar(250) NOT NULL,
  `premiere_price` int(11) NOT NULL,
  `premiere_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `premiere_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `premiere_name`, `premiere_price`, `premiere_created_at`, `premiere_updated_at`) VALUES
(20, 207, 10, '22', 10, '2021-04-25 23:26:46', '2021-04-25 23:26:46'),
(21, 73, 13, 'CineOne 21', 10, '2021-04-25 23:27:54', '2021-04-25 23:27:54'),
(22, 73, 13, 'VVIP', 10, '2021-04-25 23:29:08', '2021-04-25 23:29:08'),
(23, 84, 0, 'CineOne 21', 0, '2021-04-26 01:05:42', '2021-04-26 01:05:42'),
(24, 85, 0, 'CineOne 21', 0, '2021-04-26 01:11:40', '2021-04-26 01:11:40'),
(25, 86, 0, 'CineOne 21', 0, '2021-04-26 01:15:01', '2021-04-26 01:15:01'),
(26, 87, 0, 'CineOne 21', 0, '2021-04-26 01:15:25', '2021-04-26 01:15:25'),
(27, 88, 0, 'CineOne 21', 0, '2021-04-26 01:17:57', '2021-04-26 01:17:57'),
(28, 89, 0, 'CineOne 21', 0, '2021-04-26 01:20:17', '2021-04-26 01:20:17'),
(29, 1, 1, 'CGV', 50000, '2021-05-08 22:57:11', '2021-05-08 22:57:11'),
(30, 1, 1, 'CGV', 50000, '2021-05-08 23:00:32', '2021-05-08 23:00:32'),
(31, 1, 1, 'CGV', 50000, '2021-05-08 23:13:07', '2021-05-08 23:13:07'),
(32, 1, 1, 'CGV', 50000, '2021-05-08 23:13:50', '2021-05-08 23:13:50'),
(33, 1, 1, 'CGV', 50000, '2021-05-08 23:16:58', '2021-05-08 23:16:58'),
(34, 1, 1, 'CGV', 50000, '2021-05-08 23:17:39', '2021-05-08 23:17:39'),
(35, 1, 1, 'CGV', 50000, '2021-05-08 23:18:27', '2021-05-08 23:18:27'),
(50, 211, 12, 'ebv.id', 10, '2021-05-10 00:24:51', '2021-05-10 00:24:51'),
(51, 210, 12, '21', 10, '2021-05-10 02:01:51', '2021-05-10 02:01:51');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `schedule_date_start` date NOT NULL,
  `schedule_date_end` date NOT NULL,
  `schedule_time` time NOT NULL,
  `schedule_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `schedule_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `premiere_id`, `schedule_date_start`, `schedule_date_end`, `schedule_time`, `schedule_created_at`, `schedule_updated_at`) VALUES
(7, 17, '2021-11-01', '2021-05-09', '08:30:00', '2021-04-14 02:50:05', '2021-04-14 02:50:05'),
(8, 18, '2021-03-16', '2021-05-09', '10:30:00', '2021-04-25 13:52:53', '2021-04-25 13:52:53'),
(9, 20, '2021-03-16', '2021-05-09', '12:00:00', '2021-04-25 23:15:33', '2021-04-25 23:15:33'),
(10, 19, '2021-03-16', '2021-05-09', '08:00:00', '2021-04-25 23:19:17', '2021-04-25 23:19:17'),
(11, 21, '2021-03-16', '2021-05-09', '04:00:00', '2021-04-25 23:28:33', '2021-04-25 23:28:33'),
(12, 22, '2021-04-08', '2021-05-09', '02:00:00', '2021-04-25 23:29:44', '2021-04-25 23:29:44'),
(13, 32, '0000-00-00', '2021-05-09', '00:00:08', '2021-05-08 23:13:50', '2021-05-08 23:13:50'),
(14, 32, '0000-00-00', '2021-05-09', '00:00:20', '2021-05-08 23:13:50', '2021-05-08 23:13:50'),
(15, 34, '2021-05-02', '2021-07-24', '00:00:08', '2021-05-08 23:17:39', '2021-05-08 23:17:39'),
(16, 34, '2021-05-02', '2021-07-24', '00:00:20', '2021-05-08 23:17:39', '2021-05-08 23:17:39'),
(17, 35, '2021-05-02', '2021-07-24', '00:08:30', '2021-05-08 23:18:28', '2021-05-08 23:18:28'),
(18, 35, '2021-05-02', '2021-07-24', '00:20:30', '2021-05-08 23:18:28', '2021-05-08 23:18:28'),
(19, 36, '2021-05-10', '2021-05-12', '00:08:30', '2021-05-09 00:46:09', '2021-05-09 00:46:09'),
(20, 36, '2021-05-10', '2021-05-12', '00:10:30', '2021-05-09 00:46:09', '2021-05-09 00:46:09'),
(21, 36, '2021-05-10', '2021-05-12', '00:12:00', '2021-05-09 00:46:09', '2021-05-09 00:46:09'),
(35, 39, '2021-04-26', '2021-05-26', '00:08:30', '2021-05-09 01:47:41', '2021-05-09 01:47:41'),
(36, 39, '2021-04-26', '2021-05-26', '00:10:30', '2021-05-09 01:47:41', '2021-05-09 01:47:41'),
(37, 39, '2021-04-26', '2021-05-26', '00:12:00', '2021-05-09 01:47:41', '2021-05-09 01:47:41'),
(38, 40, '2021-05-02', '2021-07-24', '00:08:30', '2021-05-09 12:05:26', '2021-05-09 12:05:26'),
(39, 40, '2021-05-02', '2021-07-24', '00:20:30', '2021-05-09 12:05:26', '2021-05-09 12:05:26'),
(40, 41, '2021-05-10', '2021-05-11', '08:30:00', '2021-05-09 23:51:40', '2021-05-09 23:51:40'),
(41, 42, '2021-05-10', '2021-05-11', '08:30:00', '2021-05-09 23:54:46', '2021-05-09 23:54:46'),
(42, 43, '2021-05-10', '2021-05-11', '08:30:00', '2021-05-09 23:55:54', '2021-05-09 23:55:54'),
(43, 44, '2021-05-10', '2021-05-11', '10:30:00', '2021-05-09 23:56:53', '2021-05-09 23:56:53'),
(44, 45, '2021-05-10', '2021-05-11', '08:30:00', '2021-05-10 00:01:57', '2021-05-10 00:01:57'),
(45, 46, '2021-05-10', '2021-05-11', '08:30:00', '2021-05-10 00:02:43', '2021-05-10 00:02:43'),
(46, 47, '2021-05-10', '2021-05-11', '08:30:00', '2021-05-10 00:08:18', '2021-05-10 00:08:18'),
(47, 48, '2021-05-10', '2021-05-15', '08:30:00', '2021-05-10 00:23:58', '2021-05-10 00:23:58'),
(48, 49, '2021-05-10', '2021-05-12', '08:30:00', '2021-05-10 00:24:36', '2021-05-10 00:24:36'),
(49, 50, '2021-05-10', '2021-05-19', '10:30:00', '2021-05-10 00:24:51', '2021-05-10 00:24:51'),
(50, 51, '2021-05-10', '2021-05-12', '08:30:00', '2021-05-10 02:01:51', '2021-05-10 02:01:51'),
(51, 52, '2021-05-10', '2021-05-14', '08:30:00', '2021-05-10 03:14:54', '2021-05-10 03:14:54');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_phone` int(150) NOT NULL,
  `user_type` varchar(64) NOT NULL,
  `user_validate` tinyint(1) NOT NULL,
  `user_image` varchar(250) NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_type`, `user_validate`, `user_image`, `user_created_at`, `user_updated_at`) VALUES
(19, 'Fajar Dwi', 'wauloh12@gmail.com', '$2b$10$zYmEVC/72Q3BnUjrIYLc9esbtpgfjyzKcOWKSL2aS3ueIYwhJ7YQ2', 1230980, 'user', 1, '', '2021-05-03 14:17:33', '2021-05-03 14:17:33'),
(41, 'Alfin R', 'alfinertctr@gmail.com', '$2b$10$Cd8uWetnB6ds3ir3hEP0juamPnCMIlSMAl9DIBzW0vcsQc9oHrtqi', 90980, 'admin', 1, '2021-05-10T03-17-04.226ZEllipse 11.png', '2021-05-10 10:17:04', '2021-05-10 10:17:04'),
(42, 'Ajay Dwi', 'alfinertctr@gmail.com', '$2b$10$fdVwq.nR23dkmHFcuux2mO8cffMklp3MOjUK2VDulg2PCMrSlYsPe', 2147483647, 'admin', 1, '2021-05-09T16-53-50.608ZVector.png', '2021-05-09 23:53:50', '2021-05-09 23:53:50'),
(43, 'admin1', 'alfinertctr12@gmail.com', '$2b$10$KEgy/CiMAFe6VGs/e/.m4O4xnbO9Jt/dJx7/5TH.kDO2SFnReiiaS', 0, 'user', 0, '', '2021-05-05 00:03:22', NULL),
(44, 'asd', 'alfinertctr123@gmail.com', '$2b$10$PyWhiT5WPMHspxin2CVpI.AjHKyIz6kGFnFZpuvpxBEOEGZ2UE5ZS', 0, 'user', 0, '', '2021-05-05 00:05:35', NULL),
(45, '123', 'alfin@gmail.com', '$2b$10$d3I8iijHYycQqnL2SKQEOunt41JTSfUkFx4GD8.On8TEt9iSfhbne', 0, 'user', 0, '', '2021-05-05 00:06:43', NULL),
(46, 'asd', 'alfinertctr45@gmail.com', '$2b$10$ofKg4XOcwPU/rzh8PxYP7Oeodu5Spx52En2smtFkgvcvHFh5uGi5W', 0, 'user', 0, '', '2021-05-05 00:10:47', NULL),
(47, '', '', '$2b$10$9QdFoklQzovL95QcMlpYc.G78cOMSsaxxBlU0aKBKk62a5WlBoTTO', 0, 'user', 0, '', '2021-05-05 00:11:20', NULL),
(48, 'ajay', 'hidayahfajar20@gmail.com', '$2b$10$N4w3zRGMcDA994FMCV5z7uMGBWKDdKeyonC9y8umxXqlJYrsP.CoK', 0, 'user', 0, '', '2021-05-05 00:13:05', NULL),
(49, '123', 'alfinertctrqwe@gmail.com', '$2b$10$V6SHJoJ9oe9r9n0tnx.h9e6KbdYfT0AKZtwem.2xRRLpScGIoikZS', 0, 'user', 0, '', '2021-05-10 09:39:26', NULL),
(50, 'as asd', 'hidayahfajar20@gmail.com', '$2b$10$Zf4rJGpL7Zea8Hn/0QUCqe5Pj0Pupe7.XtiV.fnRXPhMW5krO3TPC', 90980, 'admin', 0, '2021-05-10T03-03-29.806Zbx_bxl-instagram.png', '2021-05-10 10:03:29', '2021-05-10 10:03:29'),
(51, 'admin', 'alfinramadhan98@gmail.com', '$2b$10$nBCNgI3BfyI3Ml1I7oPdae9EAV.vdU0vR03a6VrfJ5G0OQ.nwDKZe', 0, 'admin', 0, '', '2021-05-10 10:04:58', NULL),
(52, 'admin', 'alfin12@gmail.com', '$2b$10$fKlvmjGsE.yHOvmTidNXQu3FCpSBoH2JqiE.MdSCGxbWD6ROzi27S', 0, 'admin', 0, '', '2021-05-10 10:12:33', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`booking_seat_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `premiere`
--
ALTER TABLE `premiere`
  ADD PRIMARY KEY (`premiere_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT for table `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
