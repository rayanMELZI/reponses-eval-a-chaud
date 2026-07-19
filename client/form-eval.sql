-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 18 août 2024 à 15:01
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `form-eval`
--

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `formationID` int(20) NOT NULL,
  `intitule` varchar(50) DEFAULT NULL,
  `org_formateur` varchar(50) DEFAULT NULL,
  `nom_formateur` varchar(50) DEFAULT NULL,
  `lieu` varchar(50) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `date_debut_questionnaire` date DEFAULT NULL,
  `date_fin_questionnaire` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `formation`
--

INSERT INTO `formation` (`formationID`, `intitule`, `org_formateur`, `nom_formateur`, `lieu`, `date_debut`, `date_fin`, `date_debut_questionnaire`, `date_fin_questionnaire`) VALUES
(1, 'Administration Microsoft Exchange Server 2016/2019', 'FormaPlus', 'Walid', 'Centre de formation, Alger', '2024-05-01', '2024-05-08', '2024-05-09', '2024-05-20'),
(2, 'Microsoft Exchange Server 2016/2019', 'FormaPlus', NULL, 'Centre de formation, Alger', '2024-05-08', '2024-05-15', '2024-05-16', '2024-06-02'),
(8, 'ajouet', 'sss', 'mohamed', 'kdkdosjs', '2024-05-17', '2024-05-28', '2024-05-25', '2024-05-31'),
(9, 'DevCorp Formation', 'DevCorp', 'Karim', 'Hydra', '2024-06-01', '2026-11-15', '2026-12-16', '2027-01-06'),
(10, 'ADMINISTRATION MICROSOFT', 'FormaPlus', 'KARIM', 'Hydra', '2022-01-14', '2022-01-26', '2022-02-01', '2022-02-10'),
(11, 'ADMINISTRATION', 'FormaPlus', 'KARIM', 'MEFTAH', '2024-05-20', '2024-05-24', '2024-07-30', '2023-06-04'),
(12, 'ADMINISTRATION MICROSOFT', 'FormaPlus', 'Karim', 'MEFTAH', '2024-07-01', '2024-07-05', '2024-07-15', '2024-07-20'),
(17, 'test', 'test', 'test1', 'test', '2024-07-17', '2024-07-26', '2024-08-09', '2024-08-16'),
(18, 'test 2', 'test 2', 'test 2', 'test 2', '2024-10-02', '2024-10-20', '2024-10-21', '2024-10-31'),
(20, 'email test', 'email test', 'email test', 'email test', '2024-07-15', '2024-07-16', '2024-07-17', '2024-07-18'),
(21, 'email test', 'email test', 'email test', 'email test', '2024-07-15', '2024-07-16', '2024-07-17', '2024-07-18'),
(22, 'email test', 'email test', 'email test', 'email test', '2024-07-15', '2024-07-16', '2024-07-17', '2024-07-18'),
(23, 'email test', 'email test', 'email test', 'email test', '2024-07-15', '2024-07-16', '2024-07-17', '2024-07-18'),
(24, 'email test 3', 'email test 3', 'email test 3 ', 'email test 3', '2024-07-15', '2024-07-16', '2024-07-17', '2024-07-18'),
(25, 'email test 2', 'email test 2', 'email test 2', 'email test 2', '2024-07-15', '2024-07-16', '2024-07-17', '2024-07-18'),
(26, 'demo ', 'Demo INC', 'test', 'ain benian', '2024-07-17', '2024-07-18', '2024-07-19', '2024-07-20'),
(27, 'test ', 'test ', 'test ', 'test ', '2024-07-17', '2024-07-18', '2024-07-18', '2024-07-19'),
(28, 'test', 'test', 'test', 'test', '2024-07-17', '2024-07-18', '2024-07-19', '2024-07-20'),
(29, 'test', 'test', 'test', 'test', '2024-07-17', '2024-07-18', '2024-07-19', '2024-07-20'),
(30, 'test modif', 'test modif', 'test modif', 'test modif', '2024-07-17', '2024-07-18', '2024-07-19', '2024-07-20'),
(31, 'test', 'test', 'test', 'test', '2024-07-17', '2024-07-18', '2024-07-19', '2024-07-20'),
(32, 'test', 'test', 'test', 'test', '2024-07-17', '2024-07-18', '2024-07-19', '2024-07-20'),
(33, 'test', 'test', 'test', 'test', '2024-07-17', '2024-07-18', '2024-07-19', '2024-07-20'),
(34, 'test email4', 'te4', 'test email 4', 'te4', '2024-07-17', '2024-07-18', '2024-07-19', '2024-07-20'),
(36, 'test', 'test', 'test', 'test', '2024-07-18', '2024-07-20', '2024-08-02', '2024-08-09'),
(37, 'test', 'test', 'test', 'test', '2024-07-18', '2024-07-18', '2024-07-18', '2024-07-18'),
(38, 'test', 'k', 'e', 'kdkdosjs', '2024-07-22', '2024-07-26', '2024-07-23', '2024-07-26'),
(39, 'test email X', 'test email X', 'test email X', 'test email X', '2024-07-29', '2024-07-30', '2024-08-10', '2024-08-09');

