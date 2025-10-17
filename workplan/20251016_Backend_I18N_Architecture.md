# Backend i18n Architecture Documentation

## Overview

This document describes the internationalization (i18n) architecture implemented for backend nodes in the Moduoduo-Agent-Flow project. The architecture enables translation of node metadata including labels, descriptions, categories, and input field information.

## Architecture Design

### 1. Directory Structure

```
packages/components/locales/
├── en/
│   └── nodes/
│       ├── agents.json        # Agent nodes translations
│       ├── chatmodels.json    # Chat model nodes translations
│       └── ...                # Other category translations
├── zh/
│   └── nodes/
│       ├── agents.json
│       ├── chatmodels.json
│       └── ...
├── index.ts                   # TranslationService implementation
└── test.js                    # Test script for verification
```

### 2. Translation File Format

Translation files are organized by node category and use a nested JSON structure:

**English Translation (en/nodes/chatmodels.json)**:

```json
{
    "chatOpenAI": {
        "label": "ChatOpenAI",
        "description": "Wrapper around OpenAI large language models that use the Chat endpoint",
        "category": "Chat Models",
        "credential": {
            "label": "Connect Credential"
        },
        "inputs": {
            "modelName": {
                "label": "Model Name",
                "description": "Model name to use",
                "placeholder": "gpt-3.5-turbo"
            },
            "temperature": {
                "label": "Temperature",
                "description": "Controls randomness"
            }
        }
    }
}
```

**Chinese Translation (zh/nodes/chatmodels.json)**:

```json
{
    "chatOpenAI": {
        "label": "ChatOpenAI",
        "description": "使用Chat端点的OpenAI大语言模型封装",
        "category": "聊天模型",
        "inputs": {
            "modelName": {
                "label": "模型名称",
                "description": "要使用的模型名称"
            }
        }
    }
}
```

### 3. TranslationService Implementation

**Location**: `packages/components/locales/index.ts`

**Key Features**:

-   Singleton pattern for global access
-   Automatic loading of all translation files
-   Support for nested translation keys
-   Fallback to English for missing translations
-   Category mapping for different node types

**Core Methods**:

1. `loadTranslations()`: Loads all translation files from the locales directory
2. `translate(key, lang)`: Translates a specific key (e.g., 'nodes.chatOpenAI.label')
3. `translateNode(node, lang)`: Translates an entire node object
4. `isLanguageSupported(lang)`: Checks if a language is supported
5. `getSupportedLanguages()`: Returns list of supported languages

**Usage Example**:

```typescript
import { translationService } from '../components/locales'

// Translate a single key
const label = translationService.translate('nodes.chatOpenAI.label', 'zh')

// Translate entire node
const translatedNode = translationService.translateNode(nodeObject, 'zh')
```

### 4. Node Modifications

Nodes are modified to include i18n keys while maintaining backward compatibility:

**Modified Node Structure** (`ChatOpenAI.ts`):

```typescript
class ChatOpenAI_ChatModels implements INode {
    // i18n support fields
    labelKey?: string
    descriptionKey?: string
    categoryKey?: string

    constructor() {
        // i18n keys for translation
        this.labelKey = 'nodes.chatOpenAI.label'
        this.descriptionKey = 'nodes.chatOpenAI.description'
        this.categoryKey = 'nodes.chatOpenAI.category'

        // Default English values as fallback
        this.label = 'ChatOpenAI'
        this.description = 'Wrapper around OpenAI...'
        this.category = 'Chat Models'
        // ... rest of the implementation
    }
}
```

### 5. Backend API Integration

**Location**: `packages/server/src/controllers/nodes/index.ts`

**Implementation**:

```typescript
import { translationService } from '../../../components/locales'

// Extract language from request
const getLanguageFromRequest = (req: Request): string => {
    // Priority: query param > Accept-Language header > default (en)
    if (req.query.lang && typeof req.query.lang === 'string') {
        return req.query.lang
    }

    const acceptLanguage = req.headers['accept-language']
    // Parse and return first supported language
    // ...

    return 'en' // Default fallback
}

// Apply translation in API endpoints
const getAllNodes = async (req: Request, res: Response) => {
    const lang = getLanguageFromRequest(req)
    const nodes = await nodesService.getAllNodes()

    const translatedNodes = lang === 'en' ? nodes : nodes.map((node) => translationService.translateNode(node, lang))

    return res.json(translatedNodes)
}
```

