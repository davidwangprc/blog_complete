import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic'; // 确保动态数据

// 获取单个文章详情
export async function GET(request, { params }) {
    const resolvedParams = await Promise.resolve(params);
    const { slug } = resolvedParams;

    if (!slug) {
        return NextResponse.json(
            { message: "缺少文章标识" },
            { status: 400 }
        );
    }

    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                author: true,
                category: true,
                tags: true,
            },
        });

        if (!post) {
            return NextResponse.json(
                { message: "文章不存在" },
                { status: 404 }
            );
        }

        // 构建优化后的响应数据结构
        const responseData = {
            id: post.id,
            title: post.title,
            description: post.description,
            content: post.content,
            image: post.image,
            slug: post.slug,
            author: post.author ? {
                name: post.author.name,
                avatar: post.author.avatar,
            } : null,
            category: post.category ? {
                id: post.category.id,
                title: post.category.title,
                slug: post.category.slug,
            } : null,
            tags: post.tags.map(tag => ({
                id: tag.id,
                name: tag.name,
            })),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };

        return NextResponse.json(responseData, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
        });
    } catch (error) {
        console.error("获取文章详情失败:", error);
        return NextResponse.json(
            { message: "获取文章详情失败" },
            { status: 500 }
        );
    }
} 

// 更新文章
export async function PUT(req, { params }) {
    try {
        const { slug } = params;
        const body = await req.json();
        const { title, content, description, image, categoryId, tags } = body;

        // 验证必要字段
        if (!title || !content || !categoryId) {
            return NextResponse.json(
                { message: "缺少必要字段" },
                { status: 400 }
            );
        }

        // 先检查文章是否存在
        const existingPost = await prisma.post.findUnique({
            where: { slug },
            include: { tags: true }
        });

        if (!existingPost) {
            return NextResponse.json(
                { message: "文章不存在" },
                { status: 404 }
            );
        }

        // 处理标签
        let tagsConnect = [];
        if (tags && Array.isArray(tags)) {
            tagsConnect = tags.map(tagId => ({ id: tagId }));
        }

        // 更新文章
        const updatedPost = await prisma.post.update({
            where: { slug },
            data: {
                title,
                content,
                description,
                image,
                categoryId,
                tags: {
                    disconnect: existingPost.tags.map(tag => ({ id: tag.id })), // 先移除所有现有标签
                    connect: tagsConnect // 连接新的标签
                }
            },
            include: {
                author: true,
                category: true,
                tags: true
            }
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error("更新文章失败:", error);
        return NextResponse.json(
            { message: "更新失败", error: error.message },
            { status: 500 }
        );
    }
} 