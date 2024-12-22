import { Suspense } from 'react';
import { recipesApi } from '@/lib/api';
import styles from './singleRecipePage.module.css';
import Image from "next/image";
// import EditButton from "@/components/editButton/EditButton";

// 预生成静态参数
export async function generateStaticParams() {
    try {
        const slugs = await recipesApi.getAllSlugs();
        return slugs.map((slug) => ({
            slug: slug,
        }));
    } catch (error) {
        console.error('获取菜谱 slugs 失败:', error);
        return [];
    }
}

// 获取菜谱数据
async function getRecipe(slug) {
    if (!slug) return null;

    try {
        const recipe = await recipesApi.getRecipe(slug);
        return recipe;
    } catch (error) {
        console.error('获取菜谱失败:', error);
        return null;
    }
}





// 菜谱内容组件
function RecipeContent({ recipe }) {
    if (!recipe) return null;

    // 难度映射
    const difficultyMap = {
        easy: "简单",
        medium: "中等",
        hard: "困难"
    };

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{recipe.title}</h1>
                    {recipe.description && (
                        <p className={styles.description}>{recipe.description}</p>
                    )}
                    {/* <EditButton id={recipe.id} slug={recipe.slug} isRecipe={true} /> */}
                    <div className={styles.user}>
                        {recipe.author?.avatar && (
                            <div className={styles.userImageContainer}>
                                <Image
                                    src={recipe.author.avatar}
                                    alt=""
                                    fill
                                    className={styles.avatar}
                                />
                            </div>
                        )}
                        <div className={styles.userTextContainer}>
                            <span className={styles.username}>{recipe.author?.name}</span>
                            <span className={styles.date}>
                                {new Date(recipe.createdAt).toLocaleDateString('zh-CN')}
                            </span>
                        </div>
                    </div>
                </div>
                {recipe.image && (
                    <div className={styles.imageContainer}>
                        <Image
                            src={`/${recipe.image}`}
                            alt=""
                            fill
                            className={styles.image}
                        />
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.recipeDetails}>
                    {recipe.cookingTime && (
                        <div className={styles.detail}>
                            <span>烹饪时间：</span>
                            <span>{recipe.cookingTime} 分钟</span>
                        </div>
                    )}
                    {recipe.servings && (
                        <div className={styles.detail}>
                            <span>份量：</span>
                            <span>{recipe.servings} 人份</span>
                        </div>
                    )}
                    {recipe.difficulty && (
                        <div className={styles.detail}>
                            <span>难度：</span>
                            <span>{difficultyMap[recipe.difficulty] || recipe.difficulty}</span>
                        </div>
                    )}
                </div>

                <div className={styles.section}>
                    <h2>食材</h2>
                    <div className={styles.ingredients}>
                        {recipe.ingredients?.length > 0 ? (
                            recipe.ingredients.map((ingredient, index) => (
                                <div key={index} className={styles.ingredient}>
                                    <span className={styles.ingredientName}>{ingredient.name}</span>
                                    <span className={styles.ingredientAmount}>
                                        {ingredient.amount} {ingredient.unit}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p>暂无食材信息</p>
                        )}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>步骤</h2>
                    <div className={styles.steps}>
                        {recipe.steps.split('\n').map((step, index) => (
                            <div key={index} className={styles.step}>
                                <span className={styles.stepNumber}>
                                    {index + 1}.
                                </span>
                                <span className={styles.stepText}>{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// 加载占位组件
function RecipeSkeleton() {
    return (
        <div className={styles.skeleton}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonContent} />
        </div>
    );
}

// 主页面组件

export default async function SingleRecipePage({ params }) {
    const resolvedParams = await Promise.resolve(params);
    const recipe = await getRecipe(resolvedParams.slug);

    if (!recipe) {
        notFound();
    }
    return (
        <Suspense fallback={<RecipeSkeleton />}>
            <RecipeContent recipe={recipe} />
        </Suspense>
    );
}
