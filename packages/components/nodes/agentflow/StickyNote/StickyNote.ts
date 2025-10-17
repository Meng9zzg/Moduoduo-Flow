import { INode, INodeParams } from '../../../src/Interface'

class StickyNote_Agentflow implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    color: string
    tags: string[]
    baseClasses: string[]
    inputs: INodeParams[]
    // i18n support fields
    labelKey?: string
    descriptionKey?: string
    categoryKey?: string

    constructor() {
        // i18n keys for translation
        this.labelKey = 'nodes.stickyNoteAgentflow.label'
        this.descriptionKey = 'nodes.stickyNoteAgentflow.description'
        this.categoryKey = 'nodes.stickyNoteAgentflow.category'

        // Default English values as fallback
        this.label = 'Sticky Note'
        this.name = 'stickyNoteAgentflow'
        this.version = 1.0
        this.type = 'StickyNote'
        this.color = '#fee440'
        this.category = 'Agent Flows'
        this.description = 'Add notes to the agent flow'
        this.inputs = [
            {
                label: '',
                name: 'note',
                type: 'string',
                rows: 1,
                placeholder: 'Type something here',
                optional: true
            }
        ]
        this.baseClasses = [this.type]
    }

    async run(): Promise<any> {
        return undefined
    }
}

module.exports = { nodeClass: StickyNote_Agentflow }
