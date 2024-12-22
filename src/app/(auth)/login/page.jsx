"use client";
import { useState } from 'react';
import { useAuth } from '@/provider/AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await login(identifier, password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || '登录失败');
      }
    } catch (error) {
      setError(error.message || '登录失败');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>登录</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="identifier" className={styles.label}>
              用户名或邮箱
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={styles.input}
              placeholder="请输入用户名或邮箱"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>密码</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="请输入密码"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            登录
          </button>
        </form>
        <p className={styles.signupText}>
          还没有账号？
          <Link href="/signup" className={styles.signupLink}>
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
} 