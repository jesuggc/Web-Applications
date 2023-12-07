-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2023 a las 00:37:29
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
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('91IAmP5lk-7n34tNq8F5xOc87Yi9uCK_', 1701989390, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":6,\"nombre\":\"admin\",\"apellido1\":\"adminez\",\"apellido2\":\"adminez\",\"correo\":\"admin@ucm.es\",\"verificado\":1,\"admin\":1}}'),
('By_c3X0s5WqPoZJxm7-lErq_5sNMI81c', 1701992106, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"nombre\":\"a\",\"apellido1\":\"a\",\"apellido2\":\"a\",\"correo\":\"a\",\"verificado\":1,\"admin\":0}}'),
('KyuyuGsdp1MySNRi8OajGCHRxfUtNxUZ', 1701992020, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":6,\"nombre\":\"admin\",\"apellido1\":\"adminez\",\"apellido2\":\"adminez\",\"correo\":\"admin@ucm.es\",\"verificado\":1,\"admin\":1}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_riu_cor_correo`
--

CREATE TABLE `ucm_aw_riu_cor_correo` (
  `id` int(12) NOT NULL,
  `idOrigen` int(12) NOT NULL,
  `idDestino` int(12) NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `cuerpo` varchar(1200) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `leido` tinyint(1) NOT NULL DEFAULT 0,
  `archivado` tinyint(1) NOT NULL DEFAULT 0,
  `favorito` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(3, 1, 'Diseño', 0),
(4, 2, 'Biologia', 0),
(5, 2, 'Bioquimica', 0),
(6, 3, 'Informacion y Documentación', 0),
(7, 3, 'Musicologia', 0),
(8, 4, 'Comunicación Audiovisual', 0),
(9, 4, 'Periodismo', 0),
(10, 4, 'Publicidad y Relaciones Públicas', 0),
(11, 5, 'Administración y Dirección de Empresas (ADE)Publicidad y Relaciones Públicas', 0),
(12, 5, 'Economía', 0),
(13, 5, 'Finanzas, Banca y Seguros', 0),
(14, 6, 'Física', 0),
(15, 6, 'Ingeniería de Materiales', 0),
(16, 6, 'Ingeniería Electrónica de Comunicaciones', 0),
(17, 6, 'Matemáticas - Física', 1),
(18, 7, 'Geología', 0),
(19, 7, 'Ingeniería Geológica', 0),
(20, 8, 'Economía - Matemáticas y Ciencia de Datos', 1),
(21, 8, 'Ingeniería Informática - Matemáticas', 1),
(22, 8, 'Ingeniería Matemática', 0),
(23, 8, 'Matemáticas', 0),
(24, 8, 'Matemáticas - Física', 1),
(25, 8, 'Matemáticas y Ciencia de Datos', 0),
(27, 9, 'Antropología Social y Cultural', 0),
(28, 9, 'Ciencias Políticas - Filosofía', 1),
(29, 9, 'Ciencias Políticas', 0),
(30, 9, 'Derecho - Ciencias Políticas', 1),
(31, 9, 'Doble Titulación Internacional en Ciencias Políticas (UCM) y El Instituto de Estudios Políticos de Toulouse', 1),
(32, 9, 'Economía - Relaciones Internacionales', 1),
(33, 9, 'Gestión y Administración Pública - Economía', 1),
(34, 9, 'Gestión y Administración Pública', 0),
(35, 9, 'Relaciones Internacionales', 0),
(36, 9, 'Sociología', 0),
(37, 9, 'Sociología - Relaciones Internacionales', 1),
(38, 9, 'Terapia Ocupacional', 0),
(39, 10, 'Química', 0),
(40, 10, 'Ingeniería química', 0),
(41, 10, 'Bioquímica', 0),
(42, 10, 'Química - Bioquímica', 1),
(43, 11, 'Comercio', 0),
(44, 11, 'Doble Título Interuniversitario de Grado en Diseño de Moda y de Grado en Comercio, por la UPM y la UCM', 1),
(45, 11, 'Programa Integrado Grado y Máster en Turismo (con la U. Sorbona)', 1),
(46, 11, 'Turismo', 0),
(47, 11, 'Turismo - Comercio', 1),
(48, 12, 'Bachelor of European Studies (BAES). Grado conjunto otorgado por UCM, KUL, UNIBO y JU (Alianza Una Europa)', 0),
(49, 12, 'Criminología', 0),
(50, 12, 'Derecho - Administración y Dirección de Empresas', 1),
(51, 12, 'Derecho - Ciencias Políticas', 1),
(52, 12, 'Derecho - Estudios Jurídico Militares', 1),
(53, 12, 'Derecho - Filosofía', 1),
(54, 12, 'Derecho - Relaciones Laborales y Recursos Humanos', 1),
(55, 12, 'Derecho', 0),
(56, 12, 'Doble Titulación Internacional Grado en Derecho 2020 UCM con la Universidad de la Sorbona', 1),
(57, 12, 'Relaciones Laborales y Recursos Humanos', 0),
(58, 13, 'Declaración Eclesiástica de Competencia Académica (DECA)', 0),
(59, 13, 'Educación Social', 0),
(60, 13, 'Maestro en Educación Infantil', 0),
(61, 13, 'Maestro en Educación Infantil - Maestro en Educación Primaria', 1),
(62, 13, 'Maestro en Educación Infantil - Pedagogía', 1),
(63, 13, 'Maestro en Educación Primaria', 0),
(64, 13, 'Maestro en Educación Primaria - Pedagogía', 1),
(65, 13, 'Musicología', 0),
(66, 13, 'Pedagogía', 0),
(67, 14, 'Enfermería', 0),
(68, 14, 'Farmacia - Nutrición Humana y Dietética', 1),
(69, 14, 'Fisioterapia', 0),
(70, 14, 'Nutrición Humana y Dietética', 0),
(71, 14, 'Podología', 0),
(72, 15, 'Ciencia de los Datos Aplicada', 0),
(73, 15, 'Estadística Aplicada', 0),
(74, 16, 'Bioquímica', 0),
(75, 16, 'Ciencia y Tecnología de los Alimentos', 0),
(76, 16, 'Farmacia - Nutrición Humana y Dietética', 1),
(77, 16, 'Farmacia', 0),
(78, 16, 'Nutrición Humana y Dietética', 0),
(79, 17, 'Ciencias de las Religiones', 0),
(80, 17, 'Español. Lengua y Literatura', 0),
(81, 17, 'Estudios Ingleses', 0),
(82, 17, 'Estudios Semíticos e Islámicos', 0),
(83, 17, 'Filología Clásica', 0),
(84, 17, 'Grado Conjunto en Estudios Hispano-Alemanes (con la U. de Ratisbona)', 0),
(85, 17, 'Historia - Filología Clásica', 1),
(86, 17, 'Lenguas Modernas y sus Literaturas', 0),
(87, 17, 'Lingüística y Lenguas Aplicadas', 0),
(88, 17, 'Literatura General y Comparada', 0),
(89, 17, 'Oferta de Idiomas como Formación Complementaria', 0),
(90, 17, 'Traducción e Interpretación', 0),
(91, 18, 'Arqueología', 0),
(92, 18, 'Asignaturas para la Docencia en Centros Privados y Concertados - Filosofía', 0),
(93, 18, 'Ciencias de las Religiones', 0),
(94, 18, 'Ciencias Políticas - Filosofía', 1),
(95, 18, 'Derecho - Filosofía', 1),
(96, 18, 'Doble Titulación Grado en Filosofía UCM y Licenciado en Filosofía (UNAM)', 1),
(97, 18, 'Filosofía', 0),
(98, 18, 'Historia', 0),
(99, 18, 'Historia del Arte', 0),
(100, 18, 'Musicología', 0),
(101, 19, 'Arqueología', 0),
(102, 19, 'Asignaturas para la Docencia en Centros Privados y Concertados - Geografía e Historia', 1),
(103, 19, 'Ciencias de las Religiones', 0),
(104, 19, 'Geografía y Ordenación del Territorio', 0),
(105, 19, 'Historia', 0),
(106, 19, 'Historia - Filología Clásica', 1),
(107, 19, 'Historia del Arte', 0),
(108, 19, 'Musicología', 0),
(109, 20, 'Administración y Dirección de Empresas - Ingeniería Informática', 1),
(110, 20, 'Desarrollo de Videojuegos', 0),
(111, 20, 'Ingeniería de Computadores', 0),
(112, 20, 'Ingeniería de Datos e Inteligencia Artificial', 0),
(113, 20, 'Ingeniería del Software', 0),
(114, 20, 'Ingeniería Informática - Matemáticas', 1),
(115, 20, 'Ingeniería Informática', 0),
(116, 21, 'Medicina', 0),
(117, 21, 'Nutrición Humana y Dietética', 0),
(118, 21, 'Terapia Ocupacional', 0),
(119, 22, 'Odontología', 0),
(120, 23, 'Óptica y Optometría', 0),
(121, 24, 'Logopedia', 0),
(122, 24, 'Psicología - Logopedia', 1),
(123, 24, 'Psicología. Mención Psicología de la Salud', 0),
(124, 24, 'Terapia Ocupacional', 0),
(125, 25, 'Trabajo Social', 0),
(126, 26, 'Bioquímica', 0),
(127, 26, 'Ciencia y Tecnología de los Alimentos', 0),
(128, 26, 'Farmacia - Nutrición Humana y Dietética', 1),
(129, 26, 'Farmacia', 0),
(130, 26, 'Nutrición Humana y Dietética', 0),
(131, 26, 'Veterinaria', 0);

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
  `contrasena` varchar(100) NOT NULL,
  `facultad` int(3) NOT NULL,
  `grado` int(3) NOT NULL,
  `curso` int(3) NOT NULL,
  `verificado` tinyint(1) NOT NULL DEFAULT 0,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ucm_aw_riu_usu_usuarios`
--

INSERT INTO `ucm_aw_riu_usu_usuarios` (`id`, `nombre`, `apellido1`, `apellido2`, `correo`, `contrasena`, `facultad`, `grado`, `curso`, `verificado`, `admin`) VALUES
(1, 'Queco', 'Fernandez', 'Muller', 'quecoñete@ucm.es', 'PulpoGuitarra23', 3, 6, 2, 1, 1),
(2, 'a', 'a', 'a', 'a', 'a', 7, 18, 3, 1, 0),
(6, 'admin', 'adminez', 'adminez', 'admin@ucm.es', 'admin', 0, 0, 1, 1, 1),
(9, 'Marcos', 'Lopez', 'Lope', 'al@ucm.es', 'Marcos12?', 9, 27, 4, 0, 0),
(10, 'Sadasd', 'Asdads', 'Asdasd', 'a@ucm.es', 'Marcos12?', 1, 2, 1, 0, 0),
(11, 'Marcos', 'Lopez', 'Lopezz', 'malo@ucm.es', 'Marcos12?', 1, 1, 3, 0, 0),
(12, 'Jesús', 'González', 'Carrillo', 'jesugo11@ucm.es', 'Jesus12?', 20, 113, 4, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `ucm_aw_riu_cor_correo`
--
ALTER TABLE `ucm_aw_riu_cor_correo`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_cor_correo`
--
ALTER TABLE `ucm_aw_riu_cor_correo`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_fac_facultades`
--
ALTER TABLE `ucm_aw_riu_fac_facultades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_gra_grados`
--
ALTER TABLE `ucm_aw_riu_gra_grados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_usu_usuarios`
--
ALTER TABLE `ucm_aw_riu_usu_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
