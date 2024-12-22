'use client'

import styles from './recipeIngredients.module.css'
import { useState, useEffect, useRef } from 'react'
import { ingredientsApi } from '@/lib/api'

const COMMON_UNITS = [
    { value: '', label: '选择单位' },
    // 重量单位
    { value: '克', label: '克' },
    { value: '千克', label: '千克' },
    { value: '两', label: '两' },
    
    // 体积单位
    { value: '毫升', label: '毫升' },
    { value: '升', label: '升' },
    { value: '汤匙', label: '汤匙' },
    { value: '茶匙', label: '茶匙' },
    
    // 数量单位
    { value: '个', label: '个' },
    { value: '只', label: '只' },
    { value: '片', label: '片' },
    { value: '根', label: '根' },
    { value: '把', label: '把' },
    
    // 其他单位
    { value: '适量', label: '适量' },
    { value: '少许', label: '少许' },
    { value: 'other', label: '其他' }
];

// 在组件顶部添加防抖函数
const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);
    
    return (...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

export default function RecipeIngredients({
    ingredients,
    onIngredientChange,
    onAddIngredient,
    onRemoveIngredient
}) {
    console.log('=== RecipeIngredients 渲染 ===');
    
    const [existingIngredients, setExistingIngredients] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const mountedRef = useRef(true);
    const fetchCountRef = useRef(0);

    // 获取已有食材列表
    useEffect(() => {
        let isMounted = true;
        console.log('开始获取食材列表，当前获取次数:', fetchCountRef.current + 1);
        
        const fetchIngredients = async () => {
            if (!isMounted) return;
            setIsLoading(true);

            try {
                const startTime = Date.now();
                const data = await ingredientsApi.getIngredients();
                const endTime = Date.now();
                
                console.log('食材列表获取完成', {
                    耗时: `${endTime - startTime}ms`,
                    数据量: data.length,
                    获取次数: fetchCountRef.current + 1
                });

                if (isMounted) {
                    setExistingIngredients(data);
                    fetchCountRef.current += 1;
                }
            } catch (error) {
                console.error('获取食材列表失败:', error);
                if (isMounted) {
                    alert('获取食材列表失败，请刷新页面重试');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchIngredients();

        return () => {
            isMounted = false;
        };
    }, []); // 空依赖数组，只在组件挂载时执行一次

    // 使用防抖处理食材名称输入
    const debouncedHandleSearch = useDebounce((index, value) => {
        console.log('执行搜索:', { index, value });
        if (value.trim()) {
            const filtered = existingIngredients.filter(ing => 
                ing.toLowerCase().includes(value.toLowerCase())
            );
            console.log('搜索结果:', filtered.length);
            setSuggestions(filtered);
            setActiveIndex(index);
        } else {
            setSuggestions([]);
            setActiveIndex(-1);
        }
    }, 300);

    // 处理食材名称输入
    const handleIngredientNameChange = (index, value) => {
        console.log('输入变化:', { index, value });
        onIngredientChange(index, 'name', value);
        debouncedHandleSearch(index, value);
    };

    // 选择建议的食材
    const handleSuggestionClick = (index, name) => {
        onIngredientChange(index, 'name', name);
        setSuggestions([]);
        setActiveIndex(-1);
    };

    // 检查食材是否存在于数据库
    const checkIngredientExists = (name) => {
        if (!name) return false;
        return existingIngredients.includes(name.trim());
    };

    // ���加点击外部关闭建议列表的功能
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeIndex !== -1 && !event.target.closest(`.${styles.ingredientNameContainer}`)) {
                setSuggestions([]);
                setActiveIndex(-1);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [activeIndex]);

    // 组件卸载时的清理
    useEffect(() => {
        return () => {
            console.log('RecipeIngredients 组件卸载');
            mountedRef.current = false;
        };
    }, []);

    // 添加日志观察传入的数据
    console.log('RecipeIngredients 组件接收的 ingredients:', ingredients);
    console.log('ingredients 类型:', typeof ingredients);
    console.log('ingredients 是否为数组:', Array.isArray(ingredients));


    const [customUnits, setCustomUnits] = useState(new Array(ingredients.length).fill(false));

    return (
        <div className={styles.ingredientsSection}>
            <h2 className={styles.sectionTitle}>
                食材清单
                {isLoading && <span className={styles.loadingText}>（加载中...）</span>}
            </h2>
            <div className={styles.ingredientsList}>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className={styles.ingredientItem}>
                        <div className={styles.ingredientNameContainer}>
                            <input
                                type="text"
                                placeholder="食材名称"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientNameChange(index, e.target.value)}
                                className={styles.ingredientInput}
                                disabled={isLoading}
                            />
                            {activeIndex === index && suggestions.length > 0 && (
                                <ul className={styles.suggestions}>
                                    {suggestions.map((suggestion, i) => (
                                        <li
                                            key={i}
                                            onClick={() => handleSuggestionClick(index, suggestion)}
                                            className={styles.suggestionItem}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!isLoading && ingredient.name && !checkIngredientExists(ingredient.name) && (
                                <span className={styles.newIngredientHint}>
                                    新食材
                                </span>
                            )}
                        </div>
                        <input
                            type="number"
                            placeholder="数量"
                            value={ingredient.amount}
                            onChange={(e) => onIngredientChange(index, 'amount', e.target.value)}
                            className={styles.ingredientInput}
                            min="0"
                            step="0.1"
                        />
                        {customUnits[index] ? (
                            <input
                                type="text"
                                value={ingredient.unit}
                                onChange={(e) => onIngredientChange(index, 'unit', e.target.value)}
                                className={styles.ingredientInput}
                                placeholder="输入单位"
                            />
                        ) : (
                            <select
                                value={ingredient.unit}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === 'other') {
                                        const newCustomUnits = [...customUnits];
                                        newCustomUnits[index] = true;
                                        setCustomUnits(newCustomUnits);
                                        onIngredientChange(index, 'unit', '');
                                        return;
                                    }
                                    onIngredientChange(index, 'unit', value);
                                }}
                                className={styles.ingredientInput}
                            >
                                {COMMON_UNITS.map(unit => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        )}
                        <button
                            type="button"
                            onClick={() => onRemoveIngredient(index)}
                            className={styles.removeIngredient}
                            disabled={ingredients.length === 1}
                        >
                            <span>×</span>
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={onAddIngredient}
                    className={styles.addIngredient}
                >
                    + 添加食材
                </button>
            </div>
        </div>
    )
} 