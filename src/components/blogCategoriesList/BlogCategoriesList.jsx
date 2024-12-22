"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from "./blogCategoriesList.module.css";
import { categoriesApi } from "@/lib/api";
import { getCategoryStyles } from "@/lib/utils";

const BlogCategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoriesApi.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('获取分类失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div className={styles.loading}>加载中...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Categories</h1>
            <div className={styles.categories}>
                {categories.map((category) => {
                    const { colorVar: categoryColorVar, textColorVar: categoryTextColorVar } = getCategoryStyles(category.id);

                    return (
                        <Link
                            key={category.id}
                            href={`/blog?cat=${category.slug}`}
                            className={styles.categoryItem}
                            style={{
                                backgroundColor: categoryColorVar,
                                borderColor: categoryTextColorVar
                            }}
                        >
                            {category.image && (
                                <Image
                                    src={`/${category.image}`}
                                    alt={category.title}
                                    width={30}
                                    height={30}
                                    className={styles.image}
                                />
                            )}
                            {category.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BlogCategoriesList; 