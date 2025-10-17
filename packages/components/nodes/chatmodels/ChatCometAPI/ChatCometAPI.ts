import { BaseCache } from '@langchain/core/caches'
import { ChatOpenAI, ChatOpenAIFields } from '@langchain/openai'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class ChatCometAPI_ChatModels implements INode {
    readonly baseURL: string = 'https://api.cometapi.com/v1'
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
    labelKey: string
    descriptionKey: string
    categoryKey: string

    constructor() {
        this.label = 'ChatCometAPI'
        this.name = 'chatCometAPI'
        this.version = 1.0
        this.type = 'ChatCometAPI'
        this.icon = 'cometapi.svg'
        this.category = 'Chat Models'
        this.description = 'Wrapper around CometAPI large language models that use the Chat endpoint'
        this.labelKey = 'nodes.chatmodels.chatCometAPI.label'
        this.descriptionKey = 'nodes.chatmodels.chatCometAPI.description'
        this.categoryKey = 'nodes.chatmodels.chatCometAPI.category'
        this.baseClasses = [this.type, ...getBaseClasses(ChatOpenAI)]
        this.credential = {
            label: 'Connect Credential',
            labelKey: 'nodes.chatmodels.chatCometAPI.credential.label',
            name: 'credential',
            type: 'credential',
            credentialNames: ['cometApi']
        }
        this.inputs = [
            {
                label: 'Cache',
                labelKey: 'nodes.chatmodels.chatCometAPI.inputs.cache.label',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                labelKey: 'nodes.chatmodels.chatCometAPI.inputs.modelName.label',
                name: 'modelName',
                type: 'string',
                default: 'gpt-5-mini',
                description: 'Enter the model name (e.g., gpt-5-mini, claude-sonnet-4-20250514, gemini-2.0-flash)'
            },
            {
                label: 'Temperature',
                labelKey: 'nodes.chatmodels.chatCometAPI.inputs.temperature.label',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.7,
                optional: true
            },
            {
                label: 'Streaming',
                labelKey: 'nodes.chatmodels.chatCometAPI.inputs.streaming.label',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Tokens',
                labelKey: 'nodes.chatmodels.chatCometAPI.inputs.maxTokens.label',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                labelKey: 'nodes.chatmodels.chatCometAPI.inputs.topP.label',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Frequency Penalty',
                labelKey: 'nodes.chatmodels.chatCometAPI.inputs.frequencyPenalty.label',
                name: 'frequencyPenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Presence Penalty',
                labelKey: 'nodes.chatmodels.chatCometAPI.inputs.presencePenalty.label',
                name: 'presencePenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Base Options',
                labelKey: 'nodes.chatmodels.chatCometAPI.inputs.baseOptions.label',
                name: 'baseOptions',
                type: 'json',
                optional: true,
                additionalParams: true,
                description: 'Additional options to pass to the CometAPI client. This should be a JSON object.'
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const topP = nodeData.inputs?.topP as string
        const frequencyPenalty = nodeData.inputs?.frequencyPenalty as string
        const presencePenalty = nodeData.inputs?.presencePenalty as string
        const streaming = nodeData.inputs?.streaming as boolean
        const baseOptions = nodeData.inputs?.baseOptions

        if (nodeData.inputs?.credentialId) {
            nodeData.credential = nodeData.inputs?.credentialId
        }
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const openAIApiKey = getCredentialParam('cometApiKey', credentialData, nodeData)

        // Custom error handling for missing API key
        if (!openAIApiKey || openAIApiKey.trim() === '') {
            throw new Error(
                'CometAPI API Key is missing or empty. Please provide a valid CometAPI API key in the credential configuration.'
            )
        }

        // Custom error handling for missing model name
        if (!modelName || modelName.trim() === '') {
            throw new Error('Model Name is required. Please enter a valid model name (e.g., gpt-5-mini, claude-sonnet-4-20250514).')
        }

        const cache = nodeData.inputs?.cache as BaseCache

        const obj: ChatOpenAIFields = {
            temperature: parseFloat(temperature),
            modelName,
            openAIApiKey,
            apiKey: openAIApiKey,
            streaming: streaming ?? true
        }

        if (maxTokens) obj.maxTokens = parseInt(maxTokens, 10)
        if (topP) obj.topP = parseFloat(topP)
        if (frequencyPenalty) obj.frequencyPenalty = parseFloat(frequencyPenalty)
        if (presencePenalty) obj.presencePenalty = parseFloat(presencePenalty)
        if (cache) obj.cache = cache

        let parsedBaseOptions: any | undefined = undefined

        if (baseOptions) {
            try {
                parsedBaseOptions = typeof baseOptions === 'object' ? baseOptions : JSON.parse(baseOptions)
                if (parsedBaseOptions.baseURL) {
                    console.warn("The 'baseURL' parameter is not allowed when using the ChatCometAPI node.")
                    parsedBaseOptions.baseURL = undefined
                }
            } catch (exception) {
                throw new Error('Invalid JSON in the BaseOptions: ' + exception)
            }
        }

        const model = new ChatOpenAI({
            ...obj,
            configuration: {
                baseURL: this.baseURL,
                ...parsedBaseOptions
            }
        })
        return model
    }
}

module.exports = { nodeClass: ChatCometAPI_ChatModels }
