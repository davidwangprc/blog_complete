const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedUnits() {
  try {
    console.log('开始创建单位数据...');

    const units = [
      // 重量单位
      { name: '克' },
      { name: '千克'},
      { name: '两' },
      
      // 体积单位
      { name: '毫升'},
      { name: '升'},
      { name: '汤匙'},
      { name: '茶匙' },
      
      // 数量单位
      { name: '个'},
      { name: '只'},
      { name: '片'},
      { name: '根'},
      { name: '把' },
      
      // 其他单位
      { name: '适量'},
      { name: '少许'}
    ];

    for (const unit of units) {
      await prisma.unit.upsert({
        where: { name: unit.name },
        update: {
          name: unit.name
        },
        create: {
          id: `unit_${unit.name}`,
          name: unit.name,
        }
      });
    }
    
    console.log('单位数据创建完成！');
  } catch (error) {
    console.error('创建单位数据失败:', error);
    throw error;
  }
}

module.exports = seedUnits; 