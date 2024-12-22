import Link from "next/link";
import styles from "./menuCategories.module.css";
import { FaThLarge, FaFolder } from 'react-icons/fa';
import { categoriesApi } from "@/lib/api";
import { getCategoryStyles } from "@/lib/utils";


// 获取分类列表
const MenuCategories = async () => {
  const categories = await categoriesApi.getCategories();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaThLarge className={styles.headerIcon} />
        <h2 className={styles.headerTitle}>分类浏览</h2>
      </div>
      <div className={styles.categoryList}>
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
              <FaFolder className={styles.categoryIcon} />
              <span className={styles.categoryName}>{category.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MenuCategories;