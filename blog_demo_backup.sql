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
INSERT INTO `_posttotag` VALUES (2,'cm4e2dg58000l7t7gdhufd9j0'),(2,'cm4e2dg5k000n7t7g77ze6dgh'),(2,'cm4e2dg5t000p7t7guyfarcte'),(2,'cm4e2dg64000r7t7gbp3gu7u3'),(6,'cm4e2dg6f000t7t7gio4zokpc'),(8,'cm4mu6jte00017tc4r1xaej08');
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
INSERT INTO `bookmark` VALUES (1,'Next.js 文档','https://nextjs.org/docs','Next.js 框架的官方文档，包含完整的 API 参考和教程。','\\bookmarks-icon\\nextjs-64.png','/uploads/booksmarks-nextjs.png',1,1,'2024-12-07 11:00:52.729','2024-12-17 07:48:33.112'),(2,'React 文档','https://react.dev','React 库的官方文档，包含组件、Hooks 等核心概念。','https://react.dev/favicon.ico','\\uploads\\booksmarks_React.png',1,1,'2024-12-07 11:00:52.745','2024-12-17 07:55:21.519'),(3,'VS Code','https://code.visualstudio.com','强大的代码编辑器，支持多种编程语言和扩展。','https://code.visualstudio.com/favicon.ico','\\uploads\\booksmarks_vscode.png',2,1,'2024-12-07 11:00:52.763','2024-12-17 07:55:59.039'),(4,'ChatGPT','https://chat.openai.com','OpenAI 开发的智能对话系统。','\\bookmarks-icon\\chatgpt.png','\\uploads\\booksmarks_chatgpt.png',3,1,'2024-12-07 11:00:52.775','2024-12-17 07:53:27.962'),(5,'ComfyUI','https://github.com/comfyanonymous/ComfyUI','强大的 Stable Diffusion 图形化工作流工具。','\\bookmarks-icon\\comfyui.png','/uploads/booksmarks-comfy.png',3,1,'2024-12-07 11:00:52.786','2024-12-17 07:51:00.629');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (2,'番茄',2,NULL,'unit_个',1),(3,'鸡蛋',3,NULL,'unit_个',1),(4,'葱花',1,NULL,'unit_汤匙',1),(5,'盐',1,NULL,'unit_茶匙',1),(6,'排骨',500,NULL,'unit_克',2),(7,'姜片',3,NULL,'unit_片',2),(8,'料酒',2,NULL,'unit_汤匙',2),(9,'生抽',1,NULL,'unit_汤匙',2),(10,'老抽',1,NULL,'unit_茶匙',2),(13,'猪八戒',1,'汤匙',NULL,5),(14,'牛魔王',1,'适量',NULL,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'[数据库示例] ComfyUI工作流入门指南','123','\n# ComfyUI工作流入门指南\n\nComfyUI 是一个功能强大的 Stable Diffusion 图形化工作流工具。本文将介绍基础工作流的创建方法。\n\n## 基本概念\n\n1. 工作流节点\n2. 连接和数据流\n3. 参数设置\n\n## 常用节点\n\n- KSampler\n- VAE Decoder\n- CLIP Text Encode\n- Load Checkpoint\n\n## 示例工作流\n\n这是一个基础的文生图工作流示例...','ComfyUI 基础工作流搭建教程，适合新手入门学习','https://i.imgur.com/A14QwVW.jpeg',96,1,1,'2024-12-07 11:00:52.231','2024-12-13 09:54:07.764',1,1,0),(2,'[数据库示例] 旅行计划模板','124','\n# 旅行计划完全指南\n\n如何制定一个完美的旅行计划？本文提供实用的模板和建议。\n\n## 计划要素\n\n1. 目的地研究\n2. 行程安排\n3. 预算控制\n\n## 必备清单\n\n- 证件\n- 必需品\n- 应急物品\n\n## 实用建议\n\n如何做好旅行准备工作...','完整的旅行计划制定指南和注意事项','uploads/1732877240833-ComfyUI0001.png',41,0,1,'2024-12-07 11:00:52.263','2024-12-13 07:28:05.806',1,3,0),(3,'本地上传表单文件','125','## 图片上传     \n\n},{\"key\":\"3optf\",\"text\":\" `e.target.files[0]`是一个 JavaScript 表达式，通常在处理文件上传时使用。  它的含义如下：   - e：这是事件对象，通常在事件处理函数中作为参数传递。它包含有关事件的信息。   - target：这是事件对象的一个属性，指向触发事件的 DOM 元素。在文件上传的情况下，这通常是一个 <input type=\\\"file\\\"> 元素。   - files：这是 input 元素的一个属性，返回一个 FileList 对象，包含用户选择的所有文件。  这个对象是一个类数组对象，可以通过索引访问其中的文件。   - [0]：这是对 FileList 对象的索引访问，表示获取用户选择的第一个文件。     因此，e.target.files[0] 的意思是获取用户在文件输入框中选择的第一个文件。    ### 文件上传    ```javascript  <input     type=\\\"file\\\"      onChange={handleImageUpload}      accept=\\\"image/*\\\"      style={{ display: \\\"block\\\" }} />  ```   type的不同属性:file,text,password,number,email,date,time,datetime-local,month,week,color,checkbox,radio,file,submit,image,reset,button,hidden,range,search,tel,url   - `type=\\\"file\\\"` 即文件上传的类型，   display的三种状态: \\\"block\\\" \\\"none\\\" \\\"inline\\\"  - `display=\\\"block\\\"` 块状标签显示，  - `display=\\\"none\\\"` 隐藏标签，  - `display=\\\"inline\\\"` 行内标签显示，\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}\n\n','`e.target.files[0]`是一个 JavaScript 表达式，通常在处理文件上传时使用','https://i.imgur.com/0dqdq3m.jpeg',1,0,1,'2024-12-13 10:01:04.412','2024-12-13 11:40:31.438',1,6,0),(4,'构建命令说明','1734093579601-gòujiàn-9fb2','# 构建命令说明\n\n## 环境配置\n- 开发环境使用 `.env.local`\n- 生产环境使用 `.env.production`\n\n## Windows\n```bash\nrd /s /q .next 2>nul && cross-env NODE_ENV=production NEXT_SKIP_ENV_VALIDATION=true next build\n```\n\n## Linux/Mac/Docker\n```bash\nrm -rf .next && cross-env NODE_ENV=production NEXT_SKIP_ENV_VALIDATION=true next build\n```\n\n## 构建流程\n1. 清理旧的构建文件\n2. 设置生产环境变量\n3. 跳过环境变量验证\n4. 执行构建\n\n## 环境变量说明\n- NODE_ENV: 环境标识（development/production）\n- MYSQL_URL: 数据库连接字符串\n- PORT: 服务端口','构建命令说明构建命令说明构建命令说明构建命令说明构建命令说明构建命令说明','https://i.imgur.com/nhX3VEW.jpeg',0,0,1,'2024-12-13 12:39:39.609','2024-12-13 12:39:39.609',1,6,0),(5,'控制台日志记录','1734094315754-kòngzhì-9704','# 🐛 控制台日志记录\n\n## 💬 会话管理相关日志 (src/lib/session.js)\n\n### 📋 getSession 函数\n```javascript\n// 开始获取会话\nconsole.log(\'=== 获取会话信息 ===\')\n\n// 显示会话令牌\nconsole.log(\'会话令牌:\', sessionToken?.value)\n\n// 未找到会话令牌时\nconsole.log(\'未找到会话令牌\')\n\n// 会话解析错误\nconsole.error(\'会话数据解析失败:\', error)\n\n// 会话有效时\nconsole.log(\'会话有效\')\n```\n\n**💬 作用说明：**\n- 追踪会话获取的整个流程\n- 显示会话令牌的值，便于调试\n- 记录会话验证的状态（未找到/解析失败/有效）\n- 在会话解析失败时提供错误信息\n\n### 📋 createSession 函数\n```javascript\n// 开始创建会话\nconsole.log(\'=== 创建新会话 ===\')\n\n// 显示用户数据\nconsole.log(\'用户数据:\', userData)\n\n// 会话创建完成\nconsole.log(\'会话cookie已设置\')\n```','会话管理相关日志','https://i.imgur.com/az0tvpF.png',0,0,1,'2024-12-13 12:51:55.762','2024-12-13 12:51:55.762',1,6,0),(6,'浏览器控制台错误处理','1734094954059-liúlǎn-bc31','**💬 作用说明：**\n- 标记会话创建的开始\n- 记录传入的用户数据，用于验证\n- 确认会话 cookie 已成功设置\n\n## ⚠️ 浏览器控制台错误处理\n\n## 📋 使用建议\n- 开发环境中保留这些日志以便调试\n- 生产环境建议关闭详细的会话令牌和用户数据日志\n- 保留错误相关的日志用于问题排查\n','浏览器控制台错误处理浏览器控制台错误处理浏览器控制台错误处理浏览器控制台错误处理浏览器控制台错误处理浏览器控制台错误处理浏览器控制台错误处理浏览器控制台错误处理浏览器控制台错误处理浏览器控制台错误处理浏览器控制台错误处理','https://i.imgur.com/mOSg8Jl.jpeg',0,0,1,'2024-12-13 13:02:34.066','2024-12-13 13:02:34.066',1,6,0),(7,'分类功能设计文档','1734098108819-fēnlèi-b104','## 8. CategoriesList 组件详解\n\n### 8.1 组件概述\n![555](https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1vJHMy.img?w=768&h=603&m=6&x=238&y=168&s=278&d=278)\n\nCategoriesList 是一个用于显示博客分类的 React 服务器组件。它从数据库获取分类数据并以可点击的链接形式展示。\n\n### 8.2 代码结构详解\n\n```jsx\n// 1. 导入必要的依赖\nimport React from \"react\";              // React 核心库\nimport styles from \"./categoriesList.module.css\";  // CSS 模块样式\nimport Link from \"next/link\";           // Next.js 的链接组件\nimport Image from \"next/image\";         // Next.js 的图片组件\nimport { getCategoryStyles } from \"@/lib/utils\";  // 工具函数\nimport { categoriesApi } from \"@/lib/api\";  // API 调用函数\n\n// 2. 定义异步组件\nconst CategoriesList = async () => {\n    // 3. 获取分类数据\n    const categories = await categoriesApi.getCategories();\n\n    // 4. 返回 JSX\n    return (\n        <div className={styles.container}>\n            <h1 className={styles.title}>Categories</h1>\n            <div className={styles.categories}>\n                {/* 5. 遍历渲染分类列表 */}\n                {categories.map((category) => {\n                    // 6. 获取分类样式\n                    const { colorVar, textColorVar } = getCategoryStyles(category.id);\n\n                    // 7. 返回单个分类项\n                    return (\n                        <Link\n                            key={category.id}\n                            href={`/blog?cat=${category.slug}`}\n                            className={styles.categoryItem}\n                            style={{\n                                backgroundColor: colorVar,\n                                borderColor: textColorVar\n                            }}\n                        >\n                            {/* 8. 条件渲染分类图标 */}\n                            {category.image && (\n                                <Image\n                                    src={`/${category.image}`}\n                                    alt={category.title}\n                                    width={30}\n                                    height={30}\n                                    className={styles.image}\n                                />\n                            )}\n                            {category.title}\n                        </Link>\n                    );\n                })}\n            </div>\n        </div>\n    );\n};\n\nexport default CategoriesList;\n```\n\n### 8.3 关键概念解释\n\n1. **React 服务器组件**\n   - 不需要 \'use client\' 指令\n   - 可以直接使用异步操作\n   - 在服务器端渲染，减少客户端负载\n\n2. **模块导入**\n   ```jsx\n   import React from \"react\";\n   import styles from \"./categoriesList.module.css\";\n   ```\n   - 使用 ES6 模块语法\n   - CSS 模块确保样式隔离\n\n3. **异步数据获取**\n   ```jsx\n   const categories = await categoriesApi.getCategories();\n   ```\n   - 使用 await 等待数据\n   - 直接在组件中进行 API 调用\n\n4. **JSX 语法**\n   ```jsx\n   <div className={styles.container}>\n     <h1 className={styles.title}>Categories</h1>\n   ```\n   - 使用花括号插入 JavaScript 表达式\n   - className 而不是 class\n   - 自闭合标签必须以 /> 结束\n\n5. **数组映射**\n   ```jsx\n   {categories.map((category) => {\n     return (\n       <Link key={category.id}>...</Link>\n     );\n   })}\n   ```\n   - 使用 map 方法遍历数组\n   - 每个元素必须有唯一的 key 属性\n\n6. **条件渲染**\n   ```jsx\n   {category.image && (\n     <Image ... />\n   )}\n   ```\n   - 使用逻辑与运算符进行条件渲染\n   - 只有当 category.image 存在时才渲染图片\n\n7. **样式处理**\n   ```jsx\n   style={{\n     backgroundColor: colorVar,\n     borderColor: textColorVar\n   }}\n   ```\n   - 内联样式使用双花括号\n   - 驼峰命名 CSS 属性\n\n8. **Next.js 组件**\n   ```jsx\n   <Link href={`/blog?cat=${category.slug}`}>\n   <Image src={`/${category.image}`} />\n   ```\n   - Link: 客户端导航组件\n   - Image: 优化的图片组件\n\n### 8.4 最佳实践\n\n1. **性能优化**\n   - 使用服务器组件减少客户端 JavaScript\n   - 图片组件自动优化\n   - 唯一的 key 提高列表渲染效率\n\n2. **代码组织**\n   - 逻辑和视图分离\n   - 模块化的样式文件\n   - 清晰的组件结构\n\n3. **错误处理**\n   - 条件渲染防止空值错误\n   - API 调用可能需要 try-catch\n\n4. **可访问性**\n   - 语义化的 HTML 结构\n   - 图片包含 alt 文本\n   - 颜色对比度考虑\n\n### 8.5 常见问题\n\n1. **为什么使用服务器组件？**\n   - 减少客户端 JavaScript 体积\n   - 直接在服务器端获取数据\n   - 更好的首次加载性能\n\n2. **CSS Module 的优势？**\n   - 样式隔离，避免冲突\n   - 更好的代码组织\n   - 支持组件级样式\n\n3. **key 属性的重要性？**\n   - 帮助 React 识别列表项\n   - 优化重新渲染\n   - 避免 key 重复警告','cardlist 组件的设计','https://i.imgur.com/nHP1GMk.jpeg',0,0,1,'2024-12-13 13:55:08.827','2024-12-13 14:11:07.800',1,6,0),(8,'PicGo','1734099721466-picgo','<div align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/Molunerfinn/test/master/picgo/New%20LOGO-150.png\" alt=\"\">\n  <h1>PicGo</h1>\n  <blockquote>图片上传+管理新体验 </blockquote>\n  <a href=\"https://github.com/Molunerfinn/PicGo/actions\">\n    <img src=\"https://img.shields.io/badge/code%20style-standard-green.svg?style=flat-square\" alt=\"\">\n  </a>\n  <a href=\"https://github.com/Molunerfinn/PicGo/actions\">\n    <img src=\"https://github.com/Molunerfinn/PicGo/actions/workflows/main.yml/badge.svg\" alt=\"\">\n  </a>\n  <a href=\"https://github.com/Molunerfinn/PicGo/releases\">\n    <img src=\"https://img.shields.io/github/downloads/Molunerfinn/PicGo/total.svg?style=flat-square\" alt=\"\">\n  </a>\n  <a href=\"https://github.com/Molunerfinn/PicGo/releases/latest\">\n    <img src=\"https://img.shields.io/github/release/Molunerfinn/PicGo.svg?style=flat-square\" alt=\"\">\n  </a>\n  <a href=\"https://github.com/PicGo/bump-version\">\n    <img src=\"https://img.shields.io/badge/picgo-convention-blue.svg?style=flat-square\" alt=\"\">\n  </a>\n</div>\n\n## 应用概述\n\n**PicGo: 一个用于快速上传图片并获取图片 URL 链接的工具**\n\nPicGo 本体支持如下图床：\n\n- `七牛图床` v1.0\n- `腾讯云 COS v4\\v5 版本` v1.1 & v1.5.0\n- `又拍云` v1.2.0\n- `GitHub` v1.5.0\n- `SM.MS V2` v2.3.0-beta.0\n- `阿里云 OSS` v1.6.0\n- `Imgur` v1.6.0\n\n**本体不再增加默认的图床支持。你可以自行开发第三方图床插件。详见 [PicGo-Core](https://picgo.github.io/PicGo-Core-Doc/)**。\n\n## 特色功能\n\n- 支持拖拽图片上传\n- 支持快捷键上传剪贴板里第一张图片\n- Windows 和 macOS 支持右键图片文件通过菜单上传 (v2.1.0+)\n- 上传图片后自动复制链接到剪贴板\n- 支持自定义复制到剪贴板的链接格式\n- 支持修改快捷键，默认快速上传快捷键：`command+shift+p`（macOS）| `control+shift+p`（Windows\\Linux)\n- 支持插件系统，已有插件支持 Gitee、青云等第三方图床\n  - 更多第三方插件以及使用了 PicGo 底层的应用可以在 [Awesome-PicGo](https://github.com/PicGo/Awesome-PicGo) 找到。欢迎贡献！\n- 支持通过发送 HTTP 请求调用 PicGo 上传（v2.2.0+)\n- 更多功能等你自己去发现，同时也会不断开发新功能\n  - 开发进度可以查看 [Projects](https://github.com/Molunerfinn/PicGo/projects)，会同步更新开发进度\n  <!-- - 欢迎加入 [官方讨论区](https://github.com/Molunerfinn/PicGo/discussions) 与我交流 -->\n\n**如果第一次使用，请参考应用 [使用文档](https://picgo.github.io/PicGo-Doc/zh/guide/getting-started.html)。遇到问题了还可以看看 [FAQ](https://github.com/Molunerfinn/PicGo/blob/dev/FAQ.md) 以及被关闭的 [issues](https://github.com/Molunerfinn/PicGo/issues?q=is%3Aissue+is%3Aclosed)。**\n\n## 下载安装\n\n| 下载源  | 地址/安装方式  | 平台 | 备注  |\n|---|---|---|---|\n| GitHub Release  | https://github.com/Molunerfinn/PicGo/releases | All | 国内下载速度可能会慢 |\n| [腾讯云COS](https://cloud.tencent.com/product/cos)  | https://github.com/Molunerfinn/PicGo/releases 附在更新日志结尾 | All | 感谢 [腾讯云COS](https://cloud.tencent.com/product/cos) 提供的赞助支持 |\n| [山东大学镜像站](https://mirrors.sdu.edu.cn/) | https://mirrors.sdu.edu.cn/github-release/Molunerfinn_PicGo | All | 感谢 [山东大学镜像站](https://mirrors.sdu.edu.cn/) 提供的镜像支持 |\n| [Scoop](https://scoop.sh/) | `scoop bucket add extras` & `scoop install picgo` | Windows | 感谢 @huangnauh 和 @Gladtbam 的贡献 |\n| [Chocolatey](https://chocolatey.org/) | `choco install picgo` | Windows | 感谢 @iYato 的贡献 |\n| [Homebrew](https://brew.sh/) | `brew install picgo --cask` | macOS | 感谢 @womeimingzi11 的贡献 |\n| [AUR](https://aur.archlinux.org/packages/yay) | `yay -S picgo-appimage` | Arch-Linux | 感谢 @houbaron 的贡献 |\n\n## 应用截图\n\n![](https://raw.githubusercontent.com/Molunerfinn/test/master/picgo/picgo-2.0.gif)\n\n![picgo-menubar](https://user-images.githubusercontent.com/12621342/34242310-b5056510-e655-11e7-8568-60ffd4f71910.gif)\n\n## 开发说明\n\n> 目前仅针对 Mac、Windows。Linux 平台并未测试。\n\n如果你想要学习、开发、修改或自行构建 PicGo，可以依照下面的指示：\n\n> 如果想学习 Electron-vue 的开发，可以查看我写的系列教程——[Electron-vue 开发实战](https://molunerfinn.com/tags/Electron-vue/)\n\n1. 你需要有 Node、Git 环境，了解 npm 的相关知识。\n2. `git clone https://github.com/Molunerfinn/PicGo.git` 并进入项目。\n3. `yarn` 下载依赖。注意如果你没有 `yarn`，请去 [官网](https://classic.yarnpkg.com/en/docs/install) 下载安装后再使用。 **用 `npm install` 将导致未知错误！**\n4. Mac 需要有 Xcode 环境，Windows 需要有 VS 环境。\n5. 如果需要贡献代码，可以参考[贡献指南](./CONTRIBUTING.md)。\n\n### 开发模式\n\n输入 `npm run electron:serve` 进入开发模式，开发模式具有热重载特性。不过需要注意的是，开发模式不稳定，会有进程崩溃的情况。此时需要：\n\n```bash\nctrl+c # 退出开发模式\nnpm run electron:serve # 重新进入开发模式\n```\n\n**注：Windows 开发模式运行之后会在底部任务栏的右下角应用区出现 PicGo 的应用图标。**\n\n### 生产模式\n\n如果你需要自行构建，可以 `npm run electron:build` 开始进行构建。构建成功后，会在 `dist_electron` 目录里出现构建成功的相应安装文件。\n\n**注意**：如果你的网络环境不太好，可能会出现 `electron-builder` 下载 `electron` 二进制文件失败的情况。这个时候需要在 `npm run electron:build` 之前指定一下 `electron` 的源为国内源：\n\n```bash\nexport ELECTRON_MIRROR=\"https://npmmirror.com/mirrors/electron/\"\n# 在 Windows 上，则可以使用 set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ （无需引号）\nnpm run electron:build\n```\n\n只需第一次构建的时候指定一下国内源即可。后续构建不需要特地指定。二进制文件下载在 `~/.electron/` 目录下。如果想要更新 `electron` 构建版本，可以删除 `~/.electron/` 目录，然后重新运行上一步，让 `electron-builder `去下载最新的 `electron` 二进制文件。\n\n## 其他相关\n\n- [vs-picgo](https://github.com/PicGo/vs-picgo)：PicGo 的 VS Code 版。\n- [flutter-picgo](https://github.com/PicGo/flutter-picgo)：PicGo 的手机版 App（支持 Android 和 iOS ）。\n- [PicHoro](https://github.com/Kuingsmile/PicHoro)：另一款支持 PicGo 配置的手机版 App（暂时只支持 Android）。\n\n\n\n','一个用于快速上传图片并获取图片 URL 链接的工具','uploads/1734100539032-Snipaste2024-12-0105-06-25.png',0,0,1,'2024-12-13 14:22:01.471','2024-12-13 14:35:46.147',1,6,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES (1,'番茄炒蛋','简单美味的家常菜','tomato-fried-eggs','\n1. 将鸡蛋打散，加入适量盐调味\n2. 番茄切块\n3. 热油锅，倒入蛋液炒至金黄\n4. 盛出备用\n5. 同一锅中爆香葱花\n6. 加入番茄翻炒出汤\n7. 放入炒好的蛋\n8. 调味即可出锅',15,2,'EASY','https://i.imgur.com/Jmk1Nva.jpeg','2024-12-07 11:00:52.802','2024-12-13 09:54:44.122',1,4),(2,'红烧排骨','经典美味的红烧菜','braised-pork-ribs','\n1. 排骨切段，冷水下锅焯烫去血水\n2. 热油锅，放入姜片爆香\n3. 加入排骨翻炒上色\n4. 加入料酒、生抽、老抽\n5. 加入适量清水\n6. 大火烧开后转小火炖煮40分钟\n7. 调入盐味\n8. 大火收汁即可',45,4,'MEDIUM','https://i.imgur.com/DtCxaCO.jpeg','2024-12-07 11:04:09.945','2024-12-13 09:54:44.122',1,4),(3,'test','test','1733983256097-test','ts',1,1,'easy','https://i.imgur.com/SB2q4P2.jpeg','2024-12-12 06:00:56.103','2024-12-13 09:54:44.122',1,4),(4,'test1','test1','1734026581664-test1','test',1,1,'easy','https://i.imgur.com/mjPLDAt.jpeg','2024-12-12 18:03:01.670','2024-12-13 09:54:44.122',1,4),(5,'红烧猪八戒','花果山美食','1734034722829-hóngshāo-38bf','下锅\n烧水\n过油炸',1,-1,'easy','uploads/1734034699171-00090-3037124552.png','2024-12-12 20:18:42.837','2024-12-12 20:18:42.837',1,4);
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
INSERT INTO `tag` VALUES ('cm4e2dg4k000h7t7grx61igow','React','react',2,NULL,'2024-12-07 11:00:52.580','2024-12-07 11:04:09.665'),('cm4e2dg4v000j7t7ge8kh225w','Next.js','nextjs',2,'cm4e2dg4k000h7t7grx61igow','2024-12-07 11:00:52.591','2024-12-07 11:04:09.679'),('cm4e2dg58000l7t7gdhufd9j0','React Hooks','react-hooks',2,'cm4e2dg4k000h7t7grx61igow','2024-12-07 11:00:52.605','2024-12-07 11:04:09.695'),('cm4e2dg5k000n7t7g77ze6dgh','React Native','react-native',2,'cm4e2dg4k000h7t7grx61igow','2024-12-07 11:00:52.616','2024-12-07 11:04:09.707'),('cm4e2dg5t000p7t7guyfarcte','设计模式','design-patterns',3,NULL,'2024-12-07 11:00:52.625','2024-12-07 11:04:09.718'),('cm4e2dg64000r7t7gbp3gu7u3','SOLID','solid',3,'cm4e2dg5t000p7t7guyfarcte','2024-12-07 11:00:52.637','2024-12-07 11:04:09.730'),('cm4e2dg6f000t7t7gio4zokpc','DRY','dry',3,'cm4e2dg5t000p7t7guyfarcte','2024-12-07 11:00:52.648','2024-12-07 11:04:09.742'),('cm4e2dg6t000v7t7gh6kpgju8','KISS','kiss',3,'cm4e2dg5t000p7t7guyfarcte','2024-12-07 11:00:52.661','2024-12-07 11:04:09.757'),('cm4mu6jte00017tc4r1xaej08','github','github',1,NULL,'2024-12-13 14:21:29.426','2024-12-13 14:21:29.426');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tagcategory`
--

LOCK TABLES `tagcategory` WRITE;
/*!40000 ALTER TABLE `tagcategory` DISABLE KEYS */;
INSERT INTO `tagcategory` VALUES (1,'编程语言','programming-languages','各种编程语言相关','2024-12-07 11:00:52.434','2024-12-07 11:00:52.434'),(2,'框架工具','frameworks-tools','开发框架和工具','2024-12-07 11:00:52.445','2024-12-07 11:00:52.445'),(3,'最佳实践','best-practices','编程最佳实践和设计模式','2024-12-07 11:00:52.458','2024-12-07 11:00:52.458'),(4,'BOOKMARKS','bookmark-tags','网页分类标签','2024-12-17 07:07:09.798','2024-12-17 07:08:55.333'),(5,'RECIPIES','recipi-tags','食谱分类标签','2024-12-17 07:08:55.333','2024-12-17 07:07:40.301');
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
INSERT INTO `user` VALUES (1,'davidwang','$2a$10$z0mw5mSeBDTgTGoHFZ.qDePu5MPiJ18wi1e5nOTSC.snxl00fBfMm','davidwang@example.com','David Wang','/cover/user_cover01.png','2024-12-07 10:59:48.539','2024-12-13 06:23:49.973',1);
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

-- Dump completed on 2024-12-19 13:54:35
