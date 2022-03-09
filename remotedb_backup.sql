-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: sql6.freemysqlhosting.net    Database: sql6466617
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin_table`
--

DROP TABLE IF EXISTS `Admin_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin_table` (
  `adminId` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `passwrd` varchar(15) NOT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin_table`
--

LOCK TABLES `Admin_table` WRITE;
/*!40000 ALTER TABLE `Admin_table` DISABLE KEYS */;
INSERT INTO `Admin_table` VALUES ('1602-19-735-000','test@gmail.com','test');
/*!40000 ALTER TABLE `Admin_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Devices`
--

DROP TABLE IF EXISTS `Devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Devices` (
  `deviceId` varchar(15) NOT NULL,
  `catageory` varchar(255) NOT NULL,
  `variant` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`deviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devices`
--

LOCK TABLES `Devices` WRITE;
/*!40000 ALTER TABLE `Devices` DISABLE KEYS */;
INSERT INTO `Devices` VALUES ('c4-d1','catageory4','device1',2,'/assets/gojo.png'),('em-nm','embedded','nodemcu',10,'/assets/gojo.png');
/*!40000 ALTER TABLE `Devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `rollNo` varchar(20) NOT NULL,
  `studentname` varchar(255) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  PRIMARY KEY (`rollNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('1602-19-735-002','Athul','9876543210','Athul@gmail.com');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `cartId` varchar(15) NOT NULL,
  `devList` varchar(255) NOT NULL,
  `given` tinyint(1) DEFAULT '0',
  `returned` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`cartId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
INSERT INTO `Cart` VALUES ('c008','em-nm,en-nu,us-ts',1,1);
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transactions` (
  `transId` varchar(15) NOT NULL,
  `cart_Id` varchar(15) NOT NULL,
  `roll_No` varchar(15) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `returnDate` date DEFAULT NULL,
  `compList` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`transId`),
  KEY `cart_Id` (`cart_Id`),
  KEY `roll_No` (`roll_No`),
  CONSTRAINT `Transactions_ibfk_1` FOREIGN KEY (`cart_Id`) REFERENCES `Cart` (`cartId`),
  CONSTRAINT `Transactions_ibfk_2` FOREIGN KEY (`roll_No`) REFERENCES `Users` (`rollNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transactions`
--

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
INSERT INTO `Transactions` VALUES ('t013','c008','1602-19-735-002','2021-01-21','2021-12-21','0000-00-00','en-mo-001,en-nu-091,us-ts-001'),('t014','c008','1602-19-735-002','2021-01-21','2021-12-21','0000-00-00','em-nm-001,en-nu-002,us-ts-051'),('t015','c008','1602-19-735-002','2021-01-21','2021-12-21',NULL,'en-nm-001,en-au-001,ss-us-003'),('t016','c008','1602-19-735-002','2021-01-21','2021-12-21',NULL,NULL);
/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Fine`
--

DROP TABLE IF EXISTS `Fine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Fine` (
  `roll_No` varchar(15) NOT NULL,
  `fineAmount` varchar(15) NOT NULL,
  `transId` varchar(15) NOT NULL,
  PRIMARY KEY (`roll_No`),
  KEY `transId` (`transId`),
  CONSTRAINT `Fine_ibfk_1` FOREIGN KEY (`transId`) REFERENCES `Transactions` (`transId`),
  CONSTRAINT `Fine_ibfk_2` FOREIGN KEY (`roll_No`) REFERENCES `Users` (`rollNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Fine`
--

LOCK TABLES `Fine` WRITE;
/*!40000 ALTER TABLE `Fine` DISABLE KEYS */;
INSERT INTO `Fine` VALUES ('1602-19-735-002','100000','t013');
/*!40000 ALTER TABLE `Fine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-06 13:38:20
