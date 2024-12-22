// 日期格式化工具函数
export const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
};

// 获取分类样式变量的函数
export const getCategoryStyles = (categoryId) => {
    const colorVar = `var(--category-${categoryId}, var(--category-default))`;
    const textColorVar = `var(--category-${categoryId}-text, var(--category-default-text))`;
    return { colorVar, textColorVar };
}; 

export const compressImage = (file, options = {}) => {
    const {
        maxWidth = 800,
        maxHeight = 600,
        quality = 0.8,
        type = 'image/jpeg'
    } = options;

    return new Promise(async (resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // 计算缩放比例
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                // 直接返回 base64 字符串
                const base64String = canvas.toDataURL('image/jpeg', 0.6);
                resolve(base64String);
            };
            img.onerror = () => reject(new Error('图片加载失败'));
        };
        reader.onerror = () => reject(new Error('文件读取失败'));
    });
}; 
