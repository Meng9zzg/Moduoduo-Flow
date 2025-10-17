import { BaseCache } from '@langchain/core/caches'
import { ChatAlibabaTongyi } from '@langchain/community/chat_models/alibaba_tongyi'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'
import { BaseChatModelParams } from '@langchain/core/language_models/chat_models'

class ChatAlibabaTongyi_ChatModels implements INode {
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
        this.label = 'ChatAlibabaTongyi'
        this.name = 'chatAlibabaTongyi'
        this.version = 2.0
        this.type = 'ChatAlibabaTongyi'
        this.icon = 'alibaba-svgrepo-com.svg'
        this.category = 'Chat Models'
        this.description = 'Wrapper around Alibaba Tongyi Chat Endpoints'
        this.baseClasses = [this.type, ...getBaseClasses(ChatAlibabaTongyi)]
        this.labelKey = 'nodes.chatmodels.chatAlibabaTongyi.label'
        this.descriptionKey = 'nodes.chatmodels.chatAlibabaTongyi.description'
        this.categoryKey = 'nodes.chatmodels.chatAlibabaTongyi.category'
        this.credential = {
            label: 'Connect Credential',
            labelKey: 'nodes.chatmodels.chatAlibabaTongyi.credential.label',
            name: 'credential',
            type: 'credential',
            credentialNames: ['AlibabaApi']
        }
        this.inputs = [
            {
                label: 'Cache',
                labelKey: 'nodes.chatmodels.chatAlibabaTongyi.inputs.cache.label',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model',
                labelKey: 'nodes.chatmodels.chatAlibabaTongyi.inputs.modelName.label',
                name: 'modelName',
                type: 'string',
                placeholder: 'qwen-plus'
            },
            {
                label: 'Temperature',
                labelKey: 'nodes.chatmodels.chatAlibabaTongyi.inputs.temperature.label',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Streaming',
                labelKey: 'nodes.chatmodels.chatAlibabaTongyi.inputs.streaming.label',
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
        const alibabaApiKey = getCredentialParam('alibabaApiKey', credentialData, nodeData)

        const obj: Partial<ChatAlibabaTongyi> & BaseChatModelParams = {
            streaming: streaming ?? true,
            alibabaApiKey,
            model: modelName,
            temperature: temperature ? parseFloat(temperature) : undefined
        }
        if (cache) obj.cache = cache

        const model = new ChatAlibabaTongyi(obj)
        return model
    }
}

module.exports = { nodeClass: ChatAlibabaTongyi_ChatModels }
