import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const count = await prisma.bookmark.count();
    
    return NextResponse.json({ count }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error("获取书签数量失败:", error);
    return NextResponse.json(
      { message: "获取书签数量失败" },
      { status: 500 }
    );
  }
} 