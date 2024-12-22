const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedPosts() {
  try {
    // 获取管理员用户
    const admin = await prisma.user.findFirst({
      where: { isAdmin: true }
    });

    if (!admin) {
      throw new Error('Admin user not found. Please run seed.js first.');
    }

    // 获取所有分类
    const categories = await prisma.category.findMany();
    
    // 为每个分类创建示例文章
    const samplePosts = [
      {
        categorySlug: 'comfyui',
        title: '[数据库示例] ComfyUI工作流入门指南',
        content: `
# ComfyUI工作流入门指南

ComfyUI 是一个功能强大的 Stable Diffusion 图形化工作流工具。本文将介绍基础工作流的创建方法。

## 基本概念

1. 工作流节点
2. 连接和数据流
3. 参数设置

## 常用节点

- KSampler
- VAE Decoder
- CLIP Text Encode
- Load Checkpoint

## 示例工作流

这是一个基础的文生图工作流示例...`,
        description: 'ComfyUI 基础工作流搭建教程，适合新手入门学习',
        featured: true,
        published: true,
      },
      {
        categorySlug: 'reading',
        title: '[数据库示例] 读书笔记方法论',
        content: `
# 高效读书笔记方法论

如何做好读书笔记？本文分享一些实用的方法和技巧。

## 笔记要点

1. 关键信息提取
2. 知识连接
3. 个人思考

## 常用工具

- Notion
- Obsidian
- Logseq

## 实践建议

建立自己的知识管理系统...`,
        description: '高效的读书笔记方法和工具推荐',
        featured: true,
        published: true,
      },
      {
        categorySlug: 'travel',
        title: '[数据库示例] 旅行计划模板',
        content: `
# 旅行计划完全指南

如何制定一个完美的旅行计划？本文提供实用的模板和建议。

## 计划要素

1. 目的地研究
2. 行程安排
3. 预算控制

## 必备清单

- 证件
- 必需品
- 应急物品

## 实用建议

如何做好旅行准备工作...`,
        description: '完整的旅行计划制定指南和注意事项',
        featured: false,
        published: true,
      },
      {
        categorySlug: 'food',
        title: '[数据库示例] 美食摄影技巧',
        content: `
# 美食摄影入门指南

如何拍出诱人的美食照片？分享一些实用的摄影技巧。

## 基本要素

1. 光线运用
2. 构图技巧
3. 道具搭配

## 设备选择

- 相机推荐
- 镜头选择
- 辅助工具

## 后期处理

照片调色和美化技巧...`,
        description: '美食摄影的基础知识和实用技巧分享',
        featured: false,
        published: true,
      },
      {
        categorySlug: 'research',
        title: '[数据库示例] 研究方法论',
        content: `
# 研究方法论指南

如何开展一个研究项目？本文介绍基本的研究方法和流程。

## 研究步骤

1. 问题定义
2. 文献综述
3. 方法选择
4. 数据收集
5. 结果分析

## 工具推荐

- 文献管理
- 数据分析
- 写作工具

## 注意事项

研究过程中的关键点...`,
        description: '研究项目的方法论和实用工具推荐',
        featured: true,
        published: true,
      },
      {
        categorySlug: 'coding',
        title: '[数据库示例] 编程最佳实践',
        content: `
# 编程最佳实践指南

整理一些实用的编程最佳实践和经验分享。

## 代码规范

1. 命名规则
2. 注释规范
3. 代码组织

## 开发工具

- IDE 选择
- 版本控制
- 调试工具

## 效率提升

提高编程效率的技巧和方法...`,
        description: '编程开发中的最佳实践和经验总结',
        featured: true,
        published: true,
      },
      {
        categorySlug: 'travel',
        title: '[数据库示例] 旅行摄影技巧',
        content: `
# 旅行摄影技巧指南

如何拍摄出美丽的旅行照片？本文分享一些实用的摄影技巧。

## 摄影准备

1. 选择合适的设备
2. 了解拍摄地点
3. 规划拍摄时间

## 拍摄技巧

- 利用自然光
- 选择合适的角度
- 捕捉瞬间

## 后期处理

如何处理和编辑旅行照片...`,
        description: '旅行摄影的实用技巧和建议',
        featured: true,
        published: true,
      }
    ];

    // 创建示例文章
    for (const post of samplePosts) {
      const category = categories.find(c => c.slug === post.categorySlug);
      if (!category) continue;

      const { categorySlug, ...postData } = post;
      
      await prisma.post.upsert({
        where: {
          slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        },
        update: {},
        create: {
          ...postData,
          slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
          authorId: admin.id,
          categoryId: category.id,
          views: Math.floor(Math.random() * 100),
          isRecipe: false
        }
      });
    }
    
    console.log('Sample posts created successfully');

  } catch (error) {
    console.error('Error seeding posts:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = seedPosts;

// 如果直接运行此文件，则执行种子函数
if (require.main === module) {
  seedPosts()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
} 