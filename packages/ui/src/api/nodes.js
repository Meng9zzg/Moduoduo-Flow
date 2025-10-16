import client from './client'
import i18n from '../i18n/config'

/**
 * Get current language for API requests
 * Backend will use this to return translated node metadata
 */
const getCurrentLanguage = () => {
    const lang = i18n.language || localStorage.getItem('language') || 'en'
    // Normalize language code (zh-CN -> zh)
    return lang.split('-')[0]
}

const getAllNodes = () => {
    const lang = getCurrentLanguage()
    return client.get('/nodes', { params: { lang } })
}

const getSpecificNode = (name) => {
    const lang = getCurrentLanguage()
    return client.get(`/nodes/${name}`, { params: { lang } })
}

const getNodesByCategory = (name) => {
    const lang = getCurrentLanguage()
    return client.get(`/nodes/category/${name}`, { params: { lang } })
}

const executeCustomFunctionNode = (body) => client.post(`/node-custom-function`, body)

const executeNodeLoadMethod = (name, body) => client.post(`/node-load-method/${name}`, body)

export default {
    getAllNodes,
    getSpecificNode,
    executeCustomFunctionNode,
    getNodesByCategory,
    executeNodeLoadMethod
}
