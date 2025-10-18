# 集成 Moduoduo Pro 统一大模型网关

## 背景

需要将 moduoduo-pro 的 AI 大模型网关接口集成到 Moduoduo-Agent-Flow 项目中，使用户可以通过统一的 API Key 一键调用所有大模型，所消耗的 token 从 moduoduo-pro 后台统一计费和扣除。

## 需求

### 1. 创建 Moduoduo Pro 聊天模型节点

创建文件：`packages/components/nodes/chatmodels/ModuoduoPro/ModuoduoPro.ts`

**功能要求：**

-   节点类型：Chat Models
-   支持 OpenAI 兼容接口
-   基础 URL：`https://www.moduoduo.pro`
-   动态加载模型列表（调用 `/v1/models` 接口）
-   支持流式输出和非流式输出
-   支持 temperature、max_tokens、top_p 等参数配置
-   使用 LangChain 的 ChatOpenAI 类，通过 configuration.baseURL 指向网关

**参数配置：**

```typescript
- Model Name (asyncOptions, 从 API 动态加载)
- Temperature (number, 0-1, default: 0.7)
- Max Tokens (number, optional)
- Top P (number, 0-1, optional)
- Frequency Penalty (number, -2 to 2, optional)
- Presence Penalty (number, -2 to 2, optional)
- Streaming (boolean, default: true)
```

**实现要点：**

-   继承或复用现有 ChatOpenAI 的实现模式
-   在 init 方法中配置 baseURL 为 `https://www.moduoduo.pro/v1`
-   loadMethods.listModels 调用网关的模型列表接口
-   错误处理：余额不足、API 限流、模型不可用等场景

### 2. 创建 API 凭证配置

创建文件：`packages/components/credentials/ModuoduoProApi.credential.ts`

**功能要求：**

```typescript
inputs: [
    {
        label: 'Base URL',
        name: 'moduoduoProBaseURL',
        type: 'string',
        default: 'https://www.moduoduo.pro',
        description: 'Moduoduo Pro gateway base URL'
    },
    {
        label: 'API Key',
        name: 'moduoduoProApiKey',
        type: 'password',
        description: 'Your API key from Moduoduo Pro dashboard',
        placeholder: 'sk-xxxxxx'
    }
]
```

### 3. 创建 LlamaIndex 版本（可选但推荐）

创建文件：`packages/components/nodes/chatmodels/ModuoduoPro/ModuoduoPro_LlamaIndex.ts`

**功能要求：**

-   与主节点功能一致
-   使用 LlamaIndex 的 OpenAI 类
-   tags: ['LlamaIndex']
-   baseClasses: ['ModuoduoPro', 'BaseChatModel_LlamaIndex']

### 4. 添加节点图标

创建文件：`packages/components/nodes/chatmodels/ModuoduoPro/moduoduo.svg` 或 `.png`

可以使用简单的占位图标，内容可以是：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <circle cx="12" cy="12" r="10" stroke-width="2"/>
  <text x="12" y="16" text-anchor="middle" font-size="10" fill="currentColor">MD</text>
</svg>
```

### 5. API 接口说明

**模型列表接口：**

```
GET https://www.moduoduo.pro/v1/models
Headers:
  Authorization: Bearer {apiKey}

Response:
{
  "data": [
    {
      "id": "gpt-4o",
      "object": "model",
      "created": 1626777600,
      "owned_by": "openai"
    },
    ...
  ]
}
```

**聊天接口：**

```
POST https://www.moduoduo.pro/v1/chat/completions
Headers:
  Authorization: Bearer {apiKey}
  Content-Type: application/json

