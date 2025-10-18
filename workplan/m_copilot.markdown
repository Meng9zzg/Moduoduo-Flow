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

# 我之前另外一个项目是如何成功实现接入 moduoduopro 的 apikey 的

# moduoduo-edu-backend 的实现原理

## 核心架构图

graph TB
A[FastAPI 后端] --> B[统一聊天入口 /ai/chat]
B --> C{意图识别}
C -->|stem_qa| D[理科问答]
C -->|humanities_qa| E[人文问答]
C -->|vision_qa| F[图像理解]
C -->|t2i| G[文生图]
C -->|t2v| H[文生视频]
C -->|codegen| I[代码生成]

    D --> J[moduoduo-pro Gateway]
    E --> J
    F --> J
    G --> J
    H --> J
    I --> J

    J --> K[Token 扣费]
    K --> L[返回结果]

## 关键实现要点

### 1. 配置管理（app/core/config.py）

class Settings(BaseSettings): # === 核心配置 ===
NEW_API_BASE_URL: str = "https://www.api.moduoduo.cn" # moduoduo-pro 网关地址
NEW_API_KEY: str = "" # API Key（从环境变量读取）

    # === 各场景使用的模型 ===
    AI_DEFAULT_HUMANITIES_MODEL: str = "ernie-4.5-turbo-vl"  # 人文问答
    AI_STEM_MODEL: str = "qwen3-235b-a22b-thinking-2507"    # 理科问答
    AI_VISION_MODEL: str = "ernie-4.5-turbo-vl"             # 图像理解
    AI_T2I_MODEL: str = "Doubao-seedream-3-0-t2i"           # 文生图
    AI_T2V_MODEL: str = "Doubao-seedance-1-0-pro"           # 文生视频
    AI_CODE_MODEL: str = "qwen3-coder-plus"                 # 代码生成

    # === 意图识别服务（Claude）===
    AI_INTENT_BASE_URL: str = "https://www.moduoduo.pro"
    AI_INTENT_KEY: str = ""
    AI_INTENT_MODEL: str = "claude-sonnet-4-20250514"

    # === 请求配置 ===
    AI_REQUEST_TIMEOUT: int = 600  # 10分钟超时
    AI_REQUIRE_AUTH: bool = True   # 需要鉴权
    AI_RATE_LIMIT_PER_MINUTE: int = 60  # 每分钟60次请求

### 2. 核心接入逻辑（app/api/ai.py）

#### 2.1 构建请求头（第 70-78 行）

async def \_auth_headers(provider: str, db: AsyncSession, user: User | None) -> dict:
"""
核心函数：获取有效的 API Key 并构建请求头 - 支持用户级别、学校级别、全局 Key 的优先级
"""
rk = await resolve_effective_key(provider, db, user)
if not rk.key:
raise HTTPException(status_code=500, detail=f"No upstream key configured for provider={provider}")

    # 关键：自动补齐 sk- 前缀
    token = _normalize_key(provider, rk.key)

    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

关键点：

✅ API Key 可以从数据库动态读取（支持用户自己的 Key）
✅ 自动标准化 Key 格式（补齐 sk- 前缀）

#### 2.2 调用 moduoduo-pro 的三个端点

A. 文本对话（第 169-195 行）
async def \_handle_stem_qa(payload: ChatRequest, request: Request, user: User | None, db: AsyncSession):
"""理科问答：调用 /v1/chat/completions"""
model = settings.AI_STEM_MODEL # 选择模型

    # 构建完整 URL
    url = f"{settings.NEW_API_BASE_URL.rstrip('/')}/v1/chat/completions"

    # 获取 API Key
    headers = await _auth_headers("new_api", db, user)

    # 构建请求体
    messages = [m.model_dump() for m in payload.messages]
    if "system" not in roles:
        messages.insert(0, {"role": "system", "content": "你是一个理科学习助教..."})

    json_payload = {
        "model": model,
        "messages": messages,
        "stream": bool(payload.stream),  # 支持流式和非流式
    }

    # 发送请求
    if payload.stream:
        return StreamingResponse(
            _stream_response(url, headers, json_payload),
            media_type="text/event-stream",
        )
    else:
        async with httpx.AsyncClient(timeout=settings.AI_REQUEST_TIMEOUT) as client:
            r = await client.post(url, headers=headers, json=json_payload)
            if r.status_code != 200:
                raise HTTPException(status_code=r.status_code, detail=f"Upstream error: {r.text}")
            return JSONResponse(r.json())

