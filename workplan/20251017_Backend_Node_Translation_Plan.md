# 📋 剩余翻译任务计划 (Remaining Translation Plan)

> **项目**: Moduoduo Agent Flow - 后端节点国际化
> **当前进度**: 阶段 1 完成 (前端 100%)，阶段 3 部分完成 (后端节点 20%)

---

## 📊 翻译进度总览

### ✅ 已完成 (Completed)

-   **前端页面**: 100% (27 个页面，34 个命名空间，1100+翻译条目)
-   **后端节点**:
    -   ✅ **Chat Models: 28/28 节点 (100%)** 🎉
        -   包含所有主流大语言模型：OpenAI, Anthropic, Google, Azure, Alibaba, Baidu 等
        -   翻译条目：231+ (English + Chinese)
        -   文件：chatmodels.json (en/zh)
    -   ✅ **Tools: 41/41 节点 (100%)** 🎉
        -   涵盖 8 大类工具：API/搜索/学术/云服务/通讯/文件/实用/集成
        -   翻译条目：410+ (English + Chinese)
        -   文件：tools.json (en/zh)
    -   ✅ Agents: 1/12 节点 (8%)
        -   AirtableAgent

### 📈 当前进度

-   **后端节点翻译**: 70/200+ 节点 (35%)
-   **翻译条目总数**: 640+ (English + Chinese)
-   **已加载翻译**: 140 entries (后端服务器确认)

### ⏳ 待完成 (To Do)

-   **后端节点翻译**: 130+ 节点 (65%)

---

## 🗂️ 节点分类统计

| 分类                 | 节点数量 | 已翻译 | 待翻译 | 进度 | 优先级 | 状态 |
| -------------------- | -------- | ------ | ------ | ---- | ------ | ---- |
| **Chat Models**      | 28       | 28     | 0      | 100% | 🔴 高  | ✅   |
| **Tools**            | 41       | 41     | 0      | 100% | 🔴 高  | ✅   |
| **Document Loaders** | 39       | 0      | 39     | 0%   | 🟡 中  | ⏳   |
| **Vector Stores**    | 24       | 0      | 24     | 0%   | 🟡 中  | ⏳   |
| **Embeddings**       | 15       | 0      | 15     | 0%   | 🟡 中  | ⏳   |
| **Agents**           | 12       | 1      | 11     | 8%   | 🟡 中  | ⏳   |
| **Chains**           | 待统计   | 0      | 待统计 | 0%   | 🟢 低  |
| **Memory**           | 待统计   | 0      | 待统计 | 0%   | 🟢 低  |
| **Text Splitters**   | 待统计   | 0      | 待统计 | 0%   | 🟢 低  |
| **Output Parsers**   | 待统计   | 0      | 待统计 | 0%   | 🟢 低  |
| **Retrievers**       | 待统计   | 0      | 待统计 | 0%   | 🟢 低  |
| **Prompts**          | 待统计   | 0      | 待统计 | 0%   | 🟢 低  |
| **Agentflow**        | 待统计   | 0      | 待统计 | 0%   | 🟢 低  |
| **其他**             | 待统计   | 0      | 待统计 | 0%   | 🟢 低  |

---

## 📅 分阶段翻译计划

### ✅ Phase 1: Chat Models - 高优先级 【已完成】

**状态**: ✅ 100% 完成
**完成时间**: 2025-10-17
**实际工作量**: ~6 小时

#### 完成的节点列表 (28 个):

```
1. ✅ ChatOpenAI
2. ✅ Azure ChatOpenAI
3. ✅ ChatAnthropic
4. ✅ ChatGoogleGenerativeAI
5. ✅ ChatMistralAI
6. ✅ GroqChat
7. ✅ ChatOllama
8. ✅ ChatHuggingFace
9. ✅ AWS ChatBedrock
10. ✅ ChatCohere
11. ✅ ChatAlibabaTongyi - 阿里通义千问
12. ✅ ChatBaiduWenxin - 百度文心一言
13. ✅ ChatCerebras - Cerebras AI
14. ✅ ChatCometAPI - Comet API
15. ✅ ChatFireworks - Fireworks AI
16. ✅ ChatGoogleVertexAI - Google Vertex AI
17. ✅ ChatIBMWatsonx - IBM Watsonx
18. ✅ ChatLitellm - LiteLLM
19. ✅ ChatLocalAI - LocalAI
20. ✅ ChatNemoGuardrails - NVIDIA Nemo
21. ✅ ChatNvdiaNIM - NVIDIA NIM
22. ✅ ChatOpenAICustom - 自定义OpenAI
23. ✅ ChatOpenRouter - OpenRouter
24. ✅ ChatPerplexity - Perplexity AI
25. ✅ ChatSambanova - SambaNova
26. ✅ ChatTogetherAI - Together AI
27. ✅ ChatXAI - xAI (Grok)
28. ✅ Deepseek - Deepseek AI
```