-- --------------------------------------------------------

--
-- Structure de la table `parametres_de_base`
--

CREATE TABLE `parametres_de_base` (
  `param_key` varchar(255) NOT NULL,
  `param_value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `parametres_de_base`
--

INSERT INTO `parametres_de_base` (`param_key`, `param_value`) VALUES
('baseDN', 'dc=example,dc=com'),
('DN_cmpt', 'cn=admin,dc=example,dc=com'),
('email_admin', 'admin@example.com'),
('LDAP_password', 'admin'),
('LDAP_port', '389'),
('LDAP_username', 'admin'),
('nom_Admin', 'Admin FormEval'),
('periode_synch', '10'),
('Port_msgr', '587'),
('ServeurLDAP', 'localhost'),
('Serveur_msgr', 'smtp.gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `participation`
--

CREATE TABLE `participation` (
  `participationID` int(20) NOT NULL,
  `formationID` int(20) DEFAULT NULL,
  `utilisateurID` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `participation`
--

INSERT INTO `participation` (`participationID`, `formationID`, `utilisateurID`) VALUES
(6, 8, 2),
(10, 10, 2),
(11, 10, 15),
(15, 12, 1),
(16, 12, 2),
(17, 12, 15),
(37, 2, 1),
(38, 2, 2),
(39, 2, 15),
(40, 2, 16),
(41, 11, 1),
(42, 11, 15),
(43, 11, 2),
(44, 11, 16),
(88, 18, 1),
(89, 18, 37),
(90, 20, 1),
(91, 21, 1),
(92, 22, 1),
(93, 23, 1),
(95, 25, 1),
(96, 26, 39),
(97, 26, 1),
(98, 24, 1),
(99, 27, 1),
(100, 28, 1),
(101, 29, 1),
(103, 31, 1),
(104, 32, 1),
(115, 34, 1),
(116, 34, 16),
(124, 33, 1),
(125, 33, 16),
(129, 30, 1),
(130, 30, 15),
(131, 36, 2),
(132, 36, 1),
(133, 37, 1),
(134, 37, 2),
(135, 38, 2),
(136, 38, 1),
(156, 17, 1),
(157, 17, 2),
(158, 17, 15),
(159, 17, 16),
(160, 17, 17),
(161, 17, 18),
(162, 17, 32),
(163, 17, 36),
(164, 17, 37),
(300, 1, 1),
(301, 1, 16),
(302, 1, 17),
(303, 1, 18),
(304, 1, 32),
(305, 1, 36),
(306, 1, 37),
(307, 1, 38),
(308, 1, 40),
(309, 1, 41),
(310, 1, 42),
(311, 1, 43),
(312, 1, 44),
(313, 1, 45),
(314, 1, 46),
(316, 39, 1),
(319, 9, 16),
(320, 9, 1);

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

CREATE TABLE `reponse` (
  `reponseID` int(20) NOT NULL,
  `date_reponse` date DEFAULT NULL,
  `taux_satisfaction` int(11) DEFAULT NULL,
  `formationID` int(20) DEFAULT NULL,
  `utilisateurID` int(20) DEFAULT NULL,
  `question1` varchar(20) DEFAULT NULL,
  `question2` varchar(20) DEFAULT NULL,
  `question3` varchar(20) DEFAULT NULL,
  `question4` varchar(20) DEFAULT NULL,
  `question5` varchar(20) DEFAULT NULL,
  `question6` varchar(20) DEFAULT NULL,
  `question7` varchar(20) DEFAULT NULL,
  `question8` varchar(20) DEFAULT NULL,
  `question9` varchar(20) DEFAULT NULL,
  `question10` varchar(20) DEFAULT NULL,
  `question11` varchar(20) DEFAULT NULL,
  `question12` varchar(20) DEFAULT NULL,
  `question13` varchar(20) DEFAULT NULL,
  `question14` varchar(20) DEFAULT NULL,
  `question15` varchar(20) DEFAULT NULL,
  `question16` varchar(20) DEFAULT NULL,
  `question17` varchar(20) DEFAULT NULL,
  `question18` varchar(20) DEFAULT NULL,
  `question19` varchar(20) DEFAULT NULL,
  `question20` varchar(20) DEFAULT NULL,
  `question21` varchar(20) DEFAULT NULL,
  `question22` varchar(20) DEFAULT NULL,
  `points_forts` text DEFAULT NULL,
  `points_ameliorer` text DEFAULT NULL,
  `parties_interessantes` text DEFAULT NULL,
  `recommandations` text DEFAULT NULL,
  `commentaires` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reponse`
--

INSERT INTO `reponse` (`reponseID`, `date_reponse`, `taux_satisfaction`, `formationID`, `utilisateurID`, `question1`, `question2`, `question3`, `question4`, `question5`, `question6`, `question7`, `question8`, `question9`, `question10`, `question11`, `question12`, `question13`, `question14`, `question15`, `question16`, `question17`, `question18`, `question19`, `question20`, `question21`, `question22`, `points_forts`, `points_ameliorer`, `parties_interessantes`, `recommandations`, `commentaires`) VALUES
(16, '2024-05-29', 58, 1, 1, '1', '2', '2', '3', '3', '3', '1', '2', '3', '4', '3', '2', '2', '3', '3', '2', '2', '2', '2', '2', '3', '1', NULL, NULL, NULL, NULL, NULL),
(17, '2024-05-30', 36, 2, 1, '1', '1', '1', '2', '2', '2', '2', '3', '2', '2', '2', NULL, NULL, NULL, NULL, NULL, '2', '2', '2', '2', '2', '2', NULL, NULL, NULL, NULL, NULL),
(28, '2024-06-02', 38, 2, 2, '1', '1', '1', '1', '1', '1', '3', '3', '3', '3', '3', NULL, NULL, NULL, NULL, NULL, '4', '4', '1', '1', '1', '1', 'les formateurs', 'la communication', 'excel', 'new', NULL),
(29, '2024-06-02', 38, 9, 2, '1', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', NULL, NULL, NULL, NULL, NULL, '1', '1', '2', '2', '2', '2', 'test', 'test', 'testt', NULL, NULL),
(30, '2024-06-02', 63, 11, 2, '3', '2', '3', '3', '3', '3', '3', '3', '3', '3', '2', NULL, NULL, NULL, NULL, NULL, '2', '2', '2', '3', '2', '1', 'inigfcd', 'dxdxdxdrx', 'dxfxfvhj', NULL, NULL),
(31, '2024-06-02', 47, 12, 2, '1', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', NULL, NULL, NULL, NULL, NULL, '2', '2', '3', '3', '3', '3', 'test3', 'tes4', 'tes5', NULL, NULL),
(32, '2024-06-02', 63, 9, 1, '2', '3', '4', '1', '2', '3', '3', '4', '1', '2', '3', NULL, NULL, NULL, NULL, NULL, '2', '3', '4', '1', '2', '3', 'hello', 'world', 'i\'m nano', NULL, NULL),
(33, '2024-06-04', 48, 11, 1, '1', '2', '3', '2', '3', '2', '2', '3', '3', '2', '3', NULL, NULL, NULL, NULL, NULL, '3', '2', '3', '2', '3', '3', 'soutenance', 'soutenance', 'ds', NULL, NULL),
(34, '2024-06-28', 50, 12, NULL, '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', NULL, NULL, NULL, NULL, NULL, '2', '2', '2', '2', '2', '2', 'etst', 'yesy', 'test', NULL, NULL),
(35, '2024-07-18', 39, 12, 15, '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', NULL, NULL, NULL, NULL, NULL, '2', '2', '2', '2', '2', '2', 'tst', 'tst', 'test', NULL, NULL),
(36, '2024-07-02', 25, 18, 1, '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', NULL, NULL, NULL, NULL, NULL, '1', '1', '1', '1', '1', '1', 'test', 'test', 'test', NULL, NULL),
(37, '2024-07-11', 65, 18, 37, '3', '1', '3', '1', '4', '3', '1', '3', '4', '2', '3', NULL, NULL, NULL, NULL, NULL, '3', '2', '3', '2', '3', '3', 'OWEOWE', 'IT WORKSSSS', 'YEAAAAA', 'opt', 'opt'),
(38, '2024-07-25', 79, 9, 15, '2', '3', '2', '3', '4', '4', '4', '3', '4', '4', '4', NULL, NULL, NULL, NULL, NULL, '3', '3', '2', '3', '4', '2', 'test', 'test', 'test', 'celef', NULL),
(39, '2024-07-18', 66, 17, 15, '1', '2', '3', '3', '4', '2', '2', '3', '2', '3', '3', '3', '2', '2', '2', '4', '2', '2', '4', '1', '4', '4', 'test', 'test', 'tst', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `roleID` int(20) NOT NULL,
  `nom_role` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`roleID`, `nom_role`) VALUES
(1, 'Participant'),
(2, 'Admin Formation'),
(3, 'Admin IT'),
(4, 'Admin Visiteur');

-- --------------------------------------------------------

--
-- Structure de la table `structure`
--

CREATE TABLE `structure` (
  `structureID` varchar(20) NOT NULL,
  `nom_structure` varchar(50) DEFAULT NULL,
  `code_structure` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `structure`
--

INSERT INTO `structure` (`structureID`, `nom_structure`, `code_structure`) VALUES
('1', 'RH', 123),
('2', 'IT', 456);

-- --------------------------------------------------------

--
-- Structure de la table `userrole`
--

CREATE TABLE `userrole` (
  `utilisateurID` int(20) DEFAULT NULL,
  `roleID` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `userrole`
--

INSERT INTO `userrole` (`utilisateurID`, `roleID`) VALUES
(15, 3),
(15, 1),
(16, 1),
(16, 4),
(17, 4),
(17, 3),
(17, 1),
(17, 2),
(2, 2),
(18, 3),
(1, 3),
(1, 2),
(15, 2),
(32, 1),
(36, 1),
(37, 1),
(32, 2),
(36, 3),
(37, 4),
(15, 4),
(38, 1),
(38, 3),
(38, 2),
(39, 1),
(39, 3),
(40, 3),
(41, 3),
(41, 2),
(42, 2),
(43, 2),
(44, 1),
(45, 1),
(46, 1),
(46, 3),
(46, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `utilisateurID` int(20) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `nom` varchar(40) DEFAULT NULL,
  `prenom` varchar(40) DEFAULT NULL,
  `fonction` varchar(60) DEFAULT NULL,
  `structureID` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `role_default` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utilisateurID`, `username`, `password`, `nom`, `prenom`, `fonction`, `structureID`, `email`, `role_default`) VALUES
(1, 'user12345', 'test', 'DUPONT', 'Jean', 'Developper Web', '1', 'jean.dupont@example.com', 'Admin IT'),
(2, 'userBOSS', 'password', 'MARTIN', 'Sarah', 'Developper Web', '1', 'sarah.martin@example.com', 'Admin Formation'),
(15, 'local00001', 'test', 'BERNARD', 'Karim', 'back-end dev', '2', 'karim.bernard@example.com', 'Admin IT'),
(16, 'local00002', 'dskdjd', 'PETIT', 'Lina', 'Ingénieur des Système d\'Information et Logiciel', '1', 'lina.petit@example.com', 'Participant'),
(17, 'local00003', 'test', 'test', 'test', 'Developper Web', '1', 'tes@test.com', 'Admin Visiteur'),
(18, 'local00004', 'aaa', 'q', 'aadsa', 'back-end dev', '2', 'aaA@aaa.com', 'Admin IT'),
(32, 'user00001', 'password', 'LastName', 'FirstName', 'Job Title', '2', 'user@example.com', 'Participant'),
(36, 'user00005', 'dGVzdA==', 'User5', 'Demo', NULL, NULL, 'user00005@example.com', 'Participant'),
(37, 'user00006', 'dGVzdA==', 'User6', 'Demo', NULL, '1', 'user00006@example.com', 'Admin Visiteur'),
(38, 'local00005', 'test', 'Mbr Local', 'Mbr Local', 'Developper Web', '2', 'test@outlook.com', 'Participant'),
(39, 'local00006', 'demo33', 'MOREAU', 'Yanis', 'Dev Ops engeneer', '2', 'yanis.moreau@example.com', 'Participant'),
(40, 'local00007', 'test', 'test', 'alert', 'Developper Web', '1', 'testalert@example.com', 'Admin IT'),
(41, 'local00008', 'test', 'test 2', 'alert 2', 'Developper Web', '1', 'testalert2@example.com', 'Admin IT'),
(42, 'local00009', 'test', 'test', 'redirect ', 'Developper Web', '1', 'test@outlook.com', 'Admin Formation'),
(43, 'local00010', 'test', 'test 2', 'redirect 2', 'Developper Web', '1', 'test@outlook.com', 'Admin Formation'),
(44, 'user00008', 'dGVzdA==', 'ExtreamlyVeryNewUser8', 'ExtreamlyVeryNewDemo', NULL, '2', 'extreamly_very_new_user00008@example.com', 'Participant'),
(45, 'user00009', 'dGVzdA==', 'User9', 'Demo', NULL, NULL, 'user00009@example.com', 'Participant'),
(46, 'local00011', 'test', 'DUPONT', 'ss', 'Developper Web', '1', 'demo@example.com', 'Participant');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`formationID`);

--
-- Index pour la table `parametres_de_base`
--
ALTER TABLE `parametres_de_base`
  ADD PRIMARY KEY (`param_key`);

--
-- Index pour la table `participation`
--
ALTER TABLE `participation`
  ADD PRIMARY KEY (`participationID`),
  ADD KEY `fk_formationID` (`formationID`),
  ADD KEY `fk_utilisateurID` (`utilisateurID`);

--
-- Index pour la table `reponse`
--
ALTER TABLE `reponse`
  ADD PRIMARY KEY (`reponseID`),
  ADD KEY `formationID` (`formationID`),
  ADD KEY `utilisateurID` (`utilisateurID`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleID`);

--
-- Index pour la table `structure`
--
ALTER TABLE `structure`
  ADD PRIMARY KEY (`structureID`);

--
-- Index pour la table `userrole`
--
ALTER TABLE `userrole`
  ADD KEY `utilisateurID` (`utilisateurID`),
  ADD KEY `roleID` (`roleID`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`utilisateurID`),
  ADD KEY `fk_structureID` (`structureID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `formation`
--
ALTER TABLE `formation`
  MODIFY `formationID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT pour la table `participation`
--
ALTER TABLE `participation`
  MODIFY `participationID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=321;

--
-- AUTO_INCREMENT pour la table `reponse`
--
ALTER TABLE `reponse`
  MODIFY `reponseID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `roleID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `utilisateurID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `fk_formationID` FOREIGN KEY (`formationID`) REFERENCES `formation` (`formationID`),
  ADD CONSTRAINT `fk_utilisateurID` FOREIGN KEY (`utilisateurID`) REFERENCES `utilisateur` (`utilisateurID`);

--
-- Contraintes pour la table `reponse`
--
ALTER TABLE `reponse`
  ADD CONSTRAINT `rp_fk_formationID` FOREIGN KEY (`formationID`) REFERENCES `formation` (`formationID`),
  ADD CONSTRAINT `rp_fk_utilisateurID` FOREIGN KEY (`utilisateurID`) REFERENCES `utilisateur` (`utilisateurID`);

--
-- Contraintes pour la table `userrole`
--
ALTER TABLE `userrole`
  ADD CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`utilisateurID`) REFERENCES `utilisateur` (`utilisateurID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `fk_structureID` FOREIGN KEY (`structureID`) REFERENCES `structure` (`structureID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
