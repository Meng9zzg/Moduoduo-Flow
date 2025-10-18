import { ICommonObject, INode, INodeData, INodeOptionsValue, INodeParams } from '../../../src/Interface'
import { getCredentialData, getCredentialParam } from '../../../src/utils'

class ChatModuoduoPro_LlamaIndex implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
    tags: string[]
    credential: INodeParams
    inputs: INodeParams[]
    // i18n support fields
    labelKey?: string
    descriptionKey?: string
    categoryKey?: string

    constructor() {
        // i18n keys for translation
        this.labelKey = 'nodes.moduoduoPro.label'
        this.descriptionKey = 'nodes.moduoduoPro.description'
        this.categoryKey = 'nodes.moduoduoPro.category'

        // Default English values as fallback
        this.label = 'Moduoduo Pro'
        this.name = 'chatModuoduoProLlamaIndex'
        this.version = 1.0
        this.type = 'ChatModuoduoProLlamaIndex'
        this.icon = 'moduoduo-pro.png'
        this.category = 'Chat Models'
        this.description = 'Moduoduo Pro unified AI model gateway interface for LlamaIndex'
        this.baseClasses = [this.type, 'BaseChatModel_LlamaIndex']
        this.tags = ['LlamaIndex']
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['moduoduoProApi']
        }
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'gpt-4o-mini'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.7,
                optional: true
            },
            {
                label: 'Max Tokens',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top P',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Timeout',
                name: 'timeout',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            }
        ]
    }

    //@ts-ignore
    loadMethods = {
        async listModels(nodeData: INodeData, options: ICommonObject): Promise<INodeOptionsValue[]> {
            try {
                // ⭐ 关键修复：从 inputs.credentialId 读取凭证 ID
                const credentialId = nodeData.inputs?.credentialId || nodeData.credential

                if (!credentialId) {
                    console.log('❌ No credential provided for LlamaIndex, returning empty list')
                    return []
                }

                const credentialData = await getCredentialData(credentialId, options)
                const moduoduoProApiKey = getCredentialParam('moduoduoProApiKey', credentialData, nodeData)
                const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, nodeData) || 'https://www.moduoduo.pro'

                if (!moduoduoProApiKey) {
                    console.error('❌ API Key not found for LlamaIndex')
                    return []
                }

                console.log('✅ Fetching models from (LlamaIndex):', `${baseURL}/v1/models`)
                console.log('✅ Using API Key (LlamaIndex):', `${moduoduoProApiKey.substring(0, 10)}...`)

                const response = await fetch(`${baseURL}/v1/models`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${moduoduoProApiKey}`,
                        'User-Agent': 'Flowise-ModuoduoPro-Client/1.0'
                    }
                })

                if (!response.ok) {
                    console.error(`Moduoduo Pro API error (LlamaIndex): ${response.status} ${response.statusText}`)
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                console.log('Moduoduo Pro models response (LlamaIndex):', data)

                if (data.data && Array.isArray(data.data)) {
                    return data.data.map((model: any) => ({
                        label: model.id || model.name || 'Unknown Model',
                        name: model.id || model.name || 'unknown-model',
                        description: model.owned_by || ''
                    }))
                }

                // 如果API格式不符合预期，抛出错误
                console.error('Unexpected API response format (LlamaIndex):', data)
                throw new Error('Invalid API response format from Moduoduo Pro')
            } catch (error) {
                console.error('Error loading Moduoduo Pro models (LlamaIndex):', error)
                // 不返回默认模型，让用户知道真实的错误
                throw error
            }
        }
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const { OpenAI } = await import('llamaindex')

        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const topP = nodeData.inputs?.topP as string
        const timeout = nodeData.inputs?.timeout as string

        if (nodeData.inputs?.credentialId) {
            nodeData.credential = nodeData.inputs?.credentialId
        }
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const moduoduoProApiKey = getCredentialParam('moduoduoProApiKey', credentialData, nodeData)

        // ⭐ 关键修复：从凭证读取 Base URL
        const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, nodeData) || 'https://www.moduoduo.pro'

        const obj: any = {
            apiKey: moduoduoProApiKey,
            model: modelName,
            temperature: parseFloat(temperature),
            additionalSessionOptions: {
                baseURL: baseURL + '/v1' // ⭐ 使用凭证中的 Base URL
            }
        }

        if (maxTokens) obj.maxTokens = parseInt(maxTokens, 10)
        if (topP) obj.topP = parseFloat(topP)
        if (timeout) obj.timeout = parseInt(timeout, 10) * 1000

        const model = new OpenAI(obj)
        return model
    }
}

module.exports = { nodeClass: ChatModuoduoPro_LlamaIndex }
