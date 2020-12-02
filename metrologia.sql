CREATE DATABASE  IF NOT EXISTS `metrologia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `metrologia`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: metrologia
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dados_metrologia`
--

DROP TABLE IF EXISTS `dados_metrologia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dados_metrologia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_sensor` varchar(255) NOT NULL,
  `temperatura` int NOT NULL,
  `umidade` int NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dados_metrologia`
--

LOCK TABLES `dados_metrologia` WRITE;
/*!40000 ALTER TABLE `dados_metrologia` DISABLE KEYS */;
INSERT INTO `dados_metrologia` VALUES (1,'A',21,8,'2019-12-05 20:52:12'),(2,'B',25,55,'2020-09-06 00:51:11'),(3,'C',41,6,'2020-03-22 14:25:11'),(4,'D',37,38,'2020-03-06 18:28:05'),(5,'E',16,30,'2020-06-08 05:40:25'),(6,'A',29,24,'2020-07-18 07:47:16'),(7,'B',38,37,'2020-03-16 07:30:03'),(8,'C',31,29,'2020-11-05 09:08:05'),(9,'D',33,51,'2020-02-16 14:24:28'),(10,'E',31,46,'2020-01-22 22:34:56'),(11,'A',10,63,'2020-10-13 14:31:56'),(12,'B',32,15,'2020-07-14 14:59:51'),(13,'C',45,38,'2020-05-07 10:25:46'),(14,'D',31,24,'2020-05-12 21:17:47'),(15,'E',11,21,'2020-10-31 03:44:24'),(16,'A',29,28,'2020-03-01 12:21:30'),(17,'B',34,18,'2020-10-03 17:47:24'),(18,'C',18,66,'2020-08-06 22:58:19'),(19,'D',31,72,'2020-10-01 05:33:20'),(20,'E',40,34,'2020-04-14 09:58:57'),(21,'A',15,37,'2020-09-20 20:02:44'),(22,'B',17,45,'2020-03-31 11:17:06'),(23,'C',43,58,'2020-08-10 07:00:31'),(24,'D',28,31,'2019-12-09 15:37:01'),(25,'E',41,27,'2020-08-08 14:27:54'),(26,'A',41,49,'2020-07-11 08:39:59'),(27,'B',29,24,'2020-09-29 16:22:30'),(28,'C',18,46,'2020-08-23 14:29:44'),(29,'D',26,30,'2020-08-20 06:05:45'),(30,'E',16,12,'2020-04-11 23:01:59'),(31,'A',24,37,'2020-03-19 02:08:25'),(32,'B',16,1,'2020-03-04 19:44:39'),(33,'C',29,7,'2020-09-21 19:03:15'),(34,'D',20,56,'2020-01-30 20:38:47'),(35,'E',31,35,'2020-10-12 00:53:53'),(36,'A',25,43,'2020-04-04 23:06:54'),(37,'B',23,47,'2020-01-18 17:30:07'),(38,'C',13,31,'2020-01-14 04:58:00'),(39,'D',40,58,'2020-09-24 18:00:00'),(40,'E',24,16,'2020-02-20 10:54:56'),(41,'A',21,35,'2020-06-09 06:27:09'),(42,'B',12,54,'2020-03-02 05:34:36'),(43,'C',23,73,'2020-03-29 17:39:12'),(44,'D',16,56,'2020-04-02 05:12:29'),(45,'E',39,55,'2020-05-19 11:00:30'),(46,'A',37,54,'2020-04-06 09:53:32'),(47,'B',23,79,'2020-08-29 16:48:34'),(48,'C',23,63,'2020-02-10 12:37:14'),(49,'D',41,14,'2020-09-07 01:51:36'),(50,'E',41,1,'2020-09-03 05:23:47'),(51,'A',38,20,'2020-07-21 06:41:29'),(52,'B',37,72,'2019-12-17 22:54:04'),(53,'C',21,42,'2020-06-10 16:35:54'),(54,'D',35,21,'2020-08-13 20:41:55'),(55,'E',25,37,'2020-05-29 17:30:52'),(56,'A',19,24,'2020-08-01 11:28:49'),(57,'B',18,50,'2020-05-16 01:54:45'),(58,'C',39,65,'2020-11-10 05:01:50'),(59,'D',17,55,'2020-08-17 06:45:35'),(60,'E',44,19,'2020-07-30 05:23:15');
/*!40000 ALTER TABLE `dados_metrologia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'metrologia'
--

--
-- Dumping routines for database 'metrologia'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-01 22:43:24
