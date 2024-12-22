'use client';

import { useState, useEffect } from "react";
import styles from "../../writePost/writePost.module.css";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { FaImage, FaTimes } from 'react-icons/fa';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { postsApi, categoriesApi, uploadApi } from '@/lib/api';
import MarkdownContent from "@/components/markdownContent/MarkdownContent";

const EditPostPage = () => {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug;
    
    // 统一状态管理
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        image: "",
        categoryId: "",
        categories: [],
        selectedTags: [],
        uploading: false
    });

    // 加载文章数据
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await postsApi.getPost(slug);
                // console.log('获取到的文章数据:', data);
                
                setFormData(prev => ({
                    ...prev,
                    title: data.title || '',
                    description: data.description || '',
                    content: data.content || '',
                    image: data.image || '',
                    categoryId: data.category?.id?.toString() || '',
                    selectedTags: data.tags || []
                }));
            } catch (error) {
                console.error("Failed to fetch post:", error);
                router.push("/404");
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug, router]);

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
                console.error("Failed to fetch categories:", error);
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

    // 处理编辑器内容变化
    const handleEditorChange = ({ text }) => {
        handleChange('content', text);
    };

    // 处理图片上传
    const handleImageUpload = async (e) => {
        if (!e.target.files?.[0]) return;
        
        handleChange('uploading', true);
        try {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);

            const response = await uploadApi.uploadImage(formData);
            const data = await response.json();

            if (response.ok) {
                handleChange('image', data.filePath);
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            handleChange('uploading', false);
        }
    };

    // 处理标签移除
    const handleRemoveTag = (tagId) => {
        handleChange('selectedTags', 
            formData.selectedTags.filter(tag => tag.id !== tagId)
        );
    };

    // 更新文章
    const handleUpdate = async () => {
        const { title, description, content, categoryId } = formData;
        
        if (!title || !content || !description || !categoryId) {
            alert('请填写所有必填字段');
            return;
        }

        try {
            const postData = {
                title,
                content,
                description,
                image: formData.image || null,
                categoryId: parseInt(categoryId),
                tags: formData.selectedTags.map(tag => tag.id)
            };

            await postsApi.updatePost(slug, postData);
            router.push(`/posts/${slug}`);
        } catch (error) {
            console.error("Failed to update:", error);
            alert("更新失败");
        }
    };

    // 编辑器配置
    const mdEditorConfig = {
        view: { menu: true, md: true, html: true },
        canView: { menu: true, md: true, html: true, fullScreen: true, hideMenu: true },
        table: { maxRow: 5, maxCol: 6 },
        syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
    };

    if (!formData.title) {
        return <div className={styles.loading}>加载中...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>编辑文章</h1>
                <p className={styles.subtitle}>修改你的创作</p>
            </div>

            <div className={styles.formSection}>
                <div className={styles.mainInfo}>
                    {/* 标题输入 */}
                    <input 
                        type="text" 
                        placeholder="标题" 
                        className={styles.input}
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                    
                    {/* 描述输入 */}
                    <textarea
                        placeholder="文章描述（简介）"
                        className={styles.description}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
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
                    </div>
                </div>

                {/* 图片上传部分 */}
                <div className={styles.imageSection}>
                    <h2 className={styles.sectionTitle}>封面图片</h2>
                    <div className={styles.imageUpload}>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        <label htmlFor="image" className={styles.uploadButton}>
                            {formData.uploading ? (
                                <span>上传中...</span>
                            ) : (
                                <>
                                    <FaImage className={styles.uploadIcon} />
                                    <span>更换封面图片</span>
                                </>
                            )}
                        </label>

                        {formData.image && (
                            <div className={styles.imagePreview}>
                                <Image
                                    src={formData.image.startsWith('http') ? formData.image : `/${formData.image}`}
                                    alt="预览"
                                    width={200}
                                    height={100}
                                    style={{ objectFit: 'cover' }}
                                />
                                <button 
                                    className={styles.removeImage}
                                    onClick={() => handleChange('image', '')}
                                >
                                    <FaTimes />
                                    移除图片
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Markdown 编辑器 */}
                <div className={styles.editorSection}>
                    <h2 className={styles.sectionTitle}>文章内容</h2>
                    <MdEditor
                        value={formData.content}
                        renderHTML={text => <MarkdownContent content={text} />}
                        onChange={handleEditorChange}
                        style={{ height: '500px' }}
                        config={mdEditorConfig}
                    />
                </div>

                {/* 更新按钮 */}
                <button 
                    className={styles.publishButton} 
                    onClick={handleUpdate}
                    disabled={
                        !formData.title || 
                        !formData.content || 
                        !formData.description || 
                        !formData.categoryId
                    }
                >
                    更新文章
                </button>
            </div>
        </div>
    );
};

export default EditPostPage;
