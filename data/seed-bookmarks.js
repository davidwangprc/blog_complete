const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedBookmarks() {
  try {
    console.log('开始创建书签数据...');

    // 创建书签分类
    const categories = [
      {
        name: '开发文档',
        slug: 'dev-docs',
        description: '开发相关的官方文档',
        color: '#57c4ff31',
        icon: '📚'
      },
      {
        name: '工具资源',
        slug: 'tools',
        description: '实用的开发工具',
        color: '#7fb88133',
        icon: '🛠️'
      },
      {
        name: 'AI 资源',
        slug: 'ai-resources',
        description: 'AI 相关的工具和资源',
        color: '#da85c731',
        icon: '🤖'
      }
    ];

    // 创建书签分类
    for (const category of categories) {
      await prisma.bookmarkCategory.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
    }

    // 获取创建的分类
    const devDocsCategory = await prisma.bookmarkCategory.findUnique({
      where: { slug: 'dev-docs' }
    });
    const toolsCategory = await prisma.bookmarkCategory.findUnique({
      where: { slug: 'tools' }
    });
    const aiCategory = await prisma.bookmarkCategory.findUnique({
      where: { slug: 'ai-resources' }
    });

    // 创建书签数据
    const bookmarks = [
      {
        title: 'Next.js 文档',
        url: 'https://nextjs.org/docs',
        description: 'Next.js 框架的官方文档，包含完整的 API 参考和教程。',
        icon: 'https://nextjs.org/favicon.ico',
        categoryId: devDocsCategory.id,
        featured: true
      },
      {
        title: 'React 文档',
        url: 'https://react.dev',
        description: 'React 库的官方文档，包含组件、Hooks 等核心概念。',
        icon: 'https://react.dev/favicon.ico',
        categoryId: devDocsCategory.id,
        featured: true
      },
      {
        title: 'VS Code',
        url: 'https://code.visualstudio.com',
        description: '强大的代码编辑器，支持多种编程语言和扩展。',
        icon: 'https://code.visualstudio.com/favicon.ico',
        categoryId: toolsCategory.id,
        featured: true
      },
      {
        title: 'ChatGPT',
        url: 'https://chat.openai.com',
        description: 'OpenAI 开发的智能对话系统。',
        icon: 'https://chat.openai.com/favicon.ico',
        categoryId: aiCategory.id,
        featured: true
      },
      {
        title: 'ComfyUI',
        url: 'https://github.com/comfyanonymous/ComfyUI',
        description: '强大的 Stable Diffusion 图形化工作流工具。',
        icon: 'https://github.com/favicon.ico',
        categoryId: aiCategory.id,
        featured: true
      }
    ];

    // 创建书签
    for (const bookmark of bookmarks) {
      await prisma.bookmark.upsert({
        where: {
          title_url: {
            title: bookmark.title,
            url: bookmark.url
          }
        },
        update: bookmark,
        create: bookmark
      });
    }

    console.log('书签数据创建完成！');
  } catch (error) {
    console.error('创建书签数据失败:', error);
    throw error;
  }
}

module.exports = seedBookmarks; 