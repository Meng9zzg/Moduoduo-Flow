import moment from 'moment'
import i18n from '@/i18n/config'

/**
 * 根据当前语言环境格式化时间
 * @param {Date|string|moment} date - 要格式化的日期
 * @param {string} format - 自定义格式（可选）
 * @returns {string} 格式化后的时间字符串
 */
export const formatDateTime = (date, format = null) => {
    if (!date) return ''

    const currentLanguage = i18n.language || 'en'
    const momentDate = moment(date)

    if (!momentDate.isValid()) return ''

    // 如果指定了自定义格式，直接使用
    if (format) {
        return momentDate.format(format)
    }

    // 根据语言环境选择格式
    if (currentLanguage === 'zh') {
        // 中文格式：2025年10月17日 06:13
        return momentDate.format('YYYY年MM月DD日 HH:mm')
    } else {
        // 英文格式：October 17th 2025, 06:13 AM
        return momentDate.format('MMMM Do YYYY, hh:mm A')
    }
}

/**
 * 格式化日期（不包含时间）
 * @param {Date|string|moment} date - 要格式化的日期
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date) => {
    if (!date) return ''

    const currentLanguage = i18n.language || 'en'
    const momentDate = moment(date)

    if (!momentDate.isValid()) return ''

    if (currentLanguage === 'zh') {
        // 中文格式：2025年10月17日
        return momentDate.format('YYYY年MM月DD日')
    } else {
        // 英文格式：October 17th 2025
        return momentDate.format('MMMM Do YYYY')
    }
}

/**
 * 格式化时间（不包含日期）
 * @param {Date|string|moment} date - 要格式化的时间
 * @returns {string} 格式化后的时间字符串
 */
export const formatTime = (date) => {
    if (!date) return ''

    const currentLanguage = i18n.language || 'en'
    const momentDate = moment(date)

    if (!momentDate.isValid()) return ''

    if (currentLanguage === 'zh') {
        // 中文格式：06:13
        return momentDate.format('HH:mm')
    } else {
        // 英文格式：06:13 AM
        return momentDate.format('hh:mm A')
    }
}

/**
 * 格式化相对时间（如：2小时前、3天前）
 * @param {Date|string|moment} date - 要格式化的日期
 * @returns {string} 格式化后的相对时间字符串
 */
export const formatRelativeTime = (date) => {
    if (!date) return ''

    const currentLanguage = i18n.language || 'en'
    const momentDate = moment(date)

    if (!momentDate.isValid()) return ''

    // 设置语言环境
    if (currentLanguage === 'zh') {
        moment.locale('zh-cn')
    } else {
        moment.locale('en')
    }

    return momentDate.fromNow()
}

/**
 * 格式化详细时间（包含秒）
 * @param {Date|string|moment} date - 要格式化的日期
 * @returns {string} 格式化后的详细时间字符串
 */
export const formatDetailedDateTime = (date) => {
    if (!date) return ''

    const currentLanguage = i18n.language || 'en'
    const momentDate = moment(date)

    if (!momentDate.isValid()) return ''

    if (currentLanguage === 'zh') {
        // 中文格式：2025年10月17日 06:13:45
        return momentDate.format('YYYY年MM月DD日 HH:mm:ss')
    } else {
        // 英文格式：October 17th 2025, 06:13:45 AM
        return momentDate.format('MMMM Do YYYY, hh:mm:ss A')
    }
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes) => {
    if (bytes == null || bytes === undefined || bytes <= 0) {
        return '0 Bytes'
    }

    const currentLanguage = i18n.language || 'en'
    const scaleInitials =
        currentLanguage === 'zh'
            ? [' 字节', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB']
            : [' Bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB']

    let scaleCounter = 0
    let number = bytes

    while (number >= 1024 && scaleCounter < scaleInitials.length - 1) {
        number /= 1024
        scaleCounter++
    }

    if (scaleCounter >= scaleInitials.length) scaleCounter = scaleInitials.length - 1

    let compactNumber = number
        .toFixed(2)
        .replace(/\.?0+$/, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    compactNumber += scaleInitials[scaleCounter]
    return compactNumber.trim()
}

/**
 * 格式化数字（添加千分位分隔符）
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的数字字符串
 */
export const formatNumber = (num) => {
    if (num == null || num === undefined) return '0'

    const currentLanguage = i18n.language || 'en'

    if (currentLanguage === 'zh') {
        // 中文数字格式
        return num.toLocaleString('zh-CN')
    } else {
        // 英文数字格式
        return num.toLocaleString('en-US')
    }
}

export default {
    formatDateTime,
    formatDate,
    formatTime,
    formatRelativeTime,
    formatDetailedDateTime,
    formatFileSize,
    formatNumber
}
