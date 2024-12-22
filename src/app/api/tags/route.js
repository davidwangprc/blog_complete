import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// 简单的内存缓存
let tagsCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

export async function GET() {
    console.log('=== 标签API请求开始 ===');
    console.log('缓存状态:', {
        hasCache: !!tagsCache,
        cacheAge: lastFetchTime ? `${(Date.now() - lastFetchTime) / 1000}秒` : '无缓存',
        cacheSize: tagsCache?.length || 0
    });

    try {
        // 检查缓存是否有效
        if (tagsCache && (Date.now() - lastFetchTime < CACHE_DURATION)) {
            console.log('使用缓存数据，跳过数据库查询');
            return NextResponse.json(tagsCache);
        }

        console.log('从数据库获取标签数据...');
        const tags = await prisma.tag.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        // 更新缓存
        tagsCache = tags;
        lastFetchTime = Date.now();

        console.log('数据库查询完成，更新缓存');
        console.log('标签数量:', tagsCache.length);

        return NextResponse.json(tagsCache);
    } catch (error) {
        console.error("获取标签列表失败:", error);
        return NextResponse.json(
            { message: "获取标签列表失败" },
            { status: 500 }
        );
    } finally {
        console.log('=== tagsAPI请求结束 ===\n');
    }
}

// 添加创建标签的接口
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, categoryId } = body;

        if (!name || !categoryId) {
            return NextResponse.json(
                { message: "标签名称和分类ID是必需的" },
                { status: 400 }
            );
        }

        // 创建新标签
        const newTag = await prisma.tag.create({
            data: {
                name,
                slug: name.toLowerCase().replace(/\s+/g, '-'),
                categoryId: parseInt(categoryId)
            },
            select: {
                id: true,
                name: true,
                slug: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        // 清除缓存
        tagsCache = null;
        lastFetchTime = 0;

        return NextResponse.json(newTag);
    } catch (error) {
        console.error("创建标签失败:", error);
        return NextResponse.json(
            { message: "创建标签失败" },
            { status: 500 }
        );
    }
} 