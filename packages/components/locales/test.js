/**
 * Test script for Translation Service
 *
 * Run this with: node test.js
 */

const { translationService } = require('./index.ts')

console.log('========================================')
console.log('Testing Backend i18n Translation Service')
console.log('========================================\n')

// Test 1: Check supported languages
console.log('Test 1: Supported Languages')
console.log('Supported languages:', translationService.getSupportedLanguages())
console.log('Is "en" supported?', translationService.isLanguageSupported('en'))
console.log('Is "zh" supported?', translationService.isLanguageSupported('zh'))
console.log('Is "fr" supported?', translationService.isLanguageSupported('fr'))
console.log('')

// Test 2: Test basic translation
console.log('Test 2: Basic Translation')
console.log('EN - nodes.chatOpenAI.label:', translationService.translate('nodes.chatOpenAI.label', 'en'))
console.log('ZH - nodes.chatOpenAI.label:', translationService.translate('nodes.chatOpenAI.label', 'zh'))
console.log('EN - nodes.chatOpenAI.description:', translationService.translate('nodes.chatOpenAI.description', 'en'))
console.log('ZH - nodes.chatOpenAI.description:', translationService.translate('nodes.chatOpenAI.description', 'zh'))
console.log('')

// Test 3: Test node translation
console.log('Test 3: Node Translation')

const mockChatOpenAINode = {
    name: 'chatOpenAI',
    label: 'ChatOpenAI',
    description: 'Wrapper around OpenAI large language models that use the Chat endpoint',
    category: 'Chat Models',
    inputs: [
        {
            name: 'modelName',
            label: 'Model Name',
            description: 'Model name to use'
        },
        {
            name: 'temperature',
            label: 'Temperature',
            description: 'Controls randomness'
        }
    ],
    credential: {
        name: 'credential',
        label: 'Connect Credential'
    }
}

console.log('Original Node (EN):')
console.log(JSON.stringify(mockChatOpenAINode, null, 2))
console.log('')

const translatedNodeZh = translationService.translateNode(mockChatOpenAINode, 'zh')
console.log('Translated Node (ZH):')
console.log(JSON.stringify(translatedNodeZh, null, 2))
console.log('')

// Test 4: Test AirtableAgent translation
console.log('Test 4: AirtableAgent Translation')

const mockAirtableAgentNode = {
    name: 'airtableAgent',
    label: 'Airtable Agent',
    description: 'Agent used to answer queries on Airtable table',
    category: 'Agents',
    inputs: [
        {
            name: 'model',
            label: 'Language Model'
        },
        {
            name: 'baseId',
            label: 'Base Id',
            placeholder: 'app11RobdGoX0YNsC'
        }
    ],
    credential: {
        name: 'credential',
        label: 'Connect Credential'
    }
}

console.log('Original Node (EN):')
console.log(JSON.stringify(mockAirtableAgentNode, null, 2))
console.log('')

const translatedAirtableZh = translationService.translateNode(mockAirtableAgentNode, 'zh')
console.log('Translated Node (ZH):')
console.log(JSON.stringify(translatedAirtableZh, null, 2))
console.log('')

// Test 5: Test fallback to English for unsupported language
console.log('Test 5: Fallback to English')
const translatedNodeFr = translationService.translateNode(mockChatOpenAINode, 'fr')
console.log('Translated Node (FR - should fallback to EN):')
console.log('Label:', translatedNodeFr.label)
console.log('Description:', translatedNodeFr.description)
console.log('')

console.log('========================================')
console.log('All tests completed!')
console.log('========================================')
