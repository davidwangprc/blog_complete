"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { getSession } from "@/lib/session";

/**
 * @typedef {import('@/lib/definitions').User} User
 */

const AuthContext = createContext();

/**
 * 认证上下文提供者组件
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const AuthProvider = ({ children }) => {
    /** @type {[User|null, React.Dispatch<React.SetStateAction<User|null>>]} */
    const [user, setUser] = useState(null);

    // 组件加载时检查会话状态
    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await getSession();
                if (session) {
                    setUser({
                        id: session.userId,
                        name: session.name,
                        email: session.email,
                        isAdmin: session.isAdmin
                    });
                }
            } catch (error) {
                console.error("获取会话失败:", error);
            }
        };
        checkSession();
    }, []);

    /**
     * 用户登录
     * @param {string} identifier - 用户邮箱或用户名
     * @param {string} password - 用户密码
     */
    const login = async (identifier, password) => {
        try {
            const formData = new FormData();
            formData.append('email', identifier);
            formData.append('password', password);

            const response = await fetch("/api/auth?action=login", {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            const data = await response.json();

            if (data.message === 'success') {
                // 登录成功后获取会话信息
                const session = await getSession();
                if (session) {
                    setUser({
                        id: session.userId,
                        name: session.name,
                        email: session.email,
                        isAdmin: session.isAdmin
                    });
                }
                return { success: true };
            } else {
                return { 
                    success: false, 
                    error: data.error || '登录失败' 
                };
            }
        } catch (error) {
            console.error("登录失败:", error);
            return { success: false, error: "登录失败" };
        }
    };

    /**
     * 用户登出
     */
    const logout = async () => {
        try {
            await fetch("/api/auth?action=logout", {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error("登出失败:", error);
        }
    };

    /**
     * 用户注册
     * @param {string} name - 用户名
     * @param {string} email - 用户邮箱
     * @param {string} password - 用户密码
     */
    const signup = async (name, email, password) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch("/api/auth?action=signup", {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            const data = await response.json();

            if (data.message === 'success') {
                // 注册成功后获取会话信息
                const session = await getSession();
                if (session) {
                    setUser({
                        id: session.userId,
                        name: session.name,
                        email: session.email,
                        isAdmin: session.isAdmin
                    });
                }
                return { success: true };
            } else {
                return { 
                    success: false, 
                    error: data.error || '注册失败' 
                };
            }
        } catch (error) {
            console.error("注册失败:", error);
            return { success: false, error: "注册失败" };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * 使用认证上下文的钩子
 * @returns {{ 
 *   user: User|null, 
 *   login: (identifier: string, password: string) => Promise<{success: boolean, error?: string}>,
 *   logout: () => Promise<void>,
 *   signup: (name: string, email: string, password: string) => Promise<{success: boolean, error?: string}>
 * }}
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth 必须在 AuthProvider 内部使用");
    }
    return context;
}; 