**Modified Endpoints**:

1. `GET /api/v1/nodes` - Get all nodes
2. `GET /api/v1/nodes/:name` - Get specific node
3. `GET /api/v1/nodes/category/:name` - Get nodes by category

**Language Detection**:

-   **Query Parameter**: `?lang=zh` (highest priority)
-   **Accept-Language Header**: Parsed from browser settings
-   **Default**: Falls back to English (`en`)

### 6. Frontend API Integration

**Location**: `packages/ui/src/api/nodes.js`

**Implementation**:

```javascript
import i18n from '../i18n/config'

const getCurrentLanguage = () => {
    const lang = i18n.language || localStorage.getItem('language') || 'en'
    return lang.split('-')[0] // Normalize zh-CN -> zh
}

const getAllNodes = () => {
    const lang = getCurrentLanguage()
    return client.get('/nodes', { params: { lang } })
}

const getSpecificNode = (name) => {
    const lang = getCurrentLanguage()
    return client.get(`/nodes/${name}`, { params: { lang } })
}
```

**Integration Points**:

-   Automatically detects current language from i18n configuration
-   Sends language parameter with every node API request
-   Seamlessly integrates with existing frontend i18n system

## Example Nodes

### 1. ChatOpenAI (Chat Models)

**Node File**: `packages/components/nodes/chatmodels/ChatOpenAI/ChatOpenAI.ts`

**Translation Files**:

-   English: `packages/components/locales/en/nodes/chatmodels.json`
-   Chinese: `packages/components/locales/zh/nodes/chatmodels.json`

**Key Fields Translated**:

-   Node label and description
-   Category name
-   All input field labels and descriptions
-   Input field placeholders
-   Option labels (e.g., Low/Medium/High)

### 2. AirtableAgent (Agents)

**Node File**: `packages/components/nodes/agents/AirtableAgent/AirtableAgent.ts`

**Translation Files**:

-   English: `packages/components/locales/en/nodes/agents.json`
-   Chinese: `packages/components/locales/zh/nodes/agents.json`

**Key Fields Translated**:

-   Agent label and description
-   Category name
-   Input field labels and descriptions
-   Placeholder text for Base ID and Table ID

## Testing and Verification

### Manual Testing

1. **Test Translation Service**:

```bash
cd packages/components/locales
node test.js
```

2. **Test API Endpoints**:

```bash
# English (default)
curl http://localhost:3000/api/v1/nodes

# Chinese
curl http://localhost:3000/api/v1/nodes?lang=zh

# Using Accept-Language header
curl -H "Accept-Language: zh-CN,zh;q=0.9" http://localhost:3000/api/v1/nodes
```

3. **Test Frontend Integration**:

-   Change language in UI settings
-   Verify node labels and descriptions update
-   Check that input field labels are translated
-   Verify category names are translated

### Expected Results

**English Response**:

```json
{
    "name": "chatOpenAI",
    "label": "ChatOpenAI",
    "description": "Wrapper around OpenAI large language models that use the Chat endpoint",
    "category": "Chat Models"
}
```

**Chinese Response**:

```json
{
    "name": "chatOpenAI",
    "label": "ChatOpenAI",
    "description": "使用Chat端点的OpenAI大语言模型封装",
    "category": "聊天模型"
}
```

## Backward Compatibility

The implementation maintains full backward compatibility:

1. **Default English**: If no language parameter is provided, responses default to English
2. **Fallback Values**: Nodes retain original English values that serve as fallbacks
3. **Unsupported Languages**: Automatically fall back to English
4. **Missing Translations**: Return original English text if translation is not available
5. **Existing Code**: No changes required to existing node usage code

## Performance Considerations

