import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get("file");

        if (!file) {
            return NextResponse.json(
                { message: "请选择要上传的文件" },
                { status: 400 }
            );
        }

        // 文件类型检查
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { message: `不支持的文件类型: ${file.type}。支持的类型: ${allowedTypes.join(', ')}` },
                { status: 400 }
            );
        }

        // 检查文件大小 (20MB)
        if (file.size > 20 * 3024 * 3024) {
            return NextResponse.json(
                { message: "文件大小不能超过20MB" },
                { status: 400 }
            );
        }

        // 获取文件的字节数据
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 生成唯一的文件名（移除可能的特殊字符）
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const filename = `${Date.now()}-${originalName}`;
        
        // 确保上传目录存在
        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }
        
        // 写入文件
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // 返回文件路径（注意：这里修改为filePath而不是url）
        return NextResponse.json({ 
            message: "上传成功",
            filePath: `uploads/${filename}` 
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { message: error.message || "上传过程中发生错误" },
            { status: 500 }
        );
    }
}
