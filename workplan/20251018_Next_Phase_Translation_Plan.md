# 📋 后续翻译任务计划 (Next Phase Translation Plan)

> **日期**: 2025-10-18
> **状态**: ✅ 已完成 Phase 3-6
> **已完成**: Phase 1 (Chat Models 28 个) ✅ + Phase 2 (Tools 41 个) ✅ + Phase 3 (Document Loaders 42 个) ✅ + Phase 4 (Vector Stores 26 个) ✅ + Phase 5 (Embeddings 18 个) ✅ + Phase 6 (Agents 15 个) ✅
> **当前进度**: 170/200+ 节点 (85%)

---

## 📊 后续任务优先级排序

### 🟡 中优先级任务 (建议按顺序执行)

| 阶段        | 分类             | 节点数    | 预计工作量 | 优先级理由                    |
| ----------- | ---------------- | --------- | ---------- | ----------------------------- |
| **Phase 3** | Document Loaders | 48        | 10-12h     | 文档加载是 RAG 应用的核心功能 |
| **Phase 4** | Vector Stores    | 36        | 7-9h       | 向量存储是 RAG 应用的基础设施 |
| **Phase 5** | Embeddings       | 18        | 4-5h       | 嵌入模型是向量化的必需组件    |
| **Phase 6** | Agents           | 15 (剩余) | 4-5h       | 智能体是高级功能，已完成 1 个 |

**总计**: 117 个节点，预计 25-31 小时工作量

---

## 📅 Phase 3: Document Loaders (48 个) - 中优先级

### 任务概述

-   **节点数量**: 48 个
-   **预计工作量**: 10-12 小时
-   **优先级**: 🟡 中
-   **建议完成时间**: 3-5 天

### 分类说明

文档加载器是 RAG（检索增强生成）应用的核心组件，负责从各种数据源加载文档内容。

### 主要节点类别

#### 1. 文件加载器 (~15 个)

```
- PDF Loader (多种变体)
- Docx Loader
- Text File Loader
- CSV Loader
- JSON Loader
- Excel/XLSX Loader
- Markdown Loader
等
```

#### 2. 网络加载器 (~10 个)

```
- Cheerio Web Scraper
- Puppeteer Web Scraper
- Playwright Web Scraper
- API Loader
- Sitemap Loader
等
```

#### 3. 云存储加载器 (~8 个)

```
- S3 File Loader
- Google Drive Loader
- Dropbox Loader
- Azure Blob Storage
等
```

#### 4. API/SaaS 加载器 (~10 个)

```
- Notion Loader
- Confluence Loader
- GitHub Loader
- GitBook Loader
- Airtable Loader
等
```

#### 5. 数据库加载器 (~5 个)

```
- MongoDB Loader
- SQL Database Loader
- Firestore Loader
等
```

### 翻译文件

-   **创建**: `packages/components/locales/en/nodes/documentloaders.json`
-   **创建**: `packages/components/locales/zh/nodes/documentloaders.json`
-   **更新**: 48 个节点源码文件

### 预计产出

-   英文翻译条目: ~500+
-   中文翻译条目: ~500+
-   总计: ~1000+ 条目

---

## 📅 Phase 4: Vector Stores (36 个) - 中优先级

### 任务概述

-   **节点数量**: 36 个
-   **预计工作量**: 7-9 小时
-   **优先级**: 🟡 中
-   **建议完成时间**: 2-3 天

### 分类说明

向量存储是 RAG 应用的基础设施，用于存储和检索向量化的文档数据。

### 主要节点类别

#### 1. 本地向量存储 (~10 个)

```
- FAISS
- Chroma
- LanceDB
- Hnswlib
- In-Memory Vector Store
等
```

#### 2. 云向量存储 (~12 个)

```
- Pinecone
- Weaviate
- Qdrant
- Zilliz
- Milvus
- Elasticsearch
等
```

#### 3. 数据库向量存储 (~8 个)

