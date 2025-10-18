// 测试 Moduoduo Pro API 调用
const testModuoduoAPI = async () => {
    const baseURL = 'https://www.moduoduo.pro'
    const apiKey = 'sk-HKgB**********D8X' // 请替换为您的真实API Key

    console.log('测试 Moduoduo Pro API...')
    console.log('Base URL:', baseURL)
    console.log('API Key:', apiKey.substring(0, 10) + '...')

    try {
        const response = await fetch(`${baseURL}/v1/models`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
                'User-Agent': 'Flowise-ModuoduoPro-Client/1.0'
            }
        })

        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))

        if (!response.ok) {
            const errorText = await response.text()
            console.error('API Error:', errorText)
            return
        }

        const data = await response.json()
        console.log('API Response:', JSON.stringify(data, null, 2))

        if (data.data && Array.isArray(data.data)) {
            console.log('模型列表:')
            data.data.forEach((model, index) => {
                console.log(`${index + 1}. ${model.id} (${model.owned_by || 'Unknown'})`)
            })
        } else {
            console.log('响应格式不符合预期')
        }
    } catch (error) {
        console.error('请求失败:', error.message)
    }
}

// 运行测试
testModuoduoAPI()
