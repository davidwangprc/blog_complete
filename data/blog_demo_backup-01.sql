-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: blog_demo
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `_bookmarktotag`
--

DROP TABLE IF EXISTS `_bookmarktotag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_bookmarktotag` (
  `A` int NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_BookmarkToTag_AB_unique` (`A`,`B`),
  KEY `_BookmarkToTag_B_index` (`B`),
  CONSTRAINT `_BookmarkToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `bookmark` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_BookmarkToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_bookmarktotag`
--

LOCK TABLES `_bookmarktotag` WRITE;
/*!40000 ALTER TABLE `_bookmarktotag` DISABLE KEYS */;
/*!40000 ALTER TABLE `_bookmarktotag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_posttotag`
--

DROP TABLE IF EXISTS `_posttotag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_posttotag` (
  `A` int NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_PostToTag_AB_unique` (`A`,`B`),
  KEY `_PostToTag_B_index` (`B`),
  CONSTRAINT `_PostToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_PostToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_posttotag`
--

LOCK TABLES `_posttotag` WRITE;
/*!40000 ALTER TABLE `_posttotag` DISABLE KEYS */;
/*!40000 ALTER TABLE `_posttotag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('904bf1a6-6d02-4457-b411-db4b325880fb','5ad5377699e5db4ebac43dd517ae8a9443ef2b4716581a76ddcb215f73ab3f56','2024-12-07 10:59:47.664','20241207103407_init',NULL,NULL,'2024-12-07 10:59:46.457',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_recipetotag`
--

DROP TABLE IF EXISTS `_recipetotag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_recipetotag` (
  `A` int NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_RecipeToTag_AB_unique` (`A`,`B`),
  KEY `_RecipeToTag_B_index` (`B`),
  CONSTRAINT `_RecipeToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_RecipeToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_recipetotag`
--

LOCK TABLES `_recipetotag` WRITE;
/*!40000 ALTER TABLE `_recipetotag` DISABLE KEYS */;
/*!40000 ALTER TABLE `_recipetotag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `screenshot` longtext COLLATE utf8mb4_unicode_ci,
  `categoryId` int NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Bookmark_title_url_key` (`title`,`url`),
  KEY `Bookmark_categoryId_idx` (`categoryId`),
  CONSTRAINT `Bookmark_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `bookmarkcategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
INSERT INTO `bookmark` VALUES (1,'Next.js 文档','https://nextjs.org/docs','Next.js 框架的官方文档，包含完整的 API 参考和教程。','https://nextjs.org/favicon.ico',NULL,1,1,'2024-12-07 11:00:52.729','2024-12-07 11:04:09.783'),(2,'React 文档','https://react.dev','React 库的官方文档，包含组件、Hooks 等核心概念。','https://react.dev/favicon.ico',NULL,1,1,'2024-12-07 11:00:52.745','2024-12-07 11:04:09.797'),(3,'VS Code','https://code.visualstudio.com','强大的代码编辑器，支持多种编程语言和扩展。','https://code.visualstudio.com/favicon.ico',NULL,2,1,'2024-12-07 11:00:52.763','2024-12-07 11:04:09.809'),(4,'ChatGPT','https://chat.openai.com','OpenAI 开发的智能对话系统。','https://chat.openai.com/favicon.ico',NULL,3,1,'2024-12-07 11:00:52.775','2024-12-07 11:04:09.822'),(5,'ComfyUI','https://github.com/comfyanonymous/ComfyUI','强大的 Stable Diffusion 图形化工作流工具。','https://github.com/favicon.ico',NULL,3,1,'2024-12-07 11:00:52.786','2024-12-07 11:04:09.834');
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmarkcategory`
--

DROP TABLE IF EXISTS `bookmarkcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmarkcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BookmarkCategory_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarkcategory`
--

LOCK TABLES `bookmarkcategory` WRITE;
/*!40000 ALTER TABLE `bookmarkcategory` DISABLE KEYS */;
INSERT INTO `bookmarkcategory` VALUES (1,'开发文档','dev-docs','开发相关的官方文档','#57c4ff31','📚','2024-12-07 11:00:52.676','2024-12-07 11:00:52.676'),(2,'工具资源','tools','实用的开发工具','#7fb88133','🛠️','2024-12-07 11:00:52.688','2024-12-07 11:00:52.688'),(3,'AI 资源','ai-resources','AI 相关的工具和资源','#da85c731','🤖','2024-12-07 11:00:52.715','2024-12-07 11:00:52.715');
/*!40000 ALTER TABLE `bookmarkcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'comfyui','ComfyUI','AI 绘画和工作流','#57c4ff31',NULL,'2024-12-07 10:59:48.545','2024-12-07 10:59:48.545'),(2,'dairy','Dairy','日记和随笔','#da85c731',NULL,'2024-12-07 10:59:48.550','2024-12-07 10:59:48.550'),(3,'travel','Travel','旅行见闻','#7fb88133',NULL,'2024-12-07 10:59:48.554','2024-12-07 10:59:48.554'),(4,'food','Food','美食探索','#ff795736',NULL,'2024-12-07 10:59:48.558','2024-12-07 10:59:48.558'),(5,'research','Research','研究和探索','#ffb04f45',NULL,'2024-12-07 10:59:48.561','2024-12-07 10:59:48.561'),(6,'coding','Coding','编程技术','#5e4fff31',NULL,'2024-12-07 10:59:48.566','2024-12-07 10:59:48.566');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unitId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Ingredient_recipeId_idx` (`recipeId`),
  KEY `Ingredient_unitId_idx` (`unitId`),
  CONSTRAINT `Ingredient_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Ingredient_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (2,'番茄',2,NULL,'unit_个',1),(3,'鸡蛋',3,NULL,'unit_个',1),(4,'葱花',1,NULL,'unit_汤匙',1),(5,'盐',1,NULL,'unit_茶匙',1),(6,'排骨',500,NULL,'unit_克',2),(7,'姜片',3,NULL,'unit_片',2),(8,'料酒',2,NULL,'unit_汤匙',2),(9,'生抽',1,NULL,'unit_汤匙',2),(10,'老抽',1,NULL,'unit_茶匙',2);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutrition`
--

DROP TABLE IF EXISTS `nutrition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutrition` (
  `id` int NOT NULL AUTO_INCREMENT,
  `calories` double DEFAULT NULL,
  `protein` double DEFAULT NULL,
  `carbs` double DEFAULT NULL,
  `fat` double DEFAULT NULL,
  `fiber` double DEFAULT NULL,
  `recipeId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Nutrition_recipeId_key` (`recipeId`),
  CONSTRAINT `Nutrition_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutrition`
--

LOCK TABLES `nutrition` WRITE;
/*!40000 ALTER TABLE `nutrition` DISABLE KEYS */;
INSERT INTO `nutrition` VALUES (1,180,8.5,12,6.5,2,1),(2,450,28,3,22,0,2);
/*!40000 ALTER TABLE `nutrition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `authorId` int NOT NULL,
  `categoryId` int NOT NULL,
  `isRecipe` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Post_slug_key` (`slug`),
  KEY `Post_authorId_fkey` (`authorId`),
  KEY `Post_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'[数据库示例] ComfyUI工作流入门指南','comfyui','\n# ComfyUI工作流入门指南\n\nComfyUI 是一个功能强大的 Stable Diffusion 图形化工作流工具。本文将介绍基础工作流的创建方法。\n\n## 基本概念\n\n1. 工作流节点\n2. 连接和数据流\n3. 参数设置\n\n## 常用节点\n\n- KSampler\n- VAE Decoder\n- CLIP Text Encode\n- Load Checkpoint\n\n## 示例工作流\n\n这是一个基础的文生图工作流示例...','ComfyUI 基础工作流搭建教程，适合新手入门学习',NULL,96,1,1,'2024-12-07 11:00:52.231','2024-12-07 11:00:52.231',1,1,0),(2,'[数据库示例] 旅行计划模板','','\n# 旅行计划完全指南\n\n如何制定一个完美的旅行计划？本文提供实用的模板和建议。\n\n## 计划要素\n\n1. 目的地研究\n2. 行程安排\n3. 预算控制\n\n## 必备清单\n\n- 证件\n- 必需品\n- 应急物品\n\n## 实用建议\n\n如何做好旅行准备工作...','完整的旅行计划制定指南和注意事项',NULL,41,0,1,'2024-12-07 11:00:52.263','2024-12-07 11:00:52.263',1,3,0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `steps` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cookingTime` int DEFAULT NULL,
  `servings` int DEFAULT NULL,
  `difficulty` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `authorId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Recipe_slug_key` (`slug`),
  KEY `Recipe_authorId_fkey` (`authorId`),
  KEY `Recipe_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Recipe_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Recipe_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES (1,'番茄炒蛋','简单美味的家常菜','tomato-fried-eggs','\n1. 将鸡蛋打散，加入适量盐调味\n2. 番茄切块\n3. 热油锅，倒入蛋液炒至金黄\n4. 盛出备用\n5. 同一锅中爆香葱花\n6. 加入番茄翻炒出汤\n7. 放入炒好的蛋\n8. 调味即可出锅',15,2,'EASY',NULL,'2024-12-07 11:00:52.802','2024-12-07 11:00:52.802',1,4),(2,'红烧排骨','经典美味的红烧菜','braised-pork-ribs','\n1. 排骨切段，冷水下锅焯烫去血水\n2. 热油锅，放入姜片爆香\n3. 加入排骨翻炒上色\n4. 加入料酒、生抽、老抽\n5. 加入适量清水\n6. 大火烧开后转小火炖煮40分钟\n7. 调入盐味\n8. 大火收汁即可',45,4,'MEDIUM',NULL,'2024-12-07 11:04:09.945','2024-12-07 11:04:09.945',1,4);
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` int NOT NULL,
  `parentId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Tag_name_key` (`name`),
  UNIQUE KEY `Tag_slug_key` (`slug`),
  KEY `Tag_categoryId_idx` (`categoryId`),
  KEY `Tag_parentId_idx` (`parentId`),
  CONSTRAINT `Tag_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `tagcategory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Tag_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `tag` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES ('cm4e2dg1o00017t7gy3lgd5c9','JavaScript','javascript',1,NULL,'2024-12-07 11:00:52.476','2024-12-07 11:04:09.564'),('cm4e2dg2000037t7gr2lrz6fs','ES6+','es6-plus',1,'cm4e2dg1o00017t7gy3lgd5c9','2024-12-07 11:00:52.488','2024-12-07 11:04:09.577'),('cm4e2dg2j00057t7gtszdtrio','TypeScript','typescript',1,'cm4e2dg1o00017t7gy3lgd5c9','2024-12-07 11:00:52.508','2024-12-07 11:04:09.591'),('cm4e2dg2v00077t7g2vzfxkg0','Node.js','nodejs',1,'cm4e2dg1o00017t7gy3lgd5c9','2024-12-07 11:00:52.520','2024-12-07 11:04:09.602'),('cm4e2dg3700097t7ggydf2y85','Python','python',1,NULL,'2024-12-07 11:00:52.532','2024-12-07 11:04:09.615'),('cm4e2dg3l000b7t7g2h91zxb8','Django','django',1,'cm4e2dg3700097t7ggydf2y85','2024-12-07 11:00:52.546','2024-12-07 11:04:09.627'),('cm4e2dg3x000d7t7gw8xk7p13','Flask','flask',1,'cm4e2dg3700097t7ggydf2y85','2024-12-07 11:00:52.557','2024-12-07 11:04:09.639'),('cm4e2dg48000f7t7gr2n48is9','FastAPI','fastapi',1,'cm4e2dg3700097t7ggydf2y85','2024-12-07 11:00:52.568','2024-12-07 11:04:09.650'),('cm4e2dg4k000h7t7grx61igow','React','react',2,NULL,'2024-12-07 11:00:52.580','2024-12-07 11:04:09.665'),('cm4e2dg4v000j7t7ge8kh225w','Next.js','nextjs',2,'cm4e2dg4k000h7t7grx61igow','2024-12-07 11:00:52.591','2024-12-07 11:04:09.679'),('cm4e2dg58000l7t7gdhufd9j0','React Hooks','react-hooks',2,'cm4e2dg4k000h7t7grx61igow','2024-12-07 11:00:52.605','2024-12-07 11:04:09.695'),('cm4e2dg5k000n7t7g77ze6dgh','React Native','react-native',2,'cm4e2dg4k000h7t7grx61igow','2024-12-07 11:00:52.616','2024-12-07 11:04:09.707'),('cm4e2dg5t000p7t7guyfarcte','设计模式','design-patterns',3,NULL,'2024-12-07 11:00:52.625','2024-12-07 11:04:09.718'),('cm4e2dg64000r7t7gbp3gu7u3','SOLID','solid',3,'cm4e2dg5t000p7t7guyfarcte','2024-12-07 11:00:52.637','2024-12-07 11:04:09.730'),('cm4e2dg6f000t7t7gio4zokpc','DRY','dry',3,'cm4e2dg5t000p7t7guyfarcte','2024-12-07 11:00:52.648','2024-12-07 11:04:09.742'),('cm4e2dg6t000v7t7gh6kpgju8','KISS','kiss',3,'cm4e2dg5t000p7t7guyfarcte','2024-12-07 11:00:52.661','2024-12-07 11:04:09.757');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tagcategory`
--

DROP TABLE IF EXISTS `tagcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tagcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TagCategory_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tagcategory`
--

LOCK TABLES `tagcategory` WRITE;
/*!40000 ALTER TABLE `tagcategory` DISABLE KEYS */;
INSERT INTO `tagcategory` VALUES (1,'编程语言','programming-languages','各种编程语言相关','2024-12-07 11:00:52.434','2024-12-07 11:00:52.434'),(2,'框架工具','frameworks-tools','开发框架和工具','2024-12-07 11:00:52.445','2024-12-07 11:00:52.445'),(3,'最佳实践','best-practices','编程最佳实践和设计模式','2024-12-07 11:00:52.458','2024-12-07 11:00:52.458');
/*!40000 ALTER TABLE `tagcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Unit_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES ('unit_两','两'),('unit_个','个'),('unit_克','克'),('unit_千克','千克'),('unit_升','升'),('unit_只','只'),('unit_少许','少许'),('unit_把','把'),('unit_根','根'),('unit_毫升','毫升'),('unit_汤匙','汤匙'),('unit_片','片'),('unit_茶匙','茶匙'),('unit_适量','适量');
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'davidwang','$2a$10$z0mw5mSeBDTgTGoHFZ.qDePu5MPiJ18wi1e5nOTSC.snxl00fBfMm','davidwang@example.com','David Wang',NULL,'2024-12-07 10:59:48.539','2024-12-07 10:59:48.539',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viewhistory`
--

DROP TABLE IF EXISTS `viewhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userAgent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `viewedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ViewHistory_postId_viewedAt_idx` (`postId`,`viewedAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewhistory`
--

LOCK TABLES `viewhistory` WRITE;
/*!40000 ALTER TABLE `viewhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `viewhistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-07 19:07:41
