'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './search.module.css'
import Card from '@/components/cardList/Card'
import { searchApi, tagsApi, ingredientsApi } from '@/lib/api'
import { FaSearch, FaSpinner, FaTags, FaUtensils } from 'react-icons/fa'

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams);
      const searchType = params.get('type') || 'posts';
      
      if (searchType === 'posts') {
        params.set('tags', searchInput);
      } else {
        params.set('ingredients', searchInput);
      }

      router.push(`/search?${params.toString()}`);
      
      const searchResults = await searchApi.search(params);
      setResults(searchResults);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams);
        const searchResults = await searchApi.search(params);
        setResults(searchResults);
      } catch (error) {
        console.error('搜索失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.searchOptions}>
        {/* 搜索类型和输入框组合 */}
        <div className={styles.searchHeader}>
          <div className={styles.searchTypeSelector}>
            <button 
              className={`${styles.typeButton} ${searchParams.get('type') === 'posts' ? styles.active : ''}`}
              onClick={() => router.push(`/search?type=posts`)}
            >
              <FaTags className={styles.typeIcon} />
              <span>标签搜索</span>
            </button>
            <button 
              className={`${styles.typeButton} ${searchParams.get('type') === 'recipes' ? styles.active : ''}`}
              onClick={() => router.push(`/search?type=recipes`)}
            >
              <FaUtensils className={styles.typeIcon} />
              <span>食谱搜索</span>
            </button>
          </div>
          
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              placeholder={searchParams.get('type') === 'posts' ? "搜索标签..." : "搜索食材..."}
              className={styles.searchInput}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className={styles.searchButton}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className={styles.spinnerIcon} />
              ) : (
                <FaSearch className={styles.searchIcon} />
              )}
              <span>{loading ? '搜索中...' : '搜索'}</span>
            </button>
          </div>
        </div>

        {/* 高级搜索选项 */}
        <div className={styles.advancedOptions}>
          {searchParams.get('type') === 'posts' ? (
            <div className={styles.postSearch}>
              <div className={styles.dateRange}>
                <input
                  type="date"
                  value={searchParams.get('startDate')}
                  onChange={(e) => router.push(`/search?type=posts&startDate=${e.target.value}`)}
                  className={styles.dateInput}
                />
                <span>至</span>
                <input
                  type="date"
                  value={searchParams.get('endDate')}
                  onChange={(e) => router.push(`/search?type=posts&endDate=${e.target.value}`)}
                  className={styles.dateInput}
                />
              </div>
              <div className={styles.tags}>
                {/* 渲染标签选择组件 */}
              </div>
            </div>
          ) : (
            <div className={styles.recipeSearch}>
              <div className={styles.ingredientsSelect}>
                <h3>选择食材</h3>
                <div className={styles.ingredientsList}>
                  {/* 渲染食材选择组件 */}
                </div>
                {searchParams.get('ingredients') && (
                  <div className={styles.selectedIngredients}>
                    <h4>已选食材：</h4>
                    <div className={styles.ingredientTags}>
                      {searchParams.get('ingredients').split(',').map(ingredient => (
                        <span 
                          key={ingredient} 
                          className={styles.ingredientTag}
                          onClick={() => router.push(`/search?type=recipes&ingredients=${ingredient}`)}
                        >
                          {ingredient} ×
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.rangeInputs}>
                <div className={styles.rangeGroup}>
                  <label>烹饪时间（分钟）：</label>
                  <input
                    type="number"
                    placeholder="最短"
                    value={searchParams.get('minTime')}
                    onChange={(e) => router.push(`/search?type=recipes&minTime=${e.target.value}`)}
                    className={styles.rangeInput}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="最长"
                    value={searchParams.get('maxTime')}
                    onChange={(e) => router.push(`/search?type=recipes&maxTime=${e.target.value}`)}
                    className={styles.rangeInput}
                  />
                </div>
                <div className={styles.rangeGroup}>
                  <label>份量（人数）：</label>
                  <input
                    type="number"
                    placeholder="最少"
                    value={searchParams.get('minServings')}
                    onChange={(e) => router.push(`/search?type=recipes&minServings=${e.target.value}`)}
                    className={styles.rangeInput}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="最多"
                    value={searchParams.get('maxServings')}
                    onChange={(e) => router.push(`/search?type=recipes&maxServings=${e.target.value}`)}
                    className={styles.rangeInput}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 搜索结果显示 */}
      <div className={styles.results}>
        {results.length > 0 ? (
          <div className={styles.resultGrid}>
            {results.map(item => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            {loading ? (
              <FaSpinner className={styles.spinnerIcon} />
            ) : (
              <>
                {searchInput.trim() ? (
                  <p>未找到包含 &ldquo;{searchInput}&rdquo; 的{searchParams.get('type') === 'posts' ? '标签' : '食材'}</p>
                ) : (
                  <p>请输入关键词开始搜索</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 