Body:
{
  "model": "gpt-4o",
  "messages": [
    {"role": "user", "content": "Hello"}
  ],
  "stream": true,
  "temperature": 0.7,
  "max_tokens": 2000
}
```

### 6. 实现参考

参考现有实现：

-   `packages/components/nodes/chatmodels/ChatOpenAI/ChatOpenAI.ts`
-   `packages/components/nodes/chatmodels/ChatOpenAI/ChatOpenAI_LlamaIndex.ts`
-   `packages/components/nodes/chatmodels/Groq/ChatGroq.ts`
-   `packages/components/credentials/OpenAIApi.credential.ts`

### 7. 错误处理

需要处理的错误场景：

-   401: API Key 无效或已过期
-   402: 余额不足（Payment Required）
-   429: 请求频率限制
-   500: 上游模型服务不可用
-   超时处理

### 8. 类型定义

确保使用正确的 TypeScript 类型：

```typescript
import { ICommonObject, INode, INodeData, INodeOptionsValue, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'
import { ChatOpenAI } from '@langchain/openai'
```

## 验收标准

-   [ ] ModuoduoPro 节点在 Chat Models 分类中可见
-   [ ] 可以正确配置凭证（Base URL + API Key）
-   [ ] 模型列表可以动态加载并显示
-   [ ] 支持流式和非流式对话
-   [ ] 错误信息友好提示
-   [ ] 与现有 Agent Flow 节点兼容
-   [ ] Token 消耗正确传递和显示

## 技术栈

-   TypeScript
-   LangChain (@langchain/openai)
-   LlamaIndex (可选)
-   Flowise 组件系统

## 注意事项

1. API Key 格式：支持 `sk-` 前缀的标准格式
2. Base URL 配置：用户可以自定义（支持私有部署）
3. 模型列表缓存：考虑添加缓存机制避免频繁请求
4. 向后兼容：不影响现有节点功能

## 参考文档

-   moduoduo-pro API 文档：https://github.com/9zzg/moduoduo-pro
-   moduoduo-edu-backend AI API 文档：https://github.com/9zzg/moduoduo-edu-backend/blob/main/docs/06_AI_API_v2.md
-   OpenAI API 兼容标准：https://platform.openai.com/docs/api-reference

请基于以上需求创建完整的实现代码。

</details>

_This pull request was created as a result of the following prompt from Copilot chat._

> # 集成 Moduoduo Pro 统一大模型网关
>
> ## 背景
>
> 需要将 moduoduo-pro 的 AI 大模型网关接口集成到 Moduoduo-Agent-Flow 项目中，使用户可以通过统一的 API Key 一键调用所有大模型，所消耗的 token 从 moduoduo-pro 后台统一计费和扣除。
>
> ## 需求
>
> ### 1. 创建 Moduoduo Pro 聊天模型节点
>
> 创建文件：`packages/components/nodes/chatmodels/ModuoduoPro/ModuoduoPro.ts`
>
> **功能要求：**
>
> -   节点类型：Chat Models
> -   支持 OpenAI 兼容接口
> -   基础 URL：`https://www.moduoduo.pro`
> -   动态加载模型列表（调用 `/v1/models` 接口）
> -   支持流式输出和非流式输出
> -   支持 temperature、max_tokens、top_p 等参数配置
> -   使用 LangChain 的 ChatOpenAI 类，通过 configuration.baseURL 指向网关
>
> **参数配置：**
>
> ```typescript
> - Model Name (asyncOptions, 从 API 动态加载)
> - Temperature (number, 0-1, default: 0.7)
> - Max Tokens (number, optional)
> - Top P (number, 0-1, optional)
> - Frequency Penalty (number, -2 to 2, optional)
> - Presence Penalty (number, -2 to 2, optional)
> - Streaming (boolean, default: true)
> ```
>
> **实现要点：**
>
> -   继承或复用现有 ChatOpenAI 的实现模式
> -   在 init 方法中配置 baseURL 为 `https://www.moduoduo.pro/v1`
> -   loadMethods.listModels 调用网关的模型列表接口
> -   错误处理：余额不足、API 限流、模型不可用等场景
>
> ### 2. 创建 API 凭证配置
>
> 创建文件：`packages/components/credentials/ModuoduoProApi.credential.ts`
>
> **功能要求：**
>
> ```typescript
> inputs: [
>     {
>         label: 'Base URL',
>         name: 'moduoduoProBaseURL',
>         type: 'string',
>         default: 'https://www.moduoduo.pro',
>         description: 'Moduoduo Pro gateway base URL'
>     },
>     {
>         label: 'API Key',
>         name: 'moduoduoProApiKey',
>         type: 'password',
>         description: 'Your API key from Moduoduo Pro dashboard',
>         placeholder: 'sk-xxxxxx'
>     }
> ]
> ```
>
> ### 3. 创建 LlamaIndex 版本（可选但推荐）
>
> 创建文件：`packages/components/nodes/chatmodels/ModuoduoPro/ModuoduoPro_LlamaIndex.ts`
>
> **功能要求：**
>
> -   与主节点功能一致
> -   使用 LlamaIndex 的 OpenAI 类
> -   tags: ['LlamaIndex']
> -   baseClasses: ['ModuoduoPro', 'BaseChatModel_LlamaIndex']
>
> ### 4. 添加节点图标
>
> 创建文件：`packages/components/nodes/chatmodels/ModuoduoPro/moduoduo.svg` 或 `.png`
>
> 可以使用简单的占位图标，内容可以是：
>
> ```svg
> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
>   <circle cx="12" cy="12" r="10" stroke-width="2"/>
>   <text x="12" y="16" text-anchor="middle" font-size="10" fill="currentColor">MD</text>
> </svg>
> ```
>
> ### 5. API 接口说明
>
> **模型列表接口：**
>
> ```
> GET https://www.moduoduo.pro/v1/models
> Headers:
>   Authorization: Bearer {apiKey}
>
> Response:
> {
>   "data": [
>     {
>       "id": "gpt-4o",
>       "object": "model",
>       "created": 1626777600,
>       "owned_by": "openai"
>     },
>     ...
>   ]
> }
> ```
>
> **聊天接口：**
>
> ```
> POST https://www.moduoduo.pro/v1/chat/completions
> Headers:
>   Authorization: Bearer {apiKey}
>   Content-Type: application/json
>
> Body:
> {
>   "model": "gpt-4o",
>   "messages": [
>     {"role": "user", "content": "Hello"}
>   ],
>   "stream": true,
>   "temperature": 0.7,
>   "max_tokens": 2000
> }
> ```
>
> ### 6. 实现参考
>
> 参考现有实现：
>
> -   `packages/components/nodes/chatmodels/ChatOpenAI/ChatOpenAI.ts`
> -   `packages/components/nodes/chatmodels/ChatOpenAI/ChatOpenAI_LlamaIndex.ts`
> -   `packages/components/nodes/chatmodels/Groq/ChatGroq.ts`
> -   `packages/components/credentials/OpenAIApi.credential.ts`
>
> ### 7. 错误处理
>
> 需要处理的错误场景：
>
> -   401: API Key 无效或已过期
> -   402: 余额不足（Payment Required）
> -   429: 请求频率限制
> -   500: 上游模型服务不可用
> -   超时处理
>
> ### 8. 类型定义
>
> 确保使用正确的 TypeScript 类型：
>
> ```typescript
> import { ICommonObject, INode, INodeData, INodeOptionsValue, INodeParams } from '../../../src/Interface'
> import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'
> import { ChatOpenAI } from '@langchain/openai'
> ```
>
> ## 验收标准
>
> -   [ ] ModuoduoPro 节点在 Chat Models 分类中可见
> -   [ ] 可以正确配置凭证（Base URL + API Key）
> -   [ ] 模型列表可以动态加载并显示
> -   [ ] 支持流式和非流式对话
> -   [ ] 错误信息友好提示
> -   [ ] 与现有 Agent Flow 节点兼容
> -   [ ] Token 消耗正确传递和显示
>
> ## 技术栈
>
> -   TypeScript
> -   LangChain (@langchain/openai)
> -   LlamaIndex (可选)
> -   Flowise 组件系统
>
> ## 注意事项
>
> 1. API Key 格式：支持 `sk-` 前缀的标准格式
> 2. Base URL 配置：用户可以自定义（支持私有部署）
> 3. 模型列表缓存：考虑添加缓存机制避免频繁请求
> 4. 向后兼容：不影响现有节点功能
>
> ## 参考文档
>
> -   moduoduo-pro API 文档：https://github.com/9zzg/moduoduo-pro
> -   moduoduo-edu-backend AI API 文档：https://github.com/9zzg/moduoduo-edu-backend/blob/main/docs/06_AI_API_v2.md
> -   OpenAI API 兼容标准：https://platform.openai.com/docs/api-reference
>
> 请基于以上需求创建完整的实现代码。

<!-- START COPILOT CODING AGENT TIPS -->

# 完全统一网关模式

// 在 Moduoduo-Agent-Flow 中创建统一的 LLM 节点
// packages/components/nodes/chatmodels/ModuoduoPro/ModuoduoPro.ts

class ModuoduoPro_ChatModel implements INode {
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

    constructor() {
        this.label = 'Moduoduo Pro Gateway'
        this.name = 'moduoduoPro'
        this.version = 1.0
        this.type = 'ModuoduoPro'
        this.icon = 'moduoduo.png' // 需要添加
        this.category = 'Chat Models'
        this.description = 'Unified gateway for all LLMs with centralized billing'
        this.baseClasses = [this.type, 'BaseChatModel']
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['moduoduoProApi']
        }
        this.inputs = [
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'gpt-4o'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.7,
                optional: true
            },
            {
                label: 'Max Tokens',
                name: 'maxTokens',
                type: 'number',
                optional: true
            },
            {
                label: 'Top P',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true
            },
            {
                label: 'Streaming',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true
            }
        ]
    }

    //@ts-ignore
    loadMethods = {
        async listModels(_: INodeData, options: ICommonObject): Promise<INodeOptionsValue[]> {
            const credentialData = await getCredentialData(_.credential ?? '', options)
            const apiKey = getCredentialParam('moduoduoProApiKey', credentialData, _)
            const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, _)

            try {
                // 调用 moduoduo-pro 的模型列表接口
                const response = await fetch(`${baseURL}/v1/models`, {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                })

                const data = await response.json()

                // 转换为 Flowise 需要的格式
                return data.data.map((model: any) => ({
                    label: model.id,
                    name: model.id,
                    description: model.owned_by
                }))
            } catch (error) {
                console.error('Failed to fetch models:', error)
                return []
            }
        }
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const apiKey = getCredentialParam('moduoduoProApiKey', credentialData, nodeData)
        const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, nodeData)

        const temperature = parseFloat(nodeData.inputs?.temperature as string) || 0.7
        const modelName = nodeData.inputs?.modelName as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const topP = nodeData.inputs?.topP as string
        const streaming = nodeData.inputs?.streaming as boolean

        // 使用 ChatOpenAI 类,但指向 moduoduo-pro 的 baseURL
        const { ChatOpenAI } = await import('@langchain/openai')

        const model = new ChatOpenAI({
            openAIApiKey: apiKey,
            modelName: modelName,
            temperature: temperature,
            maxTokens: maxTokens ? parseInt(maxTokens) : undefined,
            topP: topP ? parseFloat(topP) : undefined,
            streaming: streaming,
            configuration: {
                baseURL: baseURL + '/v1'
            }
        })

        return model
    }

}

