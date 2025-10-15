import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    // 从 public/locales 加载翻译文件
    .use(Backend)
    // 自动检测浏览器语言
    .use(LanguageDetector)
    // 集成React
    .use(initReactI18next)
    .init({
        // 默认语言
        fallbackLng: 'en',
        // 从localStorage获取保存的语言，默认中文
        lng: localStorage.getItem('language') || 'zh',
        // 开发模式显示调试信息
        debug: process.env.NODE_ENV === 'development',

        // 命名空间配置
        ns: [
            'common', // 通用文案
            'menu', // 菜单导航
            'workspace', // 工作区
            'header', // 头部组件
            'chatflows', // Chatflows模块
            'agentflows', // Agentflows模块
            'executions', // 执行记录
            'assistants', // 助手
            'credentials', // 凭证
            'tools', // 工具
            'apikey', // API密钥
            'docstore', // 文档存储
            'variables', // 变量
            'datasets', // 数据集
            'evaluations', // 评估
            'evaluators', // 评估器
            'users', // 用户管理
            'roles', // 角色管理
            'settings', // 设置
            'auth', // 认证
            'validation', // 表单验证
            'error', // 错误消息
            'dialog', // 对话框
            'table' // 表格
        ],
        defaultNS: 'common',

        // React已经处理XSS，不需要转义
        interpolation: {
            escapeValue: false
        },

        // 翻译文件加载配置
        backend: {
            // 翻译文件路径模板
            loadPath: '/locales/{{lng}}/{{ns}}.json',
            // 允许跨域加载（如果需要）
            crossDomain: false
        },

        // 语言检测配置
        detection: {
            // 检测顺序：localStorage -> 浏览器语言
            order: ['localStorage', 'navigator'],
            // 缓存到localStorage
            caches: ['localStorage'],
            // localStorage的键名
            lookupLocalStorage: 'language'
        },

        // 支持的语言列表
        supportedLngs: ['en', 'zh'],

        // 非严格模式：如果找不到翻译，显示key而不是报错
        returnEmptyString: false,

        // 在控制台显示缺失的翻译key
        saveMissing: process.env.NODE_ENV === 'development',
        missingKeyHandler: (lng, ns, key) => {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`i18n missing key: [${lng}][${ns}] ${key}`)
            }
        }
    })

export default i18n
