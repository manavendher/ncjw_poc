CREATE DATABASE  IF NOT EXISTS `ncjw` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ncjw`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: ncjw
-- ------------------------------------------------------
-- Server version	5.5.34-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `parentId` int(11) NOT NULL,
  `tier` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Home',-1,0),(2,'Women\'s',1,1),(3,'Men\'s',1,1),(4,'Children\'s',1,1),(5,'Jewelry',1,1),(6,'Furs',1,1),(7,'Top',2,2),(8,'Sweater',2,2),(9,'Pants',2,2),(10,'Shorts',2,2),(11,'Suit',2,2),(12,'Blazer',2,2),(13,'Active Wear',2,2),(14,'Outerwear',2,2),(15,'Skirts',2,2),(16,'Shirt',3,2),(17,'Suit',3,2),(18,'Blazer',3,2),(19,'Pants',3,2),(20,'Shorts',3,2),(21,'Sweater',3,2),(22,'Active Wear',3,2),(23,'Clothing',4,2),(24,'Toys',4,2),(25,'Designer',7,3),(26,'Designer',8,3),(27,'Designer',9,3),(28,'Designer',10,3),(29,'Designer',11,3),(30,'Designer',12,3),(31,'Designer',13,3),(32,'Designer',14,3),(33,'Designer',15,3),(34,'New',7,3),(35,'New',8,3),(36,'New',9,3),(37,'New',10,3),(38,'New',11,3),(39,'New',12,3),(40,'New',13,3),(41,'New',14,3),(42,'New',15,3),(43,'Short Sleeve',7,3),(44,'Long Sleeve',7,3);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `price_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,1,1,23),(2,1,1,15),(3,1,2,25),(4,1,1,12),(5,2,2,20),(6,1,1,34),(7,1,1,12);
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tier1` int(11) NOT NULL,
  `tier2` int(11) NOT NULL,
  `tier3` varchar(45) NOT NULL,
  `price1` int(11) DEFAULT NULL,
  `price2` int(11) DEFAULT NULL,
  `price3` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,2,7,'25,43',12,15,20),(2,2,7,'25,44',15,20,25),(3,2,8,'25',20,25,30),(4,2,9,'25',15,20,25),(5,2,10,'25',8,10,12),(6,2,10,'25',8,10,12),(7,2,11,'25',30,35,40),(8,2,12,'25',20,25,30),(9,2,13,'25',20,25,30),(10,2,14,'25',35,40,45),(11,2,15,'25',12,15,20),(12,3,16,'43',12,15,20),(13,3,16,'44',20,25,30),(14,3,17,'25',40,50,60),(15,3,18,'25',25,30,40),(16,3,19,'25',15,20,25),(17,3,20,'25',10,12,15),(18,3,21,'25',25,30,35),(19,3,22,'25',20,25,30);
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`unique_id`),
  UNIQUE KEY `unique_id_UNIQUE` (`unique_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,70001);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Manavendranadh Roy','9898989898','m@m.com','India'),(2,'ShowMan','9988998899','p@p.com','US'),(3,'RamaKrishna','9879879879','r@r.com','INDIA'),(4,'A Sathish','9876598765','s@s.com','India'),(8,'M Jagadesh','9876543217','j@j.com','India');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-11 19:58:18
