import { BaseCache } from '@langchain/core/caches'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'
import { ChatFireworks, ChatFireworksParams } from './core'

class ChatFireworks_ChatModels implements INode {
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
        this.label = 'ChatFireworks'
        this.name = 'chatFireworks'
        this.version = 2.0
        this.type = 'ChatFireworks'
        this.icon = 'Fireworks.png'
        this.category = 'Chat Models'
        this.description = 'Wrapper around Fireworks Chat Endpoints'
        this.labelKey = 'nodes.chatmodels.chatFireworks.label'
        this.descriptionKey = 'nodes.chatmodels.chatFireworks.description'
        this.categoryKey = 'nodes.chatmodels.chatFireworks.category'
        this.baseClasses = [this.type, ...getBaseClasses(ChatFireworks)]
        this.credential = {
            label: 'Connect Credential',
            labelKey: 'nodes.chatmodels.chatFireworks.credential.label',
            name: 'credential',
            type: 'credential',
            credentialNames: ['fireworksApi']
        }
        this.inputs = [
            {
                label: 'Cache',
                labelKey: 'nodes.chatmodels.chatFireworks.inputs.cache.label',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model',
                labelKey: 'nodes.chatmodels.chatFireworks.inputs.modelName.label',
                name: 'modelName',
                type: 'string',
                default: 'accounts/fireworks/models/llama-v3p1-8b-instruct',
                placeholder: 'accounts/fireworks/models/llama-v3p1-8b-instruct'
            },
            {
                label: 'Temperature',
                labelKey: 'nodes.chatmodels.chatFireworks.inputs.temperature.label',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Streaming',
                labelKey: 'nodes.chatmodels.chatFireworks.inputs.streaming.label',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const cache = nodeData.inputs?.cache as BaseCache
        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string
        const streaming = nodeData.inputs?.streaming as boolean

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const fireworksApiKey = getCredentialParam('fireworksApiKey', credentialData, nodeData)

        const obj: ChatFireworksParams = {
            fireworksApiKey,
            modelName,
            temperature: temperature ? parseFloat(temperature) : undefined,
            streaming: streaming ?? true
        }
        if (cache) obj.cache = cache

        const model = new ChatFireworks(obj)
        return model
    }
}

module.exports = { nodeClass: ChatFireworks_ChatModels }
