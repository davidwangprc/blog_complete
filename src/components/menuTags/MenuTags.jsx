"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './menuTags.module.css';
import { FaTags, FaHashtag, FaFire } from 'react-icons/fa';
import { tagsApi, searchApi } from '@/lib/api';

const MenuTags = () => {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取热门标签
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await tagsApi.getPopularTags();
        console.log('获取的标签数据:', data); // 添加日志输出
        if (Array.isArray(data)) {
          setTags(data);
        } else {
          console.error('返回的数据不是数组:', data);
        }
      } catch (error) {
        console.error('获取热门标签失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  // 处理标签点击
  const handleTagClick = async (tagId, tagName) => {
    try {
      // 构建搜索参数
      const searchParams = new URLSearchParams({
        type: 'posts',
        tags: tagId
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
          searchType: 'posts',
          searchTerm: tagName
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
        <FaTags className={styles.headerIcon} />
        <h2 className={styles.headerTitle}>热门标签</h2>
      </div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id, tag.name)}
            className={styles.tag}
          >
            <FaHashtag className={styles.tagIcon} />
            <span className={styles.tagName}>{tag.name}</span>
            <span className={styles.tagCount}>
              <FaFire className={styles.fireIcon} />
              {tag.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuTags; 