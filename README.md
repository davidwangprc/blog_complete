# Next.js 项目架构说明

这是一个使用 [Next.js](https://nextjs.org) 构建的现代化 Web 应用项目。

## 项目结构

### 根目录结构
- `/src`: 源代码目录
- `/public`: 静态资源目录
- 配置文件（next.config.mjs, package.json等）

### src目录结构
- `/app`: Next.js 13+ 的应用路由目录
- `/components`: 可复用组件目录

### 主要配置文件
- `package.json`: 项目依赖和脚本配置
- `next.config.mjs`: Next.js 特定配置
- `tailwind.config.js`: Tailwind CSS 配置
- `postcss.config.mjs`: PostCSS 配置
- `.eslintrc.json`: ESLint 配置

## 路径别名使用指南

### 路径别名说明
在本项目中，我们使用 `@` 作为路径别名（alias）来引用 `src` 目录下的文件，这样可以避免使用复杂的相对路径。

### 使用示例
```javascript
// ✅ 推荐使用路径别名
import { AuthProvider } from "@/provider/AuthProvider";
import Navbar from "@/components/navBar/NavBar";

// ❌ 不推荐使用相对路径
import { AuthProvider } from "../provider/AuthProvider";
import Navbar from "../components/navBar/NavBar";
```

### 路径别名的优势
1. **可读性更好**：使用 `@` 别名可以清晰地表明是从项目根目录开始的用
2. **可维护性更强**：当文件位置改变时，不需要修改引用路径
3. **避免路径混乱**：不需要使用多层 `../` 的相对路径
4. **IDE 支持**：现代编辑器对路径别名有良好的支持和自动补全

### 使用规则
- 使用 `@/` 引用 src 目录下的文件
- 对于同级目录的文件，可以继续使用 `./` 
- 第三方包的引用保持原有的引用方式

## 开发指南

### 开发流程
1. 启动开发服务器：
   
