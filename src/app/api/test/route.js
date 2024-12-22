import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ 
        message: "API 正常工作",
        timestamp: new Date().toISOString()
    });
} 