**已完成的文件**:

-   ✅ `packages/components/locales/en/nodes/chatmodels.json` (231+ 翻译条目)
-   ✅ `packages/components/locales/zh/nodes/chatmodels.json` (231+ 翻译条目)
-   ✅ 已更新 28 个节点源码文件，添加 i18n keys
-   ✅ 已验证后端 API 返回正确的中文翻译

---

### ✅ Phase 2: Tools - 高优先级 【已完成】

**状态**: ✅ 100% 完成
**完成时间**: 2025-10-17
**实际工作量**: ~10 小时

#### 已完成工具类别 (41 个节点):

1. **API/Request 工具 (7 个)**:

    - ✅ RequestsGet, RequestsPost, RequestsPut, RequestsDelete
    - ✅ OpenAPIToolkit, CustomTool, ChainTool

2. **搜索工具 (8 个)**:

    - ✅ GoogleSearchAPI, SerpAPI, Serper, BraveSearchAPI
    - ✅ SearchAPI, Searxng, TavilyAPI, ExaSearch

3. **学术/研究工具 (2 个)**:

    - ✅ Arxiv, WolframAlpha

4. **云服务工具 (2 个)**:

    - ✅ AWSDynamoDBKVStorage, AWSSNS

5. **通讯工具 (6 个)**:

    - ✅ Gmail, GoogleCalendar, GoogleDocs, GoogleDrive, GoogleSheets
    - ✅ MicrosoftOutlook, MicrosoftTeams

6. **文件操作 (3 个)**:

    - ✅ ReadFile, WriteFile, WebScraperTool

7. **实用工具 (5 个)**:

    - ✅ Calculator, CurrentDateTime, JSONPathExtractor
    - ✅ CodeInterpreterE2B, WebBrowser

8. **集成工具 (7 个)**:
    - ✅ Jira, Composio, StripeTool
    - ✅ AgentAsTool, ChatflowTool, RetrieverTool, QueryEngineTool

**已完成的文件**:

-   ✅ `packages/components/locales/en/nodes/tools.json` (410+ 翻译条目)
-   ✅ `packages/components/locales/zh/nodes/tools.json` (410+ 翻译条目)
-   ✅ 已更新 41 个节点源码文件，添加 i18n keys
-   ✅ 已验证后端 API 返回正确的中文翻译

---

### 🟡 Phase 3: Document Loaders (39 个) - 中优先级

**目标**: 完成所有 Document Loaders 节点翻译
**预计工作量**: 6-8 小时
**截止时间**: 建议 3 周内完成

#### 文档加载器类别:

-   文件加载器 (PDF, Word, Excel, CSV 等)
-   网络加载器 (Web Scraper, Cheerio, Puppeteer 等)
-   云存储加载器 (S3, Google Drive, Dropbox 等)
-   API 加载器 (Notion, Confluence, GitHub 等)
-   数据库加载器 (SQL, MongoDB 等)

**翻译文件**:

-   `packages/components/locales/en/nodes/documentloaders.json` (待创建)
-   `packages/components/locales/zh/nodes/documentloaders.json` (待创建)

---

### 🟡 Phase 4: Vector Stores (24 个) - 中优先级

**目标**: 完成所有 Vector Stores 节点翻译
**预计工作量**: 4-6 小时
**截止时间**: 建议 3 周内完成

#### 向量存储类别:

-   本地向量存储 (FAISS, Chroma, LanceDB 等)
-   云向量存储 (Pinecone, Weaviate, Qdrant 等)
-   数据库向量存储 (PostgreSQL+pgvector, Redis 等)
-   专用向量存储 (Milvus, Vespa 等)

**翻译文件**:

-   `packages/components/locales/en/nodes/vectorstores.json` (待创建)
-   `packages/components/locales/zh/nodes/vectorstores.json` (待创建)

