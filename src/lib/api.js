/**
 * API 工具函数
 */

// 获取当前环境的 API 基础 URL
export const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const nodeEnv = process.env.NODE_ENV;
  
  // console.log("[API 环境信息]:", {
  //   apiUrl,
  //   nodeEnv,
  //   defaultUrl: process.env.NEXT_PUBLIC_DOMAIN
  // });

  // 如果没有配置 API URL，使用默认值
  if (!apiUrl) {
    const defaultUrl = nodeEnv === 'production' 
      ? 'http://192.168.3.54:8080'
      : 'http://localhost:3000';
    console.warn(`[API URL 未配置] 使用默认值: ${defaultUrl}`);
    return defaultUrl;
  }

  return apiUrl;
};

// 通用的 API 请求函数
export const fetchApi = async (url, options) => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}${url}`, options);
  // 检查响应状态
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // 解析响应数据
  const data = await response.json();
  return data;
};


// 分类相关 API
export const categoriesApi = {
  // 获取所有分类
  getCategories: async () => {
    try {
      // 调用 fetchApi 发起 GET 请求到 '/api/categories' 端点
      const data = await fetchApi('/api/categories');
      
      // 验证返回的数据是否为数组
      // 如果是数组则返回原数据，如果不是则返回空数组
      // 这样保证了返回值始终是一个数组类型
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      // 如果在请求过程中发生任何错误（网络错误、服务器错误等）
      // 将错误信息打印到控制台，便于调试
      console.error('获取分类失败:', error);
      
      // 发生错误时返回空数组，确保调用方始终能得到一个有效的数组
      return [];
    }
  },

  // 获取单个分类
  getCategory: (id) => fetchApi(`/api/categories/${id}`),
};

// 文章相关 API
export const postsApi = {
  // 获取所有文章详情
  getPosts: () => fetchApi('/api/posts'),

  // 获取所有文章的slug
  getAllSlugs: () => fetchApi('/api/posts/slugs'),

  // 获取单篇文章详情
  getPost: (slug) => fetchApi(`/api/posts/${slug}`),

  // 获取文章数量
  countPosts: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetchApi(`/api/posts/count${queryString ? `?${queryString}` : ''}`);
      return response.count;
    } catch (error) {
      console.error('获取文章数量失败:', error);
      return 0;
    }
  },

  // 创建文章
  createPost: async (data) => {
    console.log('postsApi.createPost 发送数据:', data);
    const response = await fetchApi('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    console.log('postsApi.createPost 响应:', response);
    return response;
  },

  // 更新文章
  updatePost: (slug, data) => fetchApi(`/api/posts/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // 删除文章
  deletePost: (slug) => fetchApi(`/api/posts/${slug}`, {
    method: 'DELETE'
  })
};

