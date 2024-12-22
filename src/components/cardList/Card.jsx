"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./cardlist.module.css";
import { getCategoryStyles } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";

const Card = ({ item }) => {
  if (!item) {
    return null;
  }


  // 判断是否为食谱
  const isRecipe = item.type === 'recipe';

  // 获取正确的路由路径
  const path = isRecipe ? `/recipes/${item.slug}` : `/posts/${item.slug}`;

  // 使用分类ID来获取样式变量
  const categoryId = item.category?.id || 'default';
  const { colorVar: categoryColorVar, textColorVar: categoryTextColorVar } = getCategoryStyles(categoryId);

  return (
    <div className={styles.cardContainer}>
      {item.image && (
        <div className={styles.imageContainer}>
          <Image
            src={getImageUrl(item.image)}
            alt={item.title}
            fill
            className={styles.image}
            priority
            onError={(e) => {
              console.error('Image load failed:', {
                src: e.target.src,
                originalSrc: item.image
              });
            }}
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span
            className={styles.category}
            style={{
              backgroundColor: categoryColorVar,
              color: categoryTextColorVar,
              borderColor: categoryColorVar,
            }}
          >
            {item.category?.title || (isRecipe ? "FOOD" : "未分类")}
          </span>
          <span className={styles.date}>
            {new Date(item.createdAt).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <Link href={path}>
          <h1 className={styles.title}>{item.title || "无标题"}</h1>
        </Link>
        {item.author && (
          <div className={styles.author}>
            {item.author.avatar && (
              <Image
                src={item.author.avatar}
                alt={item.author.name || "作者头像"}
                width={25}
                height={25}
                className={styles.avatar}
              />
            )}
            <span className={styles.username}>
              {item.author.name || "匿名"}
            </span>
          </div>
        )}
        <hr className={styles.line} />
        <Link href={path} className={styles.link}>
          阅读更多
        </Link>
      </div>
    </div>
  );
};

export default Card;
