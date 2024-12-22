"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './editButton.module.css';
import { useAuth } from '@/provider/AuthProvider';

// 编辑按钮
const EditButton = ({ id, slug, isRecipe }) => {
  const router = useRouter();
  const { user } = useAuth();


  const handleEdit = () => {
    router.push(isRecipe ? `/editRecipe/${slug}` : `/editPost/${slug}`);
  };

  if (!user?.isAdmin) return <div>你不是管理员</div>;

  return (
    <button className={styles.editButton} onClick={handleEdit}>
      {isRecipe ? '编辑菜谱' : '编辑文章'}
    </button>
  );
};

export default EditButton; 