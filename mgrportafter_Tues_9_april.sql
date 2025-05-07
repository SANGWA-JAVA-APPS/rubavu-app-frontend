/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.21-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: mgrport
-- ------------------------------------------------------
-- Server version	10.6.21-MariaDB-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `account_category_id` bigint(20) DEFAULT NULL,
  `profile_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2kxwuqgnchaeedu32vg4lnpft` (`account_category_id`),
  KEY `FKlelt1dhpyk7dqxdco3x3cd5ub` (`profile_id`),
  CONSTRAINT `FK2kxwuqgnchaeedu32vg4lnpft` FOREIGN KEY (`account_category_id`) REFERENCES `account_category` (`id`),
  CONSTRAINT `FKlelt1dhpyk7dqxdco3x3cd5ub` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(2,'rtda@gmail.com','\0','123','Enabled','rtda',2,2),(3,'berthingofficer@gmail.com','\0','123',NULL,'berthing officer',3,3),(4,'GateOfficer@gmail.com','\0','123',NULL,'Gate Officer',4,4),(5,'OpsOfficer@gmail.com','\0','123434',NULL,'Ops Officer',4,5),(6,'OpsOfficer@gmail.com','\0','123434',NULL,'Ops Supervisor',6,6),(7,'rugira@gmail.com','\0','1231234','Enabled','hubert',1,7),(8,'rugira@gmail.com','\0','554455','Enabled','Paul',1,8),(9,'rugira@gmail.com','\0','554455','Enabled','Heritier',1,9),(10,'rugira@gmail.com','\0','john',NULL,'kakira',NULL,10),(11,'rugira@gmail.com','\0','vive',NULL,'rugira',NULL,69),(12,'rugira@gmail.com','\0','emmanuel',NULL,'dushimirirmana',NULL,70),(13,'rugira@gmail.com','\0','bosco',NULL,'nijyongira',NULL,71),(14,'rugira@gmail.com','\0','john',NULL,'kakira',NULL,72);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_aud`
--

DROP TABLE IF EXISTS `account_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `account_category_id` bigint(20) DEFAULT NULL,
  `profile_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKaexie5n0kol2mjlvo03ii45d0` (`rev`),
  CONSTRAINT `FKaexie5n0kol2mjlvo03ii45d0` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_aud`
--

LOCK TABLES `account_aud` WRITE;
/*!40000 ALTER TABLE `account_aud` DISABLE KEYS */;
INSERT INTO `account_aud` VALUES (1,12,0,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,152,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,162,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,163,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,352,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,354,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,356,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,358,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,360,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,362,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,364,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,366,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,368,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,370,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,372,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,374,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,376,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,378,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,445,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,447,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,449,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,451,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,453,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,455,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,457,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,459,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,461,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,463,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,465,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,467,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,469,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,471,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,473,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,475,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,477,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,479,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,481,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,483,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,485,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,487,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,489,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,492,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,539,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,541,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,543,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,545,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,547,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,549,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,551,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,553,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,555,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,557,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,559,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,561,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,563,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,565,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,567,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,574,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,576,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,578,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,580,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,581,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,583,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,626,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,628,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,630,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,632,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,634,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,635,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,637,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,644,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,649,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,655,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,671,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,672,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,673,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,684,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,698,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,709,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,714,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,725,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,733,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,738,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,743,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,747,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,753,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,759,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,780,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,782,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,801,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,803,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,804,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,806,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,811,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,815,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,816,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,817,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,819,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,821,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(1,827,1,'Mahdi.ali@magerwa.com','\0','123456','Enabled','admin',1,1),(2,15,0,'rtda@gmail.com','\0','123','Enabled','rtda',2,2),(3,18,0,'berthingofficer@gmail.com','\0','123',NULL,'berthing officer',3,3),(4,21,0,'GateOfficer@gmail.com','\0','123',NULL,'Gate Officer',4,4),(5,24,0,'OpsOfficer@gmail.com','\0','123434',NULL,'Ops Officer',4,5),(6,27,0,'OpsOfficer@gmail.com','\0','123434',NULL,'Ops Supervisor',6,6),(7,46,0,'rugira@gmail.com','\0','vive',NULL,'rugira',NULL,7),(8,47,0,'rugira@gmail.com','\0','emmanuel',NULL,'dushimirirmana',NULL,8),(8,190,1,'rugira@gmail.com','\0','554455','Enabled','Paul',1,8),(8,748,1,'rugira@gmail.com','\0','554455','Enabled','Paul',1,8),(9,48,0,'rugira@gmail.com','\0','bosco',NULL,'nijyongira',NULL,9),(10,49,0,'rugira@gmail.com','\0','john',NULL,'kakira',NULL,10),(11,226,0,'rugira@gmail.com','\0','vive',NULL,'rugira',NULL,69),(12,227,0,'rugira@gmail.com','\0','emmanuel',NULL,'dushimirirmana',NULL,70),(13,228,0,'rugira@gmail.com','\0','bosco',NULL,'nijyongira',NULL,71),(14,229,0,'rugira@gmail.com','\0','john',NULL,'kakira',NULL,72);
/*!40000 ALTER TABLE `account_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_category`
--

DROP TABLE IF EXISTS `account_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_7ohtkiqvbc9a3bv842k7m7cku` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_category`
--

LOCK TABLES `account_category` WRITE;
/*!40000 ALTER TABLE `account_category` DISABLE KEYS */;
INSERT INTO `account_category` VALUES (1,'\0','admin'),(2,'\0','rtda'),(3,'\0','berthing officer'),(4,'\0','Gate Officer'),(5,'\0','Ops Officer'),(6,'\0','Ops Supervisor'),(7,'\0','Berthing Supervisor');
/*!40000 ALTER TABLE `account_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_category_aud`
--

DROP TABLE IF EXISTS `account_category_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_category_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKoj5110aud8e8gigds0ne5tkm5` (`rev`),
  CONSTRAINT `FKoj5110aud8e8gigds0ne5tkm5` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_category_aud`
--

LOCK TABLES `account_category_aud` WRITE;
/*!40000 ALTER TABLE `account_category_aud` DISABLE KEYS */;
INSERT INTO `account_category_aud` VALUES (1,10,0,'\0','admin'),(1,41,1,'\0','admin'),(1,221,1,'\0','admin'),(1,234,1,'\0','admin'),(2,14,0,'\0','rtda'),(2,41,1,'\0','rtda'),(2,221,1,'\0','rtda'),(2,234,1,'\0','rtda'),(3,17,0,'\0','berthing officer'),(3,41,1,'\0','berthing officer'),(3,221,1,'\0','berthing officer'),(3,234,1,'\0','berthing officer'),(4,20,0,'\0','Gate Officer'),(4,41,1,'\0','Gate Officer'),(4,221,1,'\0','Gate Officer'),(4,234,1,'\0','Gate Officer'),(5,23,0,'\0','Ops Officer'),(5,41,1,'\0','Ops Officer'),(5,221,1,'\0','Ops Officer'),(5,234,1,'\0','Ops Officer'),(6,26,0,'\0','Ops Supervisor'),(6,41,1,'\0','Ops Supervisor'),(6,221,1,'\0','Ops Supervisor'),(6,234,1,'\0','Ops Supervisor'),(7,41,0,'\0','Berthing Supervisor'),(7,221,1,'\0','Berthing Supervisor'),(7,234,1,'\0','Berthing Supervisor');
/*!40000 ALTER TABLE `account_category_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_category_roles`
--

DROP TABLE IF EXISTS `account_category_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_category_roles` (
  `account_category_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  KEY `FKleuk7k87vcyximwg6j0gcdwoq` (`role_id`),
  KEY `FK6ms8ydcoftlokoog9wwkpuk5n` (`account_category_id`),
  CONSTRAINT `FK6ms8ydcoftlokoog9wwkpuk5n` FOREIGN KEY (`account_category_id`) REFERENCES `account_category` (`id`),
  CONSTRAINT `FKleuk7k87vcyximwg6j0gcdwoq` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_category_roles`
--

LOCK TABLES `account_category_roles` WRITE;
/*!40000 ALTER TABLE `account_category_roles` DISABLE KEYS */;
INSERT INTO `account_category_roles` VALUES (7,13),(7,14),(7,15),(7,16),(7,17),(7,18),(7,19),(7,20),(7,21),(7,22),(7,23),(7,24),(4,25),(4,26),(4,27),(4,28),(3,1),(3,2),(3,3),(3,4),(3,5),(3,6),(3,7),(3,8),(3,21),(3,22),(3,23),(3,24),(6,29),(6,30),(6,31),(6,32),(6,33),(6,34),(6,35),(6,36),(6,37),(6,38),(6,39),(6,40),(6,45),(6,46),(6,47),(6,48),(6,49),(6,50),(6,51),(6,52),(6,53),(6,54),(6,55),(6,56),(5,41),(5,42),(5,43),(5,44),(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,44),(1,45),(1,46),(1,47),(1,48),(1,49),(1,50),(1,51),(1,52),(1,53),(1,54),(1,55),(1,56),(1,57),(1,58),(1,59),(1,60),(2,61),(2,62);
/*!40000 ALTER TABLE `account_category_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_category_roles_aud`
--

DROP TABLE IF EXISTS `account_category_roles_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_category_roles_aud` (
  `rev` int(11) NOT NULL,
  `account_category_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`rev`,`account_category_id`,`role_id`),
  CONSTRAINT `FK8vfsixqfrntixbu9l5vr9811d` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_category_roles_aud`
--

LOCK TABLES `account_category_roles_aud` WRITE;
/*!40000 ALTER TABLE `account_category_roles_aud` DISABLE KEYS */;
INSERT INTO `account_category_roles_aud` VALUES (41,1,1,0),(41,1,2,0),(41,1,3,0),(41,1,4,0),(41,1,5,0),(41,1,6,0),(41,1,7,0),(41,1,8,0),(41,1,9,0),(41,1,10,0),(41,1,11,0),(41,1,12,0),(41,1,13,0),(41,1,14,0),(41,1,15,0),(41,1,16,0),(41,1,17,0),(41,1,18,0),(41,1,19,0),(41,1,20,0),(41,1,21,0),(41,1,22,0),(41,1,23,0),(41,1,24,0),(41,1,25,0),(41,1,26,0),(41,1,27,0),(41,1,28,0),(41,1,29,0),(41,1,30,0),(41,1,31,0),(41,1,32,0),(41,1,33,0),(41,1,34,0),(41,1,35,0),(41,1,36,0),(41,1,37,0),(41,1,38,0),(41,1,39,0),(41,1,40,0),(41,1,41,0),(41,1,42,0),(41,1,43,0),(41,1,44,0),(41,1,45,0),(41,1,46,0),(41,1,47,0),(41,1,48,0),(41,1,49,0),(41,1,50,0),(41,1,51,0),(41,1,52,0),(41,1,53,0),(41,1,54,0),(41,1,55,0),(41,1,56,0),(41,1,57,0),(41,1,58,0),(41,1,59,0),(41,1,60,0),(41,2,61,0),(41,2,62,0),(41,3,1,0),(41,3,2,0),(41,3,3,0),(41,3,4,0),(41,3,5,0),(41,3,6,0),(41,3,7,0),(41,3,8,0),(41,3,21,0),(41,3,22,0),(41,3,23,0),(41,3,24,0),(41,4,25,0),(41,4,26,0),(41,4,27,0),(41,4,28,0),(41,5,41,0),(41,5,42,0),(41,5,43,0),(41,5,44,0),(41,6,29,0),(41,6,30,0),(41,6,31,0),(41,6,32,0),(41,6,33,0),(41,6,34,0),(41,6,35,0),(41,6,36,0),(41,6,37,0),(41,6,38,0),(41,6,39,0),(41,6,40,0),(41,6,45,0),(41,6,46,0),(41,6,47,0),(41,6,48,0),(41,6,49,0),(41,6,50,0),(41,6,51,0),(41,6,52,0),(41,6,53,0),(41,6,54,0),(41,6,55,0),(41,6,56,0),(41,7,13,0),(41,7,14,0),(41,7,15,0),(41,7,16,0),(41,7,17,0),(41,7,18,0),(41,7,19,0),(41,7,20,0),(41,7,21,0),(41,7,22,0),(41,7,23,0),(41,7,24,0);
/*!40000 ALTER TABLE `account_category_roles_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_settings`
--

DROP TABLE IF EXISTS `app_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_settings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(250) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `value` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_d9g77c2ms649hyr88ll9cn0f5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_settings`
--

LOCK TABLES `app_settings` WRITE;
/*!40000 ALTER TABLE `app_settings` DISABLE KEYS */;
INSERT INTO `app_settings` VALUES (1,NULL,'\0','currency','RWF'),(2,NULL,'\0','company_name','MGR R.PORT'),(3,'notset','\0','stock_move_type','  values  is first in \"first out\", \"lastin lastout\" \"expired\" if he produces and no if he does not'),(4,'notset','\0','producer','the values for this is yes if he produces and no if he does not'),(5,'the values for this is yes if he produces and no if he does not','\0','stockorbusiness','stock'),(6,'default items measure unit','\0','defaultmeasureunit','tons'),(7,NULL,'\0','favicon','notset'),(8,NULL,'\0','skintheme','notset'),(9,NULL,'\0','payMethod','MoMo');
/*!40000 ALTER TABLE `app_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_settings_aud`
--

DROP TABLE IF EXISTS `app_settings_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_settings_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKbboixob5twflxx9qgx5dkpclh` (`rev`),
  CONSTRAINT `FKbboixob5twflxx9qgx5dkpclh` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_settings_aud`
--

LOCK TABLES `app_settings_aud` WRITE;
/*!40000 ALTER TABLE `app_settings_aud` DISABLE KEYS */;
INSERT INTO `app_settings_aud` VALUES (1,1,0,NULL,'\0','currency','notset'),(1,69,1,NULL,'\0','currency','RWF'),(2,2,0,NULL,'\0','company_name','notset'),(2,68,1,NULL,'\0','company_name','MGR PORT'),(3,3,0,'notset','\0','stock_move_type','  values  is first in \"first out\", \"lastin lastout\" \"expired\" if he produces and no if he does not'),(4,4,0,'notset','\0','producer','the values for this is yes if he produces and no if he does not'),(5,5,0,'the values for this is yes if he produces and no if he does not','\0','stockorbusiness','stock'),(6,6,0,'default items measure unit','\0','defaultmeasureunit','tons'),(7,7,0,NULL,'\0','favicon','notset'),(8,8,0,NULL,'\0','skintheme','notset'),(9,9,0,NULL,'\0','payMethod','MoMo');
/*!40000 ALTER TABLE `app_settings_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arrival_note`
--

DROP TABLE IF EXISTS `arrival_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `arrival_note` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `collect_type` varchar(80) NOT NULL,
  `date_time` varchar(80) NOT NULL,
  `dest_id` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `source_id` varchar(80) DEFAULT NULL,
  `tarifftype` varchar(80) DEFAULT NULL,
  `done_by` bigint(20) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp6tsb1bm9amanotvw6108rut1` (`done_by`),
  KEY `FKpul910bj60qrsxl87s5vfaclu` (`client_id`),
  KEY `FKc5ohpmbm1e6hccettwhwx18vp` (`destination_id`),
  CONSTRAINT `FKc5ohpmbm1e6hccettwhwx18vp` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`),
  CONSTRAINT `FKp6tsb1bm9amanotvw6108rut1` FOREIGN KEY (`done_by`) REFERENCES `account` (`id`),
  CONSTRAINT `FKpul910bj60qrsxl87s5vfaclu` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrival_note`
--

LOCK TABLES `arrival_note` WRITE;
/*!40000 ALTER TABLE `arrival_note` DISABLE KEYS */;
INSERT INTO `arrival_note` VALUES (1,'Not Assorted','2025-04-01 16:02:19','3','\0','18','2',1,8,1),(2,'Not Assorted','2025-04-02 17:05:15','1','\0','20','2',1,12,1),(3,'Not Assorted','2025-04-02 17:13:41','0','\0','0','2',1,13,1),(4,'','2025-04-03 10:59:11','0','\0','7','1',8,14,5),(5,'Assorted','2025-04-03 16:30:15.000000','1','\0','11','1',1,19,1),(6,'Assorted','2025-04-03 16:31:40.000000','3','\0','11','1',1,20,1),(7,'Not Assorted','2025-04-03 16:34:21.000000','5','\0','28','1',1,21,1),(8,'Not Assorted','2025-04-03 16:36:12.000000','2','\0','31','1',1,22,1),(9,'Not Assorted','2025-04-03 16:38:37.000000','5','\0','29','1',1,23,1),(10,'Not Assorted','2025-04-03 16:41:59.000000','4','\0','11','1',1,24,1),(11,'Not Assorted','2025-04-03 16:43:56.000000','2','\0','25','1',1,25,1),(12,'Not Assorted','2025-04-03 16:45:23.000000','3','\0','11','1',1,26,1),(13,'Not Assorted','2025-04-03 16:46:23.000000','1','\0','11','1',1,27,1),(14,'Not Assorted','2025-04-03 16:47:27.000000','7','\0','11','1',1,28,1),(15,'Not Assorted','2025-04-03 16:48:12.000000','8','\0','11','1',1,29,1),(16,'Not Assorted','2025-04-03 16:55:27.000000','7','\0','11','1',1,30,1),(17,'Not Assorted','2025-04-03 16:58:49.000000','9','\0','24','2',1,31,1),(18,'Not Assorted','2025-04-03 17:00:06.000000','2','\0','24','2',1,32,1),(19,'Not Assorted','2025-04-04 11:38:34.000000','1','\0','3','1',1,33,4),(20,'Not Assorted','2025-04-04 11:40:57.000000','4','\0','8','1',1,34,4),(21,'Not Assorted','2025-04-04 11:45:37.000000','2','\0','1','1',1,35,4),(22,'Not Assorted','2025-04-04 11:49:42.000000','12','\0','5','1',1,36,5),(23,'Not Assorted','2025-04-04 11:51:44.000000','16','\0','2','1',1,37,5),(24,'Not Assorted','2025-04-04 11:53:50.000000','2','\0','10','1',1,38,1),(25,'Not Assorted','2025-04-04 11:54:58.000000','5','\0','17','1',1,39,1),(26,'Not Assorted','2025-04-04 11:56:11.000000','1','\0','4','1',1,40,1),(27,'Not Assorted','2025-04-04 11:57:26.000000','3','\0','17','1',1,41,1),(28,'Not Assorted','2025-04-04 11:58:16.000000','4','\0','4','1',1,42,1),(29,'Not Assorted','2025-04-04 11:59:15.000000','2','\0','11','1',1,43,1),(30,'Not Assorted','2025-04-04 12:00:54.000000','4','\0','4','1',1,44,1),(31,'Not Assorted','2025-04-04 12:02:00.000000','4','\0','3','1',1,45,1),(32,'Not Assorted','2025-04-04 12:20:59.000000','2','\0','14','2',1,46,1),(33,'Not Assorted','2025-04-04 12:26:02.000000','3','\0','10','2',1,47,1),(34,'Not Assorted','2025-04-04 12:28:18.000000','7','\0','3','2',1,48,5),(35,'Not Assorted','2025-04-04 12:29:49.000000','2','\0','2','2',1,49,5),(36,'Not Assorted','2025-04-04 12:31:03.000000','4','\0','5','2',1,50,5),(37,'Not Assorted','2025-04-04 12:32:06.000000','3','\0','4','2',1,51,5),(38,'Not Assorted','2025-04-04 12:33:03.000000','9','\0','4','2',1,52,5),(39,'Not Assorted','2025-04-04 12:34:25.000000','3','\0','2','2',1,53,5),(40,'Not Assorted','2025-04-04 12:36:04.000000','2','\0','3','2',1,54,5),(41,'Not Assorted','2025-04-04 12:37:16.000000','7','\0','3','2',1,55,5),(42,'Not Assorted','2025-04-04 13:20:49.000000','4','\0','2','2',1,56,1),(43,'Not Assorted','2025-04-05 15:13:41.000000','2','\0','2','1',1,57,1),(44,'Not Assorted','2025-04-05 15:17:32.000000','3','\0','2','1',1,58,1),(45,'Not Assorted','2025-04-05 15:26:19.000000','5','\0','2','1',1,59,1),(46,'Not Assorted','2025-04-05 15:27:35.000000','2','\0','2','1',1,60,1),(47,'Not Assorted','2025-04-05 15:28:38.000000','3','\0','14','1',1,61,1),(48,'Not Assorted','2025-04-05 15:30:27.000000','3','\0','2','1',1,62,1),(49,'Not Assorted','2025-04-05 15:31:34.000000','3','\0','2','1',1,63,1),(50,'Not Assorted','2025-04-05 15:33:47.000000','4','\0','3','1',1,64,1),(51,'Not Assorted','2025-04-05 15:34:26.000000','9','\0','2','1',1,65,1),(52,'Not Assorted','2025-04-05 15:35:47.000000','2','\0','15','1',1,66,1),(53,'Not Assorted','2025-04-05 15:40:53.000000','4','\0','11','1',1,67,1),(54,'Not Assorted','2025-04-05 15:41:57.000000','5','\0','17','1',1,68,1),(55,'Not Assorted','2025-04-05 15:43:15.000000','2','\0','4','1',1,69,1),(56,'Not Assorted','2025-04-05 15:44:16.000000','2','\0','3','1',1,70,1),(57,'Not Assorted','2025-04-05 15:45:15.000000','2','\0','3','1',1,71,1),(58,'Not Assorted','2025-04-05 16:09:48.000000','6','\0','17','2',1,72,1),(59,'Not Assorted','2025-04-05 16:11:17.000000','8','\0','11','2',1,73,1),(60,'Not Assorted','2025-04-05 16:14:34.000000','5','\0','3','2',1,74,1),(61,'Not Assorted','2025-04-05 16:16:59.000000','1','\0','13','2',1,75,1),(62,'Not Assorted','2025-04-05 16:18:18.000000','2','\0','14','2',1,76,1),(63,'Not Assorted','2025-04-05 16:20:17.000000','3','\0','2','2',1,77,1),(64,'Not Assorted','2025-04-06 20:53:11','5','\0','17','1',1,78,1),(65,'Not Assorted','2025-04-06 20:54:43','4','\0','18','1',1,79,1),(66,'Not Assorted','2025-04-06 20:55:26','2','\0','10','1',1,80,1),(67,'Not Assorted','2025-04-06 21:03:25','2','\0','14','1',1,81,1),(68,'Not Assorted','2025-04-06 21:08:05','4','\0','3','1',1,82,1),(69,'Not Assorted','2025-04-06 21:09:12','4','\0','4','1',1,83,1),(70,'Not Assorted','2025-04-06 21:11:24','14','\0','2','2',1,84,5),(71,'Not Assorted','2025-04-08 09:33:40','0','\0','60','1',1,85,3),(72,'Not Assorted','2025-04-08 10:10:51','0','\0','2','1',1,86,6),(73,'Not Assorted','2025-04-08 10:40:29','3','\0','61','2',1,87,1),(74,'Not Assorted','2025-04-08 12:25:49','0','\0','66','2',1,95,3),(75,'Not Assorted','2025-04-08 12:35:54','0','\0','65','2',1,97,3),(76,'Not Assorted','2025-04-08 12:40:31','0','\0','64','2',1,98,3),(77,'Not Assorted','2025-04-08 13:37:06','1','\0','69','2',1,99,1),(78,'Not Assorted','2025-04-08 15:50:42','10','\0','73','1',1,104,1),(79,'Not Assorted','2025-04-08 16:29:07','10','\0','75','2',1,107,1),(80,'Not Assorted','2025-04-08 17:11:08','6','\0','74','1',1,109,1),(81,'Not Assorted','2025-04-09 09:58:06','6','\0','52','1',1,110,1),(82,'Not Assorted','2025-04-09 10:20:20','7','\0','77','1',1,111,1),(83,'Assorted','2025-04-09 11:06:20','8','\0','78','2',1,112,1),(84,'Not Assorted','2025-04-09 11:53:31','0','\0','79','2',1,113,3),(85,'Assorted','2025-04-09 12:33:55','11','\0','2','1',1,114,1),(86,'Not Assorted','2025-04-09 12:34:24','6','\0','80','1',8,115,1),(87,'Not Assorted','2025-04-09 12:51:43','0','\0','81','2',1,116,3),(88,'Not Assorted','2025-04-09 13:01:50','10','\0','80','1',1,117,1),(89,'Not Assorted','2025-04-09 13:58:01','10','\0','18','1',1,118,1),(90,'Not Assorted','2025-04-09 14:05:06','10','\0','83','1',1,119,1),(91,'Not Assorted','2025-04-09 15:28:35','11','\0','70','1',1,120,1),(92,'Not Assorted','2025-04-09 15:34:26','11','\0','82','1',1,121,1),(93,'Not Assorted','2025-04-09 15:39:40','11','\0','63','1',1,122,1),(94,'Not Assorted','2025-04-09 16:01:53','11','\0','70','1',1,123,1),(95,'Not Assorted','2025-04-09 16:16:35','10','\0','88','1',1,124,1),(96,'Not Assorted','2025-04-09 16:28:33','10','\0','88','1',1,125,1),(97,'Not Assorted','2025-04-09 16:28:48','6','\0','32','2',1,126,1),(98,'Not Assorted','2025-04-09 16:29:57','10','\0','88','1',1,127,1),(99,'Not Assorted','2025-04-09 16:35:53','6','\0','32','2',1,128,1),(100,'Not Assorted','2025-04-09 16:41:41','6','\0','32','2',1,129,1),(101,'Not Assorted','2025-04-09 16:53:29','3','\0','89','2',1,130,1);
/*!40000 ALTER TABLE `arrival_note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arrival_note_aud`
--

DROP TABLE IF EXISTS `arrival_note_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `arrival_note_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `collect_type` varchar(80) DEFAULT NULL,
  `date_time` varchar(80) DEFAULT NULL,
  `dest_id` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `source_id` varchar(80) DEFAULT NULL,
  `tarifftype` varchar(80) DEFAULT NULL,
  `done_by` bigint(20) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKn78f2g0pv923gdxt1x6ifgnr3` (`rev`),
  CONSTRAINT `FKn78f2g0pv923gdxt1x6ifgnr3` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrival_note_aud`
--

LOCK TABLES `arrival_note_aud` WRITE;
/*!40000 ALTER TABLE `arrival_note_aud` DISABLE KEYS */;
INSERT INTO `arrival_note_aud` VALUES (1,152,0,'Not Assorted','2025-04-02 16:02:19','3','\0','18','2',1,8,1),(1,211,1,'Not Assorted','2025-04-01 16:02:19','3','\0','18','2',1,8,1),(2,162,0,'Not Assorted','2025-04-02 17:05:15','1','\0','20','2',1,12,1),(2,214,1,'Not Assorted','2025-04-02 17:05:15','1','\0','20','2',1,12,1),(3,163,0,'Not Assorted','2025-04-02 17:13:41','0','\0','0','2',1,13,1),(4,190,0,'','2025-04-03 10:59:11','0','\0','7','1',8,14,5),(5,352,0,'Assorted','2025-04-05 16:30:15','1','\0','11','1',1,19,1),(5,353,1,'Assorted','2025-04-05 16:30:15','1','\0','11','1',1,19,1),(6,354,0,'Assorted','2025-04-05 16:31:40','3','\0','11','1',1,20,1),(6,355,1,'Assorted','2025-04-05 16:31:40','3','\0','11','1',1,20,1),(7,356,0,'Not Assorted','2025-04-05 16:34:21','5','\0','28','1',1,21,1),(7,357,1,'Not Assorted','2025-04-05 16:34:21','5','\0','28','1',1,21,1),(8,358,0,'Not Assorted','2025-04-05 16:36:12','2','\0','31','1',1,22,1),(8,359,1,'Not Assorted','2025-04-05 16:36:12','2','\0','31','1',1,22,1),(9,360,0,'Not Assorted','2025-04-05 16:38:37','5','\0','29','1',1,23,1),(9,361,1,'Not Assorted','2025-04-05 16:38:37','5','\0','29','1',1,23,1),(10,362,0,'Not Assorted','2025-04-05 16:41:59','4','\0','11','1',1,24,1),(10,363,1,'Not Assorted','2025-04-05 16:41:59','4','\0','11','1',1,24,1),(11,364,0,'Not Assorted','2025-04-05 16:43:56','2','\0','25','1',1,25,1),(11,365,1,'Not Assorted','2025-04-05 16:43:56','2','\0','25','1',1,25,1),(11,373,1,'Not Assorted','2025-04-05 16:43:56','2','\0','25','1',1,25,1),(12,366,0,'Not Assorted','2025-04-05 16:45:23','3','\0','11','1',1,26,1),(12,367,1,'Not Assorted','2025-04-05 16:45:23','3','\0','11','1',1,26,1),(13,368,0,'Not Assorted','2025-04-05 16:46:23','1','\0','11','1',1,27,1),(13,369,1,'Not Assorted','2025-04-05 16:46:23','1','\0','11','1',1,27,1),(14,370,0,'Not Assorted','2025-04-05 16:47:27','7','\0','11','1',1,28,1),(14,371,1,'Not Assorted','2025-04-05 16:47:27','7','\0','11','1',1,28,1),(15,372,0,'Not Assorted','2025-04-05 16:48:12','8','\0','11','1',1,29,1),(16,374,0,'Not Assorted','2025-04-05 16:55:27','7','\0','11','1',1,30,1),(16,375,1,'Not Assorted','2025-04-05 16:55:27','7','\0','11','1',1,30,1),(17,376,0,'Not Assorted','2025-04-05 16:58:49','9','\0','24','2',1,31,1),(17,377,1,'Not Assorted','2025-04-05 16:58:49','9','\0','24','2',1,31,1),(18,378,0,'Not Assorted','2025-04-05 17:00:06','2','\0','24','2',1,32,1),(18,379,1,'Not Assorted','2025-04-05 17:00:06','2','\0','24','2',1,32,1),(19,445,0,'Not Assorted','2025-04-06 11:38:34','1','\0','3','1',1,33,4),(19,446,1,'Not Assorted','2025-04-06 11:38:34','1','\0','3','1',1,33,4),(20,447,0,'Not Assorted','2025-04-06 11:40:57','4','\0','8','1',1,34,4),(20,448,1,'Not Assorted','2025-04-06 11:40:57','4','\0','8','1',1,34,4),(21,449,0,'Not Assorted','2025-04-06 11:45:37','2','\0','1','1',1,35,4),(21,450,1,'Not Assorted','2025-04-06 11:45:37','2','\0','1','1',1,35,4),(22,451,0,'Not Assorted','2025-04-06 11:49:42','12','\0','5','1',1,36,5),(22,452,1,'Not Assorted','2025-04-06 11:49:42','12','\0','5','1',1,36,5),(23,453,0,'Not Assorted','2025-04-06 11:51:44','16','\0','2','1',1,37,5),(23,454,1,'Not Assorted','2025-04-06 11:51:44','16','\0','2','1',1,37,5),(24,455,0,'Not Assorted','2025-04-06 11:53:50','2','\0','10','1',1,38,1),(24,456,1,'Not Assorted','2025-04-06 11:53:50','2','\0','10','1',1,38,1),(25,457,0,'Not Assorted','2025-04-06 11:54:58','5','\0','17','1',1,39,1),(25,458,1,'Not Assorted','2025-04-06 11:54:58','5','\0','17','1',1,39,1),(26,459,0,'Not Assorted','2025-04-06 11:56:11','1','\0','4','1',1,40,1),(26,460,1,'Not Assorted','2025-04-06 11:56:11','1','\0','4','1',1,40,1),(27,461,0,'Not Assorted','2025-04-06 11:57:26','3','\0','17','1',1,41,1),(27,462,1,'Not Assorted','2025-04-06 11:57:26','3','\0','17','1',1,41,1),(28,463,0,'Not Assorted','2025-04-06 11:58:16','4','\0','4','1',1,42,1),(28,464,1,'Not Assorted','2025-04-06 11:58:16','4','\0','4','1',1,42,1),(29,465,0,'Not Assorted','2025-04-06 11:59:15','2','\0','11','1',1,43,1),(29,466,1,'Not Assorted','2025-04-06 11:59:15','2','\0','11','1',1,43,1),(30,467,0,'Not Assorted','2025-04-06 12:00:54','4','\0','4','1',1,44,1),(30,468,1,'Not Assorted','2025-04-06 12:00:54','4','\0','4','1',1,44,1),(31,469,0,'Not Assorted','2025-04-06 12:02:00','4','\0','3','1',1,45,1),(31,470,1,'Not Assorted','2025-04-06 12:02:00','4','\0','3','1',1,45,1),(32,471,0,'Not Assorted','2025-04-06 12:20:59','2','\0','14','2',1,46,1),(32,472,1,'Not Assorted','2025-04-06 12:20:59','2','\0','14','2',1,46,1),(33,473,0,'Not Assorted','2025-04-06 12:26:02','3','\0','10','2',1,47,1),(33,474,1,'Not Assorted','2025-04-06 12:26:02','3','\0','10','2',1,47,1),(34,475,0,'Not Assorted','2025-04-06 12:28:18','7','\0','3','2',1,48,5),(34,476,1,'Not Assorted','2025-04-06 12:28:18','7','\0','3','2',1,48,5),(35,477,0,'Not Assorted','2025-04-06 12:29:49','2','\0','2','2',1,49,5),(35,478,1,'Not Assorted','2025-04-06 12:29:49','2','\0','2','2',1,49,5),(36,479,0,'Not Assorted','2025-04-06 12:31:03','4','\0','5','2',1,50,5),(36,480,1,'Not Assorted','2025-04-06 12:31:03','4','\0','5','2',1,50,5),(37,481,0,'Not Assorted','2025-04-06 12:32:06','3','\0','4','2',1,51,5),(37,482,1,'Not Assorted','2025-04-06 12:32:06','3','\0','4','2',1,51,5),(38,483,0,'Not Assorted','2025-04-06 12:33:03','9','\0','4','2',1,52,5),(38,484,1,'Not Assorted','2025-04-06 12:33:03','9','\0','4','2',1,52,5),(39,485,0,'Not Assorted','2025-04-06 12:34:25','3','\0','2','2',1,53,5),(39,486,1,'Not Assorted','2025-04-06 12:34:25','3','\0','2','2',1,53,5),(40,487,0,'Not Assorted','2025-04-06 12:36:04','2','\0','3','2',1,54,5),(40,488,1,'Not Assorted','2025-04-06 12:36:04','2','\0','3','2',1,54,5),(41,489,0,'Not Assorted','2025-04-06 12:37:16','7','\0','3','2',1,55,5),(41,490,1,'Not Assorted','2025-04-06 12:37:16','7','\0','3','2',1,55,5),(42,492,0,'Not Assorted','2025-04-06 13:20:49','4','\0','2','2',1,56,1),(42,493,1,'Not Assorted','2025-04-06 13:20:49','4','\0','2','2',1,56,1),(43,539,0,'Not Assorted','2025-04-06 15:13:41','2','\0','2','1',1,57,1),(43,540,1,'Not Assorted','2025-04-06 15:13:41','2','\0','2','1',1,57,1),(44,541,0,'Not Assorted','2025-04-06 15:17:32','3','\0','2','1',1,58,1),(44,542,1,'Not Assorted','2025-04-06 15:17:32','3','\0','2','1',1,58,1),(45,543,0,'Not Assorted','2025-04-06 15:26:19','5','\0','2','1',1,59,1),(45,544,1,'Not Assorted','2025-04-06 15:26:19','5','\0','2','1',1,59,1),(46,545,0,'Not Assorted','2025-04-06 15:27:35','2','\0','2','1',1,60,1),(46,546,1,'Not Assorted','2025-04-06 15:27:35','2','\0','2','1',1,60,1),(47,547,0,'Not Assorted','2025-04-06 15:28:38','3','\0','14','1',1,61,1),(47,548,1,'Not Assorted','2025-04-06 15:28:38','3','\0','14','1',1,61,1),(48,549,0,'Not Assorted','2025-04-06 15:30:27','3','\0','2','1',1,62,1),(48,550,1,'Not Assorted','2025-04-06 15:30:27','3','\0','2','1',1,62,1),(49,551,0,'Not Assorted','2025-04-06 15:31:34','3','\0','2','1',1,63,1),(49,552,1,'Not Assorted','2025-04-06 15:31:34','3','\0','2','1',1,63,1),(50,553,0,'Not Assorted','2025-04-06 15:33:47','4','\0','3','1',1,64,1),(50,554,1,'Not Assorted','2025-04-06 15:33:47','4','\0','3','1',1,64,1),(51,555,0,'Not Assorted','2025-04-06 15:34:26','9','\0','2','1',1,65,1),(51,556,1,'Not Assorted','2025-04-06 15:34:26','9','\0','2','1',1,65,1),(52,557,0,'Not Assorted','2025-04-06 15:35:47','2','\0','15','1',1,66,1),(52,558,1,'Not Assorted','2025-04-06 15:35:47','2','\0','15','1',1,66,1),(53,559,0,'Not Assorted','2025-04-06 15:40:53','4','\0','11','1',1,67,1),(53,560,1,'Not Assorted','2025-04-06 15:40:53','4','\0','11','1',1,67,1),(54,561,0,'Not Assorted','2025-04-06 15:41:57','5','\0','17','1',1,68,1),(54,562,1,'Not Assorted','2025-04-06 15:41:57','5','\0','17','1',1,68,1),(55,563,0,'Not Assorted','2025-04-06 15:43:15','2','\0','4','1',1,69,1),(55,564,1,'Not Assorted','2025-04-06 15:43:15','2','\0','4','1',1,69,1),(56,565,0,'Not Assorted','2025-04-06 15:44:16','2','\0','3','1',1,70,1),(56,566,1,'Not Assorted','2025-04-06 15:44:16','2','\0','3','1',1,70,1),(57,567,0,'Not Assorted','2025-04-06 15:45:15','2','\0','3','1',1,71,1),(57,568,1,'Not Assorted','2025-04-06 15:45:15','2','\0','3','1',1,71,1),(58,574,0,'Not Assorted','2025-04-06 16:09:48','6','\0','17','2',1,72,1),(58,575,1,'Not Assorted','2025-04-06 16:09:48','6','\0','17','2',1,72,1),(59,576,0,'Not Assorted','2025-04-06 16:11:17','8','\0','11','2',1,73,1),(59,577,1,'Not Assorted','2025-04-06 16:11:17','8','\0','11','2',1,73,1),(60,578,0,'Not Assorted','2025-04-06 16:14:34','5','\0','3','2',1,74,1),(60,579,1,'Not Assorted','2025-04-06 16:14:34','5','\0','3','2',1,74,1),(61,580,0,'Not Assorted','2025-04-06 16:16:59','1','\0','13','2',1,75,1),(62,581,0,'Not Assorted','2025-04-06 16:18:18','2','\0','14','2',1,76,1),(62,582,1,'Not Assorted','2025-04-06 16:18:18','2','\0','14','2',1,76,1),(63,583,0,'Not Assorted','2025-04-06 16:20:17','3','\0','2','2',1,77,1),(63,584,1,'Not Assorted','2025-04-06 16:20:17','3','\0','2','2',1,77,1),(64,626,0,'Not Assorted','2025-04-06 20:53:11','5','\0','17','1',1,78,1),(64,627,1,'Not Assorted','2025-04-06 20:53:11','5','\0','17','1',1,78,1),(65,628,0,'Not Assorted','2025-04-06 20:54:43','4','\0','18','1',1,79,1),(65,629,1,'Not Assorted','2025-04-06 20:54:43','4','\0','18','1',1,79,1),(66,630,0,'Not Assorted','2025-04-06 20:55:26','2','\0','10','1',1,80,1),(66,631,1,'Not Assorted','2025-04-06 20:55:26','2','\0','10','1',1,80,1),(67,632,0,'Not Assorted','2025-04-06 21:03:25','2','\0','14','1',1,81,1),(67,633,1,'Not Assorted','2025-04-06 21:03:25','2','\0','14','1',1,81,1),(68,634,0,'Not Assorted','2025-04-06 21:08:05','4','\0','3','1',1,82,1),(69,635,0,'Not Assorted','2025-04-06 21:09:12','4','\0','4','1',1,83,1),(69,636,1,'Not Assorted','2025-04-06 21:09:12','4','\0','4','1',1,83,1),(69,638,1,'Not Assorted','2025-04-06 21:09:12','4','\0','4','1',1,83,1),(70,637,0,'Not Assorted','2025-04-06 21:11:24','14','\0','2','2',1,84,5),(71,644,0,'Not Assorted','2025-04-08 09:33:40','0','\0','60','2',1,85,3),(71,645,1,'Not Assorted','2025-04-08 09:33:40','0','\0','60','1',1,85,3),(72,649,0,'Not Assorted','2025-04-08 10:10:51','0','\0','2','2',1,86,6),(73,655,0,'Not Assorted','2025-04-08 10:40:29','3','\0','61','2',1,87,1),(74,671,0,'Not Assorted','2025-04-08 12:25:49','0','\0','66','2',1,95,3),(75,672,0,'Not Assorted','2025-04-08 12:35:54','0','\0','65','2',1,97,3),(76,673,0,'Not Assorted','2025-04-08 12:40:31','0','\0','64','2',1,98,3),(77,684,0,'Not Assorted','2025-04-08 13:37:06','1','\0','69','2',1,99,1),(77,685,1,'Not Assorted','2025-04-08 13:37:06','1','\0','69','2',1,99,1),(78,698,0,'Not Assorted','2025-04-08 15:50:42','10','\0','73','1',1,104,1),(78,699,1,'Not Assorted','2025-04-08 15:50:42','10','\0','73','1',1,104,1),(79,709,0,'Not Assorted','2025-04-08 16:29:07','10','\0','75','2',1,107,1),(79,710,1,'Not Assorted','2025-04-08 16:29:07','10','\0','75','2',1,107,1),(80,714,0,'Not Assorted','2025-04-08 17:11:08','6','\0','74','1',1,109,1),(80,715,1,'Not Assorted','2025-04-08 17:11:08','6','\0','74','1',1,109,1),(81,725,0,'Not Assorted','2025-04-09 09:58:06','6','\0','52','1',1,110,1),(81,726,1,'Not Assorted','2025-04-09 09:58:06','6','\0','52','1',1,110,1),(82,733,0,'Not Assorted','2025-04-09 10:20:20','7','\0','77','1',1,111,1),(82,734,1,'Not Assorted','2025-04-09 10:20:20','7','\0','77','1',1,111,1),(83,738,0,'Assorted','2025-04-09 11:06:20','8','\0','78','2',1,112,1),(83,739,1,'Assorted','2025-04-09 11:06:20','8','\0','78','2',1,112,1),(84,743,0,'Not Assorted','2025-04-09 11:53:31','0','\0','79','2',1,113,3),(85,747,0,'Assorted','2025-04-09 12:33:55','11','\0','2','2',1,114,1),(85,750,1,'Assorted','2025-04-09 12:33:55','11','\0','2','1',1,114,1),(86,748,0,'Not Assorted','2025-04-09 12:34:24','6','\0','80','1',8,115,1),(86,749,1,'Not Assorted','2025-04-09 12:34:24','6','\0','80','1',8,115,1),(87,753,0,'Not Assorted','2025-04-09 12:51:43','0','\0','81','2',1,116,3),(87,754,1,'Not Assorted','2025-04-09 12:51:43','0','\0','81','2',1,116,3),(87,757,1,'Not Assorted','2025-04-09 12:51:43','0','\0','81','2',1,116,3),(87,763,1,'Not Assorted','2025-04-09 12:51:43','0','\0','81','2',1,116,3),(88,759,0,'Not Assorted','2025-04-09 13:01:50','10','\0','80','1',1,117,1),(89,780,0,'Not Assorted','2025-04-09 13:58:01','10','\0','18','1',1,118,1),(89,781,1,'Not Assorted','2025-04-09 13:58:01','10','\0','18','1',1,118,1),(90,782,0,'Not Assorted','2025-04-09 14:05:06','10','\0','83','1',1,119,1),(90,783,1,'Not Assorted','2025-04-09 14:05:06','10','\0','83','1',1,119,1),(91,801,0,'Not Assorted','2025-04-09 15:28:35','11','\0','70','1',1,120,1),(91,802,1,'Not Assorted','2025-04-09 15:28:35','11','\0','70','1',1,120,1),(92,803,0,'Not Assorted','2025-04-09 15:34:26','11','\0','82','1',1,121,1),(93,804,0,'Not Assorted','2025-04-09 15:39:40','11','\0','63','1',1,122,1),(93,805,1,'Not Assorted','2025-04-09 15:39:40','11','\0','63','1',1,122,1),(94,806,0,'Not Assorted','2025-04-09 16:01:53','11','\0','70','1',1,123,1),(94,807,1,'Not Assorted','2025-04-09 16:01:53','11','\0','70','1',1,123,1),(95,811,0,'Not Assorted','2025-04-09 16:16:35','10','\0','88','1',1,124,1),(96,815,0,'Not Assorted','2025-04-09 16:28:33','10','\0','88','1',1,125,1),(97,816,0,'Not Assorted','2025-04-09 16:28:48','6','\0','32','2',1,126,1),(97,818,1,'Not Assorted','2025-04-09 16:28:48','6','\0','32','2',1,126,1),(98,817,0,'Not Assorted','2025-04-09 16:29:57','10','\0','88','1',1,127,1),(99,819,0,'Not Assorted','2025-04-09 16:35:53','6','\0','32','2',1,128,1),(99,820,1,'Not Assorted','2025-04-09 16:35:53','6','\0','32','2',1,128,1),(100,821,0,'Not Assorted','2025-04-09 16:41:41','6','\0','32','2',1,129,1),(100,822,1,'Not Assorted','2025-04-09 16:41:41','6','\0','32','2',1,129,1),(101,827,0,'Not Assorted','2025-04-09 16:53:29','3','\0','89','2',1,130,1),(101,828,1,'Not Assorted','2025-04-09 16:53:29','3','\0','89','2',1,130,1);
/*!40000 ALTER TABLE `arrival_note_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `berthing`
--

DROP TABLE IF EXISTS `berthing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `berthing` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ata` datetime NOT NULL,
  `berthing_side` varchar(255) NOT NULL,
  `bollard_or_vessel` varchar(80) NOT NULL,
  `description` varchar(80) NOT NULL,
  `etd` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `vessel_arr_draft` varchar(80) NOT NULL,
  `vessel_one` varchar(255) DEFAULT NULL,
  `vessel_or_bollard_ref_id` varchar(80) NOT NULL,
  `vessel_two` varchar(255) DEFAULT NULL,
  `vessel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfrolyah49fgxvnraj19madeu1` (`vessel_id`),
  CONSTRAINT `FKfrolyah49fgxvnraj19madeu1` FOREIGN KEY (`vessel_id`) REFERENCES `vessel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `berthing`
--

LOCK TABLES `berthing` WRITE;
/*!40000 ALTER TABLE `berthing` DISABLE KEYS */;
INSERT INTO `berthing` VALUES (1,'2025-04-01 09:00:00','Port','Bollard','OK','2025-04-02 09:00:00','\0','BUKAVU',NULL,'1 - 6',NULL,3),(2,'2025-04-02 09:00:00','Port','Vessel','ok','2025-04-02 10:00:00','\0','1','MV/ZAWADI YA MUNGU 2','3 - 3','MUNGUYIKO3',6),(3,'2025-04-02 10:00:00','Port','Vessel','OK','2025-04-02 11:00:00','\0','1','M.V TUWOMBE MUNGU 2','6 - 6','MV/ZAWADI YA MUNGU 2',4),(4,'2025-04-02 10:00:00','Port','Bollard','OK','2025-04-02 16:00:00','\0','1','MUNGUYIKO 1','7 - 12',NULL,1),(5,'2025-04-02 11:50:00','Port','Vessel','OK','2025-04-02 15:00:00','\0','1','M.V EDISSA','4 - 4','M.V TUWOMBE MUNGU 2',7),(6,'2025-04-09 00:00:00','Port','Bollard','OK','2025-04-02 15:47:00','\0','1','BARAKA','1 - 5',NULL,2),(7,'2025-04-03 11:00:00','Port','Vessel','ok','2025-04-03 12:00:00','\0','1','NIYOKWIZERWA','7 - 7','M.V EDISSA',9),(8,'2025-04-03 12:00:00','Port','Bollard','OK','2025-04-05 11:00:00','\0','1','EMS GENERAL','1 - 6',NULL,10),(9,'2025-04-06 12:00:00','Port','Bollard','ok','2025-04-06 11:00:00','\0','2','AMANI','1 - 6',NULL,5),(10,'2025-04-09 12:12:00','Port','Bollard','OK','2025-04-09 12:12:00','\0','congo','BARAKA','1 - 4',NULL,2);
/*!40000 ALTER TABLE `berthing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `berthing_aud`
--

DROP TABLE IF EXISTS `berthing_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `berthing_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `ata` datetime DEFAULT NULL,
  `berthing_side` varchar(255) DEFAULT NULL,
  `bollard_or_vessel` varchar(80) DEFAULT NULL,
  `description` varchar(80) DEFAULT NULL,
  `etd` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `vessel_arr_draft` varchar(80) DEFAULT NULL,
  `vessel_one` varchar(255) DEFAULT NULL,
  `vessel_or_bollard_ref_id` varchar(80) DEFAULT NULL,
  `vessel_two` varchar(255) DEFAULT NULL,
  `vessel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKsjkh9vvs91f3nmmw9tw63vtv5` (`rev`),
  CONSTRAINT `FKsjkh9vvs91f3nmmw9tw63vtv5` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `berthing_aud`
--

LOCK TABLES `berthing_aud` WRITE;
/*!40000 ALTER TABLE `berthing_aud` DISABLE KEYS */;
INSERT INTO `berthing_aud` VALUES (1,100,0,'2025-04-02 09:00:00','Port','Bollard','OK','2025-04-02 09:00:00','\0','BUKAVU','MUNGUYIKO3','1 - 6',NULL,3),(1,826,1,'2025-04-01 09:00:00','Port','Bollard','OK','2025-04-02 09:00:00','\0','BUKAVU',NULL,'1 - 6',NULL,3),(2,104,0,'2025-04-02 09:00:00','Port','Vessel','ok','2025-04-02 10:00:00','\0','1','MV/ZAWADI YA MUNGU 2','3 - 3','MUNGUYIKO3',6),(3,106,0,'2025-04-02 10:00:00','Port','Vessel','OK','2025-04-02 11:00:00','\0','1','M.V TUWOMBE MUNGU 2','6 - 6','MV/ZAWADI YA MUNGU 2',4),(4,108,0,'2025-04-02 10:00:00','Port','Bollard','OK','2025-04-02 16:00:00','\0','1','MUNGUYIKO 1','7 - 12',NULL,1),(5,151,0,'2025-04-02 11:50:00','Port','Vessel','OK','2025-04-02 15:00:00','\0','1','M.V EDISSA','4 - 4','M.V TUWOMBE MUNGU 2',7),(6,157,0,'2025-04-02 14:47:00','Port','Bollard','OK','2025-04-02 15:47:00','\0','1','BARAKA','1 - 5',NULL,2),(7,203,0,'2025-04-03 11:00:00','Port','Vessel','ok','2025-04-03 12:00:00','\0','1','NIYOKWIZERWA','7 - 7','M.V EDISSA',9),(8,389,0,'2025-04-05 12:00:00','Port','Bollard','OK','2025-04-05 11:00:00','\0','1','EMS GENERAL','1 - 6',NULL,10),(9,572,0,'2025-04-06 12:00:00','Port','Bollard','ok','2025-04-06 11:00:00','\0','2','AMANI','1 - 6',NULL,5),(10,772,0,'2025-04-09 12:12:00','Port','Bollard','OK','2025-04-09 12:12:00','\0','congo','BARAKA','1 - 4',NULL,2);
/*!40000 ALTER TABLE `berthing_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `berthpayment`
--

DROP TABLE IF EXISTS `berthpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `berthpayment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_time` varchar(80) NOT NULL,
  `description` varchar(500) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `payment` int(11) NOT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKerj0eo5rek32ffj3qrqd88a3a` (`invoice_id`),
  CONSTRAINT `FKerj0eo5rek32ffj3qrqd88a3a` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `berthpayment`
--

LOCK TABLES `berthpayment` WRITE;
/*!40000 ALTER TABLE `berthpayment` DISABLE KEYS */;
INSERT INTO `berthpayment` VALUES (1,'2025-04-04 12:14:02','OK','\0',210000,1),(2,'2025-04-09 14:24:00','OK','\0',210000,1);
/*!40000 ALTER TABLE `berthpayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `berthpayment_aud`
--

DROP TABLE IF EXISTS `berthpayment_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `berthpayment_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date_time` varchar(80) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `payment` int(11) DEFAULT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKgxk2l3upxj9yv8j4k9wp3dcac` (`rev`),
  CONSTRAINT `FKgxk2l3upxj9yv8j4k9wp3dcac` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `berthpayment_aud`
--

LOCK TABLES `berthpayment_aud` WRITE;
/*!40000 ALTER TABLE `berthpayment_aud` DISABLE KEYS */;
INSERT INTO `berthpayment_aud` VALUES (1,210,0,'2025-04-04 12:14:02','OK','\0',210000,1),(2,791,0,'2025-04-09 14:24:00','OK','\0',210000,1);
/*!40000 ALTER TABLE `berthpayment_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `berthing_side` varchar(255) NOT NULL,
  `bollard_or_vessel_number` varchar(80) NOT NULL,
  `bollard_or_vessel` varchar(255) NOT NULL,
  `contact_n` varchar(80) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `eta` varchar(255) NOT NULL,
  `etd` varchar(255) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `loading_port` varchar(80) NOT NULL,
  `reference_id` int(11) NOT NULL,
  `rura_auth_n` varchar(80) DEFAULT NULL,
  `status` varchar(80) NOT NULL,
  `vessel_one` varchar(255) DEFAULT NULL,
  `vessel_two` varchar(255) DEFAULT NULL,
  `vessel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKahembnnr0s68otsvyvpjgqeww` (`vessel_id`),
  CONSTRAINT `FKahembnnr0s68otsvyvpjgqeww` FOREIGN KEY (`vessel_id`) REFERENCES `vessel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,'Port','7 - 12','Bollard','','2025-04-01 17:11:05','ok','2025-04-01 14:00','2025-04-08 18:50','\0','congo',0,'','Pending','MUNGUYIKO 1',NULL,1),(2,'Port','1 - 6','Bollard','','2025-04-01 17:13:57','OK','2025-04-01 14:45','2025-04-01 15:00','\0','CONGO',0,'','Pending','MUNGUYIKO3',NULL,3),(3,'Port','4 - 6','vessel','','2025-04-02 10:04:58','OK','2025-04-02 09:00','2025-04-02 13:30','\0','BUKAVU',0,'','Pending','M.V TUWOMBE MUNGU 2',NULL,4),(4,'Port','6 - 3','vessel','','2025-04-02 10:16:59','OK','2025-04-02 09:30','2025-04-02 10:50','\0','CONGO',0,'','Pending','MV/ZAWADI YA MUNGU 2','MUNGUYIKO3',6),(5,'Port','7 - undefined','vessel','','2025-04-02 11:41:48','OK','2025-04-02 11:00','2025-04-02 14:15','\0','CONGO',0,'','Pending','M.V EDISSA',NULL,7),(6,'Port','8 - 1','vessel','','2025-04-02 14:34:40','OK','2025-04-02 11:30','2025-04-02 14:15','\0','CONGO',0,'','Pending','EMMANUEL 5','MUNGUYIKO 1',8),(7,'Port','2 - undefined','vessel','','2025-04-02 15:20:09','OK','2025-04-01 15:00','2025-04-02 11:00','\0','CONGO',0,'','Pending','BARAKA',NULL,2),(8,'Port','9 - undefined','vessel','','2025-04-03 11:41:50','OK','2025-04-02 17:00','2025-04-03 03:00','\0','RUBAVU',0,'','Pending','NIYOKWIZERWA',NULL,9),(9,'Port','1 - 6','Bollard','','2025-04-05 21:08:16','OK','2025-04-05 14:37','2025-04-05 16:00','\0','bukavu',0,'','Pending','EMS GENERAL',NULL,10),(10,'Port','1 - 4','Bollard','','2025-04-06 15:56:26','ok','2025-04-06 15:55','2025-04-06 18:55','\0','congo',0,'','Pending','AMANI',NULL,5),(11,'Port','2 - 7','Bollard','','2025-04-09 13:21:15','OK','2025-04-09 12:12','2025-04-09 12:12','\0','congo',0,'','Pending','BARAKA',NULL,2);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_aud`
--

DROP TABLE IF EXISTS `booking_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `berthing_side` varchar(255) DEFAULT NULL,
  `bollard_or_vessel_number` varchar(80) DEFAULT NULL,
  `bollard_or_vessel` varchar(255) DEFAULT NULL,
  `contact_n` varchar(80) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `eta` varchar(255) DEFAULT NULL,
  `etd` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `loading_port` varchar(80) DEFAULT NULL,
  `reference_id` int(11) DEFAULT NULL,
  `rura_auth_n` varchar(80) DEFAULT NULL,
  `status` varchar(80) DEFAULT NULL,
  `vessel_one` varchar(255) DEFAULT NULL,
  `vessel_two` varchar(255) DEFAULT NULL,
  `vessel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKfkrhcpdp5wt7r8wx7hlkthbno` (`rev`),
  CONSTRAINT `FKfkrhcpdp5wt7r8wx7hlkthbno` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_aud`
--

LOCK TABLES `booking_aud` WRITE;
/*!40000 ALTER TABLE `booking_aud` DISABLE KEYS */;
INSERT INTO `booking_aud` VALUES (1,94,0,'Port','7 - 12','Bollard','','2025-04-01 17:11:05','ok','2025-04-01 14:00','2025-04-08 18:50','\0','congo',0,'','Pending','MUNGUYIKO 1',NULL,1),(2,96,0,'Port','1 - 6','Bollard','','2025-04-01 17:13:57','OK','2025-04-01 14:45','2025-04-01 15:00','\0','CONGO',0,'','Pending','MUNGUYIKO3',NULL,3),(3,98,0,'Port','4 - 6','vessel','','2025-04-02 10:04:58','OK','2025-04-02 09:00','2025-04-02 13:30','\0','BUKAVU',0,'','Pending','M.V TUWOMBE MUNGU 2',NULL,4),(4,102,0,'Port','6 - 3','vessel','','2025-04-02 10:16:59','OK','2025-04-02 09:30','2025-04-02 10:50','\0','CONGO',0,'','Pending','MV/ZAWADI YA MUNGU 2','MUNGUYIKO3',6),(5,113,0,'Port','7 - undefined','vessel','','2025-04-02 11:41:48','OK','2025-04-02 11:00','2025-04-02 14:15','\0','CONGO',0,'','Pending','M.V EDISSA',NULL,7),(6,140,0,'Port','8 - 1','vessel','','2025-04-02 14:34:40','OK','2025-04-02 11:30','2025-04-02 14:15','\0','CONGO',0,'','Pending','EMMANUEL 5','MUNGUYIKO 1',8),(7,146,0,'Port','2 - undefined','vessel','','2025-04-02 15:20:09','OK','2025-04-01 15:00','2025-04-02 11:00','\0','CONGO',0,'','Pending','BARAKA',NULL,2),(8,201,0,'Port','9 - undefined','vessel','','2025-04-03 11:41:50','OK','2025-04-02 17:00','2025-04-03 03:00','\0','RUBAVU',0,'','Pending','NIYOKWIZERWA',NULL,9),(9,387,0,'Port','1 - 6','Bollard','','2025-04-05 21:08:16','OK','2025-04-05 14:37','2025-04-05 16:00','\0','bukavu',0,'','Pending','EMS GENERAL',NULL,10),(10,570,0,'Port','1 - 4','Bollard','','2025-04-06 15:56:26','ok','2025-04-06 15:55','2025-04-06 18:55','\0','congo',0,'','Pending','AMANI',NULL,5),(11,769,0,'Port','2 - 7','Bollard','','2025-04-09 13:21:15','OK','2025-04-09 12:12','2025-04-09 12:12','\0','congo',0,'','Pending','BARAKA',NULL,2);
/*!40000 ALTER TABLE `booking_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) DEFAULT NULL,
  `tin_number` varchar(255) DEFAULT NULL,
  `profile` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK71behsv2t6q055s841fn96c8n` (`profile`),
  CONSTRAINT `FK71behsv2t6q055s841fn96c8n` FOREIGN KEY (`profile`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'\0','111lala',7),(2,'\0','111la2a',8),(3,'\0','111la3a',9),(4,'\0','111la4a',10),(8,'\0','111704213',38),(12,'\0','107787502',48),(13,'\0','107787502',50),(14,'\0','108618316',60),(15,'\0','111lala',69),(16,'\0','111la2a',70),(17,'\0','111la3a',71),(18,'\0','111la4a',72),(19,'\0','108618316',106),(20,'\0','108618316',108),(21,'\0','119808006577012',110),(22,'\0','1199180195576111',112),(23,'\0','1198870210290001',114),(24,'\0','111460027',116),(25,'\0','131614748',118),(26,'\0','108618316',120),(27,'\0','108618316',122),(28,'\0','108618316',124),(29,'\0','108618316',126),(30,'\0','131614748',128),(31,'\0','107308259',130),(32,'\0','107308259',132),(33,'\0','1111111111111',146),(34,'\0','1111111111111',148),(35,'\0','1111111111111',150),(36,'\0','1111111111111',152),(37,'\0','1111111111111',154),(38,'\0','1111111111111',156),(39,'\0','1111111111111',158),(40,'\0','1111111111111',160),(41,'\0','1111111111111',162),(42,'\0','1111111111111',164),(43,'\0','1111111111111',166),(44,'\0','1111111111111',168),(45,'\0','1111111111111',170),(46,'\0','1111111111111',172),(47,'\0','1111111111111',174),(48,'\0','100097994',176),(49,'\0','100097994',178),(50,'\0','100097994',180),(51,'\0','107308259',182),(52,'\0','107308259',184),(53,'\0','100097994',186),(54,'\0','107308259',188),(55,'\0','123284855',190),(56,'\0','102147925',192),(57,'\0','108618316',204),(58,'\0','108618316',206),(59,'\0','108618316',208),(60,'\0','131614748',210),(61,'\0','131614748',212),(62,'\0','131614748',214),(63,'\0','108618316',216),(64,'\0','108618316',218),(65,'\0','108618316',220),(66,'\0','222222222222',222),(67,'\0','222222222222',224),(68,'\0','222222222222',226),(69,'\0','078834265',228),(70,'\0','1111111111111',230),(71,'\0','120291371',232),(72,'\0','131283862',234),(73,'\0','131614748',236),(74,'\0','1111111111111111',238),(75,'\0','107308259',240),(76,'\0','107308259',242),(77,'\0','122672950',244),(78,'\0','118615744',254),(79,'\0','118615744',256),(80,'\0','118615744',258),(81,'\0','131614748',260),(82,'\0','108618316',262),(83,'\0','102796383',264),(84,'\0','121472256',266),(85,'\0','107308259',269),(86,'\0','2786278',271),(87,'\0','2786278',275),(95,'\0','102147925',290),(97,'\0','102147925',291),(98,'\0','102168203',292),(99,'\0','107308259',297),(104,'\0','128097382',311),(107,'\0','112930886',320),(109,'\0','1207911371',325),(110,'\0','121405178',330),(111,'\0','131614748',334),(112,'\0','102189722',337),(113,'\0','102168203',339),(114,'\0','131614748',342),(115,'\0','118868345',344),(116,'\0','102168203',346),(117,'\0','118868345',349),(118,'\0','111111111111111111',354),(119,'\0','120291371',356),(120,'\0','131614748',361),(121,'\0','131614748',363),(122,'\0','131614748',365),(123,'\0','131614748',367),(124,'\0','119439139',370),(125,'\0','119439139',373),(126,'\0','123284855',375),(127,'\0','119439139',377),(128,'\0','109100691',379),(129,'\0','100097994',381),(130,'\0','107308259',384);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_aud`
--

DROP TABLE IF EXISTS `client_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `tin_number` varchar(255) DEFAULT NULL,
  `profile` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKq7rlntwn6l0k20fxnu2ro82h6` (`rev`),
  CONSTRAINT `FKq7rlntwn6l0k20fxnu2ro82h6` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_aud`
--

LOCK TABLES `client_aud` WRITE;
/*!40000 ALTER TABLE `client_aud` DISABLE KEYS */;
INSERT INTO `client_aud` VALUES (1,50,0,'\0','111lala',7),(2,51,0,'\0','111la2a',8),(3,52,0,'\0','111la3a',9),(4,53,0,'\0','111la4a',10),(8,152,0,'\0','111704213',38),(12,162,0,'\0','107787502',48),(13,163,0,'\0','107787502',50),(14,190,0,'\0','108618316',60),(15,230,0,'\0','111lala',69),(16,231,0,'\0','111la2a',70),(17,232,0,'\0','111la3a',71),(18,233,0,'\0','111la4a',72),(19,352,0,'\0','108618316',106),(20,354,0,'\0','108618316',108),(21,356,0,'\0','119808006577012',110),(22,358,0,'\0','1199180195576111',112),(23,360,0,'\0','1198870210290001',114),(24,362,0,'\0','111460027',116),(25,364,0,'\0','131614748',118),(26,366,0,'\0','108618316',120),(27,368,0,'\0','108618316',122),(28,370,0,'\0','108618316',124),(29,372,0,'\0','108618316',126),(30,374,0,'\0','131614748',128),(31,376,0,'\0','107308259',130),(32,378,0,'\0','107308259',132),(33,445,0,'\0','1111111111111',146),(34,447,0,'\0','1111111111111',148),(35,449,0,'\0','1111111111111',150),(36,451,0,'\0','1111111111111',152),(37,453,0,'\0','1111111111111',154),(38,455,0,'\0','1111111111111',156),(39,457,0,'\0','1111111111111',158),(40,459,0,'\0','1111111111111',160),(41,461,0,'\0','1111111111111',162),(42,463,0,'\0','1111111111111',164),(43,465,0,'\0','1111111111111',166),(44,467,0,'\0','1111111111111',168),(45,469,0,'\0','1111111111111',170),(46,471,0,'\0','1111111111111',172),(47,473,0,'\0','1111111111111',174),(48,475,0,'\0','100097994',176),(49,477,0,'\0','100097994',178),(50,479,0,'\0','100097994',180),(51,481,0,'\0','107308259',182),(52,483,0,'\0','107308259',184),(53,485,0,'\0','100097994',186),(54,487,0,'\0','107308259',188),(55,489,0,'\0','123284855',190),(56,492,0,'\0','102147925',192),(57,539,0,'\0','108618316',204),(58,541,0,'\0','108618316',206),(59,543,0,'\0','108618316',208),(60,545,0,'\0','131614748',210),(61,547,0,'\0','131614748',212),(62,549,0,'\0','131614748',214),(63,551,0,'\0','108618316',216),(64,553,0,'\0','108618316',218),(65,555,0,'\0','108618316',220),(66,557,0,'\0','222222222222',222),(67,559,0,'\0','222222222222',224),(68,561,0,'\0','222222222222',226),(69,563,0,'\0','078834265',228),(70,565,0,'\0','1111111111111',230),(71,567,0,'\0','120291371',232),(72,574,0,'\0','131283862',234),(73,576,0,'\0','131614748',236),(74,578,0,'\0','1111111111111111',238),(75,580,0,'\0','107308259',240),(76,581,0,'\0','107308259',242),(77,583,0,'\0','122672950',244),(78,626,0,'\0','118615744',254),(79,628,0,'\0','118615744',256),(80,630,0,'\0','118615744',258),(81,632,0,'\0','131614748',260),(82,634,0,'\0','108618316',262),(83,635,0,'\0','102796383',264),(84,637,0,'\0','121472256',266),(85,644,0,'\0','107308259',269),(86,649,0,'\0','2786278',271),(87,655,0,'\0','2786278',275),(95,671,0,'\0','102147925',288),(97,672,0,'\0','102147925',291),(98,673,0,'\0','102168203',292),(99,684,0,'\0','107308259',297),(104,698,0,'\0','128097382',311),(107,709,0,'\0','112930886',320),(109,714,0,'\0','1207911371',325),(110,725,0,'\0','121405178',330),(111,733,0,'\0','131614748',334),(112,738,0,'\0','102189722',337),(113,743,0,'\0','102168203',339),(114,747,0,'\0','131614748',342),(115,748,0,'\0','118868345',344),(116,753,0,'\0','102168203',346),(117,759,0,'\0','118868345',349),(118,780,0,'\0','111111111111111111',354),(119,782,0,'\0','120291371',356),(120,801,0,'\0','131614748',361),(121,803,0,'\0','131614748',363),(122,804,0,'\0','131614748',365),(123,806,0,'\0','131614748',367),(124,811,0,'\0','119439139',370),(125,815,0,'\0','119439139',373),(126,816,0,'\0','123284855',375),(127,817,0,'\0','119439139',377),(128,819,0,'\0','109100691',379),(129,821,0,'\0','100097994',381),(130,827,0,'\0','107308259',384);
/*!40000 ALTER TABLE `client_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cost_journal`
--

DROP TABLE IF EXISTS `cost_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cost_journal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `current_cost` double NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `previous_cost` double NOT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK24sq3tepehh9xt7nnf8o09fui` (`items_id`),
  CONSTRAINT `FK24sq3tepehh9xt7nnf8o09fui` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost_journal`
--

LOCK TABLES `cost_journal` WRITE;
/*!40000 ALTER TABLE `cost_journal` DISABLE KEYS */;
/*!40000 ALTER TABLE `cost_journal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cost_journal_aud`
--

DROP TABLE IF EXISTS `cost_journal_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cost_journal_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `current_cost` double DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `previous_cost` double DEFAULT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKhn0invy5p8ytj2mftacnu3ykp` (`rev`),
  CONSTRAINT `FKhn0invy5p8ytj2mftacnu3ykp` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost_journal_aud`
--

LOCK TABLES `cost_journal_aud` WRITE;
/*!40000 ALTER TABLE `cost_journal_aud` DISABLE KEYS */;
/*!40000 ALTER TABLE `cost_journal_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dailyreport`
--

DROP TABLE IF EXISTS `dailyreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `dailyreport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currpurchase_uc` int(11) NOT NULL,
  `date_time` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `opening_stock` int(11) NOT NULL,
  `payt_meth` varchar(80) NOT NULL,
  `purchased_qty` int(11) NOT NULL,
  `reference_desc` varchar(80) NOT NULL,
  `reference_id` int(11) NOT NULL,
  `sold_qty` int(11) NOT NULL,
  `sold_unit_cost` int(11) NOT NULL,
  `item_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd98ad3va04lrrhmy87ad8je0g` (`item_id`),
  CONSTRAINT `FKd98ad3va04lrrhmy87ad8je0g` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dailyreport`
--

LOCK TABLES `dailyreport` WRITE;
/*!40000 ALTER TABLE `dailyreport` DISABLE KEYS */;
INSERT INTO `dailyreport` VALUES (1,0,'2025-04-08 09:33:40','\0',0,'MoMo',540,'purchase',1,0,0,34),(2,0,'2025-04-08 10:10:51','\0',0,'MoMo',1,'purchase',2,0,0,35),(3,0,'2025-04-08 12:35:54','\0',0,'MoMo',2,'purchase',4,0,0,36),(4,0,'2025-04-08 12:40:31','\0',0,'MoMo',1,'purchase',5,0,0,37),(5,0,'2025-04-09 11:53:31','\0',540,'MoMo',1,'purchase',6,0,0,34),(6,0,'2025-04-09 12:51:43','\0',0,'MoMo',1,'purchase',7,0,0,38);
/*!40000 ALTER TABLE `dailyreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destination`
--

DROP TABLE IF EXISTS `destination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `destination` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category` varchar(80) NOT NULL,
  `date_time` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_kw349sqcyo1k39xa0wn3k3q2r` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destination`
--

LOCK TABLES `destination` WRITE;
/*!40000 ALTER TABLE `destination` DISABLE KEYS */;
INSERT INTO `destination` VALUES (1,'Truck',NULL,'\0','Truck Vessel'),(2,'Truck',NULL,'\0','Truck Truck'),(3,'Truck',NULL,'\0','Truck Warehouse'),(4,'Vessel',NULL,'\0','Vessel Vessel'),(5,'Vessel',NULL,'\0','Vessel Truck'),(6,'Vessel',NULL,'\0','Vessel Warehouse'),(7,'Warehouse',NULL,'\0','Warehouse Truck'),(8,'Warehouse',NULL,'\0','Warehouse Vessel');
/*!40000 ALTER TABLE `destination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destination_aud`
--

DROP TABLE IF EXISTS `destination_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `destination_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `category` varchar(80) DEFAULT NULL,
  `date_time` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKkh4dnvm9c879yvfgwmtyhuki7` (`rev`),
  CONSTRAINT `FKkh4dnvm9c879yvfgwmtyhuki7` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destination_aud`
--

LOCK TABLES `destination_aud` WRITE;
/*!40000 ALTER TABLE `destination_aud` DISABLE KEYS */;
INSERT INTO `destination_aud` VALUES (1,33,0,'Truck',NULL,'\0','Truck Vessel'),(1,152,1,'Truck',NULL,'\0','Truck Vessel'),(1,162,1,'Truck',NULL,'\0','Truck Vessel'),(1,163,1,'Truck',NULL,'\0','Truck Vessel'),(1,352,1,'Truck',NULL,'\0','Truck Vessel'),(1,354,1,'Truck',NULL,'\0','Truck Vessel'),(1,356,1,'Truck',NULL,'\0','Truck Vessel'),(1,358,1,'Truck',NULL,'\0','Truck Vessel'),(1,360,1,'Truck',NULL,'\0','Truck Vessel'),(1,362,1,'Truck',NULL,'\0','Truck Vessel'),(1,364,1,'Truck',NULL,'\0','Truck Vessel'),(1,366,1,'Truck',NULL,'\0','Truck Vessel'),(1,368,1,'Truck',NULL,'\0','Truck Vessel'),(1,370,1,'Truck',NULL,'\0','Truck Vessel'),(1,372,1,'Truck',NULL,'\0','Truck Vessel'),(1,374,1,'Truck',NULL,'\0','Truck Vessel'),(1,376,1,'Truck',NULL,'\0','Truck Vessel'),(1,378,1,'Truck',NULL,'\0','Truck Vessel'),(1,455,1,'Truck',NULL,'\0','Truck Vessel'),(1,457,1,'Truck',NULL,'\0','Truck Vessel'),(1,459,1,'Truck',NULL,'\0','Truck Vessel'),(1,461,1,'Truck',NULL,'\0','Truck Vessel'),(1,463,1,'Truck',NULL,'\0','Truck Vessel'),(1,465,1,'Truck',NULL,'\0','Truck Vessel'),(1,467,1,'Truck',NULL,'\0','Truck Vessel'),(1,469,1,'Truck',NULL,'\0','Truck Vessel'),(1,471,1,'Truck',NULL,'\0','Truck Vessel'),(1,473,1,'Truck',NULL,'\0','Truck Vessel'),(1,492,1,'Truck',NULL,'\0','Truck Vessel'),(1,539,1,'Truck',NULL,'\0','Truck Vessel'),(1,541,1,'Truck',NULL,'\0','Truck Vessel'),(1,543,1,'Truck',NULL,'\0','Truck Vessel'),(1,545,1,'Truck',NULL,'\0','Truck Vessel'),(1,547,1,'Truck',NULL,'\0','Truck Vessel'),(1,549,1,'Truck',NULL,'\0','Truck Vessel'),(1,551,1,'Truck',NULL,'\0','Truck Vessel'),(1,553,1,'Truck',NULL,'\0','Truck Vessel'),(1,555,1,'Truck',NULL,'\0','Truck Vessel'),(1,557,1,'Truck',NULL,'\0','Truck Vessel'),(1,559,1,'Truck',NULL,'\0','Truck Vessel'),(1,561,1,'Truck',NULL,'\0','Truck Vessel'),(1,563,1,'Truck',NULL,'\0','Truck Vessel'),(1,565,1,'Truck',NULL,'\0','Truck Vessel'),(1,567,1,'Truck',NULL,'\0','Truck Vessel'),(1,574,1,'Truck',NULL,'\0','Truck Vessel'),(1,576,1,'Truck',NULL,'\0','Truck Vessel'),(1,578,1,'Truck',NULL,'\0','Truck Vessel'),(1,580,1,'Truck',NULL,'\0','Truck Vessel'),(1,581,1,'Truck',NULL,'\0','Truck Vessel'),(1,583,1,'Truck',NULL,'\0','Truck Vessel'),(1,626,1,'Truck',NULL,'\0','Truck Vessel'),(1,628,1,'Truck',NULL,'\0','Truck Vessel'),(1,630,1,'Truck',NULL,'\0','Truck Vessel'),(1,632,1,'Truck',NULL,'\0','Truck Vessel'),(1,634,1,'Truck',NULL,'\0','Truck Vessel'),(1,635,1,'Truck',NULL,'\0','Truck Vessel'),(1,655,1,'Truck',NULL,'\0','Truck Vessel'),(1,684,1,'Truck',NULL,'\0','Truck Vessel'),(1,698,1,'Truck',NULL,'\0','Truck Vessel'),(1,709,1,'Truck',NULL,'\0','Truck Vessel'),(1,714,1,'Truck',NULL,'\0','Truck Vessel'),(1,725,1,'Truck',NULL,'\0','Truck Vessel'),(1,733,1,'Truck',NULL,'\0','Truck Vessel'),(1,738,1,'Truck',NULL,'\0','Truck Vessel'),(1,747,1,'Truck',NULL,'\0','Truck Vessel'),(1,748,1,'Truck',NULL,'\0','Truck Vessel'),(1,759,1,'Truck',NULL,'\0','Truck Vessel'),(1,780,1,'Truck',NULL,'\0','Truck Vessel'),(1,782,1,'Truck',NULL,'\0','Truck Vessel'),(1,801,1,'Truck',NULL,'\0','Truck Vessel'),(1,803,1,'Truck',NULL,'\0','Truck Vessel'),(1,804,1,'Truck',NULL,'\0','Truck Vessel'),(1,806,1,'Truck',NULL,'\0','Truck Vessel'),(1,811,1,'Truck',NULL,'\0','Truck Vessel'),(1,815,1,'Truck',NULL,'\0','Truck Vessel'),(1,816,1,'Truck',NULL,'\0','Truck Vessel'),(1,817,1,'Truck',NULL,'\0','Truck Vessel'),(1,819,1,'Truck',NULL,'\0','Truck Vessel'),(1,821,1,'Truck',NULL,'\0','Truck Vessel'),(1,827,1,'Truck',NULL,'\0','Truck Vessel'),(2,34,0,'Truck',NULL,'\0','Truck Truck'),(3,35,0,'Truck',NULL,'\0','Truck Warehouse'),(3,644,1,'Truck',NULL,'\0','Truck Warehouse'),(3,671,1,'Truck',NULL,'\0','Truck Warehouse'),(3,672,1,'Truck',NULL,'\0','Truck Warehouse'),(3,673,1,'Truck',NULL,'\0','Truck Warehouse'),(3,743,1,'Truck',NULL,'\0','Truck Warehouse'),(3,753,1,'Truck',NULL,'\0','Truck Warehouse'),(4,36,0,'Vessel',NULL,'\0','Vessel Vessel'),(4,445,1,'Vessel',NULL,'\0','Vessel Vessel'),(4,447,1,'Vessel',NULL,'\0','Vessel Vessel'),(4,449,1,'Vessel',NULL,'\0','Vessel Vessel'),(5,37,0,'Vessel',NULL,'\0','Vessel Truck'),(5,190,1,'Vessel',NULL,'\0','Vessel Truck'),(5,451,1,'Vessel',NULL,'\0','Vessel Truck'),(5,453,1,'Vessel',NULL,'\0','Vessel Truck'),(5,475,1,'Vessel',NULL,'\0','Vessel Truck'),(5,477,1,'Vessel',NULL,'\0','Vessel Truck'),(5,479,1,'Vessel',NULL,'\0','Vessel Truck'),(5,481,1,'Vessel',NULL,'\0','Vessel Truck'),(5,483,1,'Vessel',NULL,'\0','Vessel Truck'),(5,485,1,'Vessel',NULL,'\0','Vessel Truck'),(5,487,1,'Vessel',NULL,'\0','Vessel Truck'),(5,489,1,'Vessel',NULL,'\0','Vessel Truck'),(5,637,1,'Vessel',NULL,'\0','Vessel Truck'),(6,38,0,'Vessel',NULL,'\0','Vessel Warehouse'),(6,649,1,'Vessel',NULL,'\0','Vessel Warehouse'),(7,39,0,'Warehouse',NULL,'\0','Warehouse Truck'),(8,40,0,'Warehouse',NULL,'\0','Warehouse Vessel');
/*!40000 ALTER TABLE `destination_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exits`
--

DROP TABLE IF EXISTS `exits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `exits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `arrival_id` int(11) NOT NULL,
  `date_time` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exits`
--

LOCK TABLES `exits` WRITE;
/*!40000 ALTER TABLE `exits` DISABLE KEYS */;
/*!40000 ALTER TABLE `exits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exits_aud`
--

DROP TABLE IF EXISTS `exits_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `exits_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `arrival_id` int(11) DEFAULT NULL,
  `date_time` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKt4qel6bmcd4n5h10lxcloj9wb` (`rev`),
  CONSTRAINT `FKt4qel6bmcd4n5h10lxcloj9wb` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exits_aud`
--

LOCK TABLES `exits_aud` WRITE;
/*!40000 ALTER TABLE `exits_aud` DISABLE KEYS */;
/*!40000 ALTER TABLE `exits_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` varchar(80) NOT NULL,
  `description` varchar(80) NOT NULL,
  `done_by` int(11) NOT NULL,
  `exp_amount` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnhppj0jrix0f05oxl5rvknido` (`account_id`),
  CONSTRAINT `FKnhppj0jrix0f05oxl5rvknido` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses_aud`
--

DROP TABLE IF EXISTS `expenses_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date_time` varchar(80) DEFAULT NULL,
  `description` varchar(80) DEFAULT NULL,
  `done_by` int(11) DEFAULT NULL,
  `exp_amount` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKe1hn6ihvocos2nteballpv3se` (`rev`),
  CONSTRAINT `FKe1hn6ihvocos2nteballpv3se` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses_aud`
--

LOCK TABLES `expenses_aud` WRITE;
/*!40000 ALTER TABLE `expenses_aud` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenses_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_exit`
--

DROP TABLE IF EXISTS `gen_exit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gen_exit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `receipt_id` int(11) NOT NULL,
  `gen_receipt_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4msv8vh2vwwc5p2m3ebb2nm3e` (`gen_receipt_id`),
  CONSTRAINT `FK4msv8vh2vwwc5p2m3ebb2nm3e` FOREIGN KEY (`gen_receipt_id`) REFERENCES `gen_receipt` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_exit`
--

LOCK TABLES `gen_exit` WRITE;
/*!40000 ALTER TABLE `gen_exit` DISABLE KEYS */;
INSERT INTO `gen_exit` VALUES (1,'2025-04-01 15:18:42','\0',1,1);
/*!40000 ALTER TABLE `gen_exit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_exit_aud`
--

DROP TABLE IF EXISTS `gen_exit_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gen_exit_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date_time` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `receipt_id` int(11) DEFAULT NULL,
  `gen_receipt_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKfer4yibbl9cyju1ux6iyqxq5s` (`rev`),
  CONSTRAINT `FKfer4yibbl9cyju1ux6iyqxq5s` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_exit_aud`
--

LOCK TABLES `gen_exit_aud` WRITE;
/*!40000 ALTER TABLE `gen_exit_aud` DISABLE KEYS */;
INSERT INTO `gen_exit_aud` VALUES (1,213,0,'2025-04-04 15:18:42','\0',1,1);
/*!40000 ALTER TABLE `gen_exit_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_invoice`
--

DROP TABLE IF EXISTS `gen_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gen_invoice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `date_time` datetime NOT NULL,
  `description` varchar(400) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `ref_id` bigint(20) NOT NULL,
  `total_amount` double NOT NULL,
  `total_weight` double NOT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl97wedarbjbwljbk1eex8ap7x` (`arrival_id`),
  CONSTRAINT `FKl97wedarbjbwljbk1eex8ap7x` FOREIGN KEY (`arrival_id`) REFERENCES `arrival_note` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_invoice`
--

LOCK TABLES `gen_invoice` WRITE;
/*!40000 ALTER TABLE `gen_invoice` DISABLE KEYS */;
INSERT INTO `gen_invoice` VALUES (1,20000,'2025-04-01 15:03:12','OK','\0',0,20000,10000,1),(2,70000,'2025-04-02 17:04:14','OK','\0',0,70000,35000,2),(3,14000,'2025-04-03 16:30:40','OK','\0',0,14000,35000,5),(4,14000,'2025-04-03 16:32:15','OK','\0',0,14000,35000,6),(5,2000,'2025-04-03 16:34:37','OK','\0',0,2000,5000,7),(6,4275,'2025-04-03 16:36:42','OK RRA, 66306757','\0',0,4275.2,10688,8),(7,3296,'2025-04-03 16:38:59','OK RAA, 66306591','\0',0,3296,8240,9),(8,14000,'2025-04-03 16:42:47','OK RRA, 66306607','\0',0,14000,35000,10),(9,14000,'2025-04-03 16:44:19','OK RRA, 66307027','\0',0,14000,35000,11),(10,14000,'2025-04-03 16:45:45','OK RRA, 66306599','\0',0,14000,35000,12),(11,14000,'2025-04-03 16:46:41','OK RRA, 66306550','\0',0,14000,35000,13),(12,14000,'2025-04-03 16:47:47','OK RRA, 66306611','\0',0,14000,35000,14),(13,14000,'2025-04-03 16:52:29','OK','\0',0,14000,35000,11),(14,14000,'2025-04-03 16:55:53','OK RRA, 66307024','\0',0,14000,35000,16),(15,54000,'2025-04-03 16:59:17','OK RRA, 66307058','\0',0,54000,27000,17),(16,53680,'2025-04-03 17:06:35','OK, RRA, 66307073','\0',0,53680,26840,18),(17,1720,'2025-04-04 11:40:01','OKM RRA, 66308461','\0',0,1720,4300,19),(18,1600,'2025-04-04 11:44:39','OK, RRA, 66308424','\0',0,1600,4000,20),(19,14000,'2025-04-04 11:46:56','OK, CARGO NOT KNOW, RRA 66308400','\0',0,14000,35000,21),(20,13980,'2025-04-04 11:50:10','OK, RRA 66308085','\0',0,13980,34950,22),(21,1400,'2025-04-04 11:52:51','OK, RRA 66308008','\0',0,1400,3500,23),(22,14000,'2025-04-04 11:54:17','RRA, 66307487','\0',0,14000,35000,24),(23,14000,'2025-04-04 11:55:22','RRA 66307517','\0',0,14000,35000,25),(24,12000,'2025-04-04 11:56:41','RRA 66307591','\0',0,12000,30000,26),(25,14000,'2025-04-04 11:57:49','RRA 66307752','\0',0,14000,35000,27),(26,14000,'2025-04-04 11:58:41','RRA 66308261','\0',0,14000,35000,28),(27,9600,'2025-04-04 11:59:38','RAR 66308375','\0',0,9600,24000,29),(28,12000,'2025-04-04 12:01:33','RRA 66307567','\0',0,12000,30000,30),(29,14000,'2025-04-04 12:02:53','RRA 66307623','\0',0,14000,35000,31),(30,54000,'2025-04-04 12:25:08','OK, RRA 66307906','\0',0,54000,27000,32),(31,270000,'2025-04-04 12:26:27','OK RRA 66307917','\0',0,270000,135000,33),(32,54000,'2025-04-04 12:28:50','OK RRA 66308143','\0',0,54000,27000,34),(33,60000,'2025-04-04 12:30:18','OK RRA 66308294','\0',0,60000,30000,35),(34,54000,'2025-04-04 12:31:26','OK RRA 66308313','\0',0,54000,27000,36),(35,54000,'2025-04-04 12:32:28','OK RRA 66308339','\0',0,54000,27000,37),(36,52000,'2025-04-04 12:33:24','OK RRA 66308346','\0',0,52000,26000,38),(37,54000,'2025-04-04 12:35:06','OK RRA 66308425','\0',0,54000,27000,39),(38,53680,'2025-04-04 12:36:30','OK RRA 66307073','\0',0,53680,26840,40),(39,50000,'2025-04-04 12:37:32','OK','\0',0,50000,25000,41),(40,70000,'2025-04-04 13:21:19','OK RRA 66308230','\0',0,70000,35000,42),(41,14000,'2025-04-05 15:16:52','OK, RRA, 66308780','\0',0,14000,35000,43),(42,30000,'2025-04-05 15:18:10','RRA, 66308915','\0',0,30000,75000,44),(43,720,'2025-04-05 15:26:49','RRA, 66309004','\0',0,720,1800,45),(44,14000,'2025-04-05 15:27:57','RRA66309051','\0',0,14000,35000,46),(45,14000,'2025-04-05 15:29:04','RRA66309085','\0',0,14000,35000,47),(46,12000,'2025-04-05 15:30:49','RRA 66309101','\0',0,12000,30000,48),(47,14000,'2025-04-05 15:33:10','RRA 66309119','\0',0,14000,35000,49),(48,14000,'2025-04-05 15:34:06','RRA 66309130','\0',0,14000,35000,50),(49,14000,'2025-04-05 15:34:40','RRA 66309134','\0',0,14000,35000,51),(50,4354,'2025-04-05 15:36:07','RRA 66309213','\0',0,4354.8,10887,52),(51,14000,'2025-04-05 15:41:07','OK','\0',0,14000,35000,53),(52,308000,'2025-04-05 15:42:17','RRA 66309079','\0',0,308000,770000,54),(53,12000,'2025-04-05 15:43:35','RRA 66309079','\0',0,12000,30000,55),(54,4000,'2025-04-05 15:44:33','RRA 66309129','\0',0,4000,10000,56),(55,720,'2025-04-05 15:45:38','RRA 66308938','\0',0,720,1800,57),(56,62000,'2025-04-05 16:10:20','RRA66308976','\0',0,62000,31000,58),(57,14000,'2025-04-05 16:11:43','RRA 66309051','\0',0,14000,7000,59),(58,7488,'2025-04-05 16:14:58','RRA 66309061','\0',0,7488,3744,60),(59,53500,'2025-04-05 16:18:43','OK','\0',0,53500,26750,62),(60,56200,'2025-04-05 16:20:32','RRA 66309337','\0',0,56200,28100,63),(61,14000,'2025-04-06 20:54:07','RRA 66309893','\0',0,14000,35000,64),(62,14000,'2025-04-06 20:55:02','RRA66309554','\0',0,14000,35000,65),(63,14000,'2025-04-06 20:59:54','RRA 66309554','\0',0,14000,35000,66),(64,2000,'2025-04-06 21:07:09','rra 66309074','\0',0,2000,5000,67),(65,16000,'2025-04-06 21:09:27','RRA66309663','\0',0,16000,40000,69),(66,64000,'2025-04-06 21:14:25','RRA 66309732','\0',0,64000,32000,69),(67,54000,'2025-04-08 09:44:54','OK','\0',0,54000,27000,71),(68,51510,'2025-04-08 13:38:52','RRA','\0',0,51510,25755,77),(69,16000,'2025-04-08 15:51:23','OK','\0',0,16000,40000,78),(70,80,'2025-04-08 16:29:58','OK','\0',0,80,40,79),(71,200,'2025-04-08 17:13:06','OK','\0',0,200,500,80),(72,4000,'2025-04-09 10:00:33','OK','\0',0,4000,10000,81),(73,10000,'2025-04-09 10:24:47','THIS IS FOR 5TRUCK DAIAHTSU EACH TRUCK IS 100BGS = TO 5 ROUNDS','\0',0,10000,25000,82),(74,56260,'2025-04-09 11:10:32','TOSS BLUE-TOWER BLUE AND COOL BABY','\0',0,56260,28130,83),(75,16000,'2025-04-09 11:37:38','RRA REF 66312053,REF 66312063,REF 66312072','\0',0,16000,40000,86),(76,14000,'2025-04-09 12:38:54','OK','\0',0,14000,35000,85),(77,14607,'2025-04-09 12:52:15','OK','\0',0,14607.2,36518,87),(78,14607,'2025-04-09 12:53:43','OK','\0',0,14607.2,36518,87),(79,14607,'2025-04-09 13:09:04','OK','\0',0,14607.2,36518,87),(80,100,'2025-04-09 13:58:33','TUBES TO WOODEN BOAT','\0',0,100,250,89),(81,3116,'2025-04-09 14:05:37','OK, CRATES GOING INTO A WOODEN BOAT','\0',0,3116,7790,90),(82,2000,'2025-04-09 15:30:24','OK','\0',0,2000,5000,91),(83,2000,'2025-04-09 15:44:27','OK','\0',0,2000,5000,93),(84,2000,'2025-04-09 16:04:11','OK','\0',0,2000,5000,94),(85,17500,'2025-04-09 16:30:59','OK','\0',0,17500,8750,97),(86,7500,'2025-04-09 16:37:18','OK','\0',0,7500,3750,99),(87,13300,'2025-04-09 16:43:25','OK TRUCK TO VESSEL','\0',0,13300,6650,100),(88,50996,'2025-04-09 16:55:35','TRUCK TO VESSEL','\0',0,50996,25498,101);
/*!40000 ALTER TABLE `gen_invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_invoice_aud`
--

DROP TABLE IF EXISTS `gen_invoice_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gen_invoice_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `description` varchar(400) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `ref_id` bigint(20) DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `total_weight` double DEFAULT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKjili5je8mi2rj288ywh9ltf5i` (`rev`),
  CONSTRAINT `FKjili5je8mi2rj288ywh9ltf5i` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_invoice_aud`
--

LOCK TABLES `gen_invoice_aud` WRITE;
/*!40000 ALTER TABLE `gen_invoice_aud` DISABLE KEYS */;
INSERT INTO `gen_invoice_aud` VALUES (1,211,0,20000,'2025-04-04 15:03:12','OK','\0',0,20000,10000,1),(2,214,0,70000,'2025-04-04 17:04:14','OK','\0',0,70000,35000,2),(3,353,0,14000,'2025-04-05 16:30:40','OK','\0',0,14000,35000,5),(4,355,0,14000,'2025-04-05 16:32:15','OK','\0',0,14000,35000,6),(5,357,0,2000,'2025-04-05 16:34:37','OK','\0',0,2000,5000,7),(6,359,0,4275,'2025-04-05 16:36:42','OK RRA, 66306757','\0',0,4275.2,10688,8),(7,361,0,3296,'2025-04-05 16:38:59','OK RAA, 66306591','\0',0,3296,8240,9),(8,363,0,14000,'2025-04-05 16:42:47','OK RRA, 66306607','\0',0,14000,35000,10),(9,365,0,14000,'2025-04-05 16:44:19','OK RRA, 66307027','\0',0,14000,35000,11),(10,367,0,14000,'2025-04-05 16:45:45','OK RRA, 66306599','\0',0,14000,35000,12),(11,369,0,14000,'2025-04-05 16:46:41','OK RRA, 66306550','\0',0,14000,35000,13),(12,371,0,14000,'2025-04-05 16:47:47','OK RRA, 66306611','\0',0,14000,35000,14),(13,373,0,14000,'2025-04-05 16:52:29','OK','\0',0,14000,35000,11),(14,375,0,14000,'2025-04-05 16:55:53','OK RRA, 66307024','\0',0,14000,35000,16),(15,377,0,54000,'2025-04-05 16:59:17','OK RRA, 66307058','\0',0,54000,27000,17),(16,379,0,53680,'2025-04-05 17:06:35','OK, RRA, 66307073','\0',0,53680,26840,18),(17,446,0,1720,'2025-04-06 11:40:01','OKM RRA, 66308461','\0',0,1720,4300,19),(18,448,0,1600,'2025-04-06 11:44:39','OK, RRA, 66308424','\0',0,1600,4000,20),(19,450,0,14000,'2025-04-06 11:46:56','OK, CARGO NOT KNOW, RRA 66308400','\0',0,14000,35000,21),(20,452,0,13980,'2025-04-06 11:50:10','OK, RRA 66308085','\0',0,13980,34950,22),(21,454,0,1400,'2025-04-06 11:52:51','OK, RRA 66308008','\0',0,1400,3500,23),(22,456,0,14000,'2025-04-06 11:54:17','RRA, 66307487','\0',0,14000,35000,24),(23,458,0,14000,'2025-04-06 11:55:22','RRA 66307517','\0',0,14000,35000,25),(24,460,0,12000,'2025-04-06 11:56:41','RRA 66307591','\0',0,12000,30000,26),(25,462,0,14000,'2025-04-06 11:57:49','RRA 66307752','\0',0,14000,35000,27),(26,464,0,14000,'2025-04-06 11:58:41','RRA 66308261','\0',0,14000,35000,28),(27,466,0,9600,'2025-04-06 11:59:38','RAR 66308375','\0',0,9600,24000,29),(28,468,0,12000,'2025-04-06 12:01:33','RRA 66307567','\0',0,12000,30000,30),(29,470,0,14000,'2025-04-06 12:02:53','RRA 66307623','\0',0,14000,35000,31),(30,472,0,54000,'2025-04-06 12:25:08','OK, RRA 66307906','\0',0,54000,27000,32),(31,474,0,270000,'2025-04-06 12:26:27','OK RRA 66307917','\0',0,270000,135000,33),(32,476,0,54000,'2025-04-06 12:28:50','OK RRA 66308143','\0',0,54000,27000,34),(33,478,0,60000,'2025-04-06 12:30:18','OK RRA 66308294','\0',0,60000,30000,35),(34,480,0,54000,'2025-04-06 12:31:26','OK RRA 66308313','\0',0,54000,27000,36),(35,482,0,54000,'2025-04-06 12:32:28','OK RRA 66308339','\0',0,54000,27000,37),(36,484,0,52000,'2025-04-06 12:33:24','OK RRA 66308346','\0',0,52000,26000,38),(37,486,0,54000,'2025-04-06 12:35:06','OK RRA 66308425','\0',0,54000,27000,39),(38,488,0,53680,'2025-04-06 12:36:30','OK RRA 66307073','\0',0,53680,26840,40),(39,490,0,50000,'2025-04-06 12:37:32','OK','\0',0,50000,25000,41),(40,493,0,70000,'2025-04-06 13:21:19','OK RRA 66308230','\0',0,70000,35000,42),(41,540,0,14000,'2025-04-06 15:16:52','OK, RRA, 66308780','\0',0,14000,35000,43),(42,542,0,30000,'2025-04-06 15:18:10','RRA, 66308915','\0',0,30000,75000,44),(43,544,0,720,'2025-04-06 15:26:49','RRA, 66309004','\0',0,720,1800,45),(44,546,0,14000,'2025-04-06 15:27:57','RRA66309051','\0',0,14000,35000,46),(45,548,0,14000,'2025-04-06 15:29:04','RRA66309085','\0',0,14000,35000,47),(46,550,0,12000,'2025-04-06 15:30:49','RRA 66309101','\0',0,12000,30000,48),(47,552,0,14000,'2025-04-06 15:33:10','RRA 66309119','\0',0,14000,35000,49),(48,554,0,14000,'2025-04-06 15:34:06','RRA 66309130','\0',0,14000,35000,50),(49,556,0,14000,'2025-04-06 15:34:40','RRA 66309134','\0',0,14000,35000,51),(50,558,0,4354,'2025-04-06 15:36:07','RRA 66309213','\0',0,4354.8,10887,52),(51,560,0,14000,'2025-04-06 15:41:07','OK','\0',0,14000,35000,53),(52,562,0,308000,'2025-04-06 15:42:17','RRA 66309079','\0',0,308000,770000,54),(53,564,0,12000,'2025-04-06 15:43:35','RRA 66309079','\0',0,12000,30000,55),(54,566,0,4000,'2025-04-06 15:44:33','RRA 66309129','\0',0,4000,10000,56),(55,568,0,720,'2025-04-06 15:45:38','RRA 66308938','\0',0,720,1800,57),(56,575,0,62000,'2025-04-06 16:10:20','RRA66308976','\0',0,62000,31000,58),(57,577,0,14000,'2025-04-06 16:11:43','RRA 66309051','\0',0,14000,7000,59),(58,579,0,7488,'2025-04-06 16:14:58','RRA 66309061','\0',0,7488,3744,60),(59,582,0,53500,'2025-04-06 16:18:43','OK','\0',0,53500,26750,62),(60,584,0,56200,'2025-04-06 16:20:32','RRA 66309337','\0',0,56200,28100,63),(61,627,0,14000,'2025-04-06 20:54:07','RRA 66309893','\0',0,14000,35000,64),(62,629,0,14000,'2025-04-06 20:55:02','RRA66309554','\0',0,14000,35000,65),(63,631,0,14000,'2025-04-06 20:59:54','RRA 66309554','\0',0,14000,35000,66),(64,633,0,2000,'2025-04-06 21:07:09','rra 66309074','\0',0,2000,5000,67),(65,636,0,16000,'2025-04-06 21:09:27','RRA66309663','\0',0,16000,40000,69),(66,638,0,64000,'2025-04-06 21:14:25','RRA 66309732','\0',0,64000,32000,69),(67,645,0,54000,'2025-04-08 09:44:54','OK','\0',0,54000,27000,71),(68,685,0,51510,'2025-04-08 13:38:52','RRA','\0',0,51510,25755,77),(69,699,0,16000,'2025-04-08 15:51:23','OK','\0',0,16000,40000,78),(70,710,0,80,'2025-04-08 16:29:58','OK','\0',0,80,40,79),(71,715,0,200,'2025-04-08 17:13:06','OK','\0',0,200,500,80),(72,726,0,4000,'2025-04-09 10:00:33','OK','\0',0,4000,10000,81),(73,734,0,10000,'2025-04-09 10:24:47','THIS IS FOR 5TRUCK DAIAHTSU EACH TRUCK IS 100BGS = TO 5 ROUNDS','\0',0,10000,25000,82),(74,739,0,56260,'2025-04-09 11:10:32','TOSS BLUE-TOWER BLUE AND COOL BABY','\0',0,56260,28130,83),(75,749,0,16000,'2025-04-09 11:37:38','RRA REF 66312053,REF 66312063,REF 66312072','\0',0,16000,40000,86),(76,750,0,14000,'2025-04-09 12:38:54','OK','\0',0,14000,35000,85),(77,754,0,14607,'2025-04-09 12:52:15','OK','\0',0,14607.2,36518,87),(78,757,0,14607,'2025-04-09 12:53:43','OK','\0',0,14607.2,36518,87),(79,763,0,14607,'2025-04-09 13:09:04','OK','\0',0,14607.2,36518,87),(80,781,0,100,'2025-04-09 13:58:33','TUBES TO WOODEN BOAT','\0',0,100,250,89),(81,783,0,3116,'2025-04-09 14:05:37','OK, CRATES GOING INTO A WOODEN BOAT','\0',0,3116,7790,90),(82,802,0,2000,'2025-04-09 15:30:24','OK','\0',0,2000,5000,91),(83,805,0,2000,'2025-04-09 15:44:27','OK','\0',0,2000,5000,93),(84,807,0,2000,'2025-04-09 16:04:11','OK','\0',0,2000,5000,94),(85,818,0,17500,'2025-04-09 16:30:59','OK','\0',0,17500,8750,97),(86,820,0,7500,'2025-04-09 16:37:18','OK','\0',0,7500,3750,99),(87,822,0,13300,'2025-04-09 16:43:25','OK TRUCK TO VESSEL','\0',0,13300,6650,100),(88,828,0,50996,'2025-04-09 16:55:35','TRUCK TO VESSEL','\0',0,50996,25498,101);
/*!40000 ALTER TABLE `gen_invoice_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_receipt`
--

DROP TABLE IF EXISTS `gen_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gen_receipt` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `date_time` varchar(80) NOT NULL,
  `description` varchar(255) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `gen_invoice_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4ymgw9l7ejxihigmr2i6r9po2` (`gen_invoice_id`),
  CONSTRAINT `FK4ymgw9l7ejxihigmr2i6r9po2` FOREIGN KEY (`gen_invoice_id`) REFERENCES `gen_invoice` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_receipt`
--

LOCK TABLES `gen_receipt` WRITE;
/*!40000 ALTER TABLE `gen_receipt` DISABLE KEYS */;
INSERT INTO `gen_receipt` VALUES (1,20000,'2025-04-01 15:13:25','OK','\0',1);
/*!40000 ALTER TABLE `gen_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_receipt_aud`
--

DROP TABLE IF EXISTS `gen_receipt_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `gen_receipt_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `date_time` varchar(80) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `gen_invoice_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FK9i33kd2p5s3gqf2rj6i8wnf3x` (`rev`),
  CONSTRAINT `FK9i33kd2p5s3gqf2rj6i8wnf3x` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_receipt_aud`
--

LOCK TABLES `gen_receipt_aud` WRITE;
/*!40000 ALTER TABLE `gen_receipt_aud` DISABLE KEYS */;
INSERT INTO `gen_receipt_aud` VALUES (1,212,0,20000,'2025-04-04 15:13:25','OK','\0',1),(1,213,1,20000,'2025-04-01 15:13:25','OK','\0',1);
/*!40000 ALTER TABLE `gen_receipt_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) DEFAULT NULL,
  `path` varchar(80) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkk6i2ak2oupy82lfu4ft1eimj` (`product_id`),
  CONSTRAINT `FKkk6i2ak2oupy82lfu4ft1eimj` FOREIGN KEY (`product_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images_aud`
--

DROP TABLE IF EXISTS `images_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `images_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `path` varchar(80) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKr9desky9tki33l7mjbutymycx` (`rev`),
  CONSTRAINT `FKr9desky9tki33l7mjbutymycx` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images_aud`
--

LOCK TABLES `images_aud` WRITE;
/*!40000 ALTER TABLE `images_aud` DISABLE KEYS */;
/*!40000 ALTER TABLE `images_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ata` datetime NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `number_days` int(11) NOT NULL,
  `quay_amount` int(11) NOT NULL,
  `vessel_handling_charges` int(11) NOT NULL,
  `vessel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs0vg4h6nomkfq6ysd2eofqebr` (`vessel_id`),
  CONSTRAINT `FKs0vg4h6nomkfq6ysd2eofqebr` FOREIGN KEY (`vessel_id`) REFERENCES `vessel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'2025-04-02 16:56:00','\0',3,0,210000,2),(2,'2025-04-03 11:03:00','\0',1,0,210000,9),(3,'2025-04-03 14:00:00','\0',1,0,210000,10),(4,'2025-04-04 12:00:00','\0',2,0,210000,6),(5,'2025-04-05 12:00:00','\0',1,0,210000,5),(6,'2025-04-09 12:12:00','\0',1,0,210000,2),(7,'2025-04-09 13:38:00','\0',1,0,210000,3);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_aud`
--

DROP TABLE IF EXISTS `invoice_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `ata` datetime DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `number_days` int(11) DEFAULT NULL,
  `quay_amount` int(11) DEFAULT NULL,
  `vessel_handling_charges` int(11) DEFAULT NULL,
  `vessel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FK57bloicw9h0k4c7xwn0i7u29p` (`rev`),
  CONSTRAINT `FK57bloicw9h0k4c7xwn0i7u29p` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_aud`
--

LOCK TABLES `invoice_aud` WRITE;
/*!40000 ALTER TABLE `invoice_aud` DISABLE KEYS */;
INSERT INTO `invoice_aud` VALUES (1,160,0,'2025-04-02 16:56:00','\0',3,0,210000,2),(1,210,1,'2025-04-02 16:56:00','\0',3,0,210000,2),(1,791,1,'2025-04-02 16:56:00','\0',3,0,210000,2),(2,204,0,'2025-04-03 11:03:00','\0',1,0,210000,9),(3,390,0,'2025-04-05 14:00:00','\0',1,0,210000,10),(4,491,0,'2025-04-06 12:00:00','\0',4,28000,210000,6),(5,573,0,'2025-04-06 12:00:00','\0',1,0,210000,5),(6,773,0,'2025-04-09 12:12:00','\0',1,0,210000,2),(7,777,0,'2025-04-09 13:38:00','\0',1,0,210000,3);
/*!40000 ALTER TABLE `invoice_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `balance` int(11) NOT NULL,
  `description` varchar(350) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `movement_type` varchar(255) DEFAULT NULL,
  `name` varchar(70) NOT NULL,
  `sale_cost` int(11) DEFAULT NULL,
  `unit_cost` int(11) NOT NULL,
  `items_category_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_mnhl79u3u6jdvutuoeq54stne` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Porter Beer',0,0,1),(2,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Craft  Beer',0,0,1),(3,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Lager Beer',0,0,1),(4,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Stout Beer',0,0,1),(5,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Ale Beer',0,0,1),(6,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Cider  Beer',0,0,1),(7,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Pilsner Beer',0,0,1),(8,0,' sold the least frequently, often indicating low customer interest.  20 units sold per month','\0',NULL,'Signature Cocktails',0,0,2),(9,0,' sold the least frequently, often indicating low customer interest.  20 units sold per month','\0',NULL,'Classic Cocktails',0,0,2),(10,0,' sold the least frequently, often indicating low customer interest.  20 units sold per month','\0',NULL,'Frozen Cocktails',0,0,2),(11,0,' sold the least frequently, often indicating low customer interest.  20 units sold per month','\0',NULL,'Mocktails',0,0,2),(12,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Cognac',0,0,3),(13,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Rum',0,0,3),(14,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Vodka',0,0,3),(15,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Tequila',0,0,3),(16,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Gin',0,0,3),(17,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Brandy',0,0,3),(18,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Whiskey',0,0,3),(19,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Sparkling Wine',0,0,4),(20,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Red Wine',0,0,4),(21,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'White Wine',0,0,4),(22,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Rosé Wine',0,0,4),(23,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Dessert Wine',0,0,4),(24,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Fortified Wine',0,0,4),(25,0,' popular during specific seasons, such as summer or winter.  300 units sold in summer','\0',NULL,'Juices',0,0,5),(26,0,' popular during specific seasons, such as summer or winter.  300 units sold in summer','\0',NULL,'Water',0,0,5),(27,0,' popular during specific seasons, such as summer or winter.  300 units sold in summer','\0',NULL,'Soft Drinks',0,0,5),(28,0,'Unique or signature items that define the bar\'s identity and attract customers.  150 specialty cocktails sold','\0',NULL,'Hot Chocolate',0,0,6),(29,0,'Unique or signature items that define the bar\'s identity and attract customers.  150 specialty cocktails sold','\0',NULL,'Tea',0,0,6),(30,0,'Unique or signature items that define the bar\'s identity and attract customers.  150 specialty cocktails sold','\0',NULL,'Coffee',0,0,6),(31,0,' currently part of a promotion, discount, or special offer.  200 units sold during happy hour','\0',NULL,'Milkshakes',0,0,7),(32,0,' currently part of a promotion, discount, or special offer.  200 units sold during happy hour','\0',NULL,'Energy Drinks',0,0,7),(33,0,' currently part of a promotion, discount, or special offer.  200 units sold during happy hour','\0',NULL,'Smoothies',0,0,7),(34,541,'OK','\0',NULL,'SUGAR',0,0,1),(35,1,'OK','\0',NULL,'cement',0,0,1),(36,2,'OK','\0',NULL,'PAKISTAN RICE',0,0,1),(37,1,'OK','\0',NULL,'INDIAN SUGAR',0,0,1),(38,1,'OK','\0',NULL,'COOKING OIL',0,0,1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_aud`
--

DROP TABLE IF EXISTS `items_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `description` varchar(350) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `movement_type` varchar(255) DEFAULT NULL,
  `name` varchar(70) DEFAULT NULL,
  `sale_cost` int(11) DEFAULT NULL,
  `unit_cost` int(11) DEFAULT NULL,
  `items_category_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FK9btc5ke94st1j6hgxpjj9ldwp` (`rev`),
  CONSTRAINT `FK9btc5ke94st1j6hgxpjj9ldwp` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_aud`
--

LOCK TABLES `items_aud` WRITE;
/*!40000 ALTER TABLE `items_aud` DISABLE KEYS */;
INSERT INTO `items_aud` VALUES (1,61,0,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Porter Beer',0,0,1),(2,61,0,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Craft  Beer',0,0,1),(3,61,0,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Lager Beer',0,0,1),(4,61,0,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Stout Beer',0,0,1),(5,61,0,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Ale Beer',0,0,1),(6,61,0,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Cider  Beer',0,0,1),(7,61,0,0,' sold the most frequently, representing high demand.  500 units sold per month','\0',NULL,'Pilsner Beer',0,0,1),(8,62,0,0,' sold the least frequently, often indicating low customer interest.  20 units sold per month','\0',NULL,'Signature Cocktails',0,0,2),(9,62,0,0,' sold the least frequently, often indicating low customer interest.  20 units sold per month','\0',NULL,'Classic Cocktails',0,0,2),(10,62,0,0,' sold the least frequently, often indicating low customer interest.  20 units sold per month','\0',NULL,'Frozen Cocktails',0,0,2),(11,62,0,0,' sold the least frequently, often indicating low customer interest.  20 units sold per month','\0',NULL,'Mocktails',0,0,2),(12,63,0,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Cognac',0,0,3),(13,63,0,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Rum',0,0,3),(14,63,0,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Vodka',0,0,3),(15,63,0,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Tequila',0,0,3),(16,63,0,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Gin',0,0,3),(17,63,0,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Brandy',0,0,3),(18,63,0,0,'Items with a high profit margin, bringing in the most revenue relative to cost.  80% profit margin','\0',NULL,'Whiskey',0,0,3),(19,64,0,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Sparkling Wine',0,0,4),(20,64,0,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Red Wine',0,0,4),(21,64,0,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'White Wine',0,0,4),(22,64,0,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Rosé Wine',0,0,4),(23,64,0,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Dessert Wine',0,0,4),(24,64,0,0,'Items with a low profit margin, often sold at lower prices or with high costs.  10% profit margin','\0',NULL,'Fortified Wine',0,0,4),(25,65,0,0,' popular during specific seasons, such as summer or winter.  300 units sold in summer','\0',NULL,'Juices',0,0,5),(26,65,0,0,' popular during specific seasons, such as summer or winter.  300 units sold in summer','\0',NULL,'Water',0,0,5),(27,65,0,0,' popular during specific seasons, such as summer or winter.  300 units sold in summer','\0',NULL,'Soft Drinks',0,0,5),(28,66,0,0,'Unique or signature items that define the bar\'s identity and attract customers.  150 specialty cocktails sold','\0',NULL,'Hot Chocolate',0,0,6),(29,66,0,0,'Unique or signature items that define the bar\'s identity and attract customers.  150 specialty cocktails sold','\0',NULL,'Tea',0,0,6),(30,66,0,0,'Unique or signature items that define the bar\'s identity and attract customers.  150 specialty cocktails sold','\0',NULL,'Coffee',0,0,6),(31,67,0,0,' currently part of a promotion, discount, or special offer.  200 units sold during happy hour','\0',NULL,'Milkshakes',0,0,7),(32,67,0,0,' currently part of a promotion, discount, or special offer.  200 units sold during happy hour','\0',NULL,'Energy Drinks',0,0,7),(33,67,0,0,' currently part of a promotion, discount, or special offer.  200 units sold during happy hour','\0',NULL,'Smoothies',0,0,7),(34,644,0,540,'OK','\0',NULL,'SUGAR',0,0,1),(34,743,1,541,'OK','\0',NULL,'SUGAR',0,0,1),(35,649,0,1,'OK','\0',NULL,'cement',0,0,1),(36,671,0,1,'OK','\0',NULL,'PAKISTAN RICE',0,0,1),(36,672,1,2,'OK','\0',NULL,'PAKISTAN RICE',0,0,1),(37,673,0,1,'OK','\0',NULL,'INDIAN SUGAR',0,0,1),(38,753,0,1,'OK','\0',NULL,'COOKING OIL',0,0,1);
/*!40000 ALTER TABLE `items_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_category`
--

DROP TABLE IF EXISTS `items_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) DEFAULT NULL,
  `item_name` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_category`
--

LOCK TABLES `items_category` WRITE;
/*!40000 ALTER TABLE `items_category` DISABLE KEYS */;
INSERT INTO `items_category` VALUES (1,'\0','Alcoholic'),(2,'\0','cocktails'),(3,'\0','spirits'),(4,'\0','wines'),(5,'\0','non alcoholic'),(6,'\0','hot beverages'),(7,'\0','special types'),(8,'\0','Alcoholic'),(9,'\0','cocktails'),(10,'\0','spirits'),(11,'\0','wines'),(12,'\0','non alcoholic'),(13,'\0','hot beverages'),(14,'\0','special types');
/*!40000 ALTER TABLE `items_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_category_aud`
--

DROP TABLE IF EXISTS `items_category_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_category_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `item_name` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKob9y3jjklb16tako3n4yhybxk` (`rev`),
  CONSTRAINT `FKob9y3jjklb16tako3n4yhybxk` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_category_aud`
--

LOCK TABLES `items_category_aud` WRITE;
/*!40000 ALTER TABLE `items_category_aud` DISABLE KEYS */;
INSERT INTO `items_category_aud` VALUES (1,54,0,'\0','Alcoholic'),(1,61,1,'\0','Alcoholic'),(1,644,1,'\0','Alcoholic'),(1,649,1,'\0','Alcoholic'),(1,671,1,'\0','Alcoholic'),(1,673,1,'\0','Alcoholic'),(1,753,1,'\0','Alcoholic'),(2,55,0,'\0','cocktails'),(2,62,1,'\0','cocktails'),(3,56,0,'\0','spirits'),(3,63,1,'\0','spirits'),(4,57,0,'\0','wines'),(4,64,1,'\0','wines'),(5,58,0,'\0','non alcoholic'),(5,65,1,'\0','non alcoholic'),(6,59,0,'\0','hot beverages'),(6,66,1,'\0','hot beverages'),(7,60,0,'\0','special types'),(7,67,1,'\0','special types'),(8,235,0,'\0','Alcoholic'),(9,236,0,'\0','cocktails'),(10,237,0,'\0','spirits'),(11,238,0,'\0','wines'),(12,239,0,'\0','non alcoholic'),(13,240,0,'\0','hot beverages'),(14,241,0,'\0','special types');
/*!40000 ALTER TABLE `items_category_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gender` varchar(70) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(70) NOT NULL,
  `surname` varchar(70) DEFAULT NULL,
  `telephone` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=385 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'Male','\0','Mahdi','Ali',NULL),(2,'Male','\0','RTDA','rtda',NULL),(3,'Male','\0','paul','rugema',NULL),(4,'Male','\0','Gasana','Rukundo',NULL),(5,'Male','\0','Thierry','RUGWIZA',NULL),(6,'Male','\0','Eric SANO','Ops Supervisor',NULL),(7,'male','\0','Hubert','NYIRINKWAYA',NULL),(8,'male','\0','Paul','MUNEZA',NULL),(9,'male','\0','heritier','NDABASANZE',NULL),(10,'male','\0','kakira','john',NULL),(11,'','\0','XX XX',NULL,NULL),(12,'','\0','FAITH TRADING COMPANY',NULL,NULL),(13,'','\0','FAITH TRADING COMPANY',NULL,NULL),(14,'','\0','FAITH TRADING COMPANY',NULL,NULL),(15,'','\0','FAITH TRADING',NULL,NULL),(16,'','\0','FAITH TRADING',NULL,NULL),(17,'','\0','JOVIT X',NULL,NULL),(18,'','\0','NYANDWI NOEL',NULL,NULL),(19,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(20,'','\0','HABANABAKIZE GERALD',NULL,NULL),(21,'','\0','ALBERT RUTAYIRE',NULL,NULL),(22,'','\0','ALBERT NIYITUMA',NULL,NULL),(23,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(24,'','\0','NDAHIMANA OSWALD',NULL,NULL),(25,'','\0','NTIRENGANYA NEPO',NULL,NULL),(26,'','\0','NZABIRINDA FIDELE',NULL,NULL),(27,'','\0','NGIRUNKUNDA MICHEL',NULL,NULL),(28,'','\0','NTEZIMANA AIMEE',NULL,NULL),(29,'','\0','IRADUKUNDA DANIEL',NULL,NULL),(36,'','\0','XX x',NULL,NULL),(37,'','\0','SAGAP HOUSE','','0788355973'),(38,'','\0','SAGAP HOUSE','','0788355973'),(39,'','\0','MARK SERUGENDO',NULL,NULL),(40,'','\0','SENZIRA J.PIERRE',NULL,NULL),(47,'','\0','PRIME TRUCKING SERVICES AFRICA','','0783135105'),(48,'','\0','PRIME TRUCKING SERVICES AFRICA','','0783135105'),(49,'','\0','PRIME TRUCKING SERVICES AFRICA','','0783135105'),(50,'','\0','PRIME TRUCKING SERVICES AFRICA','','0783135105'),(51,'','\0','SENZIRA J PIERRE',NULL,NULL),(52,'','\0','MICOMYIZA BERNARD',NULL,NULL),(53,'','\0','NDAHIMANA OSWALD',NULL,NULL),(54,'','\0','NDAHIMANA OSWALD',NULL,NULL),(55,'','\0','NDAHIMANA OSWALD',NULL,NULL),(56,'','\0','NDAHIMANA OSWALD',NULL,NULL),(57,'','\0','SIMEON IZADUHIJURU',NULL,NULL),(58,'','\0','MUDANGA PLACIDE',NULL,NULL),(59,'','\0','NOAH AND CLAUDE HARDWARE LTD','','0788837993'),(60,'','\0','NOAH AND CLAUDE HARDWARE LTD','','0788837993'),(61,'','\0','SAFARI MANASE',NULL,NULL),(62,'','\0','IYAKAREMYE DANIEL',NULL,NULL),(63,'','\0','DANIEL IRADUKUNDA',NULL,NULL),(64,'','\0','KADOGO MILENIUM',NULL,NULL),(65,'','\0','BAHATI JIRESS',NULL,NULL),(66,'','\0','IABAGA x',NULL,NULL),(67,'','\0','IABAGA x',NULL,NULL),(68,'','\0','SEBAGENI x',NULL,NULL),(69,'male','\0','rugira','vive',NULL),(70,'male','\0','dushimirimana','emmanuel',NULL),(71,'male','\0','niyongira','bosco',NULL),(72,'male','\0','kakira','john',NULL),(73,'','\0','NA NA',NULL,NULL),(74,'','\0','NA NA',NULL,NULL),(75,'','\0','NA NA',NULL,NULL),(76,'','\0','NA NA',NULL,NULL),(77,'','\0','NA NA',NULL,NULL),(78,'','\0','NA NA',NULL,NULL),(79,'','\0','NA NA',NULL,NULL),(80,'','\0','NA NA',NULL,NULL),(81,'','\0','NA NA',NULL,NULL),(82,'','\0','NGIRUNKUNDA MICHEL',NULL,NULL),(83,'','\0','NZABIRINDA DIFELE',NULL,NULL),(84,'','\0','NTIRENGANYA NEPO',NULL,NULL),(85,'','\0','NDAHIMANA OSWALD',NULL,NULL),(86,'','\0','ALBERT NIYITUMA',NULL,NULL),(87,'','\0','ALBERT RUTAYISIRE',NULL,NULL),(88,'','\0','NYANDWI NOEL',NULL,NULL),(89,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(90,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(91,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(92,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(93,'','\0','NA NA',NULL,NULL),(94,'','\0','UMOJA NI NGUVU',NULL,NULL),(95,'','\0','yy yy',NULL,NULL),(96,'','\0','XX XX',NULL,NULL),(97,'','\0','XX XX',NULL,NULL),(98,'','\0','XX XX',NULL,NULL),(99,'','\0','XX XX',NULL,NULL),(100,'','\0','XX XX',NULL,NULL),(101,'','\0','XX XX',NULL,NULL),(102,'','\0','XX XX',NULL,NULL),(103,'','\0','XX XX',NULL,NULL),(104,'','\0','XX XX',NULL,NULL),(105,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(106,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(107,'','\0','NOAH','','00'),(108,'','\0','NOAH','','00'),(109,'','\0','ORACION','','00'),(110,'','\0','ORACION','','00'),(111,'','\0','EMS GENERAL','','00'),(112,'','\0','EMS GENERAL','','00'),(113,'','\0','NYIRAMAHIRWE BEATRICE','','00'),(114,'','\0','NYIRAMAHIRWE BEATRICE','','00'),(115,'','\0','NOAH','','00'),(116,'','\0','NOAH','','00'),(117,'','\0','ITH','','00'),(118,'','\0','ITH','','00'),(119,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(120,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(121,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(122,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(123,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(124,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(125,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(126,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(127,'','\0','ITH','','00'),(128,'','\0','ITH','','00'),(129,'','\0','HILL GENERAL','','00'),(130,'','\0','HILL GENERAL','','00'),(131,'','\0','HILL GENERAL','','00'),(132,'','\0','HILL GENERAL','','00'),(133,'','\0','xx xx',NULL,NULL),(134,'','\0','XX XX',NULL,NULL),(135,'','\0','XX XX',NULL,NULL),(136,'','\0','XX XX',NULL,NULL),(137,'','\0','XX XX',NULL,NULL),(138,'','\0','XX XX',NULL,NULL),(139,'','\0','XX XX',NULL,NULL),(140,'','\0','XX XX',NULL,NULL),(141,'','\0','XX X',NULL,NULL),(142,'','\0','XX X',NULL,NULL),(143,'','\0','XX X',NULL,NULL),(144,'','\0','s s',NULL,NULL),(145,'','\0','NYAMURINGA SPOIRE','','00'),(146,'','\0','NYAMURINGA SPOIRE','','00'),(147,'','\0','NYAMURINGA SPOIRE','','00'),(148,'','\0','UWIZEYE EMMANUEL','','00'),(149,'','\0','BAHATI MOSEKA JIRESSE','','00'),(150,'','\0','BAHATI MOSEKA JIRESSE','','00'),(151,'','\0','BAHATI MOSEKA JIRESSE','','00'),(152,'','\0','BAHATI MOSEKA JIRESSE','','00'),(153,'','\0','UMUTONI GENERAL','','00'),(154,'','\0','UMUTONI GENERAL','','00'),(155,'','\0','ITH TRADERA','','00'),(156,'','\0','ITH TRADERA','','00'),(157,'','\0','NOAH ANA CLAUDE HARDWARE','','00'),(158,'','\0','NOAH ANA CLAUDE HARDWARE','','00'),(159,'','\0','KA CO TRA Ltd','','00'),(160,'','\0','KA CO TRA Ltd','','00'),(161,'','\0','ITH TRADERS Ltd','','00'),(162,'','\0','ITH TRADERS Ltd','','00'),(163,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(164,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(165,'','\0','RWANDA SPECIAL MATERIALS','','00'),(166,'','\0','RWANDA SPECIAL MATERIALS','','00'),(167,'','\0','KAC GENERAL','','00'),(168,'','\0','KAC GENERAL','','00'),(169,'','\0','NOAH','','00'),(170,'','\0','NOAH','','00'),(171,'','\0','HILL GENERAL','','00'),(172,'','\0','HILL GENERAL','','00'),(173,'','\0','HILL GENERAL TRADING','','00'),(174,'','\0','HILL GENERAL TRADING','','00'),(175,'','\0','STAR GENERAL SUPPLIERS','','00'),(176,'','\0','STAR GENERAL SUPPLIERS','','00'),(177,'','\0','BAZITEYE COMPANY','','00'),(178,'','\0','BAZITEYE COMPANY','','00'),(179,'','\0','STAR GENERAL SUPPLIERS','','00'),(180,'','\0','STAR GENERAL SUPPLIERS','','00'),(181,'','\0','HILL GENRAL TRADING','','00'),(182,'','\0','HILL GENRAL TRADING','','00'),(183,'','\0','HILL GENRAL TRADING','','00'),(184,'','\0','HILL GENRAL TRADING','','00'),(185,'','\0','STAR GENERAL','','00'),(186,'','\0','STAR GENERAL','','00'),(187,'','\0','HILL GENERAL','','00'),(188,'','\0','HILL GENERAL','','00'),(189,'','\0','MUEED STAR','','00'),(190,'','\0','MUEED STAR','','00'),(191,'','\0','AFRILOTT HOLDING','','00'),(192,'','\0','AFRILOTT HOLDING','','00'),(193,'','\0','NTAIRUTIMANA Damascene',NULL,NULL),(194,'','\0','xx xx',NULL,NULL),(195,'','\0','xx xx',NULL,NULL),(196,'','\0','xx xx',NULL,NULL),(197,'','\0','xx xx',NULL,NULL),(198,'','\0','xx xx',NULL,NULL),(199,'','\0','xx xx',NULL,NULL),(200,'','\0','xx xx',NULL,NULL),(201,'','\0','xx xx',NULL,NULL),(202,'','\0','xx xx',NULL,NULL),(203,'','\0','NOAH','','00'),(204,'','\0','NOAH','','00'),(205,'','\0','MUEED STAR','','00'),(206,'','\0','MUEED STAR','','00'),(207,'','\0','UMUTONI GENERAL','','00'),(208,'','\0','UMUTONI GENERAL','','00'),(209,'','\0','ITH TRADERS','','00'),(210,'','\0','ITH TRADERS','','00'),(211,'','\0','ITH TRADERS','','00'),(212,'','\0','ITH TRADERS','','00'),(213,'','\0','ITH TRADERS','','00'),(214,'','\0','ITH TRADERS','','00'),(215,'','\0','NOAH AND CLAUDE HARWARE','','00'),(216,'','\0','NOAH AND CLAUDE HARWARE','','00'),(217,'','\0','NOAH AND CLAUDE HARWARE','','00'),(218,'','\0','NOAH AND CLAUDE HARWARE','','00'),(219,'','\0','NOAH AND CLAUDE HARWARE','','00'),(220,'','\0','NOAH AND CLAUDE HARWARE','','00'),(221,'','\0','JULES MUHIMA','','00'),(222,'','\0','JULES MUHIMA','','00'),(223,'','\0','UNITED CEMENT SELLERS','','00'),(224,'','\0','UNITED CEMENT SELLERS','','00'),(225,'','\0','SADIKI','','00'),(226,'','\0','SADIKI','','00'),(227,'','\0','HABIYAREMYE JEAN D\'AMOUR','','00'),(228,'','\0','HABIYAREMYE JEAN D\'AMOUR','','00'),(229,'','\0','IJETRA','','00'),(230,'','\0','IJETRA','','00'),(231,'','\0','UMUTONI GENERA','','00'),(232,'','\0','UMUTONI GENERA','','00'),(233,'','\0','CHUMVI SAFI LTD','','00'),(234,'','\0','CHUMVI SAFI LTD','','00'),(235,'','\0','ITH TRADERS LTD','','00'),(236,'','\0','ITH TRADERS LTD','','00'),(237,'','\0','UWINEZA M CHANTAL','','00'),(238,'','\0','UWINEZA M CHANTAL','','00'),(239,'','\0','HILL GENERAL','','00'),(240,'','\0','HILL GENERAL','','00'),(241,'','\0','STAR GENERAL','','00'),(242,'','\0','STAR GENERAL','','00'),(243,'','\0','VIP PHILIPPE','','00'),(244,'','\0','VIP PHILIPPE','','00'),(245,'','\0','XX XX',NULL,NULL),(246,'','\0','XX XX',NULL,NULL),(247,'','\0','XX XX',NULL,NULL),(248,'','\0','XX XX',NULL,NULL),(249,'','\0','XX XX',NULL,NULL),(250,'','\0','XX XX',NULL,NULL),(251,'','\0','XX XX',NULL,NULL),(252,'','\0','XX XX',NULL,NULL),(253,'','\0','WIH RWANDA CEMENT','','00'),(254,'','\0','WIH RWANDA CEMENT','','00'),(255,'','\0','WIH RWANDA CEMENT','','00'),(256,'','\0','WIH RWANDA CEMENT','','00'),(257,'','\0','WIH RWANDA CEMENT','','00'),(258,'','\0','WIH RWANDA CEMENT','','00'),(259,'','\0','ITH TRADERS','','00'),(260,'','\0','ITH TRADERS','','00'),(261,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(262,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(263,'','\0','INGABIRE GENERAL','','00'),(264,'','\0','INGABIRE GENERAL','','00'),(265,'','\0','GAHUNGU BUSINESS','','00'),(266,'','\0','GAHUNGU BUSINESS','','00'),(267,'','\0','HAKORIMANA JEAN BAPTISTE',NULL,NULL),(268,'','\0','Hill GENERAL',NULL,NULL),(269,'','\0','HILL GENERAL TRADING LTD','','0782281333'),(270,'','\0','NDAYAMBAJE DANNY',NULL,NULL),(271,'','\0','askjfl','','289374289'),(272,'','\0','RUTAYISIRE JAMES',NULL,NULL),(273,'','\0','UMUTONI GENERAL',NULL,NULL),(274,'','\0','HILL GENERAL','','0782281333'),(275,'','\0','HILL GENERAL','','0782281333'),(276,'','\0','NSENGIYUMVA INNOCENT',NULL,NULL),(277,'','\0','VINCENT KUBWIMANA',NULL,NULL),(278,'','\0','XX x',NULL,NULL),(279,'','\0','X X',NULL,NULL),(280,'','\0','XX X',NULL,NULL),(288,'','\0','AFRILOTT HOLDING','','00'),(290,'Male','','AFRILOTT HOLDING','','0788605335'),(291,'','\0','AFRILOTT HOLDING','','0788605335'),(292,'','\0','FAITH TRADING COMPANY','','0788605335'),(293,'','\0','MAPENDO SIMON',NULL,NULL),(294,'','\0','MAPENDO SIMON',NULL,NULL),(295,'','\0','X X',NULL,NULL),(296,'','\0','HILL GENERAL','','00'),(297,'','\0','HILL GENERAL','','00'),(298,'','\0','NTAMWEMEZI BERTHIN',NULL,NULL),(299,'','\0','MANISHIMWE SALIM',NULL,NULL),(300,'','\0','NIYONSENGA XX',NULL,NULL),(301,'','\0','NDIHANO BERTIN',NULL,NULL),(310,'','\0','TRADING URIM','','0788800656'),(311,'','\0','TRADING URIM','','0788800656'),(312,'','\0','DANIEL BUROKO',NULL,NULL),(313,'','\0','BAHATI BABISHA',NULL,NULL),(314,'','\0','CHRISTIAN AKUMWAMI',NULL,NULL),(319,'','\0','JEAN DMOUR HABIYAREMYE','','0788830572'),(320,'','\0','JEAN DMOUR HABIYAREMYE','','0788830572'),(321,'','\0','BAVUGIRIJE KWIZERA',NULL,NULL),(324,'','\0','UMUTONI GENERAL','','0795071131'),(325,'','\0','UMUTONI GENERAL','','0795071131'),(326,'','\0','NTAMWEMEZI BERTIN',NULL,NULL),(327,'','\0','NDAYAMBAJE DANY',NULL,NULL),(328,'','\0','BAVUGAMENSHI AUGUSTIN',NULL,NULL),(329,'','\0','UWAMAHORO VESTINE','','0785233517'),(330,'','\0','UWAMAHORO VESTINE','','0785233517'),(331,'','\0','SIBOMANA JEAN PAUL',NULL,NULL),(332,'','\0','ABAYISENGA MISHAKE',NULL,NULL),(333,'','\0','ITH','','0783398114'),(334,'','\0','ITH','','0783398114'),(335,'','\0','JILES BAHATI',NULL,NULL),(336,'','\0','ATIG INVESTMENT','','0780252755'),(337,'','\0','ATIG INVESTMENT','','0780252755'),(338,'','\0','x x',NULL,NULL),(339,'','\0','FAITH TRADING COMPANY','','0788605335'),(340,'','\0','NTAKIRUTIMANA Paul',NULL,NULL),(341,'','\0','ITH TRADERS LTD','','0783398114'),(342,'','\0','ITH TRADERS LTD','','0783398114'),(343,'','\0','KAC GENERAL','','0788460850'),(344,'','\0','KAC GENERAL','','0788460850'),(345,'','\0','xx x',NULL,NULL),(346,'','\0','FAITH TRADING COMPANY','','0788605335'),(347,'','\0','NSEKANABO ALOYS',NULL,NULL),(348,'','\0','KAC GENERAL','','0788460850'),(349,'','\0','KAC GENERAL','','0788460850'),(350,'','\0','NSEKANABO ALOYS',NULL,NULL),(351,'','\0','IZADUHIJURU SIMEON',NULL,NULL),(352,'','\0','Blaise m',NULL,NULL),(353,'','\0','MALI NI WATU','','0788736955'),(354,'','\0','MALI NI WATU','','0788736955'),(355,'','\0','UMUTONI GENERAL','','0785015120'),(356,'','\0','UMUTONI GENERAL','','0785015120'),(357,'','\0','HONORE X',NULL,NULL),(358,'','\0','xx xx',NULL,NULL),(359,'','\0','xx x',NULL,NULL),(360,'','\0','ITH','','0783398114'),(361,'','\0','ITH','','0783398114'),(362,'','\0','ITH','','0783398114'),(363,'','\0','ITH','','0783398114'),(364,'','\0','ITH','','0783398114'),(365,'','\0','ITH','','0783398114'),(366,'','\0','ITH','','0783398114'),(367,'','\0','ITH','','0783398114'),(368,'','\0','Siras n',NULL,NULL),(369,'','\0','Emmanuel Twagirayezu','','0783734048'),(370,'','\0','Emmanuel Twagirayezu','','0783734048'),(371,'','\0','BIZIMANA INNOCENT',NULL,NULL),(372,'','\0','Emmanuel Twagirayezu','','0783734048'),(373,'','\0','Emmanuel Twagirayezu','','0783734048'),(374,'','\0','MUEED STAR','','0794119008'),(375,'','\0','MUEED STAR','','0794119008'),(376,'','\0','Emmanuel Twagirayezu','','0783734048'),(377,'','\0','Emmanuel Twagirayezu','','0783734048'),(378,'','\0','GANADORA','','0794119008'),(379,'','\0','GANADORA','','0794119008'),(380,'','\0','STAR GENERAL','','0794119008'),(381,'','\0','STAR GENERAL','','0794119008'),(382,'','\0','BAGABO FRANK',NULL,NULL),(383,'','\0','HILL GENERAL TRADING','','0782281333'),(384,'','\0','HILL GENERAL TRADING','','0782281333');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_aud`
--

DROP TABLE IF EXISTS `profile_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `gender` varchar(70) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(70) DEFAULT NULL,
  `surname` varchar(70) DEFAULT NULL,
  `telephone` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKfhfnj4lvjfvq7e83v34jwwouy` (`rev`),
  CONSTRAINT `FKfhfnj4lvjfvq7e83v34jwwouy` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_aud`
--

LOCK TABLES `profile_aud` WRITE;
/*!40000 ALTER TABLE `profile_aud` DISABLE KEYS */;
INSERT INTO `profile_aud` VALUES (1,11,0,'Male','\0','Mahdi','Ali',NULL),(2,13,0,'Male','\0','RTDA','rtda',NULL),(3,16,0,'Male','\0','paul','rugema',NULL),(4,19,0,'Male','\0','Gasana','Rukundo',NULL),(5,22,0,'Male','\0','Thierry','RUGWIZA',NULL),(6,25,0,'Male','\0','Eric SANO','Ops Supervisor',NULL),(7,42,0,'male','\0','rugira','vive',NULL),(7,50,1,'male','\0','rugira','vive',NULL),(8,43,0,'male','\0','dushimirimana','emmanuel',NULL),(8,51,1,'male','\0','dushimirimana','emmanuel',NULL),(9,44,0,'male','\0','niyongira','bosco',NULL),(9,52,1,'male','\0','niyongira','bosco',NULL),(10,45,0,'male','\0','kakira','john',NULL),(10,53,1,'male','\0','kakira','john',NULL),(11,70,0,'','\0','XX XX',NULL,NULL),(11,71,1,'','\0','XX XX',NULL,NULL),(12,72,0,'','\0','FAITH TRADING COMPANY',NULL,NULL),(13,73,0,'','\0','FAITH TRADING COMPANY',NULL,NULL),(14,74,0,'','\0','FAITH TRADING COMPANY',NULL,NULL),(15,75,0,'','\0','FAITH TRADING',NULL,NULL),(16,76,0,'','\0','FAITH TRADING',NULL,NULL),(17,77,0,'','\0','JOVIT X',NULL,NULL),(17,78,1,'','\0','JOVIT X',NULL,NULL),(18,86,0,'','\0','NYANDWI NOEL',NULL,NULL),(18,87,1,'','\0','NYANDWI NOEL',NULL,NULL),(19,90,0,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(19,91,1,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(20,110,0,'','\0','HABANABAKIZE GERALD',NULL,NULL),(20,111,1,'','\0','HABANABAKIZE GERALD',NULL,NULL),(21,115,0,'','\0','ALBERT RUTAYIRE',NULL,NULL),(21,116,1,'','\0','ALBERT RUTAYIRE',NULL,NULL),(22,118,0,'','\0','ALBERT NIYITUMA',NULL,NULL),(22,119,1,'','\0','ALBERT NIYITUMA',NULL,NULL),(23,121,0,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(24,124,0,'','\0','NDAHIMANA OSWALD',NULL,NULL),(24,125,1,'','\0','NDAHIMANA OSWALD',NULL,NULL),(25,127,0,'','\0','NTIRENGANYA NEPO',NULL,NULL),(25,128,1,'','\0','NTIRENGANYA NEPO',NULL,NULL),(26,130,0,'','\0','NZABIRINDA FIDELE',NULL,NULL),(26,131,1,'','\0','NZABIRINDA FIDELE',NULL,NULL),(27,133,0,'','\0','NGIRUNKUNDA MICHEL',NULL,NULL),(27,134,1,'','\0','NGIRUNKUNDA MICHEL',NULL,NULL),(28,136,0,'','\0','NTEZIMANA AIMEE',NULL,NULL),(28,137,1,'','\0','NTEZIMANA AIMEE',NULL,NULL),(29,142,0,'','\0','IRADUKUNDA DANIEL',NULL,NULL),(29,143,1,'','\0','IRADUKUNDA DANIEL',NULL,NULL),(36,147,0,'','\0','XX x',NULL,NULL),(36,148,1,'','\0','XX x',NULL,NULL),(37,152,0,'','\0','SAGAP HOUSE','','0788355973'),(38,152,0,'','\0','SAGAP HOUSE','','0788355973'),(39,153,0,'','\0','MARK SERUGENDO',NULL,NULL),(39,154,1,'','\0','MARK SERUGENDO',NULL,NULL),(40,158,0,'','\0','SENZIRA J.PIERRE',NULL,NULL),(40,159,1,'','\0','SENZIRA J.PIERRE',NULL,NULL),(47,162,0,'','\0','PRIME TRUCKING SERVICES AFRICA','','0783135105'),(48,162,0,'','\0','PRIME TRUCKING SERVICES AFRICA','','0783135105'),(49,163,0,'','\0','PRIME TRUCKING SERVICES AFRICA','','0783135105'),(50,163,0,'','\0','PRIME TRUCKING SERVICES AFRICA','','0783135105'),(51,164,0,'','\0','SENZIRA J PIERRE',NULL,NULL),(52,169,0,'','\0','MICOMYIZA BERNARD',NULL,NULL),(52,170,1,'','\0','MICOMYIZA BERNARD',NULL,NULL),(53,174,0,'','\0','NDAHIMANA OSWALD',NULL,NULL),(53,175,1,'','\0','NDAHIMANA OSWALD',NULL,NULL),(54,176,0,'','\0','NDAHIMANA OSWALD',NULL,NULL),(55,178,0,'','\0','NDAHIMANA OSWALD',NULL,NULL),(56,180,0,'','\0','NDAHIMANA OSWALD',NULL,NULL),(57,183,0,'','\0','SIMEON IZADUHIJURU',NULL,NULL),(57,184,1,'','\0','SIMEON IZADUHIJURU',NULL,NULL),(58,186,0,'','\0','MUDANGA PLACIDE',NULL,NULL),(58,187,1,'','\0','MUDANGA PLACIDE',NULL,NULL),(59,190,0,'','\0','NOAH AND CLAUDE HARDWARE LTD','','0788837993'),(60,190,0,'','\0','NOAH AND CLAUDE HARDWARE LTD','','0788837993'),(61,191,0,'','\0','SAFARI MANASE',NULL,NULL),(61,192,1,'','\0','SAFARI MANASE',NULL,NULL),(62,193,0,'','\0','IYAKAREMYE DANIEL',NULL,NULL),(62,194,1,'','\0','IYAKAREMYE DANIEL',NULL,NULL),(63,197,0,'','\0','DANIEL IRADUKUNDA',NULL,NULL),(63,198,1,'','\0','DANIEL IRADUKUNDA',NULL,NULL),(64,205,0,'','\0','KADOGO MILENIUM',NULL,NULL),(64,206,1,'','\0','KADOGO MILENIUM',NULL,NULL),(65,207,0,'','\0','BAHATI JIRESS',NULL,NULL),(65,208,1,'','\0','BAHATI JIRESS',NULL,NULL),(66,215,0,'','\0','IABAGA x',NULL,NULL),(66,216,1,'','\0','IABAGA x',NULL,NULL),(67,217,0,'','\0','IABAGA x',NULL,NULL),(67,218,1,'','\0','IABAGA x',NULL,NULL),(68,219,0,'','\0','SEBAGENI x',NULL,NULL),(68,220,1,'','\0','SEBAGENI x',NULL,NULL),(69,222,0,'male','\0','rugira','vive',NULL),(69,230,1,'male','\0','rugira','vive',NULL),(70,223,0,'male','\0','dushimirimana','emmanuel',NULL),(70,231,1,'male','\0','dushimirimana','emmanuel',NULL),(71,224,0,'male','\0','niyongira','bosco',NULL),(71,232,1,'male','\0','niyongira','bosco',NULL),(72,225,0,'male','\0','kakira','john',NULL),(72,233,1,'male','\0','kakira','john',NULL),(73,242,0,'','\0','NA NA',NULL,NULL),(73,243,1,'','\0','NA NA',NULL,NULL),(74,244,0,'','\0','NA NA',NULL,NULL),(74,245,1,'','\0','NA NA',NULL,NULL),(75,246,0,'','\0','NA NA',NULL,NULL),(75,247,1,'','\0','NA NA',NULL,NULL),(76,248,0,'','\0','NA NA',NULL,NULL),(76,249,1,'','\0','NA NA',NULL,NULL),(77,250,0,'','\0','NA NA',NULL,NULL),(77,251,1,'','\0','NA NA',NULL,NULL),(78,252,0,'','\0','NA NA',NULL,NULL),(79,254,0,'','\0','NA NA',NULL,NULL),(79,255,1,'','\0','NA NA',NULL,NULL),(80,256,0,'','\0','NA NA',NULL,NULL),(80,257,1,'','\0','NA NA',NULL,NULL),(81,258,0,'','\0','NA NA',NULL,NULL),(81,259,1,'','\0','NA NA',NULL,NULL),(82,260,0,'','\0','NGIRUNKUNDA MICHEL',NULL,NULL),(82,261,1,'','\0','NGIRUNKUNDA MICHEL',NULL,NULL),(83,262,0,'','\0','NZABIRINDA DIFELE',NULL,NULL),(83,263,1,'','\0','NZABIRINDA DIFELE',NULL,NULL),(84,264,0,'','\0','NTIRENGANYA NEPO',NULL,NULL),(84,265,1,'','\0','NTIRENGANYA NEPO',NULL,NULL),(85,266,0,'','\0','NDAHIMANA OSWALD',NULL,NULL),(85,267,1,'','\0','NDAHIMANA OSWALD',NULL,NULL),(86,268,0,'','\0','ALBERT NIYITUMA',NULL,NULL),(86,269,1,'','\0','ALBERT NIYITUMA',NULL,NULL),(87,270,0,'','\0','ALBERT RUTAYISIRE',NULL,NULL),(87,271,1,'','\0','ALBERT RUTAYISIRE',NULL,NULL),(88,272,0,'','\0','NYANDWI NOEL',NULL,NULL),(88,273,1,'','\0','NYANDWI NOEL',NULL,NULL),(89,274,0,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(89,275,1,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(90,276,0,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(90,277,1,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(91,278,0,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(91,279,1,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(92,280,0,'','\0','MBANJINEZA JEAN PAUL',NULL,NULL),(93,295,0,'','\0','NA NA',NULL,NULL),(93,296,1,'','\0','NA NA',NULL,NULL),(94,310,0,'','\0','UMOJA NI NGUVU',NULL,NULL),(94,311,1,'','\0','UMOJA NI NGUVU',NULL,NULL),(95,314,0,'','\0','yy yy',NULL,NULL),(95,315,1,'','\0','yy yy',NULL,NULL),(96,316,0,'','\0','XX XX',NULL,NULL),(96,317,1,'','\0','XX XX',NULL,NULL),(97,318,0,'','\0','XX XX',NULL,NULL),(97,319,1,'','\0','XX XX',NULL,NULL),(98,320,0,'','\0','XX XX',NULL,NULL),(98,321,1,'','\0','XX XX',NULL,NULL),(99,322,0,'','\0','XX XX',NULL,NULL),(99,323,1,'','\0','XX XX',NULL,NULL),(100,324,0,'','\0','XX XX',NULL,NULL),(100,325,1,'','\0','XX XX',NULL,NULL),(101,326,0,'','\0','XX XX',NULL,NULL),(101,327,1,'','\0','XX XX',NULL,NULL),(102,328,0,'','\0','XX XX',NULL,NULL),(102,329,1,'','\0','XX XX',NULL,NULL),(103,330,0,'','\0','XX XX',NULL,NULL),(103,331,1,'','\0','XX XX',NULL,NULL),(104,332,0,'','\0','XX XX',NULL,NULL),(104,333,1,'','\0','XX XX',NULL,NULL),(105,352,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(106,352,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(107,354,0,'','\0','NOAH','','00'),(108,354,0,'','\0','NOAH','','00'),(109,356,0,'','\0','ORACION','','00'),(110,356,0,'','\0','ORACION','','00'),(111,358,0,'','\0','EMS GENERAL','','00'),(112,358,0,'','\0','EMS GENERAL','','00'),(113,360,0,'','\0','NYIRAMAHIRWE BEATRICE','','00'),(114,360,0,'','\0','NYIRAMAHIRWE BEATRICE','','00'),(115,362,0,'','\0','NOAH','','00'),(116,362,0,'','\0','NOAH','','00'),(117,364,0,'','\0','ITH','','00'),(118,364,0,'','\0','ITH','','00'),(119,366,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(120,366,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(121,368,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(122,368,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(123,370,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(124,370,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(125,372,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(126,372,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(127,374,0,'','\0','ITH','','00'),(128,374,0,'','\0','ITH','','00'),(129,376,0,'','\0','HILL GENERAL','','00'),(130,376,0,'','\0','HILL GENERAL','','00'),(131,378,0,'','\0','HILL GENERAL','','00'),(132,378,0,'','\0','HILL GENERAL','','00'),(133,383,0,'','\0','xx xx',NULL,NULL),(133,384,1,'','\0','xx xx',NULL,NULL),(134,393,0,'','\0','XX XX',NULL,NULL),(134,394,1,'','\0','XX XX',NULL,NULL),(135,395,0,'','\0','XX XX',NULL,NULL),(135,396,1,'','\0','XX XX',NULL,NULL),(136,397,0,'','\0','XX XX',NULL,NULL),(136,398,1,'','\0','XX XX',NULL,NULL),(137,399,0,'','\0','XX XX',NULL,NULL),(137,400,1,'','\0','XX XX',NULL,NULL),(138,401,0,'','\0','XX XX',NULL,NULL),(138,402,1,'','\0','XX XX',NULL,NULL),(139,403,0,'','\0','XX XX',NULL,NULL),(139,404,1,'','\0','XX XX',NULL,NULL),(140,405,0,'','\0','XX XX',NULL,NULL),(140,406,1,'','\0','XX XX',NULL,NULL),(141,407,0,'','\0','XX X',NULL,NULL),(141,408,1,'','\0','XX X',NULL,NULL),(142,409,0,'','\0','XX X',NULL,NULL),(143,411,0,'','\0','XX X',NULL,NULL),(143,412,1,'','\0','XX X',NULL,NULL),(144,442,0,'','\0','s s',NULL,NULL),(144,443,1,'','\0','s s',NULL,NULL),(145,445,0,'','\0','NYAMURINGA SPOIRE','','00'),(146,445,0,'','\0','NYAMURINGA SPOIRE','','00'),(147,447,0,'','\0','NYAMURINGA SPOIRE','','00'),(148,447,0,'','\0','NYAMURINGA SPOIRE','','00'),(149,449,0,'','\0','BAHATI MOSEKA JIRESSE','','00'),(150,449,0,'','\0','BAHATI MOSEKA JIRESSE','','00'),(151,451,0,'','\0','BAHATI MOSEKA JIRESSE','','00'),(152,451,0,'','\0','BAHATI MOSEKA JIRESSE','','00'),(153,453,0,'','\0','UMUTONI GENERAL','','00'),(154,453,0,'','\0','UMUTONI GENERAL','','00'),(155,455,0,'','\0','ITH TRADERA','','00'),(156,455,0,'','\0','ITH TRADERA','','00'),(157,457,0,'','\0','NOAH ANA CLAUDE HARDWARE','','00'),(158,457,0,'','\0','NOAH ANA CLAUDE HARDWARE','','00'),(159,459,0,'','\0','KA CO TRA Ltd','','00'),(160,459,0,'','\0','KA CO TRA Ltd','','00'),(161,461,0,'','\0','ITH TRADERS Ltd','','00'),(162,461,0,'','\0','ITH TRADERS Ltd','','00'),(163,463,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(164,463,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(165,465,0,'','\0','RWANDA SPECIAL MATERIALS','','00'),(166,465,0,'','\0','RWANDA SPECIAL MATERIALS','','00'),(167,467,0,'','\0','KAC GENERAL','','00'),(168,467,0,'','\0','KAC GENERAL','','00'),(169,469,0,'','\0','NOAH','','00'),(170,469,0,'','\0','NOAH','','00'),(171,471,0,'','\0','HILL GENERAL','','00'),(172,471,0,'','\0','HILL GENERAL','','00'),(173,473,0,'','\0','HILL GENERAL TRADING','','00'),(174,473,0,'','\0','HILL GENERAL TRADING','','00'),(175,475,0,'','\0','STAR GENERAL SUPPLIERS','','00'),(176,475,0,'','\0','STAR GENERAL SUPPLIERS','','00'),(177,477,0,'','\0','BAZITEYE COMPANY','','00'),(178,477,0,'','\0','BAZITEYE COMPANY','','00'),(179,479,0,'','\0','STAR GENERAL SUPPLIERS','','00'),(180,479,0,'','\0','STAR GENERAL SUPPLIERS','','00'),(181,481,0,'','\0','HILL GENRAL TRADING','','00'),(182,481,0,'','\0','HILL GENRAL TRADING','','00'),(183,483,0,'','\0','HILL GENRAL TRADING','','00'),(184,483,0,'','\0','HILL GENRAL TRADING','','00'),(185,485,0,'','\0','STAR GENERAL','','00'),(186,485,0,'','\0','STAR GENERAL','','00'),(187,487,0,'','\0','HILL GENERAL','','00'),(188,487,0,'','\0','HILL GENERAL','','00'),(189,489,0,'','\0','MUEED STAR','','00'),(190,489,0,'','\0','MUEED STAR','','00'),(191,492,0,'','\0','AFRILOTT HOLDING','','00'),(192,492,0,'','\0','AFRILOTT HOLDING','','00'),(193,494,0,'','\0','NTAIRUTIMANA Damascene',NULL,NULL),(193,495,1,'','\0','NTAIRUTIMANA Damascene',NULL,NULL),(194,497,0,'','\0','xx xx',NULL,NULL),(194,498,1,'','\0','xx xx',NULL,NULL),(195,499,0,'','\0','xx xx',NULL,NULL),(195,500,1,'','\0','xx xx',NULL,NULL),(196,501,0,'','\0','xx xx',NULL,NULL),(196,502,1,'','\0','xx xx',NULL,NULL),(197,503,0,'','\0','xx xx',NULL,NULL),(197,504,1,'','\0','xx xx',NULL,NULL),(198,505,0,'','\0','xx xx',NULL,NULL),(198,506,1,'','\0','xx xx',NULL,NULL),(199,507,0,'','\0','xx xx',NULL,NULL),(199,508,1,'','\0','xx xx',NULL,NULL),(200,509,0,'','\0','xx xx',NULL,NULL),(200,510,1,'','\0','xx xx',NULL,NULL),(201,511,0,'','\0','xx xx',NULL,NULL),(202,513,0,'','\0','xx xx',NULL,NULL),(202,514,1,'','\0','xx xx',NULL,NULL),(203,539,0,'','\0','NOAH','','00'),(204,539,0,'','\0','NOAH','','00'),(205,541,0,'','\0','MUEED STAR','','00'),(206,541,0,'','\0','MUEED STAR','','00'),(207,543,0,'','\0','UMUTONI GENERAL','','00'),(208,543,0,'','\0','UMUTONI GENERAL','','00'),(209,545,0,'','\0','ITH TRADERS','','00'),(210,545,0,'','\0','ITH TRADERS','','00'),(211,547,0,'','\0','ITH TRADERS','','00'),(212,547,0,'','\0','ITH TRADERS','','00'),(213,549,0,'','\0','ITH TRADERS','','00'),(214,549,0,'','\0','ITH TRADERS','','00'),(215,551,0,'','\0','NOAH AND CLAUDE HARWARE','','00'),(216,551,0,'','\0','NOAH AND CLAUDE HARWARE','','00'),(217,553,0,'','\0','NOAH AND CLAUDE HARWARE','','00'),(218,553,0,'','\0','NOAH AND CLAUDE HARWARE','','00'),(219,555,0,'','\0','NOAH AND CLAUDE HARWARE','','00'),(220,555,0,'','\0','NOAH AND CLAUDE HARWARE','','00'),(221,557,0,'','\0','JULES MUHIMA','','00'),(222,557,0,'','\0','JULES MUHIMA','','00'),(223,559,0,'','\0','UNITED CEMENT SELLERS','','00'),(224,559,0,'','\0','UNITED CEMENT SELLERS','','00'),(225,561,0,'','\0','SADIKI','','00'),(226,561,0,'','\0','SADIKI','','00'),(227,563,0,'','\0','HABIYAREMYE JEAN D\'AMOUR','','00'),(228,563,0,'','\0','HABIYAREMYE JEAN D\'AMOUR','','00'),(229,565,0,'','\0','IJETRA','','00'),(230,565,0,'','\0','IJETRA','','00'),(231,567,0,'','\0','UMUTONI GENERA','','00'),(232,567,0,'','\0','UMUTONI GENERA','','00'),(233,574,0,'','\0','CHUMVI SAFI LTD','','00'),(234,574,0,'','\0','CHUMVI SAFI LTD','','00'),(235,576,0,'','\0','ITH TRADERS LTD','','00'),(236,576,0,'','\0','ITH TRADERS LTD','','00'),(237,578,0,'','\0','UWINEZA M CHANTAL','','00'),(238,578,0,'','\0','UWINEZA M CHANTAL','','00'),(239,580,0,'','\0','HILL GENERAL','','00'),(240,580,0,'','\0','HILL GENERAL','','00'),(241,581,0,'','\0','STAR GENERAL','','00'),(242,581,0,'','\0','STAR GENERAL','','00'),(243,583,0,'','\0','VIP PHILIPPE','','00'),(244,583,0,'','\0','VIP PHILIPPE','','00'),(245,585,0,'','\0','XX XX',NULL,NULL),(245,586,1,'','\0','XX XX',NULL,NULL),(246,587,0,'','\0','XX XX',NULL,NULL),(246,588,1,'','\0','XX XX',NULL,NULL),(247,589,0,'','\0','XX XX',NULL,NULL),(247,590,1,'','\0','XX XX',NULL,NULL),(248,591,0,'','\0','XX XX',NULL,NULL),(249,593,0,'','\0','XX XX',NULL,NULL),(249,594,1,'','\0','XX XX',NULL,NULL),(250,595,0,'','\0','XX XX',NULL,NULL),(250,596,1,'','\0','XX XX',NULL,NULL),(251,597,0,'','\0','XX XX',NULL,NULL),(251,598,1,'','\0','XX XX',NULL,NULL),(252,599,0,'','\0','XX XX',NULL,NULL),(252,600,1,'','\0','XX XX',NULL,NULL),(253,626,0,'','\0','WIH RWANDA CEMENT','','00'),(254,626,0,'','\0','WIH RWANDA CEMENT','','00'),(255,628,0,'','\0','WIH RWANDA CEMENT','','00'),(256,628,0,'','\0','WIH RWANDA CEMENT','','00'),(257,630,0,'','\0','WIH RWANDA CEMENT','','00'),(258,630,0,'','\0','WIH RWANDA CEMENT','','00'),(259,632,0,'','\0','ITH TRADERS','','00'),(260,632,0,'','\0','ITH TRADERS','','00'),(261,634,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(262,634,0,'','\0','NOAH AND CLAUDE HARDWARE','','00'),(263,635,0,'','\0','INGABIRE GENERAL','','00'),(264,635,0,'','\0','INGABIRE GENERAL','','00'),(265,637,0,'','\0','GAHUNGU BUSINESS','','00'),(266,637,0,'','\0','GAHUNGU BUSINESS','','00'),(267,639,0,'','\0','HAKORIMANA JEAN BAPTISTE',NULL,NULL),(267,640,1,'','\0','HAKORIMANA JEAN BAPTISTE',NULL,NULL),(268,642,0,'','\0','Hill GENERAL',NULL,NULL),(268,643,1,'','\0','Hill GENERAL',NULL,NULL),(269,644,0,'','\0','HILL GENERAL TRADING LTD','','0782281333'),(270,646,0,'','\0','NDAYAMBAJE DANNY',NULL,NULL),(271,649,0,'','\0','askjfl','','289374289'),(272,650,0,'','\0','RUTAYISIRE JAMES',NULL,NULL),(272,651,1,'','\0','RUTAYISIRE JAMES',NULL,NULL),(273,652,0,'','\0','UMUTONI GENERAL',NULL,NULL),(273,653,1,'','\0','UMUTONI GENERAL',NULL,NULL),(274,655,0,'','\0','HILL GENERAL','','0782281333'),(275,655,0,'','\0','HILL GENERAL','','0782281333'),(276,656,0,'','\0','NSENGIYUMVA INNOCENT',NULL,NULL),(276,657,1,'','\0','NSENGIYUMVA INNOCENT',NULL,NULL),(277,659,0,'','\0','VINCENT KUBWIMANA',NULL,NULL),(278,662,0,'','\0','XX x',NULL,NULL),(278,663,1,'','\0','XX x',NULL,NULL),(279,665,0,'','\0','X X',NULL,NULL),(279,666,1,'','\0','X X',NULL,NULL),(280,668,0,'','\0','XX X',NULL,NULL),(280,669,1,'','\0','XX X',NULL,NULL),(288,671,0,'','\0','AFRILOTT HOLDING','','00'),(291,672,0,'','\0','AFRILOTT HOLDING','','0788605335'),(292,673,0,'','\0','FAITH TRADING COMPANY','','0788605335'),(293,674,0,'','\0','MAPENDO SIMON',NULL,NULL),(293,675,1,'','\0','MAPENDO SIMON',NULL,NULL),(294,677,0,'','\0','MAPENDO SIMON',NULL,NULL),(294,678,1,'','\0','MAPENDO SIMON',NULL,NULL),(295,681,0,'','\0','X X',NULL,NULL),(295,682,1,'','\0','X X',NULL,NULL),(296,684,0,'','\0','HILL GENERAL','','00'),(297,684,0,'','\0','HILL GENERAL','','00'),(298,686,0,'','\0','NTAMWEMEZI BERTHIN',NULL,NULL),(298,687,1,'','\0','NTAMWEMEZI BERTHIN',NULL,NULL),(299,689,0,'','\0','MANISHIMWE SALIM',NULL,NULL),(299,690,1,'','\0','MANISHIMWE SALIM',NULL,NULL),(300,692,0,'','\0','NIYONSENGA XX',NULL,NULL),(300,693,1,'','\0','NIYONSENGA XX',NULL,NULL),(301,695,0,'','\0','NDIHANO BERTIN',NULL,NULL),(301,696,1,'','\0','NDIHANO BERTIN',NULL,NULL),(310,698,0,'','\0','TRADING URIM','','0788800656'),(311,698,0,'','\0','TRADING URIM','','0788800656'),(312,700,0,'','\0','DANIEL BUROKO',NULL,NULL),(312,701,1,'','\0','DANIEL BUROKO',NULL,NULL),(313,703,0,'','\0','BAHATI BABISHA',NULL,NULL),(314,706,0,'','\0','CHRISTIAN AKUMWAMI',NULL,NULL),(314,707,1,'','\0','CHRISTIAN AKUMWAMI',NULL,NULL),(319,709,0,'','\0','JEAN DMOUR HABIYAREMYE','','0788830572'),(320,709,0,'','\0','JEAN DMOUR HABIYAREMYE','','0788830572'),(321,711,0,'','\0','BAVUGIRIJE KWIZERA',NULL,NULL),(324,714,0,'','\0','UMUTONI GENERAL','','0795071131'),(325,714,0,'','\0','UMUTONI GENERAL','','0795071131'),(326,716,0,'','\0','NTAMWEMEZI BERTIN',NULL,NULL),(327,719,0,'','\0','NDAYAMBAJE DANY',NULL,NULL),(328,722,0,'','\0','BAVUGAMENSHI AUGUSTIN',NULL,NULL),(329,725,0,'','\0','UWAMAHORO VESTINE','','0785233517'),(330,725,0,'','\0','UWAMAHORO VESTINE','','0785233517'),(331,727,0,'','\0','SIBOMANA JEAN PAUL',NULL,NULL),(331,728,1,'','\0','SIBOMANA JEAN PAUL',NULL,NULL),(332,730,0,'','\0','ABAYISENGA MISHAKE',NULL,NULL),(332,731,1,'','\0','ABAYISENGA MISHAKE',NULL,NULL),(333,733,0,'','\0','ITH','','0783398114'),(334,733,0,'','\0','ITH','','0783398114'),(335,735,0,'','\0','JILES BAHATI',NULL,NULL),(335,736,1,'','\0','JILES BAHATI',NULL,NULL),(336,738,0,'','\0','ATIG INVESTMENT','','0780252755'),(337,738,0,'','\0','ATIG INVESTMENT','','0780252755'),(338,740,0,'','\0','x x',NULL,NULL),(338,741,1,'','\0','x x',NULL,NULL),(339,743,0,'','\0','FAITH TRADING COMPANY','','0788605335'),(340,744,0,'','\0','NTAKIRUTIMANA Paul',NULL,NULL),(340,745,1,'','\0','NTAKIRUTIMANA Paul',NULL,NULL),(341,747,0,'','\0','ITH TRADERS LTD','','0783398114'),(342,747,0,'','\0','ITH TRADERS LTD','','0783398114'),(343,748,0,'','\0','KAC GENERAL','','0788460850'),(344,748,0,'','\0','KAC GENERAL','','0788460850'),(345,751,0,'','\0','xx x',NULL,NULL),(345,752,1,'','\0','xx x',NULL,NULL),(346,753,0,'','\0','FAITH TRADING COMPANY','','0788605335'),(347,755,0,'','\0','NSEKANABO ALOYS',NULL,NULL),(347,756,1,'','\0','NSEKANABO ALOYS',NULL,NULL),(348,759,0,'','\0','KAC GENERAL','','0788460850'),(349,759,0,'','\0','KAC GENERAL','','0788460850'),(350,760,0,'','\0','NSEKANABO ALOYS',NULL,NULL),(351,766,0,'','\0','IZADUHIJURU SIMEON',NULL,NULL),(351,767,1,'','\0','IZADUHIJURU SIMEON',NULL,NULL),(352,774,0,'','\0','Blaise m',NULL,NULL),(352,775,1,'','\0','Blaise m',NULL,NULL),(353,780,0,'','\0','MALI NI WATU','','0788736955'),(354,780,0,'','\0','MALI NI WATU','','0788736955'),(355,782,0,'','\0','UMUTONI GENERAL','','0785015120'),(356,782,0,'','\0','UMUTONI GENERAL','','0785015120'),(357,785,0,'','\0','HONORE X',NULL,NULL),(357,786,1,'','\0','HONORE X',NULL,NULL),(358,792,0,'','\0','xx xx',NULL,NULL),(358,793,1,'','\0','xx xx',NULL,NULL),(359,797,0,'','\0','xx x',NULL,NULL),(359,798,1,'','\0','xx x',NULL,NULL),(360,801,0,'','\0','ITH','','0783398114'),(361,801,0,'','\0','ITH','','0783398114'),(362,803,0,'','\0','ITH','','0783398114'),(363,803,0,'','\0','ITH','','0783398114'),(364,804,0,'','\0','ITH','','0783398114'),(365,804,0,'','\0','ITH','','0783398114'),(366,806,0,'','\0','ITH','','0783398114'),(367,806,0,'','\0','ITH','','0783398114'),(368,808,0,'','\0','Siras n',NULL,NULL),(368,809,1,'','\0','Siras n',NULL,NULL),(369,811,0,'','\0','Emmanuel Twagirayezu','','0783734048'),(370,811,0,'','\0','Emmanuel Twagirayezu','','0783734048'),(371,812,0,'','\0','BIZIMANA INNOCENT',NULL,NULL),(372,815,0,'','\0','Emmanuel Twagirayezu','','0783734048'),(373,815,0,'','\0','Emmanuel Twagirayezu','','0783734048'),(374,816,0,'','\0','MUEED STAR','','0794119008'),(375,816,0,'','\0','MUEED STAR','','0794119008'),(376,817,0,'','\0','Emmanuel Twagirayezu','','0783734048'),(377,817,0,'','\0','Emmanuel Twagirayezu','','0783734048'),(378,819,0,'','\0','GANADORA','','0794119008'),(379,819,0,'','\0','GANADORA','','0794119008'),(380,821,0,'','\0','STAR GENERAL','','0794119008'),(381,821,0,'','\0','STAR GENERAL','','0794119008'),(382,823,0,'','\0','BAGABO FRANK',NULL,NULL),(382,824,1,'','\0','BAGABO FRANK',NULL,NULL),(383,827,0,'','\0','HILL GENERAL TRADING','','0782281333'),(384,827,0,'','\0','HILL GENERAL TRADING','','0782281333');
/*!40000 ALTER TABLE `profile_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `end_date_time` varchar(250) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `start_date_time` varchar(250) NOT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpeugw5pox090u34mw0f753q5t` (`destination_id`),
  KEY `FKn2hqdkxmrequygsnn70x1icux` (`arrival_id`),
  CONSTRAINT `FKn2hqdkxmrequygsnn70x1icux` FOREIGN KEY (`arrival_id`) REFERENCES `arrival_note` (`id`),
  CONSTRAINT `FKpeugw5pox090u34mw0f753q5t` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (1,'2025-04-08 09:33:40','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',3,71),(2,'2025-04-08 10:10:51','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',6,72),(3,'2025-04-08 12:25:49','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',3,74),(4,'2025-04-08 12:35:54','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',3,75),(5,'2025-04-08 12:40:31','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',3,76),(6,'2025-04-09 11:53:31','Tue Apr 08 00:00:00 CAT 2025','\0','2025-04-08 14:30:23',3,84),(7,'2025-04-09 12:51:43','Tue Apr 08 00:00:00 CAT 2025','\0','2025-04-08 14:30:23',3,87);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_aud`
--

DROP TABLE IF EXISTS `purchase_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `end_date_time` varchar(250) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `start_date_time` varchar(250) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FK5f82ojlyhp51l4n3r3ankt1ph` (`rev`),
  CONSTRAINT `FK5f82ojlyhp51l4n3r3ankt1ph` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_aud`
--

LOCK TABLES `purchase_aud` WRITE;
/*!40000 ALTER TABLE `purchase_aud` DISABLE KEYS */;
INSERT INTO `purchase_aud` VALUES (1,644,0,'2025-04-08 09:33:40','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',3,71),(2,649,0,'2025-04-08 10:10:51','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',6,72),(3,671,0,'2025-04-08 12:25:49','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',3,74),(4,672,0,'2025-04-08 12:35:54','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',3,75),(5,673,0,'2025-04-08 12:40:31','Sat Apr 05 00:00:00 CAT 2025','\0','2025-04-05 10:21:40',3,76),(6,743,0,'2025-04-09 11:53:31','Tue Apr 08 00:00:00 CAT 2025','\0','2025-04-08 14:30:23',3,84),(7,753,0,'2025-04-09 12:51:43','Tue Apr 08 00:00:00 CAT 2025','\0','2025-04-08 14:30:23',3,87);
/*!40000 ALTER TABLE `purchase_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases_lines`
--

DROP TABLE IF EXISTS `purchases_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases_lines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(70) NOT NULL,
  `dest_id` bigint(20) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `purchased_qty` int(11) NOT NULL,
  `source_id` bigint(20) NOT NULL,
  `supplier` int(11) DEFAULT NULL,
  `unit_cost` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `weighttype` varchar(70) NOT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  `purchase_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKapa8dna53xsg8no2yo60l3oo8` (`account_id`),
  KEY `FK6sq19shvl288vti9n0joe9qxd` (`items_id`),
  KEY `FKb43500ppk5imr44no9akghbej` (`purchase_id`),
  CONSTRAINT `FK6sq19shvl288vti9n0joe9qxd` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`),
  CONSTRAINT `FKapa8dna53xsg8no2yo60l3oo8` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKb43500ppk5imr44no9akghbej` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases_lines`
--

LOCK TABLES `purchases_lines` WRITE;
/*!40000 ALTER TABLE `purchases_lines` DISABLE KEYS */;
INSERT INTO `purchases_lines` VALUES (1,'OK',0,'\0',540,60,0,0,50,'1',1,34,1),(2,'OK',0,'\0',1,2,0,0,2000,'1',1,35,2),(3,'OK',0,'\0',1,66,0,0,35000,'1',1,36,3),(4,'OK',0,'\0',1,65,0,0,35000,'1',1,36,4),(5,'OK',0,'\0',1,64,0,0,27200,'1',1,37,5),(6,'OK',0,'\0',1,79,0,0,27200,'1',1,34,6),(7,'OK',0,'\0',1,81,0,0,36518,'2',1,38,7);
/*!40000 ALTER TABLE `purchases_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases_lines_aud`
--

DROP TABLE IF EXISTS `purchases_lines_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases_lines_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `description` varchar(70) DEFAULT NULL,
  `dest_id` bigint(20) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `purchased_qty` int(11) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `supplier` int(11) DEFAULT NULL,
  `unit_cost` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `weighttype` varchar(70) DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  `purchase_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKq70x1uulx9cwweqset6p8pv9` (`rev`),
  CONSTRAINT `FKq70x1uulx9cwweqset6p8pv9` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases_lines_aud`
--

LOCK TABLES `purchases_lines_aud` WRITE;
/*!40000 ALTER TABLE `purchases_lines_aud` DISABLE KEYS */;
INSERT INTO `purchases_lines_aud` VALUES (1,644,0,'OK',0,'\0',540,60,0,0,50,'1',1,34,1),(2,649,0,'OK',0,'\0',1,2,0,0,2000,'1',1,35,2),(3,671,0,'OK',0,'\0',1,66,0,0,35000,'1',1,36,3),(4,672,0,'OK',0,'\0',1,65,0,0,35000,'1',1,36,4),(5,673,0,'OK',0,'\0',1,64,0,0,27200,'1',1,37,5),(6,743,0,'OK',0,'\0',1,79,0,0,27200,'1',1,34,6),(7,753,0,'OK',0,'\0',1,81,0,0,36518,'2',1,38,7);
/*!40000 ALTER TABLE `purchases_lines_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revinfo`
--

DROP TABLE IF EXISTS `revinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `revinfo` (
  `rev` int(11) NOT NULL AUTO_INCREMENT,
  `revtstmp` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`rev`)
) ENGINE=InnoDB AUTO_INCREMENT=829 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revinfo`
--

LOCK TABLES `revinfo` WRITE;
/*!40000 ALTER TABLE `revinfo` DISABLE KEYS */;
INSERT INTO `revinfo` VALUES (1,1743451200763),(2,1743451200790),(3,1743451200814),(4,1743451200822),(5,1743451200830),(6,1743451200838),(7,1743451200847),(8,1743451200855),(9,1743451200864),(10,1743451200884),(11,1743451200943),(12,1743451200967),(13,1743451200981),(14,1743451200990),(15,1743451201010),(16,1743451201023),(17,1743451201032),(18,1743451201040),(19,1743451201047),(20,1743451201065),(21,1743451201074),(22,1743451201081),(23,1743451201090),(24,1743451201098),(25,1743451201106),(26,1743451201115),(27,1743451201124),(28,1743451201136),(29,1743451201158),(30,1743451201174),(31,1743451201193),(32,1743451201274),(33,1743451201301),(34,1743451201314),(35,1743451201331),(36,1743451201339),(37,1743451201347),(38,1743451201356),(39,1743451201364),(40,1743451201372),(41,1743451201741),(42,1743451201844),(43,1743451201863),(44,1743451201872),(45,1743451201889),(46,1743451201906),(47,1743451201922),(48,1743451201939),(49,1743451201947),(50,1743451201980),(51,1743451202016),(52,1743451202033),(53,1743451202049),(54,1743451202069),(55,1743451202099),(56,1743451202116),(57,1743451202124),(58,1743451202133),(59,1743451202141),(60,1743451202149),(61,1743451202176),(62,1743451202213),(63,1743451202246),(64,1743451202275),(65,1743451202295),(66,1743451202312),(67,1743451202336),(68,1743452198468),(69,1743452482989),(70,1743500880336),(71,1743500880366),(72,1743510675192),(73,1743510727774),(74,1743510808757),(75,1743511472411),(76,1743511500551),(77,1743512052991),(78,1743512053032),(79,1743512097262),(80,1743513851190),(81,1743514291775),(82,1743515070647),(83,1743515491608),(84,1743516052533),(85,1743516647527),(86,1743517682898),(87,1743517682924),(88,1743517776589),(89,1743518376424),(90,1743518571419),(91,1743518571450),(92,1743518607864),(93,1743520265689),(94,1743520265707),(95,1743520437549),(96,1743520437562),(97,1743581098516),(98,1743581098535),(99,1743581464121),(100,1743581464143),(101,1743581820002),(102,1743581820024),(103,1743581967283),(104,1743581967304),(105,1743581995903),(106,1743581995922),(107,1743583024757),(108,1743583024782),(109,1743586476168),(110,1743586741090),(111,1743586741111),(112,1743586908417),(113,1743586908436),(114,1743587138926),(115,1743588999972),(116,1743589000018),(117,1743589243289),(118,1743589418970),(119,1743589418992),(120,1743589482238),(121,1743589617008),(122,1743589617041),(123,1743589665693),(124,1743589845648),(125,1743589845665),(126,1743589896902),(127,1743590076734),(128,1743590076755),(129,1743590117800),(130,1743590304045),(131,1743590304070),(132,1743590334351),(133,1743590722671),(134,1743590722701),(135,1743590749438),(136,1743595439612),(137,1743595439640),(138,1743596430009),(139,1743597280976),(140,1743597280997),(141,1743597358674),(142,1743597743386),(143,1743597743421),(144,1743597771077),(145,1743600009092),(146,1743600009104),(147,1743600996336),(148,1743600996358),(149,1743601199045),(150,1743601695054),(151,1743601695073),(152,1743602539704),(153,1743604180606),(154,1743604180622),(155,1743604202847),(156,1743605296134),(157,1743605296155),(158,1743605730975),(159,1743605730999),(160,1743605767759),(161,1743605772296),(162,1743606315572),(163,1743606821031),(164,1743664788540),(165,1743664788584),(166,1743664877938),(167,1743665965900),(168,1743666060298),(169,1743666536416),(170,1743666536444),(171,1743666570504),(172,1743666852902),(173,1743667676480),(174,1743668657519),(175,1743668657536),(176,1743668758033),(177,1743668758049),(178,1743668803143),(179,1743668803177),(180,1743668856185),(181,1743668856201),(182,1743669468460),(183,1743669783196),(184,1743669783225),(185,1743669808034),(186,1743670119437),(187,1743670119464),(188,1743670181003),(189,1743670469269),(190,1743670751869),(191,1743670979340),(192,1743670979373),(193,1743671805786),(194,1743671805809),(195,1743671839895),(196,1743672533267),(197,1743673020035),(198,1743673020046),(199,1743673085034),(200,1743673310724),(201,1743673310757),(202,1743674208929),(203,1743674208949),(204,1743674606732),(205,1743686595841),(206,1743686595860),(207,1743688754943),(208,1743688754968),(209,1743761642783),(210,1743761642797),(211,1743771793322),(212,1743772405282),(213,1743772722777),(214,1743779055684),(215,1743784153388),(216,1743784153688),(217,1743784240105),(218,1743784240580),(219,1743839637934),(220,1743839638073),(221,1743840969197),(222,1743840969670),(223,1743840969771),(224,1743840969918),(225,1743840969935),(226,1743840969979),(227,1743840970055),(228,1743840970226),(229,1743840970445),(230,1743840970501),(231,1743840970546),(232,1743840970612),(233,1743840970684),(234,1743841000079),(235,1743841000259),(236,1743841000281),(237,1743841000297),(238,1743841000325),(239,1743841000362),(240,1743841000383),(241,1743841000407),(242,1743845853756),(243,1743845853786),(244,1743845910733),(245,1743845910754),(246,1743845994865),(247,1743845994885),(248,1743846038508),(249,1743846038531),(250,1743846091296),(251,1743846091314),(252,1743846144510),(253,1743846144531),(254,1743846285005),(255,1743846285033),(256,1743846386551),(257,1743846386589),(258,1743846451619),(259,1743846451642),(260,1743846518382),(261,1743846518404),(262,1743846582129),(263,1743846582144),(264,1743846645080),(265,1743846645106),(266,1743846734402),(267,1743846734420),(268,1743846804061),(269,1743846804082),(270,1743846863872),(271,1743846863894),(272,1743846952741),(273,1743846952758),(274,1743847017213),(275,1743847017238),(276,1743847120080),(277,1743847120096),(278,1743847221547),(279,1743847221560),(280,1743847286649),(281,1743847286666),(282,1743847966003),(283,1743848804686),(284,1743848854156),(285,1743848970799),(286,1743849004981),(287,1743849077166),(288,1743849194782),(289,1743849226711),(290,1743849282039),(291,1743849315769),(292,1743849665794),(293,1743849700140),(294,1743849719537),(295,1743850242732),(296,1743850242745),(297,1743850254818),(298,1743853045349),(299,1743853166074),(300,1743853195229),(301,1743853218166),(302,1743853258753),(303,1743853275701),(304,1743853312122),(305,1743853340725),(306,1743853357561),(307,1743853369973),(308,1743853405192),(309,1743853441048),(310,1743853647091),(311,1743853647114),(312,1743853656346),(313,1743853670308),(314,1743860498211),(315,1743860498238),(316,1743860569803),(317,1743860569822),(318,1743860669193),(319,1743860669213),(320,1743860741958),(321,1743860741976),(322,1743860984701),(323,1743860984727),(324,1743861007915),(325,1743861007932),(326,1743861061232),(327,1743861061250),(328,1743861111026),(329,1743861111042),(330,1743861142544),(331,1743861142553),(332,1743861190962),(333,1743861190983),(334,1743861473168),(335,1743861657880),(336,1743861682064),(337,1743861713479),(338,1743861759824),(339,1743861783124),(340,1743861797556),(341,1743861801274),(342,1743861821896),(343,1743861827787),(344,1743861835352),(345,1743861853310),(346,1743861861429),(347,1743861980318),(348,1743862033016),(349,1743862227284),(350,1743862283875),(351,1743862323896),(352,1743863415641),(353,1743863441857),(354,1743863500424),(355,1743863538157),(356,1743863661542),(357,1743863679103),(358,1743863772160),(359,1743863805176),(360,1743863917895),(361,1743863942774),(362,1743864119433),(363,1743864171450),(364,1743864236442),(365,1743864261445),(366,1743864323280),(367,1743864346615),(368,1743864383033),(369,1743864403834),(370,1743864447298),(371,1743864469496),(372,1743864492322),(373,1743864761710),(374,1743864927657),(375,1743864956390),(376,1743865129418),(377,1743865160496),(378,1743865206237),(379,1743865597406),(380,1743865696823),(381,1743865732704),(382,1743865748450),(383,1743868824957),(384,1743868824975),(385,1743880033046),(386,1743880096159),(387,1743880096174),(388,1743880155635),(389,1743880155645),(390,1743880177521),(391,1743882677494),(392,1743883085541),(393,1743883441711),(394,1743883441730),(395,1743883550648),(396,1743883550665),(397,1743883694514),(398,1743883694537),(399,1743883746057),(400,1743883746084),(401,1743883805516),(402,1743883805531),(403,1743883958804),(404,1743883958826),(405,1743884035153),(406,1743884035165),(407,1743884180457),(408,1743884180485),(409,1743884180537),(410,1743884180549),(411,1743884229487),(412,1743884229496),(413,1743884272931),(414,1743884293095),(415,1743884305115),(416,1743884326426),(417,1743884348485),(418,1743884381249),(419,1743884417756),(420,1743884443417),(421,1743884522171),(422,1743884573550),(423,1743884589435),(424,1743884618331),(425,1743884637096),(426,1743884709250),(427,1743884730726),(428,1743884759620),(429,1743884791190),(430,1743884815897),(431,1743884850749),(432,1743884887241),(433,1743884916151),(434,1743884974365),(435,1743884990105),(436,1743885006735),(437,1743885049955),(438,1743885068316),(439,1743885092902),(440,1743885107195),(441,1743885123245),(442,1743885308864),(443,1743885308882),(444,1743886439896),(445,1743932314513),(446,1743932404691),(447,1743932457859),(448,1743932682220),(449,1743932737945),(450,1743932821523),(451,1743932982567),(452,1743933014552),(453,1743933104370),(454,1743933174887),(455,1743933230523),(456,1743933260506),(457,1743933298747),(458,1743933325343),(459,1743933371540),(460,1743933407489),(461,1743933446567),(462,1743933472316),(463,1743933496138),(464,1743933524668),(465,1743933555392),(466,1743933581731),(467,1743933654227),(468,1743933695947),(469,1743933720307),(470,1743933777540),(471,1743934859980),(472,1743935113617),(473,1743935162259),(474,1743935190253),(475,1743935298405),(476,1743935334063),(477,1743935389842),(478,1743935421127),(479,1743935463674),(480,1743935489039),(481,1743935526110),(482,1743935550859),(483,1743935583827),(484,1743935607377),(485,1743935665419),(486,1743935709242),(487,1743935764149),(488,1743935794575),(489,1743935836932),(490,1743935856095),(491,1743936979797),(492,1743938449282),(493,1743938482891),(494,1743943183655),(495,1743943183672),(496,1743943200778),(497,1743943695837),(498,1743943695855),(499,1743943895355),(500,1743943895388),(501,1743943927727),(502,1743943927748),(503,1743943988687),(504,1743943988702),(505,1743944016567),(506,1743944016584),(507,1743944100844),(508,1743944100862),(509,1743944155025),(510,1743944155048),(511,1743944192237),(512,1743944192260),(513,1743944294913),(514,1743944294931),(515,1743944360015),(516,1743944371352),(517,1743944394025),(518,1743944410240),(519,1743944421587),(520,1743944450431),(521,1743944464506),(522,1743944478722),(523,1743944487095),(524,1743944497622),(525,1743944508172),(526,1743944521916),(527,1743944534736),(528,1743944554878),(529,1743944568540),(530,1743944582027),(531,1743944591139),(532,1743944605760),(533,1743944624804),(534,1743944635461),(535,1743944649402),(536,1743944662359),(537,1743944673867),(538,1743944686077),(539,1743945221892),(540,1743945415333),(541,1743945452932),(542,1743945493234),(543,1743945979133),(544,1743946013197),(545,1743946055992),(546,1743946080145),(547,1743946118294),(548,1743946147759),(549,1743946227833),(550,1743946252157),(551,1743946294434),(552,1743946393794),(553,1743946427297),(554,1743946449242),(555,1743946466120),(556,1743946483619),(557,1743946547686),(558,1743946571948),(559,1743946853226),(560,1743946870534),(561,1743946917361),(562,1743946941367),(563,1743946995072),(564,1743947018583),(565,1743947056710),(566,1743947075835),(567,1743947115699),(568,1743947141529),(569,1743947786950),(570,1743947786971),(571,1743947816069),(572,1743947816102),(573,1743947830966),(574,1743948588851),(575,1743948623824),(576,1743948677055),(577,1743948706362),(578,1743948874364),(579,1743948901289),(580,1743949019931),(581,1743949098909),(582,1743949130105),(583,1743949217364),(584,1743949237288),(585,1743964512990),(586,1743964513004),(587,1743964588935),(588,1743964588950),(589,1743964630776),(590,1743964630797),(591,1743964650195),(592,1743964650214),(593,1743964822481),(594,1743964822495),(595,1743964868606),(596,1743964868623),(597,1743964900716),(598,1743964900732),(599,1743964965386),(600,1743964965409),(601,1743965004407),(602,1743965034487),(603,1743965051038),(604,1743965064282),(605,1743965074378),(606,1743965088433),(607,1743965100705),(608,1743965112563),(609,1743965135208),(610,1743965149794),(611,1743965165237),(612,1743965178357),(613,1743965194713),(614,1743965203539),(615,1743965213253),(616,1743965220848),(617,1743965228752),(618,1743965244398),(619,1743965252468),(620,1743965260919),(621,1743965271124),(622,1743965283250),(623,1743965292003),(624,1743965299722),(625,1743965308242),(626,1743965591532),(627,1743965655434),(628,1743965683976),(629,1743965706943),(630,1743965726461),(631,1743965999788),(632,1743966205733),(633,1743966434975),(634,1743966485188),(635,1743966552126),(636,1743966571404),(637,1743966684727),(638,1743966874565),(639,1744096322535),(640,1744096322556),(641,1744096363722),(642,1744097386018),(643,1744097386030),(644,1744097620907),(645,1744098323833),(646,1744098926834),(647,1744098926853),(648,1744098971145),(649,1744099851401),(650,1744100705913),(651,1744100705933),(652,1744101079990),(653,1744101080004),(654,1744101092071),(655,1744101629651),(656,1744102002608),(657,1744102002629),(658,1744102023030),(659,1744104684047),(660,1744104684069),(661,1744104732981),(662,1744106600998),(663,1744106601030),(664,1744106616313),(665,1744106751925),(666,1744106751952),(667,1744106852345),(668,1744107011132),(669,1744107011147),(670,1744107028236),(671,1744107949320),(672,1744108554880),(673,1744108831375),(674,1744108872093),(675,1744108872108),(676,1744108883772),(677,1744109206457),(678,1744109206474),(679,1744109244207),(680,1744109514183),(681,1744111533517),(682,1744111533530),(683,1744111551538),(684,1744112226062),(685,1744112337528),(686,1744113521916),(687,1744113521933),(688,1744113539747),(689,1744114298779),(690,1744114298791),(691,1744114313618),(692,1744116101885),(693,1744116101918),(694,1744116136727),(695,1744119451738),(696,1744119451753),(697,1744119562723),(698,1744120242990),(699,1744120288463),(700,1744121132673),(701,1744121132699),(702,1744121165995),(703,1744121392711),(704,1744121392729),(705,1744121531949),(706,1744122154313),(707,1744122154331),(708,1744122233274),(709,1744122547084),(710,1744122602865),(711,1744124659172),(712,1744124659192),(713,1744124690265),(714,1744125068736),(715,1744125194990),(716,1744183888348),(717,1744183888365),(718,1744183914103),(719,1744184188577),(720,1744184188603),(721,1744184220569),(722,1744184472170),(723,1744184472184),(724,1744184492458),(725,1744185486309),(726,1744185635719),(727,1744185861778),(728,1744185861798),(729,1744185879634),(730,1744186388869),(731,1744186388890),(732,1744186463278),(733,1744186820730),(734,1744187089650),(735,1744188391594),(736,1744188391615),(737,1744188953349),(738,1744189580077),(739,1744189862132),(740,1744192358911),(741,1744192358943),(742,1744192359644),(743,1744192411196),(744,1744193754825),(745,1744193754839),(746,1744193775045),(747,1744194835251),(748,1744194864755),(749,1744195064905),(750,1744195137046),(751,1744195800420),(752,1744195800444),(753,1744195903741),(754,1744195939399),(755,1744196009179),(756,1744196009196),(757,1744196024999),(758,1744196032412),(759,1744196510553),(760,1744196666191),(761,1744196666214),(762,1744196689901),(763,1744196948162),(764,1744197258884),(765,1744197258902),(766,1744197646204),(767,1744197646230),(768,1744197675840),(769,1744197675860),(770,1744197699733),(771,1744197707423),(772,1744197707436),(773,1744198119494),(774,1744198668481),(775,1744198668502),(776,1744198709101),(777,1744198727853),(778,1744199127713),(779,1744199521667),(780,1744199881270),(781,1744199921279),(782,1744200306876),(783,1744200340149),(784,1744200719412),(785,1744200933333),(786,1744200933361),(787,1744200949531),(788,1744201198287),(789,1744201249464),(790,1744201440277),(791,1744201440303),(792,1744202836316),(793,1744202836345),(794,1744202849779),(795,1744202943985),(796,1744203020361),(797,1744203154246),(798,1744203154269),(799,1744203321577),(800,1744203436817),(801,1744205315440),(802,1744205426867),(803,1744205666610),(804,1744205980836),(805,1744206269804),(806,1744207313124),(807,1744207458587),(808,1744207676121),(809,1744207676170),(810,1744207719368),(811,1744208195720),(812,1744208670085),(813,1744208670103),(814,1744208692629),(815,1744208913372),(816,1744208928124),(817,1744208997090),(818,1744209062359),(819,1744209353172),(820,1744209457285),(821,1744209701916),(822,1744209807546),(823,1744210112252),(824,1744210112274),(825,1744210162346),(826,1744210229392),(827,1744210409540),(828,1744210537017);
/*!40000 ALTER TABLE `revinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'\0','addVessel'),(2,'\0','updateVessel'),(3,'\0','deleteVessel'),(4,'\0','viewVessel'),(5,'\0','addBooking'),(6,'\0','updateBooking'),(7,'\0','deleteBooking'),(8,'\0','viewBooking'),(9,'\0','addGate'),(10,'\0','updateGate'),(11,'\0','deleteGate'),(12,'\0','viewGate'),(13,'\0','addBerthInvoice'),(14,'\0','updateBerthInvoice'),(15,'\0','deleteBerthInvoice'),(16,'\0','viewBerthInvoice'),(17,'\0','addBerthReceipt'),(18,'\0','updateBerthReceipt'),(19,'\0','deleteBerthReceipt'),(20,'\0','viewBerthReceipt'),(21,'\0','addBerthExit'),(22,'\0','updateBerthExit'),(23,'\0','deleteBerthExit'),(24,'\0','viewBerthExit'),(25,'\0','addGateEntry'),(26,'\0','updateGateEntry'),(27,'\0','deleteGateEntry'),(28,'\0','viewGateEntry'),(29,'\0','addGateInvoice'),(30,'\0','updateGateInvoice'),(31,'\0','deleteGateInvoice'),(32,'\0','viewGateInvoice'),(33,'\0','addGateReceipt'),(34,'\0','updateGateReceipt'),(35,'\0','deleteGateReceipt'),(36,'\0','viewGateReceipt'),(37,'\0','addGateExit'),(38,'\0','updateGateExit'),(39,'\0','deleteGateExit'),(40,'\0','viewGateExit'),(41,'\0','addOpsArrivalNote'),(42,'\0','updateOpsArrivalNote'),(43,'\0','deleteOpsArrivalNote'),(44,'\0','viewOpsArrivalNote'),(45,'\0','addOpsInvoice'),(46,'\0','updateOpsInvoice'),(47,'\0','deleteOpsInvoice'),(48,'\0','viewOpsInvoice'),(49,'\0','addOpsReceipt'),(50,'\0','updateOpsReceipt'),(51,'\0','deleteOpsReceipt'),(52,'\0','viewOpsReceipt'),(53,'\0','addOpsExit'),(54,'\0','updateOpsExit'),(55,'\0','deleteOpsExit'),(56,'\0','viewOpsExit'),(57,'\0','addUsers'),(58,'\0','updateUsers'),(59,'\0','deleteUsers'),(60,'\0','viewUsers'),(61,'\0','dashboard'),(62,'\0','reports'),(63,'\0','Vessel'),(64,'\0','Booking'),(65,'\0','Gate'),(66,'\0','BerthInvoice'),(67,'\0','BerthReceipt'),(68,'\0','BerthExit'),(69,'\0','GateEntry'),(70,'\0','GateInvoice'),(71,'\0','GateReceipt'),(72,'\0','GateExit'),(73,'\0','OpsArrivalNote'),(74,'\0','OpsInvoice'),(75,'\0','OpsReceipt'),(76,'\0','OpsExit'),(77,'\0','Users');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_aud`
--

DROP TABLE IF EXISTS `roles_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKt0mnl3rej2p0h9gxnbalf2kdd` (`rev`),
  CONSTRAINT `FKt0mnl3rej2p0h9gxnbalf2kdd` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_aud`
--

LOCK TABLES `roles_aud` WRITE;
/*!40000 ALTER TABLE `roles_aud` DISABLE KEYS */;
INSERT INTO `roles_aud` VALUES (1,41,0,'\0','addVessel'),(1,221,1,'\0','addVessel'),(1,234,1,'\0','addVessel'),(2,41,0,'\0','updateVessel'),(2,221,1,'\0','updateVessel'),(2,234,1,'\0','updateVessel'),(3,41,0,'\0','deleteVessel'),(3,221,1,'\0','deleteVessel'),(3,234,1,'\0','deleteVessel'),(4,41,0,'\0','viewVessel'),(4,221,1,'\0','viewVessel'),(4,234,1,'\0','viewVessel'),(5,41,0,'\0','addBooking'),(5,221,1,'\0','addBooking'),(5,234,1,'\0','addBooking'),(6,41,0,'\0','updateBooking'),(6,221,1,'\0','updateBooking'),(6,234,1,'\0','updateBooking'),(7,41,0,'\0','deleteBooking'),(7,221,1,'\0','deleteBooking'),(7,234,1,'\0','deleteBooking'),(8,41,0,'\0','viewBooking'),(8,221,1,'\0','viewBooking'),(8,234,1,'\0','viewBooking'),(9,41,0,'\0','addGate'),(9,221,1,'\0','addGate'),(9,234,1,'\0','addGate'),(10,41,0,'\0','updateGate'),(10,221,1,'\0','updateGate'),(10,234,1,'\0','updateGate'),(11,41,0,'\0','deleteGate'),(11,221,1,'\0','deleteGate'),(11,234,1,'\0','deleteGate'),(12,41,0,'\0','viewGate'),(12,221,1,'\0','viewGate'),(12,234,1,'\0','viewGate'),(13,41,0,'\0','addBerthInvoice'),(13,221,1,'\0','addBerthInvoice'),(13,234,1,'\0','addBerthInvoice'),(14,41,0,'\0','updateBerthInvoice'),(14,221,1,'\0','updateBerthInvoice'),(14,234,1,'\0','updateBerthInvoice'),(15,41,0,'\0','deleteBerthInvoice'),(15,221,1,'\0','deleteBerthInvoice'),(15,234,1,'\0','deleteBerthInvoice'),(16,41,0,'\0','viewBerthInvoice'),(16,221,1,'\0','viewBerthInvoice'),(16,234,1,'\0','viewBerthInvoice'),(17,41,0,'\0','addBerthReceipt'),(17,221,1,'\0','addBerthReceipt'),(17,234,1,'\0','addBerthReceipt'),(18,41,0,'\0','updateBerthReceipt'),(18,221,1,'\0','updateBerthReceipt'),(18,234,1,'\0','updateBerthReceipt'),(19,41,0,'\0','deleteBerthReceipt'),(19,221,1,'\0','deleteBerthReceipt'),(19,234,1,'\0','deleteBerthReceipt'),(20,41,0,'\0','viewBerthReceipt'),(20,221,1,'\0','viewBerthReceipt'),(20,234,1,'\0','viewBerthReceipt'),(21,41,0,'\0','addBerthExit'),(21,221,1,'\0','addBerthExit'),(21,234,1,'\0','addBerthExit'),(22,41,0,'\0','updateBerthExit'),(22,221,1,'\0','updateBerthExit'),(22,234,1,'\0','updateBerthExit'),(23,41,0,'\0','deleteBerthExit'),(23,221,1,'\0','deleteBerthExit'),(23,234,1,'\0','deleteBerthExit'),(24,41,0,'\0','viewBerthExit'),(24,221,1,'\0','viewBerthExit'),(24,234,1,'\0','viewBerthExit'),(25,41,0,'\0','addGateEntry'),(25,221,1,'\0','addGateEntry'),(25,234,1,'\0','addGateEntry'),(26,41,0,'\0','updateGateEntry'),(26,221,1,'\0','updateGateEntry'),(26,234,1,'\0','updateGateEntry'),(27,41,0,'\0','deleteGateEntry'),(27,221,1,'\0','deleteGateEntry'),(27,234,1,'\0','deleteGateEntry'),(28,41,0,'\0','viewGateEntry'),(28,221,1,'\0','viewGateEntry'),(28,234,1,'\0','viewGateEntry'),(29,41,0,'\0','addGateInvoice'),(29,221,1,'\0','addGateInvoice'),(29,234,1,'\0','addGateInvoice'),(30,41,0,'\0','updateGateInvoice'),(30,221,1,'\0','updateGateInvoice'),(30,234,1,'\0','updateGateInvoice'),(31,41,0,'\0','deleteGateInvoice'),(31,221,1,'\0','deleteGateInvoice'),(31,234,1,'\0','deleteGateInvoice'),(32,41,0,'\0','viewGateInvoice'),(32,221,1,'\0','viewGateInvoice'),(32,234,1,'\0','viewGateInvoice'),(33,41,0,'\0','addGateReceipt'),(33,221,1,'\0','addGateReceipt'),(33,234,1,'\0','addGateReceipt'),(34,41,0,'\0','updateGateReceipt'),(34,221,1,'\0','updateGateReceipt'),(34,234,1,'\0','updateGateReceipt'),(35,41,0,'\0','deleteGateReceipt'),(35,221,1,'\0','deleteGateReceipt'),(35,234,1,'\0','deleteGateReceipt'),(36,41,0,'\0','viewGateReceipt'),(36,221,1,'\0','viewGateReceipt'),(36,234,1,'\0','viewGateReceipt'),(37,41,0,'\0','addGateExit'),(37,221,1,'\0','addGateExit'),(37,234,1,'\0','addGateExit'),(38,41,0,'\0','updateGateExit'),(38,221,1,'\0','updateGateExit'),(38,234,1,'\0','updateGateExit'),(39,41,0,'\0','deleteGateExit'),(39,221,1,'\0','deleteGateExit'),(39,234,1,'\0','deleteGateExit'),(40,41,0,'\0','viewGateExit'),(40,221,1,'\0','viewGateExit'),(40,234,1,'\0','viewGateExit'),(41,41,0,'\0','addOpsArrivalNote'),(41,221,1,'\0','addOpsArrivalNote'),(41,234,1,'\0','addOpsArrivalNote'),(42,41,0,'\0','updateOpsArrivalNote'),(42,221,1,'\0','updateOpsArrivalNote'),(42,234,1,'\0','updateOpsArrivalNote'),(43,41,0,'\0','deleteOpsArrivalNote'),(43,221,1,'\0','deleteOpsArrivalNote'),(43,234,1,'\0','deleteOpsArrivalNote'),(44,41,0,'\0','viewOpsArrivalNote'),(44,221,1,'\0','viewOpsArrivalNote'),(44,234,1,'\0','viewOpsArrivalNote'),(45,41,0,'\0','addOpsInvoice'),(45,221,1,'\0','addOpsInvoice'),(45,234,1,'\0','addOpsInvoice'),(46,41,0,'\0','updateOpsInvoice'),(46,221,1,'\0','updateOpsInvoice'),(46,234,1,'\0','updateOpsInvoice'),(47,41,0,'\0','deleteOpsInvoice'),(47,221,1,'\0','deleteOpsInvoice'),(47,234,1,'\0','deleteOpsInvoice'),(48,41,0,'\0','viewOpsInvoice'),(48,221,1,'\0','viewOpsInvoice'),(48,234,1,'\0','viewOpsInvoice'),(49,41,0,'\0','addOpsReceipt'),(49,221,1,'\0','addOpsReceipt'),(49,234,1,'\0','addOpsReceipt'),(50,41,0,'\0','updateOpsReceipt'),(50,221,1,'\0','updateOpsReceipt'),(50,234,1,'\0','updateOpsReceipt'),(51,41,0,'\0','deleteOpsReceipt'),(51,221,1,'\0','deleteOpsReceipt'),(51,234,1,'\0','deleteOpsReceipt'),(52,41,0,'\0','viewOpsReceipt'),(52,221,1,'\0','viewOpsReceipt'),(52,234,1,'\0','viewOpsReceipt'),(53,41,0,'\0','addOpsExit'),(53,221,1,'\0','addOpsExit'),(53,234,1,'\0','addOpsExit'),(54,41,0,'\0','updateOpsExit'),(54,221,1,'\0','updateOpsExit'),(54,234,1,'\0','updateOpsExit'),(55,41,0,'\0','deleteOpsExit'),(55,221,1,'\0','deleteOpsExit'),(55,234,1,'\0','deleteOpsExit'),(56,41,0,'\0','viewOpsExit'),(56,221,1,'\0','viewOpsExit'),(56,234,1,'\0','viewOpsExit'),(57,41,0,'\0','addUsers'),(57,221,1,'\0','addUsers'),(57,234,1,'\0','addUsers'),(58,41,0,'\0','updateUsers'),(58,221,1,'\0','updateUsers'),(58,234,1,'\0','updateUsers'),(59,41,0,'\0','deleteUsers'),(59,221,1,'\0','deleteUsers'),(59,234,1,'\0','deleteUsers'),(60,41,0,'\0','viewUsers'),(60,221,1,'\0','viewUsers'),(60,234,1,'\0','viewUsers'),(61,41,0,'\0','dashboard'),(61,221,1,'\0','dashboard'),(61,234,1,'\0','dashboard'),(62,41,0,'\0','reports'),(62,221,1,'\0','reports'),(62,234,1,'\0','reports'),(63,41,0,'\0','Vessel'),(64,41,0,'\0','Booking'),(65,41,0,'\0','Gate'),(66,41,0,'\0','BerthInvoice'),(67,41,0,'\0','BerthReceipt'),(68,41,0,'\0','BerthExit'),(69,41,0,'\0','GateEntry'),(70,41,0,'\0','GateInvoice'),(71,41,0,'\0','GateReceipt'),(72,41,0,'\0','GateExit'),(73,41,0,'\0','OpsArrivalNote'),(74,41,0,'\0','OpsInvoice'),(75,41,0,'\0','OpsReceipt'),(76,41,0,'\0','OpsExit'),(77,41,0,'\0','Users');
/*!40000 ALTER TABLE `roles_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_purchase_journal`
--

DROP TABLE IF EXISTS `sale_purchase_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_purchase_journal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `current_qty` int(11) NOT NULL,
  `date_time` varchar(70) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `remaining_qty` int(11) NOT NULL,
  `sale_or_purchase` varchar(70) NOT NULL,
  `sale_unit_cost` int(11) NOT NULL,
  `sold_purch_qty` int(11) NOT NULL,
  `total_paid` int(11) NOT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKedw71gdtn1ldjql6v1y9kv5y8` (`items_id`),
  CONSTRAINT `FKedw71gdtn1ldjql6v1y9kv5y8` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_purchase_journal`
--

LOCK TABLES `sale_purchase_journal` WRITE;
/*!40000 ALTER TABLE `sale_purchase_journal` DISABLE KEYS */;
INSERT INTO `sale_purchase_journal` VALUES (1,0,'Sat Apr 05 00:00:00 CAT 2025','\0',540,'purchase',0,540,0,34),(2,0,'Sat Apr 05 00:00:00 CAT 2025','\0',1,'purchase',0,1,0,35),(3,0,'Sat Apr 05 00:00:00 CAT 2025','\0',1,'purchase',0,1,0,36),(4,1,'Sat Apr 05 00:00:00 CAT 2025','\0',2,'purchase',0,1,0,36),(5,0,'Sat Apr 05 00:00:00 CAT 2025','\0',1,'purchase',0,1,0,37),(6,540,'Tue Apr 08 00:00:00 CAT 2025','\0',541,'purchase',0,1,0,34),(7,0,'Tue Apr 08 00:00:00 CAT 2025','\0',1,'purchase',0,1,0,38);
/*!40000 ALTER TABLE `sale_purchase_journal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_purchase_journal_aud`
--

DROP TABLE IF EXISTS `sale_purchase_journal_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_purchase_journal_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `current_qty` int(11) DEFAULT NULL,
  `date_time` varchar(70) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `remaining_qty` int(11) DEFAULT NULL,
  `sale_or_purchase` varchar(70) DEFAULT NULL,
  `sale_unit_cost` int(11) DEFAULT NULL,
  `sold_purch_qty` int(11) DEFAULT NULL,
  `total_paid` int(11) DEFAULT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKbvjxlnmujfyhdqbuj29606b0s` (`rev`),
  CONSTRAINT `FKbvjxlnmujfyhdqbuj29606b0s` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_purchase_journal_aud`
--

LOCK TABLES `sale_purchase_journal_aud` WRITE;
/*!40000 ALTER TABLE `sale_purchase_journal_aud` DISABLE KEYS */;
INSERT INTO `sale_purchase_journal_aud` VALUES (1,644,0,0,'Sat Apr 05 00:00:00 CAT 2025','\0',540,'purchase',0,540,0,34),(2,649,0,0,'Sat Apr 05 00:00:00 CAT 2025','\0',1,'purchase',0,1,0,35),(3,671,0,0,'Sat Apr 05 00:00:00 CAT 2025','\0',1,'purchase',0,1,0,36),(4,672,0,1,'Sat Apr 05 00:00:00 CAT 2025','\0',2,'purchase',0,1,0,36),(5,673,0,0,'Sat Apr 05 00:00:00 CAT 2025','\0',1,'purchase',0,1,0,37),(6,743,0,540,'Tue Apr 08 00:00:00 CAT 2025','\0',541,'purchase',0,1,0,34),(7,753,0,0,'Tue Apr 08 00:00:00 CAT 2025','\0',1,'purchase',0,1,0,38);
/*!40000 ALTER TABLE `sale_purchase_journal_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `end_date_time` varchar(250) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `start_date_time` varchar(250) NOT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7fuj41nc4g3c43phhcv4wcu19` (`destination_id`),
  KEY `FK69ysnw71rcrh4s6bh8e7q27kl` (`arrival_id`),
  CONSTRAINT `FK69ysnw71rcrh4s6bh8e7q27kl` FOREIGN KEY (`arrival_id`) REFERENCES `arrival_note` (`id`),
  CONSTRAINT `FK7fuj41nc4g3c43phhcv4wcu19` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_aud`
--

DROP TABLE IF EXISTS `sales_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `end_date_time` varchar(250) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `start_date_time` varchar(250) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKhmuff9a34p7hfmyuq6sf2hpcd` (`rev`),
  CONSTRAINT `FKhmuff9a34p7hfmyuq6sf2hpcd` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_aud`
--

LOCK TABLES `sales_aud` WRITE;
/*!40000 ALTER TABLE `sales_aud` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_lines`
--

DROP TABLE IF EXISTS `sales_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_lines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `purch_unit_cost` int(11) DEFAULT NULL,
  `amount_paid` int(11) DEFAULT NULL,
  `customer` varchar(70) DEFAULT NULL,
  `description` varchar(70) NOT NULL,
  `dest_id` bigint(20) NOT NULL,
  `expected_sale_unit_cost` int(11) DEFAULT NULL,
  `expected_amount` int(11) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `prof_lost_overprof` int(11) DEFAULT NULL,
  `sale_unit_cost` int(11) DEFAULT NULL,
  `sold_qty` int(11) NOT NULL,
  `source_id` bigint(20) NOT NULL,
  `weight` int(11) NOT NULL,
  `weighttype` varchar(70) NOT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  `sale_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhbrnrmvskwo8fk6d6h4256hnk` (`account_id`),
  KEY `FK1i886w28nosh6ra2pfp4sgndo` (`items_id`),
  KEY `FKi3x3s4ngbj8d040bi7sdcerbp` (`sale_id`),
  CONSTRAINT `FK1i886w28nosh6ra2pfp4sgndo` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`),
  CONSTRAINT `FKhbrnrmvskwo8fk6d6h4256hnk` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKi3x3s4ngbj8d040bi7sdcerbp` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_lines`
--

LOCK TABLES `sales_lines` WRITE;
/*!40000 ALTER TABLE `sales_lines` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_lines_aud`
--

DROP TABLE IF EXISTS `sales_lines_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_lines_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `purch_unit_cost` int(11) DEFAULT NULL,
  `amount_paid` int(11) DEFAULT NULL,
  `customer` varchar(70) DEFAULT NULL,
  `description` varchar(70) DEFAULT NULL,
  `dest_id` bigint(20) DEFAULT NULL,
  `expected_sale_unit_cost` int(11) DEFAULT NULL,
  `expected_amount` int(11) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `prof_lost_overprof` int(11) DEFAULT NULL,
  `sale_unit_cost` int(11) DEFAULT NULL,
  `sold_qty` int(11) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `weighttype` varchar(70) DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  `sale_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKfj4mj02qvlhtj48kf8grxm13v` (`rev`),
  CONSTRAINT `FKfj4mj02qvlhtj48kf8grxm13v` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_lines_aud`
--

LOCK TABLES `sales_lines_aud` WRITE;
/*!40000 ALTER TABLE `sales_lines_aud` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales_lines_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tally`
--

DROP TABLE IF EXISTS `tally`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tally` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cargo` varchar(80) NOT NULL,
  `description` varchar(80) NOT NULL,
  `dest_id` bigint(20) NOT NULL,
  `end_date_time` varchar(250) DEFAULT NULL,
  `entry_date` datetime NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `source_id` bigint(20) NOT NULL,
  `start_date_time` varchar(250) DEFAULT NULL,
  `unit` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `weighttype` varchar(250) DEFAULT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `tallyref_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKm25djx2nca7cl2txfbov4pq9b` (`arrival_id`),
  KEY `FKsld1gw0xind7sgp9swdu7mghs` (`destination_id`),
  KEY `FKt8p6ul8lngmxsvuav7x57tjxl` (`tallyref_id`),
  CONSTRAINT `FKm25djx2nca7cl2txfbov4pq9b` FOREIGN KEY (`arrival_id`) REFERENCES `arrival_note` (`id`),
  CONSTRAINT `FKsld1gw0xind7sgp9swdu7mghs` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`),
  CONSTRAINT `FKt8p6ul8lngmxsvuav7x57tjxl` FOREIGN KEY (`tallyref_id`) REFERENCES `tallyref` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tally`
--

LOCK TABLES `tally` WRITE;
/*!40000 ALTER TABLE `tally` DISABLE KEYS */;
INSERT INTO `tally` VALUES (1,'ANGELS STEEL','OK',3,'','2025-04-01 16:02:19','\0',18,'',1,10000,'1',1,1,1),(2,'INDIAN RICE','OK',1,'','2025-04-02 17:05:15','\0',20,'',1400,25,'1',2,1,2),(3,'INDIAN RICE','OK',0,'','2025-04-02 17:13:41','\0',0,'',1400,25,'1',3,1,3),(4,'CEMENT','OK',0,'','2025-04-03 10:59:11','\0',7,'',700,50,'1',4,5,4),(5,'CEMENT','OK',1,'','2025-04-03 16:30:15','\0',11,'',1,35000,'1',5,1,5),(6,'CEMENT','OK',3,'','2025-04-03 16:31:40','\0',11,'',1,35000,'1',6,1,6),(7,'CEMENT','OK',5,'','2025-04-03 16:34:21','\0',28,'',1,5000,'1',7,1,7),(8,'CEMENT','OK',2,'','2025-04-03 16:36:12','\0',31,'',1,10688,'1',8,1,8),(9,'CEMENT','OK',5,'','2025-04-03 16:38:37','\0',29,'',1,8240,'1',9,1,9),(10,'CEMENT','OK',4,'','2025-04-03 16:41:59','\0',11,'',1,35000,'1',10,1,10),(11,'CEMENT','OK',2,'','2025-04-03 16:43:56','\0',25,'',1,35000,'1',11,1,11),(12,'CEMENT','OK',3,'','2025-04-03 16:45:23','\0',11,'',1,35000,'1',12,1,12),(13,'CEMENT','OK',1,'','2025-04-03 16:46:23','\0',11,'',1,35000,'1',13,1,13),(14,'CEMENT','OK',7,'','2025-04-03 16:47:27','\0',11,'',1,35000,'1',14,1,14),(15,'CEMENT','OK',8,'','2025-04-03 16:48:12','\0',11,'',1,35000,'1',15,1,15),(16,'CEMENT','OK',7,'','2025-04-03 16:55:27','\0',11,'',1,35000,'1',16,1,16),(17,'CEMENT','OK',9,'','2025-04-03 16:58:49','\0',24,'',1,27000,'1',17,1,17),(18,'CEMENT','OK',2,'','2025-04-03 17:00:06','\0',24,'',1,26840,'1',18,1,18),(19,'CEEMNT','OK',1,'','2025-04-04 11:38:34','\0',3,'',1,4300,'1',19,4,19),(20,'CEMENT','OK',4,'','2025-04-04 11:40:57','\0',8,'',1,4000,'1',20,4,20),(21,'UKNOWN','OK',2,'','2025-04-04 11:45:37','\0',1,'',1,35000,'1',21,4,21),(22,'UKNOWN','OK',12,'','2025-04-04 11:49:42','\0',5,'',1,34950,'1',22,5,22),(23,'UKNOWN','OK',16,'','2025-04-04 11:51:44','\0',2,'',1,3500,'1',23,5,23),(24,'UKNOWN','OK',2,'','2025-04-04 11:53:50','\0',10,'',1,35000,'1',24,1,24),(25,'UKNOWN','OK',5,'','2025-04-04 11:54:58','\0',17,'',1,35000,'1',25,1,25),(26,'UKNOWN','OK',1,'','2025-04-04 11:56:11','\0',4,'',1,30000,'1',26,1,26),(27,'UKNOWN','OK',3,'','2025-04-04 11:57:26','\0',17,'',1,35000,'1',27,1,27),(28,'UKNOWN','OK',4,'','2025-04-04 11:58:16','\0',4,'',1,35000,'1',28,1,28),(29,'UKNOWN','OK',2,'','2025-04-04 11:59:15','\0',11,'',1,24000,'1',29,1,29),(30,'UKNOWN','OK',4,'','2025-04-04 12:00:54','\0',4,'',1,30000,'1',30,1,30),(31,'UKNOWN','OK',4,'','2025-04-04 12:02:00','\0',3,'',1,35000,'1',31,1,31),(32,'UKNOWN','OK',2,'','2025-04-04 12:20:59','\0',14,'',1,27000,'1',32,1,32),(33,'UKNOWN','OK',3,'','2025-04-04 12:26:02','\0',10,'',1,135000,'1',33,1,33),(34,'UKNOWN','OK',7,'','2025-04-04 12:28:18','\0',3,'',1,27000,'1',34,5,34),(35,'CEMENT','OK',2,'','2025-04-04 12:29:49','\0',2,'',1,30000,'1',35,5,35),(36,'CEMENT','OK',4,'','2025-04-04 12:31:03','\0',5,'',1,27000,'1',36,5,36),(37,'CEMENT','OK',3,'','2025-04-04 12:32:06','\0',4,'',1,27000,'1',37,5,37),(38,'CEMENT','OK',9,'','2025-04-04 12:33:03','\0',4,'',1,26000,'1',38,5,38),(39,'CEMENT','OK',3,'','2025-04-04 12:34:25','\0',2,'',1,10888,'1',39,5,39),(40,'CEMENT','OK',2,'','2025-04-04 12:36:04','\0',3,'',1,26840,'1',40,5,40),(41,'CEMENT','OK',7,'','2025-04-04 12:37:16','\0',3,'',1,25000,'1',41,5,41),(42,'UKNOWN','OK',4,'','2025-04-04 13:20:49','\0',2,'',1,35000,'1',42,1,42),(43,'UKNOWN','OK',2,'','2025-04-05 15:13:41','\0',2,'',1,35000,'1',43,1,43),(44,'CEMENT','OK',3,'','2025-04-05 15:17:32','\0',2,'',1,75000,'1',44,1,44),(45,'CEMENT','OK',5,'','2025-04-05 15:26:19','\0',2,'',1,1800,'1',45,1,45),(46,'CEMENT','OK',2,'','2025-04-05 15:27:35','\0',2,'',1,35000,'1',46,1,46),(47,'CEMENT','OK',3,'','2025-04-05 15:28:38','\0',14,'',1,35000,'1',47,1,47),(48,'CEMENT','OK',3,'','2025-04-05 15:30:27','\0',2,'',1,30000,'1',48,1,48),(49,'CEMENT','OK',3,'','2025-04-05 15:31:34','\0',2,'',1,35000,'1',49,1,49),(50,'CEMENT','OK',4,'','2025-04-05 15:33:47','\0',3,'',1,35000,'1',50,1,50),(51,'CEMENT','OK',9,'','2025-04-05 15:34:26','\0',2,'',1,35000,'1',51,1,51),(52,'CEMENT','OK',2,'','2025-04-05 15:35:47','\0',15,'',1,10887,'1',52,1,52),(53,'CEMENT','OK',4,'','2025-04-05 15:40:53','\0',11,'',1,35000,'1',53,1,53),(54,'CEMENT','OK',5,'','2025-04-05 15:41:57','\0',17,'',1,770000,'1',54,1,54),(55,'CEMENT','OK',2,'','2025-04-05 15:43:15','\0',4,'',1,30000,'1',55,1,55),(56,'CEMENT','OK',2,'','2025-04-05 15:44:16','\0',3,'',1,10000,'1',56,1,56),(57,'CEMENT','OK',2,'','2025-04-05 15:45:15','\0',3,'',1,1800,'1',57,1,57),(58,'CEMENT','OK',6,'','2025-04-05 16:09:48','\0',17,'',1,31000,'1',58,1,58),(59,'CEMENT','OK',8,'','2025-04-05 16:11:17','\0',11,'',1,7000,'1',59,1,59),(60,'CEMENT','OK',5,'','2025-04-05 16:14:34','\0',3,'',1,3744,'1',60,1,60),(61,'CEMENT','OK',1,'','2025-04-05 16:16:59','\0',13,'',1,26000,'1',61,1,61),(62,'CEMENT','OK',2,'','2025-04-05 16:18:18','\0',14,'',1,26750,'1',62,1,62),(63,'CEMENT','OK',3,'','2025-04-05 16:20:17','\0',2,'',1,28100,'1',63,1,63),(64,'CEMENT','OK',5,'','2025-04-06 20:53:11','\0',17,'',1,35000,'1',64,1,64),(65,'CEMENT','OK',4,'','2025-04-06 20:54:43','\0',18,'',1,35000,'1',65,1,65),(66,'CEMENT','OK',2,'','2025-04-06 20:55:26','\0',10,'',1,35000,'1',66,1,66),(67,'CEMENT','OK',2,'','2025-04-06 21:03:25','\0',14,'',1,5000,'1',67,1,67),(68,'CEMENT','OK',4,'','2025-04-06 21:08:05','\0',3,'',1,35000,'1',68,1,68),(69,'CEMENT','OK',4,'','2025-04-06 21:09:12','\0',4,'',1,40000,'1',69,1,69),(70,'CEMENT','OK',14,'','2025-04-06 21:11:24','\0',2,'',1,32000,'1',70,5,70),(71,'SUGAR','OK',3,'','2025-04-08 10:40:29','\0',61,'',1,27050,'1',73,1,71),(72,'COOKING OIL','OK',1,'','2025-04-08 13:37:06','\0',69,'',1,25755,'1',77,1,72),(73,'CEMENT','OK',10,'','2025-04-08 15:50:42','\0',73,'',1,40000,'1',78,1,73),(74,'tubes','OK',10,'','2025-04-08 16:29:07','\0',75,'',1,40,'1',79,1,74),(75,'BEER','OK',6,'','2025-04-08 17:11:08','\0',74,'',1,500,'1',80,1,75),(76,'BEER','OK',6,'','2025-04-09 09:58:06','\0',52,'',1,10000,'1',81,1,76),(77,'CEMENT','OK',7,'','2025-04-09 10:20:20','\0',77,'',1,25000,'1',82,1,77),(78,'ASSORTED ITEMS','OK',8,'','2025-04-09 11:06:20','\0',78,'',1,28130,'3',83,1,78),(79,'CEMENT','OK',11,'','2025-04-09 12:33:55','\0',2,'',1,35000,'1',85,1,79),(80,'CEMENT','OK',6,'','2025-04-09 12:34:24','\0',80,'',1,40000,'1',86,1,80),(81,'cement','OK',10,'','2025-04-09 13:01:50','\0',80,'',1,40000,'1',88,1,81),(82,'tubes','OK',10,'','2025-04-09 13:58:01','\0',18,'',1,250,'3',89,1,82),(83,'BEERA CRATES','OK',10,'','2025-04-09 14:05:06','\0',83,'',1,7790,'2',90,1,83),(84,'CEMENT','OK',11,'','2025-04-09 15:28:35','\0',70,'',1,5000,'1',91,1,84),(85,'CEMENT','OK',11,'','2025-04-09 15:34:26','\0',82,'',1,5000,'1',92,1,85),(86,'CEMENT','OK',11,'','2025-04-09 15:39:40','\0',63,'',1,5000,'1',93,1,86),(87,'CEMENT','OK',11,'','2025-04-09 16:01:53','\0',70,'',1,5000,'1',94,1,87),(88,'ok','OK',10,'','2025-04-09 16:16:35','\0',88,'',1,5,'3',95,1,88),(89,'ok','OK',10,'','2025-04-09 16:28:33','\0',88,'',112,2240,'3',96,1,89),(90,'WHEAT FLOUR','OK',6,'','2025-04-09 16:28:48','\0',32,'',1,8750,'1',97,1,90),(91,'ok','OK',10,'','2025-04-09 16:29:57','\0',88,'',112,20,'3',98,1,91),(92,'NON BASMATI RICE','OK',6,'','2025-04-09 16:35:53','\0',32,'',1,3750,'1',99,1,92),(93,'SUGAR','OK',6,'','2025-04-09 16:41:41','\0',32,'',1,6650,'1',100,1,93),(94,'COOKING OIL','OK',3,'','2025-04-09 16:53:29','\0',89,'',1,25498,'2',101,1,94);
/*!40000 ALTER TABLE `tally` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tally_aud`
--

DROP TABLE IF EXISTS `tally_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tally_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `cargo` varchar(80) DEFAULT NULL,
  `description` varchar(80) DEFAULT NULL,
  `dest_id` bigint(20) DEFAULT NULL,
  `end_date_time` varchar(250) DEFAULT NULL,
  `entry_date` datetime DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `start_date_time` varchar(250) DEFAULT NULL,
  `unit` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `weighttype` varchar(250) DEFAULT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `tallyref_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKb09m3xu1bjkqtdaq7h374acdp` (`rev`),
  CONSTRAINT `FKb09m3xu1bjkqtdaq7h374acdp` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tally_aud`
--

LOCK TABLES `tally_aud` WRITE;
/*!40000 ALTER TABLE `tally_aud` DISABLE KEYS */;
INSERT INTO `tally_aud` VALUES (1,152,0,'ANGELS STEEL','OK',3,'','2025-04-02 16:02:19','\0',18,'',1,10000,'1',1,1,1),(2,162,0,'INDIAN RICE','OK',1,'','2025-04-02 17:05:15','\0',20,'',1400,25,'1',2,1,2),(3,163,0,'INDIAN RICE','OK',0,'','2025-04-02 17:13:41','\0',0,'',1400,25,'1',3,1,3),(4,190,0,'CEMENT','OK',0,'','2025-04-03 10:59:11','\0',7,'',700,50,'1',4,5,4),(5,352,0,'CEMENT','OK',1,'','2025-04-05 16:30:15','\0',11,'',1,35000,'1',5,1,5),(6,354,0,'CEMENT','OK',3,'','2025-04-05 16:31:40','\0',11,'',1,35000,'1',6,1,6),(7,356,0,'CEMENT','OK',5,'','2025-04-05 16:34:21','\0',28,'',1,5000,'1',7,1,7),(8,358,0,'CEMENT','OK',2,'','2025-04-05 16:36:12','\0',31,'',1,10688,'1',8,1,8),(9,360,0,'CEMENT','OK',5,'','2025-04-05 16:38:37','\0',29,'',1,8240,'1',9,1,9),(10,362,0,'CEMENT','OK',4,'','2025-04-05 16:41:59','\0',11,'',1,35000,'1',10,1,10),(11,364,0,'CEMENT','OK',2,'','2025-04-05 16:43:56','\0',25,'',1,35000,'1',11,1,11),(12,366,0,'CEMENT','OK',3,'','2025-04-05 16:45:23','\0',11,'',1,35000,'1',12,1,12),(13,368,0,'CEMENT','OK',1,'','2025-04-05 16:46:23','\0',11,'',1,35000,'1',13,1,13),(14,370,0,'CEMENT','OK',7,'','2025-04-05 16:47:27','\0',11,'',1,35000,'1',14,1,14),(15,372,0,'CEMENT','OK',8,'','2025-04-05 16:48:12','\0',11,'',1,35000,'1',15,1,15),(16,374,0,'CEMENT','OK',7,'','2025-04-05 16:55:27','\0',11,'',1,35000,'1',16,1,16),(17,376,0,'CEMENT','OK',9,'','2025-04-05 16:58:49','\0',24,'',1,27000,'1',17,1,17),(18,378,0,'CEMENT','OK',2,'','2025-04-05 17:00:06','\0',24,'',1,134200,'1',18,1,18),(19,445,0,'CEEMNT','OK',1,'','2025-04-06 11:38:34','\0',3,'',1,4300,'1',19,4,19),(20,447,0,'CEMENT','OK',4,'','2025-04-06 11:40:57','\0',8,'',1,4000,'1',20,4,20),(21,449,0,'UKNOWN','OK',2,'','2025-04-06 11:45:37','\0',1,'',1,35000,'1',21,4,21),(22,451,0,'UKNOWN','OK',12,'','2025-04-06 11:49:42','\0',5,'',1,34950,'1',22,5,22),(23,453,0,'UKNOWN','OK',16,'','2025-04-06 11:51:44','\0',2,'',1,3500,'1',23,5,23),(24,455,0,'UKNOWN','OK',2,'','2025-04-06 11:53:50','\0',10,'',1,35000,'1',24,1,24),(25,457,0,'UKNOWN','OK',5,'','2025-04-06 11:54:58','\0',17,'',1,35000,'1',25,1,25),(26,459,0,'UKNOWN','OK',1,'','2025-04-06 11:56:11','\0',4,'',1,30000,'1',26,1,26),(27,461,0,'UKNOWN','OK',3,'','2025-04-06 11:57:26','\0',17,'',1,35000,'1',27,1,27),(28,463,0,'UKNOWN','OK',4,'','2025-04-06 11:58:16','\0',4,'',1,35000,'1',28,1,28),(29,465,0,'UKNOWN','OK',2,'','2025-04-06 11:59:15','\0',11,'',1,24000,'1',29,1,29),(30,467,0,'UKNOWN','OK',4,'','2025-04-06 12:00:54','\0',4,'',1,30000,'1',30,1,30),(31,469,0,'UKNOWN','OK',4,'','2025-04-06 12:02:00','\0',3,'',1,35000,'1',31,1,31),(32,471,0,'UKNOWN','OK',2,'','2025-04-06 12:20:59','\0',14,'',1,135000,'1',32,1,32),(33,473,0,'UKNOWN','OK',3,'','2025-04-06 12:26:02','\0',10,'',1,135000,'1',33,1,33),(34,475,0,'UKNOWN','OK',7,'','2025-04-06 12:28:18','\0',3,'',1,27000,'1',34,5,34),(35,477,0,'CEMENT','OK',2,'','2025-04-06 12:29:49','\0',2,'',1,30000,'1',35,5,35),(36,479,0,'CEMENT','OK',4,'','2025-04-06 12:31:03','\0',5,'',1,27000,'1',36,5,36),(37,481,0,'CEMENT','OK',3,'','2025-04-06 12:32:06','\0',4,'',1,27000,'1',37,5,37),(38,483,0,'CEMENT','OK',9,'','2025-04-06 12:33:03','\0',4,'',1,26000,'1',38,5,38),(39,485,0,'CEMENT','OK',3,'','2025-04-06 12:34:25','\0',2,'',1,27000,'1',39,5,39),(40,487,0,'CEMENT','OK',2,'','2025-04-06 12:36:04','\0',3,'',1,26840,'1',40,5,40),(41,489,0,'CEMENT','OK',7,'','2025-04-06 12:37:16','\0',3,'',1,25000,'1',41,5,41),(42,492,0,'UKNOWN','OK',4,'','2025-04-06 13:20:49','\0',2,'',1,35000,'1',42,1,42),(43,539,0,'UKNOWN','OK',2,'','2025-04-06 15:13:41','\0',2,'',1,7000,'1',43,1,43),(44,541,0,'CEMENT','OK',3,'','2025-04-06 15:17:32','\0',2,'',1,75000,'1',44,1,44),(45,543,0,'CEMENT','OK',5,'','2025-04-06 15:26:19','\0',2,'',1,1800,'1',45,1,45),(46,545,0,'CEMENT','OK',2,'','2025-04-06 15:27:35','\0',2,'',1,35000,'1',46,1,46),(47,547,0,'CEMENT','OK',3,'','2025-04-06 15:28:38','\0',14,'',1,35000,'1',47,1,47),(48,549,0,'CEMENT','OK',3,'','2025-04-06 15:30:27','\0',2,'',1,30000,'1',48,1,48),(49,551,0,'CEMENT','OK',3,'','2025-04-06 15:31:34','\0',2,'',1,35000,'1',49,1,49),(50,553,0,'CEMENT','OK',4,'','2025-04-06 15:33:47','\0',3,'',1,35000,'1',50,1,50),(51,555,0,'CEMENT','OK',9,'','2025-04-06 15:34:26','\0',2,'',1,35000,'1',51,1,51),(52,557,0,'CEMENT','OK',2,'','2025-04-06 15:35:47','\0',15,'',1,10887,'1',52,1,52),(53,559,0,'CEMENT','OK',4,'','2025-04-06 15:40:53','\0',11,'',1,35000,'1',53,1,53),(54,561,0,'CEMENT','OK',5,'','2025-04-06 15:41:57','\0',17,'',1,770000,'1',54,1,54),(55,563,0,'CEMENT','OK',2,'','2025-04-06 15:43:15','\0',4,'',1,30000,'1',55,1,55),(56,565,0,'CEMENT','OK',2,'','2025-04-06 15:44:16','\0',3,'',1,10000,'1',56,1,56),(57,567,0,'CEMENT','OK',2,'','2025-04-06 15:45:15','\0',3,'',1,1800,'1',57,1,57),(58,574,0,'CEMENT','OK',6,'','2025-04-06 16:09:48','\0',17,'',1,31000,'1',58,1,58),(59,576,0,'CEMENT','OK',8,'','2025-04-06 16:11:17','\0',11,'',1,7000,'1',59,1,59),(60,578,0,'CEMENT','OK',5,'','2025-04-06 16:14:34','\0',3,'',1,3744,'1',60,1,60),(61,580,0,'CEMENT','OK',1,'','2025-04-06 16:16:59','\0',13,'',1,26000,'1',61,1,61),(62,581,0,'CEMENT','OK',2,'','2025-04-06 16:18:18','\0',14,'',1,26750,'1',62,1,62),(63,583,0,'CEMENT','OK',3,'','2025-04-06 16:20:17','\0',2,'',1,28100,'1',63,1,63),(64,626,0,'CEMENT','OK',5,'','2025-04-06 20:53:11','\0',17,'',1,35000,'1',64,1,64),(65,628,0,'CEMENT','OK',4,'','2025-04-06 20:54:43','\0',18,'',1,35000,'1',65,1,65),(66,630,0,'CEMENT','OK',2,'','2025-04-06 20:55:26','\0',10,'',1,35000,'1',66,1,66),(67,632,0,'CEMENT','OK',2,'','2025-04-06 21:03:25','\0',14,'',1,2000,'1',67,1,67),(68,634,0,'CEMENT','OK',4,'','2025-04-06 21:08:05','\0',3,'',1,35000,'1',68,1,68),(69,635,0,'CEMENT','OK',4,'','2025-04-06 21:09:12','\0',4,'',1,40000,'1',69,1,69),(70,637,0,'CEMENT','OK',14,'','2025-04-06 21:11:24','\0',2,'',1,160000,'1',70,5,70),(71,655,0,'SUGAR','OK',3,'','2025-04-08 10:40:29','\0',61,'',1,27050,'1',73,1,71),(72,684,0,'COOKING OIL','OK',1,'','2025-04-08 13:37:06','\0',69,'',1,25755,'1',77,1,72),(73,698,0,'CEMENT','OK',10,'','2025-04-08 15:50:42','\0',73,'',1,40000,'1',78,1,73),(74,709,0,'tubes','OK',10,'','2025-04-08 16:29:07','\0',75,'',1,40,'1',79,1,74),(75,714,0,'BEER','OK',6,'','2025-04-08 17:11:08','\0',74,'',1,500,'1',80,1,75),(76,725,0,'BEER','OK',6,'','2025-04-09 09:58:06','\0',52,'',1,10000,'1',81,1,76),(77,733,0,'CEMENT','OK',7,'','2025-04-09 10:20:20','\0',77,'',1,25000,'1',82,1,77),(78,738,0,'ASSORTED ITEMS','OK',8,'','2025-04-09 11:06:20','\0',78,'',1,28130,'3',83,1,78),(79,747,0,'CEMENT','OK',11,'','2025-04-09 12:33:55','\0',2,'',1,35000,'1',85,1,79),(80,748,0,'CEMENT','OK',6,'','2025-04-09 12:34:24','\0',80,'',1,40000,'1',86,1,80),(81,759,0,'cement','OK',10,'','2025-04-09 13:01:50','\0',80,'',1,40000,'1',88,1,81),(82,780,0,'tubes','OK',10,'','2025-04-09 13:58:01','\0',18,'',1,250,'3',89,1,82),(83,782,0,'BEERA CRATES','OK',10,'','2025-04-09 14:05:06','\0',83,'',1,7790,'2',90,1,83),(84,801,0,'CEMENT','OK',11,'','2025-04-09 15:28:35','\0',70,'',1,5000,'1',91,1,84),(85,803,0,'CEMENT','OK',11,'','2025-04-09 15:34:26','\0',82,'',1,5000,'1',92,1,85),(86,804,0,'CEMENT','OK',11,'','2025-04-09 15:39:40','\0',63,'',1,5000,'1',93,1,86),(87,806,0,'CEMENT','OK',11,'','2025-04-09 16:01:53','\0',70,'',1,5000,'1',94,1,87),(88,811,0,'ok','OK',10,'','2025-04-09 16:16:35','\0',88,'',1,5,'3',95,1,88),(89,815,0,'ok','OK',10,'','2025-04-09 16:28:33','\0',88,'',112,2240,'3',96,1,89),(90,816,0,'WHEAT FLOUR','OK',6,'','2025-04-09 16:28:48','\0',32,'',1,8750,'1',97,1,90),(91,817,0,'ok','OK',10,'','2025-04-09 16:29:57','\0',88,'',112,20,'3',98,1,91),(92,819,0,'NON BASMATI RICE','OK',6,'','2025-04-09 16:35:53','\0',32,'',1,3750,'1',99,1,92),(93,821,0,'SUGAR','OK',6,'','2025-04-09 16:41:41','\0',32,'',1,6650,'1',100,1,93),(94,827,0,'COOKING OIL','OK',3,'','2025-04-09 16:53:29','\0',89,'',1,25498,'2',101,1,94);
/*!40000 ALTER TABLE `tally_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tallyref`
--

DROP TABLE IF EXISTS `tallyref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tallyref` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3uxw1l9h446lmxid9m8e0h99l` (`destination_id`),
  KEY `FKe7m4ve9xcsu9e3dp26qab3omv` (`arrival_id`),
  CONSTRAINT `FK3uxw1l9h446lmxid9m8e0h99l` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`),
  CONSTRAINT `FKe7m4ve9xcsu9e3dp26qab3omv` FOREIGN KEY (`arrival_id`) REFERENCES `arrival_note` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tallyref`
--

LOCK TABLES `tallyref` WRITE;
/*!40000 ALTER TABLE `tallyref` DISABLE KEYS */;
INSERT INTO `tallyref` VALUES (1,'2025-04-01 16:02:19','\0',1,1),(2,'2025-04-02 17:05:15','\0',1,2),(3,'2025-04-02 17:13:41','\0',1,3),(4,'2025-04-03 10:59:11','\0',5,4),(5,'2025-04-05 16:30:15','\0',1,5),(6,'2025-04-05 16:31:40','\0',1,6),(7,'2025-04-05 16:34:21','\0',1,7),(8,'2025-04-05 16:36:12','\0',1,8),(9,'2025-04-05 16:38:37','\0',1,9),(10,'2025-04-05 16:41:59','\0',1,10),(11,'2025-04-05 16:43:56','\0',1,11),(12,'2025-04-05 16:45:23','\0',1,12),(13,'2025-04-05 16:46:23','\0',1,13),(14,'2025-04-05 16:47:27','\0',1,14),(15,'2025-04-05 16:48:12','\0',1,15),(16,'2025-04-05 16:55:27','\0',1,16),(17,'2025-04-05 16:58:49','\0',1,17),(18,'2025-04-05 17:00:06','\0',1,18),(19,'2025-04-06 11:38:34','\0',4,19),(20,'2025-04-06 11:40:57','\0',4,20),(21,'2025-04-06 11:45:37','\0',4,21),(22,'2025-04-06 11:49:42','\0',5,22),(23,'2025-04-06 11:51:44','\0',5,23),(24,'2025-04-06 11:53:50','\0',1,24),(25,'2025-04-06 11:54:58','\0',1,25),(26,'2025-04-06 11:56:11','\0',1,26),(27,'2025-04-06 11:57:26','\0',1,27),(28,'2025-04-06 11:58:16','\0',1,28),(29,'2025-04-06 11:59:15','\0',1,29),(30,'2025-04-06 12:00:54','\0',1,30),(31,'2025-04-06 12:02:00','\0',1,31),(32,'2025-04-06 12:20:59','\0',1,32),(33,'2025-04-06 12:26:02','\0',1,33),(34,'2025-04-06 12:28:18','\0',5,34),(35,'2025-04-06 12:29:49','\0',5,35),(36,'2025-04-06 12:31:03','\0',5,36),(37,'2025-04-06 12:32:06','\0',5,37),(38,'2025-04-06 12:33:03','\0',5,38),(39,'2025-04-06 12:34:25','\0',5,39),(40,'2025-04-06 12:36:04','\0',5,40),(41,'2025-04-06 12:37:16','\0',5,41),(42,'2025-04-06 13:20:49','\0',1,42),(43,'2025-04-06 15:13:41','\0',1,43),(44,'2025-04-06 15:17:32','\0',1,44),(45,'2025-04-06 15:26:19','\0',1,45),(46,'2025-04-06 15:27:35','\0',1,46),(47,'2025-04-06 15:28:38','\0',1,47),(48,'2025-04-06 15:30:27','\0',1,48),(49,'2025-04-06 15:31:34','\0',1,49),(50,'2025-04-06 15:33:47','\0',1,50),(51,'2025-04-06 15:34:26','\0',1,51),(52,'2025-04-06 15:35:47','\0',1,52),(53,'2025-04-06 15:40:53','\0',1,53),(54,'2025-04-06 15:41:57','\0',1,54),(55,'2025-04-06 15:43:15','\0',1,55),(56,'2025-04-06 15:44:16','\0',1,56),(57,'2025-04-06 15:45:15','\0',1,57),(58,'2025-04-06 16:09:48','\0',1,58),(59,'2025-04-06 16:11:17','\0',1,59),(60,'2025-04-06 16:14:34','\0',1,60),(61,'2025-04-06 16:16:59','\0',1,61),(62,'2025-04-06 16:18:18','\0',1,62),(63,'2025-04-06 16:20:17','\0',1,63),(64,'2025-04-06 20:53:11','\0',1,64),(65,'2025-04-06 20:54:43','\0',1,65),(66,'2025-04-06 20:55:26','\0',1,66),(67,'2025-04-06 21:03:25','\0',1,67),(68,'2025-04-06 21:08:05','\0',1,68),(69,'2025-04-06 21:09:12','\0',1,69),(70,'2025-04-06 21:11:24','\0',5,70),(71,'2025-04-08 10:40:29','\0',1,73),(72,'2025-04-08 13:37:06','\0',1,77),(73,'2025-04-08 15:50:42','\0',1,78),(74,'2025-04-08 16:29:07','\0',1,79),(75,'2025-04-08 17:11:08','\0',1,80),(76,'2025-04-09 09:58:06','\0',1,81),(77,'2025-04-09 10:20:20','\0',1,82),(78,'2025-04-09 11:06:20','\0',1,83),(79,'2025-04-09 12:33:55','\0',1,85),(80,'2025-04-09 12:34:24','\0',1,86),(81,'2025-04-09 13:01:50','\0',1,88),(82,'2025-04-09 13:58:01','\0',1,89),(83,'2025-04-09 14:05:06','\0',1,90),(84,'2025-04-09 15:28:35','\0',1,91),(85,'2025-04-09 15:34:26','\0',1,92),(86,'2025-04-09 15:39:40','\0',1,93),(87,'2025-04-09 16:01:53','\0',1,94),(88,'2025-04-09 16:16:35','\0',1,95),(89,'2025-04-09 16:28:33','\0',1,96),(90,'2025-04-09 16:28:48','\0',1,97),(91,'2025-04-09 16:29:57','\0',1,98),(92,'2025-04-09 16:35:53','\0',1,99),(93,'2025-04-09 16:41:41','\0',1,100),(94,'2025-04-09 16:53:29','\0',1,101);
/*!40000 ALTER TABLE `tallyref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tallyref_aud`
--

DROP TABLE IF EXISTS `tallyref_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tallyref_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `arrival_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FK2pg8cfhmxead47e4ytxae6co6` (`rev`),
  CONSTRAINT `FK2pg8cfhmxead47e4ytxae6co6` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tallyref_aud`
--

LOCK TABLES `tallyref_aud` WRITE;
/*!40000 ALTER TABLE `tallyref_aud` DISABLE KEYS */;
INSERT INTO `tallyref_aud` VALUES (1,152,0,'2025-04-02 16:02:19','\0',1,1),(2,162,0,'2025-04-02 17:05:15','\0',1,2),(3,163,0,'2025-04-02 17:13:41','\0',1,3),(4,190,0,'2025-04-03 10:59:11','\0',5,4),(5,352,0,'2025-04-05 16:30:15','\0',1,5),(6,354,0,'2025-04-05 16:31:40','\0',1,6),(7,356,0,'2025-04-05 16:34:21','\0',1,7),(8,358,0,'2025-04-05 16:36:12','\0',1,8),(9,360,0,'2025-04-05 16:38:37','\0',1,9),(10,362,0,'2025-04-05 16:41:59','\0',1,10),(11,364,0,'2025-04-05 16:43:56','\0',1,11),(12,366,0,'2025-04-05 16:45:23','\0',1,12),(13,368,0,'2025-04-05 16:46:23','\0',1,13),(14,370,0,'2025-04-05 16:47:27','\0',1,14),(15,372,0,'2025-04-05 16:48:12','\0',1,15),(16,374,0,'2025-04-05 16:55:27','\0',1,16),(17,376,0,'2025-04-05 16:58:49','\0',1,17),(18,378,0,'2025-04-05 17:00:06','\0',1,18),(19,445,0,'2025-04-06 11:38:34','\0',4,19),(20,447,0,'2025-04-06 11:40:57','\0',4,20),(21,449,0,'2025-04-06 11:45:37','\0',4,21),(22,451,0,'2025-04-06 11:49:42','\0',5,22),(23,453,0,'2025-04-06 11:51:44','\0',5,23),(24,455,0,'2025-04-06 11:53:50','\0',1,24),(25,457,0,'2025-04-06 11:54:58','\0',1,25),(26,459,0,'2025-04-06 11:56:11','\0',1,26),(27,461,0,'2025-04-06 11:57:26','\0',1,27),(28,463,0,'2025-04-06 11:58:16','\0',1,28),(29,465,0,'2025-04-06 11:59:15','\0',1,29),(30,467,0,'2025-04-06 12:00:54','\0',1,30),(31,469,0,'2025-04-06 12:02:00','\0',1,31),(32,471,0,'2025-04-06 12:20:59','\0',1,32),(33,473,0,'2025-04-06 12:26:02','\0',1,33),(34,475,0,'2025-04-06 12:28:18','\0',5,34),(35,477,0,'2025-04-06 12:29:49','\0',5,35),(36,479,0,'2025-04-06 12:31:03','\0',5,36),(37,481,0,'2025-04-06 12:32:06','\0',5,37),(38,483,0,'2025-04-06 12:33:03','\0',5,38),(39,485,0,'2025-04-06 12:34:25','\0',5,39),(40,487,0,'2025-04-06 12:36:04','\0',5,40),(41,489,0,'2025-04-06 12:37:16','\0',5,41),(42,492,0,'2025-04-06 13:20:49','\0',1,42),(43,539,0,'2025-04-06 15:13:41','\0',1,43),(44,541,0,'2025-04-06 15:17:32','\0',1,44),(45,543,0,'2025-04-06 15:26:19','\0',1,45),(46,545,0,'2025-04-06 15:27:35','\0',1,46),(47,547,0,'2025-04-06 15:28:38','\0',1,47),(48,549,0,'2025-04-06 15:30:27','\0',1,48),(49,551,0,'2025-04-06 15:31:34','\0',1,49),(50,553,0,'2025-04-06 15:33:47','\0',1,50),(51,555,0,'2025-04-06 15:34:26','\0',1,51),(52,557,0,'2025-04-06 15:35:47','\0',1,52),(53,559,0,'2025-04-06 15:40:53','\0',1,53),(54,561,0,'2025-04-06 15:41:57','\0',1,54),(55,563,0,'2025-04-06 15:43:15','\0',1,55),(56,565,0,'2025-04-06 15:44:16','\0',1,56),(57,567,0,'2025-04-06 15:45:15','\0',1,57),(58,574,0,'2025-04-06 16:09:48','\0',1,58),(59,576,0,'2025-04-06 16:11:17','\0',1,59),(60,578,0,'2025-04-06 16:14:34','\0',1,60),(61,580,0,'2025-04-06 16:16:59','\0',1,61),(62,581,0,'2025-04-06 16:18:18','\0',1,62),(63,583,0,'2025-04-06 16:20:17','\0',1,63),(64,626,0,'2025-04-06 20:53:11','\0',1,64),(65,628,0,'2025-04-06 20:54:43','\0',1,65),(66,630,0,'2025-04-06 20:55:26','\0',1,66),(67,632,0,'2025-04-06 21:03:25','\0',1,67),(68,634,0,'2025-04-06 21:08:05','\0',1,68),(69,635,0,'2025-04-06 21:09:12','\0',1,69),(70,637,0,'2025-04-06 21:11:24','\0',5,70),(71,655,0,'2025-04-08 10:40:29','\0',1,73),(72,684,0,'2025-04-08 13:37:06','\0',1,77),(73,698,0,'2025-04-08 15:50:42','\0',1,78),(74,709,0,'2025-04-08 16:29:07','\0',1,79),(75,714,0,'2025-04-08 17:11:08','\0',1,80),(76,725,0,'2025-04-09 09:58:06','\0',1,81),(77,733,0,'2025-04-09 10:20:20','\0',1,82),(78,738,0,'2025-04-09 11:06:20','\0',1,83),(79,747,0,'2025-04-09 12:33:55','\0',1,85),(80,748,0,'2025-04-09 12:34:24','\0',1,86),(81,759,0,'2025-04-09 13:01:50','\0',1,88),(82,780,0,'2025-04-09 13:58:01','\0',1,89),(83,782,0,'2025-04-09 14:05:06','\0',1,90),(84,801,0,'2025-04-09 15:28:35','\0',1,91),(85,803,0,'2025-04-09 15:34:26','\0',1,92),(86,804,0,'2025-04-09 15:39:40','\0',1,93),(87,806,0,'2025-04-09 16:01:53','\0',1,94),(88,811,0,'2025-04-09 16:16:35','\0',1,95),(89,815,0,'2025-04-09 16:28:33','\0',1,96),(90,816,0,'2025-04-09 16:28:48','\0',1,97),(91,817,0,'2025-04-09 16:29:57','\0',1,98),(92,819,0,'2025-04-09 16:35:53','\0',1,99),(93,821,0,'2025-04-09 16:41:41','\0',1,100),(94,827,0,'2025-04-09 16:53:29','\0',1,101);
/*!40000 ALTER TABLE `tallyref_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_category`
--

DROP TABLE IF EXISTS `tariff_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_category`
--

LOCK TABLES `tariff_category` WRITE;
/*!40000 ALTER TABLE `tariff_category` DISABLE KEYS */;
INSERT INTO `tariff_category` VALUES (1,'\0','Barge berthing'),(2,'\0','Truck parking'),(3,'\0','Wharfage'),(4,'\0','Wh storage'),(5,'\0','handling two way'),(6,'\0','handling one way');
/*!40000 ALTER TABLE `tariff_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_category_aud`
--

DROP TABLE IF EXISTS `tariff_category_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_category_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKfxb3v7cw4l46xtoyo1bqx4ld6` (`rev`),
  CONSTRAINT `FKfxb3v7cw4l46xtoyo1bqx4ld6` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_category_aud`
--

LOCK TABLES `tariff_category_aud` WRITE;
/*!40000 ALTER TABLE `tariff_category_aud` DISABLE KEYS */;
INSERT INTO `tariff_category_aud` VALUES (1,28,0,'\0','Barge berthing'),(2,28,0,'\0','Truck parking'),(3,28,0,'\0','Wharfage'),(4,28,0,'\0','Wh storage'),(5,28,0,'\0','handling two way'),(6,28,0,'\0','handling one way');
/*!40000 ALTER TABLE `tariff_category_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_grace_p`
--

DROP TABLE IF EXISTS `tariff_grace_p`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_grace_p` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grace_condition` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_grace_p`
--

LOCK TABLES `tariff_grace_p` WRITE;
/*!40000 ALTER TABLE `tariff_grace_p` DISABLE KEYS */;
INSERT INTO `tariff_grace_p` VALUES (1,'> 3','\0');
/*!40000 ALTER TABLE `tariff_grace_p` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_grace_p_aud`
--

DROP TABLE IF EXISTS `tariff_grace_p_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_grace_p_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `grace_condition` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKnt6tjndugqc2rpc4vdk1kb6r8` (`rev`),
  CONSTRAINT `FKnt6tjndugqc2rpc4vdk1kb6r8` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_grace_p_aud`
--

LOCK TABLES `tariff_grace_p_aud` WRITE;
/*!40000 ALTER TABLE `tariff_grace_p_aud` DISABLE KEYS */;
INSERT INTO `tariff_grace_p_aud` VALUES (1,30,0,'> 3','\0'),(1,32,1,'> 3','\0');
/*!40000 ALTER TABLE `tariff_grace_p_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_measure`
--

DROP TABLE IF EXISTS `tariff_measure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_measure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_measure`
--

LOCK TABLES `tariff_measure` WRITE;
/*!40000 ALTER TABLE `tariff_measure` DISABLE KEYS */;
/*!40000 ALTER TABLE `tariff_measure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_measure_aud`
--

DROP TABLE IF EXISTS `tariff_measure_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_measure_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKkpl5vtfgb5cgo4tky6dnu4di8` (`rev`),
  CONSTRAINT `FKkpl5vtfgb5cgo4tky6dnu4di8` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_measure_aud`
--

LOCK TABLES `tariff_measure_aud` WRITE;
/*!40000 ALTER TABLE `tariff_measure_aud` DISABLE KEYS */;
/*!40000 ALTER TABLE `tariff_measure_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_range`
--

DROP TABLE IF EXISTS `tariff_range`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_range` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_val` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `to_val` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_range`
--

LOCK TABLES `tariff_range` WRITE;
/*!40000 ALTER TABLE `tariff_range` DISABLE KEYS */;
INSERT INTO `tariff_range` VALUES (1,'1','\0','14'),(2,'15','\0','30'),(3,'31','\0','-1');
/*!40000 ALTER TABLE `tariff_range` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_range_aud`
--

DROP TABLE IF EXISTS `tariff_range_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_range_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `from_val` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `to_val` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKbnab5of970cipyxm0s3gcofti` (`rev`),
  CONSTRAINT `FKbnab5of970cipyxm0s3gcofti` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_range_aud`
--

LOCK TABLES `tariff_range_aud` WRITE;
/*!40000 ALTER TABLE `tariff_range_aud` DISABLE KEYS */;
INSERT INTO `tariff_range_aud` VALUES (1,29,0,'1','\0','14'),(1,32,1,'1','\0','14'),(2,29,0,'15','\0','30'),(2,32,1,'15','\0','30'),(3,29,0,'31','\0','-1'),(3,32,1,'31','\0','-1');
/*!40000 ALTER TABLE `tariff_range_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_service`
--

DROP TABLE IF EXISTS `tariff_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(80) NOT NULL,
  `fee` double NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `paid_by` varchar(80) NOT NULL,
  `paid_when` varchar(80) NOT NULL,
  `service_name` varchar(80) NOT NULL,
  `tariff_category_id` int(11) DEFAULT NULL,
  `tariff_grace_p_id` int(11) DEFAULT NULL,
  `tariff_range_id` int(11) DEFAULT NULL,
  `tariff_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4f8eyfl4ey27ei0cnw8wj7kcj` (`tariff_category_id`),
  KEY `FKm7xtfheggsrrmxicmqj3ox9d0` (`tariff_grace_p_id`),
  KEY `FK50mln54rivh7ymgowbo0xnoyk` (`tariff_range_id`),
  KEY `FK2s3weqprehy8y5httghv6t1hc` (`tariff_type_id`),
  CONSTRAINT `FK2s3weqprehy8y5httghv6t1hc` FOREIGN KEY (`tariff_type_id`) REFERENCES `tariff_type` (`id`),
  CONSTRAINT `FK4f8eyfl4ey27ei0cnw8wj7kcj` FOREIGN KEY (`tariff_category_id`) REFERENCES `tariff_category` (`id`),
  CONSTRAINT `FK50mln54rivh7ymgowbo0xnoyk` FOREIGN KEY (`tariff_range_id`) REFERENCES `tariff_range` (`id`),
  CONSTRAINT `FKm7xtfheggsrrmxicmqj3ox9d0` FOREIGN KEY (`tariff_grace_p_id`) REFERENCES `tariff_grace_p` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_service`
--

LOCK TABLES `tariff_service` WRITE;
/*!40000 ALTER TABLE `tariff_service` DISABLE KEYS */;
INSERT INTO `tariff_service` VALUES (1,'Rwf',5000,'\0','truck Driver','Before Exit from terminal','Truck Parking',2,1,1,1),(2,'Rwf',210000,'\0','Vessel Operator','Before Unberthing','Wharfage not more than 60m LOA',1,NULL,NULL,2),(3,'Rwf',28000,'\0','Vessel Operator','Before Unberthing','Barge berthing not more 60m LOA',1,NULL,NULL,3),(4,'Rwf',630000,'\0','Vessel Operator','Before Unberthing','Wharfage more than 60m LOA',3,NULL,NULL,2),(5,'Rwf',84000,'\0','Vessel Operator','Before Unberthing','Barge berthing more that 60m LOA',1,NULL,NULL,3),(6,'Rwf',0,'\0','Cargo Owner','Before exit of Cargo','Warehouse Storage',4,NULL,1,4),(7,'Rwf',0.6,'\0','Cargo Owner','Before exit of Cargo','Warehouse Storage',4,NULL,2,4),(8,'Rwf',1.2,'\0','Cargo Owner','Before exit of Cargo','Warehouse Storage',4,NULL,3,4),(9,'Rwf',3.5,'\0','Cargo Owner','Before exit of Cargo','Handling Two Way',4,NULL,1,5),(10,'Rwf',4,'\0','Cargo Owner','Before exit of Cargo','Handling Two Way',4,NULL,2,6),(11,'Rwf',7,'\0','Cargo Owner','Before exit of Cargo','Handling Two Way',4,NULL,3,7),(12,'Rwf',3.4,'\0','Cargo Owner','Before exit of Cargo','Hanlding One Way',4,NULL,1,5),(13,'Rwf',3.5,'\0','Cargo Owner','Before exit of Cargo','Hanlding One Way',4,NULL,2,6),(14,'Rwf',7,'\0','Cargo Owner','Before exit of Cargo','Hanlding One Way',4,NULL,3,7);
/*!40000 ALTER TABLE `tariff_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_service_aud`
--

DROP TABLE IF EXISTS `tariff_service_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_service_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `currency` varchar(80) DEFAULT NULL,
  `fee` double DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `paid_by` varchar(80) DEFAULT NULL,
  `paid_when` varchar(80) DEFAULT NULL,
  `service_name` varchar(80) DEFAULT NULL,
  `tariff_category_id` int(11) DEFAULT NULL,
  `tariff_grace_p_id` int(11) DEFAULT NULL,
  `tariff_range_id` int(11) DEFAULT NULL,
  `tariff_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKn5107rc6bqlve9rt2ico5n6v9` (`rev`),
  CONSTRAINT `FKn5107rc6bqlve9rt2ico5n6v9` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_service_aud`
--

LOCK TABLES `tariff_service_aud` WRITE;
/*!40000 ALTER TABLE `tariff_service_aud` DISABLE KEYS */;
INSERT INTO `tariff_service_aud` VALUES (1,32,0,'Rwf',5000,'\0','truck Driver','Before Exit from terminal','Truck Parking',2,1,1,1),(2,32,0,'Rwf',210000,'\0','Vessel Operator','Before Unberthing','Wharfage not more than 60m LOA',1,NULL,NULL,2),(3,32,0,'Rwf',28000,'\0','Vessel Operator','Before Unberthing','Barge berthing not more 60m LOA',1,NULL,NULL,3),(4,32,0,'Rwf',630000,'\0','Vessel Operator','Before Unberthing','Wharfage more than 60m LOA',3,NULL,NULL,2),(5,32,0,'Rwf',84000,'\0','Vessel Operator','Before Unberthing','Barge berthing more that 60m LOA',1,NULL,NULL,3),(6,32,0,'Rwf',0,'\0','Cargo Owner','Before exit of Cargo','Warehouse Storage',4,NULL,1,4),(7,32,0,'Rwf',0.6,'\0','Cargo Owner','Before exit of Cargo','Warehouse Storage',4,NULL,2,4),(8,32,0,'Rwf',1.2,'\0','Cargo Owner','Before exit of Cargo','Warehouse Storage',4,NULL,3,4),(9,32,0,'Rwf',3.5,'\0','Cargo Owner','Before exit of Cargo','Handling Two Way',4,NULL,1,5),(10,32,0,'Rwf',4,'\0','Cargo Owner','Before exit of Cargo','Handling Two Way',4,NULL,2,6),(11,32,0,'Rwf',7,'\0','Cargo Owner','Before exit of Cargo','Handling Two Way',4,NULL,3,7),(12,32,0,'Rwf',3.4,'\0','Cargo Owner','Before exit of Cargo','Hanlding One Way',4,NULL,1,5),(13,32,0,'Rwf',3.5,'\0','Cargo Owner','Before exit of Cargo','Hanlding One Way',4,NULL,2,6),(14,32,0,'Rwf',7,'\0','Cargo Owner','Before exit of Cargo','Hanlding One Way',4,NULL,3,7);
/*!40000 ALTER TABLE `tariff_service_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_type`
--

DROP TABLE IF EXISTS `tariff_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_type`
--

LOCK TABLES `tariff_type` WRITE;
/*!40000 ALTER TABLE `tariff_type` DISABLE KEYS */;
INSERT INTO `tariff_type` VALUES (1,'\0','12 hrs block'),(2,'\0','one time'),(3,'\0','grace daily'),(4,'\0','daily'),(5,'\0','package sacs & bags <100kg'),(6,'\0','package jerry cans up to 25'),(7,'\0','package laden cartons cons. mat');
/*!40000 ALTER TABLE `tariff_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tariff_type_aud`
--

DROP TABLE IF EXISTS `tariff_type_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tariff_type_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKce1lq2mljotwhhw471wfaaian` (`rev`),
  CONSTRAINT `FKce1lq2mljotwhhw471wfaaian` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tariff_type_aud`
--

LOCK TABLES `tariff_type_aud` WRITE;
/*!40000 ALTER TABLE `tariff_type_aud` DISABLE KEYS */;
INSERT INTO `tariff_type_aud` VALUES (1,31,0,'\0','12 hrs block'),(1,32,1,'\0','12 hrs block'),(2,31,0,'\0','one time'),(2,32,1,'\0','one time'),(3,31,0,'\0','grace daily'),(3,32,1,'\0','grace daily'),(4,31,0,'\0','daily'),(4,32,1,'\0','daily'),(5,31,0,'\0','package sacs & bags <100kg'),(5,32,1,'\0','package sacs & bags <100kg'),(6,31,0,'\0','package jerry cans up to 25'),(6,32,1,'\0','package jerry cans up to 25'),(7,31,0,'\0','package laden cartons cons. mat'),(7,32,1,'\0','package laden cartons cons. mat');
/*!40000 ALTER TABLE `tariff_type_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck`
--

DROP TABLE IF EXISTS `truck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `driver_id` bigint(20) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `plate_number` varchar(80) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `truck_type` varchar(80) NOT NULL,
  `truck` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_2chjqf7fr8da0bs037o6oppk7` (`plate_number`),
  KEY `FK4twh9gcres1dpffutd5swjfbh` (`truck`),
  CONSTRAINT `FK4twh9gcres1dpffutd5swjfbh` FOREIGN KEY (`truck`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck`
--

LOCK TABLES `truck` WRITE;
/*!40000 ALTER TABLE `truck` DISABLE KEYS */;
INSERT INTO `truck` VALUES (1,0,'\0','UBN661X','Pending','others',68),(2,0,'\0','RAE969Z','Pending','others',73),(3,0,'\0','RAF436R','Pending','others',74),(4,0,'\0','cgo8113AF-19','Pending','others',75),(5,0,'\0','T228DMT-T289CPU','Pending','others',76),(6,0,'\0','T606DVY-T534DVY','Pending','others',77),(7,0,'\0','RAE3955-RL3591','Pending','40ft container',79),(8,0,'\0','RAD970Z-RL2373','Pending','40ft container',80),(9,0,'\0','RAE442Y','Pending','40ft container',81),(10,0,'\0','RAF730V-RL6465','Pending','40ft container',82),(11,0,'\0','RAC422K-RL3224','Pending','40ft container',83),(12,0,'\0','RAH62OU-RL6727','Pending','40ft container',84),(13,0,'\0','RAH480U-RL6667','Pending','40ft container',85),(14,0,'\0','RAC825A-RL2282','Pending','40ft container',86),(15,0,'\0','RAH431-RL6657','Pending','40ft container',87),(16,0,'\0','NOAH XX','Pending','40ft container',88),(17,0,'\0','RAF153K-RL4082','Pending','40ft container',89),(18,0,'\0','RAE442V','Pending','40ft container',90),(19,0,'\0','RAD2011','Pending','40ft container',91),(20,0,'\0','RAC138E','Pending','20ft container',93),(21,0,'\0','UMOJA NI NGUVU WOODEN','Pending','others',94),(22,0,'\0','RAG160P','Pending','others',95),(23,0,'\0','RAG548E','Pending','Box truck',96),(24,0,'\0','T559BKE','Pending','20ft container',97),(25,0,'\0','RAH107T','Pending','20ft container',98),(26,0,'\0','STAR GENERAL XX','Pending','20ft container',99),(27,0,'\0','NKUNDABANYANGA XX','Pending','20ft container',100),(28,0,'\0','ORACION  XX','Pending','20ft container',101),(29,0,'\0','IJETRA XX','Pending','20ft container',102),(30,0,'\0','NZABANDORA INNOCENT XX','Pending','20ft container',103),(31,0,'\0','EMS GENERAL XX','Pending','20ft container',104),(32,0,'\0','RAB652A','Pending','Box truck',133),(33,0,'\0','FAITH TRADING XX','Pending','20ft container',134),(34,0,'\0','AFRILOTT HOLDING XX','Pending','20ft container',135),(35,0,'\0','KAC GENERAL XX','Pending','20ft container',136),(36,0,'\0','UNITED SECEMENT SELLERS XX','Pending','20ft container',137),(37,0,'\0','RWANDA SPECIAL MATERIALS XX','Pending','20ft container',138),(38,0,'\0','KA CO TRA XX','Pending','20ft container',139),(39,0,'\0','BAHATI MOSEKA JIRESSE XX','Pending','20ft container',140),(40,0,'\0','UWIZEYE EMMANUEL','Pending','others',141),(41,0,'\0','NYAMURINDA SPOIRE','Pending','others',143),(42,0,'\0','s','Pending','others',144),(43,0,'\0','RAG063N','Pending','Box truck',193),(44,0,'\0','VIP PHILIPPE xx','Pending','others',194),(45,0,'\0','NTAKIRUTIMANA FILS xx','Pending','others',195),(46,0,'\0','HABIYAREMYE JEAN D\'AMOUR xx','Pending','others',196),(47,0,'\0','JULES MUHAMA xx','Pending','others',197),(48,0,'\0','DISTRFAM LTD xx','Pending','others',198),(49,0,'\0','UMUTONI GENERAL xx','Pending','others',199),(50,0,'\0','RIJ COMPANY  xx','Pending','others',200),(51,0,'\0','UWINEZA MARIE CHANTAL  xx','Pending','others',202),(52,0,'\0','KAMU','Pending','others',245),(53,0,'\0','MALI NI WATU','Pending','others',246),(54,0,'\0','WIH RWANDA XX','Pending','others',247),(55,0,'\0','INGABIRE GENERAL XX','Pending','others',249),(56,0,'\0','GAHUNGU BUSINESS XX','Pending','others',250),(57,0,'\0','RAH519W','Pending','others',251),(58,0,'\0','KAMO','Pending','others',252),(59,0,'\0','RAG851J','Pending','others',267),(60,0,'\0','RAE280D-RL2420','Pending','20ft container',268),(61,0,'\0','RAE872R','Pending','Box truck',272),(62,0,'\0','RAA972H','Pending','others',273),(63,0,'\0','RAC306K','Pending','others',276),(64,0,'\0','RAG572','Pending','others',278),(65,0,'\0','rdf586r','Pending','others',279),(66,0,'\0','RAF904S','Pending','others',280),(67,0,'\0','RD862X','Pending','others',293),(68,0,'\0','RH645W','Pending','others',294),(69,0,'\0','T504DML','Pending','others',295),(70,0,'\0','RAC132G','Pending','others',298),(71,0,'\0','RAG776S','Pending','Box truck',299),(72,0,'\0','RAE923G','Pending','others',300),(73,0,'\0','RAG950L','Pending','others',301),(74,0,'\0','UMUTONI GENERAL','Pending','others',312),(75,0,'\0','RAH723E','Pending','others',314),(76,0,'\0','RAF235V','Pending','others',331),(77,0,'\0','RAG943U','Pending','others',332),(78,0,'\0','KDL906L-ZH3013','Pending','others',335),(79,0,'\0','RAE101W-RL3149','Pending','20ft container',338),(80,0,'\0','RAG058N','Pending','others',340),(81,0,'\0','RAF962N','Pending','20ft container',345),(82,0,'\0','RAG950U','Pending','others',347),(83,0,'\0','RAA872H','Pending','others',351),(84,0,'\0','RAD254T','Pending','others',352),(85,0,'\0','LUKA YAYO','Pending','others',357),(86,0,'\0','T285EFN','Pending','others',358),(87,0,'\0','T283EFN','Pending','others',359),(88,0,'\0','RAC485M','Pending','others',368),(89,0,'\0','T888DMS','Pending','2x20ft container',382);
/*!40000 ALTER TABLE `truck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_aud`
--

DROP TABLE IF EXISTS `truck_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `driver_id` bigint(20) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `plate_number` varchar(80) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `truck_type` varchar(80) DEFAULT NULL,
  `truck` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKdeksqg4n0sjt126v9ie54pfen` (`rev`),
  CONSTRAINT `FKdeksqg4n0sjt126v9ie54pfen` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_aud`
--

LOCK TABLES `truck_aud` WRITE;
/*!40000 ALTER TABLE `truck_aud` DISABLE KEYS */;
INSERT INTO `truck_aud` VALUES (1,71,0,0,'\0','RAE 395J','Pending','others',11),(1,216,0,0,'\0','UBN661X','Pending','others',66),(1,220,0,0,'\0','UBN661X','Pending','others',68),(1,289,1,0,'\0','UBN661X','Pending','others',68),(2,218,0,0,'\0','RAE969Z','Pending','others',67),(2,243,0,0,'\0','RAE969Z','Pending','others',73),(2,290,1,0,'\0','RAE969Z','Pending','others',73),(2,431,1,0,'\0','RAE969Z','Pending','others',73),(2,647,1,0,'\0','RAE969Z','Pending','others',73),(2,648,1,0,'\0','RAE969Z','Pending','others',73),(2,720,1,0,'\0','RAE969Z','Pending','others',73),(2,721,1,0,'\0','RAE969Z','Pending','others',73),(3,245,0,0,'\0','RAF436R','Pending','others',74),(3,291,1,0,'\0','RAF436R','Pending','others',74),(4,247,0,0,'\0','cgo8113AF/19','Pending','others',75),(4,292,1,0,'\0','cgo8113AF-19','Pending','others',75),(4,438,1,0,'\0','cgo8113AF-19','Pending','others',75),(5,249,0,0,'\0','T228DMT/T289CPU','Pending','others',76),(5,293,1,0,'\0','T228DMT-T289CPU','Pending','others',76),(6,251,0,0,'\0','T606DVY/T534DVY','Pending','others',77),(6,253,1,0,'\0','T606DVY/T534DVY','Pending','others',77),(6,294,1,0,'\0','T606DVY-T534DVY','Pending','others',77),(7,78,0,0,'\0','RAE254C','Pending','others',17),(7,79,1,0,'\0','RAE254C','Pending','others',17),(7,255,0,0,'\0','RAE3955-RL3591','Pending','40ft container',79),(7,298,1,0,'\0','RAE3955-RL3591','Pending','40ft container',79),(8,87,0,0,'\0','RAF626I/RL4021','Pending','others',18),(8,89,1,0,'\0','RAF626I - RL4021','Pending','others',18),(8,257,0,0,'\0','RAD970Z-RL2373','Pending','40ft container',80),(8,299,1,0,'\0','RAD970Z-RL2373','Pending','40ft container',80),(8,309,1,0,'\0','RAD970Z-RL2373','Pending','40ft container',80),(9,91,0,0,'\0','RAF153K-RL4082','Pending','others',19),(9,92,1,0,'\0','RAF153K-RL4082','Pending','others',19),(9,122,1,0,'\0','RAF153K-RL4082','Pending','others',19),(9,123,1,0,'\0','RAF153K-RL4082','Pending','others',19),(9,259,0,0,'\0','RAE442Y','Pending','40ft container',81),(9,300,1,0,'\0','RAE442Y','Pending','40ft container',81),(10,111,0,0,'\0','RAE580E','Pending','others',20),(10,114,1,0,'\0','RAE580E','Pending','others',20),(10,261,0,0,'\0','RAF730V-RL6465','Pending','40ft container',82),(10,301,1,0,'\0','RAF730V-RL6465','Pending','40ft container',82),(11,116,0,0,'\0','RAH 431-RL6657','Pending','others',21),(11,117,1,0,'\0','RAH 431-RL6657','Pending','others',21),(11,263,0,0,'\0','RAC422K-RL3224','Pending','40ft container',83),(11,302,1,0,'\0','RAC422K-RL3224','Pending','40ft container',83),(11,432,1,0,'\0','RAC422K-RL3224','Pending','40ft container',83),(12,119,0,0,'\0','RAC 825A-RL2282','Pending','others',22),(12,120,1,0,'\0','RAC 825A-RL2282','Pending','others',22),(12,265,0,0,'\0','RAH62OU-RL6727','Pending','40ft container',84),(12,303,1,0,'\0','RAH62OU-RL6727','Pending','40ft container',84),(13,125,0,0,'\0','RAH480U-RL6667','Pending','others',24),(13,126,1,0,'\0','RAH480U-RL6667','Pending','others',24),(13,182,1,0,'\0','RAH480U-RL6667','Pending','others',24),(13,267,0,0,'\0','RAH480U-RL6667','Pending','40ft container',85),(13,304,1,0,'\0','RAH480U-RL6667','Pending','40ft container',85),(13,426,1,0,'\0','RAH480U-RL6667','Pending','40ft container',85),(14,128,0,0,'\0','RAH 620U-RL6727','Pending','others',25),(14,129,1,0,'\0','RAH 620U-RL6727','Pending','others',25),(14,269,0,0,'\0','RAC825A-RL2282','Pending','40ft container',86),(14,305,1,0,'\0','RAC825A-RL2282','Pending','40ft container',86),(15,131,0,0,'\0','RAC 422K-RL3224','Pending','others',26),(15,132,1,0,'\0','RAC 422K-RL3224','Pending','others',26),(15,271,0,0,'\0','RAH431-RL6657','Pending','40ft container',87),(15,306,1,0,'\0','RAH431-RL6657','Pending','40ft container',87),(16,134,0,0,'\0','RAF730V-RL6465','Pending','others',27),(16,135,1,0,'\0','RAF730V-RL6465','Pending','others',27),(16,273,0,0,'\0','NA','Pending','40ft container',88),(16,288,1,0,'\0','NA','Pending','40ft container',88),(16,392,1,0,'\0','NOAH XX','Pending','40ft container',88),(16,421,1,0,'\0','NOAH XX','Pending','40ft container',88),(16,529,1,0,'\0','NOAH XX','Pending','40ft container',88),(16,530,1,0,'\0','NOAH XX','Pending','40ft container',88),(16,531,1,0,'\0','NOAH XX','Pending','40ft container',88),(16,537,1,0,'\0','NOAH XX','Pending','40ft container',88),(16,609,1,0,'\0','NOAH XX','Pending','40ft container',88),(17,137,0,0,'\0','RAD973Y/RL6775','Pending','others',28),(17,141,1,0,'\0','RAD973Y-RL6775','Pending','others',28),(17,275,0,0,'\0','RAF153K-RL4082','Pending','40ft container',89),(17,282,1,0,'\0','RAF153K-RL4082','Pending','40ft container',89),(17,307,1,0,'\0','RAF153K-RL4082','Pending','40ft container',89),(17,308,1,0,'\0','RAF153K-RL4082','Pending','40ft container',89),(18,143,0,0,'\0','RAE3955-RL3591','Pending','40ft container',29),(18,144,1,0,'\0','RAE3955-RL3591','Pending','40ft container',29),(18,277,0,0,'\0','RAE442V','Pending','40ft container',90),(18,283,1,0,'\0','RAE442V','Pending','40ft container',90),(18,284,1,0,'\0','RAE442V','Pending','40ft container',90),(18,285,1,0,'\0','RAE442V','Pending','40ft container',90),(18,286,1,0,'\0','RAE442V','Pending','40ft container',90),(18,287,1,0,'\0','RAE442V','Pending','40ft container',90),(18,660,1,0,'\0','RAE442V','Pending','40ft container',90),(18,661,1,0,'\0','RAE442V','Pending','40ft container',90),(18,723,1,0,'\0','RAE442V','Pending','40ft container',90),(18,724,1,0,'\0','RAE442V','Pending','40ft container',90),(19,148,0,0,'\0','WOODEN BOAT','Pending','others',36),(19,149,1,0,'\0','WOODEN BOAT','Pending','others',36),(19,279,0,0,'\0','RAD2011','Pending','40ft container',91),(19,281,1,0,'\0','RAD2011','Pending','40ft container',91),(20,154,0,0,'\0','RAD 970Z-RL2373','Pending','2x20ft container',39),(20,155,1,0,'\0','RAD 970Z-RL2373','Pending','2x20ft container',39),(20,172,1,0,'\0','RAD 970Z-RL2373','Pending','2x20ft container',39),(20,296,0,0,'\0','RAC138E','Pending','20ft container',93),(20,297,1,0,'\0','RAC138E','Pending','20ft container',93),(21,159,0,0,'\0','RAE 442Y','Pending','others',40),(21,161,1,0,'\0','RAE 442Y','Pending','others',40),(21,165,1,0,'\0','RAE 442Y','Pending','others',40),(21,166,1,0,'\0','RAE 442Y','Pending','others',40),(21,168,1,0,'\0','RAE 442Y','Pending','others',40),(21,311,0,0,'\0','UMOJA NI NGUVU WOODEN','Pending','others',94),(21,312,1,0,'\0','UMOJA NI NGUVU WOODEN','Pending','others',94),(21,313,1,0,'\0','UMOJA NI NGUVU WOODEN','Pending','others',94),(21,436,1,0,'\0','UMOJA NI NGUVU WOODEN','Pending','others',94),(21,516,1,0,'\0','UMOJA NI NGUVU WOODEN','Pending','others',94),(21,784,1,0,'\0','UMOJA NI NGUVU WOODEN','Pending','others',94),(22,170,0,0,'\0','RAE 463E','Pending','others',52),(22,171,1,0,'\0','RAE 463E','Pending','others',52),(22,315,0,0,'\0','RAG160P','Pending','others',95),(22,334,1,0,'\0','RAG160P','Pending','others',95),(23,175,0,0,'\0','RAF 480U','Pending','others',53),(23,177,1,0,'\0','RAF 480U','Pending','others',53),(23,179,1,0,'\0','RAF 480U','Pending','others',53),(23,181,1,0,'\0','RAF 480U','Pending','others',53),(23,317,0,0,'\0','RAG548E','Pending','Box truck',96),(23,338,1,0,'\0','RAG548E','Pending','Box truck',96),(23,339,1,0,'\0','RAG548E','Pending','Box truck',96),(23,341,1,0,'\0','RAG548E','Pending','Box truck',96),(23,342,1,0,'\0','RAG548E','Pending','Box truck',96),(23,344,1,0,'\0','RAG548E','Pending','Box truck',96),(23,345,1,0,'\0','RAG548E','Pending','Box truck',96),(23,346,1,0,'\0','RAG548E','Pending','Box truck',96),(23,380,1,0,'\0','RAG548E','Pending','Box truck',96),(24,184,0,0,'\0','RAA872H','Pending','others',57),(24,185,1,0,'\0','RAA872H','Pending','others',57),(24,319,0,0,'\0','T559BKE','Pending','20ft container',97),(24,381,1,0,'\0','T559BKE','Pending','20ft container',97),(24,418,1,0,'\0','T559BKE','Pending','20ft container',97),(24,419,1,0,'\0','T559BKE','Pending','20ft container',97),(24,434,1,0,'\0','T559BKE','Pending','20ft container',97),(24,437,1,0,'\0','T559BKE','Pending','20ft container',97),(24,520,1,0,'\0','T559BKE','Pending','20ft container',97),(25,187,0,0,'\0','RAH793U','Pending','others',58),(25,188,1,0,'\0','RAH793U','Pending','others',58),(25,321,0,0,'\0','ITH XX','Pending','20ft container',98),(25,349,1,0,'\0','ITH XX','Pending','20ft container',98),(25,422,1,0,'\0','RAH107T','Pending','20ft container',98),(25,428,1,0,'\0','RAH107T','Pending','20ft container',98),(25,430,1,0,'\0','RAH107T','Pending','20ft container',98),(25,433,1,0,'\0','RAH107T','Pending','20ft container',98),(25,528,1,0,'\0','RAH107T','Pending','20ft container',98),(25,532,1,0,'\0','RAH107T','Pending','20ft container',98),(25,533,1,0,'\0','RAH107T','Pending','20ft container',98),(25,534,1,0,'\0','RAH107T','Pending','20ft container',98),(25,535,1,0,'\0','RAH107T','Pending','20ft container',98),(26,192,0,0,'\0','WOODEN BAOT - NKUNDABANYAGA','Pending','others',61),(26,323,0,0,'\0','STAR GENERAL XX','Pending','20ft container',99),(26,335,1,0,'\0','STAR GENERAL XX','Pending','20ft container',99),(26,417,1,0,'\0','STAR GENERAL XX','Pending','20ft container',99),(26,425,1,0,'\0','STAR GENERAL XX','Pending','20ft container',99),(26,517,1,0,'\0','STAR GENERAL XX','Pending','20ft container',99),(27,194,0,0,'\0','RAI 401C','Pending','others',62),(27,195,1,0,'\0','RAI 401C','Pending','others',62),(27,325,0,0,'\0','NKUNDABANYANGA XX','Pending','20ft container',100),(27,336,1,0,'\0','NKUNDABANYANGA XX','Pending','20ft container',100),(27,382,1,0,'\0','NKUNDABANYANGA XX','Pending','20ft container',100),(28,198,0,0,'\0','RAH620U','Pending','others',63),(28,199,1,0,'\0','RAH620U','Pending','others',63),(28,327,0,0,'\0','ORACION  XX','Pending','20ft container',101),(28,337,1,0,'\0','ORACION  XX','Pending','20ft container',101),(28,347,1,0,'\0','ORACION  XX','Pending','20ft container',101),(29,206,0,0,'\0','CGO0813AF/19','Pending','others',64),(29,329,0,0,'\0','IJETRA XX','Pending','20ft container',102),(29,340,1,0,'\0','IJETRA XX','Pending','20ft container',102),(29,348,1,0,'\0','IJETRA XX','Pending','20ft container',102),(30,208,0,0,'\0','RAE732B','Pending','20ft container',65),(30,331,0,0,'\0','NZABANDORA INNOCENT XX','Pending','20ft container',103),(30,343,1,0,'\0','NZABANDORA INNOCENT XX','Pending','20ft container',103),(31,333,0,0,'\0','EMS GENERAL XX','Pending','20ft container',104),(31,350,1,0,'\0','EMS GENERAL XX','Pending','20ft container',104),(31,351,1,0,'\0','EMS GENERAL XX','Pending','20ft container',104),(32,384,0,0,'\0','MUEDD START XX','Pending','Box truck',133),(32,391,1,0,'\0','RAB652A','Pending','Box truck',133),(32,413,1,0,'\0','RAB652A','Pending','Box truck',133),(32,414,1,0,'\0','RAB652A','Pending','Box truck',133),(32,813,1,0,'\0','RAB652A','Pending','Box truck',133),(32,814,1,0,'\0','RAB652A','Pending','Box truck',133),(33,394,0,0,'\0','FAITH TRADING XX','Pending','20ft container',134),(33,415,1,0,'\0','FAITH TRADING XX','Pending','20ft container',134),(34,396,0,0,'\0','AFRILOTT HOLDING XX','Pending','20ft container',135),(34,416,1,0,'\0','AFRILOTT HOLDING XX','Pending','20ft container',135),(34,427,1,0,'\0','AFRILOTT HOLDING XX','Pending','20ft container',135),(34,521,1,0,'\0','AFRILOTT HOLDING XX','Pending','20ft container',135),(34,522,1,0,'\0','AFRILOTT HOLDING XX','Pending','20ft container',135),(35,398,0,0,'\0','KAC GENERAL XX','Pending','20ft container',136),(35,420,1,0,'\0','KAC GENERAL XX','Pending','20ft container',136),(36,400,0,0,'\0','UNITED SECEMENT SELLERS XX','Pending','20ft container',137),(36,423,1,0,'\0','UNITED SECEMENT SELLERS XX','Pending','20ft container',137),(37,402,0,0,'\0','RWANDA SPECIAL MATERIALS XX','Pending','20ft container',138),(37,424,1,0,'\0','RWANDA SPECIAL MATERIALS XX','Pending','20ft container',138),(38,404,0,0,'\0','KA CO TRA XX','Pending','20ft container',139),(38,429,1,0,'\0','KA CO TRA XX','Pending','20ft container',139),(39,406,0,0,'\0','BAHATI MOSEKA JIRESSE XX','Pending','20ft container',140),(39,435,1,0,'\0','BAHATI MOSEKA JIRESSE XX','Pending','20ft container',140),(39,440,1,0,'\0','BAHATI MOSEKA JIRESSE XX','Pending','20ft container',140),(40,408,0,0,'\0','UWIZEYE EMMANUEL','Pending','others',141),(40,410,1,0,'\0','UWIZEYE EMMANUEL','Pending','others',141),(40,439,1,0,'\0','UWIZEYE EMMANUEL','Pending','others',141),(41,412,0,0,'\0','NYAMURINDA SPOIRE','Pending','others',143),(41,441,1,0,'\0','NYAMURINDA SPOIRE','Pending','others',143),(42,443,0,0,'\0','s','Pending','others',144),(42,444,1,0,'\0','s','Pending','others',144),(43,495,0,0,'\0','RAG063N','Pending','Box truck',193),(43,496,1,0,'\0','RAG063N','Pending','Box truck',193),(43,602,1,0,'\0','RAG063N','Pending','Box truck',193),(44,498,0,0,'\0','VIP PHILIPPE xx','Pending','others',194),(44,515,1,0,'\0','VIP PHILIPPE xx','Pending','others',194),(45,500,0,0,'\0','NTAKIRUTIMANA FILS xx','Pending','others',195),(45,518,1,0,'\0','NTAKIRUTIMANA FILS xx','Pending','others',195),(46,502,0,0,'\0','HABIYAREMYE JEAN D\'AMOUR xx','Pending','others',196),(46,519,1,0,'\0','HABIYAREMYE JEAN D\'AMOUR xx','Pending','others',196),(47,504,0,0,'\0','JULES MUHAMA xx','Pending','others',197),(47,523,1,0,'\0','JULES MUHAMA xx','Pending','others',197),(48,506,0,0,'\0','DISTRFAM LTD xx','Pending','others',198),(48,524,1,0,'\0','DISTRFAM LTD xx','Pending','others',198),(49,508,0,0,'\0','UMUTONI GENERAL xx','Pending','others',199),(49,525,1,0,'\0','UMUTONI GENERAL xx','Pending','others',199),(49,526,1,0,'\0','UMUTONI GENERAL xx','Pending','others',199),(49,538,1,0,'\0','UMUTONI GENERAL xx','Pending','others',199),(50,510,0,0,'\0','RIJ COMPANY  xx','Pending','others',200),(50,512,1,0,'\0','RIJ COMPANY  xx','Pending','others',200),(50,527,1,0,'\0','RIJ COMPANY  xx','Pending','others',200),(51,514,0,0,'\0','UWINEZA MARIE CHANTAL  xx','Pending','others',202),(51,536,1,0,'\0','UWINEZA MARIE CHANTAL  xx','Pending','others',202),(52,586,0,0,'\0','KAMU','Pending','others',245),(53,588,0,0,'\0','MALI NI WATU','Pending','others',246),(53,603,1,0,'\0','MALI NI WATU','Pending','others',246),(53,680,1,0,'\0','MALI NI WATU','Pending','others',246),(53,779,1,0,'\0','MALI NI WATU','Pending','others',246),(54,590,0,0,'\0','WIH RWANDA XX','Pending','others',247),(54,592,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,604,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,605,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,611,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,612,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,613,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,614,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,615,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,616,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,617,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,618,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,619,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,620,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,621,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,622,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,623,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,624,1,0,'\0','WIH RWANDA XX','Pending','others',247),(54,625,1,0,'\0','WIH RWANDA XX','Pending','others',247),(55,594,0,0,'\0','INGABIRE GENERAL XX','Pending','others',249),(55,606,1,0,'\0','INGABIRE GENERAL XX','Pending','others',249),(56,596,0,0,'\0','GAHUNGU BUSINESS XX','Pending','others',250),(56,607,1,0,'\0','GAHUNGU BUSINESS XX','Pending','others',250),(57,598,0,0,'\0','RAH519W','Pending','others',251),(57,608,1,0,'\0','RAH519W','Pending','others',251),(58,600,0,0,'\0','KAMO','Pending','others',252),(58,601,1,0,'\0','KAMO','Pending','others',252),(58,610,1,0,'\0','KAMO','Pending','others',252),(59,640,0,0,'\0','RAG851J','Pending','others',267),(59,641,1,0,'\0','RAG851J','Pending','others',267),(60,643,0,0,'\0','RAE280D-RL2420','Pending','20ft container',268),(61,651,0,0,'\0','RAE872R','Pending','Box truck',272),(62,653,0,0,'\0','RAA972H','Pending','others',273),(62,654,1,0,'\0','RAA972H','Pending','others',273),(63,657,0,0,'\0','RAC306','Pending','others',276),(63,658,1,0,'\0','RAC306','Pending','others',276),(63,761,1,0,'\0','RAC306K','Pending','others',276),(63,762,1,0,'\0','RAC306K','Pending','others',276),(64,663,0,0,'\0','RAG572','Pending','others',278),(64,664,1,0,'\0','RAG572','Pending','others',278),(65,666,0,0,'\0','rdf586r','Pending','others',279),(65,667,1,0,'\0','rdf586r','Pending','others',279),(66,669,0,0,'\0','RAF904S','Pending','others',280),(66,670,1,0,'\0','RAF904S','Pending','others',280),(67,675,0,0,'\0','RD862X','Pending','others',293),(67,676,1,0,'\0','RD862X','Pending','others',293),(68,678,0,0,'\0','RH645W','Pending','others',294),(68,679,1,0,'\0','RH645W','Pending','others',294),(69,682,0,0,'\0','T504DML','Pending','others',295),(69,683,1,0,'\0','T504DML','Pending','others',295),(70,687,0,0,'\0','RAC132G','Pending','others',298),(70,688,1,0,'\0','RAC132G','Pending','others',298),(70,717,1,0,'\0','RAC132G','Pending','others',298),(70,718,1,0,'\0','RAC132G','Pending','others',298),(71,690,0,0,'\0','RAG776S','Pending','Box truck',299),(71,691,1,0,'\0','RAG776S','Pending','Box truck',299),(72,693,0,0,'\0','RAE923G','Pending','others',300),(72,694,1,0,'\0','RAE923G','Pending','others',300),(73,696,0,0,'\0','RAG950L','Pending','others',301),(73,697,1,0,'\0','RAG950L','Pending','others',301),(74,701,0,0,'\0','UMUTONI GENERAL','Pending','others',312),(74,702,1,0,'\0','UMUTONI GENERAL','Pending','others',312),(74,704,1,0,'\0','UMUTONI GENERAL','Pending','others',312),(74,705,1,0,'\0','UMUTONI GENERAL','Pending','others',312),(74,712,1,0,'\0','UMUTONI GENERAL','Pending','others',312),(74,713,1,0,'\0','UMUTONI GENERAL','Pending','others',312),(75,707,0,0,'\0','RAH723E','Pending','others',314),(75,708,1,0,'\0','RAH723E','Pending','others',314),(76,728,0,0,'\0','RAF235V','Pending','others',331),(76,729,1,0,'\0','RAF235V','Pending','others',331),(77,731,0,0,'\0','RAG943U','Pending','others',332),(77,732,1,0,'\0','RAG943U','Pending','others',332),(78,736,0,0,'\0','KDL906L/ZH3013','Pending','others',335),(78,737,1,0,'\0','KDL906L-ZH3013','Pending','others',335),(79,741,0,0,'\0','RAE101W-RL3149','Pending','20ft container',338),(80,745,0,0,'\0','RAG058N','Pending','others',340),(80,746,1,0,'\0','RAG058N','Pending','others',340),(80,789,1,0,'\0','RAG058N','Pending','others',340),(81,752,0,0,'\0','RAF962N','Pending','20ft container',345),(82,756,0,0,'\0','RAG950U','Pending','others',347),(82,758,1,0,'\0','RAG950U','Pending','others',347),(83,767,0,0,'\0','RAA872H','Pending','others',351),(83,770,1,0,'\0','RAA872H','Pending','others',351),(83,778,1,0,'\0','RAA872H','Pending','others',351),(84,775,0,0,'\0','RAD254T','Pending','others',352),(84,776,1,0,'\0','RAD254T','Pending','others',352),(85,786,0,0,'\0','LUKA YAYO','Pending','others',357),(85,787,1,0,'\0','LUKA YAYO','Pending','others',357),(86,793,0,0,'\0','T285EFN','Pending','others',358),(86,794,1,0,'\0','T285EFN','Pending','others',358),(86,796,1,0,'\0','T285EFN','Pending','others',358),(87,798,0,0,'\0','T283EFN','Pending','others',359),(87,799,1,0,'\0','T283EFN','Pending','others',359),(88,809,0,0,'\0','RAC485M','Pending','others',368),(88,810,1,0,'\0','RAC485M','Pending','others',368),(89,824,0,0,'\0','T888DMS','Pending','2x20ft container',382),(89,825,1,0,'\0','T888DMS','Pending','2x20ft container',382);
/*!40000 ALTER TABLE `truck_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_entry`
--

DROP TABLE IF EXISTS `truck_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_entry` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cargo_owner` varchar(80) NOT NULL,
  `cargo_type` varchar(80) NOT NULL,
  `full_or_empty` varchar(80) NOT NULL,
  `full_vessel_truck_warehouse` varchar(80) NOT NULL,
  `get_in_time` datetime NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `seal_number` varchar(80) DEFAULT NULL,
  `weight_of_truck` int(11) NOT NULL,
  `truck_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg5ri1i8sxy5a7twysx7rwb5bp` (`truck_id`),
  CONSTRAINT `FKg5ri1i8sxy5a7twysx7rwb5bp` FOREIGN KEY (`truck_id`) REFERENCES `truck` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_entry`
--

LOCK TABLES `truck_entry` WRITE;
/*!40000 ALTER TABLE `truck_entry` DISABLE KEYS */;
INSERT INTO `truck_entry` VALUES (1,'SEBAGENI','Cooking Oil','Empty','Other','2025-04-05 08:00:00','\0','x',31,1),(2,'NDAYAMBAJE DANNY','CEMENT','Empty','Other','2025-04-05 09:00:00','\0','X',35,2),(3,'KWIZERA PLACIDE','CEMENT','Empty','Other','2025-04-01 09:00:00','\0','X',35,3),(4,'JIRESSE','cement','Empty','Other','2025-04-01 10:00:00','\0','X',31,4),(5,'JIRESSE','SUGAR','Empty','Other','2025-04-01 10:12:00','\0','X',27,5),(6,'JIRESSE','SUGAR','Empty','Other','2025-04-01 10:30:00','\0','X',27,6),(7,'INNOCENT','SALT','Empty','Other','2025-04-01 11:30:00','\0','X',34,6),(8,'SAGAP HOSE Ltd','CEMENT','Empty','Other','2025-04-01 11:30:00','\0','X',30,7),(9,'NA','UNKOWN','Empty','Other','2025-04-01 12:30:00','\0','X',40,8),(10,'NA','CEMENT','Empty','Other','2025-04-01 12:30:00','\0','X',25,9),(11,'NA','CEMENT','Empty','Other','2025-04-01 12:30:00','\0','X',39,10),(12,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-01 12:30:00','\0','X',45,11),(13,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-01 12:30:00','\0','X',34,12),(14,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-02 12:30:00','\0','X',0,13),(15,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-02 14:30:00','\0','X',35,14),(16,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-02 11:16:00','\0','X',0,15),(17,'NAOH XX','NA','Empty','Other','2025-04-01 16:27:00','\0','X',0,16),(18,'CIMERWA','CEMENT','Empty','Other','2025-04-01 16:27:00','\0','X',0,17),(19,'KAFUPI GOMA DRC','CEMENT','Empty','Other','2025-04-01 16:27:00','\0','X',5,18),(20,'MUTONI GENERAL','MUTZIG BEER','Empty','Other','2025-04-01 15:45:00','\0','X',6,19),(21,'AJOA TRADERS Ltd','CEMENT','Full','Other','2025-04-01 10:45:00','\0','X',40,19),(22,'INNOCENT','Salt','Full','Other','2025-04-01 13:06:00','\0','x',34,20),(23,'UMOJA NI NGUVU','NA','Full','Other','2025-04-09 14:42:00','\0','X',0,21),(24,'xx x','y','Empty','Other','2025-04-03 10:59:00','\0',' x ',0,22),(25,'BAHATI JIRESS','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,23),(26,'HILL GENERAL ','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,24),(27,'ITH','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,25),(28,'STAR GENERAL','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,26),(29,'NKUNDABANYANGA','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,27),(30,'ORACION','X','Empty','Other','2025-04-03 12:00:00','\0','X',0,28),(31,'IJETRA','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,29),(32,'NZABANDORA INNOCENT ','X','Empty','Other','2025-04-03 12:00:00','\0','X',0,30),(33,'EMS GENERAL','X','Empty','Other','2025-04-03 12:00:00','\0','X',-1,31),(34,'MUEDD START ','CEMENT','Empty','Other','2025-04-04 12:00:00','\0','X',0,32),(35,'FAITH TRADING','UKNOWN','Empty','Other','2025-04-04 12:00:00','\0','X',0,33),(36,'AFRILOTT HOLDING','xx','Empty','Other','2025-04-04 12:00:00','\0','X',8,34),(37,'KAC GENERAL','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,35),(38,'UNITED SECEMENT SELLERS','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,36),(39,'RWANDA SPECIAL MATERIAL','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,37),(40,'KA CO TRA','X','Empty','Other','2025-04-04 12:00:00','\0','X',0,38),(41,'BAHATI MOSEKA JIRESSE','X','Empty','Other','2025-04-04 12:00:00','\0','X',0,39),(42,'UWIZEYE EMMANUEL','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,40),(43,'UWIZEYE EMMANUEL','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,40),(44,'NYAMURINDA SPOIRE','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,41),(45,'s','xx','Empty','Other','2025-04-04 12:00:00','\0','x',0,42),(46,'WEH RWANDA CEMENT','CEMENT','Full','Other','2025-04-06 11:02:00','\0','X',35,43),(47,'VIP PHILIPPE','UKNOWN','Empty','Other','2025-04-05 12:00:00','\0','X',0,44),(48,'NTAKIRUTIMANA FILS','UKNOWN','Empty','Other','2025-04-05 12:00:00','\0','X',0,45),(49,'HABIYAREMYE JEAN D\'AMOUR','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,46),(50,'JULES MUHAMA','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,47),(51,'DISTRFAM LTD','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,48),(52,'UMUTONI GENERAL','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,49),(53,'RIJ COMPANY ','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,50),(54,'RIJ COMPANY ','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,50),(55,'UWINEZA MARIE CHANTAL','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,51),(56,'KAMU','xx','Empty','Other','2025-04-06 09:00:00','\0','xx',0,52),(57,'MALI NI WATU','XX','Empty','Other','2025-04-09 09:00:00','\0','xx',0,53),(58,'WIH RWANDA','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,54),(59,'WIH RWANDA','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,54),(60,'INGABIRE GENERAL','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,55),(61,'GAHUNGU BUSINESS','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,56),(62,'RAH519','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,57),(63,'KAMO','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,58),(64,'UNITED CEMENT SELLERS','CEMENT','Empty','Vessel','2025-04-08 09:11:00','\0','NONE',4,59),(65,'HILL GENERAL TRADING','SUGAR','Full','Warehouse','2025-04-08 09:29:00','\0','X',27,60),(66,'ITH','CEMENT','Empty','Vessel','2025-04-08 09:55:00','\0','NONE',6,2),(67,'RUTAYISIRE JAMES','CHAIRS','Full','Other','2025-04-08 10:24:00','\0','X',1,61),(68,'UMUTONI GENERAL','CAISSES','Empty','Other','2025-04-08 10:21:00','\0','X',1,62),(69,'ALOYS X','CEMENT','Empty','Other','2025-04-08 10:46:00','\0','X',5,63),(70,'IJETRA','CEMENT','Empty','Vessel','2025-04-08 11:31:00','\0','NONE',3,18),(71,'FAITH TRADING COMPANY','sugar','Full','Warehouse','2025-04-08 12:03:00','\0','x',27287,64),(72,'AFRILOTT HOLDING','PAKISTAN RICE','Full','Other','2025-04-08 12:05:00','\0','X',1225,65),(73,'AFRILOTT HOLDING','PAKISTAN RICE','Empty','Warehouse','2025-04-08 12:10:00','\0','X',35000,66),(74,'KAMU','caisse','Full','Other','2025-04-08 12:41:00','\0','x',600,67),(75,'KAMO','CAISSE','Full','Other','2025-04-08 12:46:00','\0','x',600,68),(76,'HILL GENERAL','COOKING OIL','Full','Other','2025-04-08 13:25:00','\0','X',1340,69),(77,'ALOYS','CEMENT','Empty','Other','2025-04-08 13:50:00','\0','X',5,70),(78,'UWAMAHORO VESTINE','BEER','Empty','Other','2025-04-08 13:56:00','\0','X',15,71),(79,'NIYONSENGA XX','GLASSES','Full','Other','2025-04-08 14:41:00','\0','NONE',0,72),(80,'TRADING URIM LTD','CEMENT','Full','Vessel','2025-04-08 15:37:00','\0','NONE',0,73),(81,'UMUTONI GENERAL','BEER','Full','Other','2025-04-08 16:05:00','\0','NONE',0,74),(82,'UMUTONI GENERAL','BEER','Empty','Vessel','2025-04-08 16:09:00','\0','NONE',0,74),(83,'HABIYAREMYE JEAN DAMOUR','TUBES','Full','Other','2025-04-08 16:22:00','\0','NONE',0,75),(84,'UMUTONI GENERAL','BEER','Full','Other','2025-04-08 17:04:00','\0','NONE',0,74),(85,'ITH ','CEMENT','Empty','Vessel','2025-04-09 09:31:00','\0','NONE',5,70),(86,'ITH','CEMENT','Empty','Vessel','2025-04-09 09:36:00','\0','NONE',6,2),(87,'ITH','CEMENT','Empty','Vessel','2025-04-09 09:41:00','\0','NONE',0,18),(88,'UWAMAHORO VESTINE','BEER','Full','Other','2025-04-09 09:04:00','\0','NONE',0,76),(89,'ITH','CEMENT','Empty','Vessel','2025-04-09 09:43:00','\0','NONE',0,77),(90,'ATIG INVESTMENT','ASSORTED','Full','Vessel','2025-04-01 10:45:00','\0','BS197130',0,78),(91,'FAITH TRADING COMPANY','SUGAR','Empty','Other','2025-04-09 12:12:00','\0','X',35,79),(92,'KAC GENERAL','cement','Empty','Other','2025-04-09 06:00:00','\0','x',0,80),(93,'FAITH TRADING COMPANY','COOKING OIL','Empty','Other','2025-04-09 12:12:00','\0','XX',27000,81),(94,'ITH','CEMENT','Empty','Vessel','2025-04-09 12:53:00','\0','NONE',0,82),(95,'ITH','CEMENT','Empty','Vessel','2025-04-09 13:04:00','\0','NONE',0,63),(96,'UMUTONI GENERAL','CRATE','Empty','Truck','2025-04-09 10:32:00','\0','XXX',4,83),(97,'FAITH TRADING COMPANY Ltd','Suger','Full','Other','2025-04-09 12:17:00','\0','xxx',4,84),(98,'IDI MUUBWO','CRATES OF BEER','Empty','Other','2025-04-09 10:00:00','\0','X',0,85),(99,'FAITH  TRADING COMPANY','SUGAR','Empty','Other','2025-04-09 12:20:00','\0','X',0,86),(100,'FAITH TRADING COMPANY','sugar','Empty','Other','2025-04-09 11:36:00','\0','x',0,87),(101,'Emmanuel xx','BEER','Full','Other','2025-04-09 14:50:00','\0','XXX',0,88),(102,'MUEED STAR','WHEAT FLOUR','Full','Other','2025-04-09 16:24:00','\0','NONE',0,32),(103,'HILL GENERAL TRADING LTD','COOKING OIL','Full','Vessel','2025-04-09 16:48:00','\0','BS001398',0,89);
/*!40000 ALTER TABLE `truck_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_entry_aud`
--

DROP TABLE IF EXISTS `truck_entry_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_entry_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `cargo_owner` varchar(80) DEFAULT NULL,
  `cargo_type` varchar(80) DEFAULT NULL,
  `full_or_empty` varchar(80) DEFAULT NULL,
  `full_vessel_truck_warehouse` varchar(80) DEFAULT NULL,
  `get_in_time` datetime DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `seal_number` varchar(80) DEFAULT NULL,
  `weight_of_truck` int(11) DEFAULT NULL,
  `truck_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FK9j8v72c2syje0mmpqhstpf44e` (`rev`),
  CONSTRAINT `FK9j8v72c2syje0mmpqhstpf44e` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_entry_aud`
--

LOCK TABLES `truck_entry_aud` WRITE;
/*!40000 ALTER TABLE `truck_entry_aud` DISABLE KEYS */;
INSERT INTO `truck_entry_aud` VALUES (1,71,0,'CEMENT','Empty','Vessel','2025-04-01 09:00:00','0000-00-00 00:00:00','\0','0',1,NULL),(1,216,0,'SEBAGENI','Cooking oil','Empty','Other','2025-04-04 09:00:00','\0','s1',31,1),(1,220,0,'SEBAGENI','Cooking Oil','Empty','Other','2025-04-05 08:00:00','\0','x',31,1),(2,78,0,'COOKING OIL','Full','Warehouse','2025-04-01 14:00:00','0000-00-00 00:00:00','\0','0',7,0),(2,218,0,'NDAYAMBAJE','CEMENT','Empty','Other','2025-04-01 09:12:00','\0','s2',35,2),(2,243,0,'NDAYAMBAJE DANNY','CEMENT','Empty','Other','2025-04-05 09:00:00','\0','X',35,2),(3,87,0,'CEMENT','Empty','Vessel','2025-04-01 16:27:00','0000-00-00 00:00:00','\0','0',8,0),(3,245,0,'KWIZERA PLACIDE','CEMENT','Empty','Other','2025-04-01 09:00:00','\0','X',35,3),(4,91,0,'CEMENT','Empty','Vessel','2025-04-01 16:42:00','0000-00-00 00:00:00','\0','0',9,0),(4,247,0,'JIRESSE','cement','Empty','Other','2025-04-01 10:00:00','\0','X',31,4),(5,111,0,'BEER','Full','Other','2025-04-02 10:38:00','0000-00-00 00:00:00','\0','0',10,0),(5,249,0,'JIRESSE','SUGAR','Empty','Other','2025-04-01 10:12:00','\0','X',27,5),(6,116,0,'CEMENT','Empty','Vessel','2025-04-02 11:16:00','0000-00-00 00:00:00','\0','0',11,0),(6,251,0,'JIRESSE','SUGAR','Empty','Other','2025-04-01 10:30:00','\0','X',27,6),(7,119,0,'CEMENT','Empty','Vessel','2025-04-02 11:23:00','0000-00-00 00:00:00','\0','0',12,0),(7,253,0,'INNOCENT','SALT','Empty','Other','2025-04-01 11:30:00','\0','X',34,6),(8,122,0,'CEMENT','Empty','Vessel','2025-04-02 11:26:00','0000-00-00 00:00:00','\0','0',9,0),(8,255,0,'SAGAP HOSE Ltd','CEMENT','Empty','Other','2025-04-01 11:30:00','\0','X',30,7),(9,125,0,'CEMENT','Empty','Vessel','2025-04-02 11:30:00','0000-00-00 00:00:00','\0','0',13,0),(9,257,0,'NA','UNKOWN','Empty','Other','2025-04-01 12:30:00','\0','X',40,8),(10,128,0,'CEMENT','Empty','Vessel','2025-04-02 11:34:00','0000-00-00 00:00:00','\0','0',14,0),(10,259,0,'NA','CEMENT','Empty','Other','2025-04-01 12:30:00','\0','X',25,9),(11,131,0,'CEMENT','Empty','Vessel','2025-04-02 11:38:00','0000-00-00 00:00:00','\0','0',15,0),(11,261,0,'NA','CEMENT','Empty','Other','2025-04-01 12:30:00','\0','X',39,10),(12,134,0,'CEMENT','Empty','Vessel','2025-04-02 11:45:00','0000-00-00 00:00:00','\0','0',16,0),(12,263,0,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-01 12:30:00','\0','X',45,11),(13,137,0,'CEMENT','Empty','Vessel','2025-04-02 13:03:00','0000-00-00 00:00:00','\0','0',17,0),(13,265,0,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-01 12:30:00','\0','X',34,12),(14,143,0,'ANGELS STEEL','Full','Vessel','2025-04-02 13:42:00','0000-00-00 00:00:00','\0','0',18,0),(14,267,0,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-02 12:30:00','\0','X',0,13),(15,148,0,'beer','Empty','Truck','2025-04-02 14:36:00','0000-00-00 00:00:00','\0','0',19,0),(15,269,0,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-02 14:30:00','\0','X',35,14),(16,154,0,'INDIAN RICE','Full','Other','2025-04-02 15:29:00','0000-00-00 00:00:00','\0','0',20,0),(16,271,0,'NAOH AND CLAUDE HARDWARE','CEMENT','Empty','Other','2025-04-02 11:16:00','\0','X',0,15),(17,159,0,'CEMENT','Full','Other','2025-04-02 16:50:00','0000-00-00 00:00:00','\0','0',21,0),(17,273,0,'NAOH XX','NA','Empty','Other','2025-04-01 16:27:00','\0','X',0,16),(18,165,0,'CEMENT','Full','Other','2025-04-03 09:00:00','0000-00-00 00:00:00','\0','0',21,0),(18,275,0,'CIMERWA','CEMENT','Empty','Other','2025-04-01 16:27:00','\0','X',0,17),(19,170,0,'CEMENT','Empty','Other','2025-04-03 09:15:00','0000-00-00 00:00:00','\0','0',22,0),(19,277,0,'KAFUPI GOMA DRC','CEMENT','Empty','Other','2025-04-01 16:27:00','\0','X',5,18),(20,175,0,'CEMENT','Empty','Other','2025-04-03 10:00:00','0000-00-00 00:00:00','\0','0',23,0),(20,279,0,'MUTONI GENERAL','MUTZIG BEER','Empty','Other','2025-04-01 15:45:00','\0','X',6,19),(21,177,0,'CEMENT','Empty','Other','2025-04-03 10:00:00','0000-00-00 00:00:00','\0','0',23,0),(21,281,0,'AJOA TRADERS Ltd','CEMENT','Full','Other','2025-04-01 10:45:00','\0','X',40,19),(22,179,0,'CEMENT','Empty','Other','2025-04-03 10:00:00','0000-00-00 00:00:00','\0','0',23,0),(22,296,0,'INNOCENT','Salt','Full','Other','2025-04-01 13:06:00','\0','x',34,20),(23,181,0,'CEMENT','Empty','Other','2025-04-03 10:00:00','0000-00-00 00:00:00','\0','0',23,0),(23,311,0,'UMOJA NI NGUVU','NA','Full','Other','2025-04-02 14:42:00','\0','X',0,21),(24,184,0,'BEER','Empty','Vessel','2025-04-03 08:41:00','0000-00-00 00:00:00','\0','3',24,0),(24,315,0,'xx x','y','Empty','Other','2025-04-03 10:59:00','\0',' x ',0,22),(25,187,0,'ASSORTED ITEMS','Full','Other','2025-04-03 09:48:00','0000-00-00 00:00:00','\0','0',25,0),(25,317,0,'BAHATI JIRESS','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,23),(26,192,0,'CEMENT','Empty','Vessel','2025-04-01 14:00:00','0000-00-00 00:00:00','\0','45',26,0),(26,319,0,'HILL GENERAL ','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,24),(27,194,0,'CEMENT','Empty','Vessel','2025-04-03 10:16:00','0000-00-00 00:00:00','\0','0',27,0),(27,321,0,'ITH','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,25),(28,198,0,'CEMENT','Empty','Other','2025-04-03 11:30:00','0000-00-00 00:00:00','\0','0',28,0),(28,323,0,'STAR GENERAL','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,26),(29,206,0,'TILES','Full','Other','2025-04-03 14:23:00','0000-00-00 00:00:00','\0','0',29,0),(29,325,0,'NKUNDABANYANGA','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,27),(30,208,0,'SUGAR','Full','Other','2025-04-03 14:59:00','0000-00-00 00:00:00','\0','0',30,0),(30,327,0,'ORACION','X','Empty','Other','2025-04-03 12:00:00','\0','X',0,28),(31,329,0,'IJETRA','XX','Empty','Other','2025-04-03 12:00:00','\0','X',0,29),(32,331,0,'NZABANDORA INNOCENT ','X','Empty','Other','2025-04-03 12:00:00','\0','X',0,30),(33,333,0,'EMS GENERAL','X','Empty','Other','2025-04-03 12:00:00','\0','X',-1,31),(34,384,0,'MUEDD START ','CEMENT','Empty','Other','2025-04-04 12:00:00','\0','X',0,32),(35,394,0,'FAITH TRADING','UKNOWN','Empty','Other','2025-04-04 12:00:00','\0','X',0,33),(36,396,0,'AFRILOTT HOLDING','xx','Empty','Other','2025-04-04 12:00:00','\0','X',8,34),(37,398,0,'KAC GENERAL','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,35),(38,400,0,'UNITED SECEMENT SELLERS','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,36),(39,402,0,'RWANDA SPECIAL MATERIAL','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,37),(40,404,0,'KA CO TRA','X','Empty','Other','2025-04-04 12:00:00','\0','X',0,38),(41,406,0,'BAHATI MOSEKA JIRESSE','X','Empty','Other','2025-04-04 12:00:00','\0','X',0,39),(42,408,0,'UWIZEYE EMMANUEL','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,40),(43,410,0,'UWIZEYE EMMANUEL','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,40),(44,412,0,'NYAMURINDA SPOIRE','NA','Empty','Other','2025-04-04 12:00:00','\0','X',0,41),(45,443,0,'s','xx','Empty','Other','2025-04-04 12:00:00','\0','x',0,42),(46,495,0,'WEH RWANDA CEMENT','CEMENT','Full','Other','2025-04-06 11:02:00','\0','X',35,43),(47,498,0,'VIP PHILIPPE','UKNOWN','Empty','Other','2025-04-05 12:00:00','\0','X',0,44),(48,500,0,'NTAKIRUTIMANA FILS','UKNOWN','Empty','Other','2025-04-05 12:00:00','\0','X',0,45),(49,502,0,'HABIYAREMYE JEAN D\'AMOUR','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,46),(50,504,0,'JULES MUHAMA','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,47),(51,506,0,'DISTRFAM LTD','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,48),(52,508,0,'UMUTONI GENERAL','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,49),(53,510,0,'RIJ COMPANY ','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,50),(54,512,0,'RIJ COMPANY ','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,50),(55,514,0,'UWINEZA MARIE CHANTAL','NA','Empty','Other','2025-04-05 12:00:00','\0','X',0,51),(56,586,0,'KAMU','xx','Empty','Other','2025-04-06 09:00:00','\0','xx',0,52),(57,588,0,'MALI NI WATU','XX','Empty','Other','2025-04-06 09:00:00','\0','xx',0,53),(58,590,0,'WIH RWANDA','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,54),(59,592,0,'WIH RWANDA','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,54),(60,594,0,'INGABIRE GENERAL','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,55),(61,596,0,'GAHUNGU BUSINESS','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,56),(62,598,0,'RAH519','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,57),(63,600,0,'KAMO','X','Empty','Other','2025-04-06 09:00:00','\0','xx',0,58),(64,640,0,'UNITED CEMENT SELLERS','CEMENT','Empty','Vessel','2025-04-08 09:11:00','\0','NONE',4,59),(65,643,0,'HILL GENERAL TRADING','SUGAR','Full','Warehouse','2025-04-08 09:29:00','\0','X',27,60),(66,647,0,'ITH','CEMENT','Empty','Vessel','2025-04-08 09:55:00','\0','NONE',6,2),(67,651,0,'RUTAYISIRE JAMES','CHAIRS','Full','Other','2025-04-08 10:24:00','\0','X',1,61),(68,653,0,'UMUTONI GENERAL','CAISSES','Empty','Other','2025-04-08 10:21:00','\0','X',1,62),(69,657,0,'ALOYS X','CEMENT','Empty','Other','2025-04-08 10:46:00','\0','X',5,63),(70,660,0,'IJETRA','CEMENT','Empty','Vessel','2025-04-08 11:31:00','\0','NONE',3,18),(71,663,0,'FAITH TRADING COMPANY','sugar','Full','Warehouse','2025-04-08 12:03:00','\0','x',27287,64),(72,666,0,'AFRILOTT HOLDING','PAKISTAN RICE','Full','Other','2025-04-08 12:05:00','\0','X',1225,65),(73,669,0,'AFRILOTT HOLDING','PAKISTAN RICE','Empty','Warehouse','2025-04-08 12:10:00','\0','X',35000,66),(74,675,0,'KAMU','caisse','Full','Other','2025-04-08 12:41:00','\0','x',600,67),(75,678,0,'KAMO','CAISSE','Full','Other','2025-04-08 12:46:00','\0','x',600,68),(76,682,0,'HILL GENERAL','COOKING OIL','Full','Other','2025-04-08 13:25:00','\0','X',1340,69),(77,687,0,'ALOYS','CEMENT','Empty','Other','2025-04-08 13:50:00','\0','X',5,70),(78,690,0,'UWAMAHORO VESTINE','BEER','Empty','Other','2025-04-08 13:56:00','\0','X',15,71),(79,693,0,'NIYONSENGA XX','GLASSES','Full','Other','2025-04-08 14:41:00','\0','NONE',0,72),(80,696,0,'TRADING URIM LTD','CEMENT','Full','Vessel','2025-04-08 15:37:00','\0','NONE',0,73),(81,701,0,'UMUTONI GENERAL','BEER','Full','Other','2025-04-08 16:05:00','\0','NONE',0,74),(82,704,0,'UMUTONI GENERAL','BEER','Empty','Vessel','2025-04-08 16:09:00','\0','NONE',0,74),(83,707,0,'HABIYAREMYE JEAN DAMOUR','TUBES','Full','Other','2025-04-08 16:22:00','\0','NONE',0,75),(84,712,0,'UMUTONI GENERAL','BEER','Full','Other','2025-04-08 17:04:00','\0','NONE',0,74),(85,717,0,'ITH ','CEMENT','Empty','Vessel','2025-04-09 09:31:00','\0','NONE',5,70),(86,720,0,'ITH','CEMENT','Empty','Vessel','2025-04-09 09:36:00','\0','NONE',6,2),(87,723,0,'ITH','CEMENT','Empty','Vessel','2025-04-09 09:41:00','\0','NONE',0,18),(88,728,0,'UWAMAHORO VESTINE','BEER','Full','Other','2025-04-09 09:04:00','\0','NONE',0,76),(89,731,0,'ITH','CEMENT','Empty','Vessel','2025-04-09 09:43:00','\0','NONE',0,77),(90,736,0,'ATIG INVESTMENT','ASSORTED','Full','Vessel','2025-04-09 10:45:00','\0','BS197130',0,78),(91,741,0,'FAITH TRADING COMPANY','SUGAR','Empty','Other','2025-04-09 12:12:00','\0','X',35,79),(92,745,0,'KAC GENERAL','cement','Empty','Other','2025-04-09 06:00:00','\0','x',0,80),(93,752,0,'FAITH TRADING COMPANY','COOKING OIL','Empty','Other','2025-04-09 12:12:00','\0','XX',27000,81),(94,756,0,'ITH','CEMENT','Empty','Vessel','2025-04-09 12:53:00','\0','NONE',0,82),(95,761,0,'ITH','CEMENT','Empty','Vessel','2025-04-09 13:04:00','\0','NONE',0,63),(96,767,0,'UMUTONI GENERAL','CRATE','Empty','Truck','2025-04-09 10:32:00','\0','XXX',4,83),(97,775,0,'FAITH TRADING COMPANY Ltd','Suger','Full','Other','2025-04-09 12:17:00','\0','xxx',4,84),(98,786,0,'IDI MUUBWO','CRATES OF BEER','Empty','Other','2025-04-09 10:00:00','\0','X',0,85),(99,793,0,'FAITH  TRADING COMPANY','SUGAR','Empty','Other','2025-04-09 12:20:00','\0','X',0,86),(100,798,0,'FAITH TRADING COMPANY','sugar','Empty','Other','2025-04-09 11:36:00','\0','x',0,87),(101,809,0,'Emmanuel xx','BEER','Full','Other','2025-04-09 14:50:00','\0','XXX',0,88),(102,813,0,'MUEED STAR','WHEAT FLOUR','Full','Other','2025-04-09 16:24:00','\0','NONE',0,32),(103,824,0,'HILL GENERAL TRADING LTD','COOKING OIL','Full','Vessel','2025-04-09 16:48:00','\0','BS001398',0,89);
/*!40000 ALTER TABLE `truck_entry_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_exit`
--

DROP TABLE IF EXISTS `truck_exit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_exit` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `get_out_time` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `truck_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK37lb7f9xllx9c91ca72bu6m78` (`truck_id`),
  CONSTRAINT `FK37lb7f9xllx9c91ca72bu6m78` FOREIGN KEY (`truck_id`) REFERENCES `truck` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_exit`
--

LOCK TABLES `truck_exit` WRITE;
/*!40000 ALTER TABLE `truck_exit` DISABLE KEYS */;
INSERT INTO `truck_exit` VALUES (1,'13:00','\0',80),(2,'14:50','\0',86);
/*!40000 ALTER TABLE `truck_exit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_exit_aud`
--

DROP TABLE IF EXISTS `truck_exit_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_exit_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `get_out_time` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `truck_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKb1b0a5w33qeh76bbr9hil5rr6` (`rev`),
  CONSTRAINT `FKb1b0a5w33qeh76bbr9hil5rr6` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_exit_aud`
--

LOCK TABLES `truck_exit_aud` WRITE;
/*!40000 ALTER TABLE `truck_exit_aud` DISABLE KEYS */;
INSERT INTO `truck_exit_aud` VALUES (1,168,0,'08:40','\0',21),(1,789,0,'13:00','\0',80),(2,796,0,'14:50','\0',86);
/*!40000 ALTER TABLE `truck_exit_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_parking_invoice`
--

DROP TABLE IF EXISTS `truck_parking_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_parking_invoice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `entry_time` varchar(80) NOT NULL,
  `fee` int(11) NOT NULL,
  `get_out_time` datetime NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `licence_plate_number` varchar(80) NOT NULL,
  `total_days` int(11) NOT NULL,
  `total_hours` int(11) NOT NULL,
  `total_min` int(11) NOT NULL,
  `truck_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7585lda9kj5c3e7ahob7gjqjw` (`truck_id`),
  CONSTRAINT `FK7585lda9kj5c3e7ahob7gjqjw` FOREIGN KEY (`truck_id`) REFERENCES `truck` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_parking_invoice`
--

LOCK TABLES `truck_parking_invoice` WRITE;
/*!40000 ALTER TABLE `truck_parking_invoice` DISABLE KEYS */;
INSERT INTO `truck_parking_invoice` VALUES (1,5000,'2025-04-01 16:27:00.000000',5000,'2025-04-01 12:01:34','\0','RAF153K-RL4082',3,4,45,17),(2,5000,'2025-04-01 16:27:00.000000',5000,'2025-04-01 12:26:21','\0','RAE442V',3,4,59,18),(3,5000,'2025-04-01 16:27:00.000000',5000,'2025-04-01 12:26:21','\0','RAE442V',3,8,0,18),(4,5000,'2025-04-01 16:27:00.000000',5000,'2025-04-01 12:26:21','\0','RAE442V',3,3,2,18),(5,5000,'2025-04-01 16:27:00.000000',5000,'2025-04-01 12:26:21','\0','RAE442V',3,3,3,18),(6,5000,'2025-04-01 16:27:00.000000',5000,'2025-04-01 12:26:21','\0','RAE442V',3,9,4,18),(7,5000,'2025-04-01 16:27:00.000000',5000,'2025-04-01 12:26:21','\0','NA',3,11,6,16),(8,5000,'2025-04-01 08:00:00.000000',5000,'2025-04-01 12:26:21','\0','UBN661X',1,3,33,1),(9,5000,'2025-04-01 09:00:00.000000',5000,'2025-04-01 12:26:21','\0','RAE969Z',1,9,34,2),(10,5000,'2025-04-01 09:00:00.000000',5000,'2025-04-01 12:26:21','\0','RAF436R',4,11,35,3),(11,5000,'2025-04-01 10:00:00.000000',5000,'2025-04-01 12:37:50','\0','cgo8113AF-19',4,6,41,4),(12,5000,'2025-04-01 10:12:00.000000',5000,'2025-04-01 12:37:50','\0','T228DMT-T289CPU',4,9,29,5),(13,5000,'2025-04-01 11:30:00.000000',5000,'2025-04-01 12:37:50','\0','T606DVY-T534DVY',4,2,11,6),(14,5000,'2025-04-01 13:06:00.000000',5000,'2025-04-01 12:50:44','\0','RAC138E',3,9,44,20),(15,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAE3955-RL3591',4,11,4,7),(16,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAD970Z-RL2373',4,2,9,8),(17,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAE442Y',4,4,9,9),(18,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAF730V-RL6465',4,1,10,10),(19,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAC422K-RL3224',4,5,10,11),(20,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAH62OU-RL6727',4,9,11,12),(21,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAH480U-RL6667',3,8,11,13),(22,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAC825A-RL2282',2,2,12,14),(23,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAH431-RL6657',3,0,26,15),(24,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAF153K-RL4082',3,6,15,17),(25,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAF153K-RL4082',3,6,16,17),(26,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','RAD970Z-RL2373',4,2,14,8),(27,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','UMOJA NI NGUVU WOODEN',2,3,5,21),(28,5000,'2025-04-02 09:00:00',5000,'2025-04-02 10:23:00','\0','UMOJA NI NGUVU WOODEN',2,10,5,21),(29,5000,'2025-04-03 10:59:00.0',5000,'2025-04-03 00:00:00','\0','RAG160P',2,4,58,22),(30,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','STAR GENERAL XX',2,4,0,26),(31,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','NKUNDABANYANGA XX',2,4,1,27),(32,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','ORACION  XX',2,4,1,28),(33,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','RAG548E',2,4,2,23),(34,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','RAG548E',2,4,3,23),(35,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','IJETRA XX',2,4,3,29),(36,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','RAG548E',2,4,3,23),(37,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','RAG548E',2,4,3,23),(38,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','NZABANDORA INNOCENT XX',2,4,3,30),(39,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','RAG548E',2,4,3,23),(40,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','RAG548E',2,4,4,23),(41,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','RAG548E',2,4,4,23),(42,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','ORACION  XX',2,4,6,28),(43,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','IJETRA XX',2,4,7,29),(44,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','ITH XX',2,4,10,25),(45,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','EMS GENERAL XX',2,4,11,31),(46,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','EMS GENERAL XX',2,4,12,31),(47,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','RAG548E',2,5,8,23),(48,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','T559BKE',2,5,8,24),(49,5000,'2025-04-03 12:00:00.0',5000,'2025-04-03 00:00:00','\0','NKUNDABANYANGA XX',2,5,9,27),(50,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 21:51:03','\0','RAB652A',1,9,51,32),(51,5000,'2025-04-04 16:27:00.000000',5000,'2025-04-04 21:51:03','\0','NOAH XX',4,5,30,16),(52,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','RAB652A',1,10,17,32),(53,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','RAB652A',1,10,18,32),(54,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','FAITH TRADING XX',1,10,18,33),(55,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','AFRILOTT HOLDING XX',1,10,18,34),(56,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','STAR GENERAL XX',2,10,19,26),(57,10000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','T559BKE',2,10,19,24),(58,10000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','T559BKE',2,10,20,24),(59,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','KAC GENERAL XX',1,10,20,35),(60,5000,'2025-04-04 16:27:00.000000',5000,'2025-04-04 22:17:33','\0','NOAH XX',4,5,55,16),(61,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','RAH107T',2,10,22,25),(62,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','UNITED SECEMENT SELLERS XX',1,10,23,36),(63,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','RWANDA SPECIAL MATERIALS XX',1,10,23,37),(64,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','STAR GENERAL XX',2,10,23,26),(65,5000,'2025-04-04 12:30:00.000000',5000,'2025-04-04 22:17:33','\0','RAH480U-RL6667',3,9,55,13),(66,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','AFRILOTT HOLDING XX',1,10,25,34),(67,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','RAH107T',2,10,25,25),(68,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','KA CO TRA XX',1,10,26,38),(69,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','RAH107T',2,10,26,25),(70,5000,'2025-04-04 09:00:00.000000',5000,'2025-04-04 22:17:33','\0','RAE969Z',1,13,27,2),(71,5000,'2025-04-04 12:30:00.000000',5000,'2025-04-04 22:17:33','\0','RAC422K-RL3224',4,9,58,11),(72,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','RAH107T',2,10,28,25),(73,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','T559BKE',2,10,29,24),(74,10000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','BAHATI MOSEKA JIRESSE XX',1,10,29,39),(75,5000,'2025-04-04 14:42:00.000000',5000,'2025-04-04 22:17:33','\0','UMOJA NI NGUVU WOODEN',3,7,48,21),(76,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','T559BKE',2,10,30,24),(77,15000,'2025-04-04 10:00:00.000000',5000,'2025-04-04 22:17:33','\0','cgo8113AF-19',4,12,31,4),(78,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','UWIZEYE EMMANUEL',1,10,31,40),(79,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','BAHATI MOSEKA JIRESSE XX',1,10,31,39),(80,5000,'2025-04-04 12:00:00.000000',5000,'2025-04-04 22:17:33','\0','NYAMURINDA SPOIRE',1,10,32,41),(81,10000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:53:38','\0','s',1,10,53,42),(82,5000,'2025-04-06 11:02:00.0',5000,'2025-04-05 14:39:46','\0','RAG063N',1,3,37,43),(83,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','VIP PHILIPPE xx',1,2,59,44),(84,20000,'2025-04-02 14:42:00.0',5000,'2025-04-05 14:58:56','\0','UMOJA NI NGUVU WOODEN',4,1,17,21),(85,15000,'2025-04-03 12:00:00.0',5000,'2025-04-05 14:58:56','\0','STAR GENERAL XX',3,2,59,26),(86,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','NTAKIRUTIMANA FILS xx',1,3,0,45),(87,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','HABIYAREMYE JEAN D\'AMOUR xx',1,3,0,46),(88,15000,'2025-04-03 12:00:00.0',5000,'2025-04-05 14:58:56','\0','T559BKE',3,3,0,24),(89,10000,'2025-04-04 12:00:00.0',5000,'2025-04-05 14:58:56','\0','AFRILOTT HOLDING XX',2,3,1,34),(90,10000,'2025-04-04 12:00:00.0',5000,'2025-04-05 14:58:56','\0','AFRILOTT HOLDING XX',2,3,1,34),(91,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','JULES MUHAMA xx',1,3,1,47),(92,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','DISTRFAM LTD xx',1,3,1,48),(93,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','UMUTONI GENERAL xx',1,3,1,49),(94,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','UMUTONI GENERAL xx',1,3,2,49),(95,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','RIJ COMPANY  xx',1,3,2,50),(96,15000,'2025-04-03 12:00:00.0',5000,'2025-04-05 14:58:56','\0','RAH107T',3,3,2,25),(97,20000,'2025-04-01 16:27:00.0',5000,'2025-04-05 14:58:56','\0','NOAH XX',4,22,35,16),(98,20000,'2025-04-01 16:27:00.0',5000,'2025-04-05 14:58:56','\0','NOAH XX',4,22,35,16),(99,20000,'2025-04-01 16:27:00.0',5000,'2025-04-05 14:58:56','\0','NOAH XX',4,22,36,16),(100,15000,'2025-04-03 12:00:00.0',5000,'2025-04-05 14:58:56','\0','RAH107T',3,3,3,25),(101,15000,'2025-04-03 12:00:00.0',5000,'2025-04-05 14:58:56','\0','RAH107T',3,3,3,25),(102,15000,'2025-04-03 12:00:00.0',5000,'2025-04-05 14:58:56','\0','RAH107T',3,3,3,25),(103,15000,'2025-04-03 12:00:00.0',5000,'2025-04-05 14:58:56','\0','RAH107T',3,3,4,25),(104,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','UWINEZA MARIE CHANTAL  xx',1,3,4,51),(105,20000,'2025-04-01 16:27:00.0',5000,'2025-04-05 14:58:56','\0','NOAH XX',4,22,37,16),(106,5000,'2025-04-05 12:00:00.0',5000,'2025-04-05 14:58:56','\0','UMUTONI GENERAL xx',1,3,4,49),(107,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','KAMO',1,11,43,58),(108,5000,'2025-04-06 11:02:00.0',5000,'2025-04-06 20:43:11','\0','RAG063N',1,9,41,43),(109,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','MALI NI WATU',1,11,44,53),(110,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,44,54),(111,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,44,54),(112,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','INGABIRE GENERAL XX',1,11,44,55),(113,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','GAHUNGU BUSINESS XX',1,11,44,56),(114,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','RAH519W',1,11,45,57),(115,25000,'2025-04-01 16:27:00.0',5000,'2025-04-06 20:43:11','\0','NOAH XX',5,4,18,16),(116,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','KAMO',1,11,45,58),(117,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(118,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(119,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(120,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(121,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(122,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(123,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(124,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(125,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(126,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(127,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(128,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,48,54),(129,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,48,54),(130,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,48,54),(131,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,48,54),(132,5000,'2025-04-08 09:11:00.0',5000,'2025-04-08 09:12:15','\0','RAG851J',1,1,1,59),(133,5000,'2025-04-08 09:55:00.0',5000,'2025-04-08 09:55:32','\0','RAE969Z',1,1,1,2),(134,5000,'2025-04-08 10:21:00.0',5000,'2025-04-08 10:31:21','\0','RAA972H',1,1,10,62),(135,5000,'2025-04-08 10:46:00.0',5000,'2025-04-08 10:46:52','\0','RAC306',1,1,1,63),(136,5000,'2025-04-08 11:31:00.0',5000,'2025-04-08 11:31:29','\0','RAE442V',1,1,1,18),(137,5000,'2025-04-08 12:03:00.0',5000,'2025-04-08 12:03:25','\0','RAG572',1,1,0,64),(138,5000,'2025-04-08 12:05:00.0',5000,'2025-04-08 12:07:22','\0','rdf586r',1,1,2,65),(139,5000,'2025-04-08 12:10:00.0',5000,'2025-04-08 12:10:14','\0','RAF904S',1,1,0,66),(140,5000,'2025-04-08 12:41:00.0',5000,'2025-04-08 12:41:15','\0','RD862X',1,1,0,67),(141,5000,'2025-04-08 12:46:00.0',5000,'2025-04-08 12:47:02','\0','RH645W',1,1,1,68),(142,10000,'2025-04-06 09:00:00.0',5000,'2025-04-08 12:51:35','\0','MALI NI WATU',2,3,51,53),(143,5000,'2025-04-08 13:25:00.0',5000,'2025-04-08 13:25:37','\0','T504DML',1,1,0,69),(144,5000,'2025-04-08 13:50:00.0',5000,'2025-04-08 13:58:46','\0','RAC132G',1,1,8,70),(145,5000,'2025-04-08 13:56:00.0',5000,'2025-04-08 14:11:42','\0','RAG776S',1,1,15,71),(146,5000,'2025-04-08 14:41:00.0',5000,'2025-04-08 14:41:58','\0','RAE923G',1,1,1,72),(147,5000,'2025-04-08 15:37:00.0',5000,'2025-04-08 15:38:53','\0','RAG950L',1,1,2,73),(148,5000,'2025-04-08 16:05:00.0',5000,'2025-04-08 16:05:35','\0','UMUTONI GENERAL',1,1,1,74),(149,5000,'2025-04-08 16:09:00.0',5000,'2025-04-08 16:11:44','\0','UMUTONI GENERAL',1,1,2,74),(150,5000,'2025-04-08 16:22:00.0',5000,'2025-04-08 16:23:23','\0','RAH723E',1,1,1,75),(151,5000,'2025-04-08 17:04:00.0',5000,'2025-04-08 17:04:22','\0','UMUTONI GENERAL',1,1,0,74),(152,5000,'2025-04-09 09:31:00.0',5000,'2025-04-09 09:31:36','\0','RAC132G',1,1,0,70),(153,5000,'2025-04-09 09:36:00.0',5000,'2025-04-09 09:36:32','\0','RAE969Z',1,1,0,2),(154,5000,'2025-04-09 09:41:00.0',5000,'2025-04-09 09:41:15','\0','RAE442V',1,1,0,18),(155,5000,'2025-04-09 09:04:00.0',5000,'2025-04-09 10:04:25','\0','RAF235V',1,1,0,76),(156,5000,'2025-04-09 09:43:00.0',5000,'2025-04-09 10:13:20','\0','RAG943U',1,1,31,77),(157,40000,'2025-04-01 10:45:00.0',5000,'2025-04-09 10:49:57','\0','KDL906L-ZH3013',8,1,10,78),(158,5000,'2025-04-09 06:00:00.0',5000,'2025-04-09 12:15:59','\0','RAG058N',1,6,16,80),(159,5000,'2025-04-09 12:53:00.0',5000,'2025-04-09 12:53:33','\0','RAG950U',1,1,0,82),(160,5000,'2025-04-09 13:04:00.0',5000,'2025-04-09 13:04:36','\0','RAC306K',1,1,0,63),(161,5000,'2025-04-09 10:32:00.0',5000,'2025-04-09 13:21:15','\0','RAA872H',1,2,49,83),(162,5000,'2025-04-09 12:17:00.0',5000,'2025-04-09 13:38:06','\0','RAD254T',1,1,21,84),(163,5000,'2025-04-09 10:32:00.0',5000,'2025-04-09 13:45:11','\0','RAA872H',1,3,13,83),(164,5000,'2025-04-09 09:00:00.0',5000,'2025-04-09 13:50:11','\0','MALI NI WATU',1,4,52,53),(165,5000,'2025-04-09 14:42:00.0',5000,'2025-04-09 14:09:18','\0','UMOJA NI NGUVU WOODEN',1,1,-30,21),(166,5000,'2025-04-09 10:00:00.0',5000,'2025-04-09 14:15:39','\0','LUKA YAYO',1,4,15,85),(167,5000,'2025-04-09 12:20:00.0',5000,'2025-04-09 14:47:19','\0','T285EFN',1,2,27,86),(168,5000,'2025-04-09 11:36:00.0',5000,'2025-04-09 14:52:36','\0','T283EFN',1,3,19,87),(169,5000,'2025-04-09 14:50:00.0',5000,'2025-04-09 16:08:02','\0','RAC485M',1,1,18,88),(170,5000,'2025-04-09 16:24:00.0',5000,'2025-04-09 16:24:39','\0','RAB652A',1,1,0,32),(171,5000,'2025-04-09 16:48:00.0',5000,'2025-04-09 16:48:48','\0','T888DMS',1,1,1,89);
/*!40000 ALTER TABLE `truck_parking_invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_parking_invoice_aud`
--

DROP TABLE IF EXISTS `truck_parking_invoice_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_parking_invoice_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `entry_time` varchar(80) DEFAULT NULL,
  `fee` int(11) DEFAULT NULL,
  `get_out_time` datetime DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `licence_plate_number` varchar(80) DEFAULT NULL,
  `total_days` int(11) DEFAULT NULL,
  `total_hours` int(11) DEFAULT NULL,
  `total_min` int(11) DEFAULT NULL,
  `truck_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKesnnccxyw9obcy7aui54dq18u` (`rev`),
  CONSTRAINT `FKesnnccxyw9obcy7aui54dq18u` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_parking_invoice_aud`
--

LOCK TABLES `truck_parking_invoice_aud` WRITE;
/*!40000 ALTER TABLE `truck_parking_invoice_aud` DISABLE KEYS */;
INSERT INTO `truck_parking_invoice_aud` VALUES (1,79,0,5000,'2025-04-01 14:00:00.0',5000,'2025-04-01 14:54:33','\0','RAE254C',1,1,54,7),(1,282,0,15000,'2025-04-01 16:27:00.0',5000,'2025-04-05 12:01:34','\0','RAF153K-RL4082',3,19,45,17),(2,89,0,5000,'2025-04-01 16:27:00.0',5000,'2025-04-01 16:39:21','\0','RAF626I - RL4021',1,1,12,8),(2,283,0,15000,'2025-04-01 16:27:00.0',5000,'2025-04-05 12:26:21','\0','RAE442V',3,19,59,18),(3,92,0,5000,'2025-04-01 16:42:00.0',5000,'2025-04-01 16:43:03','\0','RAF153K-RL4082',1,1,1,9),(3,284,0,15000,'2025-04-01 16:27:00.0',5000,'2025-04-05 12:26:21','\0','RAE442V',3,20,0,18),(4,114,0,5000,'2025-04-02 10:38:00.0',5000,'2025-04-02 10:45:08','\0','RAE580E',1,1,7,10),(4,285,0,15000,'2025-04-01 16:27:00.0',5000,'2025-04-05 12:26:21','\0','RAE442V',3,20,2,18),(5,117,0,5000,'2025-04-02 11:16:00.0',5000,'2025-04-02 11:20:22','\0','RAH 431-RL6657',1,1,4,11),(5,286,0,15000,'2025-04-01 16:27:00.0',5000,'2025-04-05 12:26:21','\0','RAE442V',3,20,3,18),(6,120,0,5000,'2025-04-02 11:23:00.0',5000,'2025-04-02 11:23:41','\0','RAC 825A-RL2282',1,1,1,12),(6,287,0,15000,'2025-04-01 16:27:00.0',5000,'2025-04-05 12:26:21','\0','RAE442V',3,20,4,18),(7,123,0,5000,'2025-04-02 11:26:00.0',5000,'2025-04-02 11:26:57','\0','RAF153K-RL4082',1,1,1,9),(7,288,0,15000,'2025-04-01 16:27:00.0',5000,'2025-04-05 12:26:21','\0','NA',3,20,6,16),(8,126,0,5000,'2025-04-02 11:30:00.0',5000,'2025-04-02 11:30:45','\0','RAH480U-RL6667',1,1,1,13),(8,289,0,5000,'2025-04-05 08:00:00.0',5000,'2025-04-05 12:26:21','\0','UBN661X',1,4,33,1),(9,129,0,5000,'2025-04-02 11:34:00.0',5000,'2025-04-02 11:34:41','\0','RAH 620U-RL6727',1,1,1,14),(9,290,0,5000,'2025-04-05 09:00:00.0',5000,'2025-04-05 12:26:21','\0','RAE969Z',1,3,34,2),(10,132,0,5000,'2025-04-02 11:38:00.0',5000,'2025-04-02 11:38:22','\0','RAC 422K-RL3224',1,1,0,15),(10,291,0,20000,'2025-04-01 09:00:00.0',5000,'2025-04-05 12:26:21','\0','RAF436R',4,3,35,3),(11,135,0,5000,'2025-04-02 11:45:00.0',5000,'2025-04-02 11:45:21','\0','RAF730V-RL6465',1,1,0,16),(11,292,0,20000,'2025-04-01 10:00:00.0',5000,'2025-04-05 12:37:50','\0','cgo8113AF-19',4,2,41,4),(12,141,0,5000,'2025-04-02 13:03:00.0',5000,'2025-04-02 13:35:07','\0','RAD973Y-RL6775',1,1,32,17),(12,293,0,20000,'2025-04-01 10:12:00.0',5000,'2025-04-05 12:37:50','\0','T228DMT-T289CPU',4,2,29,5),(13,144,0,5000,'2025-04-02 13:42:00.0',5000,'2025-04-02 13:42:23','\0','RAE3955-RL3591',1,1,0,18),(13,294,0,20000,'2025-04-01 11:30:00.0',5000,'2025-04-05 12:37:50','\0','T606DVY-T534DVY',4,1,11,6),(14,149,0,15000,'2025-03-30 00:00:00.0',5000,'2025-04-02 14:39:20','\0','WOODEN BOAT',3,15,39,19),(14,297,0,15000,'2025-04-01 13:06:00.0',5000,'2025-04-05 12:50:44','\0','RAC138E',3,23,44,20),(15,155,0,5000,'2025-04-02 15:29:00.0',5000,'2025-04-02 15:29:40','\0','RAD 970Z-RL2373',1,1,1,20),(15,298,0,20000,'2025-04-01 11:30:00.0',5000,'2025-04-05 13:34:37','\0','RAE3955-RL3591',4,2,4,7),(16,161,0,5000,'2025-04-02 16:50:00.0',5000,'2025-04-02 15:55:41','\0','RAE 442Y',1,1,6,21),(16,299,0,20000,'2025-04-01 12:30:00.0',5000,'2025-04-05 13:34:37','\0','RAD970Z-RL2373',4,1,9,8),(17,166,0,5000,'2025-04-03 09:00:00.0',5000,'2025-04-03 08:19:57','\0','RAE 442Y',1,1,20,21),(17,300,0,20000,'2025-04-01 12:30:00.0',5000,'2025-04-05 13:34:37','\0','RAE442Y',4,1,9,9),(18,171,0,5000,'2025-04-03 09:15:00.0',5000,'2025-04-03 08:49:01','\0','RAE 463E',1,1,34,22),(18,301,0,20000,'2025-04-01 12:30:00.0',5000,'2025-04-05 13:34:37','\0','RAF730V-RL6465',4,1,10,10),(19,172,0,5000,'2025-04-02 15:29:00.0',5000,'2025-04-03 08:53:12','\0','RAD 970Z-RL2373',1,18,25,20),(19,302,0,20000,'2025-04-01 12:30:00.0',5000,'2025-04-05 13:34:37','\0','RAC422K-RL3224',4,1,10,11),(20,182,0,5000,'2025-04-02 11:30:00.0',5000,'2025-04-03 09:35:08','\0','RAH480U-RL6667',1,23,7,13),(20,303,0,20000,'2025-04-01 12:30:00.0',5000,'2025-04-05 13:34:37','\0','RAH62OU-RL6727',4,1,11,12),(21,185,0,5000,'2025-04-03 08:41:00.0',5000,'2025-04-03 10:43:15','\0','RAA872H',1,2,2,24),(21,304,0,15000,'2025-04-02 12:30:00.0',5000,'2025-04-05 13:34:37','\0','RAH480U-RL6667',3,1,11,13),(22,188,0,5000,'2025-04-03 09:48:00.0',5000,'2025-04-03 09:48:47','\0','RAH793U',1,1,1,25),(22,305,0,10000,'2025-04-02 14:30:00.0',5000,'2025-04-05 13:34:37','\0','RAC825A-RL2282',2,23,12,14),(23,195,0,5000,'2025-04-03 10:16:00.0',5000,'2025-04-03 10:16:54','\0','RAI 401C',1,1,1,27),(23,306,0,15000,'2025-04-02 11:16:00.0',5000,'2025-04-05 13:34:37','\0','RAH431-RL6657',3,2,26,15),(24,199,0,5000,'2025-04-03 11:30:00.0',5000,'2025-04-03 10:37:22','\0','RAH620U',1,1,7,28),(24,307,0,15000,'2025-04-01 16:27:00.0',5000,'2025-04-05 13:34:37','\0','RAF153K-RL4082',3,21,15,17),(25,308,0,15000,'2025-04-01 16:27:00.0',5000,'2025-04-05 13:34:37','\0','RAF153K-RL4082',3,21,16,17),(26,309,0,20000,'2025-04-01 12:30:00.0',5000,'2025-04-05 13:34:37','\0','RAD970Z-RL2373',4,1,14,8),(27,312,0,10000,'2025-04-02 14:42:00.0',5000,'2025-04-05 13:47:28','\0','UMOJA NI NGUVU WOODEN',2,23,5,21),(28,313,0,10000,'2025-04-02 14:42:00.0',5000,'2025-04-05 13:47:28','\0','UMOJA NI NGUVU WOODEN',2,23,5,21),(29,334,0,10000,'2025-04-03 10:59:00.0',5000,'2025-04-05 14:57:17','\0','RAG160P',2,4,58,22),(30,335,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:00:27','\0','STAR GENERAL XX',2,4,0,26),(31,336,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:00:27','\0','NKUNDABANYANGA XX',2,4,1,27),(32,337,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:01:35','\0','ORACION  XX',2,4,1,28),(33,338,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 16:02:18','\0','RAG548E',2,4,2,23),(34,339,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 16:02:18','\0','RAG548E',2,4,3,23),(35,340,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:02:56','\0','IJETRA XX',2,4,3,29),(36,341,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 16:02:18','\0','RAG548E',2,4,3,23),(37,342,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 16:02:18','\0','RAG548E',2,4,3,23),(38,343,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:03:33','\0','NZABANDORA INNOCENT XX',2,4,3,30),(39,344,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 16:02:18','\0','RAG548E',2,4,3,23),(40,345,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 16:02:18','\0','RAG548E',2,4,4,23),(41,346,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 16:02:18','\0','RAG548E',2,4,4,23),(42,347,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:06:07','\0','ORACION  XX',2,4,6,28),(43,348,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:06:52','\0','IJETRA XX',2,4,7,29),(44,349,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:06:52','\0','ITH XX',2,4,10,25),(45,350,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:10:37','\0','EMS GENERAL XX',2,4,11,31),(46,351,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 15:11:32','\0','EMS GENERAL XX',2,4,12,31),(47,380,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 17:08:04','\0','RAG548E',2,5,8,23),(48,381,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 17:08:04','\0','T559BKE',2,5,8,24),(49,382,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 17:08:04','\0','NKUNDABANYANGA XX',2,5,9,27),(50,391,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 21:51:03','\0','RAB652A',1,9,51,32),(51,392,0,20000,'2025-04-01 16:27:00.0',5000,'2025-04-05 21:51:03','\0','NOAH XX',4,5,30,16),(52,413,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','RAB652A',1,10,17,32),(53,414,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','RAB652A',1,10,18,32),(54,415,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','FAITH TRADING XX',1,10,18,33),(55,416,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','AFRILOTT HOLDING XX',1,10,18,34),(56,417,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','STAR GENERAL XX',2,10,19,26),(57,418,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','T559BKE',2,10,19,24),(58,419,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','T559BKE',2,10,20,24),(59,420,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','KAC GENERAL XX',1,10,20,35),(60,421,0,20000,'2025-04-01 16:27:00.0',5000,'2025-04-05 22:17:33','\0','NOAH XX',4,5,55,16),(61,422,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','RAH107T',2,10,22,25),(62,423,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','UNITED SECEMENT SELLERS XX',1,10,23,36),(63,424,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','RWANDA SPECIAL MATERIALS XX',1,10,23,37),(64,425,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','STAR GENERAL XX',2,10,23,26),(65,426,0,15000,'2025-04-02 12:30:00.0',5000,'2025-04-05 22:17:33','\0','RAH480U-RL6667',3,9,55,13),(66,427,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','AFRILOTT HOLDING XX',1,10,25,34),(67,428,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','RAH107T',2,10,25,25),(68,429,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','KA CO TRA XX',1,10,26,38),(69,430,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','RAH107T',2,10,26,25),(70,431,0,5000,'2025-04-05 09:00:00.0',5000,'2025-04-05 22:17:33','\0','RAE969Z',1,13,27,2),(71,432,0,20000,'2025-04-01 12:30:00.0',5000,'2025-04-05 22:17:33','\0','RAC422K-RL3224',4,9,58,11),(72,433,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','RAH107T',2,10,28,25),(73,434,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','T559BKE',2,10,29,24),(74,435,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','BAHATI MOSEKA JIRESSE XX',1,10,29,39),(75,436,0,15000,'2025-04-02 14:42:00.0',5000,'2025-04-05 22:17:33','\0','UMOJA NI NGUVU WOODEN',3,7,48,21),(76,437,0,10000,'2025-04-03 12:00:00.0',5000,'2025-04-05 22:17:33','\0','T559BKE',2,10,30,24),(77,438,0,20000,'2025-04-01 10:00:00.0',5000,'2025-04-05 22:17:33','\0','cgo8113AF-19',4,12,31,4),(78,439,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','UWIZEYE EMMANUEL',1,10,31,40),(79,440,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','BAHATI MOSEKA JIRESSE XX',1,10,31,39),(80,441,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:17:33','\0','NYAMURINDA SPOIRE',1,10,32,41),(81,444,0,5000,'2025-04-04 12:00:00.0',5000,'2025-04-05 22:53:38','\0','s',1,10,53,42),(82,496,0,5000,'2025-04-06 11:02:00.0',5000,'2025-04-06 14:39:46','\0','RAG063N',1,3,37,43),(83,515,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','VIP PHILIPPE xx',1,2,59,44),(84,516,0,20000,'2025-04-02 14:42:00.0',5000,'2025-04-06 14:58:56','\0','UMOJA NI NGUVU WOODEN',4,1,17,21),(85,517,0,15000,'2025-04-03 12:00:00.0',5000,'2025-04-06 14:58:56','\0','STAR GENERAL XX',3,2,59,26),(86,518,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','NTAKIRUTIMANA FILS xx',1,3,0,45),(87,519,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','HABIYAREMYE JEAN D\'AMOUR xx',1,3,0,46),(88,520,0,15000,'2025-04-03 12:00:00.0',5000,'2025-04-06 14:58:56','\0','T559BKE',3,3,0,24),(89,521,0,10000,'2025-04-04 12:00:00.0',5000,'2025-04-06 14:58:56','\0','AFRILOTT HOLDING XX',2,3,1,34),(90,522,0,10000,'2025-04-04 12:00:00.0',5000,'2025-04-06 14:58:56','\0','AFRILOTT HOLDING XX',2,3,1,34),(91,523,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','JULES MUHAMA xx',1,3,1,47),(92,524,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','DISTRFAM LTD xx',1,3,1,48),(93,525,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','UMUTONI GENERAL xx',1,3,1,49),(94,526,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','UMUTONI GENERAL xx',1,3,2,49),(95,527,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','RIJ COMPANY  xx',1,3,2,50),(96,528,0,15000,'2025-04-03 12:00:00.0',5000,'2025-04-06 14:58:56','\0','RAH107T',3,3,2,25),(97,529,0,20000,'2025-04-01 16:27:00.0',5000,'2025-04-06 14:58:56','\0','NOAH XX',4,22,35,16),(98,530,0,20000,'2025-04-01 16:27:00.0',5000,'2025-04-06 14:58:56','\0','NOAH XX',4,22,35,16),(99,531,0,20000,'2025-04-01 16:27:00.0',5000,'2025-04-06 14:58:56','\0','NOAH XX',4,22,36,16),(100,532,0,15000,'2025-04-03 12:00:00.0',5000,'2025-04-06 14:58:56','\0','RAH107T',3,3,3,25),(101,533,0,15000,'2025-04-03 12:00:00.0',5000,'2025-04-06 14:58:56','\0','RAH107T',3,3,3,25),(102,534,0,15000,'2025-04-03 12:00:00.0',5000,'2025-04-06 14:58:56','\0','RAH107T',3,3,3,25),(103,535,0,15000,'2025-04-03 12:00:00.0',5000,'2025-04-06 14:58:56','\0','RAH107T',3,3,4,25),(104,536,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','UWINEZA MARIE CHANTAL  xx',1,3,4,51),(105,537,0,20000,'2025-04-01 16:27:00.0',5000,'2025-04-06 14:58:56','\0','NOAH XX',4,22,37,16),(106,538,0,5000,'2025-04-05 12:00:00.0',5000,'2025-04-06 14:58:56','\0','UMUTONI GENERAL xx',1,3,4,49),(107,601,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','KAMO',1,11,43,58),(108,602,0,5000,'2025-04-06 11:02:00.0',5000,'2025-04-06 20:43:11','\0','RAG063N',1,9,41,43),(109,603,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','MALI NI WATU',1,11,44,53),(110,604,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,44,54),(111,605,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,44,54),(112,606,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','INGABIRE GENERAL XX',1,11,44,55),(113,607,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','GAHUNGU BUSINESS XX',1,11,44,56),(114,608,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','RAH519W',1,11,45,57),(115,609,0,25000,'2025-04-01 16:27:00.0',5000,'2025-04-06 20:43:11','\0','NOAH XX',5,4,18,16),(116,610,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','KAMO',1,11,45,58),(117,611,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(118,612,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(119,613,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(120,614,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(121,615,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(122,616,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,46,54),(123,617,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(124,618,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(125,619,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(126,620,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(127,621,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,47,54),(128,622,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,48,54),(129,623,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,48,54),(130,624,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,48,54),(131,625,0,5000,'2025-04-06 09:00:00.0',5000,'2025-04-06 20:43:11','\0','WIH RWANDA XX',1,11,48,54),(132,641,0,5000,'2025-04-08 09:11:00.0',5000,'2025-04-08 09:12:15','\0','RAG851J',1,1,1,59),(133,648,0,5000,'2025-04-08 09:55:00.0',5000,'2025-04-08 09:55:32','\0','RAE969Z',1,1,1,2),(134,654,0,5000,'2025-04-08 10:21:00.0',5000,'2025-04-08 10:31:21','\0','RAA972H',1,1,10,62),(135,658,0,5000,'2025-04-08 10:46:00.0',5000,'2025-04-08 10:46:52','\0','RAC306',1,1,1,63),(136,661,0,5000,'2025-04-08 11:31:00.0',5000,'2025-04-08 11:31:29','\0','RAE442V',1,1,1,18),(137,664,0,5000,'2025-04-08 12:03:00.0',5000,'2025-04-08 12:03:25','\0','RAG572',1,1,0,64),(138,667,0,5000,'2025-04-08 12:05:00.0',5000,'2025-04-08 12:07:22','\0','rdf586r',1,1,2,65),(139,670,0,5000,'2025-04-08 12:10:00.0',5000,'2025-04-08 12:10:14','\0','RAF904S',1,1,0,66),(140,676,0,5000,'2025-04-08 12:41:00.0',5000,'2025-04-08 12:41:15','\0','RD862X',1,1,0,67),(141,679,0,5000,'2025-04-08 12:46:00.0',5000,'2025-04-08 12:47:02','\0','RH645W',1,1,1,68),(142,680,0,10000,'2025-04-06 09:00:00.0',5000,'2025-04-08 12:51:35','\0','MALI NI WATU',2,3,51,53),(143,683,0,5000,'2025-04-08 13:25:00.0',5000,'2025-04-08 13:25:37','\0','T504DML',1,1,0,69),(144,688,0,5000,'2025-04-08 13:50:00.0',5000,'2025-04-08 13:58:46','\0','RAC132G',1,1,8,70),(145,691,0,5000,'2025-04-08 13:56:00.0',5000,'2025-04-08 14:11:42','\0','RAG776S',1,1,15,71),(146,694,0,5000,'2025-04-08 14:41:00.0',5000,'2025-04-08 14:41:58','\0','RAE923G',1,1,1,72),(147,697,0,5000,'2025-04-08 15:37:00.0',5000,'2025-04-08 15:38:53','\0','RAG950L',1,1,2,73),(148,702,0,5000,'2025-04-08 16:05:00.0',5000,'2025-04-08 16:05:35','\0','UMUTONI GENERAL',1,1,1,74),(149,705,0,5000,'2025-04-08 16:09:00.0',5000,'2025-04-08 16:11:44','\0','UMUTONI GENERAL',1,1,2,74),(150,708,0,5000,'2025-04-08 16:22:00.0',5000,'2025-04-08 16:23:23','\0','RAH723E',1,1,1,75),(151,713,0,5000,'2025-04-08 17:04:00.0',5000,'2025-04-08 17:04:22','\0','UMUTONI GENERAL',1,1,0,74),(152,718,0,5000,'2025-04-09 09:31:00.0',5000,'2025-04-09 09:31:36','\0','RAC132G',1,1,0,70),(153,721,0,5000,'2025-04-09 09:36:00.0',5000,'2025-04-09 09:36:32','\0','RAE969Z',1,1,0,2),(154,724,0,5000,'2025-04-09 09:41:00.0',5000,'2025-04-09 09:41:15','\0','RAE442V',1,1,0,18),(155,729,0,5000,'2025-04-09 09:04:00.0',5000,'2025-04-09 10:04:25','\0','RAF235V',1,1,0,76),(156,732,0,5000,'2025-04-09 09:43:00.0',5000,'2025-04-09 10:13:20','\0','RAG943U',1,1,31,77),(157,737,0,40000,'2025-04-01 10:45:00.0',5000,'2025-04-09 10:49:57','\0','KDL906L-ZH3013',8,1,10,78),(158,746,0,5000,'2025-04-09 06:00:00.0',5000,'2025-04-09 12:15:59','\0','RAG058N',1,6,16,80),(158,788,1,5000,'2025-04-09 06:00:00.0',5000,'2025-04-09 12:15:59','\0','RAG058N',1,6,16,80),(159,758,0,5000,'2025-04-09 12:53:00.0',5000,'2025-04-09 12:53:33','\0','RAG950U',1,1,0,82),(160,762,0,5000,'2025-04-09 13:04:00.0',5000,'2025-04-09 13:04:36','\0','RAC306K',1,1,0,63),(161,770,0,5000,'2025-04-09 10:32:00.0',5000,'2025-04-09 13:21:15','\0','RAA872H',1,2,49,83),(162,776,0,5000,'2025-04-09 12:17:00.0',5000,'2025-04-09 13:38:06','\0','RAD254T',1,1,21,84),(163,778,0,5000,'2025-04-09 10:32:00.0',5000,'2025-04-09 13:45:11','\0','RAA872H',1,3,13,83),(164,779,0,5000,'2025-04-09 09:00:00.0',5000,'2025-04-09 13:50:11','\0','MALI NI WATU',1,4,52,53),(165,784,0,5000,'2025-04-09 14:42:00.0',5000,'2025-04-09 14:09:18','\0','UMOJA NI NGUVU WOODEN',1,1,-30,21),(166,787,0,5000,'2025-04-09 10:00:00.0',5000,'2025-04-09 14:15:39','\0','LUKA YAYO',1,4,15,85),(167,794,0,5000,'2025-04-09 12:20:00.0',5000,'2025-04-09 14:47:19','\0','T285EFN',1,2,27,86),(167,795,1,5000,'2025-04-09 12:20:00.0',5000,'2025-04-09 14:47:19','\0','T285EFN',1,2,27,86),(168,799,0,5000,'2025-04-09 11:36:00.0',5000,'2025-04-09 14:52:36','\0','T283EFN',1,3,19,87),(168,800,1,5000,'2025-04-09 11:36:00.0',5000,'2025-04-09 14:52:36','\0','T283EFN',1,3,19,87),(169,810,0,5000,'2025-04-09 14:50:00.0',5000,'2025-04-09 16:08:02','\0','RAC485M',1,1,18,88),(170,814,0,5000,'2025-04-09 16:24:00.0',5000,'2025-04-09 16:24:39','\0','RAB652A',1,1,0,32),(171,825,0,5000,'2025-04-09 16:48:00.0',5000,'2025-04-09 16:48:48','\0','T888DMS',1,1,1,89);
/*!40000 ALTER TABLE `truck_parking_invoice_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_paymenr`
--

DROP TABLE IF EXISTS `truck_paymenr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_paymenr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `payment_amount` int(11) NOT NULL,
  `truck_parking_invoice_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKewm3qvx7b2ugwc0yt55hg7war` (`truck_parking_invoice_id`),
  CONSTRAINT `FKewm3qvx7b2ugwc0yt55hg7war` FOREIGN KEY (`truck_parking_invoice_id`) REFERENCES `truck_parking_invoice` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_paymenr`
--

LOCK TABLES `truck_paymenr` WRITE;
/*!40000 ALTER TABLE `truck_paymenr` DISABLE KEYS */;
INSERT INTO `truck_paymenr` VALUES (1,'2025-04-09 14:19:58','OK','\0',5000,158),(2,'2025-04-09 14:49:03','OK','\0',5000,167),(3,'2025-04-09 14:57:16','OK','\0',500,168);
/*!40000 ALTER TABLE `truck_paymenr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_paymenr_aud`
--

DROP TABLE IF EXISTS `truck_paymenr_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_paymenr_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `payment_amount` int(11) DEFAULT NULL,
  `truck_parking_invoice_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FK89xb0r8tnol8wfv72wfv5sftd` (`rev`),
  CONSTRAINT `FK89xb0r8tnol8wfv72wfv5sftd` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_paymenr_aud`
--

LOCK TABLES `truck_paymenr_aud` WRITE;
/*!40000 ALTER TABLE `truck_paymenr_aud` DISABLE KEYS */;
INSERT INTO `truck_paymenr_aud` VALUES (1,788,0,'2025-04-09 14:19:58','OK','\0',5000,158),(2,795,0,'2025-04-09 14:49:03','OK','\0',5000,167),(3,800,0,'2025-04-09 14:57:16','OK','\0',500,168);
/*!40000 ALTER TABLE `truck_paymenr_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unberthing`
--

DROP TABLE IF EXISTS `unberthing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `unberthing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `atd` varchar(80) NOT NULL,
  `departure_draft` varchar(80) NOT NULL,
  `description` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `vessel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtperpetqlwpx78bfu2nll2rrg` (`vessel_id`),
  CONSTRAINT `FKtperpetqlwpx78bfu2nll2rrg` FOREIGN KEY (`vessel_id`) REFERENCES `vessel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unberthing`
--

LOCK TABLES `unberthing` WRITE;
/*!40000 ALTER TABLE `unberthing` DISABLE KEYS */;
INSERT INTO `unberthing` VALUES (1,'12:14','2','OK','\0',2);
/*!40000 ALTER TABLE `unberthing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unberthing_aud`
--

DROP TABLE IF EXISTS `unberthing_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `unberthing_aud` (
  `id` int(11) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `atd` varchar(80) DEFAULT NULL,
  `departure_draft` varchar(80) DEFAULT NULL,
  `description` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `vessel_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKrqj1anhg5ykt0joligmem7bbe` (`rev`),
  CONSTRAINT `FKrqj1anhg5ykt0joligmem7bbe` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unberthing_aud`
--

LOCK TABLES `unberthing_aud` WRITE;
/*!40000 ALTER TABLE `unberthing_aud` DISABLE KEYS */;
INSERT INTO `unberthing_aud` VALUES (1,765,0,'12:14','2','OK','\0',2);
/*!40000 ALTER TABLE `unberthing_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vessel`
--

DROP TABLE IF EXISTS `vessel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `vessel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `capacity` varchar(80) NOT NULL,
  `contact_number` varchar(80) NOT NULL,
  `dimension` varchar(80) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `loa` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  `owner_operator` varchar(80) NOT NULL,
  `plate_number` varchar(80) NOT NULL,
  `rura_certificate` varchar(180) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sjlf3wmda5p3k22bae06weor9` (`name`),
  UNIQUE KEY `UK_4detiexpy418ymbsuldr3r1d9` (`rura_certificate`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vessel`
--

LOCK TABLES `vessel` WRITE;
/*!40000 ALTER TABLE `vessel` DISABLE KEYS */;
INSERT INTO `vessel` VALUES (1,'50','0788757214','32 x 6 x 2','\0','32','MUNGUYIKO 1','MBARUSHIMANA EDOUARD','RWT186A','RURA/TRA/AUT/240391781','Berthed'),(2,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Paid'),(3,'100','0786285265','21 x 4 x 2','\0','21','MUNGUYIKO3','MBARUSHIMANA TRADING COMPANY','RWT703A','RURA/TRA/AUT/240389164','Invoiced'),(4,'80','0788875478','45 x 7 x 2','\0','45','M.V TUWOMBE MUNGU 2','KASHINZWENIMANA ANASTASE','RWT648A','RURA/AUT/240427411','Berthed'),(5,'20','0783233698','7 x 2 x 2','\0','7','AMANI','HABYARIMANA JEAN NEPO','RWT771A','RURA/AUT/240456657','Invoiced'),(6,'209','0783330903','52 x 8 x 2','\0','52','MV/ZAWADI YA MUNGU 2','NYAMINANI MAZIMPAKA FRANCO','XXX','XXX','Invoiced'),(7,'50','0786285265','21 x 4 x 2','\0','21','M.V EDISSA','MBARUSHA TRADING COMPANY','RWT693A','RURA/TRA/AUT/250505397','Berthed'),(8,'80','0788346365','50 x 20 x 10','\0','50','EMMANUEL 5','SIMEON LIMANZI','RD1070ASB2500053','XXXX','Booked'),(9,'35','0788989852','20 x 10 x 20','\0','30','NIYOKWIZERWA','COOP DUKORE TUBEHO','084RW','XXX0','Invoiced'),(10,'30','00','30 x 10 x 3','\0','30','EMS GENERAL','EMS GENERAL','XX XX','xx','Invoiced'),(11,'100','0788757214','50 x 50 x 50','\0','50','EDEN II','MBARUSHIMANA EDOUARD','RWT421A','RURA-TRA-AUT-240431829','Pending');
/*!40000 ALTER TABLE `vessel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vessel_aud`
--

DROP TABLE IF EXISTS `vessel_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `vessel_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `capacity` varchar(80) DEFAULT NULL,
  `contact_number` varchar(80) DEFAULT NULL,
  `dimension` varchar(80) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `loa` varchar(80) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `owner_operator` varchar(80) DEFAULT NULL,
  `plate_number` varchar(80) DEFAULT NULL,
  `rura_certificate` varchar(180) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKrh1m6rt31v8kdrpj6ui88rm7m` (`rev`),
  CONSTRAINT `FKrh1m6rt31v8kdrpj6ui88rm7m` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vessel_aud`
--

LOCK TABLES `vessel_aud` WRITE;
/*!40000 ALTER TABLE `vessel_aud` DISABLE KEYS */;
INSERT INTO `vessel_aud` VALUES (1,80,0,'50','0788757214','32 x 6 x 2','\0','32','MUNGUYIKO 1','MBARUSHIMANA EDOUARD','RWT186A','RURA/TRA/AUT/240391781','Pending'),(1,93,1,'50','0788757214','32 x 6 x 2','\0','32','MUNGUYIKO 1','MBARUSHIMANA EDOUARD','RWT186A','RURA/TRA/AUT/240391781','Booked'),(1,94,1,'50','0788757214','32 x 6 x 2','\0','32','MUNGUYIKO 1','MBARUSHIMANA EDOUARD','RWT186A','RURA/TRA/AUT/240391781','Booked'),(1,107,1,'50','0788757214','32 x 6 x 2','\0','32','MUNGUYIKO 1','MBARUSHIMANA EDOUARD','RWT186A','RURA/TRA/AUT/240391781','Berthed'),(1,108,1,'50','0788757214','32 x 6 x 2','\0','32','MUNGUYIKO 1','MBARUSHIMANA EDOUARD','RWT186A','RURA/TRA/AUT/240391781','Berthed'),(2,81,0,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Pending'),(2,145,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Booked'),(2,146,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Booked'),(2,156,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Berthed'),(2,157,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Berthed'),(2,160,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Invoiced'),(2,209,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Paid'),(2,764,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Unberthed'),(2,768,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Booked'),(2,769,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Booked'),(2,771,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Berthed'),(2,772,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Berthed'),(2,773,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Invoiced'),(2,790,1,'50','0781087663','30 x 5 x 2','\0','30','BARAKA','ISHYRWA TRADING COMPANY','RWT024A','RURA/TRA/AUT240474662','Paid'),(3,82,0,'100','0786285265','21 x 4 x 2','\0','21','MUNGUYIKO3','MBARUSHIMANA TRADING COMPANY','RWT703A','RURA/TRA/AUT/240389164','Pending'),(3,95,1,'100','0786285265','21 x 4 x 2','\0','21','MUNGUYIKO3','MBARUSHIMANA TRADING COMPANY','RWT703A','RURA/TRA/AUT/240389164','Booked'),(3,96,1,'100','0786285265','21 x 4 x 2','\0','21','MUNGUYIKO3','MBARUSHIMANA TRADING COMPANY','RWT703A','RURA/TRA/AUT/240389164','Booked'),(3,99,1,'100','0786285265','21 x 4 x 2','\0','21','MUNGUYIKO3','MBARUSHIMANA TRADING COMPANY','RWT703A','RURA/TRA/AUT/240389164','Berthed'),(3,100,1,'100','0786285265','21 x 4 x 2','\0','21','MUNGUYIKO3','MBARUSHIMANA TRADING COMPANY','RWT703A','RURA/TRA/AUT/240389164','Berthed'),(3,777,1,'100','0786285265','21 x 4 x 2','\0','21','MUNGUYIKO3','MBARUSHIMANA TRADING COMPANY','RWT703A','RURA/TRA/AUT/240389164','Invoiced'),(4,83,0,'80','0788875478','45 x 7 x 2','\0','45','M.V TUWOMBE MUNGU 2','KASHINZWENIMANA ANASTASE','RWT648A','RURA/AUT/240427411','Pending'),(4,97,1,'80','0788875478','45 x 7 x 2','\0','45','M.V TUWOMBE MUNGU 2','KASHINZWENIMANA ANASTASE','RWT648A','RURA/AUT/240427411','Booked'),(4,98,1,'80','0788875478','45 x 7 x 2','\0','45','M.V TUWOMBE MUNGU 2','KASHINZWENIMANA ANASTASE','RWT648A','RURA/AUT/240427411','Booked'),(4,105,1,'80','0788875478','45 x 7 x 2','\0','45','M.V TUWOMBE MUNGU 2','KASHINZWENIMANA ANASTASE','RWT648A','RURA/AUT/240427411','Berthed'),(4,106,1,'80','0788875478','45 x 7 x 2','\0','45','M.V TUWOMBE MUNGU 2','KASHINZWENIMANA ANASTASE','RWT648A','RURA/AUT/240427411','Berthed'),(5,84,0,'20','0783233698','7 x 2 x 2','\0','7','AMANI','HABYARIMANA JEAN NEPO','RWT771A','RURA/AUT/240456657','Pending'),(5,569,1,'20','0783233698','7 x 2 x 2','\0','7','AMANI','HABYARIMANA JEAN NEPO','RWT771A','RURA/AUT/240456657','Booked'),(5,570,1,'20','0783233698','7 x 2 x 2','\0','7','AMANI','HABYARIMANA JEAN NEPO','RWT771A','RURA/AUT/240456657','Booked'),(5,571,1,'20','0783233698','7 x 2 x 2','\0','7','AMANI','HABYARIMANA JEAN NEPO','RWT771A','RURA/AUT/240456657','Berthed'),(5,572,1,'20','0783233698','7 x 2 x 2','\0','7','AMANI','HABYARIMANA JEAN NEPO','RWT771A','RURA/AUT/240456657','Berthed'),(5,573,1,'20','0783233698','7 x 2 x 2','\0','7','AMANI','HABYARIMANA JEAN NEPO','RWT771A','RURA/AUT/240456657','Invoiced'),(6,88,0,'209','0783330903','52 x 8 x 2','\0','52','MV/ZAWADI YA MUNGU 2','NYAMINANI MAZIMPAKA FRANCO','XXX','XXX','Pending'),(6,101,1,'209','0783330903','52 x 8 x 2','\0','52','MV/ZAWADI YA MUNGU 2','NYAMINANI MAZIMPAKA FRANCO','XXX','XXX','Booked'),(6,102,1,'209','0783330903','52 x 8 x 2','\0','52','MV/ZAWADI YA MUNGU 2','NYAMINANI MAZIMPAKA FRANCO','XXX','XXX','Booked'),(6,103,1,'209','0783330903','52 x 8 x 2','\0','52','MV/ZAWADI YA MUNGU 2','NYAMINANI MAZIMPAKA FRANCO','XXX','XXX','Berthed'),(6,104,1,'209','0783330903','52 x 8 x 2','\0','52','MV/ZAWADI YA MUNGU 2','NYAMINANI MAZIMPAKA FRANCO','XXX','XXX','Berthed'),(6,491,1,'209','0783330903','52 x 8 x 2','\0','52','MV/ZAWADI YA MUNGU 2','NYAMINANI MAZIMPAKA FRANCO','XXX','XXX','Invoiced'),(7,109,0,'50','0786285265','21 x 4 x 2','\0','21','M.V EDISSA','MBARUSHA TRADING COMPANY','RWT693A','RURA/TRA/AUT/250505397','Pending'),(7,112,1,'50','0786285265','21 x 4 x 2','\0','21','M.V EDISSA','MBARUSHA TRADING COMPANY','RWT693A','RURA/TRA/AUT/250505397','Booked'),(7,113,1,'50','0786285265','21 x 4 x 2','\0','21','M.V EDISSA','MBARUSHA TRADING COMPANY','RWT693A','RURA/TRA/AUT/250505397','Booked'),(7,150,1,'50','0786285265','21 x 4 x 2','\0','21','M.V EDISSA','MBARUSHA TRADING COMPANY','RWT693A','RURA/TRA/AUT/250505397','Berthed'),(7,151,1,'50','0786285265','21 x 4 x 2','\0','21','M.V EDISSA','MBARUSHA TRADING COMPANY','RWT693A','RURA/TRA/AUT/250505397','Berthed'),(8,138,0,'80','0788346365','50 x 20 x 10','\0','50','EMMANUEL 5','SIMEON LIMANZI','RD1070ASB2500053','XXXX','Pending'),(8,139,1,'80','0788346365','50 x 20 x 10','\0','50','EMMANUEL 5','SIMEON LIMANZI','RD1070ASB2500053','XXXX','Booked'),(8,140,1,'80','0788346365','50 x 20 x 10','\0','50','EMMANUEL 5','SIMEON LIMANZI','RD1070ASB2500053','XXXX','Booked'),(9,196,0,'35','0788989852','20 x 10 x 20','\0','30','NIYOKWIZERWA','COOP DUKORE TUBEHO','084RW','XXX0','Pending'),(9,200,1,'35','0788989852','20 x 10 x 20','\0','30','NIYOKWIZERWA','COOP DUKORE TUBEHO','084RW','XXX0','Booked'),(9,201,1,'35','0788989852','20 x 10 x 20','\0','30','NIYOKWIZERWA','COOP DUKORE TUBEHO','084RW','XXX0','Booked'),(9,202,1,'35','0788989852','20 x 10 x 20','\0','30','NIYOKWIZERWA','COOP DUKORE TUBEHO','084RW','XXX0','Berthed'),(9,203,1,'35','0788989852','20 x 10 x 20','\0','30','NIYOKWIZERWA','COOP DUKORE TUBEHO','084RW','XXX0','Berthed'),(9,204,1,'35','0788989852','20 x 10 x 20','\0','30','NIYOKWIZERWA','COOP DUKORE TUBEHO','084RW','XXX0','Invoiced'),(10,385,0,'30','00','30 x 10 x 3','\0','30','EMS GENERAL','EMS GENERAL','XX XX','xx','Pending'),(10,386,1,'30','00','30 x 10 x 3','\0','30','EMS GENERAL','EMS GENERAL','XX XX','xx','Booked'),(10,387,1,'30','00','30 x 10 x 3','\0','30','EMS GENERAL','EMS GENERAL','XX XX','xx','Booked'),(10,388,1,'30','00','30 x 10 x 3','\0','30','EMS GENERAL','EMS GENERAL','XX XX','xx','Berthed'),(10,389,1,'30','00','30 x 10 x 3','\0','30','EMS GENERAL','EMS GENERAL','XX XX','xx','Berthed'),(10,390,1,'30','00','30 x 10 x 3','\0','30','EMS GENERAL','EMS GENERAL','XX XX','xx','Invoiced'),(11,742,0,'100','0788757214','50 x 50 x 50','\0','50','EDEN II','MBARUSHIMANA EDOUARD','RWT421A','RURA-TRA-AUT-240431829','Pending');
/*!40000 ALTER TABLE `vessel_aud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wh_movement`
--

DROP TABLE IF EXISTS `wh_movement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wh_movement` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `carrier` bigint(20) NOT NULL,
  `current_qty` int(11) NOT NULL,
  `date_time` varchar(70) NOT NULL,
  `in_out` varchar(70) NOT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `reference` varchar(255) NOT NULL,
  `remaining` int(11) NOT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK22uh3sry2jtkooeah0241o7mx` (`user_id`),
  CONSTRAINT `FK22uh3sry2jtkooeah0241o7mx` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wh_movement`
--

LOCK TABLES `wh_movement` WRITE;
/*!40000 ALTER TABLE `wh_movement` DISABLE KEYS */;
INSERT INTO `wh_movement` VALUES (1,0,0,'2025-04-08 09:33:40','in','\0','',540,34,1),(2,0,0,'2025-04-08 10:10:51','in','\0','',1,35,1),(3,0,0,'2025-04-08 12:25:49','in','\0','',1,36,1),(4,0,1,'2025-04-08 12:35:54','in','\0','',2,36,1),(5,0,0,'2025-04-08 12:40:31','in','\0','',1,37,1),(6,0,540,'2025-04-09 11:53:31','in','\0','',541,34,1),(7,0,0,'2025-04-09 12:51:43','in','\0','',1,38,1);
/*!40000 ALTER TABLE `wh_movement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wh_movement_aud`
--

DROP TABLE IF EXISTS `wh_movement_aud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wh_movement_aud` (
  `id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `carrier` bigint(20) DEFAULT NULL,
  `current_qty` int(11) DEFAULT NULL,
  `date_time` varchar(70) DEFAULT NULL,
  `in_out` varchar(70) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `remaining` int(11) DEFAULT NULL,
  `items_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`rev`),
  KEY `FKhxxall6xqt2206yin08ghhgsv` (`rev`),
  CONSTRAINT `FKhxxall6xqt2206yin08ghhgsv` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wh_movement_aud`
--

LOCK TABLES `wh_movement_aud` WRITE;
/*!40000 ALTER TABLE `wh_movement_aud` DISABLE KEYS */;
INSERT INTO `wh_movement_aud` VALUES (1,644,0,0,0,'2025-04-08 09:33:40','in','\0','',540,34,1),(2,649,0,0,0,'2025-04-08 10:10:51','in','\0','',1,35,1),(3,671,0,0,0,'2025-04-08 12:25:49','in','\0','',1,36,1),(4,672,0,0,1,'2025-04-08 12:35:54','in','\0','',2,36,1),(5,673,0,0,0,'2025-04-08 12:40:31','in','\0','',1,37,1),(6,743,0,0,540,'2025-04-09 11:53:31','in','\0','',541,34,1),(7,753,0,0,0,'2025-04-09 12:51:43','in','\0','',1,38,1);
/*!40000 ALTER TABLE `wh_movement_aud` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-09 22:20:45
