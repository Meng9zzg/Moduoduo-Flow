import { INode } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'
import { Calculator } from '@langchain/community/tools/calculator'

class Calculator_Tools implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]

    // i18n support fields
    labelKey?: string
    descriptionKey?: string
    categoryKey?: string

    constructor() {
        // i18n keys for translation
        this.labelKey = 'nodes.tools.calculator.label'
        this.descriptionKey = 'nodes.tools.calculator.description'
        this.categoryKey = 'nodes.tools.calculator.category'

        // Default English values as fallback
        this.label = 'Calculator'
        this.name = 'calculator'
        this.version = 1.0
        this.type = 'Calculator'
        this.icon = 'calculator.svg'
        this.category = 'Tools'
        this.description = 'Perform calculations on response'
        this.baseClasses = [this.type, ...getBaseClasses(Calculator)]
    }

    async init(): Promise<any> {
        return new Calculator()
    }
}

module.exports = { nodeClass: Calculator_Tools }