```
- PostgreSQL (pgvector)
- Redis
- MongoDB Atlas
- Supabase
- Upstash Vector
等
```

#### 4. 专用向量存储 (~6 个)

```
- SingleStore
- Vectara
- Couchbase
- Vespa
等
```

### 翻译文件

-   **创建**: `packages/components/locales/en/nodes/vectorstores.json`
-   **创建**: `packages/components/locales/zh/nodes/vectorstores.json`
-   **更新**: 36 个节点源码文件

### 预计产出

-   英文翻译条目: ~400+
-   中文翻译条目: ~400+
-   总计: ~800+ 条目

---

## 📅 Phase 5: Embeddings (18 个) - 中优先级

### 任务概述

-   **节点数量**: 18 个
-   **预计工作量**: 4-5 小时
-   **优先级**: 🟡 中
-   **建议完成时间**: 1-2 天

### 分类说明

嵌入模型负责将文本转换为向量表示，是向量搜索的前置步骤。

### 主要节点类别

#### 1. OpenAI Embeddings (~3 个)

```
- OpenAI Embeddings
- Azure OpenAI Embeddings
- OpenAI Custom Embeddings
```

#### 2. HuggingFace Embeddings (~3 个)

```
- HuggingFace Inference Embeddings
- HuggingFace Inference API Embeddings
- Transformers Embeddings
```

#### 3. 其他云服务 (~6 个)

```
- Cohere Embeddings
- Google Vertex AI Embeddings
- Google PaLM Embeddings
- Mistral Embeddings
- Voyage AI Embeddings
等
```

#### 4. 本地/开源 Embeddings (~6 个)

```
- Ollama Embeddings
- LocalAI Embeddings
- TensorFlow Embeddings
- Llama Index Embeddings
等
```

### 翻译文件

-   **创建**: `packages/components/locales/en/nodes/embeddings.json`
-   **创建**: `packages/components/locales/zh/nodes/embeddings.json`
-   **更新**: 18 个节点源码文件

### 预计产出

-   英文翻译条目: ~200+
-   中文翻译条目: ~200+
-   总计: ~400+ 条目

---

## 📅 Phase 6: Agents (15 个剩余) - 中优先级

### 任务概述

-   **已完成**: 1 个 (AirtableAgent)
-   **剩余节点**: 15 个
-   **预计工作量**: 4-5 小时
-   **优先级**: 🟡 中
-   **建议完成时间**: 1-2 天

### 待翻译节点列表

#### LangChain Agents (~8 个)

```
- Conversational Agent
- Conversational Retrieval Tool Agent
- CSV Agent
- OpenAI Assistant
- OpenAI Function Agent
- ReAct Agent
- Tool Calling Agent
- XML Agent
```

#### AutoGPT/BabyAGI (~2 个)

```
- AutoGPT
- BabyAGI
```

#### LlamaIndex Agents (~5 个)

```
- OpenAI Tool Agent (LlamaIndex)
- Anthropic Agent (LlamaIndex)
- ReAct Agent (LlamaIndex)
- Tool Agent (LlamaIndex)
- Function Agent (LlamaIndex)
```

### 翻译文件

-   **更新**: `packages/components/locales/en/nodes/agents.json`
-   **更新**: `packages/components/locales/zh/nodes/agents.json`
-   **更新**: 15 个节点源码文件

### 预计产出

-   英文翻译条目: ~180+
-   中文翻译条目: ~180+
-   总计: ~360+ 条目

---

## 🎯 推荐执行方案

### 方案 A: 快速完成核心功能 (推荐)

**执行顺序**: Phase 3 → Phase 5 → Phase 4 → Phase 6

**理由**:

1. Document Loaders (48 个) - RAG 核心，优先完成
2. Embeddings (18 个) - 最少节点，快速完成
3. Vector Stores (36 个) - 配套基础设施
4. Agents (15 个) - 高级功能收尾

**优势**:

