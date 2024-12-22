'use client'

import { useState, useCallback } from 'react'
import { recipesApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import RecipeIngredients from '@/components/recipeIngredients/RecipeIngredients'
import UploadImage from '@/components/uploadImage/UploadImage'
import styles from './writeRecipe.module.css'

export default function WriteRecipePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: [{ name: '', amount: '', unit: '' }],
        steps: '',
        image: '',
        cookingTime: '',
        servings: '',
        difficulty: 'easy',
        authorId: 1,
        categoryId: 4
    });

    // 添加日志观察状态变化
    console.log('WriteRecipePage formData:', formData);
    console.log('ingredients:', formData.ingredients);

    // 添加食材
    const addIngredient = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [
                ...prev.ingredients,
                { name: '', amount: '', unit: '' }
            ]
        }));
    };

    // 删除食材
    const removeIngredient = (index) => {
        setFormData(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    // 更新单个食材字段
    const handleIngredientChange = (index, field, value) => {
        setFormData(prev => {
            const newIngredients = [...prev.ingredients];
            newIngredients[index] = {
                ...newIngredients[index],
                [field]: value
            };
            return {
                ...prev,
                ingredients: newIngredients
            };
        });
    };

    // 处理表单数据变化
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 处理图片变化
    const handleImageChange = useCallback((imagePath) => {
        console.log('图片变化:', imagePath);
        setFormData(prev => {
            console.log('更新formData:', {
                当前图片: prev.image,
                新图片: imagePath
            });
            return {
                ...prev,
                image: imagePath
            };
        });
    }, []); 

    // 提交菜谱
    const handleSubmit = async (e) => {
        e.preventDefault()

        // 添加更详细的日志
        console.log('开始提交菜谱流程');
        console.log('当前表单数据:', formData);

        // 设置加载状态
        setLoading(true);
        setError('');

        // 添加图片验证
        if (!formData.image) {
            setError('请上传封面图片');
            setLoading(false);
            return;
        }

        // 验证所有食材都填写完整
        const isIngredientsValid = formData.ingredients.every(ing =>
            ing.name.trim() && ing.amount && ing.unit.trim()
        )

        console.log('食材验证结果:', isIngredientsValid);

        // 详细的表单验证日志
        if (!formData.title) {
            console.warn('标题未填写');
        }
        if (!formData.description) {
            console.warn('描述未填写');
        }
        if (!isIngredientsValid) {
            console.warn('食材信息不完整');
        }
        if (!formData.steps) {
            console.warn('烹饪步骤未填写');
        }

        // 验证所有必填字段
        if (!formData.title || !formData.description || !isIngredientsValid || !formData.steps || !formData.image) {
            setError('请填写所有必填字段，包括封面图片');
            setLoading(false);

            // 添加更详细的错误日志
            // 修改错误日志记录方式
            console.error('表单验证失败', JSON.stringify({
                titleValid: !!formData.title,
                descriptionValid: !!formData.description,
                ingredientsValid: isIngredientsValid,
                stepsValid: !!formData.steps
            }, null, 2));  // 使用 JSON.stringify 转换对象
            return;
        }

        try {
            console.log('准备提交菜谱数据:', formData);

            const res = await recipesApi.writeRecipe(formData);

            console.log('创建菜谱成功:', res);

            // 添加成功提示
            alert('菜谱发布成功！');

            // 跳转到新创建的菜谱页面
            router.push(`/recipes/${res.slug}`);
        } catch (error) {
            // 详细的错误处理和日志
            console.error('创建菜谱失败:', error);

            // 设置更详细的错误消息
            setError(error.message || '创建菜谱失败，请重试');

            // 可以添加更友好的错误提示
            alert(`菜谱发布失败：${error.message || '未知错误'}`);
        } finally {
            // 确保加载状态被重置
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>创建新菜谱</h1>
                <p className={styles.subtitle}>分享你的美食配方</p>
            </div>

            <div className={styles.formSection}>
                <div className={styles.mainInfo}>
                    <input
                        type="text"
                        name="title"
                        placeholder="菜品名称"
                        className={styles.input}
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="请输入菜品描述"
                        className={styles.input}
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                    />

                    <div className={styles.recipeDetails}>
                        <div className={styles.detailItem}>
                            <span>烹饪时间</span>
                            <input
                                type="number"
                                name="cookingTime"
                                placeholder="分钟"
                                value={formData.cookingTime}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.detailItem}>
                            <span>份量</span>
                            <input
                                type="number"
                                name="servings"
                                placeholder="人份"
                                value={formData.servings}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.detailItem}>
                            <span>难度</span>
                            <select
                                value={formData.difficulty}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                <option value="easy">简单</option>
                                <option value="medium">中等</option>
                                <option value="hard">困难</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.ingredientsSection}>
                    <RecipeIngredients
                        ingredients={formData.ingredients}
                        onIngredientChange={handleIngredientChange}
                        onAddIngredient={addIngredient}
                        onRemoveIngredient={removeIngredient}
                    />
                </div>
                <div className={styles.imageSection}>
                    <UploadImage 
                        onImageChange={handleImageChange}
                        initialImage={formData.image}
                    />
                </div>
                <div className={styles.stepsSection}>
                    <h2 className={styles.sectionTitle}>烹饪步骤</h2>
                    <textarea
                        placeholder="请输入详细的烹饪步骤（每行一步）"
                        className={styles.stepsInput}
                        name="steps"
                        value={formData.steps}
                        onChange={handleChange}
                        rows={8}
                    />
                </div>

                <button
                    className={styles.publishButton}
                    onClick={handleSubmit}
                    disabled={!formData.title || !formData.ingredients.length || !formData.steps || !formData.image}
                >
                    发布菜谱
                </button>
            </div>
        </div>
    )
}