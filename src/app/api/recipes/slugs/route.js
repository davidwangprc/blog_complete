import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic'; // 确保动态数据

export async function GET() {
    try {
        // 获取所有菜谱的 slug
        const recipes = await prisma.recipe.findMany({
            select: {
                slug: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 提取 slug 数组
        const slugs = recipes.map(recipe => recipe.slug);

        return NextResponse.json(slugs, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
        });
    } catch (error) {
        console.error("获取菜谱 slugs 失败:", error);
        return NextResponse.json(
            { message: "获取菜谱 slugs 失败" },
            { status: 500 }
        );
    }
} 