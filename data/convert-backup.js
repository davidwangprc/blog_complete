const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function exportToJson(data, fileName) {
  const filePath = path.join(__dirname, 'exports', `${fileName}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`JSON文件已保存: ${filePath}`);
}

async function exportToCsv(data, fileName) {
  if (!data || data.length === 0) return;
  
  // 获取对象的所有键作为CSV的表头
  const headers = Object.keys(data[0]);
  
  // 创建CSV内容
  const csvContent = [
    headers.join(','), // 表头行
    ...data.map(item => 
      headers.map(header => {
        const value = item[header];
        // 处理特殊字符和换行符
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value === null ? '' : value;
      }).join(',')
    )
  ].join('\n');

  const filePath = path.join(__dirname, 'exports', `${fileName}.csv`);
  await fs.writeFile(filePath, '\ufeff' + csvContent, 'utf8'); // 添加 BOM 以支持中文
  console.log(`CSV文件已保存: ${filePath}`);
}

async function importSqlFile(connection, sqlFile) {
  console.log(`正在导入SQL文件: ${sqlFile}`);
  const sql = await fs.readFile(sqlFile, 'utf8');
  
  // 分割SQL语句
  const statements = sql
    .split(/;\s*$/m)
    .filter(stmt => stmt.trim());
  
  // 执行每个语句
  for (const statement of statements) {
    if (statement.trim()) {
      await connection.query(statement);
    }
  }
}

async function main() {
  let connection;
  try {
    // 创建临时数据库连接
    connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'davidwang',
      multipleStatements: true
    });

    // 创建临时数据库
    const tempDbName = 'temp_export_db';
    await connection.query(`DROP DATABASE IF EXISTS ${tempDbName}`);
    await connection.query(`CREATE DATABASE ${tempDbName}`);
    await connection.query(`USE ${tempDbName}`);

    // 导入SQL备份文件
    // 修改为本地备份文件
    const sqlFile = path.join(__dirname, 'blog_demo_backup-01.sql');
    await importSqlFile(connection, sqlFile);

    // 创建导出目录
    const exportDir = path.join(__dirname, 'exports');
    try {
      await fs.mkdir(exportDir);
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }

    console.log('开始导出数据...');

    // 导出用户数据
    const [users] = await connection.query('SELECT * FROM User');
    await exportToJson(users, 'users');
    await exportToCsv(users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
    })), 'users');

    // 导出分类数据
    const [categories] = await connection.query('SELECT * FROM Category');
    await exportToJson(categories, 'categories');
    await exportToCsv(categories.map(cat => ({
      id: cat.id,
      slug: cat.slug,
      title: cat.title,
      description: cat.description
    })), 'categories');

    // // 导出标签数据
    // const [tags] = await connection.query(`
    //   SELECT t.*, tc.name as categoryName,
    //   (SELECT COUNT(*) FROM _PostToTag WHERE B = t.id) as postsCount,
    //   (SELECT COUNT(*) FROM _RecipeToTag WHERE B = t.id) as recipesCount,
    //   (SELECT COUNT(*) FROM _BookmarkToTag WHERE B = t.id) as bookmarksCount
    //   FROM Tag t
    // //   LEFT JOIN TagCategory tc ON t.categoryId = tc.id
    // `);
    // await exportToJson(tags, 'tags');
    // await exportToCsv(tags, 'tags');

    // 导出文章数据
    const [posts] = await connection.query(`
      SELECT p.*, u.name as authorName, c.title as categoryTitle,
      GROUP_CONCAT(t.name) as tagNames
      FROM Post p
      LEFT JOIN User u ON p.authorId = u.id
      LEFT JOIN Category c ON p.categoryId = c.id
      LEFT JOIN _PostToTag pt ON p.id = pt.A
      LEFT JOIN Tag t ON pt.B = t.id
      GROUP BY p.id
    `);
    await exportToJson(posts, 'posts');
    await exportToCsv(posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      views: post.views,
      author: post.authorName,
      category: post.categoryTitle,
      tags: post.tagNames,
      createdAt: post.createdAt
    })), 'posts');

    // 导出食谱数据
    const [recipes] = await connection.query(`
      SELECT r.*, u.name as authorName, c.title as categoryTitle,
      GROUP_CONCAT(DISTINCT t.name) as tagNames,
      GROUP_CONCAT(DISTINCT CONCAT(i.amount, i.unit, ' ', i.name)) as ingredients
      FROM Recipe r
      LEFT JOIN User u ON r.authorId = u.id
      LEFT JOIN Category c ON r.categoryId = c.id
      LEFT JOIN _RecipeToTag rt ON r.id = rt.A
      LEFT JOIN Tag t ON rt.B = t.id
      LEFT JOIN Ingredient i ON r.id = i.recipeId
      GROUP BY r.id
    `);
    await exportToJson(recipes, 'recipes');
    await exportToCsv(recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      slug: recipe.slug,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      author: recipe.authorName,
      category: recipe.categoryTitle,
      tags: recipe.tagNames,
      ingredients: recipe.ingredients
    })), 'recipes');

    // 导出书签数据
    const [bookmarks] = await connection.query(`
      SELECT b.*, bc.name as categoryName,
      GROUP_CONCAT(t.name) as tagNames
      FROM Bookmark b
      LEFT JOIN BookmarkCategory bc ON b.categoryId = bc.id
      LEFT JOIN _BookmarkToTag bt ON b.id = bt.A
      LEFT JOIN Tag t ON bt.B = t.id
      GROUP BY b.id
    `);
    await exportToJson(bookmarks, 'bookmarks');
    await exportToCsv(bookmarks.map(bookmark => ({
      id: bookmark.id,
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description,
      category: bookmark.categoryName,
      tags: bookmark.tagNames,
      featured: bookmark.featured,
      createdAt: bookmark.createdAt
    })), 'bookmarks');

    console.log('数据导出完成！');
    console.log('导出目录:', exportDir);

  } catch (error) {
    console.error('导出过程中出错:', error);
  } finally {
    if (connection) {
      // 清理临时数据库
      await connection.query(`DROP DATABASE IF EXISTS temp_export_db`);
      await connection.end();
    }
  }
}

main(); 