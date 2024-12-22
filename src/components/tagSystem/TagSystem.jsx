"use client";

import { useState, useEffect } from 'react';
import styles from './tagSystem.module.css';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { tagsApi } from '@/lib/api';

const TagSystem = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTagId, setEditingTagId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categoryId: '',
    parentId: ''
  });

  // 获取标签系统数据
  useEffect(() => {
    fetchTagSystem();
  }, []);

  const fetchTagSystem = async () => {
    try {
      const data = await tagsApi.getTagCategory();
      if (!data) {
        throw new Error('未获取到数据');
      }
      console.log('获取到的标签数据:', data); // 添加日志
      setCategories(data);
    } catch (error) {
      console.error('获取标签系统失败:', error);
      // 可以添加用户提示
      alert('获取标签系统失败，请刷新页面重试');
    }
  };

  // 处理编辑标签
  const handleEdit = (tag) => {
    setFormData({
      name: tag.name,
      slug: tag.slug,
      categoryId: tag.categoryId,
      parentId: tag.parentId || ''
    });
    setEditingTagId(tag.id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  // 处理删除标签
  const handleDelete = async (tagId) => {
    if (!confirm('确定要删除这个标签吗？')) return;
    
    try {
      await tagsApi.deleteTag(tagId);
      fetchTagSystem(); // 刷新数据
    } catch (error) {
      console.error('删除标签失败:', error);
    }
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await tagsApi.updateTag(editingTagId, formData);
      } else {
        await tagsApi.createTag(formData);
      }
      setShowAddForm(false);
      setIsEditing(false);
      setEditingTagId(null);
      setFormData({
        name: '',
        slug: '',
        categoryId: '',
        parentId: ''
      });
      fetchTagSystem(); // 刷新数据
    } catch (error) {
      console.error(isEditing ? '更新标签失败:' : '创建标签失败:', error);
    }
  };

  // 处理取消编辑/添加
  const handleCancel = () => {
    setShowAddForm(false);
    setIsEditing(false);
    setEditingTagId(null);
    setFormData({
      name: '',
      slug: '',
      categoryId: '',
      parentId: ''
    });
  };

  // 修改渲染标签树函数
  const renderTagTree = (tags, level = 0) => {
    // 获取顶层标签
    const topLevelTags = level === 0 
      ? tags.filter(tag => !tag.parentId)
      : tags;

    return topLevelTags.map(tag => {
      // 查找当前标签的所有子标签
      const childTags = tags.filter(t => t.parentId === tag.id);
      
      return (
        <div 
          key={tag.id} 
          className={`${styles.tagItem} ${
            level === 0 ? styles.parentTag : styles.childTag
          }`}
        >
          <div className={styles.tagHeader}>
            <div className={styles.tagInfo}>
              <span className={styles.tagName}>
                {childTags.length > 0 ? '📁' : '📄'} {tag.name}
              </span>
              <span className={styles.tagSlug}>({tag.slug})</span>
            </div>
            <div className={styles.tagActions}>
              <button 
                className={styles.actionButton}
                onClick={() => handleEdit(tag)}
                title="编辑标签"
              >
                <FaEdit />
              </button>
              <button 
                className={styles.actionButton}
                onClick={() => handleDelete(tag.id)}
                title="删除标签"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          {childTags.length > 0 && (
            <div className={styles.childTags}>
              {renderTagTree(childTags, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  // 修改过滤标签函数
  const filterTags = (tags) => {
    if (!searchQuery) return tags;

    const matchedTags = new Set();
    
    // 遍历所有标签
    tags.forEach(tag => {
      const isMatch = 
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.description?.toLowerCase().includes(searchQuery.toLowerCase());

      if (isMatch) {
        // 添加匹配的标签
        matchedTags.add(tag);
        
        // 如果是子标签，添加其父标签
        if (tag.parentId) {
          const parent = tags.find(t => t.id === tag.parentId);
          if (parent) {
            matchedTags.add(parent);
          }
        }
        
        // 如果是父标签，添加其所有子标签
        const children = tags.filter(t => t.parentId === tag.id);
        children.forEach(child => matchedTags.add(child));
      }
    });

    return Array.from(matchedTags);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <input
            type="text"
            placeholder="搜索标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button 
            className={styles.addButton}
            onClick={() => {
              setIsEditing(false);
              setEditingTagId(null);
              setFormData({
                name: '',
                slug: '',
                categoryId: selectedCategory || '',
                parentId: ''
              });
              setShowAddForm(true);
            }}
          >
            <FaPlus /> 新建标签
          </button>
        </div>
        <div className={styles.categories}>
          {categories.map(category => (
            <div
              key={category.id}
              className={`${styles.category} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
              <span className={styles.tagCount}>
                {category.tags.length}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.content}>
        {selectedCategory && (
          <div className={styles.tagTree}>
            {renderTagTree(
              filterTags(categories.find(c => c.id === selectedCategory)?.tags || [])
            )}
          </div>
        )}
      </div>

      {showAddForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{isEditing ? '编辑标签' : '新建标签'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>标签名称:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>分类:</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  required
                >
                  <option value="">选择分类</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.submitButton}>
                  {isEditing ? '更新' : '创建'}
                </button>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSystem; 