-   先完成最常用的文档加载功能
-   中间穿插较小任务保持节奏
-   最后完成高级智能体功能

**预计时间**: 25-31 小时，约 3-4 周（每天 2 小时）

---

### 方案 B: 按分类完整性 (标准)

**执行顺序**: Phase 3 → Phase 4 → Phase 5 → Phase 6

**理由**:

1. 按照使用流程顺序：文档加载 → 向量存储 → 嵌入模型 → 智能体
2. 完整的 RAG 应用链路
3. 便于整体测试

**优势**:

-   逻辑清晰，便于理解
-   符合技术架构层次
-   便于分阶段测试验证

**预计时间**: 25-31 小时，约 3-4 周（每天 2 小时）

---

### 方案 C: 先易后难 (保守)

**执行顺序**: Phase 5 → Phase 6 → Phase 4 → Phase 3

**理由**:

1. Embeddings (18 个) - 节点最少
2. Agents (15 个) - 已有 1 个完成，熟悉流程
3. Vector Stores (36 个) - 中等数量
4. Document Loaders (48 个) - 节点最多

**优势**:

-   快速看到成果，增强信心
-   逐步适应工作量
-   避免一开始面对大任务

**预计时间**: 25-31 小时，约 3-4 周（每天 2 小时）

---

## 📝 每个 Phase 的执行步骤

### 1. 准备阶段 (5-10 分钟)

```bash
# 1. 创建翻译文件
touch packages/components/locales/en/nodes/[category].json
touch packages/components/locales/zh/nodes/[category].json

# 2. 统计节点列表
find packages/components/nodes/[category] -name "*.ts" | grep -v index.ts

# 3. 创建任务清单
```

### 2. 翻译阶段 (核心工作)

-   使用 Task Agent 并行翻译
-   建议每批处理 10-15 个节点
-   每个节点包括：label, description, category, inputs 等

### 3. 集成阶段 (自动化)

-   批量更新节点源码，添加 i18n keys
-   保留英文作为 fallback

### 4. 构建和测试 (10-15 分钟)

```bash
# 1. 构建组件包
cd packages/components && pnpm build

# 2. 重启后端服务器（会自动加载新翻译）

# 3. 测试API
curl "http://localhost:8000/api/v1/nodes?lang=zh" | grep [nodeName]

# 4. 前端测试
# 在Canvas页面验证节点显示
```

### 5. 文档更新 (5 分钟)

-   更新 workplan 文档
-   记录完成的节点数和翻译条目数
-   更新进度百分比

---

## 🔢 总体进度预测

### 当前状态

-   ✅ **已完成**: 70/200+ 节点 (35%)
-   ✅ **翻译条目**: 640+ (English + Chinese)
-   ✅ **完成阶段**: Phase 1 (Chat Models), Phase 2 (Tools)

### 完成 Phase 3-6 后

-   🎯 **预计完成**: 187/200+ 节点 (93.5%)
-   🎯 **翻译条目**: ~3,200+ (English + Chinese)
-   🎯 **完成阶段**: Phase 1-6 全部完成

### 剩余任务（Phase 7-10）

-   ⏳ Chains (链)
-   ⏳ Memory (记忆)
-   ⏳ Text Splitters (文本分割器)
-   ⏳ Output Parsers (输出解析器)
-   ⏳ Retrievers (检索器)
-   ⏳ Prompts (提示词)
-   ⏳ 其他低频节点

**预计**: ~20-30 个节点，5-8 小时工作量

---

## ✅ 质量保证

### 每个 Phase 完成后的检查清单

-   [ ] 所有节点都已添加英文和中文翻译
-   [ ] 节点源码已更新 i18n keys
-   [ ] 翻译 JSON 文件语法正确
-   [ ] pnpm build 成功无报错
-   [ ] 后端加载翻译条目数量增加
-   [ ] API 测试返回正确中文翻译
-   [ ] 前端 Canvas 页面显示中文
-   [ ] workplan 文档已更新
-   [ ] Git commit 已创建

