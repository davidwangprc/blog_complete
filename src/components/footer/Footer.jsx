"use client";

import React, { useState, useEffect } from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { categoriesApi } from "@/lib/api";
import { useAuth } from "@/provider/AuthProvider";

const Footer = () => {
  const { theme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // 基础路径配置
  const LOGO_PATH = "/cover";
  
  // 图标配置
  const socialLinks = [
    {
      name: 'civitai',
      url: 'https://www.civitai.com/',
      icons: {
        light: `${LOGO_PATH}/logo_civitai_dark.png`,
        dark: `${LOGO_PATH}/logo_civitai_light.png`
      }
    },
    {
      name: 'youtube',
      url: 'https://www.youtube.com/',
      icons: {
        light: `${LOGO_PATH}/logo_youtube_dark.png`,
        dark: `${LOGO_PATH}/logo_youtube_light.png`
      }
    },
    {
      name: 'github',
      url: 'https://github.com/',
      icons: {
        light: `${LOGO_PATH}/logo_github_dark.png`,
        dark: `${LOGO_PATH}/logo_github_light.png`
      }
    },
    {
      name: 'bilibili',
      url: 'https://www.bilibili.com/',
      icons: {
        light: `${LOGO_PATH}/logo_bilibili_dark.png`,
        dark: `${LOGO_PATH}/logo_bilibili_light.png`
      }
    },
    {
      name: 'ollama',
      url: 'https://ollama.ai/',
      icons: {
        light: `${LOGO_PATH}/logo_ollama_dark.png`,
        dark: `${LOGO_PATH}/logo_ollama_light.png`
      }
    }
  ];

  // 获取分类数据
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('获取分类失败:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <Image
              src={`${LOGO_PATH}${theme === 'dark' ? '/david-logo_light.png' : '/david-logo_dark.png'}`}
              alt="logo"
              width={50}
              height={50}
            />
            <span className={styles.logoText}>David Blog</span>
          </div>
          <p className={styles.desc}>
            探索、创造、分享。这里是我的个人博客，记录技术探索、生活感悟和创意想法。
          </p>
          <div className={styles.icons}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <Image
                  src={theme === 'dark' ? link.icons.dark : link.icons.light}
                  alt={link.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.list}>
            <span className={styles.listTitle}>categories</span>
            {loading ? (
              <span>Loading...</span>
            ) : error ? (
              <span className={styles.error}>{error}</span>
            ) : (
              categories.map((cat) => (
                <Link key={cat.id} href={`/blog?cat=${cat.slug}`}>
                  {cat.title}
                </Link>
              ))
            )}
          </div>
          <div className={styles.list}>
            <span className={styles.listTitle}>social</span>
            <Link href="https://github.com">Github</Link>
            <Link href="https://youtube.com">Youtube</Link>
            <Link href="https://bilibili.com">Bilibili</Link>
            <Link href="https://ollama.ai">Ollama</Link>
            <Link href="https://civitai.com">Civitai</Link>
            <Link href="https://chatgpt.com">ChatGPT</Link>
          </div>
          <div className={styles.list}>
            <span className={styles.listTitle}>navigation</span>
            <Link href="/">home</Link>
            <Link href="/tag-system">tag system</Link>
            <Link href="/search">search</Link>
            <Link href="/bookmarks">bookmarks</Link>
            <Link href="/about">about</Link>
            { user && <Link href="/dashboard">dashboard</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;