B. 文生图（第 507-523 行）
@router.post("/draw")
async def draw_image(payload: DrawRequest, ...):
"""调用 /v1/images/generations"""

    # 注意：URL 不同！
    url = f"{settings.NEW_API_BASE_URL.rstrip('/')}/v1/images/generations"
    headers = await _auth_headers("new_api", db, user)

    json_payload = {
        "model": settings.AI_T2I_MODEL,  # 文生图模型
        "prompt": payload.prompt,
        "size": payload.size,
        "n": payload.n,
        "response_format": payload.response_format,
    }

    async with httpx.AsyncClient(timeout=settings.AI_REQUEST_TIMEOUT) as client:
        r = await client.post(url, headers=headers, json=json_payload)
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return JSONResponse(r.json())

C. 文生视频（第 526-554 行）
@router.post("/video/task")
async def video_task_submit(payload: VideoTaskSubmitRequest, ...):
"""调用 /doubao/contents/generations/tasks（豆包特殊端点）"""

    # 注意：URL 完全不同！
    url = f"{settings.NEW_API_BASE_URL.rstrip('/')}/doubao/contents/generations/tasks"
    headers = await _auth_headers("new_api", db, user)

    json_payload = {
        "model": payload.model or settings.AI_T2V_MODEL,
        "content": [c.model_dump() for c in payload.content],  # 支持文本+图片
    }

    # 第一步：提交任务
    r = await client.post(url, headers=headers, json=json_payload)
    return JSONResponse(r.json())  # 返回 task_id

# 第二步：查询任务状态

@router.get("/video/task/{task_id}")
async def video_task_fetch(task_id: str, ...):
url = f"{settings.NEW_API_BASE_URL.rstrip('/')}/doubao/contents/generations/tasks/{task_id}"
r = await client.get(url, headers=headers)
return JSONResponse(r.json()) # 返回视频 URL

#### 3. 流式响应处理（第 51-62 行）

async def \_stream_response(url: str, headers: dict, json_payload: dict) -> AsyncIterator[bytes]:
"""
通用的 SSE 流式响应处理 - 透传 moduoduo-pro 的流式输出 - 逐行返回给前端
"""
async with httpx.AsyncClient(timeout=settings.AI_REQUEST_TIMEOUT) as client:
async with client.stream("POST", url, headers=headers, json=json_payload) as r:
if r.status_code != 200:
body = await r.aread()
raise HTTPException(status_code=r.status_code, detail=body.decode(errors="ignore"))

            # 逐行读取并转发
            async for line in r.aiter_lines():
                if not line:
                    continue
                # 关键：保持 SSE 格式（data: xxx\n\n）
                yield (line + "\n\n").encode("utf-8")

对比：moduoduo-edu-backend vs Moduoduo-Agent-Flow
对比项 moduoduo-edu-backend（Python） Moduoduo-Agent-Flow（TypeScript）
API 调用库 httpx.AsyncClient fetch API 或 ChatOpenAI 类
Base URL 配置 环境变量 NEW_API_BASE_URL 凭证中的 moduoduoProBaseURL
API Key 管理 数据库存储（支持多级） Flowise 凭证系统
流式处理 StreamingResponse + aiter_lines() LangChain 内置流式支持
端点差异处理 手动构建不同 URL 需要在节点中区分
Token 计费 moduoduo-pro 自动扣费 moduoduo-pro 自动扣费（相同）