---

## 🚀 开始执行建议

### 推荐：方案 A（快速完成核心功能）

#### Week 1: Phase 3 (Document Loaders - 48 个)

-   Day 1-2: 前 20 个节点
-   Day 3-4: 中间 20 个节点
-   Day 5: 最后 8 个节点 + 测试验证

#### Week 2: Phase 5 (Embeddings - 18 个)

-   Day 1-2: 完成所有 18 个节点
-   Day 3: 测试验证 + 文档更新

#### Week 3: Phase 4 (Vector Stores - 36 个)

-   Day 1-2: 前 18 个节点
-   Day 3-4: 后 18 个节点
-   Day 5: 测试验证

#### Week 4: Phase 6 (Agents - 15 个)

-   Day 1-2: 完成所有 15 个节点
-   Day 3: 全面测试 + 文档更新

---

## 📊 成本效益分析

### 投入

-   **时间**: 25-31 小时（3-4 周，每天 2 小时）
-   **人力**: 1 人 + AI 辅助

### 产出

-   **节点翻译**: 117 个节点完整双语支持
-   **翻译条目**: ~2,560+ 条目（英文+中文）
-   **覆盖率**: 从 35% 提升到 93.5%
-   **用户体验**: 核心功能全部中文化

### 收益

-   ✅ RAG 应用完整中文支持
-   ✅ 大幅提升中文用户体验
-   ✅ 产品国际化能力增强
-   ✅ 降低用户学习成本

---

## 🤝 协作与审批

### 请审核以下内容

1. **执行方案选择**:

    - [ ] 方案 A: 快速完成核心功能（推荐）
    - [ ] 方案 B: 按分类完整性
    - [ ] 方案 C: 先易后难
    - [ ] 其他建议: \***\*\_\_\*\***

2. **时间安排**:

    - [ ] 同意 3-4 周完成
    - [ ] 建议调整: \***\*\_\_\*\***

3. **优先级调整**:

    - [ ] 同意当前优先级排序
    - [ ] 建议调整: \***\*\_\_\*\***

4. **其他要求**:
    - [ ] 每完成一个 Phase 提交一次 commit
    - [ ] 每天工作结束更新进度
    - [ ] 其他: \***\*\_\_\*\***

---

## 2025-01-18 翻译工作进度更新

### 完成的工作

#### 1. 全局时间格式化工具函数创建

-   **文件**: `packages/ui/src/utils/timeFormatHelper.js`
-   **功能**: 创建了统一的时间格式化工具函数，支持中英文环境
-   **特性**:
    -   `formatDateTime()`: 根据语言环境格式化日期时间
    -   `formatDate()`: 格式化日期（不含时间）
    -   `formatTime()`: 格式化时间（不含日期）
    -   `formatRelativeTime()`: 格式化相对时间
    -   `formatDetailedDateTime()`: 格式化详细时间（含秒）
    -   `formatFileSize()`: 格式化文件大小
    -   `formatNumber()`: 格式化数字（千分位分隔符）

#### 2. 时间格式中文化

-   **中文格式**: `2025年10月17日 06:13` (24 小时制，无 AM/PM)
-   **英文格式**: `October 17th 2025, 06:13 AM` (12 小时制，含 AM/PM)
-   **更新文件**:
    -   `packages/ui/src/views/datasets/index.jsx`
    -   `packages/ui/src/views/workspace/index.jsx`
    -   `packages/ui/src/views/evaluators/index.jsx`
    -   `packages/ui/src/views/credentials/index.jsx`
    -   `packages/ui/src/ui-component/table/FlowListTable.jsx`

#### 3. Assistants 页面翻译修复

-   **Custom Assistant 页面** (`packages/ui/src/views/assistants/custom/CustomAssistantLayout.jsx`)

    -   添加 `useTranslation` hook
    -   替换所有硬编码英文文本为翻译函数调用
    -   更新翻译键: `searchAssistants`, `customAssistant`, `customAssistantDescription`, `add`, `noCustomAssistantsAddedYet`

