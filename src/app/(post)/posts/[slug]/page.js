import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from "next/image";
import styles from "./singlePostPage.module.css";
import MarkdownContent from "@/components/markdownContent/MarkdownContent";
import { postsApi } from '@/lib/api';
import { formatDate } from '@/lib/utils'; // 导入 formatDate 函数
import { getCategoryStyles } from '@/lib/utils'; // 导入 getCategoryStyles 函数
import EditButton from '@/components/editButton/EditButton';

// 预生成静态参数
export async function generateStaticParams() {
    try {
        const slugs = await postsApi.getAllSlugs();
        return slugs.map((slug) => ({
            slug: slug,
        }));
    } catch (error) {
        console.error('获取文章 slugs 失败:', error);
        return [];
    }
}

// 获取文章数据
async function getPost(slug) {
    if (!slug) return null;

    try {
        const post = await postsApi.getPost(slug);
        // console.log('获取到的文章数据:', post);
        return post;
    } catch (error) {
        console.error('获取文章失败:', error);
        return null;
    }
}

// 生成元数据
export async function generateMetadata({ params }) {
    const resolvedParams = await Promise.resolve(params);
    const post = await getPost(resolvedParams.slug);

    if (!post) {
        console.log('元数据生成失败: 未找到文章数据');
        return {
            title: '文章不存在',
            description: '找不到请求的文章',
        };
    }

    const metadata = {
        title: post.title,
        description: post.description || post.title,
        categoryId: post.category?.id || 'default',
        openGraph: {
            title: post.title,
            description: post.description || post.title,
            images: post.image ? [post.image] : [],
        },
    };

    console.log('PostPage元数据title:', metadata.title);
    return metadata;
}

// 文章内容组件
function PostContent({ post }) {
    if (!post) return null;

    // 获取用户头像，使用默认值
    const userAvatar = post.author?.avatar || '/cover/user_cover01.png';
    const userName = post.author?.name || 'Unknown Author';

    // 使用通用函数获取分类样式变量
    const categoryId = post.category?.id || 'default';
    const { colorVar: categoryColorVar, textColorVar: categoryTextColorVar } = getCategoryStyles(categoryId);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.skeletonTitle}>
                    {/* 标题 */}
                    <h1 className={styles.title}>{post.title}</h1>
                    {/* 用户头像 */}
                    <div className={styles.user}>
                        {userAvatar && (
                            <div className={styles.userImageContainer}>
                                <Image
                                    src={userAvatar}
                                    alt={userName}
                                    fill
                                    className={styles.avatar}
                                />
                            </div>
                        )}
                        {/* 用户名 */}
                        <div className={styles.userTextContainer}>
                            <span className={styles.username}>{userName}</span>
                        </div>
                        {/* 日期 */}
                        <div className={styles.date}>
                            {formatDate(post.createdAt)}
                        </div>
                    </div>
                    <div className={styles.meta}>
                        {/* 分类 */}
                        <span
                            className={styles.category}
                            style={{
                                backgroundColor: categoryColorVar,
                                color: categoryTextColorVar,
                                borderColor: categoryColorVar
                            }}
                        >
                            {post.category?.title || '未分类'}
                        </span>
                        {/* 编辑按钮 */}
                        <div className={styles.editButton}>
                            <EditButton id={post.id} slug={post.slug} isRecipe={false} />
                        </div>
                    </div>
                    {/* 标签 */}
                    {post.tags && post.tags.length > 0 && (
                        <div className={styles.tags}>
                            {post.tags.map(tag => (
                                <span key={tag.id} className={styles.tag}>
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                {/* 图片内容 */}
                {post.image && (
                    <div className={styles.skeletonImage}>
                        <Image
                            src={post.image.startsWith('http') ? post.image : `/${post.image}`}
                            alt={post.title}
                            fill
                            className={styles.image}
                            priority
                        />
                    </div>
                )}
            </div>
            {/* 分割线 */}
            <div className={styles.line} />
            {/* 文章内容 */}
            <div className={styles.skeletonContent}>
                <div className={styles.content}>
                    <div className={styles.description}>
                        <p>{post.description}</p>
                    </div>
                    <div className={styles.markdownWrapper}>
                        <MarkdownContent content={post.content} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// 加载占位组件
function PostSkeleton() {
    return (
        <div className={styles.skeleton}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonContent} />
        </div>
    );
}

// 主页面组件
export default async function SinglePostPage({ params }) {
    const resolvedParams = await Promise.resolve(params);
    const post = await getPost(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <Suspense fallback={<PostSkeleton />}>
            <PostContent post={post} />
        </Suspense>
    );
}

