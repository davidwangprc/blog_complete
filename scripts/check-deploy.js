const { PrismaClient } = require('@prisma/client')

async function checkDeploy() {
  const prisma = new PrismaClient()
  try {
    // 测试数据库连接
    await prisma.$connect()
    console.log('✅ 数据库连接成功')

    // 检查管理员用户
    const adminUser = await prisma.user.findFirst({
      where: { isAdmin: true }
    })
    if (adminUser) {
      console.log('✅ 管理员用户存在')
    } else {
      console.log('❌ 警告：未找到管理员用户')
    }

    // 检查基础分类
    const categories = await prisma.category.findMany()
    console.log(`✅ 已创建 ${categories.length} 个分类`)

  } catch (error) {
    console.error('❌ 部署检查失败:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

checkDeploy() 