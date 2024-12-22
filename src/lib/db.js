import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// 导出 Prisma 客户端实例
export default prisma;

/**
 * 验证用户登录
 * @param {Object} credentials - 用户凭据
 * @param {string} credentials.email - 用户邮箱
 * @param {string} credentials.password - 用户密码
 * @returns {Promise<User>} 返回用户信息
 */
export async function validateUser(credentials) {
  try {
    // 查找用户（支持邮箱或用户名登录）
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: credentials.email },
          { username: credentials.email }
        ]
      }
    })

    if (!user) {
      throw new Error('用户不存在')
    }

    // 验证密码
    const isValid = await bcrypt.compare(credentials.password, user.password)
    if (!isValid) {
      throw new Error('密码错误')
    }

    // 返回用户信息（不包含密码）
    return {
      id: user.id.toString(),
      name: user.name || user.username,
      email: user.email,
      isAdmin: user.isAdmin
    }
  } catch (error) {
    console.error('验证失败:', error)
    throw error
  }
}

/**
 * 创建新用户
 * @param {Object} userData - 用户数据
 * @returns {Promise<User>} 返回创建的用户信息
 */
export async function createUser(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    
    const user = await prisma.user.create({
      data: {
        username: userData.email.split('@')[0], // 使用邮箱前缀作为用户名
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        isAdmin: false // 默认为非管理员
      }
    })

    return {
      id: user.id.toString(),
      name: user.name || user.username,
      email: user.email,
      isAdmin: user.isAdmin
    }
  } catch (error) {
    console.error('创建用户失败:', error)
    throw new Error('Failed to create user')
  }
}

/**
 * 使用示例：
 * 
 * try {
 *   await SignupFormSchema.validate(formData);
 *   // 验证通过
 * } catch (error) {
 *   // 验证失败，error.message 包含错误信息
 * }
 * 
 * // 或者使用 validateSync 进行同步验证
 * try {
 *   SignupFormSchema.validateSync(formData);
 * } catch (error) {
 *   console.log(error.message);
 * }
 */