---

### 🟡 Phase 5: Embeddings (15 个) - 中优先级

**目标**: 完成所有 Embeddings 节点翻译
**预计工作量**: 3-4 小时
**截止时间**: 建议 4 周内完成

#### 嵌入模型类别:

-   OpenAI Embeddings
-   HuggingFace Embeddings
-   Cohere Embeddings
-   Local Embeddings (Ollama, LocalAI 等)
-   云服务 Embeddings (Azure, Google 等)

**翻译文件**:

-   `packages/components/locales/en/nodes/embeddings.json` (待创建)
-   `packages/components/locales/zh/nodes/embeddings.json` (待创建)

---

### 🟡 Phase 6: Agents (剩余 11 个) - 中优先级

**目标**: 完成所有 Agents 节点翻译
**预计工作量**: 4-5 小时
**截止时间**: 建议 4 周内完成

#### 待翻译智能体 (11 个):

```
1. ✅ AirtableAgent (已完成)

--- 以下待翻译 ---

2. ⏳ ConversationalAgent - 对话智能体
3. ⏳ ConversationalRetrievalToolAgent - 对话检索工具智能体
4. ⏳ CSVAgent - CSV数据智能体
5. ⏳ OpenAIAssistant - OpenAI助手
6. ⏳ AutoGPT - AutoGPT
7. ⏳ BabyAGI - BabyAGI
8. ⏳ OpenAIToolAgent (LlamaIndex) - OpenAI工具智能体
9. ⏳ AnthropicAgent (LlamaIndex) - Anthropic智能体
10. ⏳ ReActAgent - ReAct智能体
11. ⏳ ToolAgent - 工具智能体
12. ⏳ 其他智能体
```

**翻译文件**:

-   `packages/components/locales/en/nodes/agents.json` (已存在，需扩充)
-   `packages/components/locales/zh/nodes/agents.json` (已存在，需扩充)

---

### 🟢 Phase 7-10: 其他节点类别 - 低优先级

**预计工作量**: 10-15 小时
**截止时间**: 建议 6-8 周内完成

#### 待翻译类别:

-   **Chains** (链) - 各种 LangChain 链
-   **Memory** (记忆) - 对话记忆模块
-   **Text Splitters** (文本分割器) - 文档分割工具
-   **Output Parsers** (输出解析器) - 结构化输出
-   **Retrievers** (检索器) - 文档检索工具
-   **Prompts** (提示词) - 提示词模板
-   **Agentflow** (智能体流程) - 流程节点
-   **其他工具类**

---

## 🎯 翻译优先级策略

### 优先级排序依据：

1. **使用频率**: Chat Models 和 Tools 最常用
2. **用户体验**: 核心功能优先翻译
3. **完整性**: 先完成整个类别，再切换到下一个
4. **依赖关系**: 底层节点优先于高层节点

### 推荐执行顺序：

```
Phase 1 (Chat Models 18个)
  ↓
Phase 2 (Tools 42个)
  ↓
Phase 3 (Document Loaders 39个)
  ↓
Phase 4 (Vector Stores 24个)
  ↓
Phase 5 (Embeddings 15个)
  ↓
Phase 6 (Agents 11个)
  ↓
Phase 7-10 (其他类别)
```

---

## 📝 翻译工作流程

### 1. 准备阶段

```bash
# 创建/更新翻译文件
touch packages/components/locales/en/nodes/[category].json
touch packages/components/locales/zh/nodes/[category].json
```

### 2. 翻译阶段

对每个节点：

1. 分析节点源码 (`packages/components/nodes/[category]/[NodeName]/`)
2. 提取需要翻译的字段：
    - `label` - 节点标签
    - `description` - 节点描述
    - `category` - 分类名称
    - `inputs[].label` - 输入字段标签
    - `inputs[].description` - 输入字段描述
    - `inputs[].placeholder` - 输入字段占位符
    - `inputs[].options` - 选项标签
3. 编写英文翻译 (en/nodes/[category].json)
4. 编写中文翻译 (zh/nodes/[category].json)

### 3. 集成阶段

更新节点源码：

```typescript
class MyNode implements INode {
    constructor() {
        // 添加i18n键
        this.labelKey = 'nodes.myNode.label'
        this.descriptionKey = 'nodes.myNode.description'
        this.categoryKey = 'nodes.myNode.category'

        // 保留英文作为fallback
        this.label = 'My Node'
        this.description = 'Description...'
        this.category = 'Category'
    }
}
```

