const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seedBasicData() {
  try {
    console.log('开始创建基础数据...');

    // 创建管理员用户
    console.log('正在创建管理员用户...');
    const hashedPassword = await bcrypt.hash('root', 10);
    const admin = await prisma.user.upsert({
      where: { username: 'davidwang' },
      update: {},
      create: {
        username: 'davidwang',
        password: hashedPassword,
        email: 'davidwang@example.com',
        name: 'David Wang',
        isAdmin: true,
      }
    });
    console.log('管理员用户创建成功:', admin.username);

    // 创建基本分类
    console.log('\n正在创建基础分类...');
    const categories = [
      { title: 'ComfyUI', slug: 'comfyui', color: '#57c4ff31', description: 'AI 绘画和工作流' },
      { title: 'Dairy', slug: 'dairy', color: '#da85c731', description: '日记和随笔' },
      { title: 'Travel', slug: 'travel', color: '#7fb88133', description: '旅行见闻' },
      { title: 'Food', slug: 'food', color: '#ff795736', description: '美食探索' },
      { title: 'Research', slug: 'research', color: '#ffb04f45', description: '研究和探索' },
      { title: 'Coding', slug: 'coding', color: '#5e4fff31', description: '编程技术' }
    ];

    for (const category of categories) {
      const result = await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
      console.log(`分类创建成功: ${result.title}`);
    }
    console.log('所有基础分类创建完成');

    console.log('\n基础数据创建完成！');
    
    // 验证数据
    const adminCheck = await prisma.user.findFirst({ where: { isAdmin: true } });
    const categoriesCheck = await prisma.category.findMany();
    
    console.log('\n数据验证结果:');
    console.log(`- 管理员用户: ${adminCheck ? '已创建' : '未创建'}`);
    console.log(`- 基础分类数量: ${categoriesCheck.length}`);
    
  } catch (error) {
    console.error('创建基础数据失败:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = seedBasicData;

// 如果直接运行此文件，则执行种子函数
if (require.main === module) {
  seedBasicData()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}