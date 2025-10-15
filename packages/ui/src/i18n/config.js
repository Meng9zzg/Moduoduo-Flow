import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const initI18n = async () => {
    await i18n
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
            debug: false,

            // 命名空间配置 - 只加载已创建的文件
            ns: [
                'common', // 通用文案
                'menu', // 菜单导航
                'workspace', // 工作区
                'header', // 头部组件
                'validation', // 表单验证
                'error', // 错误消息
                'dialog', // 对话框组件
                'chatflows', // Chatflows页面
                'agentflows', // Agentflows页面
                'tools', // Tools页面
                'credentials', // Credentials页面
                'marketplaces', // Marketplaces页面
                'assistants', // Assistants页面
                'variables', // Variables页面
                'executions', // Executions页面
                'docstores', // Document Stores页面
                'apikeys' // API Keys页面
            ],
            defaultNS: 'common',

            // 预加载所有命名空间
            preload: ['en', 'zh'],

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
            },

            // 使用Suspense等待翻译加载
            react: {
                useSuspense: true
            }
        })

    console.log('✅ i18n initialized successfully')
    console.log('  Language:', i18n.language)
    console.log('  Loaded namespaces:', Object.keys(i18n.store.data[i18n.language] || {}))
    console.log('  Sample translation (save):', i18n.t('save'))
    console.log('  Sample translation (switchLanguage):', i18n.t('switchLanguage'))
}

// 立即初始化
initI18n()

export default i18n
