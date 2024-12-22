import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 使用 Prisma 查询语法
    const popularIngredients = await prisma.ingredient.groupBy({
      by: ['name'],
      _count: {
        recipeId: true  // 统计每个食材关联的食谱数量
      },
      orderBy: {
        _count: {
          recipeId: 'desc'  // 按食谱数量降序排序
        }
      },
      take: 10  // 只取前10个结果
    });

    // 格式化返回数据
    const formattedIngredients = popularIngredients.map(ing => ({
      name: ing.name,
      count: ing._count.recipeId
    }));

    // console.log('热门食材统计:', formattedIngredients);

    return NextResponse.json(formattedIngredients);
  } catch (error) {
    console.error("获取热门食材失败:", error);
    return NextResponse.json(
      { message: "获取热门食材失败" },
      { status: 500 }
    );
  }
} 