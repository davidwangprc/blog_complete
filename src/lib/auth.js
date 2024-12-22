/**
 * 服务器端认证处理模块
 * 处理用户登录和注册的核心逻辑
 */
'use server'

/**
 * 导入必要的依赖
 */
import { LoginSchema, SignupFormSchema } from '@/lib/definitions'
import { createSession } from '@/lib/session'
import { validateUser, createUser } from '@/lib/db'

/**
 * 处理用户登录
 * 工作流程：
 * 1. 验证表单数据
 * 2. 验证用户凭据
 * 3. 创建会话
 * 4. 返回成功状态
 * 
 * @param {import('@/lib/definitions').FormState} prevState - 之前的表单状态
 * @param {FormData} formData - 提交的表单数据
 * @returns {Promise<import('@/lib/definitions').FormState>} - 返回新的表单状态
 */
export async function login(prevState, formData) {
  try {
    console.log('=== 登录流程开始 ===')
    
    // 第一步：验证表单数据
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    
    try {
      await LoginSchema.validate(credentials, { abortEarly: false })
    } catch (validationError) {
      console.log('表单验证失败:', validationError.errors)
      return {
        error: validationError.errors[0],
        errors: validationError.inner.reduce((acc, err) => ({
          ...acc,
          [err.path]: [err.message]
        }), {})
      }
    }

    // 第二步：验证用户凭据
    console.log('表单验证成功，开始验证用户...')
    const user = await validateUser(credentials)
    console.log('用户验证成功:', user)

    // 第三步：创建用户会话
    console.log('创建会话...')
    await createSession({
      userId: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
    console.log('会话创建成功')

    // 第四步：返回成功状态
    return { message: 'success' }
  } catch (error) {
    // 第五步：处理其他错误
    console.error('登录错误:', error)
    return {
      error: error.message || '用户名或密码错误'
    }
  }
}

/**
 * 处理用户注册
 * 工作流程：
 * 1. 验证注册表单数据
 * 2. 创建新用户
 * 3. 创建会话
 * 4. 返回成功状态
 * 
 * @param {import('@/lib/definitions').FormState} prevState - 之前的表单状态
 * @param {FormData} formData - 提交的表单数据
 * @returns {Promise<import('@/lib/definitions').FormState>} - 返回新的表单状态
 */
export async function signup(prevState, formData) {
  try {
    // 第一步：验证表单数据
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }
    
    try {
      await SignupFormSchema.validate(userData, { abortEarly: false })
    } catch (validationError) {
      return {
        errors: validationError.inner.reduce((acc, err) => ({
          ...acc,
          [err.path]: err.message
        }), {})
      }
    }

    const user = await createUser(userData)
    
    await createSession({
      userId: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
    
    return { message: 'success' }
  } catch (error) {
    console.error('注册错误:', error)
    return {
      error: error.message || '注册失败，请重试'
    }
  }
} 