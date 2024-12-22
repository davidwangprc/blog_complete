import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "posts";
    
    if (type === "recipes") {
      const ingredients = searchParams.get("ingredients")?.split(",");
      const minTime = parseInt(searchParams.get("minTime"));
      const maxTime = parseInt(searchParams.get("maxTime"));
      const minServings = parseInt(searchParams.get("minServings"));
      const maxServings = parseInt(searchParams.get("maxServings"));

      console.log('搜索参数:', {
        ingredients,
        minTime,
        maxTime,
        minServings,
        maxServings
      });

      const whereConditions = [];
      
      if (ingredients?.length) {
        whereConditions.push({
          ingredients: {
            some: {
              name: {
                in: ingredients.map(i => i.trim()),
              }
            }
          }
        });
      }
      
      if (!isNaN(minTime)) whereConditions.push({ cookingTime: { gte: minTime } });
      if (!isNaN(maxTime)) whereConditions.push({ cookingTime: { lte: maxTime } });
      if (!isNaN(minServings)) whereConditions.push({ servings: { gte: minServings } });
      if (!isNaN(maxServings)) whereConditions.push({ servings: { lte: maxServings } });

      const where = whereConditions.length ? { AND: whereConditions } : {};

      console.log('查询条件:', JSON.stringify(where, null, 2));

      const recipes = await prisma.recipe.findMany({
        where,
        include: {
          author: {
            select: {
              name: true,
              avatar: true
            }
          },
          category: true,
          ingredients: {
            include: {
              Unit: true
            }
          }
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      console.log('查询结果数量:', recipes.length);
      
      const formattedRecipes = recipes.map(recipe => ({
        ...recipe,
        ingredients: recipe.ingredients.map(ing => ({
          name: ing.name,
          amount: ing.amount,
          unit: ing.Unit?.name || ing.unit
        }))
      }));

      return NextResponse.json(formattedRecipes);
    } else {
      const tags = searchParams.get("tags")?.split(",").filter(Boolean);
      
      if (!tags?.length) {
        return NextResponse.json([]);
      }

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            { tags: { some: { id: { in: tags } } } },
          ]
        },
        include: {
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
              slug: true
            }
          },
          tags: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const formattedPosts = posts.map(post => ({
        id: post.id,
        title: post.title,
        description: post.description,
        slug: post.slug,
        image: post.image,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: {
          name: post.author.name,
          avatar: post.author.avatar
        },
        category: {
          title: post.category.title,
          slug: post.category.slug
        },
        tags: post.tags.map(tag => ({
          id: tag.id,
          name: tag.name
        }))
      }));

      return NextResponse.json(formattedPosts);
    }
  } catch (error) {
    console.error("搜索错误:", error);
    return NextResponse.json(
      { message: "搜索失败", error: error.message },
      { status: 500 }
    );
  }
} 
