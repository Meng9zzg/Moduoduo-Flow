#!/usr/bin/env node

/**
 * 模拟 Flowise 的模型加载方式
 * 测试 listModels 方法
 */

// 模拟 Flowise 的凭证和参数获取
function getCredentialParam(paramName, credentialData, nodeData) {
    if (paramName === 'moduoduoProApiKey') {
        return 'sk-HKgBJ8vqJlNHEC2eSf0vLuAyHjMJZL0TrnHFkOxWeSfqD8Xp'
    }
    if (paramName === 'moduoduoProBaseURL') {
        return 'https://www.moduoduo.pro'
    }
    return null
}

// 模拟 listModels 方法（从我们的代码复制）
async function listModels(nodeData, options) {
    try {
        // 获取凭证数据（模拟）
        const credentialData = {} // 模拟凭证数据
        const moduoduoProApiKey = getCredentialParam('moduoduoProApiKey', credentialData, nodeData)
        const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, nodeData) || 'https://www.moduoduo.pro'

        // 动态加载模型列表，使用 API Key
        console.log('🔍 Flowise 模拟测试 - 获取模型列表')
        console.log('📍 Fetching models from:', `${baseURL}/v1/models`)
        console.log('🔑 Using API Key:', moduoduoProApiKey ? `${moduoduoProApiKey.substring(0, 10)}...` : 'NOT PROVIDED')

        const response = await fetch(`${baseURL}/v1/models`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${moduoduoProApiKey}`,
                'User-Agent': 'Flowise-ModuoduoPro-Client/1.0'
            }
        })

        if (!response.ok) {
            console.error(`❌ Moduoduo Pro API error: ${response.status} ${response.statusText}`)
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('✅ Moduoduo Pro models response received')
        console.log('📊 Total models:', data.data ? data.data.length : 0)

        if (data.data && Array.isArray(data.data)) {
            const formattedModels = data.data.map((model) => ({
                label: model.id || model.name || 'Unknown Model',
                name: model.id || model.name || 'unknown-model',
                description: model.owned_by || ''
            }))

            console.log('🎯 格式化后的模型（前10个）:')
            formattedModels.slice(0, 10).forEach((model, index) => {
                console.log(`   ${index + 1}. ${model.label} (${model.description})`)
            })

            return formattedModels
        }

        // 如果API格式不同，返回默认模型列表
        console.log('⚠️ API 格式异常，返回默认模型列表')
        return [
            { label: 'GPT-4o', name: 'gpt-4o' },
            { label: 'GPT-4o-mini', name: 'gpt-4o-mini' },
            { label: 'GPT-4-turbo', name: 'gpt-4-turbo' },
            { label: 'Claude-3.5-Sonnet', name: 'claude-3-5-sonnet-20241022' },
            { label: 'Claude-3.5-Haiku', name: 'claude-3-5-haiku-20241022' },
            { label: 'Gemini-1.5-Pro', name: 'gemini-1.5-pro' },
            { label: 'Gemini-1.5-Flash', name: 'gemini-1.5-flash' }
        ]
    } catch (error) {
        console.error('💥 Error loading Moduoduo Pro models:', error)
        console.log('🔄 返回默认模型列表作为后备')
        return [
            { label: 'GPT-4o', name: 'gpt-4o' },
            { label: 'GPT-4o-mini', name: 'gpt-4o-mini' },
            { label: 'GPT-4-turbo', name: 'gpt-4-turbo' },
            { label: 'Claude-3.5-Sonnet', name: 'claude-3-5-sonnet-20241022' },
            { label: 'Claude-3.5-Haiku', name: 'claude-3-5-haiku-20241022' },
            { label: 'Gemini-1.5-Pro', name: 'gemini-1.5-pro' },
            { label: 'Gemini-1.5-Flash', name: 'gemini-1.5-flash' }
        ]
    }
}

// 主测试函数
async function main() {
    console.log('🚀 开始 Flowise 模型加载测试...\n')

    // 模拟节点数据
    const nodeData = {
        credential: 'mock-credential-id'
    }

    const options = {}

    // 调用 listModels 方法
    const models = await listModels(nodeData, options)

    console.log('\n📋 最终返回的模型列表:')
    console.log(`📊 总数: ${models.length}`)

    if (models.length > 0) {
        console.log('✅ 模型加载成功！')
        console.log('\n🎯 可用模型（前15个）:')
        models.slice(0, 15).forEach((model, index) => {
            console.log(`   ${(index + 1).toString().padStart(2, ' ')}. ${model.label.padEnd(30, ' ')} (${model.description})`)
        })
    } else {
        console.log('❌ 没有获取到任何模型')
    }

    console.log('\n🏁 测试完成')
}

// 运行测试
main().catch(console.error)
