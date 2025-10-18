#!/usr/bin/env node

/**
 * 测试 moduoduo.pro API 连通性
 * 用于调试模型列表加载问题
 */

const https = require('https')

// 测试配置
const BASE_URL = 'https://www.moduoduo.pro'
const API_KEY = 'sk-HKgBJ8vqJlNHEC2eSf0vLuAyHjMJZL0TrnHFkOxWeSfqD8Xp' // 真实的 API Key

console.log('🔍 测试 Moduoduo Pro API 连通性...')
console.log(`📍 Base URL: ${BASE_URL}`)
console.log(`🔑 API Key: ${API_KEY.substring(0, 10)}...`)

// 测试模型列表接口
async function testModelsAPI() {
    const url = `${BASE_URL}/v1/models`

    console.log(`\n📋 测试模型列表接口: ${url}`)

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
                'User-Agent': 'Flowise-ModuoduoPro-Test/1.0'
            }
        })

        console.log(`📊 响应状态: ${response.status} ${response.statusText}`)
        console.log(`📋 响应头:`, Object.fromEntries(response.headers.entries()))

        if (response.ok) {
            const data = await response.json()
            console.log(`✅ 成功获取模型列表:`)
            console.log(`📝 模型数量: ${data.data ? data.data.length : 0}`)

            if (data.data && data.data.length > 0) {
                console.log(`🎯 前5个模型:`)
                data.data.slice(0, 5).forEach((model, index) => {
                    console.log(`   ${index + 1}. ${model.id || model.name} (${model.owned_by || 'unknown'})`)
                })
            }

            return data
        } else {
            const errorText = await response.text()
            console.log(`❌ 请求失败: ${errorText}`)
            return null
        }
    } catch (error) {
        console.log(`💥 网络错误: ${error.message}`)
        return null
    }
}

// 测试聊天接口
async function testChatAPI() {
    const url = `${BASE_URL}/v1/chat/completions`

    console.log(`\n💬 测试聊天接口: ${url}`)

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
                'User-Agent': 'Flowise-ModuoduoPro-Test/1.0'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: '你好，这是一个测试' }],
                stream: false,
                max_tokens: 50
            })
        })

        console.log(`📊 响应状态: ${response.status} ${response.statusText}`)

        if (response.ok) {
            const data = await response.json()
            console.log(`✅ 聊天接口正常:`)
            console.log(`💭 回复: ${data.choices?.[0]?.message?.content || '无回复内容'}`)
            console.log(`🔢 Token 使用: ${JSON.stringify(data.usage || {})}`)
            return data
        } else {
            const errorText = await response.text()
            console.log(`❌ 聊天请求失败: ${errorText}`)
            return null
        }
    } catch (error) {
        console.log(`💥 网络错误: ${error.message}`)
        return null
    }
}

// 主测试函数
async function main() {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        console.log('❌ 请先在脚本中设置真实的 API Key')
        console.log('💡 修改 test-moduoduo-api.js 文件中的 API_KEY 变量')
        return
    }

    console.log('🚀 开始测试...\n')

    // 测试模型列表
    const modelsResult = await testModelsAPI()

    // 如果模型列表成功，再测试聊天
    if (modelsResult) {
        await testChatAPI()
    }

    console.log('\n🏁 测试完成')
}

// 运行测试
main().catch(console.error)
