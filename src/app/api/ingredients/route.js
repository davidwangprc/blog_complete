import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// 简单的内存缓存
let ingredientsCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

export async function GET() {
    console.log('=== 食材API请求开始 ===');
    console.log('缓存状态:', {
        hasCache: !!ingredientsCache,
        cacheAge: lastFetchTime ? `${(Date.now() - lastFetchTime) / 1000}秒` : '无缓存',
        cacheSize: ingredientsCache?.length || 0
    });

    try {
        // 检查缓存是否有效
        if (ingredientsCache && (Date.now() - lastFetchTime < CACHE_DURATION)) {
            console.log('使用缓存数据，跳过数据库查询');
            return NextResponse.json(ingredientsCache);
        }

        console.log('从数据库获取食材数据...');
        const ingredients = await prisma.ingredient.findMany({
            select: {
                id: true,
                name: true
            }
        });

        // 更新缓存
        ingredientsCache = ingredients
            .map(ing => ing.name)
            .sort((a, b) => a.localeCompare(b, 'zh-CN'));
        lastFetchTime = Date.now();

        console.log('数据库查询完成，更新缓存');
        console.log('食材数量:', ingredientsCache.length);

        return NextResponse.json(ingredientsCache);
    } catch (error) {
        console.error("获取食材列表失败:", error);
        return NextResponse.json(
            { message: "获取食材列表失败" },
            { status: 500 }
        );
    } finally {
        console.log('=== 食材API请求结束 ===\n');
    }
} 