### 4. 测试阶段

```bash
# 测试翻译服务
cd packages/components/locales
node test.js

# 测试API
curl "http://localhost:8000/api/v1/nodes?lang=zh"
```

---

## 📦 翻译文件结构

### 标准 JSON 模板

```json
{
    "nodeName": {
        "label": "Node Label",
        "description": "Node description",
        "category": "Category Name",
        "credential": {
            "label": "Connect Credential"
        },
        "inputs": {
            "inputField1": {
                "label": "Field Label",
                "description": "Field description",
                "placeholder": "Placeholder text"
            },
            "inputField2": {
                "label": "Another Field",
                "options": {
                    "option1": "Option 1 Label",
                    "option2": "Option 2 Label"
                }
            }
        }
    }
}
```

---

## ⏱️ 工作量预估

### 单个节点平均翻译时间

-   **简单节点** (3-5 个输入): 15-20 分钟
-   **中等节点** (6-10 个输入): 25-35 分钟
-   **复杂节点** (10+个输入): 40-60 分钟

### 总体预估 (剩余 189 个节点)

-   **最快**: 40-50 小时 (每个节点平均 15 分钟)
-   **正常**: 60-80 小时 (每个节点平均 25 分钟)
-   **谨慎**: 90-120 小时 (每个节点平均 35 分钟)

### 建议的工作分配

-   **每天工作 2 小时**: 30-60 天完成
-   **每天工作 4 小时**: 15-30 天完成
-   **全职投入**: 8-15 天完成

---

## 🎨 并行任务：前端样式和 UI 优化

在进行翻译的同时，可以并行执行以下 UI 改进任务：

### 可以同步进行的 UI 任务

1. **主题优化**

    - 深色模式细节调整
    - 颜色一致性检查
    - 字体大小和间距优化

2. **组件样式改进**

    - 按钮样式统一
    - 卡片组件优化
    - 表单输入框美化

3. **响应式设计**

    - 移动端适配
    - 平板端适配
    - 小屏幕优化

4. **动画和交互**

    - 页面切换动画
    - 加载状态优化
    - 交互反馈改进

5. **布局优化**
    - 侧边栏改进
    - 导航栏优化
    - 内容区域布局

这些 UI 任务不依赖翻译，可以随时开始！

---

## ✅ 质量检查清单

### 翻译质量标准

-   [ ] 所有字段都有对应翻译
-   [ ] 中文翻译准确、专业
-   [ ] 英文翻译完整、规范
-   [ ] 技术术语处理恰当
-   [ ] 格式和标点正确
-   [ ] JSON 语法无误

### 代码集成检查

-   [ ] 节点添加了 i18n 键
-   [ ] 保留了英文 fallback
-   [ ] 翻译文件命名正确
-   [ ] 分类映射配置正确

### 功能测试

-   [ ] 前端语言切换正常
-   [ ] API 返回正确翻译
-   [ ] 缺失翻译有 fallback
-   [ ] 控制台无错误

---

## 🔗 相关文档

-   [后端 i18n 架构文档](docs/backend-i18n-architecture.md)
-   [UI 前端技术文档](README-UI.md)
-   [国际化实施指南](I18N_IMPLEMENTATION_GUIDE.md)
-   [翻译报告](TRANSLATION_REPORT.md)

---

## 📞 协作说明

### 开始翻译前

1. 确认当前要翻译的类别
2. 检查是否有人已在翻译
3. 更新本文档的进度状态

### 完成翻译后

1. 提交翻译文件
2. 更新节点源码
3. 运行测试验证
4. 更新本文档进度
5. 创建 git commit

### Commit 消息格式

```
feat(i18n): 完成 [Category] 节点翻译

- 新增 [X] 个节点翻译
- 文件: en/nodes/[category].json, zh/nodes/[category].json
- 节点列表: [Node1, Node2, Node3...]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

**最后更新**: 2025-10-18
**文档版本**: 2.0.0
**当前进度**: 70/200+ 节点 (35%)
**已完成阶段**: Phase 1 (Chat Models) ✅, Phase 2 (Tools) ✅
**预计完成**: 根据投入时间而定 (建议 4-6 周)
