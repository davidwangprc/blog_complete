/**
 * 标记为服务器端代码
 */
'use server'

import { cookies } from 'next/headers'
import { SessionPayload } from './definitions'

/**
 * 获取当前用户会话信息
 * @returns {Promise<SessionPayload|null>} 返回会话信息或null
 */
export async function getSession() {
  // console.log('=== session.js获取会话信息 ===')
  
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session_token')
  
  // console.log('会话令牌:', sessionToken?.value)
  
  if (!sessionToken) {
    console.log('未找到会话令牌 session开始控制台输出查看错误')
    return null
  }
  
  try {
    // 解析存储的会话数据
    const sessionData = JSON.parse(sessionToken.value)
    // console.log('会话有效')
    /** @type {SessionPayload} */
    const payload = {
      ...sessionData,
      expiresAt: new Date(sessionData.expiresAt)
    }
    return payload
  } catch (error) {
    console.error('会话数据解析失败:', error)
    return null
  }
}

/**
 * 创建新的用户会话
 * @param {Omit<SessionPayload, 'expiresAt'>} userData - 用户会话数据（不包含过期时间）
 * @returns {Promise<void>}
 */
export async function createSession(userData) {
  console.log('=== 创建新会话 ===')
  console.log('用户数据:', userData)
  
  /** @type {SessionPayload} */
  const sessionData = {
    ...userData,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  }
  
  const cookieStore = await cookies()
  cookieStore.set('session_token', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60,
    path: '/'
  })
  
  console.log('会话cookie已设置')
}