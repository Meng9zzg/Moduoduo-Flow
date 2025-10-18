/**
 * Moduoduo Pro 模型列表加载测试脚本
 *
 * 用途：测试 Moduoduo Pro API 的模型列表接口是否正常工作
 *
 * 使用方法：
 * 1. 设置环境变量 MODUODUO_API_KEY
 * 2. 运行: node test-moduoduo-models.js
 */

const fetch = require('node-fetch')

// 配置
const BASE_URL = process.env.MODUODUO_BASE_URL || 'https://www.moduoduo.pro'
const API_KEY = process.env.MODUODUO_API_KEY || 'sk-YOUR_API_KEY_HERE'

async function testModelsAPI() {
    console.log('🔍 测试 Moduoduo Pro 模型列表 API\n')
    console.log('📋 配置信息:')
    console.log(`   Base URL: ${BASE_URL}`)
    console.log(`   API Key: ${API_KEY.substring(0, 10)}...\n`)

    try {
        console.log('📡 发送请求到:', `${BASE_URL}/v1/models`)

        const response = await fetch(`${BASE_URL}/v1/models`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
                'User-Agent': 'Flowise-ModuoduoPro-Test/1.0'
            }
        })

        console.log(`📊 响应状态: ${response.status} ${response.statusText}\n`)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ API 请求失败:')
            console.error(`   状态码: ${response.status}`)
            console.error(`   错误信息: ${errorText}`)

            if (response.status === 401) {
                console.error('\n💡 提示: API Key 无效或已过期，请检查凭证配置')
            } else if (response.status === 402) {
                console.error('\n💡 提示: 余额不足，请充值')
            } else if (response.status === 429) {
                console.error('\n💡 提示: 请求频率限制，请稍后再试')
            }

            process.exit(1)
        }

        const data = await response.json()

        console.log('✅ API 请求成功!\n')
        console.log('📦 返回数据结构:')
        console.log(`   data 字段: ${data.data ? '存在' : '不存在'}`)
        console.log(`   模型数量: ${data.data ? data.data.length : 0}\n`)

        if (data.data && Array.isArray(data.data)) {
            console.log('🎯 可用模型列表:')
            console.log('─'.repeat(80))

            // 按供应商分组
            const modelsByOwner = {}
            data.data.forEach((model) => {
                const owner = model.owned_by || 'unknown'
                if (!modelsByOwner[owner]) {
                    modelsByOwner[owner] = []
                }
                modelsByOwner[owner].push(model.id)
            })

            // 显示分组后的模型
            Object.keys(modelsByOwner)
                .sort()
                .forEach((owner) => {
                    console.log(`\n📌 ${owner.toUpperCase()}:`)
                    modelsByOwner[owner].forEach((modelId) => {
                        console.log(`   - ${modelId}`)
                    })
                })

            console.log('\n' + '─'.repeat(80))
            console.log(`\n✨ 总计: ${data.data.length} 个模型\n`)

            // 显示前5个模型的详细信息
            console.log('📋 前5个模型的详细信息:')
            data.data.slice(0, 5).forEach((model, index) => {
                console.log(`\n${index + 1}. ${model.id}`)
                console.log(`   - Object: ${model.object}`)
                console.log(`   - Created: ${new Date(model.created * 1000).toLocaleString()}`)
                console.log(`   - Owned by: ${model.owned_by}`)
            })

            console.log('\n✅ 测试完成！模型列表加载正常。')
        } else {
            console.warn('⚠️ 警告: API 返回的数据格式不符合预期')
            console.log('返回的数据:', JSON.stringify(data, null, 2))
        }
    } catch (error) {
        console.error('❌ 测试失败:')
        console.error(`   错误类型: ${error.name}`)
        console.error(`   错误信息: ${error.message}`)

        if (error.code === 'ENOTFOUND') {
            console.error('\n💡 提示: 无法连接到服务器，请检查网络连接和 Base URL')
        } else if (error.code === 'ETIMEDOUT') {
            console.error('\n💡 提示: 请求超时，请检查网络连接')
        }

        console.error('\n完整错误:', error)
        process.exit(1)
    }
}

// 检查 API Key 是否配置
if (API_KEY === 'sk-YOUR_API_KEY_HERE') {
    console.error('❌ 错误: 请先设置 MODUODUO_API_KEY 环境变量\n')
    console.log('使用方法:')
    console.log('  Windows (PowerShell):')
    console.log('    $env:MODUODUO_API_KEY="sk-your-api-key"')
    console.log('    node test-moduoduo-models.js\n')
    console.log('  Linux/Mac:')
    console.log('    export MODUODUO_API_KEY="sk-your-api-key"')
    console.log('    node test-moduoduo-models.js\n')
    process.exit(1)
}

// 运行测试
testModelsAPI()
