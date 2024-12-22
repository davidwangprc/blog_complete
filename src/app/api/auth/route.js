import { NextRequest, NextResponse } from 'next/server'
import { login, signup } from '@/lib/auth'

/**
 * 处理认证相关的 POST 请求
 * @param {import('next/server').NextRequest} request
 * @returns {Promise<NextResponse>}
 */
export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    // 处理登出请求
    if (action === 'logout') {
      const response = NextResponse.json({ success: true })
      response.cookies.set('session_token', '', { 
        maxAge: 0,
        path: '/' 
      })
      return response
    }

    const formData = await request.formData()
    console.log('FormData:', Object.fromEntries(formData.entries()))

    switch (action) {
      case 'login': {
        const result = await login(null, formData)
        if (result.message === 'success') {
          return NextResponse.json({ 
            message: 'success',
            user: {
              email: formData.get('email')
            }
          })
        }
        // 返回详细的错误信息
        return NextResponse.json({
          error: result.error || '登录失败',
          errors: result.errors
        }, { status: 400 })
      }
      case 'signup':
        const result = await signup(formData)
        return NextResponse.json(result, {
          status: result.message === 'success' ? 200 : 400
        })
      default:
        return NextResponse.json(
          { error: '无效的操作' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json(
      { error: error.message || '操作失败' },
      { status: 500 }
    )
  }
} 


// 使用示例：
// const { login, logout, signup, user } = useAuth();

// // 登录
// const handleLogin = async () => {
//     const result = await login('test@example.com', 'password123');
//     if (!result.success) {
//         console.error(result.error);
//     }
// };

// // 注册
// const handleSignup = async () => {
//     const result = await signup('张三', 'test@example.com', 'password123');
//     if (!result.success) {
//         console.error(result.error);
//     }
// };

// // 登出
// const handleLogout = () => {
//     await logout();
// };