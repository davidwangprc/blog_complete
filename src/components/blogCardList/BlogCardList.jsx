"use client";
import Card from "@/components/cardList/Card";
import styles from "./blogCardList.module.css";
import Link from "next/link";

/**
 * 空状态组件 - 当没有内容时显示
 */
function EmptyState() {
    return (
        <div className={styles.emptyContainer}>
            <div className={styles.emptyContent}>
                <h3 className={styles.emptyTitle}>暂无内容</h3>
                <p className={styles.emptyMessage}>还没有发布任何文章或菜谱</p>
            </div>
        </div>
    );
}

const BlogCardList = ({ items = [], showViewAll = true }) => {
    if (!items?.length) {
        return <EmptyState />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                {items.map((item) => (
                    <Card key={`${item.type}-${item.id}`} item={item} />
                ))}
            </div>
            
            {showViewAll && items.length >= 4 && (
                <Link href="/blog" className={styles.viewAll}>
                    查看全部
                </Link>
            )}
        </div>
    );
};

export default BlogCardList; 