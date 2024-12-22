// 导入 Prisma 客户端实例
import prisma from "@/lib/db";
// 导入 Next.js 的 Response 处理工具
import { NextResponse } from "next/server";

/**
 * 获取所有分类
 */
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    // 将查询结果转换为 JSON 格式并返回成功状态(200)
    return new NextResponse(JSON.stringify(categories), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

