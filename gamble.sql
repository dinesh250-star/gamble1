-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2022 at 03:23 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamble`
--

-- --------------------------------------------------------

--
-- Table structure for table `match_info`
--

CREATE TABLE `match_info` (
  `id` int(11) NOT NULL,
  `creator` varchar(255) NOT NULL,
  `creator_bet` varchar(255) NOT NULL,
  `joiner` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `state` varchar(255) NOT NULL,
  `winner` varchar(255) NOT NULL,
  `winning_toss` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `match_info`
--

INSERT INTO `match_info` (`id`, `creator`, `creator_bet`, `joiner`, `amount`, `state`, `winner`, `winning_toss`) VALUES
(9, '0x22352dcf5834202a95780bc5776f2bc15f8c1a30', 'Heads', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 0.011, 'completed', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Tails'),
(60, '0x532f182b4cc3400baf1de4583269c7fef6377a12', 'Heads', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 0.1, 'completed', '0x532f182b4cc3400baf1de4583269c7fef6377a12', 'Heads'),
(61, '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199', 'Heads', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 0.00001, 'completed', '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199', 'Heads'),
(101, '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 0.1, 'completed', '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads'),
(102, '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 0.1, 'completed', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads'),
(103, '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads', '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 0.1, 'completed', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads'),
(104, '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads', '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 0.1, 'completed', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads'),
(105, '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads', '0x532f182b4cc3400baf1de4583269c7fef6377a12', 0.1, 'completed', '0x532f182b4cc3400baf1de4583269c7fef6377a12', 'Tails'),
(106, '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads', '0x532f182b4cc3400baf1de4583269c7fef6377a12', 0.1, 'completed', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads'),
(107, '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads', '0x532f182b4cc3400baf1de4583269c7fef6377a12', 0.1, 'completed', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads'),
(111, '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 0.1, 'completed', '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads'),
(112, '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 0.1, 'completed', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads'),
(113, '0x532f182b4cc3400baf1de4583269c7fef6377a12', 'Heads', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 0.18, 'completed', '0x532f182b4cc3400baf1de4583269c7fef6377a12', 'Heads'),
(114, '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 1, 'completed', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Tails'),
(115, '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads', '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 0.5, 'completed', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads'),
(116, '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 0.1, 'completed', '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads'),
(117, '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads', '0x548fc43d54b60ed42023bc5c02021d48ac836b42', 0.1, 'completed', '0x548fc43d54b60ed42023bc5c02021d48ac836b42', 'Tails'),
(119, '0x548fc43d54b60ed42023bc5c02021d48ac836b42', 'Tails', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 0.1, 'completed', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads'),
(123, '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Tails', '0x548fc43d54b60ed42023bc5c02021d48ac836b42', 1, 'completed', '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Tails'),
(124, '0x22352dcf5834202a95780bc5776f2bc15f8c1a30', 'Heads', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 1, 'completed', '0x22352dcf5834202a95780bc5776f2bc15f8c1a30', 'Heads'),
(126, '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads', '0x22352dcf5834202a95780bc5776f2bc15f8c1a30', 1, 'completed', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads'),
(127, '0x532f182b4cc3400baf1de4583269c7fef6377a12', 'Tails', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 1, 'completed', '0x532f182b4cc3400baf1de4583269c7fef6377a12', 'Tails'),
(128, '0xccf29c8ab561e55c06f988c9d9bc2cc3c0822afd', 'Heads', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 1, 'completed', '0xccf29c8ab561e55c06f988c9d9bc2cc3c0822afd', 'Heads'),
(129, '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 1, 'completed', '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads'),
(130, '0x5c7543fc2af8123e74aa8561e01672997b513e2f', 'Tails', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 1, 'completed', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 'Heads'),
(131, '0x9b12b63ca5380c35c279a6391b36d25958c38419', 'Tails', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 1, 'completed', '0x9b12b63ca5380c35c279a6391b36d25958c38419', 'Tails'),
(132, '0x548fc43d54b60ed42023bc5c02021d48ac836b42', 'Heads', '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 1, 'completed', '0x548fc43d54b60ed42023bc5c02021d48ac836b42', 'Heads'),
(133, '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads', '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 1, 'completed', '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Tails'),
(134, '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 'Heads', '', 1, 'pending', '', ''),
(135, '0xb157e57e493167491c8ee69681d89873a9d68b1c', 'Heads', '', 1, 'pending', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `coins` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `address`, `coins`) VALUES
(18, '0xb157e57e493167491c8ee69681d89873a9d68b1c', 0.39607),
(19, '0x1f16d5e592c32757acce8ec799cbaa7d985570ff', 3.27074),
(21, '0x75aec93e248cc80b2f5cbcf3e97a5cf45f1adb03', 4.22785),
(22, '0x532f182b4cc3400baf1de4583269c7fef6377a12', 2.342),
(23, '0x22352dcf5834202a95780bc5776f2bc15f8c1a30', 0.911),
(45, '0x06001ae14a2129cd7ef7fd07cf1ecc0e00d3505e', 0),
(46, '0x7778ecaf6b3983b7ab2bfbda7ee9a10c66fa37da', 0),
(47, '0xb34404c5bc516c406027f7395f45c39a0b9c8e29', 0),
(48, '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199', 0.00002),
(49, '0xcabd31048ac5d57faa20b984931415cd3001d51b', 0),
(50, '0x548fc43d54b60ed42023bc5c02021d48ac836b42', 2.49),
(51, '0xccf29c8ab561e55c06f988c9d9bc2cc3c0822afd', 1.9),
(52, '0x5c7543fc2af8123e74aa8561e01672997b513e2f', 0),
(53, '0x9b12b63ca5380c35c279a6391b36d25958c38419', 2.9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `match_info`
--
ALTER TABLE `match_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `match_info`
--
ALTER TABLE `match_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
