import { OpenAI as LangchainOpenAI } from '@langchain/openai'
import { BaseCache } from '@langchain/core/caches'
import { ICommonObject, INode, INodeData, INodeOptionsValue, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class ModuoduoPro_LLMs implements INode {
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
        this.categoryKey = 'nodes.llms.category'

        // Default English values as fallback
        this.label = 'Moduoduo Pro'
        this.name = 'moduoduoPro'
        this.version = 1.0
        this.type = 'ModuoduoPro'
        this.icon = 'moduoduo-pro.png'
        this.category = 'LLMs'
        this.description = 'Moduoduo Pro unified AI model gateway interface'
        this.baseClasses = [this.type, ...getBaseClasses(LangchainOpenAI)]
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
            }
        ]
    }

    //@ts-ignore
    loadMethods = {
        async listModels(_: INodeData, options: ICommonObject): Promise<INodeOptionsValue[]> {
            try {
                const credentialData = await getCredentialData(_.credential ?? '', options)
                const moduoduoProApiKey = getCredentialParam('moduoduoProApiKey', credentialData, _)
                const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, _) || 'https://www.moduoduo.pro'

                console.log('Fetching models from (LLM):', `${baseURL}/v1/models`)
                console.log('Using API Key (LLM):', moduoduoProApiKey ? `${moduoduoProApiKey.substring(0, 10)}...` : 'NOT PROVIDED')

                const response = await fetch(`${baseURL}/v1/models`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${moduoduoProApiKey}`,
                        'User-Agent': 'Flowise-ModuoduoPro-Client/1.0'
                    }
                })

                if (!response.ok) {
                    console.error(`Moduoduo Pro API error (LLM): ${response.status} ${response.statusText}`)
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                console.log('Moduoduo Pro models response (LLM):', data)

                if (data.data && Array.isArray(data.data)) {
                    return data.data.map((model: any) => ({
                        label: model.id || model.name || 'Unknown Model',
                        name: model.id || model.name || 'unknown-model',
                        description: model.owned_by || ''
                    }))
                }

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

        if (nodeData.inputs?.credentialId) {
            nodeData.credential = nodeData.inputs?.credentialId
        }
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const moduoduoProApiKey = getCredentialParam('moduoduoProApiKey', credentialData, nodeData)

        const cache = nodeData.inputs?.cache as BaseCache

        const obj: any = {
            temperature: parseFloat(temperature),
            modelName,
            openAIApiKey: moduoduoProApiKey,
            apiKey: moduoduoProApiKey,
            configuration: {
                baseURL: 'https://www.moduoduo.pro/v1'
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

        const model = new LangchainOpenAI(obj)
        return model
    }
}

module.exports = { nodeClass: ModuoduoPro_LLMs }
