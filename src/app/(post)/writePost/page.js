'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { postsApi, categoriesApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import UploadImage from '@/components/uploadImage/UploadImage';
import styles from './writePost.module.css';
import MarkdownContent from "@/components/markdownContent/MarkdownContent";
import { tagsApi } from '@/lib/api';

export default function WritePostPage() {
    const router = useRouter();
    const dropdownRef = useRef(null);

    // 统一状态管理
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        image: '',
        categoryId: '',
        categories: [],
        tags: [],
        selectedTags: [],
        loading: false,
        error: ''
    });

    // 添加日志观察状态变化
    console.log('WritePostPage formData:', formData);
    console.log('tags:', formData.tags);

    // 添加标签搜索相关状态
    const [searchTag, setSearchTag] = useState("");
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    // 加载标签列表及相关操作
    const fetchTags = async () => {
        try {
            const data = await tagsApi.getTags();
            setFormData(prev => ({
                ...prev,
                tags: data
            }));
        } catch (error) {
            console.error("获取标签失败:", error);
            setFormData(prev => ({
                ...prev,
                error: "获取标签失败"
            }));
        }
    };

    // 初始加载标签
    useEffect(() => {
        fetchTags();
    }, []);

    // 处理标签选择
    const handleTagSelect = (tag) => {
        setFormData(prev => {
            const isSelected = prev.selectedTags.find(t => t.id === tag.id);
            if (isSelected) {
                return {
                    ...prev,
                    selectedTags: prev.selectedTags.filter(t => t.id !== tag.id)
                };
            } else {
                return {
                    ...prev,
                    selectedTags: [...prev.selectedTags, tag]
                };
            }
        });
        setSearchTag('');
        setIsTagDropdownOpen(false);
    };

    // 创建新标签
    const handleCreateTag = async (tagName) => {
        try {
            const newTag = await tagsApi.createTag({
                name: tagName,
                categoryId: 1 // 默认分类ID
            });
            
            // 更新标签列表
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag],
                selectedTags: [...prev.selectedTags, newTag]
            }));
            
            setSearchTag('');
            setIsTagDropdownOpen(false);
        } catch (error) {
            console.error("创建标签失败:", error);
            setFormData(prev => ({
                ...prev,
                error: "创建标签失败"
            }));
        }
    };

    // 移除已选标签
    const handleRemoveTag = (tagId) => {
        setFormData(prev => ({
            ...prev,
            selectedTags: prev.selectedTags.filter(tag => tag.id !== tagId)
        }));
    };

    // 计算过滤后的标签列表
    const filteredTags = formData.tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTag.toLowerCase()) &&
        !formData.selectedTags.find(t => t.id === tag.id)
    );

    // 点击外部关闭下拉框
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsTagDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 加载分类列表
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoriesApi.getCategories();
                setFormData(prev => ({
                    ...prev,
                    categories: data
                }));
            } catch (error) {
                console.error("获取分类失败:", error);
                setFormData(prev => ({
                    ...prev,
                    error: "获取分类失败"
                }));
            }
        };

        fetchCategories();
    }, []);

    // 处理表单字段更新
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 修改编辑器内容变化的处理函数
    const handleEditorChange = ({ text, html }) => {
        handleChange('content', text);
    };

    // 处理图片变化
    const handleImageChange = useCallback((imagePath) => {
        console.log('图片变化:', imagePath);
        handleChange('image', imagePath);
    }, []);

    // 提交文章
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, content, image, categoryId, selectedTags } = formData;

        // 添加详细的数据检查日志
        console.log('提交文章数据检查:', {
            title,
            description: description?.substring(0, 50) + '...', // 只显示前50个字符
            contentLength: content?.length,
            image,
            categoryId,
            selectedTags: selectedTags?.map(tag => ({
                id: tag.id,
                name: tag.name
            }))
        });

        if (!title || !content || !description || !categoryId) {
            handleChange('error', '请填写所有必填字段');
            return;
        }

        handleChange('loading', true);
        handleChange('error', '');

        try {
            const postData = {
                title,
                desc: description,
                content,
                image,
                categoryId: parseInt(categoryId),
                tags: selectedTags.map(tag => tag.id) // 确保只传递标签ID
            };

            // 添加发送到API的数据日志
            console.log('发送到API的数据:', postData);

            const response = await postsApi.createPost(postData);
            console.log('创建文章响应:', response);

            alert('文章发布成功！');
            router.push(`/posts/${response.slug}`);
        } catch (error) {
            console.error('创建文章失败:', error);
            handleChange('error', error.message || '创建文章失败，请重试');
        } finally {
            handleChange('loading', false);
        }
    };

    // 编辑器配置
    const mdEditorConfig = {
        view: { menu: true, md: true, html: true },
        canView: { menu: true, md: true, html: true, fullScreen: true, hideMenu: true },
        table: { maxRow: 5, maxCol: 6 },
        syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
    };

    // 渲染 Markdown 的函数
    const renderHTML = (text) => {
        return <MarkdownContent content={text} />;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>写文章</h1>
                <p className={styles.subtitle}>分享你的创作</p>
            </div>

            {formData.error && <div className={styles.error}>{formData.error}</div>}

            <div className={styles.formSection}>
                <div className={styles.mainInfo}>
                    {/* 标题输入 */}
                    <input
                        type="text"
                        placeholder="文章标题"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className={styles.input}
                    />

                    {/* 描述输入 */}
                    <textarea
                        placeholder="文章描述（简介）"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className={styles.description}
                        rows={3}
                    />

                    {/* 分类选择 */}
                    <div className={styles.categorySection}>
                        <h2 className={styles.sectionTitle}>选择分类</h2>
                        <select
                            value={formData.categoryId}
                            onChange={(e) => handleChange('categoryId', e.target.value)}
                            className={styles.select}
                        >
                            <option value="">选择分类...</option>
                            {formData.categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 标签选择 */}
                    <div className={styles.tagsSection}>
                        {formData.selectedTags.length > 0 && (
                            <div className={styles.selectedTags}>
                                {formData.selectedTags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className={styles.tag}
                                        onClick={() => handleRemoveTag(tag.id)}
                                    >
                                        {tag.name}
                                        <span className={styles.removeTag}>×</span>
                                    </span>
                                ))}
                            </div>
                        )}
                        <h2 className={styles.sectionTitle}>添加标签</h2>
                        <div className={styles.tagSearch}>
                            <input
                                type="text"
                                placeholder="搜索或创建标签..."
                                value={searchTag}
                                onChange={(e) => setSearchTag(e.target.value)}
                                onFocus={() => setIsTagDropdownOpen(true)}
                                className={styles.tagInput}
                            />
                            {isTagDropdownOpen && (
                                <div className={styles.tagDropdown} ref={dropdownRef}>
                                    {filteredTags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            className={styles.tagOption}
                                            onClick={() => handleTagSelect(tag)}
                                        >
                                            {tag.name}
                                        </div>
                                    ))}
                                    {searchTag && !formData.tags.find(tag => 
                                        tag.name.toLowerCase() === searchTag.toLowerCase()
                                    ) && (
                                        <div
                                            className={styles.createTag}
                                            onClick={() => handleCreateTag(searchTag)}
                                        >
                                            创建标签: {searchTag}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 图片上传部分 */}
                <div className={styles.imageSection}>
                    <h2 className={styles.sectionTitle}>封面图片</h2>
                    <UploadImage
                        onImageChange={handleImageChange}
                        initialImage={formData.image}
                    />
                </div>

                {/* Markdown 编辑器 */}
                <div className={styles.editorSection}>
                    <h2 className={styles.sectionTitle}>文章内容</h2>
                    <MdEditor
                        value={formData.content}
                        renderHTML={renderHTML}
                        onChange={handleEditorChange}
                        style={{ height: '500px' }}
                        config={mdEditorConfig}
                    />
                </div>

                {/* 发布按钮 */}
                <button
                    onClick={handleSubmit}
                    className={styles.publishButton}
                    disabled={
                        formData.loading ||
                        !formData.title ||
                        !formData.content ||
                        !formData.description ||
                        !formData.categoryId
                    }
                >
                    {formData.loading ? '发布中...' : '发布文章'}
                </button>
            </div>
        </div>
    );
}