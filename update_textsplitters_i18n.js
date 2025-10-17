const fs = require('fs')
// const path = require('path')

// Text Splitters nodes to update
const textSplitterNodes = [
    {
        file: 'packages/components/nodes/textsplitters/RecursiveCharacterTextSplitter/RecursiveCharacterTextSplitter.ts',
        className: 'RecursiveCharacterTextSplitter_TextSplitters',
        nodeName: 'recursiveCharacterTextSplitter',
        label: 'Recursive Character Text Splitter',
        description:
            'splits text recursively by different characters - starting with the first character and then the second character and so on.'
    },
    {
        file: 'packages/components/nodes/textsplitters/MarkdownTextSplitter/MarkdownTextSplitter.ts',
        className: 'MarkdownTextSplitter_TextSplitters',
        nodeName: 'markdownTextSplitter',
        label: 'Markdown Text Splitter',
        description: 'splits text based on Markdown headers.'
    },
    {
        file: 'packages/components/nodes/textsplitters/CodeTextSplitter/CodeTextSplitter.ts',
        className: 'CodeTextSplitter_TextSplitters',
        nodeName: 'codeTextSplitter',
        label: 'Code Text Splitter',
        description: 'splits code based on language-specific syntax.'
    },
    {
        file: 'packages/components/nodes/textsplitters/HtmlToMarkdownTextSplitter/HtmlToMarkdownTextSplitter.ts',
        className: 'HtmlToMarkdownTextSplitter_TextSplitters',
        nodeName: 'htmlToMarkdownTextSplitter',
        label: 'HTML to Markdown Text Splitter',
        description: 'converts HTML to Markdown and then splits based on Markdown headers.'
    },
    {
        file: 'packages/components/nodes/textsplitters/TokenTextSplitter/TokenTextSplitter.ts',
        className: 'TokenTextSplitter_TextSplitters',
        nodeName: 'tokenTextSplitter',
        label: 'Token Text Splitter',
        description: 'splits text based on token count using tiktoken tokenizer.'
    }
]

// Output Parsers nodes to update
const outputParserNodes = [
    {
        file: 'packages/components/nodes/outputparsers/StructuredOutputParser/StructuredOutputParser.ts',
        className: 'StructuredOutputParser',
        nodeName: 'structuredOutputParser',
        label: 'Structured Output Parser',
        description: 'Parse the output of an LLM call into a given (JSON) structure.'
    },
    {
        file: 'packages/components/nodes/outputparsers/StructuredOutputParserAdvanced/StructuredOutputParserAdvanced.ts',
        className: 'StructuredOutputParserAdvanced',
        nodeName: 'structuredOutputParserAdvanced',
        label: 'Structured Output Parser Advanced',
        description: 'Parse the output of an LLM call into a given (JSON) structure with advanced features.'
    },
    {
        file: 'packages/components/nodes/outputparsers/CSVListOutputParser/CSVListOutputParser.ts',
        className: 'CSVListOutputParser',
        nodeName: 'csvListOutputParser',
        label: 'CSV List Output Parser',
        description: 'Parse the output of an LLM call into a CSV list.'
    },
    {
        file: 'packages/components/nodes/outputparsers/CustomListOutputParser/CustomListOutputParser.ts',
        className: 'CustomListOutputParser',
        nodeName: 'customListOutputParser',
        label: 'Custom List Output Parser',
        description: 'Parse the output of an LLM call into a custom list format.'
    }
]

function updateNodeFile(filePath, className, nodeName, label, description, category) {
    try {
        if (!fs.existsSync(filePath)) {
            // console.log(`File not found: ${filePath}`)
            return
        }

        let content = fs.readFileSync(filePath, 'utf8')

        // Add i18n fields after baseClasses
        const i18nFields = `    // i18n support fields
    labelKey?: string
    descriptionKey?: string
    categoryKey?: string`

        // Find the class definition and add i18n fields
        const classMatch = content.match(new RegExp(`class ${className}[\\s\\S]*?baseClasses: string\\[\\]`))
        if (classMatch) {
            const beforeBaseClasses = content.substring(0, classMatch.index + classMatch[0].length)
            const afterBaseClasses = content.substring(classMatch.index + classMatch[0].length)

            // Find where inputs starts
            const inputsMatch = afterBaseClasses.match(/\\s*inputs: INodeParams\\[\\]/)
            if (inputsMatch) {
                const beforeInputs = afterBaseClasses.substring(0, inputsMatch.index)
                const afterInputs = afterBaseClasses.substring(inputsMatch.index)

                content = beforeBaseClasses + i18nFields + beforeInputs + afterInputs
            }
        }

        // Add i18n keys in constructor
        const i18nKeys = `        // i18n keys for translation
        this.labelKey = 'nodes.${category}.${nodeName}.label'
        this.descriptionKey = 'nodes.${category}.${nodeName}.description'
        this.categoryKey = 'nodes.${category}.${nodeName}.category'

        // Default English values as fallback`

        // Find constructor and add i18n keys
        const constructorMatch = content.match(
            new RegExp(`constructor\\(\\)[\\s\\S]*?this\\.label = '${label.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}'`)
        )
        if (constructorMatch) {
            const beforeLabel = content.substring(0, constructorMatch.index + constructorMatch[0].length - `this.label = '${label}'`.length)
            const afterLabel = content.substring(constructorMatch.index + constructorMatch[0].length)

            content = beforeLabel + i18nKeys + `\n        this.label = '${label}'` + afterLabel
        }

        fs.writeFileSync(filePath, content, 'utf8')
        // console.log(`Updated: ${filePath}`)
    } catch (error) {
        // console.error(`Error updating ${filePath}:`, error.message)
    }
}

// Update Text Splitters nodes
// console.log('Updating Text Splitters nodes...')
textSplitterNodes.forEach((node) => {
    updateNodeFile(node.file, node.className, node.nodeName, node.label, node.description, 'textsplitters')
})

// Update Output Parsers nodes
// console.log('Updating Output Parsers nodes...')
outputParserNodes.forEach((node) => {
    updateNodeFile(node.file, node.className, node.nodeName, node.label, node.description, 'outputparsers')
})

// console.log('All nodes updated successfully!')
