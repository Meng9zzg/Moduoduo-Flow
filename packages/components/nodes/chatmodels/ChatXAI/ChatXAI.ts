import { BaseCache } from '@langchain/core/caches'
import { ChatXAIInput } from '@langchain/xai'
import { ICommonObject, IMultiModalOption, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'
import { ChatXAI } from './FlowiseChatXAI'

class ChatXAI_ChatModels implements INode {
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
        this.label = 'ChatXAI'
        this.name = 'chatXAI'
        this.version = 2.0
        this.type = 'ChatXAI'
        this.icon = 'xai.png'
        this.category = 'Chat Models'
        this.description = 'Wrapper around Grok from XAI'
        this.labelKey = 'nodes.chatmodels.chatXAI.label'
        this.descriptionKey = 'nodes.chatmodels.chatXAI.description'
        this.categoryKey = 'nodes.chatmodels.chatXAI.category'
        this.baseClasses = [this.type, ...getBaseClasses(ChatXAI)]
        this.credential = {
            label: 'Connect Credential',
            labelKey: 'nodes.chatmodels.chatXAI.credential.label',
            name: 'credential',
            type: 'credential',
            credentialNames: ['xaiApi']
        }
        this.inputs = [
            {
                label: 'Cache',
                labelKey: 'nodes.chatmodels.chatXAI.inputs.cache.label',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model',
                labelKey: 'nodes.chatmodels.chatXAI.inputs.modelName.label',
                name: 'modelName',
                type: 'string',
                placeholder: 'grok-beta'
            },
            {
                label: 'Temperature',
                labelKey: 'nodes.chatmodels.chatXAI.inputs.temperature.label',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Streaming',
                labelKey: 'nodes.chatmodels.chatXAI.inputs.streaming.label',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Tokens',
                labelKey: 'nodes.chatmodels.chatXAI.inputs.maxTokens.label',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Tokens',
                labelKey: 'nodes.chatmodels.chatXAI.inputs.maxTokens.label',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Allow Image Uploads',
                labelKey: 'nodes.chatmodels.chatXAI.inputs.allowImageUploads.label',
                name: 'allowImageUploads',
                type: 'boolean',
                description:
                    'Allow image input. Refer to the <a href="https://docs.flowiseai.com/using-flowise/uploads#image" target="_blank">docs</a> for more details.',
                default: false,
                optional: true
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const cache = nodeData.inputs?.cache as BaseCache
        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const streaming = nodeData.inputs?.streaming as boolean
        const allowImageUploads = nodeData.inputs?.allowImageUploads as boolean

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const xaiApiKey = getCredentialParam('xaiApiKey', credentialData, nodeData)

        const obj: ChatXAIInput = {
            apiKey: xaiApiKey,
            streaming: streaming ?? true,
            model: modelName,
            temperature: temperature ? parseFloat(temperature) : undefined
        }
        if (cache) obj.cache = cache
        if (maxTokens) obj.maxTokens = parseInt(maxTokens, 10)

        const multiModalOption: IMultiModalOption = {
            image: {
                allowImageUploads: allowImageUploads ?? false
            }
        }

        const model = new ChatXAI(nodeData.id, obj)
        model.setMultiModalOption(multiModalOption)

        return model
    }
}

module.exports = { nodeClass: ChatXAI_ChatModels }
