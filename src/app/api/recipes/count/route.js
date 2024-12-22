import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const count = await prisma.recipe.count();
        console.log('菜谱数量:', count);
        return NextResponse.json({ count });
    } catch (error) {
        console.error("获取菜谱数量失败:", error);
        return NextResponse.json(
            { message: "获取菜谱数量失败" },
            { status: 500 }
        );
    }
} 