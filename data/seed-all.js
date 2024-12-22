const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 导入所有种子函数（除了基础数据）
const seedUnits = require('./seed-units');
const seedTags = require('./seed-tags');
const seedBookmarks = require('./seed-bookmarks');
const seedPosts = require('./seed-posts');
const seedRecipes = require('./seed-recipes');

async function main() {
  try {
    console.log('开始执行数据填充...');

    // 验证管理员用户是否存在
    const admin = await prisma.user.findFirst({
      where: { isAdmin: true }
    });
    
    if (!admin) {
      throw new Error('未找到管理员用户，请先运行 npm run seed:basic 创建基础数据');
    }
    
    console.log('检测到管理员用户:', admin.username);

    // 1. 创建单位数据
    try {
      console.log('\n--- 创建单位数据 ---');
      await seedUnits();
    } catch (error) {
      console.error('创建单位数据失败:', error);
    }

    // 2. 创建标签数据
    try {
      console.log('\n--- 创建标签分类 ---');
      await seedTags();
    } catch (error) {
      console.error('创建标签数据失败:', error);
    }

    // 3. 创建书签数据
    try {
      console.log('\n--- 创建���签数据 ---');
      await seedBookmarks();
    } catch (error) {
      console.error('创建书签数据失败:', error);
    }

    // 4. 创建文章数据
    try {
      console.log('\n--- 创建文章数据 ---');
      await seedPosts();
    } catch (error) {
      console.error('创建文章数据失败:', error);
    }

    // 5. 创建食谱数据
    try {
      console.log('\n--- 创建食谱数据 ---');
      await seedRecipes();
    } catch (error) {
      console.error('创建食谱数据失败:', error);
    }

    console.log('\n所有数据填充完成！');

  } catch (error) {
    console.error('数据填充过程中出错:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 