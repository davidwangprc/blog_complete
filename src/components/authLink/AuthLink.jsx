"use client";

import React, { useState, useRef } from "react";
import styles from "./authLink.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/AuthProvider";

const AuthLink = () => {
    const [showWriteMenu, setShowWriteMenu] = useState(false);
    const router = useRouter();
    const writeMenuRef = useRef(null);
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <>
            {!user?.isAdmin ? (
                <Link href="/login" className={styles.link}>Login</Link>
            ) : (
                <>
                    <div className={styles.writeContainer} ref={writeMenuRef}>
                        <span
                            className={styles.writeLink}
                            onClick={() => setShowWriteMenu(!showWriteMenu)}
                        >
                            Create
                        </span>
                        {showWriteMenu && (
                            <div className={styles.writeMenu}>
                                <Link href="/writePost" className={styles.menuItem}>
                                    Post
                                </Link>
                                <Link href="/writeRecipe" className={styles.menuItem}>
                                    Recipe
                                </Link>
                            </div>
                        )}
                    </div>
                    <span className={styles.logoutButton} onClick={handleLogout}>
                        Logout
                    </span>
                </>
            )}
        </>
    );
};

export default AuthLink;

