import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { createSlug } from "@/lib/createslug";

// 获取文章列表
export async function GET(req) {
    try {
        // 获取查询参数
        const url = new URL(req.url);
        const excludeCategoryId = url.searchParams.get('excludeCategoryId');

        // 构建查询条件
        const where = {
            published: true // 只获取已发布的文章
        };
        
        if (excludeCategoryId) {
            where.categoryId = {
                not: parseInt(excludeCategoryId, 10)
            };
        }

        // 获取文章列表
        const posts = await prisma.post.findMany({
            where,
            select: {
                id: true,
                title: true,
                description: true,
                content: true,
                image: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    }
                },
                category: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        color: true
                    }
                },
                tags: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'  // 按创建时间降序
            }
        });

        // 格式化日期
        const formattedPosts = posts.map(post => ({
            ...post,
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
        }));

        return NextResponse.json({ 
            posts: formattedPosts,
            total: formattedPosts.length
        });
    } catch (error) {
        console.error('获取文章列表失败:', error);
        return NextResponse.json(
            { message: "获取文章列表失败" },
            { status: 500 }
        );
    }
}

// 创建文章
export async function POST(req) {
    try {
        const data = await req.json();
        const { title, desc, content, image, categoryId, tags } = data;

        console.log('接收到的文章数据:', {
            title,
            descLength: desc?.length,
            contentLength: content?.length,
            image: !!image,
            categoryId,
            tags // 查看传入的标签数据
        });

        // 验证必要字段
        if (!title || !content || !categoryId) {
            console.warn('创建文章 - 缺少必要字段:', {
                hasTitle: !!title,
                hasContent: !!content,
                hasCategoryId: !!categoryId
            });
            return NextResponse.json(
                { message: "缺少必要字段" }, 
                { status: 400 }
            );
        }

        // 生成带时间戳的 slug
        const slug = createSlug(title);

        // 修改标签处理逻辑
        const tagsConnect = tags && Array.isArray(tags) 
            ? tags.map(tagId => {
                if (!tagId) {
                    throw new Error('标签ID不能为空');
                }
                return { id: tagId }; // 直接使用字符串ID，不进行转换
            })
            : [];

        console.log('创建文章 - 处理标签:', {
            originalTags: tags,
            processedTags: tagsConnect
        });

        const post = await prisma.post.create({ 
            data: {
                title,
                slug: createSlug(title),
                description: desc,
                content,
                image,
                published: true,
                authorId: 1,
                categoryId: parseInt(categoryId),
                tags: {
                    connect: tagsConnect // 直接使用处理后的标签数组
                }
            },
            include: {
                author: true,
                category: true,
                tags: true
            }
        });

        // 添加创建后的数据日志
        console.log('创建的文章数据:', {
            id: post.id,
            title: post.title,
            categoryId: post.categoryId,
            tagCount: post.tags.length,
            tags: post.tags.map(tag => ({
                id: tag.id,
                name: tag.name
            }))
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('创建文章 - 失败:', {
            error: error.message,
            stack: error.stack
        });
        return NextResponse.json(
            { 
                message: "创建文章失败",
                details: error.message
            },
            { status: 500 }
        );
    }
}
 