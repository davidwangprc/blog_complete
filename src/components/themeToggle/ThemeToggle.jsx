"use client";

import Image from "next/image";
import styles from "./themeToggle.module.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";



const ThemeToggle = () => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 基础路径配置
  const LOGO_PATH = "/cover";

  // 避免服务端渲染不匹配
  useEffect(() => {
    setMounted(true);
    console.log('ThemeToggle mounted, initial theme:', theme);
  }, [theme]);

  useEffect(() => {
    console.log('Theme changed:', {
      theme,
      systemTheme,
      resolvedTheme,
      htmlClass: document.documentElement.className,
      htmlDataTheme: document.documentElement.getAttribute('data-theme')
    });
  }, [theme, systemTheme, resolvedTheme]);

  if (!mounted) {
    return null;
  }

  // 获取当前实际主题
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    console.log('Toggling theme:', { from: currentTheme, to: newTheme });
    setTheme(newTheme);
  };

  return (
    <div
      className={`${styles.container} ${currentTheme === 'dark' ? styles.dark : styles.light}`}
      onClick={toggleTheme}
    >
      <Image src={`${LOGO_PATH}/moon.png`} alt="暗色模式" width={14} height={14} className={styles.icon} />
      <div
        className={`${styles.ball} ${currentTheme === 'dark' ? styles.darkBall : styles.lightBall}`}
      ></div>
      <Image src={`${LOGO_PATH}/sun.png`} alt="亮色模式" width={14} height={14} className={styles.icon} />
    </div>
  );
};

export default ThemeToggle;