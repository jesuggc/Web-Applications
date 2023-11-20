-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2023 a las 11:22:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ucm_riu`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_riu_fac_facultades`
--

CREATE TABLE `ucm_aw_riu_fac_facultades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ucm_aw_riu_fac_facultades`
--

INSERT INTO `ucm_aw_riu_fac_facultades` (`id`, `nombre`) VALUES
(1, 'Bellas Artes'),
(2, 'Ciencias Biológicas'),
(3, 'Ciencias de la Documentación'),
(4, 'Ciencias de la Información'),
(5, 'Ciencias Económicas y Empresariales'),
(6, 'Ciencias Físicas'),
(7, 'Ciencias Geológicas'),
(8, 'Ciencias Matemáticas'),
(9, 'Ciencias Políticas y Sociología'),
(10, 'Ciencias Químicas'),
(11, 'Comercio y Turismo'),
(12, 'Derecho'),
(13, 'Educación – Centro de Formación del Profesorado'),
(14, 'Enfermería, Fisioterapia y Podología'),
(15, 'Estudios Estadísticos'),
(16, 'Farmacia'),
(17, 'Filología'),
(18, 'Filosofía'),
(19, 'Geografía e Historia'),
(20, 'Informática'),
(21, 'Medicina'),
(22, 'Odontología'),
(23, 'Óptica y Optometría'),
(24, 'Psicología'),
(25, 'Trabajo Social'),
(26, 'Veterinaria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_riu_gra_grados`
--

CREATE TABLE `ucm_aw_riu_gra_grados` (
  `id` int(11) NOT NULL,
  `idFacultad` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `dobleGrado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ucm_aw_riu_gra_grados`
--

INSERT INTO `ucm_aw_riu_gra_grados` (`id`, `idFacultad`, `nombre`, `dobleGrado`) VALUES
(1, 1, 'Bellas Artes', 0),
(2, 1, 'Conservación y Restauración del Patrimonio Cultural', 0),
(3, 1, 'Diseño', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_riu_usu_usuarios`
--

CREATE TABLE `ucm_aw_riu_usu_usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido1` varchar(20) NOT NULL,
  `apellido2` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ucm_aw_riu_usu_usuarios`
--

INSERT INTO `ucm_aw_riu_usu_usuarios` (`id`, `nombre`, `apellido1`, `apellido2`, `correo`, `contrasena`) VALUES
(1, 'Queco', 'Fernandez', 'Muller', 'quecoñete@ucm.es', 'PulpoGuitarra23'),
(2, 'a', 'a', 'a', 'a', 'a'),
(3, '', '', '', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ucm_aw_riu_fac_facultades`
--
ALTER TABLE `ucm_aw_riu_fac_facultades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ucm_aw_riu_gra_grados`
--
ALTER TABLE `ucm_aw_riu_gra_grados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idFacultad` (`idFacultad`);

--
-- Indices de la tabla `ucm_aw_riu_usu_usuarios`
--
ALTER TABLE `ucm_aw_riu_usu_usuarios`
  ADD PRIMARY KEY (`id`,`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_fac_facultades`
--
ALTER TABLE `ucm_aw_riu_fac_facultades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_gra_grados`
--
ALTER TABLE `ucm_aw_riu_gra_grados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_usu_usuarios`
--
ALTER TABLE `ucm_aw_riu_usu_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ucm_aw_riu_gra_grados`
--
ALTER TABLE `ucm_aw_riu_gra_grados`
  ADD CONSTRAINT `ucm_aw_riu_gra_grados_ibfk_1` FOREIGN KEY (`idFacultad`) REFERENCES `ucm_aw_riu_fac_facultades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
