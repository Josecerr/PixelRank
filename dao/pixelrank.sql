-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2025 a las 08:25:11
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
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(24, 'SparTFrixT', 'salchicha@gmail.com', '$2y$10$IriacqpFLBAPEF.u3DbSf..WZUw/D/0WcuByZqmLLCdxfr6SYDQ3S', '2025-04-27 12:51:25'),
(25, 'Peperoni', 'sg6324mine@outlook.com', '$2y$10$xN27G4HtSQX5MbPjEoZ8dOJL38mzZkgJWQxuk1/SUitY1MVDEtc12', '2025-04-27 13:01:33'),
(26, 'Salva.vesp', 'elenacastellanos@gmail.com', '$2y$10$gD5cgVwEJzQxitXyzvjgM.4qxJMs8koYMjcA1NbcuHZH.ZIpNhBEy', '2025-04-27 13:31:07'),
(27, 'AAAA', '1234', '$2y$10$/RVBFlY8gGFdzYbq7I.tyO2zl92tNBPir.GwfEckfnjnWpFrznCvq', '2025-04-27 14:27:38'),
(28, 'JoseCerr', 'josecerr@gmail.com', '$2y$10$Q5ufoB4azdcR2JQxwoslbOEh7UJPK/xrvezNFvHeh5VP0WWuwS0SW', '2025-04-27 14:37:35'),
(29, 'josecerr22', 'bodecac799@excederm.com', '$2b$10$Q8CAll1L2BzMz5HfxUdg2e5HFL7fl3sYgaSNEms2cqM52LdqdDpRa', '2025-05-08 23:57:49'),
(30, 'josecerr123', 'lectar64@gmail.com', '$2b$10$beoAr.uzVlqukfdW2IlBROGUMfs9swT8ybop8XOg9Iq3CkuCuO.W6', '2025-05-09 00:01:21'),
(31, 'Emma', 'tecnicoinformaticojcernicharo@gmail.com', '$2b$10$soQVNYooUG/oxqHiqXr4E.wNWEFpXCQYZPcCACLvIdwGEAk78.U8W', '2025-05-09 00:12:49');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