-   **OpenAI Assistant 页面** (`packages/ui/src/views/assistants/openai/OpenAIAssistantLayout.jsx`)
    -   添加 `useTranslation` hook
    -   替换所有硬编码英文文本为翻译函数调用
    -   更新翻译键: `openAIAssistant`, `openAIAssistantDescription`, `loadExistingAssistant`, `addNewAssistant`, `editAssistant`, `load`, `add`, `edit`, `save`, `cancel`

#### 4. 翻译文件更新

-   **英文翻译** (`packages/ui/public/locales/en/assistants.json`)

    -   添加了所有 Assistants 页面相关的翻译键
    -   更新标题为更准确的描述

-   **中文翻译** (`packages/ui/public/locales/zh/assistants.json`)
    -   添加了所有 Assistants 页面相关的翻译键
    -   最终翻译文本:
        -   `customAssistant`: "自定义私人 AI 助理"
        -   `openAIAssistant`: "OpenAI 私人 AI 助理"
        -   `openAIAssistantDescription`: "你的 OpenAI 私人 AI 助理界面"

### 修复的翻译问题

#### 1. 时间显示问题

-   **问题**: 中文环境下时间显示为英文格式 "October 17th 2025, 06:13 AM"
-   **解决**: 创建全局时间格式化工具，中文环境显示为 "2025 年 10 月 17 日 06:13"
-   **影响范围**: 所有使用 moment.js 格式化的页面

#### 2. Assistants 页面硬编码文本

-   **问题**: Custom Assistant 和 OpenAI Assistant 页面有大量硬编码英文文本
-   **解决**: 将所有硬编码文本替换为翻译函数调用
-   **影响范围**:
    -   `http://localhost:3000/assistants/custom`
    -   `http://localhost:3000/assistants/openai`

### 技术实现细节

#### 时间格式化工具函数

```javascript
// 根据当前语言环境格式化时间
export const formatDateTime = (date, format = null) => {
    const currentLanguage = i18n.language || 'en'
    const momentDate = moment(date)

    if (currentLanguage === 'zh') {
        // 中文格式：2025年10月17日 06:13
        return momentDate.format('YYYY年MM月DD日 HH:mm')
    } else {
        // 英文格式：October 17th 2025, 06:13 AM
        return momentDate.format('MMMM Do YYYY, hh:mm A')
    }
}
```

#### 翻译键映射

```javascript
// Custom Assistant 页面
title={t('customAssistant')}  // "自定义私人AI助理"
description={t('customAssistantDescription')}  // "使用你选择的LLM创建自定义助手"

// OpenAI Assistant 页面
title={t('openAIAssistant')}  // "OpenAI私人AI助理"
description={t('openAIAssistantDescription')}  // "你的OpenAI私人AI助理界面"
```

### 当前进度总结

#### 已完成

1. ✅ 全局时间格式化工具函数
2. ✅ 数据集页面时间格式中文化
3. ✅ 工作区页面时间格式中文化
4. ✅ 评估器页面时间格式中文化
5. ✅ 凭证页面时间格式中文化
6. ✅ Custom Assistant 页面翻译
7. ✅ OpenAI Assistant 页面翻译

#### 待完成

1. ⏳ 更新其他使用 moment.js 的页面
2. ⏳ 测试时间格式化在不同语言环境下的显示效果
3. ⏳ 继续修复其他页面的翻译问题

### 下一步计划

1. 继续更新其他使用 moment.js 格式化的页面
2. 测试时间格式化工具在不同场景下的表现
3. 根据用户反馈继续优化翻译文本

---

**文档创建**: 2025-10-18
**最后更新**: 2025-01-18
**状态**: 🔄 进行中
**下一步**: 继续更新其他页面的时间格式化和翻译
