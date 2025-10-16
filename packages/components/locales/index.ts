import * as fs from 'fs'
import * as path from 'path'

/**
 * Translation Service for Backend Node Internationalization
 *
 * Provides translation capabilities for node metadata including labels, descriptions,
 * categories, and input field information.
 *
 * Supported languages: en (English), zh (Chinese)
 */
export class TranslationService {
    private translations: Map<string, any> = new Map()
    private supportedLanguages: string[] = ['en', 'zh']
    private defaultLanguage: string = 'en'

    constructor() {
        this.loadTranslations()
    }

    /**
     * Load all translation files from locales directory
     */
    private loadTranslations(): void {
        const localesDir = __dirname

        for (const lang of this.supportedLanguages) {
            const langPath = path.join(localesDir, lang, 'nodes')

            if (!fs.existsSync(langPath)) {
                console.warn(`Translation directory not found: ${langPath}`)
                continue
            }

            // Load all JSON files in the nodes directory
            const files = fs.readdirSync(langPath).filter((file) => file.endsWith('.json'))

            for (const file of files) {
                const filePath = path.join(langPath, file)
                try {
                    const content = fs.readFileSync(filePath, 'utf-8')
                    const data = JSON.parse(content)

                    // Store translations with key: lang:category:nodeName
                    const category = file.replace('.json', '')

                    for (const nodeName in data) {
                        const key = `${lang}:${category}:${nodeName}`
                        this.translations.set(key, data[nodeName])
                    }
                } catch (error) {
                    console.error(`Error loading translation file ${filePath}:`, error)
                }
            }
        }

        console.log(`Loaded ${this.translations.size} translation entries`)
    }

    /**
     * Get translation for a specific key
     * @param key - Translation key in format 'nodes.chatOpenAI.label'
     * @param lang - Language code (default: 'en')
     * @returns Translated string or original key if not found
     */
    public translate(key: string, lang: string = 'en'): string {
        // Fallback to default language if requested language is not supported
        if (!this.supportedLanguages.includes(lang)) {
            lang = this.defaultLanguage
        }

        const parts = key.split('.')
        if (parts.length < 2) {
            return key
        }

        // Parse key: nodes.chatOpenAI.label -> category:chatOpenAI, path: label
        const category = parts[0] // 'nodes'
        const nodeName = parts[1] // 'chatOpenAI'
        const fieldPath = parts.slice(2) // ['label'] or ['inputs', 'modelName', 'label']

        const translationKey = `${lang}:${category}:${nodeName}`
        const nodeTranslations = this.translations.get(translationKey)

        if (!nodeTranslations) {
            return key
        }

        // Navigate through the nested object
        let value = nodeTranslations
        for (const field of fieldPath) {
            if (value && typeof value === 'object' && field in value) {
                value = value[field]
            } else {
                return key
            }
        }

        return typeof value === 'string' ? value : key
    }

    /**
     * Translate a node object
     * @param node - Node object with metadata
     * @param lang - Language code (default: 'en')
     * @returns Translated node object
     */
    public translateNode(node: any, lang: string = 'en'): any {
        // Clone the node to avoid modifying the original
        const translatedNode = { ...node }

        // Fallback to default language if requested language is not supported
        if (!this.supportedLanguages.includes(lang)) {
            lang = this.defaultLanguage
        }

        // Skip translation if language is English (default)
        if (lang === this.defaultLanguage) {
            return translatedNode
        }

        const nodeName = node.name
        const category = this.getCategoryKey(node.category)

        if (!nodeName || !category) {
            return translatedNode
        }

        const translationKey = `${lang}:${category}:${nodeName}`
        const nodeTranslations = this.translations.get(translationKey)

        if (!nodeTranslations) {
            console.warn(`No translations found for ${translationKey}`)
            return translatedNode
        }

        // Translate basic fields
        if (nodeTranslations.label) {
            translatedNode.label = nodeTranslations.label
        }
        if (nodeTranslations.description) {
            translatedNode.description = nodeTranslations.description
        }
        if (nodeTranslations.category) {
            translatedNode.category = nodeTranslations.category
        }

        // Translate credential
        if (nodeTranslations.credential && translatedNode.credential) {
            if (nodeTranslations.credential.label) {
                translatedNode.credential.label = nodeTranslations.credential.label
            }
        }

        // Translate inputs
        if (nodeTranslations.inputs && translatedNode.inputs && Array.isArray(translatedNode.inputs)) {
            translatedNode.inputs = translatedNode.inputs.map((input: any) => {
                const inputTranslation = nodeTranslations.inputs[input.name]
                if (!inputTranslation) {
                    return input
                }

                const translatedInput = { ...input }

                if (inputTranslation.label) {
                    translatedInput.label = inputTranslation.label
                }
                if (inputTranslation.description) {
                    translatedInput.description = inputTranslation.description
                }
                if (inputTranslation.placeholder) {
                    translatedInput.placeholder = inputTranslation.placeholder
                }

                // Translate options if present
                if (inputTranslation.options && translatedInput.options && Array.isArray(translatedInput.options)) {
                    translatedInput.options = translatedInput.options.map((option: any) => {
                        const optionLabel = inputTranslation.options[option.name]
                        if (optionLabel) {
                            return { ...option, label: optionLabel }
                        }
                        return option
                    })
                }

                return translatedInput
            })
        }

        return translatedNode
    }

    /**
     * Get category key from category name
     * Maps node categories to translation file names
     */
    private getCategoryKey(category: string): string {
        const categoryMap: { [key: string]: string } = {
            'Chat Models': 'chatmodels',
            Agents: 'agents',
            Chains: 'chains',
            Tools: 'tools',
            Embeddings: 'embeddings',
            'Vector Stores': 'vectorstores',
            'Document Loaders': 'documentloaders',
            'Text Splitters': 'textsplitters',
            Memory: 'memory',
            'Output Parsers': 'outputparsers',
            Utilities: 'utilities'
        }

        return categoryMap[category] || category.toLowerCase().replace(/\s+/g, '')
    }

    /**
     * Get list of supported languages
     */
    public getSupportedLanguages(): string[] {
        return [...this.supportedLanguages]
    }

    /**
     * Check if a language is supported
     */
    public isLanguageSupported(lang: string): boolean {
        return this.supportedLanguages.includes(lang)
    }

    /**
     * Reload translations (useful for development)
     */
    public reload(): void {
        this.translations.clear()
        this.loadTranslations()
    }
}

// Singleton instance
export const translationService = new TranslationService()

// Export types for TypeScript support
export interface TranslationOptions {
    lang?: string
    fallback?: string
}

export interface NodeTranslation {
    label?: string
    description?: string
    category?: string
    credential?: {
        label?: string
    }
    inputs?: {
        [key: string]: {
            label?: string
            description?: string
            placeholder?: string
            options?: {
                [key: string]: string
            }
        }
    }
}