module.exports = { nodeClass: ModuoduoPro_ChatModel }

# 创建凭证文件

// packages/components/credentials/ModuoduoProApi.credential.ts

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
                default: 'https://www.api.moduoduo.cn',
                placeholder: 'https://www.api.moduoduo.cn'
            },
            {
                label: 'API Key',
                name: 'moduoduoProApiKey',
                type: 'password',
                description: 'Your Moduoduo Pro API key from user dashboard'
            }
        ]
    }

}

module.exports = { credClass: ModuoduoProApi }

# 模型分组

// 按供应商分组显示模型
{
"OpenAI": ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
"Anthropic": ["claude-3.5-sonnet", "claude-3-opus"],
"Google": ["gemini-pro", "gemini-1.5-pro"],
"国产": ["qwen-max", "ernie-4.0", "doubao-pro"]
}

# 计费流程

sequenceDiagram
participant User as 用户
participant AgentFlow as Moduoduo-Agent-Flow
participant Gateway as moduoduo-pro
participant LLM as 大模型提供商
participant DB as 数据库

    User->>AgentFlow: 发起对话
    AgentFlow->>Gateway: POST /v1/chat/completions<br/>(Bearer Token)
    Gateway->>DB: 查询用户余额
    alt 余额充足
        Gateway->>LLM: 调用大模型
        LLM-->>Gateway: 返回结果 + usage
        Gateway->>DB: 扣除 tokens<br/>(prompt + completion)
        Gateway-->>AgentFlow: 返回结果
        AgentFlow-->>User: 显示回复 + 消耗
    else 余额不足
        Gateway-->>AgentFlow: 402 余额不足
        AgentFlow-->>User: 提示充值
    end