### 当前问题诊断

您的 Chat Models 节点模型列表无法加载，根据 moduoduo-edu-backend 的实现，我发现您的代码中：
✅ 做对的地方：
// ModuoduoPro.ts 第 154-161 行
const response = await fetch(`${baseURL}/v1/models`, {
method: 'GET',
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${moduoduoProApiKey}`, // ✅ 正确
'User-Agent': 'Flowise-ModuoduoPro-Client/1.0'
}
})

❌ 需要修复的地方：
// ModuoduoPro.ts 第 233 行 - 硬编码了 Base URL
configuration: {
baseURL: 'https://www.moduoduo.pro/v1' // ❌ 应该从凭证读取
}

// 应该改为：
const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, nodeData) || 'https://www.moduoduo.pro'
configuration: {
baseURL: baseURL + '/v1' // ✅ 动态读取
}

## 完整修复方案

基于 moduoduo-edu-backend 的成功经验，您的 Moduoduo-Agent-Flow 需要：

修复 Chat Models 节点

// packages/components/nodes/chatmodels/ModuoduoPro/ModuoduoPro.ts

async init(nodeData: INodeData, \_: string, options: ICommonObject): Promise<any> {
// ... 其他代码 ...

    const credentialData = await getCredentialData(nodeData.credential ?? '', options)
    const moduoduoProApiKey = getCredentialParam('moduoduoProApiKey', credentialData, nodeData)

    // ⭐ 关键修复：动态读取 Base URL
    const baseURL = getCredentialParam('moduoduoProBaseURL', credentialData, nodeData) || 'https://www.moduoduo.pro'

    const obj: any = {
        temperature: parseFloat(temperature),
        modelName,
        openAIApiKey: moduoduoProApiKey,
        apiKey: moduoduoProApiKey,
        streaming: streaming ?? true,
        configuration: {
            baseURL: baseURL + '/v1'  // ⭐ 使用动态 Base URL
        }
    }

    // ... 其他配置 ...

    const model = new ChatOpenAI(nodeData.id, obj)
    return model

}

同步修复 LLMs 和 LlamaIndex 节点
对以下文件应用相同的修复：

packages/components/nodes/llms/ModuoduoPro/ModuoduoPro.ts
packages/components/nodes/chatmodels/ModuoduoPro/ChatModuoduoPro_LlamaIndex.ts

### 测试验证

1. 先用 curl 测试 API

# 测试模型列表（参考 edu-backend 的做法）

curl -X GET "https://www.moduoduo.pro/v1/models" \
 -H "Authorization: Bearer YOUR_API_KEY" \
 -H "Content-Type: application/json"

# 测试聊天接口

curl -X POST "https://www.moduoduo.pro/v1/chat/completions" \
 -H "Authorization: Bearer YOUR_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{
"model": "gpt-4o-mini",
"messages": [{"role": "user", "content": "你好"}],
"stream": false
}'

2. 查看后端日志

# 启动开发服务器并查看日志

pnpm dev

应该看到类似 edu-backend 的日志：
Fetching models from: https://www.moduoduo.pro/v1/models
Using API Key: sk-HKgB...
Moduoduo Pro models response: {...}

# 总结：edu-backend 的成功经验

统一网关地址 - 所有端点都用同一个 Base URL 前缀
动态 API Key - 支持从数据库读取，您可以从凭证读取
端点区分 - 文本、图片、视频使用不同的路径
流式透传 - 直接转发 moduoduo-pro 的流式输出
错误处理 - 捕获上游错误并友好提示
超时配置 - 600 秒超时（视频生成需要时间）

# 核心代码模式：

url = f"{settings.NEW_API_BASE_URL.rstrip('/')}/v1/chat/completions"
headers = {"Authorization": f"Bearer {api_key}"}
response = await client.post(url, headers=headers, json=payload)

Agent Flow 项目只需要确保 Base URL 从凭证动态读取，就能像 edu-backend 一样正常工作！
