// src/app/api/cache-image/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

export async function POST(request) {
  try {
    const { imageUrl } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // 生成唯一的文件名
    const fileName = `cached_${Date.now()}_${path.basename(imageUrl)}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cache');
    const filePath = path.join(uploadDir, fileName);

    try {
      // 确保目录存在
      await mkdir(uploadDir, { recursive: true });
      
      // 下载图片
      const imageResponse = await fetch(imageUrl);
      const arrayBuffer = await imageResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // 保存文件
      await writeFile(filePath, buffer);
      
      // 返回相对路径
      return NextResponse.json({ 
        path: `/uploads/cache/${fileName}`,
        success: true 
      });
    } catch (error) {
      console.error('File operation error:', error);
      return NextResponse.json({ 
        error: 'Failed to save image',
        details: error.message 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Cache image error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}