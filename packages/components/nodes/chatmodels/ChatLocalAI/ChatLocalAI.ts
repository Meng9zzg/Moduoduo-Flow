import { ChatOpenAI, ChatOpenAIFields } from '@langchain/openai'
import { BaseCache } from '@langchain/core/caches'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class ChatLocalAI_ChatModels implements INode {
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
        this.label = 'ChatLocalAI'
        this.name = 'chatLocalAI'
        this.version = 3.0
        this.type = 'ChatLocalAI'
        this.icon = 'localai.png'
        this.category = 'Chat Models'
        this.description = 'Use local LLMs like llama.cpp, gpt4all using LocalAI'
        this.labelKey = 'nodes.chatmodels.chatLocalAI.label'
        this.descriptionKey = 'nodes.chatmodels.chatLocalAI.description'
        this.categoryKey = 'nodes.chatmodels.chatLocalAI.category'
        this.baseClasses = [this.type, 'BaseChatModel', ...getBaseClasses(ChatOpenAI)]
        this.credential = {
            label: 'Connect Credential',
            labelKey: 'nodes.chatmodels.chatLocalAI.credential.label',
            name: 'credential',
            type: 'credential',
            credentialNames: ['localAIApi'],
            optional: true
        }
        this.inputs = [
            {
                label: 'Cache',
                labelKey: 'nodes.chatmodels.chatLocalAI.inputs.cache.label',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Base Path',
                labelKey: 'nodes.chatmodels.chatLocalAI.inputs.basePath.label',
                name: 'basePath',
                type: 'string',
                placeholder: 'http://localhost:8080/v1'
            },
            {
                label: 'Model Name',
                labelKey: 'nodes.chatmodels.chatLocalAI.inputs.modelName.label',
                name: 'modelName',
                type: 'string',
                placeholder: 'gpt4all-lora-quantized.bin'
            },
            {
                label: 'Temperature',
                labelKey: 'nodes.chatmodels.chatLocalAI.inputs.temperature.label',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Streaming',
                labelKey: 'nodes.chatmodels.chatLocalAI.inputs.streaming.label',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Tokens',
                labelKey: 'nodes.chatmodels.chatLocalAI.inputs.maxTokens.label',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                labelKey: 'nodes.chatmodels.chatLocalAI.inputs.topP.label',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Timeout',
                labelKey: 'nodes.chatmodels.chatLocalAI.inputs.timeout.label',
                name: 'timeout',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const topP = nodeData.inputs?.topP as string
        const timeout = nodeData.inputs?.timeout as string
        const basePath = nodeData.inputs?.basePath as string
        const streaming = nodeData.inputs?.streaming as boolean

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const localAIApiKey = getCredentialParam('localAIApiKey', credentialData, nodeData)

        const cache = nodeData.inputs?.cache as BaseCache

        const obj: ChatOpenAIFields = {
            temperature: parseFloat(temperature),
            modelName,
            openAIApiKey: 'sk-',
            apiKey: 'sk-',
            streaming: streaming ?? true
        }

        if (maxTokens) obj.maxTokens = parseInt(maxTokens, 10)
        if (topP) obj.topP = parseFloat(topP)
        if (timeout) obj.timeout = parseInt(timeout, 10)
        if (cache) obj.cache = cache
        if (localAIApiKey) {
            obj.openAIApiKey = localAIApiKey
            obj.apiKey = localAIApiKey
        }
        if (basePath) obj.configuration = { baseURL: basePath }

        const model = new ChatOpenAI(obj)

        return model
    }
}

module.exports = { nodeClass: ChatLocalAI_ChatModels }
