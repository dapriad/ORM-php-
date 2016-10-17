CREATE DATABASE  IF NOT EXISTS `bd_gamebets`
USE `bd_gamebets`;
-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-10-2016 a las 02:44:54
-- Versión del servidor: 5.5.50-0ubuntu0.14.04.1
-- Versión de PHP: 5.5.9-1ubuntu4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `bd_gamebets`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id_prod` int(20) NOT NULL,
  `prod_name` varchar(200) COLLATE utf8_bin NOT NULL,
  `price` int(15) NOT NULL,
  `dis_date` varchar(15) COLLATE utf8_bin NOT NULL,
  `exp_date` varchar(15) COLLATE utf8_bin NOT NULL,
  `status` varchar(40) COLLATE utf8_bin NOT NULL,
  `avatar` varchar(200) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_prod`, `prod_name`, `price`, `dis_date`, `exp_date`, `status`, `avatar`) VALUES
(12345678, 'Sd', 1200, '10/04/2016', '10/18/2016', 'Preowned', 'media/default-avatar.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;