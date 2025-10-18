import { ChatOpenAI as LangchainChatOpenAI } from '@langchain/openai'
import { BaseCache } from '@langchain/core/caches'
import { ICommonObject, IMultiModalOption, INode, INodeData, INodeOptionsValue, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'
import { ChatOpenAI } from './FlowiseModuoduoPro'
import { HttpsProxyAgent } from 'https-proxy-agent'

class ModuoduoPro_ChatModels implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
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
        this.name = 'chatModuoduoPro'
        this.version = 1.0
        this.type = 'ChatModuoduoPro'
        this.icon = 'moduoduo-pro.png'
        this.category = 'Chat Models'
        this.description = 'Moduoduo Pro unified AI model gateway interface'
        this.baseClasses = [this.type, ...getBaseClasses(LangchainChatOpenAI)]
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['moduoduoProApi']
        }
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
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
                label: 'Streaming',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true,
                additionalParams: true
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
                label: 'Frequency Penalty',
                name: 'frequencyPenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Presence Penalty',
                name: 'presencePenalty',
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
            },
            {
                label: 'Stop Sequence',
                name: 'stopSequence',
                type: 'string',
                rows: 4,
                optional: true,
                description: 'List of stop words to use when generating. Use comma to separate multiple stop words.',
                additionalParams: true
            },
            {
                label: 'Proxy Url',
                name: 'proxyUrl',
                type: 'string',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Base Options',
                name: 'baseOptions',
                type: 'json',
                optional: true,
                additionalParams: true
            }
        ]
    }

    //@ts-ignore
    loadMethods = {
        async listModels(nodeData: INodeData, options: ICommonObject): Promise<INodeOptionsValue[]> {
            try {
                console.log('🔍 ModuoduoPro listModels called')
                console.log('📋 nodeData:', JSON.stringify(nodeData, null, 2))
                console.log('⚙️ options:', JSON.stringify(options, null, 2))

                // 获取凭证数据 - 支持多种方式获取凭证ID
                let credentialId = nodeData.credential
                if (!credentialId && nodeData.inputs?.credentialId) {
                    credentialId = nodeData.inputs.credentialId
                }

                console.log('🔑 credentialId found:', credentialId)

                if (!credentialId) {
                    console.log('❌ No credential provided, returning default models')
                    return [
                        { label: 'GPT-4o (No Credential)', name: 'gpt-4o', description: 'Please configure credentials first' },
                        { label: 'GPT-4o-mini (No Credential)', name: 'gpt-4o-mini', description: 'Please configure credentials first' }
                    ]
                }

                const credentialData = await getCredentialData(credentialId, options)
                const moduoduoProApiKey = getCredentialParam('moduoduoProApiKey', credentialData, nodeData)
                const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, nodeData) || 'https://www.moduoduo.pro'

                // 动态加载模型列表，使用 API Key
                console.log('Fetching models from:', `${baseURL}/v1/models`)
                console.log('Using API Key:', moduoduoProApiKey ? `${moduoduoProApiKey.substring(0, 10)}...` : 'NOT PROVIDED')

                const response = await fetch(`${baseURL}/v1/models`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${moduoduoProApiKey}`,
                        'User-Agent': 'Flowise-ModuoduoPro-Client/1.0'
                    }
                })

                if (!response.ok) {
                    console.error(`Moduoduo Pro API error: ${response.status} ${response.statusText}`)
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                console.log('Moduoduo Pro models response:', data)

                if (data.data && Array.isArray(data.data)) {
                    return data.data.map((model: any) => ({
                        label: model.id || model.name || 'Unknown Model',
                        name: model.id || model.name || 'unknown-model',
                        description: model.owned_by || ''
                    }))
                }

                // 如果API格式不同，返回默认模型列表
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
                console.error('Error loading Moduoduo Pro models:', error)
                // 返回默认模型列表作为后备
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
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const topP = nodeData.inputs?.topP as string
        const frequencyPenalty = nodeData.inputs?.frequencyPenalty as string
        const presencePenalty = nodeData.inputs?.presencePenalty as string
        const timeout = nodeData.inputs?.timeout as string
        const stopSequence = nodeData.inputs?.stopSequence as string
        const streaming = nodeData.inputs?.streaming as boolean
        const proxyUrl = nodeData.inputs?.proxyUrl as string
        const baseOptions = nodeData.inputs?.baseOptions

        if (nodeData.inputs?.credentialId) {
            nodeData.credential = nodeData.inputs?.credentialId
        }
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const moduoduoProApiKey = getCredentialParam('moduoduoProApiKey', credentialData, nodeData)

        // ⭐ 关键修复：从凭证读取 Base URL
        const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, nodeData) || 'https://www.moduoduo.pro'

        const cache = nodeData.inputs?.cache as BaseCache

        const obj: any = {
            // ⭐ 改为 any 避免类型错误
            temperature: parseFloat(temperature),
            modelName,
            openAIApiKey: moduoduoProApiKey,
            apiKey: moduoduoProApiKey,
            streaming: streaming ?? true,
            configuration: {
                baseURL: baseURL + '/v1' // ⭐ 使用凭证中的 Base URL
            }
        }

        if (maxTokens) obj.maxTokens = parseInt(maxTokens, 10)
        if (topP) obj.topP = parseFloat(topP)
        if (frequencyPenalty) obj.frequencyPenalty = parseFloat(frequencyPenalty)
        if (presencePenalty) obj.presencePenalty = parseFloat(presencePenalty)
        if (timeout) obj.timeout = parseInt(timeout, 10)
        if (cache) obj.cache = cache
        if (stopSequence) {
            const stopSequenceArray = stopSequence.split(',').map((item) => item.trim())
            obj.stop = stopSequenceArray
        }

        let parsedBaseOptions: any | undefined = undefined

        if (baseOptions) {
            try {
                parsedBaseOptions = typeof baseOptions === 'object' ? baseOptions : JSON.parse(baseOptions)
            } catch (exception) {
                throw new Error("Invalid JSON in the Moduoduo Pro's BaseOptions: " + exception)
            }
        }

        if (parsedBaseOptions) {
            obj.configuration = {
                ...obj.configuration,
                defaultHeaders: parsedBaseOptions
            }
        }

        if (proxyUrl) {
            obj.configuration = {
                ...obj.configuration,
                httpAgent: new HttpsProxyAgent(proxyUrl)
            }
        }

        const multiModalOption: IMultiModalOption = {
            image: {
                allowImageUploads: false,
                imageResolution: 'low'
            }
        }

        const model = new ChatOpenAI(nodeData.id, obj)
        model.setMultiModalOption(multiModalOption)
        return model
    }
}

module.exports = { nodeClass: ModuoduoPro_ChatModels }
