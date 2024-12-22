"use client";
import { useState } from 'react';
import { useAuth } from '@/provider/AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './signup.module.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await signup(name, email, password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || '注册失败');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>注册新账号</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>姓名</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>邮箱</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
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
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            注册
          </button>
        </form>
        <p className={styles.loginText}>
          已有账号？
          <Link href="/login" className={styles.loginLink}>
            立即登录
          </Link>
        </p>
      </div>
    </div>
  );
} 