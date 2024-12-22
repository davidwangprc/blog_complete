import React from "react";
import styles from "./categoriesList.module.css";
import Link from "next/link";
import Image from "next/image";
import { getCategoryStyles } from "@/lib/utils";
import { categoriesApi } from "@/lib/api";

// 获取分类列表
const CategoriesList = async () => {
    const categories = await categoriesApi.getCategories();
    
    // 输出每个分类的标题
    // categories.forEach(category => {
    //     console.log("CategoriesList分类数据:", category.title);
    // });

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Categories</h1>
            <div className={styles.categories}>
                {categories.map((category) => {
                    // 使用通用函数获取分类样式变量
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

export default CategoriesList;