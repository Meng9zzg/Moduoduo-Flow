import { BaseCache } from '@langchain/core/caches'
import { ChatOpenAI, ChatOpenAIFields } from '@langchain/openai'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class ChatNvdiaNIM_ChatModels implements INode {
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
        this.label = 'Chat NVIDIA NIM'
        this.name = 'chatNvidiaNIM'
        this.version = 1.1
        this.type = 'ChatNvidiaNIM'
        this.icon = 'nvdia.svg'
        this.category = 'Chat Models'
        this.description = 'Wrapper around NVIDIA NIM Inference API'
        this.labelKey = 'nodes.chatmodels.chatNvdiaNIM.label'
        this.descriptionKey = 'nodes.chatmodels.chatNvdiaNIM.description'
        this.categoryKey = 'nodes.chatmodels.chatNvdiaNIM.category'
        this.baseClasses = [this.type, ...getBaseClasses(ChatOpenAI)]
        this.credential = {
            label: 'Connect Credential',
            labelKey: 'nodes.chatmodels.chatNvdiaNIM.credential.label',
            name: 'credential',
            type: 'credential',
            credentialNames: ['nvidiaNIMApi'],
            optional: true
        }
        this.inputs = [
            {
                label: 'Cache',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.cache.label',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.modelName.label',
                name: 'modelName',
                type: 'string',
                placeholder: 'microsoft/phi-3-mini-4k-instruct'
            },
            {
                label: 'Base Path',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.basePath.label',
                name: 'basePath',
                type: 'string',
                description: 'Specify the URL of the deployed NIM Inference API',
                placeholder: 'https://integrate.api.nvidia.com/v1'
            },
            {
                label: 'Temperature',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.temperature.label',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Streaming',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.streaming.label',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Tokens',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.maxTokens.label',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.topP.label',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Frequency Penalty',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.frequencyPenalty.label',
                name: 'frequencyPenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Presence Penalty',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.presencePenalty.label',
                name: 'presencePenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Timeout',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.timeout.label',
                name: 'timeout',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Base Options',
                labelKey: 'nodes.chatmodels.chatNvdiaNIM.inputs.baseOptions.label',
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
        const basePath = nodeData.inputs?.basePath as string
        const baseOptions = nodeData.inputs?.baseOptions
        const cache = nodeData.inputs?.cache as BaseCache

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const nvidiaNIMApiKey = getCredentialParam('nvidiaNIMApiKey', credentialData, nodeData)

        const obj: ChatOpenAIFields & { nvdiaNIMApiKey?: string } = {
            temperature: parseFloat(temperature),
            modelName,
            openAIApiKey: nvidiaNIMApiKey ?? 'sk-',
            apiKey: nvidiaNIMApiKey ?? 'sk-',
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
                throw new Error("Invalid JSON in the Chat NVIDIA NIM's baseOptions: " + exception)
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

module.exports = { nodeClass: ChatNvdiaNIM_ChatModels }