// 菜谱相关 API
export const recipesApi = {
  // 获取菜谱列表的异步函数
  getRecipes: async () => {
    try {
      // 记录开始获取数据的日志
      // console.log('[开始获取菜谱列表]');
      
      // 调用 fetchApi 发起 GET 请求到 '/api/recipes' 端点
      const data = await fetchApi('/api/recipes');
        
      // 验证返回的数据格式
      // 1. 如果返回的直接是数组，则使用该数组
      // 2. 如果返回的是包含 recipes 属性的对象，则使用 recipes 数组
      // 3. 其他情况返回空数组
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.recipes)) {
        return data.recipes;
      } else {
        console.warn('[菜谱列表格式不正确]:', data);
        return [];
      }
      
    } catch (error) {
      // 如果发生错误，记录详细的错误信息
      console.error('[获取菜谱列表失败]:', {
        error: error.message,
        stack: error.stack
      });
      // 发生错误时返回空数组
      return [];
    }
  },

  // 获取菜谱数量
  countRecipes: async () => {
    try {
      console.log('[开始获取菜谱数量]');
      const response = await fetchApi('/api/recipes/count');
      console.log('[菜谱数量响应]:', response);
      return response?.count || 0;
    } catch (error) {
      console.error('[获取菜谱数量失败]:', error);
      return 0;
    }
  },

  // 获取单个菜谱
  getRecipe: async (slug) => {
    try {
      const data = await fetchApi(`/api/recipes/${slug}`);
      return data;
    } catch (error) {
      console.error(`[获取菜谱失败] slug: ${slug}:`, error);
      return null;
    }
  },

  // 创建菜谱
  writeRecipe: async (data) => {
    try {
      console.log('[开始创建菜谱] 请求数据:', data);
      const response = await fetchApi('/api/recipes', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      console.log('[创建菜谱成功] 响应:', response);
      return response;
    } catch (error) {
      console.error('[创建菜谱失败]:', error);
      throw error;
    }
  },

  // 更新菜谱
  updateRecipe: async (slug, data) => {
    try {
      console.log(`[开始更新菜谱] slug: ${slug}`, data);
      const response = await fetchApi(`/api/recipes/${slug}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      console.log('[更新菜谱响应]:', response);
      return response;
    } catch (error) {
      console.error(`[更新菜谱失败] slug: ${slug}:`, error);
      throw error;
    }
  },

  // 删除菜谱
  deleteRecipe: async (slug) => {
    try {
      console.log(`[开始删除菜谱] slug: ${slug}`);
      const response = await fetchApi(`/api/recipes/${slug}`, {
        method: 'DELETE'
      });
      console.log('[删除菜谱响应]:', response);
      return response;
    } catch (error) {
      console.error(`[删除菜谱失败] slug: ${slug}:`, error);
      throw error;
    }
  },

  // 获取所有菜谱的 slug
  getAllSlugs: async () => {
    try {
      const data = await fetchApi('/api/recipes/slugs');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('[获取菜谱 slugs 失败]:', error);
      return [];
    }
  }
};

// 食材相关 API
export const ingredientsApi = {
  // 获取所有食材
  getIngredients: () => fetchApi('/api/ingredients'),
  
  // 获取热门食材
  getPopularIngredients: () => fetchApi('/api/ingredients/popular'),
};

// 图片上传 API
export const uploadApi = {
  uploadImage: (formData) => {
    const options = {
      method: 'POST',
      body: formData,  // 直接传递FormData对象
      headers: {}  // 不设置Content-Type，让浏览器自动设置
    };
    return fetch('/api/upload', options);  // 直接使用fetch，跳过fetchApi
  }
};

// 认证相关 API
export const authApi = {
  // 登录
  login: (credentials) => fetchApi('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(credentials)
  }),

  // 登出
  logout: () => fetchApi('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  })
};

// 标签相关 API
export const tagsApi = {
  // 获取所有标签
  getTags: () => fetchApi('/api/tags'),

  // 创建新标签
  createTag: (data) => fetchApi('/api/tags', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getTagCategory: () => fetchApi('/api/tags/categories'),
  createTagCategory: (data) => fetchApi('/api/tags/categories', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // 获取热门标签
  getPopularTags: () => fetchApi('/api/tags/popular'),
  // 更新标签
  updateTag: (id, data) => fetchApi(`/api/tags/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  // 删除标签
  deleteTag: (id) => fetchApi(`/api/tags/${id}`, {
    method: 'DELETE'
  })
};

// 图片 URL 处理函数
export const getImageUrl = (path) => {
  if (!path) return '';
  
  // 外部 URL
  if (path.startsWith('http')) {
    return path;
  }

  // 规范化路径（处理 Windows 反斜杠和多余的斜杠）
  const normalizedPath = path
    .replace(/\\/g, '/')     // 替换反斜杠
    .replace(/^\/+/, '')     // 移除开头的所有斜杠
    .replace(/\/+/g, '/');   // 将多个斜杠替换为单个斜杠

  // 区分不同类型的图片
  if (normalizedPath.startsWith('uploads/')) {
    // 上传的图片需要完整域名
    return `${process.env.NEXT_PUBLIC_DOMAIN}/${normalizedPath}`;
  }

  if (normalizedPath.startsWith('bookmarks-icon/')) {
    // 静态图片直接使用相对路径
    return `/${normalizedPath}`;
  }

  // 其他静态资源
  return `/${normalizedPath}`;
};

// 搜索相关 API
export const searchApi = {
  // 获取所有标签
  getTags: () => fetchApi('/api/tags'),
  
  // 获取所有食材
  getAllIngredients: () => fetchApi('/api/ingredients'),
  
  // 搜索
  search: async (params) => {
    try {
      return await fetchApi(`/api/search?${params.toString()}`);
    } catch (error) {
      console.error('搜索失败:', error);
      return []; // 搜索失败时返回空数组
    }
  }
};

// 书签相关 API
export const bookmarksApi = {
  // 获取书签分类
  getCategories: () => fetchApi('/api/bookmarks/categories'),

  // 获取书签列表
  getBookmarks: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/bookmarks${queryString ? `?${queryString}` : ''}`;
    return await fetchApi(url);
  },

  // 获取书签数量
  countBookmarks: async () => {
    try {
      const response = await fetchApi('/api/bookmarks/count');
      return response.count;
    } catch (error) {
      console.error('获取书签数量失败:', error);
      return 0;
    }
  },
  // 创建书签
  createBookmark: async (data) => {
    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create bookmark');
    }
    
    return response;
  },

  // 更新书签
  updateBookmark: (id, data) => fetchApi(`/api/bookmarks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // 删除书签
  deleteBookmark: (id) => fetchApi(`/api/bookmarks/${id}`, {
    method: 'DELETE'
  })
};

