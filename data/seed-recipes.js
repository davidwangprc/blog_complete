const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedRecipes() {
  try {
    console.log('开始创建食谱数据...');

    // 获取管理员用户
    const admin = await prisma.user.findFirst({
      where: { isAdmin: true }
    });

    if (!admin) {
      throw new Error('管理员用户不存在，请先运行基础数据种子文件');
    }

    // 获取食谱分类
    const foodCategory = await prisma.category.findUnique({
      where: { slug: 'food' }
    });

    if (!foodCategory) {
      throw new Error('食谱分类不存在，请先运行基础数据种子文件');
    }

    // 获取所有单位
    const units = await prisma.unit.findMany();
    const getUnitId = (name) => {
      const unit = units.find(u => u.name === name);
      return unit ? unit.id : null;
    };

    const recipes = [
      {
        title: '番茄炒蛋',
        slug: 'tomato-fried-eggs',
        description: '简单美味的家常菜',
        steps: `
1. 将鸡蛋打散，加入适量盐调味
2. 番茄切块
3. 热油锅，倒入蛋液炒至金黄
4. 盛出备用
5. 同一锅中爆香葱花
6. 加入番茄翻炒出汤
7. 放入炒好的蛋
8. 调味即可出锅`,
        cookingTime: 15,
        difficulty: 'EASY',
        servings: 2,
        ingredients: [
          { name: '番茄', amount: 2, unitName: '个' },
          { name: '鸡蛋', amount: 3, unitName: '个' },
          { name: '葱花', amount: 1, unitName: '汤匙' },
          { name: '盐', amount: 1, unitName: '茶匙' }
        ],
        nutrition: {
          calories: 180,
          protein: 8.5,
          carbs: 12,
          fat: 6.5,
          fiber: 2
        }
      },
      {
        title: '红烧排骨',
        slug: 'braised-pork-ribs',
        description: '经典美味的红烧菜',
        steps: `
1. 排骨切段，冷水下锅焯烫去血水
2. 热油锅，放入姜片爆香
3. 加入排骨翻炒上色
4. 加入料酒、生抽、老抽
5. 加入适量清水
6. 大火烧开后转小火炖煮40分钟
7. 调入盐味
8. 大火收汁即可`,
        cookingTime: 45,
        difficulty: 'MEDIUM',
        servings: 4,
        ingredients: [
          { name: '排骨', amount: 500, unitName: '克' },
          { name: '姜片', amount: 3, unitName: '片' },
          { name: '料酒', amount: 2, unitName: '汤匙' },
          { name: '生抽', amount: 1, unitName: '汤匙' },
          { name: '老抽', amount: 1, unitName: '茶匙' }
        ],
        nutrition: {
          calories: 450,
          protein: 28,
          carbs: 3,
          fat: 22,
          fiber: 0
        }
      }
    ];

    // 创建食谱和相关数据
    for (const recipe of recipes) {
      const { ingredients, nutrition, ...recipeData } = recipe;

      // 创建食谱
      const createdRecipe = await prisma.recipe.upsert({
        where: { slug: recipe.slug },
        update: {},
        create: {
          ...recipeData,
          authorId: admin.id,
          categoryId: foodCategory.id
        }
      });

      // 创建营养信息
      if (nutrition) {
        await prisma.nutrition.upsert({
          where: { recipeId: createdRecipe.id },
          update: nutrition,
          create: {
            ...nutrition,
            recipeId: createdRecipe.id
          }
        });
      }

      // 创建配料
      for (const ingredient of ingredients) {
        const unitId = getUnitId(ingredient.unitName);
        if (!unitId) {
          console.warn(`警告: 未找到单位 "${ingredient.unitName}"，跳过创建配料 "${ingredient.name}"`);
          continue;
        }

        await prisma.ingredient.create({
          data: {
            name: ingredient.name,
            amount: ingredient.amount,
            unitId: unitId,
            recipeId: createdRecipe.id
          }
        });
      }
    }

    console.log('食谱数据创建完成！');
  } catch (error) {
    console.error('创建食谱数据失败:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = seedRecipes;

// 如果直接运行此文件，则执行种子函数
if (require.main === module) {
  seedRecipes()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
} 