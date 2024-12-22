import Card from "./Card";
import styles from "./cardlist.module.css";
import Link from "next/link";
import { postsApi, recipesApi } from "@/lib/api";

/**
 * 空状态组件 - 当没有内容时显示
 * @returns {JSX.Element} 空状态UI
 */
function EmptyState() {
    return (
        <div className={styles.emptyContainer}>
            <div className={styles.emptyContent}>
                <h3 className={styles.emptyTitle}>暂无内容</h3>
                <p className={styles.emptyMessage}>还没有发布任何文章或菜谱</p>
            </div>
        </div>
    );
}

/**
 * 错误状态组件 - 当加载失败时显示
 * @param {Object} props
 * @param {string} props.message - 错误信息
 * @returns {JSX.Element} 错误状态UI
 */
function ErrorState({ message }) {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
                <h3 className={styles.errorTitle}>加载失败</h3>
                <p className={styles.errorMessage}>{message}</p>
            </div>
        </div>
    );
}

/**
 * 按创建时间降序排序函数
 * @param {Object} a - 第一个对象
 * @param {Object} b - 第二个对象
 * @returns {number} 排序值
 */
const sortByDate = (a, b) => {
    try {
        return new Date(b.createdAt) - new Date(a.createdAt);
    } catch (error) {
        console.error('日期排序错误:', error);
        return 0;
    }
};

/**
 * 获取文章列表
 * @param {string} cat - 分类标识符
 * @returns {Promise<Array>} 文章列表
 */


const getPosts = async (cat) => {
    try {
        // 获取所有文章
        const response = await postsApi.getPosts();
        // console.log('获取到的所有文章:', response);

        if (!response?.posts) {
            return [];
        }

        // 根据分类参数过滤文章
        const filteredPosts = cat 
            ? response.posts.filter(post => post.category?.slug === cat)
            : response.posts;

        // 添加类型标识并返回
        return filteredPosts.map(post => ({
            ...post,
            type: 'post'
        }));
    } catch (error) {
        console.error('获取文章失败:', error);
        return [];
    }
};

/**
 * 获取菜谱列表
 * @returns {Promise<Array>} 菜谱列表
 */
const getRecipes = async () => {
    try {
        const response = await recipesApi.getRecipes();
        // console.log('获取到的菜谱:', response);

        if (!response?.recipes) {
            return [];
        }

        // 添加类型标识并返回
        return response.recipes.map(recipe => ({
            ...recipe,
            type: 'recipe'
        }));
    } catch (error) {
        console.error('获取菜谱失败:', error);
        return [];
    }
};

/**
 * 卡片列表主组件
 * @param {Object} props
 * @param {string} props.cat - 分类参数
 * @param {Array} props.items - 文章或菜谱列表
 * @param {boolean} props.showViewAll - 是否显示查看全部链接
 * @returns {Promise<JSX.Element>} 渲染的列表组件
 */
export default async function CardList({ cat, items, showViewAll = true }) {
    // 如果直接传入了 items，就使用传入的 items
    if (items) {
        return (
            <div className={styles.container}>
                <div className={styles.items}>
                    {items.map(item => (
                        <Card
                            key={`${item.type}-${item.id}`}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // 场景1: 食谱分类
    if (cat === 'food') {
        const recipes = await getRecipes();
        
        if (!recipes.length) {
            return <EmptyState />;
        }

        // 只显示最新的4篇食谱
        const latestRecipes = recipes
            .sort(sortByDate)
            .slice(0, 4);

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Recent Recipes</h1>
                    <Link href="/recipes" className={styles.viewAll}>
                        View All
                    </Link>
                </div>
                <div className={styles.items}>
                    {latestRecipes.map(recipe => (
                        <Card key={`recipe-${recipe.id}`} item={recipe} />
                    ))}
                </div>
            </div>
        );
    }

    // 场景2: 其他具体分类
    if (cat) {
        const posts = await getPosts(cat);
        
        if (!posts.length) {
            return <EmptyState />;
        }

        // 只显示最新的4篇文章
        const latestPosts = posts
            .sort(sortByDate)
            .slice(0, 4);

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Recent Posts</h1>
                    <Link href={`/blog?cat=${cat}`} className={styles.viewAll}>
                        View All
                    </Link>
                </div>
                <div className={styles.items}>
                    {latestPosts.map(post => (
                        <Card key={`post-${post.id}`} item={post} />
                    ))}
                </div>
            </div>
        );
    }

    // 场景3: 无分类参数，显示所有内容的最新4篇
    const [posts, recipes] = await Promise.all([
        getPosts(),
        getRecipes()
    ]);

    // 合并文章和菜谱，按时间排序，只取最新4篇
    const allItems = []
        .concat(posts || [])
        .concat(recipes || [])
        .sort(sortByDate)
        .slice(0, 4);

    if (!allItems.length) {
        return <EmptyState />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Recent Posts</h1>
                <Link href="/blog" className={styles.viewAll}>
                    View All
                </Link>
            </div>
            <div className={styles.items}>
                {allItems.map(item => (
                    <Card
                        key={`${item.type}-${item.id}`}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
}
