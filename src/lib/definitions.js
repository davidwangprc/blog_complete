/**
 * 导入 Yup 库用于数据验证
 */
import * as yup from 'yup';

/**
 * 表单状态类型定义
 * @typedef {Object} FormState
 * @property {Object} [errors] - 字段验证错误信息
 * @property {string[]} [errors.name] - 姓名字段的错误信息数组
 * @property {string[]} [errors.email] - 邮箱字段的错误信息数组
 * @property {string[]} [errors.password] - 密码字段的错误信息数组
 * @property {string} [message] - 成功消息
 * @property {string} [error] - 通用错误消息
 */

/**
 * 会话数据类型定义
 * @typedef {Object} SessionPayload
 * @property {string} userId - 用户ID
 * @property {string} name - 用户名
 * @property {string} email - 邮箱
 * @property {boolean} isAdmin - 是否为管理员
 * @property {Date} expiresAt - 过期时间
 */

/**
 * 用户数据类型定义
 * @typedef {Object} User
 * @property {string} id - 用户ID
 * @property {string} name - 用户名
 * @property {string} email - 用户邮箱
 * @property {boolean} isAdmin - 是否为管理员
 */

/**
 * 登录表单验证模式
 */
export const LoginSchema = yup.object().shape({
  email: yup.string()
    .required('请输入用户名或邮箱'),
  password: yup.string()
    .min(4, '密码至少4个字符')
    .required('请输入密码')
});

/**
 * 注册表单验证模式
 */
export const SignupFormSchema = yup.object({
  // 姓名验证规则
  name: yup
    .string()
    .min(2, '姓名至少需要2个字符')
    .trim()
    .required('姓名是必填项'),
  
  // 邮箱验证规则
  email: yup
    .string()
    .email('请输入有效的邮箱地址')
    .trim()
    .required('邮箱是必填项'),
  
  // 密码验证规则
  password: yup
    .string()
    .min(6, '密码至少6个字符')
    .matches(/[a-zA-Z]/, '需要包含字母')
    .matches(/[0-9]/, '需要包含数字')
    .required('密码是必填项')
});

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