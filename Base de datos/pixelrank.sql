-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2025 a las 03:09:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pixelrank`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amistades`
--

CREATE TABLE `amistades` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `amigo_id` int(11) NOT NULL,
  `estado` enum('pendiente','aceptado','rechazado') DEFAULT 'pendiente',
  `creado_en` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `amistades`
--

INSERT INTO `amistades` (`id`, `usuario_id`, `amigo_id`, `estado`, `creado_en`) VALUES
(14, 7, 8, 'aceptado', '2025-06-06 13:42:46'),
(17, 26, 7, 'aceptado', '2025-06-08 21:42:29'),
(18, 27, 7, 'aceptado', '2025-06-08 21:49:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos_indie`
--

CREATE TABLE `juegos_indie` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `plataformas` varchar(100) DEFAULT NULL,
  `portada_url` text DEFAULT NULL,
  `fecha_lanzamiento` date DEFAULT NULL,
  `creado_por` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `publicado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos_indie_imagenes`
--

CREATE TABLE `juegos_indie_imagenes` (
  `id` int(11) NOT NULL,
  `juego_id` int(11) NOT NULL,
  `imagen_url` text NOT NULL,
  `tipo` varchar(50) DEFAULT 'screenshot'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rawg_game_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `rawg_game_id`, `rating`, `comment`, `created_at`) VALUES
(30, 8, 3498, 5, 'Me ha encantado', '2025-06-03 22:50:35'),
(42, 8, 842, 5, 'This game on the xbox360 was awesome!', '2025-06-06 09:05:29'),
(44, 23, 3498, 5, 'I love this game. Thanks Rockstar!', '2025-06-06 23:12:11'),
(52, 7, 3498, 5, 'I love it', '2025-06-08 13:33:01'),
(53, 7, 3328, 5, '', '2025-06-08 14:05:00'),
(54, 7, 4291, 5, 'mierda', '2025-06-08 14:43:32'),
(55, 26, 1030, 5, 'Este juego me encantó', '2025-06-08 19:41:39'),
(56, 27, 3328, 5, 'Muy bueno el juego.', '2025-06-08 19:48:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `avatar`) VALUES
(7, 'Josecerr_', 'josecernicharotoledo04@gmail.com', '$2b$10$GUdEh6PSa2X5qmLtzf3y2uifbDCJvZwzkFA2E6MMB.y5lWWWEmAui', '2025-05-18 17:05:07', '/images/uploads/1748607280388-700919195.jpg'),
(8, 'Salvavesp', 'salvavaesp@gmail.com', '$2b$10$YwsOFmRH9dQxMOWoQDjUNu5N26gBTyT.hnweExDKX4UDSRzKwD6MK', '2025-05-19 20:37:15', '/images/uploads/1749206058224-828048122.png'),
(19, 'alvaroSanchez__', 'alvarosan@gmail.com', '$2b$10$.AjKAEI1c6yPzV2e/omWkO05Fv/YFduYUU6DkEoE.QYuxarGyifxu', '2025-06-03 22:57:27', '/images/uploads/1749118339962-23132056.jpeg'),
(23, 'JoseLopez', 'joselopez@gmail.com', '$2b$10$fVVZWq6bVoewQSI55xpdt.ven2WC/1LEBkdSsTkfdyBOs57AiY9aK', '2025-06-06 23:11:45', '/images/uploads/1749251604516-45851714.jpg'),
(26, 'pepe', 'pepecernicharo@gmail.com', '$2b$10$mTXIv.UPoyc/aNmhtuy1juV6P1/eDalXYXpxReIAoWu9QDTjG57EG', '2025-06-08 19:40:50', '/images/uploads/1749411720119-997464303.jpg'),
(27, 'pepect', 'pepect@gmail.com', '$2b$10$G6k04x.8K.75B4eP3i3krO2n3Ipc0ABSu2DP9W1dKB7uQe9nyQnaa', '2025-06-08 19:47:49', '/images/uploads/1749412157761-225215625.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_games`
--

CREATE TABLE `user_games` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` varchar(50) NOT NULL,
  `status` enum('pending','playing','completed','wishlist') DEFAULT 'pending',
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_games`
--

INSERT INTO `user_games` (`id`, `user_id`, `game_id`, `status`, `added_at`) VALUES
(1, 19, '3498', '', '2025-06-04 08:35:54'),
(16, 19, '3328', '', '2025-06-04 08:44:19'),
(21, 19, '4291', '', '2025-06-04 09:55:44'),
(24, 19, '13536', '', '2025-06-04 09:57:52'),
(25, 19, '12020', '', '2025-06-04 11:59:26'),
(28, 19, '13537', '', '2025-06-05 22:09:50'),
(29, 8, '12020', '', '2025-06-06 07:22:58'),
(30, 8, '5679', 'wishlist', '2025-06-06 07:25:04'),
(32, 8, '58175', '', '2025-06-06 07:35:11'),
(35, 7, '5286', 'wishlist', '2025-06-06 09:03:12'),
(36, 8, '842', '', '2025-06-06 09:05:14'),
(40, 8, '416', 'pending', '2025-06-06 21:59:39'),
(44, 7, '4200', 'pending', '2025-06-07 00:35:19'),
(45, 7, '13536', 'pending', '2025-06-08 13:22:33'),
(46, 7, '368967', 'pending', '2025-06-08 14:44:06'),
(47, 7, '13537', 'pending', '2025-06-08 19:06:17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amistades`
--
ALTER TABLE `amistades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `amigo_id` (`amigo_id`);

--
-- Indices de la tabla `juegos_indie`
--
ALTER TABLE `juegos_indie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_creado_por` (`creado_por`);

--
-- Indices de la tabla `juegos_indie_imagenes`
--
ALTER TABLE `juegos_indie_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_juego_indie` (`juego_id`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_games`
--
ALTER TABLE `user_games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_game` (`user_id`,`game_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `amistades`
--
ALTER TABLE `amistades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `juegos_indie`
--
ALTER TABLE `juegos_indie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `juegos_indie_imagenes`
--
ALTER TABLE `juegos_indie_imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `user_games`
--
ALTER TABLE `user_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amistades`
--
ALTER TABLE `amistades`
  ADD CONSTRAINT `amistades_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `amistades_ibfk_2` FOREIGN KEY (`amigo_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `juegos_indie`
--
ALTER TABLE `juegos_indie`
  ADD CONSTRAINT `fk_creado_por` FOREIGN KEY (`creado_por`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `juegos_indie_imagenes`
--
ALTER TABLE `juegos_indie_imagenes`
  ADD CONSTRAINT `fk_juego_indie` FOREIGN KEY (`juego_id`) REFERENCES `juegos_indie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_games`
--
ALTER TABLE `user_games`
  ADD CONSTRAINT `user_games_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
