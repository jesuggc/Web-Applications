-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2023 a las 20:03:30
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
-- Base de datos: `viajes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carousel`
--

CREATE TABLE `carousel` (
  `id` int(11) NOT NULL,
  `destino_id` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carousel`
--

INSERT INTO `carousel` (`id`, `destino_id`, `imagen`) VALUES
(1, 1, 'imagenes/carousel/madrid/madrid1.jpg'),
(2, 1, 'imagenes/carousel/madrid/madrid2.jpg'),
(3, 1, 'imagenes/carousel/madrid/madrid3.jpg'),
(4, 2, 'imagenes/carousel/sevilla/sevilla1.jpg'),
(5, 2, 'imagenes/carousel/sevilla/sevilla2.jpg'),
(6, 2, 'imagenes/carousel/sevilla/sevilla3.jpg'),
(7, 4, 'imagenes/carousel/valencia/valencia1.jpg'),
(8, 4, 'imagenes/carousel/valencia/valencia2.jpg'),
(9, 4, 'imagenes/carousel/valencia/valencia3.jpg'),
(10, 5, 'imagenes/carousel/asturias/asturias1.jpg'),
(11, 5, 'imagenes/carousel/asturias/asturias2.jpg'),
(12, 5, 'imagenes/carousel/asturias/asturias3.jpg'),
(13, 6, 'imagenes/carousel/barcelona/barcelona1.jpg'),
(14, 6, 'imagenes/carousel/barcelona/barcelona2.jpg'),
(15, 6, 'imagenes/carousel/barcelona/barcelona3.jpg'),
(16, 7, 'imagenes/carousel/ibiza/ibiza1.jpg'),
(17, 7, 'imagenes/carousel/ibiza/ibiza2.jpg'),
(18, 7, 'imagenes/carousel/ibiza/ibiza3.jpg'),
(19, 8, 'imagenes/carousel/cadiz/cadiz1.jpg'),
(20, 8, 'imagenes/carousel/cadiz/cadiz2.jpg'),
(21, 8, 'imagenes/carousel/cadiz/cadiz3.jpg'),
(22, 11, 'imagenes/carousel/murcia/murcia1.jpg'),
(23, 11, 'imagenes/carousel/murcia/murcia2.jpg'),
(24, 11, 'imagenes/carousel/murcia/murcia3.jpg'),
(25, 12, 'imagenes/carousel/bilbao/bilbao1.jpg'),
(26, 12, 'imagenes/carousel/bilbao/bilbao2.jpg'),
(27, 12, 'imagenes/carousel/bilbao/bilbao3.jpg'),
(28, 13, 'imagenes/carousel/granada/granada1.jpg'),
(29, 13, 'imagenes/carousel/granada/granada2.jpg'),
(30, 13, 'imagenes/carousel/granada/granada3.jpg'),
(31, 14, 'imagenes/carousel/zaragoza/zaragoza1.jpg'),
(32, 14, 'imagenes/carousel/zaragoza/zaragoza2.jpg'),
(33, 14, 'imagenes/carousel/zaragoza/zaragoza3.jpg'),
(34, 15, 'imagenes/carousel/salamanca/salamanca1.jpg'),
(35, 15, 'imagenes/carousel/salamanca/salamanca2.jpg'),
(36, 15, 'imagenes/carousel/salamanca/salamanca3.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `destino_id` int(11) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `comentario` text NOT NULL,
  `fecha_comentario` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `destino_id`, `nombre_usuario`, `comentario`, `fecha_comentario`) VALUES
(1, 1, 'Marcos', 'El mejor destino al que uno podria viajar, 10/10', '2023-10-30 10:34:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destinos`
--

CREATE TABLE `destinos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destinos`
--

INSERT INTO `destinos` (`id`, `nombre`, `description`, `imagen`, `precio`) VALUES
(1, 'Madrid', '¡Bienvenido a Madrid, la vibrante capital de España que nunca duerme! Sumérgete en la rica historia y la bulliciosa cultura de esta ciudad cosmopolita. Desde los majestuosos palacios reales hasta los animados mercados callejeros, Madrid tiene algo para todos. Disfruta de deliciosas tapas en acogedores bares, maravíllate con las obras maestras del arte en el famoso Museo del Prado y déjate llevar por el ritmo apasionado del flamenco en los auténticos tablaos. Descubre la autenticidad de la vida española mientras paseas por sus encantadoras plazas y calles adoquinadas. Madrid te espera con los brazos abiertos para ofrecerte una experiencia inolvidable.', 'imagenes/madrid.jpg', 19.99),
(2, 'Sevilla', 'Deja que el encanto andaluz te envuelva en Sevilla, la ciudad donde el sol siempre brilla y el arte se mezcla con la tradición. Embárcate en un viaje en el tiempo mientras exploras los estrechos callejones del barrio judío, maravíllate con la imponente Catedral de Sevilla y el Real Alcázar, y siente la pasión del flamenco en cada rincón. Disfruta de la exquisita gastronomía local, desde tapas deliciosas hasta platos de pescado fresco, y no te pierdas la experiencia única de relajarte en un auténtico baño árabe. Sevilla te seducirá con su atmósfera romántica y su hospitalidad cálida.', 'imagenes/sevilla.jpg', 69.99),
(4, 'Valencia', 'Descubre Valencia, la ciudad que equilibra a la perfección su rica herencia histórica con una modernidad vibrante. Sumérgete en el corazón de la Ciudad de las Artes y las Ciencias, un complejo arquitectónico futurista que alberga impresionantes museos, acuarios y espacios de entretenimiento. Relájate en las playas de arena dorada y descubre la deliciosa paella valenciana, un manjar culinario que te hará saborear el auténtico gusto de la región. Pasea por los jardines del Turia, el antiguo cauce del río convertido en un oasis verde en el corazón de la ciudad. Valencia te cautivará con su combinación única de tradición y modernidad.', 'imagenes/valencia.jpg', 49.99),
(5, 'Asturias', 'Bienvenido a Asturias, un paraíso natural en el norte de España donde la belleza escénica te dejará sin aliento. Descubre paisajes impresionantes, desde las majestuosas montañas de los Picos de Europa hasta las pintorescas playas de arena blanca bañadas por el Mar Cantábrico. Sumérgete en la autenticidad de los pueblos pesqueros y disfruta de la deliciosa gastronomía asturiana, que incluye sidra, quesos artesanales y sabrosos platos de mariscos. Respira el aire puro de los bosques frondosos y maravíllate con la arquitectura prerrománica, un testimonio del rico patrimonio histórico de la región. Asturias te invita a conectarte con la naturaleza y a disfrutar de una experiencia tranquila y rejuvenecedora.', 'imagenes/asturias.jpg', 49.99),
(6, 'Barcelona', '¡Bienvenido a Barcelona, la ciudad que lo tiene todo! Desde la arquitectura surrealista de Gaudí hasta las bulliciosas Ramblas y las playas doradas del Mediterráneo, Barcelona te sorprenderá en cada esquina. Descubre la imponente Sagrada Familia, una obra maestra arquitectónica en constante evolución, y pasea por el encantador Barrio Gótico, lleno de historia y encanto medieval. Disfruta de la ecléctica escena artística y cultural de la ciudad, desde galerías de arte contemporáneo hasta espectáculos de flamenco emocionantes. Deléitate con la deliciosa comida catalana en los mercados locales y vive la pasión del fútbol en el famoso Camp Nou. Barcelona te cautivará con su energía vibrante y su estilo de vida único.', 'imagenes/barcelona.jpg', 84.99),
(7, 'Ibiza', 'Prepárate para sumergirte en el paraíso en Ibiza, la isla donde la fiesta nunca termina y la belleza natural te dejará sin palabras. Relájate en las playas de arena blanca y aguas cristalinas, donde el sol brilla intensamente y el mar Mediterráneo invita a nadar y hacer snorkel. Descubre la vida nocturna legendaria de la isla en los famosos clubes y discotecas que atraen a los mejores DJ del mundo. Disfruta de los espectaculares atardeceres en la playa de Benirrás y déjate llevar por la música y el ambiente festivo. Ibiza te ofrece una experiencia inolvidable llena de diversión y relajación.', 'imagenes/barcelona.jpg', 119.99),
(8, 'Cadiz', 'Descubre Cádiz, la ciudad costera con encanto que te enamorará con su rica historia y su ambiente relajado. Pasea por las estrechas calles empedradas del casco antiguo y maravíllate con la arquitectura elegante de la catedral y los castillos medievales. Disfruta de las vistas panorámicas desde la Torre Tavira y relájate en las hermosas playas de arena dorada que bordean la ciudad. Cádiz es famosa por su carnaval animado y colorido, lleno de música, bailes y celebraciones. Deleita tu paladar con los deliciosos mariscos y pescados frescos en los acogedores restaurantes locales. Cádiz te invita a disfrutar de la auténtica hospitalidad andaluza y a sumergirte en su encanto único.', 'imagenes/cadiz.jpg', 74.99),
(11, 'Murcia', 'Descubre el encanto de Murcia con nosotros. Esta joya del sureste de España te espera con una mezcla perfecta de historia, cultura y belleza natural. Explora la majestuosa Catedral de Santa María, sumérgete en la historia en el Teatro Romano y disfruta de la deliciosa gastronomía mediterránea. Además, relájate en las soleadas playas de la Costa Cálida. ¡Murcia es tu próximo destino soñado! ¡Reserva tu viaje con nosotros hoy!', 'imagenes/murcia.jpg', 64.99),
(12, 'Bilbao', 'En el norte de España, Bilbao es conocida por su transformación urbana y el icónico Museo Guggenheim de Frank Gehry. La ciudad combina arquitectura moderna con tradición vasca, ofreciendo pintxos deliciosos y una vista impresionante del Museo desde el Puente de La Salve.', 'imagenes/bilbao.jpg', 79.99),
(13, 'Granada', 'Granada, en el sur de España, es famosa por la majestuosa Alhambra, un palacio árabe y jardines que te transportarán a otra época. También disfruta de las estrechas calles del Albaicín, con sus casas blancas y vistas panorámicas a la Alhambra. La ciudad es un lugar ideal para experimentar la cultura andaluza y saborear tapas gratuitas en los bares locales.', 'imagenes/granada.jpg', 81.99),
(14, 'Zaragoza', 'Situada en el noreste de España, Zaragoza es una ciudad con una historia rica y un ambiente animado. Destacan la majestuosa Basílica del Pilar, la Lonja de Zaragoza y el Palacio de la Aljafería. La gastronomía aragonesa es un verdadero deleite, y la ciudad es famosa por sus celebraciones de las Fiestas del Pilar en octubre.', 'imagenes/zaragoza.jpg', 45.99),
(15, 'Salamanca', 'Salamanca es una ciudad universitaria en el oeste de España con una arquitectura impresionante. La Universidad de Salamanca es una de las más antiguas de Europa. La Plaza Mayor y las catedrales góticas son puntos de referencia históricos que atraen a visitantes de todo el mundo.', 'imagenes/salamanca.jpg', 66.99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `destino_id` int(11) NOT NULL,
  `nombre_cliente` varchar(255) NOT NULL,
  `correo_cliente` varchar(255) NOT NULL,
  `fecha_reserva` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `destino_id`, `nombre_cliente`, `correo_cliente`, `fecha_reserva`) VALUES
(1, 1, 'a', 'a@gmail.com', '2023-11-29'),
(2, 1, 'a', 'a@gmail.com', '2023-11-29'),
(38, 1, 'a', 'a@gmail.com', '2023-11-29'),
(39, 1, 'a', 'a@gmail.com', '2023-11-29'),
(40, 1, 'a', 'a@gmail.com', '2023-11-29'),
(41, 1, 'a', 'a@gmail.com', '2023-11-29'),
(42, 1, 'a', 'a@gmail.com', '2023-11-29'),
(43, 1, 'a', 'a@gmail.com', '2023-11-29'),
(44, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(45, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(46, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(47, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(48, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(49, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(50, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(51, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(52, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(53, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(54, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(55, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(56, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(57, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(58, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(59, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(60, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(61, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(62, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(63, 1, 'Richi', 'richi@gmail.co', '2023-11-27'),
(64, 2, 'a', 'a@ucm.es', '2023-11-30'),
(65, 1, 'Marta', 'mgil@ucm.es', '2023-11-30'),
(66, 1, 'Marta', 'mgil@ucm.es', '2023-11-30'),
(67, 1, 'Marta', 'mgil@ucm.es', '2023-11-30'),
(68, 1, 'Marta', 'mgil@ucm.es', '2023-11-30'),
(69, 1, 'Marta', 'mgil@ucm.es', '2023-11-30'),
(70, 1, 'Marta', 'mgil@ucm.es', '2023-11-30'),
(71, 2, 'Mafalda', 'mafal09@ucm.es', '2023-11-30'),
(72, 2, 'Mafalda', 'mafal09@ucm.es', '2023-11-30'),
(73, 2, 'Mafalda', 'mafal09@ucm.es', '2023-11-30'),
(74, 1, 'a', 'a@ucm.es', '2023-11-08'),
(75, 1, 'a', 'a@a.a', '2023-12-20'),
(76, 1, 'a', 'a@a.a', '2023-12-20'),
(77, 1, 'a', 'a@a.a', '2023-12-20'),
(78, 1, 'a', 'a@a.a', '2023-12-20'),
(79, 15, 'carla', 'car@ucm.es', '2023-11-29'),
(80, 2, 'a', 'a@ucm.es', '2023-12-06'),
(81, 1, 'a', 'a@a.a', '2023-11-29'),
(82, 1, 'a', 'a@a.a', '2023-11-29'),
(83, 1, 'a', 'a@a.a', '2023-11-29'),
(84, 1, 'a', 'a@a.a', '2023-11-29'),
(85, 2, 'a', 'a@a.c', '2023-11-23'),
(86, 1, 'a', 'a@a.a', '2023-12-06'),
(87, 1, 'a', 'a@a.a', '2023-12-06'),
(88, 1, 'a', 'a@a.a', '2023-12-06'),
(89, 1, 'a', 'a@a.a', '2023-12-06'),
(90, 1, 'a', 'a@a.a', '2023-12-06'),
(91, 1, 'a', 'a@a.a', '2023-12-07'),
(92, 1, 'a', 'a@a.a', '2023-12-07'),
(93, 1, 'a', 'a@a.a', '2023-12-07'),
(94, 1, 'a', 'a@a.a', '2023-12-07'),
(95, 1, 'a', 'a@a.a', '2023-12-07'),
(96, 1, 'a', 'a@a.a', '2023-12-07'),
(97, 1, 'a', 'a@a.a', '2023-12-07'),
(98, 1, 'a', 'a@a.a', '2023-12-07'),
(99, 1, 'a', 'a@a.a', '2023-12-07'),
(100, 1, 'a', 'a@a.a', '2023-12-07'),
(101, 1, 'a', 'a@a.a', '2023-12-07'),
(102, 1, 'a', 'a@a.a', '2023-12-07'),
(103, 1, 'a', 'a@a.a', '2023-12-07'),
(104, 1, 'a', 'a@a.a', '2023-12-07'),
(105, 1, 'a', 'a@a.a', '2023-12-07'),
(106, 1, 'a', 'a@a.a', '2023-12-07'),
(107, 1, 'Madrid', 'M@h.c', '2222-12-12'),
(108, 2, 'Isidoro', 'tiel2812@hotmail.com', '2023-11-30');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carousel`
--
ALTER TABLE `carousel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destino_id` (`destino_id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destino_id` (`destino_id`);

--
-- Indices de la tabla `destinos`
--
ALTER TABLE `destinos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destino_id` (`destino_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carousel`
--
ALTER TABLE `carousel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `destinos`
--
ALTER TABLE `destinos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carousel`
--
ALTER TABLE `carousel`
  ADD CONSTRAINT `carousel_ibfk_1` FOREIGN KEY (`destino_id`) REFERENCES `destinos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`destino_id`) REFERENCES `destinos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`destino_id`) REFERENCES `destinos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
