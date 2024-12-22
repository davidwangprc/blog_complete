import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// PUT 更新标签
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, slug, categoryId, parentId } = body;

    // 验证必要字段
    if (!name || !categoryId) {
      return NextResponse.json(
        { message: "标签名称和分类是必填项" },
        { status: 400 }
      );
    }

    // 检查标签是否存在
    const existingTag = await prisma.tag.findUnique({
      where: { id }
    });

    if (!existingTag) {
      return NextResponse.json(
        { message: "标签不存在" },
        { status: 404 }
      );
    }

    // 更新标签
    const tag = await prisma.tag.update({
      where: { id },
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        categoryId: parseInt(categoryId),
        parentId: parentId || null
      },
      include: {
        category: true,
        parentTag: true,
        childTags: true
      }
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.error("更新标签失败:", error);
    return NextResponse.json(
      { message: error.message || "更新标签失败" },
      { status: 500 }
    );
  }
}

// DELETE 删除标签
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { message: "标签ID是必需的" },
        { status: 400 }
      );
    }

    // 检查标签是否存在
    const existingTag = await prisma.tag.findUnique({
      where: { id },
      include: {
        childTags: true
      }
    });

    if (!existingTag) {
      return NextResponse.json(
        { message: "标签不存在" },
        { status: 404 }
      );
    }

    // 检查是否有子标签
    if (existingTag.childTags.length > 0) {
      return NextResponse.json(
        { message: "无法删除有子标签的标签" },
        { status: 400 }
      );
    }

    // 删除标签与其他表的关联并删除标签
    await prisma.$transaction([
      // 先解除所有关联
      prisma.tag.update({
        where: { id },
        data: {
          posts: { set: [] },
          recipes: { set: [] },
          bookmarks: { set: [] }
        }
      }),
      // 然后删除标签
      prisma.tag.delete({
        where: { id }
      })
    ]);

    return NextResponse.json({ message: "标签已成功删除" });
  } catch (error) {
    console.error("删除标签失败:", error);
    return NextResponse.json(
      { message: error.message || "删除标签失败" },
      { status: 500 }
    );
  }
} 