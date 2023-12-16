-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
-- Generate with: "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump" -u root -p partnervista > partnervista-db.sql
--
-- Host: localhost    Database: partnervista
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `partner_addresses`
--

DROP TABLE IF EXISTS `partner_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partner_addresses` (
  `partner_id` int NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `coordinates` point DEFAULT NULL,
  PRIMARY KEY (`partner_id`),
  CONSTRAINT `partner_id` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`partner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_addresses`
--

--
-- Table structure for table `partner_types`
--

DROP TABLE IF EXISTS `partner_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partner_types` (
  `partner_id` int NOT NULL,
  `type_id` int NOT NULL,
  PRIMARY KEY (`partner_id`,`type_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `partner_types_ibfk_1` FOREIGN KEY (`partner_id`) REFERENCES `partners` (`partner_id`),
  CONSTRAINT `partner_types_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `types` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_types`
--

LOCK TABLES `partner_types` WRITE;
/*!40000 ALTER TABLE `partner_types` DISABLE KEYS */;
INSERT INTO `partner_types` VALUES (29,1),(36,1),(64,1),(68,1),(73,1),(78,1),(83,1),(85,1),(54,2),(61,2),(80,2),(84,2),(87,2),(43,3),(49,3),(60,3),(67,3),(70,3),(82,3),(83,3),(35,4),(42,4),(48,4),(56,4),(63,4),(74,4),(79,4),(32,5),(39,5),(51,5),(58,5),(76,5),(80,5),(87,5),(30,7),(84,7),(33,8),(81,8),(46,9),(57,9),(65,9),(77,9),(38,10),(86,10),(69,11),(31,12),(71,12),(50,13),(59,13),(66,13),(41,14),(75,14),(30,15),(47,15),(72,15),(53,17),(34,18),(45,18),(44,20),(62,20),(40,21),(52,22),(82,22);
/*!40000 ALTER TABLE `partner_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners` (
  `partner_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` mediumtext,
  `resources` text,
  `website` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`partner_id`),
  FULLTEXT KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES (29,'Quantum Innovations','Cutting-edge technology solutions provider','Research labs, prototyping facilities','http://www.quantuminnovations.com','Dr. Alex Quantum','alex@quantuminnovations.com','(555) 123-4567','2023-11-24 17:16:17','2023-11-26 00:33:23'),(30,'Sparkle Studios','Creative design and animation studio','Animation software, design workshops','http://www.sparklestudios.net','Olivia Sparkle','olivia@sparklestudios.net','(555) 234-5678','2023-11-24 17:16:17','2023-11-26 00:33:23'),(31,'EcoHarmony Foundation','Environmental conservation organization','Eco-friendly initiatives, educational programs','http://www.ecoharmony.org','Dr. Emma Green','emma@ecoharmony.org','(555) 345-6789','2023-11-24 17:16:17','2023-11-26 00:33:23'),(32,'RoboBuilders Inc.','Robotics education and manufacturing','Robotics kits, programming courses','http://www.robobuilders.com','Robert Builder','robert@robobuilders.com','(555) 456-7890','2023-11-24 17:16:17','2023-11-26 00:33:23'),(33,'Culinary Delights Catering','Gourmet catering services','Professional chefs, event catering','http://www.cateringdelights.com','Chef Samantha Spice','samantha@cateringdelights.com','(555) 567-8901','2023-11-24 17:16:17','2023-11-26 00:33:23'),(34,'Galactic Games','Virtual reality gaming company','VR gaming consoles, game development kits','http://www.galacticgames.net','Max Gamer','max@galacticgames.net','(555) 123-9876','2023-11-24 17:16:17','2023-11-26 00:33:23'),(35,'Harmony Health Center','Holistic wellness and health center','Wellness programs, fitness classes','http://www.healthcenter.com','Dr. Harmony Wellness','harmony@healthcenter.com','(555) 234-8765','2023-11-24 17:16:17','2023-11-26 00:33:23'),(36,'TechTrek Solutions','Innovative software development company','Software development tools, coding bootcamps','http://www.techtrek.com','Lisa CodeMaster','lisa@techtrek.com','(555) 987-6543','2023-11-24 17:17:47','2023-11-26 00:33:23'),(37,'ArtyCraft Studios','Handcrafted art and craft studio','Art supplies, craft workshops','http://www.artycraft.com','Charlie Artisan','charlie@artycraft.com','(555) 876-5432','2023-11-24 17:17:47','2023-11-26 00:33:23'),(38,'GreenThumb Gardens','Landscaping and garden design services','Landscaping tools, gardening workshops','http://www.greenthumbgardens.com','Greta GreenThumb','greta@greenthumbgardens.com','(555) 765-4321','2023-11-24 17:17:47','2023-11-26 00:33:23'),(39,'CodeCrunch Academy','Coding and programming education','Coding courses, hackathons','http://www.codecrunch.com','Professor CodeCrunch','professor@codecrunch.com','(555) 234-5678','2023-11-24 17:17:47','2023-11-26 00:33:23'),(40,'SkyHigh Aviation','Aviation training and services','Flight simulators, pilot training programs','http://www.skyhighaviation.com','Captain SkyWalker','captain@skyhighaviation.com','(555) 678-9012','2023-11-24 17:17:47','2023-11-26 00:33:23'),(41,'MusiMagic Studios','Music production and recording studio','Recording equipment, music lessons','http://www.musimagicstudios.com','Melody Maestro','melody@musimagicstudios.com','(555) 345-6789','2023-11-24 17:17:47','2023-11-26 00:33:23'),(42,'HealthyBite Cafe','Organic and healthy food cafe','Organic ingredients, cooking classes','http://www.healthybitecafe.com','Chef HealthyBite','chef@healthybitecafe.com','(555) 890-1234','2023-11-24 17:17:47','2023-11-26 00:33:23'),(43,'BioTech Innovators','Biotechnology research and development','Biotech labs, research grants','http://www.biotechinnovators.com','Dr. Biotech Genius','genius@biotechinnovators.com','(555) 432-1098','2023-11-24 17:17:47','2023-11-26 00:33:23'),(44,'FutureFashion Collective','Sustainable fashion design group','Eco-friendly fabrics, fashion workshops','http://www.futurefashion.com','Stella StyleMaven','stella@futurefashion.com','(555) 321-0987','2023-11-24 17:17:47','2023-11-26 00:33:23'),(45,'PixelPlay Games','Indie game development company','Game design software, indie game competitions','http://www.pixelplaygames.com','Alex PixelMaster','alex@pixelplaygames.com','(555) 678-9012','2023-11-24 17:17:47','2023-11-26 00:33:23'),(46,'SolarTech Solutions','Renewable energy solutions provider','Solar panels, energy efficiency workshops','http://www.solartech.com','Elena SolarExpert','elena@solartech.com','(555) 890-1234','2023-11-24 17:18:33','2023-11-26 00:33:23'),(47,'PixelPerfect Design Agency','Graphic design and branding services','Design software, branding consultations','http://www.pixelperfectdesign.com','Sam PixelArtist','sam@pixelperfectdesign.com','(555) 123-4567','2023-11-24 17:18:33','2023-11-26 00:33:23'),(48,'MindfulLiving Retreats','Wellness and mindfulness retreats','Meditation sessions, wellness retreats','http://www.mindfulliving.com','Zen Master Olivia','olivia@mindfulliving.com','(555) 234-5678','2023-11-24 17:18:33','2023-11-26 00:33:23'),(49,'RobotRovers Exploration Society','Robotics for space exploration','Space rovers, robotics competitions','http://www.robotrovers.com','Commander RoverExplorer','rover@robotrovers.com','(555) 345-6789','2023-11-24 17:18:33','2023-11-26 00:33:23'),(50,'TastyTech Kitchen Gadgets','Innovative kitchen gadgets and tools','Kitchen gadgets, cooking demonstrations','http://www.tastytechgadgets.com','Gadget Guru Gary','gary@tastytechgadgets.com','(555) 456-7890','2023-11-24 17:18:33','2023-11-26 00:33:23'),(51,'EduEmpower Learning Solutions','Educational empowerment programs','Learning materials, mentorship programs','http://www.eduempower.com','Dr. Emily EduEmpower','emily@eduempower.com','(555) 567-8901','2023-11-24 17:18:33','2023-11-26 00:33:23'),(52,'GreenTech Farms','Sustainable agriculture and farming','Organic farming methods, agricultural workshops','http://www.greentechfarms.com','Farmer GreenThumb','farmer@greentechfarms.com','(555) 678-9012','2023-11-24 17:18:33','2023-11-26 00:33:23'),(53,'SkyDive Adventures','Skydiving and extreme sports experiences','Skydiving equipment, extreme sports events','http://www.skydiveadventures.com','Daredevil SkyDiver','daredevil@skydiveadventures.com','(555) 789-0123','2023-11-24 17:18:33','2023-11-26 00:33:23'),(54,'InnoInvent Prototyping Lab','Prototyping and invention development','Prototyping tools, invention workshops','http://www.innoInventlab.com','Inventor Innovator','inventor@innoInventlab.com','(555) 890-1234','2023-11-24 17:18:33','2023-11-26 00:33:23'),(55,'DanceFusion Studios','Dance classes and performance studio','Dance studios, dance performance events','http://www.dancefusion.com','Dance Dynamo Diana','diana@dancefusion.com','(555) 123-2345','2023-11-24 17:18:33','2023-11-26 00:33:23'),(56,'ZenZone Wellness','Mindfulness and meditation center','Meditation classes, wellness retreats','http://www.zenzone.com','Zen Master','zenmaster@zenzone.com','(555) 876-5432','2023-11-24 17:20:24','2023-11-26 00:33:23'),(57,'SolarScape Energy','Solar energy solutions provider','Solar panels, energy efficiency audits','http://www.solarscapeenergy.com','Sunny Solaris','sunny@solarscapeenergy.com','(555) 765-4321','2023-11-24 17:20:24','2023-11-26 00:33:23'),(58,'InnoKids Learning Center','Innovative early childhood education','Interactive learning materials, parent workshops','http://www.innokids.com','Professor SmartyPants','professor@innokids.com','(555) 234-5678','2023-11-24 17:20:24','2023-11-26 00:33:23'),(59,'AdventureTech Outdoor Gear','Outdoor adventure equipment retailer','Camping gear, adventure travel packages','http://www.adventuretech.com','Ava Explorer','ava@adventuretech.com','(555) 678-9012','2023-11-24 17:20:24','2023-11-26 00:33:23'),(60,'ScienceSpark Labs','Science experiments and educational kits','STEM education kits, science fair sponsorships','http://www.sciencespark.com','Dr. ScienceWhiz','drscience@sciencespark.com','(555) 890-1234','2023-11-24 17:20:24','2023-11-26 00:33:23'),(61,'FloralFiesta Events','Floral and event design company','Floral arrangements, event planning services','http://www.floralfiesta.com','Flora Eventista','flora@floralfiesta.com','(555) 321-0987','2023-11-24 17:20:24','2023-11-26 00:33:23'),(62,'RoboPets Tech','Robotics for pet care and companionship','Robotic pet toys, pet tech workshops','http://www.robopets.com','Petra RoboFriend','petra@robopets.com','(555) 432-1098','2023-11-24 17:20:24','2023-11-26 00:33:23'),(63,'FitFusion Gym','Fitness and wellness center','Gym equipment, fitness classes','http://www.fitfusiongym.com','Fit Guru','fitguru@fitfusiongym.com','(555) 567-8901','2023-11-24 17:20:24','2023-11-26 00:33:23'),(64,'DataDynamo Analytics','Data analytics and business intelligence','Data analysis tools, analytics training','http://www.datadynamo.com','Diana DataWhiz','diana@datadynamo.com','(555) 789-0123','2023-11-24 17:20:24','2023-11-26 00:33:23'),(65,'GreenPrint EcoPrinters','Eco-friendly printing solutions','Recycled paper, eco-printing services','http://www.greenprint.com','Eco Printer','ecoprinter@greenprint.com','(555) 901-2345','2023-11-24 17:20:24','2023-11-26 00:33:23'),(66,'WiseWords Publishing','Book publishing and literary agency','Editing services, author workshops','http://www.wisewords.com','Oliver WiseWords','oliver@wisewords.com','(555) 345-6789','2023-11-24 17:20:24','2023-11-26 00:33:23'),(67,'Oceanic Explorers Society','Marine biology and ocean conservation','Oceanography research, marine conservation programs','http://www.oceanicsociety.com','Dr. Ocean Explorer','oceanexplorer@oceanicsociety.com','(555) 678-9012','2023-11-24 17:20:24','2023-11-26 00:33:23'),(68,'TechieTea IT Solutions','IT consulting and solutions provider','IT support, cybersecurity services','http://www.techietea.com','Tina Techie','tina@techietea.com','(555) 890-1234','2023-11-24 17:20:24','2023-11-26 00:33:23'),(69,'SkyScraper Construction','Construction and architecture firm','Architectural design, construction services','http://www.skyscraperconstruction.com','Bob Builder','bob@skyscraperconstruction.com','(555) 123-4567','2023-11-24 17:20:24','2023-11-26 00:33:23'),(70,'MarsVoyager Space Agency','Space exploration and research','Space missions, astronomy workshops','http://www.marsvoyager.com','Captain MarsExplorer','captain@marsvoyager.com','(555) 234-5678','2023-11-24 17:20:24','2023-11-26 00:33:23'),(71,'UrbanHarbor Community Center','Community development organization','Community programs, volunteer opportunities','http://www.urbanharbor.org','Harriet CommunityBuilder','harriet@urbanharbor.org','(555) 345-6789','2023-11-24 17:20:24','2023-11-26 00:33:23'),(72,'PixelPerfect Photography','Photography studio and services','Photography sessions, photo editing','http://www.pixelperfect.com','Penny Photographer','penny@pixelperfect.com','(555) 456-7890','2023-11-24 17:20:24','2023-11-26 00:33:23'),(73,'Skyline TechHub','Tech incubator and co-working space','Co-working spaces, startup mentorship','http://www.skylinetechhub.com','Steve StartupWhiz','steve@skylinetechhub.com','(555) 567-8901','2023-11-24 17:20:24','2023-11-26 00:33:23'),(74,'HealthHub Medical Center','Medical care and wellness clinic','Medical services, wellness programs','http://www.healthhub.com','Dr. WellnessCare','drwellness@healthhub.com','(555) 678-9012','2023-11-24 17:20:24','2023-11-26 00:33:23'),(75,'BeeCreative Marketing','Creative marketing and advertising agency','Marketing campaigns, brand development','http://www.beecreative.com','Buzz CreativeBee','buzz@beecreative.com','(555) 789-0123','2023-11-24 17:20:24','2023-11-26 00:33:23'),(76,'EduCraft Learning Toys','Educational toys and games manufacturer','STEM toys, educational games','http://www.educrafttoys.com','Ella EduCraft','ella@educrafttoys.com','(555) 890-1234','2023-11-24 17:20:24','2023-11-26 00:33:23'),(77,'SolarSolutions Inc.','Solar energy solutions provider','Solar panels, renewable energy consultations','http://www.solarsolutions.com','Sunny Solaris','sunny@solarsolutions.com','(555) 111-2222','2023-11-24 17:21:16','2023-11-26 00:33:23'),(78,'TechHarbor Labs','Innovative tech incubator','Co-working spaces, mentorship programs','http://www.techharborlabs.com','Nina Innovator','nina@techharborlabs.com','(555) 333-4444','2023-11-24 17:21:16','2023-11-26 00:33:23'),(79,'WonderWell Wellness Center','Holistic health and wellness services','Wellness retreats, holistic therapies','http://www.wonderwell.com','Wellness Wonder','wellness@wonderwell.com','(555) 555-6666','2023-11-24 17:21:16','2023-11-26 00:33:23'),(80,'EduCraft Learning Hub','Educational crafting materials and workshops','Crafting supplies, educational workshops','http://www.educraftlearning.com','Ella EduCraft','ella@educraftlearning.com','(555) 777-8888','2023-11-24 17:21:16','2023-11-26 00:33:23'),(81,'FusionFlavors Culinary School','International culinary school','Chef training programs, culinary workshops','http://www.fusionflavors.com','Chef FusionFlavor','chef@fusionflavors.com','(555) 999-0000','2023-11-24 17:21:16','2023-11-26 00:33:23'),(82,'GreenGenius Environmental Solutions','Environmental consulting and solutions','Environmental assessments, green technology','http://www.greengenius.com','Grace GreenGenius','grace@greengenius.com','(555) 121-2121','2023-11-24 17:21:16','2023-11-26 00:33:23'),(83,'AeroTech Innovations','Aerospace technology development','Aircraft design, aerospace engineering','http://www.aerotechinnovations.com','Alan AeroTech','alan@aerotechinnovations.com','(555) 343-4343','2023-11-24 17:21:16','2023-11-26 00:33:23'),(84,'Artistry in Motion Dance Studio','Dance education and performances','Dance classes, performance spaces','http://www.artistryinmotion.com','Diana DanceMaster','diana@artistryinmotion.com','(555) 565-6565','2023-11-24 17:21:16','2023-11-26 00:33:23'),(85,'TechTrend Solutions','IT consulting and software solutions','IT consulting, software development','http://www.techtrend.com','Tom TechTrend','tom@techtrend.com','(555) 787-8787','2023-11-24 17:21:16','2023-11-26 00:33:23'),(86,'Botanical Bliss Nursery','Botanical garden and plant nursery','Rare plants, gardening classes','http://www.botanicalbliss.com','Bella Botanist','bella@botanicalbliss.com','(555) 909-0909','2023-11-24 17:21:16','2023-11-26 00:33:23'),(87,'Palm Harbor University High School','High school in Palm Harbor florida','Teaching','https://www.pcsb.org/phuhs','Teresa Patterson','pattersont@pcsb.org','(727) 669-1131','2023-11-26 04:40:32','2023-11-26 04:40:32');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `color` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'Technology','008fc7'),(2,'Arts ','c7001b'),(3,'Science','00c750'),(4,'Health and Wellness','e00000'),(5,'Education','007d0c'),(7,'Entertainment','9000c9'),(8,'Hospitality','dbc900'),(9,'Energy','00e007'),(10,'Home and Garden','a6d400'),(11,'Construction','d47800'),(12,'Non-Profit','dbc414'),(13,'Retail','946000'),(14,'Marketing','bf00a3'),(15,'Media','0079bf'),(17,'Recreation','ffea00'),(18,'Gaming','00ad09'),(20,'Fashion','c20095'),(21,'Transportation','00c4eb'),(22,'Agriculture','00962b');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-12 17:31:09
