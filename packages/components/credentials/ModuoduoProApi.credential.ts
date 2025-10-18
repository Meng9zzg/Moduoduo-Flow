import { INodeParams, INodeCredential } from '../src/Interface'

class ModuoduoProApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Moduoduo Pro API'
        this.name = 'moduoduoProApi'
        this.version = 1.0
        this.description = 'Unified API gateway for all LLM models with centralized billing'
        this.inputs = [
            {
                label: 'Base URL',
                name: 'moduoduoProBaseURL',
                type: 'string',
                default: 'https://www.moduoduo.pro',
                placeholder: 'https://www.moduoduo.pro',
                description: 'Moduoduo Pro gateway base URL'
            },
            {
                label: 'API Key',
                name: 'moduoduoProApiKey',
                type: 'password',
                description: 'Your Moduoduo Pro API key from user dashboard',
                placeholder: 'sk-HKgB**********D8X'
            }
        ]
    }
}

module.exports = { credClass: ModuoduoProApi }
