import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic'; // 确保动态数据

export async function GET() {
    try {
        // 获取所有文章的 slug
        const posts = await prisma.post.findMany({
            select: {
                slug: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 提取 slug 数组
        const slugs = posts.map(post => post.slug);

        return NextResponse.json(slugs, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
        });
    } catch (error) {
        console.error("获取文章 slugs 失败:", error);
        return NextResponse.json(
            { message: "获取文章 slugs 失败" },
            { status: 500 }
        );
    }
} 