import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId");
        const excludeCategoryId = searchParams.get("excludeCategoryId");

        const where = {};
        
        if (categoryId) {
            where.categoryId = parseInt(categoryId);
        }
        
        if (excludeCategoryId) {
            where.NOT = {
                categoryId: parseInt(excludeCategoryId)
            };
        }

        // console.log('post查询条件:', where);
        const count = await prisma.post.count({ where });
        // console.log('博客数量:', count);
        return NextResponse.json({ count });
    } catch (error) {
        console.error("post获取文章数量失败:", error);
        return NextResponse.json(
            { message: "获取文章数量失败" },
            { status: 500 }
        );
    }
} 