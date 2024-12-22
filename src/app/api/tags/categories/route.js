import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// 获取标签分类及其标签
export async function GET() {
  try {
    const tagCategories = await prisma.tagCategory.findMany({
      include: {
        tags: {
          include: {
            childTags: true  // 只包含直接子标签
          }
        }
      }
    });

    return NextResponse.json(tagCategories);
  } catch (error) {
    console.error("获取标签系统失败:", error);
    return NextResponse.json(
      { message: error.message || "获取标签系统失败" },
      { status: 500 }
    );
  }
}

// 创建新标签
export async function POST(req) {
  try {
    const { name, slug, description, categoryId, parentId } = await req.json();
    
    const tag = await prisma.tag.create({
      data: {
        name,
        slug,
        description,
        categoryId,
        parentId
      },
      include: {
        category: true,
        parentTag: true,
        childTags: true
      }
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.error("创建标签失败:", error);
    return NextResponse.json(
      { message: "创建标签失败" },
      { status: 500 }
    );
  }
} 