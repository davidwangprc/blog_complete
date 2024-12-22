import prisma from "@/lib/db";
import { createSlug } from "@/lib/createslug";
import { NextResponse } from "next/server";

// 获取菜谱列表
export async function GET(req) {
    try {
        const recipes = await prisma.recipe.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                slug: true,
                cookingTime: true,
                servings: true,
                difficulty: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        color: true
                    }
                },
                tags: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }
                },
                nutrition: {
                    select: {
                        calories: true,
                        protein: true,
                        carbs: true,
                        fat: true,
                        fiber: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 添加类型标识并格式化数据
        const formattedRecipes = recipes.map(recipe => ({
            ...recipe,
            type: 'recipe',
            // 格式化时间
            createdAt: recipe.createdAt.toISOString(),
            updatedAt: recipe.updatedAt.toISOString()
        }));

        return NextResponse.json({
            recipes: formattedRecipes,
            total: formattedRecipes.length
        });
    } catch (error) {
        console.error('获取菜谱列表失败:', error);
        return NextResponse.json(
            { message: "获取菜谱列表失败" },
            { status: 500 }
        );
    }
}

// 创建新菜谱
export async function POST(req) {
    try {
        const body = await req.json();
        const {
            title,
            description,
            ingredients,
            steps,
            image,
            categoryId,
            cookingTime,
            servings,
            difficulty
        } = body;

        // 验证必要字段
        if (!title || !description || !ingredients || !steps) {
            return NextResponse.json(
                {
                    message: "缺少必要字段",
                    details: {
                        title: !title,
                        description: !description,
                        ingredients: !ingredients,
                        steps: !steps
                    }
                },
                { status: 400 }
            );
        }

        // 生成带时间戳的 slug
        const slug = createSlug(title);

        const recipe = await prisma.recipe.create({
            data: {
                title,
                description,
                slug,
                steps,
                image,
                cookingTime: cookingTime ? parseInt(cookingTime) : null,
                servings: servings ? parseInt(servings) : null,
                difficulty,
                categoryId: categoryId || 4, // 默认为 food 分类
                authorId: 1,
                ingredients: {
                    create: ingredients.map(ing => ({
                        name: ing.name,
                        amount: parseFloat(ing.amount),
                        unit: ing.unit
                    }))
                }
            },
            include: {
                ingredients: true,
                author: true,
                category: true
            }
        });

        return NextResponse.json(recipe, { status: 201 });
    } catch (error) {
        console.error("Recipe creation error:", error);
        return NextResponse.json(
            { message: "创建菜谱失败", error: error.message },
            { status: 500 }
        );
    }
}; 