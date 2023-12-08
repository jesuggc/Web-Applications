-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2023 a las 18:43:06
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
('4FO2OVh_iw0WIN8RzyDmVzYdtLTrTZaR', 1702081746, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":6,\"nombre\":\"admin\",\"apellido1\":\"adminez\",\"apellido2\":\"adminez\",\"correo\":\"admin@ucm.es\",\"facultad\":0,\"grado\":0,\"curso\":1,\"verificado\":1,\"admin\":1}}'),
('7lRnqXA6OVoXB4grQWyF_Z54m3dd1gf1', 1702067431, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":9,\"nombre\":\"Marcos\",\"apellido1\":\"Lopez\",\"apellido2\":\"Lope\",\"correo\":\"al@ucm.es\",\"facultad\":9,\"grado\":27,\"curso\":4,\"verificado\":1,\"admin\":0}}'),
('_QsK1NrUzyhKxXhiOWHcPcMZFC5o_sna', 1702127312, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":6,\"nombre\":\"admin\",\"apellido1\":\"adminez\",\"apellido2\":\"adminez\",\"correo\":\"admin@ucm.es\",\"facultad\":0,\"grado\":0,\"curso\":1,\"verificado\":1,\"admin\":1}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_riu_cor_correo`
--

CREATE TABLE `ucm_aw_riu_cor_correo` (
  `id` int(12) NOT NULL,
  `idOrigen` int(12) NOT NULL,
  `idDestino` int(12) NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `cuerpo` varchar(2000) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `leido` tinyint(1) NOT NULL DEFAULT 0,
  `archivado` tinyint(1) NOT NULL DEFAULT 0,
  `favorito` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ucm_aw_riu_cor_correo`
--

INSERT INTO `ucm_aw_riu_cor_correo` (`id`, `idOrigen`, `idDestino`, `asunto`, `cuerpo`, `fecha`, `leido`, `archivado`, `favorito`) VALUES
(1, 1, 2, 'Comprobando el sistema de correos UCM', 'Buenas a que tal? Cuanto tiempo que no hablamos. El motivo de mi mensaje es que los desarrolladores me tienen secuestrado generando mensajes automaticos. Llevan horas asi, dicen que o sigo escribiendo o revelaran a todo el mundo lo que hago en mi tiempo libre... Y ya sabes que no hago nada malo, tu y yo somos amigos de toda la vida y bien sabes que no es mas que un hobbie, pero me parece que nadie tiene por que saberlo, y mucho menos mis seres queridos. Volviendo al tema principal, lo mas duro de este trabajo es que ya no se que escribir. He mandado mensajes a todo el mundo, ni si quiera tengo tantos contactos... Por favor consigue ayuda!\r\nAtentamente tu amigo Queco', '2023-12-06 23:00:00', 0, 0, 0),
(2, 1, 2, 'Vuelvo a mandar otro mensaje', 'Hey a que tal? Espero que leas pronto el mensaje anterior, porque me dicen que necesito seguir mandando, que no son suficientes...\r\nAtentamente tu cordial amigo Queco.', '2023-12-07 00:21:40', 0, 0, 0),
(3, 6, 9, 'CONFIRMACION DE REGISTRO DE USUARIO', '<p>Es un placer darte la bienvenida al Servicio de Reservas de la Universidad Complutense de Madrid (UCM). Nos complace informarte que tu solicitud para la creación de cuenta ha sido aceptada, y ahora tienes acceso completo a nuestra plataforma de reservas.</p><p>Con este servicio, tendrás la oportunidad de gestionar de manera eficiente tus reservas de espacios y recursos en nuestras instalaciones. Ya sea que necesites reservar una sala de estudio, un laboratorio o cualquier otro recurso disponible, nuestro sistema está diseñado para hacer que el proceso sea simple y conveniente para ti.</p>\n<p>A continuación, te proporcionamos algunos pasos básicos para empezar a utilizar el servicio:</p><ol><li><strong>Inicia sesión en tu cuenta:</strong> Utiliza tus credenciales para iniciar sesión en nuestro portal de reservas <a href=\"/login\">aquí</a>.</li>\n<li><strong>Explora las opciones de reserva:</strong> Navega por la plataforma y descubre las diversas opciones de reservas disponibles. Puedes seleccionar el tipo de espacio que necesitas, la fecha y hora deseadas, y confirmar tu reserva de manera sencilla.</li>\n<li>Una vez realizada tu reserva, recibirás confirmaciones por correo electrónico y recordatorios antes del evento. Esto asegura que estés al tanto de tus reservas y puedas planificar tu tiempo de manera efectiva.</li>\n</ol><p>Estamos comprometidos a brindarte un servicio de calidad y facilitar tu experiencia en la Universidad. Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>\n<p>Agradecemos tu participación en el Servicio de Reservas de la UCM y esperamos que encuentres útil esta herramienta para optimizar tu uso de los recursos universitarios.</p>\n<p>¡Bienvenido y que tengas una excelente experiencia con nosotros!</p>\n<hr><p>Universidad Complutense de Madrid (UCM)</p>', '2023-12-07 18:12:46', 0, 0, 0);

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
-- Estructura de tabla para la tabla `ucm_aw_riu_ins_instalaciones`
--

CREATE TABLE `ucm_aw_riu_ins_instalaciones` (
  `id` int(12) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `idFacultad` int(11) NOT NULL,
  `aforo` int(11) NOT NULL,
  `idTipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ucm_aw_riu_ins_instalaciones`
--

INSERT INTO `ucm_aw_riu_ins_instalaciones` (`id`, `nombre`, `idFacultad`, `aforo`, `idTipo`) VALUES
(1, 'LaboratorioA', 20, 15, 1),
(2, 'LaboratorioB', 20, 20, 1),
(3, 'LaboratorioC', 20, 20, 1),
(4, 'LaboratorioD', 20, 20, 1),
(5, 'Pecera1', 20, 6, 3),
(6, 'Pecera2', 20, 6, 3),
(7, 'Pecera3', 20, 6, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_riu_res_reservas`
--

CREATE TABLE `ucm_aw_riu_res_reservas` (
  `id` int(12) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idInstalacion` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `fechaIni` timestamp NOT NULL DEFAULT current_timestamp(),
  `fechaFin` timestamp NOT NULL DEFAULT current_timestamp(),
  `cancelado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_riu_tip_tipoinstalacion`
--

CREATE TABLE `ucm_aw_riu_tip_tipoinstalacion` (
  `id` int(12) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `disponibilidadIni` int(11) NOT NULL,
  `disponibilidadFin` int(11) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ucm_aw_riu_tip_tipoinstalacion`
--

INSERT INTO `ucm_aw_riu_tip_tipoinstalacion` (`id`, `nombre`, `disponibilidadIni`, `disponibilidadFin`, `tipo`) VALUES
(1, 'Laboratorios', 9, 20, 'colectivo'),
(2, 'Salas de grados', 9, 19, 'colectivo'),
(3, 'Salas de reunión', 13, 18, 'colectivo'),
(4, 'Salón de actos', 12, 14, 'colectivo');

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
(9, 'Marcos', 'Lopez', 'Lope', 'al@ucm.es', 'Marcos12?', 9, 27, 4, 1, 0),
(10, 'Sadasd', 'Asdads', 'Asdasd', 'a@ucm.es', 'Marcos12?', 1, 2, 1, 0, 0),
(11, 'Marcos', 'Lopez', 'Lopezz', 'malo@ucm.es', 'Marcos12?', 1, 1, 3, 0, 0),
(12, 'Jesús', 'González', 'Carrillo', 'jesugo11@ucm.es', 'Jesus12?', 20, 113, 4, 1, 1),
(13, 'Elena', 'Caridad', 'Zingoni', 'elencari@ucm.es', 'Elena12?', 20, 113, 4, 1, 0),
(14, 'Enri', 'Martinez', 'Sanchez', 'enri@ucm.es', 'Contraseña1', 7, 19, 3, 0, 0),
(15, 'Sara', 'Sanchez', 'Dominguez', 'sarasa@ucm.es', 'Sara123?', 1, 1, 2, 0, 0),
(16, 'Laura', 'Alonso', 'Quijano', 'lauralo@ucm.es', 'Laura12?', 1, 1, 2, 0, 0),
(17, 'Laura', 'Merino', 'Palomares', 'laurame@ucm.es', 'Laura12?', 1, 1, 3, 0, 0);

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
-- Indices de la tabla `ucm_aw_riu_ins_instalaciones`
--
ALTER TABLE `ucm_aw_riu_ins_instalaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ucm_aw_riu_res_reservas`
--
ALTER TABLE `ucm_aw_riu_res_reservas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ucm_aw_riu_tip_tipoinstalacion`
--
ALTER TABLE `ucm_aw_riu_tip_tipoinstalacion`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_ins_instalaciones`
--
ALTER TABLE `ucm_aw_riu_ins_instalaciones`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_res_reservas`
--
ALTER TABLE `ucm_aw_riu_res_reservas`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_tip_tipoinstalacion`
--
ALTER TABLE `ucm_aw_riu_tip_tipoinstalacion`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_riu_usu_usuarios`
--
ALTER TABLE `ucm_aw_riu_usu_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