1. **Translation Loading**: All translations are loaded once at service initialization
2. **Caching**: Translations are cached in memory using Map data structure
3. **Minimal Overhead**: Translation only occurs for non-English requests
4. **Fast Lookup**: O(1) lookup time for translation keys

## Future Enhancements

### Phase 1 (Current - Completed)

-   ✅ Basic translation infrastructure
-   ✅ TranslationService implementation
-   ✅ 2 example nodes (ChatOpenAI, AirtableAgent)
-   ✅ Backend API integration
-   ✅ Frontend API integration

### Phase 2 (Planned)

-   [ ] Translate all remaining nodes
-   [ ] Add more languages (Japanese, Korean, Spanish, etc.)
-   [ ] Translation management UI
-   [ ] Automated translation workflow

### Phase 3 (Planned)

-   [ ] Dynamic translation loading (lazy loading)
-   [ ] User-contributed translations
-   [ ] Translation validation tools
-   [ ] A/B testing for translation quality

## File Modification Summary

### Created Files

1. `packages/components/locales/index.ts` - TranslationService implementation
2. `packages/components/locales/en/nodes/chatmodels.json` - English translations for chat models
3. `packages/components/locales/zh/nodes/chatmodels.json` - Chinese translations for chat models
4. `packages/components/locales/en/nodes/agents.json` - English translations for agents
5. `packages/components/locales/zh/nodes/agents.json` - Chinese translations for agents
6. `packages/components/locales/test.js` - Test script
7. `docs/backend-i18n-architecture.md` - This documentation

### Modified Files

1. `packages/components/nodes/chatmodels/ChatOpenAI/ChatOpenAI.ts` - Added i18n keys
2. `packages/components/nodes/agents/AirtableAgent/AirtableAgent.ts` - Added i18n keys
3. `packages/server/src/controllers/nodes/index.ts` - Added translation logic
4. `packages/ui/src/api/nodes.js` - Added language parameter

## Best Practices

### For Adding New Node Translations

1. **Create Translation Files**:

    - Add English translation first (en/nodes/[category].json)
    - Then add Chinese translation (zh/nodes/[category].json)
    - Follow the established JSON structure

2. **Update Node Class**:

    ```typescript
    constructor() {
        // Add i18n keys
        this.labelKey = 'nodes.[nodeName].label'
        this.descriptionKey = 'nodes.[nodeName].description'

        // Keep English as fallback
        this.label = 'English Label'
        this.description = 'English Description'
    }
    ```

3. **Test Translation**:
    - Run test script to verify translations load correctly
    - Test API endpoints with different language parameters
    - Verify frontend displays correctly

### For Adding New Languages

1. Create new language directory: `packages/components/locales/[lang]/`
2. Copy structure from `en/` directory
3. Translate all JSON files
4. Add language code to `supportedLanguages` array in TranslationService
5. Test thoroughly with API endpoints

## Troubleshooting

### Common Issues

**Issue 1: Translation not loading**

-   Check file path and naming convention
-   Verify JSON syntax is valid
-   Check console for error messages during translation loading

**Issue 2: Wrong language returned**

-   Verify language code is correct (use two-letter ISO codes)
-   Check Accept-Language header format
-   Ensure language is in supportedLanguages list

**Issue 3: Some fields not translated**

-   Verify translation key path is correct
-   Check that field exists in translation JSON
-   Ensure nested structure matches exactly

**Issue 4: Frontend not showing translations**

-   Clear browser cache
-   Check i18n configuration in frontend
-   Verify API is returning translated data

## Conclusion

The backend i18n architecture provides a robust, scalable solution for internationalizing node metadata. The implementation:

-   ✅ Supports multiple languages (currently English and Chinese)
-   ✅ Maintains backward compatibility
-   ✅ Provides excellent performance
-   ✅ Is easy to extend with new nodes and languages
-   ✅ Integrates seamlessly with existing frontend i18n system
-   ✅ Follows best practices for i18n implementation

For questions or issues, please refer to the troubleshooting section or contact the development team.

---

**Last Updated**: 2025-10-16
**Version**: 1.0.0
**Author**: Backend i18n Implementation Team
