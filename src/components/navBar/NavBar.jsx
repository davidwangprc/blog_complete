"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import Image from "next/image";
import { useAuth } from '@/provider/AuthProvider';
import styles from './navbar.module.css';
import { FaCode } from "react-icons/fa";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import AuthLink from "@/components/authLink/AuthLink";

export default function NavBar() {
    const { user, logout } = useAuth();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showWriteMenu, setShowWriteMenu] = useState(false);
    const writeMenuRef = useRef(null);
    const router = useRouter();

    // 基础路径配置
    const LOGO_PATH = "/cover";

    // 图标配置
    const logos = {
            civitai: {
                light: `${LOGO_PATH}/logo_civitai_dark.png`,
                dark: `${LOGO_PATH}/logo_civitai_light.png`
            },
        youtube: {
            light: `${LOGO_PATH}/logo_youtube_dark.png`,
            dark: `${LOGO_PATH}/logo_youtube_light.png`
        },
        github: {
            light: `${LOGO_PATH}/logo_github_dark.png`,
            dark: `${LOGO_PATH}/logo_github_light.png`
        },
        bilibili: {
            light: `${LOGO_PATH}/logo_bilibili_dark.png`,
            dark: `${LOGO_PATH}/logo_bilibili_light.png`
        },
        ollama: {
            light: `${LOGO_PATH}/logo_ollama_dark.png`,
            dark: `${LOGO_PATH}/logo_ollama_light.png`
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    // 添加点击外部关闭菜单的处理
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (writeMenuRef.current && !writeMenuRef.current.contains(event.target)) {
                setShowWriteMenu(false);
            }
        };

        // 添加全局点击事件监听
        document.addEventListener('click', handleClickOutside);

        // 清理函数
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // 添加菜单项点击处理函数
    const handleMenuItemClick = () => {
        setShowWriteMenu(false);
    };

    if (!mounted) {
        return null;
    }

    return (
        <nav className={styles.container}>
            {/* 左侧图标组 */}
            <div className={styles.icons}>
                <div className={styles.iconGroup}>
                    {Object.entries(logos).map(([name, paths]) => (
                        <Image
                            key={name}
                            src={theme === 'dark' ? paths.dark : paths.light}
                            alt={name}
                            width={20}
                            height={20}
                            className={styles.iconImage}
                        />
                    ))}
                </div>
                <ThemeToggle />
            </div>

            {/* 中间 Logo */}
            <div className={styles.logoContainer}>
                <FaCode className={styles.logoIcon} />
                <div className={styles.logoText}>
                    <span className={styles.logoMain}>MyApp</span>
                    <span className={styles.logoSub}>Code & Share</span>
                </div>
            </div>

            {/* 右侧导航链接 */}
            <div className={styles.links}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/test" className={styles.link}>Test</Link>
                <Link href="/search" className={styles.link}>Search</Link>
                <Link href="/tagsystem" className={styles.link}>Tag System</Link>

                {/* 认证部分 */}
                <AuthLink />
            </div>
        </nav>
    );
}
