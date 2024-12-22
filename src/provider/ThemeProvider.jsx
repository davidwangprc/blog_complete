"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useState, useEffect } from "react";

const ThemeProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // 在客户端挂载后设置 mounted 为 true
  useEffect(() => {
    setMounted(true);
  }, []);

  // 在组件挂载前返回 null 或占位内容
  if (!mounted) {
    return null; // 或者返回一个加载占位符
  }
  
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;