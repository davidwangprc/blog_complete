import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // 确保动态数据

// 获取单个菜谱详情
export async function GET(req, { params }) {
    // 获取参数
    const resolvedParams = await Promise.resolve(params);
    // 获取slug
    const { slug } = resolvedParams;

    if (!slug) {
        return NextResponse.json(
            { message: "缺少菜谱标识" },
            { status: 400 }
        );
    }

    try {
        const recipe = await prisma.recipe.findUnique({
            where: { slug },
            include: {
                author: {
                    select: {
                      name: true,
                      avatar: true,
                    },
                },
                category: true,
                ingredients: true,
                tags: true,
            },
        });

        if (!recipe) {
            return NextResponse.json(
                { message: "菜谱不存在" },
                { status: 404 }
            );
        }

        // 格式化数据
        const formattedRecipe = {
            ...recipe,
            type: 'recipe',
            createdAt: recipe.createdAt.toISOString(),
            updatedAt: recipe.updatedAt.toISOString()
        };

        return NextResponse.json(formattedRecipe);
    } catch (error) {
        console.error('获取菜谱详情失败:', error);
        return NextResponse.json(
            { message: "获取菜谱详情失败" },
            { status: 500 }
        );
    }
}
