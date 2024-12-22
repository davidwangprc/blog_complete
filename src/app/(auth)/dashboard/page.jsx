"use client";
import { useEffect } from 'react';
import { useAuth } from '@/provider/AuthProvider';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>欢迎回来，{user.name}</h1>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>用户信息</h2>
          <div className={styles.cardContent}>
            <p><strong>name:</strong> {user.name}</p>
            <p><strong>email:</strong> {user.email}</p>
            <p><strong>role:</strong> {user.isAdmin ? '管理员' : '用户'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 