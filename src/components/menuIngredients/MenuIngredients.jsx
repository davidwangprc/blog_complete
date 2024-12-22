"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './menuIngredients.module.css';
import { FaUtensils, FaCarrot, FaFire } from 'react-icons/fa';
import { ingredientsApi, searchApi } from '@/lib/api';

const MenuIngredients = () => {
  const router = useRouter();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取热门食材
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await ingredientsApi.getPopularIngredients();
        setIngredients(data);
      } catch (error) {
        console.error('获取热门食材失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  // 处理食材点击
  const handleIngredientClick = async (ingredientName) => {
    try {
      // 构建搜索参数
      const searchParams = new URLSearchParams({
        type: 'recipes',
        ingredients: ingredientName
      });

      // 执行搜索
      const results = await searchApi.search(searchParams);
      
      // 将搜索结果存储到 URL 状态中
      const url = `/search?${searchParams.toString()}`;
      
      // 使用 replace 而不是 push，这样返回时不会回到这个中间状态
      router.replace(url, {
        // 通过 URL 状态传递搜索结果
        state: { 
          searchResults: results,
          searchType: 'recipes',
          searchTerm: ingredientName
        }
      });
    } catch (error) {
      console.error('搜索失败:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaUtensils className={styles.headerIcon} />
        <h2 className={styles.headerTitle}>热门食材</h2>
      </div>
      <div className={styles.ingredients}>
        {ingredients.map((ingredient) => (
          <button
            key={ingredient.name}
            onClick={() => handleIngredientClick(ingredient.name)}
            className={styles.ingredient}
          >
            <FaCarrot className={styles.ingredientIcon} />
            <span className={styles.ingredientName}>{ingredient.name}</span>
            <span className={styles.ingredientCount}>
              <FaFire className={styles.fireIcon} />
              {ingredient.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuIngredients; 