const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedTags() {
  try {
    console.log('开始创建标签数据...');

    // 创建标签分类
    const categories = [
      {
        name: '编程语言',
        slug: 'programming-languages',
        description: '各种编程语言相关'
      },
      {
        name: '框架工具',
        slug: 'frameworks-tools',
        description: '开发框架和工具'
      },
      {
        name: '最佳实践',
        slug: 'best-practices',
        description: '编程最佳实践和设计模式'
      }
    ];

    // 创建标签数据（包含层级关系）
    const tags = [
      // 编程语言分类
      {
        name: 'JavaScript',
        slug: 'javascript',
        categorySlug: 'programming-languages',
        childTags: [
          { name: 'ES6+', slug: 'es6-plus' },
          { name: 'TypeScript', slug: 'typescript' },
          { name: 'Node.js', slug: 'nodejs' }
        ]
      },
      {
        name: 'Python',
        slug: 'python',
        categorySlug: 'programming-languages',
        childTags: [
          { name: 'Django', slug: 'django' },
          { name: 'Flask', slug: 'flask' },
          { name: 'FastAPI', slug: 'fastapi' }
        ]
      },
      
      // 框架工具分类
      {
        name: 'React',
        slug: 'react',
        categorySlug: 'frameworks-tools',
        childTags: [
          { name: 'Next.js', slug: 'nextjs' },
          { name: 'React Hooks', slug: 'react-hooks' },
          { name: 'React Native', slug: 'react-native' }
        ]
      },
      
      // 最佳实践分类
      {
        name: '设计模式',
        slug: 'design-patterns',
        categorySlug: 'best-practices',
        childTags: [
          { name: 'SOLID', slug: 'solid' },
          { name: 'DRY', slug: 'dry' },
          { name: 'KISS', slug: 'kiss' }
        ]
      }
    ];

    // 1. 创建分类
    for (const category of categories) {
      await prisma.tagCategory.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
    }
    console.log('标签分类创建完成');

    // 2. 创建父标签和子标签
    for (const tag of tags) {
      const category = await prisma.tagCategory.findUnique({
        where: { slug: tag.categorySlug }
      });

      if (category) {
        // 创建父标签
        const parentTag = await prisma.tag.upsert({
          where: { slug: tag.slug },
          update: {
            name: tag.name,
            categoryId: category.id
          },
          create: {
            name: tag.name,
            slug: tag.slug,
            categoryId: category.id
          }
        });

        // 创建子标签
        if (tag.childTags) {
          for (const childTag of tag.childTags) {
            await prisma.tag.upsert({
              where: { slug: childTag.slug },
              update: {
                name: childTag.name,
                categoryId: category.id,
                parentId: parentTag.id
              },
              create: {
                name: childTag.name,
                slug: childTag.slug,
                categoryId: category.id,
                parentId: parentTag.id
              }
            });
          }
        }
      }
    }
    console.log('标签数据创建完成！');

  } catch (error) {
    console.error('创建标签数据失败:', error);
    throw error;
  }
}

module.exports = seedTags; 