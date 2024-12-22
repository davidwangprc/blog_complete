"use client";

import { FaUpload, FaLink, FaImage, FaTimes } from 'react-icons/fa';
import styles from './uploadImage.module.css';
import { useState, useEffect } from 'react';
import { uploadApi } from '@/lib/api';
import Image from 'next/image';

export default function UploadImage({ onImageChange, initialImage }) {
    // 图片上传类型
    const [imageType, setImageType] = useState("upload"); // "upload" 或 "url"
    // 图片上传URL
    const [imageUrl, setImageUrl] = useState("");
    // 图片上传路径
    const [image, setImage] = useState(initialImage || "");
    // 图片上传状态
    const [uploading, setUploading] = useState(false);
    // 图片预览位置
    const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 }); // 默认居中
    // 图片预览尺寸
    const [previewSize, setPreviewSize] = useState({ width: 200, height: 100 }); 
    // 是否正在编辑预览尺寸
    const [isEditingSize, setIsEditingSize] = useState(false); 
    // 是否正在加载图片
    const [isImageLoading, setIsImageLoading] = useState(true);

    // 在图片更新时通知父组件
    useEffect(() => {
        if (onImageChange) {
            onImageChange(image);
        }
    }, [image, onImageChange]);

    // 本地图片上传函数
    const handleImageUpload = async (e) => {
        // 检查是否选择了文件，如果没有选择文件，则返回
        if (!e.target.files?.[0]) return;

        // 设置上传状态为true
        setUploading(true);
        
        try {
            // 创建一个新的 FormData 对象，用于存储要上传的文件
            const formData = new FormData();
            // 将选择的文件添加到 FormData 对象中，键名为 "file"
            formData.append("file", e.target.files[0]);
            // 调用上传 API，将 FormData 发送到服务器
            const res = await uploadApi.uploadImage(formData);
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "上传失败");
            }
            
            const data = await res.json();
            if (data.filePath) {
                setImage(data.filePath);
                // 清空路径
                setImageUrl("");
                // 不需要显式调用onImageChange，因为useEffect会处理
            } else {
                throw new Error("未返回文件路径");
            }
        } catch (error) {
            console.error("上传图片错误:", error);
            alert(error.message || "图片上传失败，请重试");
        } finally {
            setUploading(false);
        }
    };
    // 在线图片上传函数
    const handleImageUrlSubmit = () => {
        // 检查是否输入了URL，如果没有输入URL，则返回
        if (!imageUrl.trim()) return;

        // 验证URL格式
        try {
            new URL(imageUrl);
        } catch (e) {
            alert("请输入有效的图片URL");
            return;
        }

        // 验证是否是图片URL
        const isImageUrl = imageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        if (!isImageUrl) {
            alert("请输入有效的图片URL（支持jpg、jpeg、png、gif、webp格式）");
            return;
        }

        // 验证是否来自允许的域名
        const allowedDomains = [
            'image.civitai.com',
            'images.unsplash.com',
            'i.imgur.com',
            'picsum.photos',
            'via.placeholder.com',
            'raw.githubusercontent.com'
        ];

        const urlObject = new URL(imageUrl);
        if (!allowedDomains.includes(urlObject.hostname)) {
            alert(`不支持的图片域名。支持的域名包括：\n${allowedDomains.join('\n')}`);
            return;
        }

        setImage(imageUrl);
    };


    return (
        <div className={styles.imageSection}>
            <h2 className={styles.sectionTitle}>封面图片</h2>
            <div className={styles.imageUpload}>
                <div > {/* 上传图片类型切换 */}
                    <button
                        className={`${styles.switchBtn} ${imageType === "upload" ? styles.active : ""}`}
                        onClick={() => setImageType("upload")}
                    >
                        < FaUpload className={styles.btnIcon} />
                        <span>本地上传</span>
                    </button>
                    <button
                        className={`${styles.switchBtn} ${imageType === "url" ? styles.active : ""}`}
                        onClick={() => setImageType("url")}
                    >
                        <FaLink className={styles.btnIcon} />
                        <span>URL链接</span>
                    </button>
                </div>
                {/* 本地上传图片 */}  {/* 在线图片上传 */}
                {imageType === "upload" ? (
                    <>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        <label htmlFor="image" className={`${styles.uploadButton} ${uploading ? styles.uploading : ''}`}>
                            {uploading ? (
                                <span>上传中...请稍候</span>
                            ) : (
                                <>
                                    <FaImage className={styles.uploadIcon} />
                                    <span>点击上传封面图片</span>
                                </>
                            )}
                        </label>
                    </>
                ) : (
                    <div className={styles.urlInput}>
                        <div className={styles.urlInputWrapper}>
                            <FaLink className={styles.urlIcon} />
                            <input
                                type="text"
                                placeholder="输入图片URL (支持jpg、jpeg、png、gif、webp)"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className={styles.urlField}
                            />
                        </div>
                        <button
                            onClick={handleImageUrlSubmit}
                            className={styles.urlSubmit}
                            disabled={!imageUrl.trim()}
                        >
                            <FaUpload className={styles.submitIcon} />
                            <span>确认</span>
                        </button>
                    </div>
                )}
                {/* 图片预览 */}
                {image && (
                    <div className={styles.imagePreview}>
                        <div className={styles.previewControls}>
                            <div className={styles.positionControl}>
                                <label>图片位置:</label>
                                <div className={styles.sliderGroup}>
                                    <div className={styles.sliderContainer}>
                                        <span>X轴: {imagePosition.x}%</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={imagePosition.x}
                                            onChange={(e) => setImagePosition(prev => ({
                                                ...prev,
                                                x: parseInt(e.target.value)
                                            }))}
                                            className={styles.slider}
                                        />
                                    </div>
                                    <div className={styles.sliderContainer}>
                                        <span>Y轴: {imagePosition.y}%</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={imagePosition.y}
                                            onChange={(e) => setImagePosition(prev => ({
                                                ...prev,
                                                y: parseInt(e.target.value)
                                            }))}
                                            className={styles.slider}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.sizeControl}>
                                <label>预览尺寸:</label>
                                {isEditingSize ? (
                                    <div className={styles.sizeInputs}>
                                        <input
                                            type="number"
                                            value={previewSize.width}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 0;
                                                // 添加尺寸限制
                                                if (value >= 50 && value <= 800) {
                                                    setPreviewSize(prev => ({
                                                        ...prev,
                                                        width: value
                                                    }));
                                                }
                                            }}
                                            min="50"
                                            max="800"
                                            placeholder="宽度"
                                        />
                                        <span>x</span>
                                        <input
                                            type="number"
                                            value={previewSize.height}
                                            onChange={(e) => setPreviewSize(prev => ({
                                                ...prev,
                                                height: parseInt(e.target.value) || 0
                                            }))}
                                            min="50"
                                            max="800"
                                            placeholder="高度"
                                        />
                                        <button
                                            onClick={() => setIsEditingSize(false)}
                                            className={styles.confirmSize}
                                        >
                                            确认
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEditingSize(true)}
                                        className={styles.editSize}
                                    >
                                        {previewSize.width} x {previewSize.height}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div
                            className={styles.thumbImageContainer}
                            style={{
                                width: previewSize.width,
                                height: previewSize.height
                            }}
                        >
                            <Image
                                src={image.startsWith('http') ? image : `/${image}`}
                                alt="预览"
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: `${imagePosition.x}% ${imagePosition.y}%`
                                }}
                                priority
                                loader={({ src }) => {
                                    if (src.startsWith('http')) {
                                        return src;
                                    }
                                    return `${process.env.NEXT_PUBLIC_DOMAIN || ''}${src}`;
                                }}
                                onError={(e) => {
                                    console.error('图片加载失败:', e);
                                    e.target.src = '/default-image.png';
                                }}
                                onLoadingComplete={() => setIsImageLoading(false)}
                            />
                            {isImageLoading && <div className={styles.loadingOverlay}>加载中...</div>}
                        </div>
                        <button
                            className={styles.removeImage}
                            onClick={() => {
                                setImage("");
                                setImageUrl("");
                                setImagePosition({ x: 50, y: 50 });
                                setPreviewSize({ width: 200, height: 200 });
                                setIsEditingSize(false);
                            }}
                        >
                            <FaTimes className={styles.removeIcon} />
                            <span>移除图片</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}