import { ChatOpenAI, ChatOpenAIFields } from '@langchain/openai'
import { BaseCache } from '@langchain/core/caches'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class ChatOpenAICustom_ChatModels implements INode {
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
        this.label = 'ChatOpenAI Custom'
        this.name = 'chatOpenAICustom'
        this.version = 4.0
        this.type = 'ChatOpenAI-Custom'
        this.icon = 'openai.svg'
        this.category = 'Chat Models'
        this.description = 'Custom/FineTuned model using OpenAI Chat compatible API'
        this.labelKey = 'nodes.chatmodels.chatOpenAICustom.label'
        this.descriptionKey = 'nodes.chatmodels.chatOpenAICustom.description'
        this.categoryKey = 'nodes.chatmodels.chatOpenAICustom.category'
        this.baseClasses = [this.type, ...getBaseClasses(ChatOpenAI)]
        this.credential = {
            label: 'Connect Credential',
            labelKey: 'nodes.chatmodels.chatOpenAICustom.credential.label',
            name: 'credential',
            type: 'credential',
            credentialNames: ['openAIApi'],
            optional: true
        }
        this.inputs = [
            {
                label: 'Cache',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.cache.label',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.modelName.label',
                name: 'modelName',
                type: 'string',
                placeholder: 'ft:gpt-3.5-turbo:my-org:custom_suffix:id'
            },
            {
                label: 'Temperature',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.temperature.label',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Streaming',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.streaming.label',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Tokens',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.maxTokens.label',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.topP.label',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Frequency Penalty',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.frequencyPenalty.label',
                name: 'frequencyPenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Presence Penalty',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.presencePenalty.label',
                name: 'presencePenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Timeout',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.timeout.label',
                name: 'timeout',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'BasePath',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.basepath.label',
                name: 'basepath',
                type: 'string',
                optional: true,
                additionalParams: true
            },
            {
                label: 'BaseOptions',
                labelKey: 'nodes.chatmodels.chatOpenAICustom.inputs.baseOptions.label',
                name: 'baseOptions',
                type: 'json',
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
        const frequencyPenalty = nodeData.inputs?.frequencyPenalty as string
        const presencePenalty = nodeData.inputs?.presencePenalty as string
        const timeout = nodeData.inputs?.timeout as string
        const streaming = nodeData.inputs?.streaming as boolean
        const basePath = nodeData.inputs?.basepath as string
        const baseOptions = nodeData.inputs?.baseOptions
        const cache = nodeData.inputs?.cache as BaseCache

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const openAIApiKey = getCredentialParam('openAIApiKey', credentialData, nodeData)

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
        if (timeout) obj.timeout = parseInt(timeout, 10)
        if (cache) obj.cache = cache

        let parsedBaseOptions: any | undefined = undefined

        if (baseOptions) {
            try {
                parsedBaseOptions = typeof baseOptions === 'object' ? baseOptions : JSON.parse(baseOptions)
            } catch (exception) {
                throw new Error("Invalid JSON in the ChatOpenAI's BaseOptions: " + exception)
            }
        }

        if (basePath || parsedBaseOptions) {
            obj.configuration = {
                baseURL: basePath,
                defaultHeaders: parsedBaseOptions
            }
        }

        const model = new ChatOpenAI(obj)
        return model
    }
}

module.exports = { nodeClass: ChatOpenAICustom_ChatModels }
