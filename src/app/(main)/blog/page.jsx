"use client";
import { useState, useEffect, useCallback } from 'react';
import BlogCardList from "@/components/blogCardList/BlogCardList";
import BlogCategoriesList from "@/components/blogCategoriesList/BlogCategoriesList";
import Pagination from "@/components/pagination/Pagination";
import styles from "./blogPage.module.css";
import { categoriesApi, postsApi, recipesApi } from "@/lib/api";
import { useRouter, useSearchParams } from 'next/navigation';

const BlogPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const cat = searchParams.get('cat');
    const currentPage = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '10');
    
    const [categoryTitle, setCategoryTitle] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // 处理每页显示数量变化
    const handlePerPageChange = (e) => {
        const newPerPage = e.target.value;
        const params = new URLSearchParams(searchParams);
        params.set('per_page', newPerPage);
        params.set('page', '1'); // 切换每页数量时重置到第一页
        router.push(`/blog?${params.toString()}`);
    };

    // 获取数据
    useEffect(() => {
        const getAllItems = async () => {
            try {
                // console.log('getAllItems 开始获取数据, category:', cat);
                
                if (cat === 'food') {
                    const recipes = await recipesApi.getRecipes();
                    // console.log('Food recipes 数据:', recipes);
                    return Array.isArray(recipes) ? recipes : [];
                } else if (cat) {
                    // console.log('开始获取分类文章, category:', cat);
                    const posts = await postsApi.getPosts();
                    // console.log('获取到的所有文章:', posts);
                    // console.log('文章数据结构:', {
                    //     postsType: typeof posts,
                    //     hasPosts: Boolean(posts?.posts),
                    //     postsLength: posts?.posts?.length
                    // });
                    
                    const filtered = Array.isArray(posts?.posts) 
                        ? posts.posts.filter(post => {
                            // console.log('检查文章分类:', {
                            //     postId: post.id,
                            //     category: post.category,
                            //     categorySlug: post.category?.slug,
                            //     matchingCat: post.category?.slug === cat
                            // });
                            return post.category?.slug === cat;
                        }) 
                        : [];
                    
                    // console.log('过后的文章:', filtered);
                    return filtered;
                } else {
                    // console.log('获取所有内容');
                    const [posts, recipes] = await Promise.all([
                        postsApi.getPosts(),
                        recipesApi.getRecipes()
                    ]);
                    // console.log('获取到的数据:', {
                    //     posts: posts?.posts,
                    //     recipes: recipes
                    // });
                    
                    const postsArray = Array.isArray(posts?.posts) ? posts.posts : [];
                    const recipesArray = Array.isArray(recipes) ? recipes : [];
                    return [...postsArray, ...recipesArray];
                }
            } catch (error) {
                console.error("获取内容失败:", error);
                console.error("错误详情:", {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
                return [];
            }
        };

        const fetchCategoryTitle = async () => {
            if (cat) {
                try {
                    const categories = await categoriesApi.getCategories();
                    const category = categories.find(c => c.slug === cat);
                    if (category) {
                        setCategoryTitle(category.title);
                    }
                } catch (error) {
                    console.error("获取分类信息失败:", error);
                }
            }
        };

        const fetchData = async () => {
            setLoading(true);
            try {
                const allItems = await getAllItems();
                // console.log('获取到的所有项目:', {
                //     totalItems: allItems.length,
                //     items: allItems
                // });
                
                setTotalItems(allItems.length);
                
                // 计算分页
                const startIndex = (currentPage - 1) * perPage;
                const paginatedItems = allItems.slice(startIndex, startIndex + perPage);
                // console.log('分页数据:', {
                //     startIndex,
                //     endIndex: startIndex + perPage,
                //     itemsPerPage: paginatedItems.length
                // });
                
                setItems(paginatedItems);
                
                await fetchCategoryTitle();
            } catch (error) {
                console.error("获取数据失败:", error);
                console.error("错误详情:", {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
                setItems([]);
                setTotalItems(0);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cat, currentPage, perPage, searchParams]);

    // 获取页面标题
    const getTitle = () => {
        if (cat === 'food') return 'Food Recipe';
        if (cat) return `${categoryTitle || cat} Blog`;
        return 'All Posts';
    };

    const totalPages = Math.ceil(totalItems / perPage);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            {/* 分类列表 */}
            <div className={styles.categories}>
                <BlogCategoriesList />
            </div>

            {/* 标题和控制区 */}
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.titleText}>
                        {getTitle()}
                    </h1>
                    <span className={styles.totalCount}>
                        Total: {totalItems}
                    </span>
                </div>
                <div className={styles.controls}>
                    <label className={styles.perPageLabel}>
                        每页显示：
                        <select 
                            value={perPage} 
                            onChange={handlePerPageChange}
                            className={styles.perPageSelect}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                </div>
            </div>

            {/* 文章列表 */}
            <div className={styles.content}>
                <BlogCardList items={items} showViewAll={false} />
            </div>

            {/* 分页 */}
            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl={`/blog${cat ? `?cat=${cat}&` : '?'}${perPage !== 10 ? `per_page=${perPage}&` : ''}`}
                />
            )}
        </div>
    );
};

export default BlogPage;
