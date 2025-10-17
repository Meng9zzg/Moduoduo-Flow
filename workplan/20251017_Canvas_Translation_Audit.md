# 🎨 Canvas 页面翻译审查计划

> **优先级**: 🔴 **最高** - 这是用户使用最频繁的核心页面
> **状态**: ✅ 基础翻译已完成，需要审查和补充

---

## 📊 翻译现状总结

### ✅ 已完成的翻译

#### 1. **Canvas.json** (核心画布翻译)

-   **英文**: 180+ 翻译键
-   **中文**: 180+ 翻译键
-   **覆盖率**: 95%+

**已翻译的主要模块**:

-   ✅ 顶部工具栏 (保存、测试、部署、分享、版本、设置等)
-   ✅ Header 组件 (返回、编辑名称、API 接口、消息、线索等)
-   ✅ Dialog 组件 (删除确认、更改确认)
-   ✅ 控制组件 (对齐网格、背景切换、节点同步)
-   ✅ NodeInput 组件 (保存、取消、添加、编辑、刷新等 20+ 操作)
-   ✅ Node 组件 (信息、输入、输出、参数、警告等)
-   ✅ AddNodes 面板 (搜索、标签、作者、生成智能体流)
-   ✅ NodeOutput 组件 (真/假标签)
-   ✅ CredentialInput 组件 (凭证操作)
-   ✅ StickyNote 组件 (便签操作)
-   ✅ AgentflowV2 组件 (错误、消息、对话框、控制、节点)

#### 2. **Dialog.json** (对话框翻译)

-   **英文**: 900+ 翻译键
-   **中文**: 900+ 翻译键
-   **覆盖率**: 99%+

**已翻译的对话框** (25 个):

-   ✅ About Dialog - 关于对话框
-   ✅ Allowed Domains Dialog - 允许域名对话框
-   ✅ Chat Feedback Dialog - 聊天反馈对话框
-   ✅ Speech To Text Dialog - 语音转文字对话框
-   ✅ Starter Prompts Dialog - 对话启动提示对话框
-   ✅ Save Chatflow Dialog - 保存智能体搭建对话框
-   ✅ Chatflow Configuration Dialog - 智能体搭建配置对话框 (10 个标签页)
-   ✅ API Code Dialog - API 代码对话框
-   ✅ View Messages Dialog - 查看消息对话框
-   ✅ View Leads Dialog - 查看线索对话框
-   ✅ Export Template Dialog - 导出模板对话框
-   ✅ Upsert History Dialog - 上传历史对话框
-   ✅ Vector Store Dialog - 向量存储对话框
-   ✅ Credential Dialog - 凭证对话框
-   ✅ Tool Dialog - 工具对话框
-   ✅ API Key Dialog - API 密钥对话框
-   ✅ Tag Dialog - 标签对话框
-   ✅ Document Store Dialog - 文档存储对话框
-   ✅ Components List Dialog - 组件列表对话框
-   ✅ Expanded Chunk Dialog - 扩展块对话框
-   ✅ Edit Node Dialog - 编辑节点对话框
-   ✅ Share Execution Dialog - 分享执行对话框
-   ✅ Agentflow Generator Dialog - 智能体流生成器对话框
-   ✅ Custom Assistant Dialog - 自定义助手对话框
-   ✅ Assistant Dialog - 助手对话框 (包含向量存储、文件搜索、代码解释器)
-   ✅ Create Evaluation Dialog - 创建评估对话框 (3 步流程)
-   ✅ Add Variable Dialog - 添加变量对话框
-   ✅ How To Use Variables Dialog - 如何使用变量对话框
-   ✅ Add Evaluator Dialog - 添加评估器对话框
-   ✅ Sample Prompt Dialog - 示例提示词对话框
-   ✅ Chat Expand Dialog - 聊天展开对话框
-   ✅ Chat Feedback Content Dialog - 聊天反馈内容对话框
-   ✅ Expand Text Dialog - 展开文本对话框
-   ✅ Node Info Dialog - 节点信息对话框
-   ✅ Source Doc Dialog - 源文档对话框
-   ✅ Manage Scraped Links Dialog - 管理抓取链接对话框
-   ✅ NVIDIA NIM Dialog - NVIDIA NIM 设置对话框
-   ✅ Upload JSON Dialog - 上传 JSON 对话框
-   ✅ Prompt Generator Dialog - 提示词生成器对话框
-   ✅ Langsmith Hub Dialog - Langsmith Hub 对话框
-   ✅ Format Prompt Values Dialog - 格式化提示词值对话框
-   ✅ Analyse Flow Dialog - 分析流程对话框
-   ✅ Text To Speech Dialog - 文字转语音对话框
-   ✅ Follow Up Prompts Dialog - 跟进提示对话框
-   ✅ File Upload Dialog - 文件上传对话框
-   ✅ Rate Limit Dialog - 速率限制对话框
-   ✅ Paste JSON Dialog - 粘贴 JSON 对话框

#### 3. **Chat.json** (聊天弹窗翻译)

-   ✅ Chat PopUp 组件已翻译完成

---

## 🔍 需要审查的项目

### 1. 硬编码文本检查 (优先级 🔴)

需要在以下文件中搜索硬编码的英文文本：

#### Canvas 核心文件

-   [ ] `packages/ui/src/views/canvas/index.jsx` (672 行)
-   [ ] `packages/ui/src/views/canvas/CanvasHeader.jsx` (520 行)
-   [ ] `packages/ui/src/views/canvas/CanvasNode.jsx` (297 行)
-   [ ] `packages/ui/src/views/canvas/AddNodes.jsx` (683 行)
-   [ ] `packages/ui/src/views/canvas/NodeInputHandler.jsx` (1447 行) ⚠️ **最大文件**
-   [ ] `packages/ui/src/views/canvas/NodeOutputHandler.jsx` (236 行)
-   [ ] `packages/ui/src/views/canvas/CredentialInputHandler.jsx` (161 行)
-   [ ] `packages/ui/src/views/canvas/StickyNote.jsx` (132 行)
-   [ ] `packages/ui/src/views/canvas/ButtonEdge.jsx`

#### Dialog 文件 (25 个)

-   [ ] `packages/ui/src/ui-component/dialog/AboutDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/AdditionalParamsDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/AgentflowGeneratorDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/AllowedDomainsDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ChatFeedbackContentDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ChatFeedbackDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ChatflowConfigurationDialog.jsx` ⚠️ **重要**
-   [ ] `packages/ui/src/ui-component/dialog/ConditionDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ConfirmDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ExpandRichInputDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ExpandTextDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ExportAsTemplateDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/FormatPromptValuesDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/InputHintDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/InviteUsersDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ManageScrapedLinksDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/NodeInfoDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/NvidiaNIMDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/PromptGeneratorDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/PromptLangsmithHubDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/SaveChatflowDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ShareWithWorkspaceDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/SourceDocDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/SpeechToTextDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/StarterPromptsDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/TagDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ViewLeadsDialog.jsx`
-   [ ] `packages/ui/src/ui-component/dialog/ViewMessagesDialog.jsx`

#### Popup 文件

-   [ ] `packages/ui/src/views/chatmessage/ChatPopUp.jsx`
-   [ ] `packages/ui/src/views/vectorstore/VectorStorePopUp.jsx` ⚠️ **存在硬编码**

---

### 2. VectorStorePopUp 需要翻译 (优先级 🔴)

**文件**: `packages/ui/src/views/vectorstore/VectorStorePopUp.jsx`

**发现的硬编码文本**:

```javascript
'Upsert Vector Store'
'Upsert Vector Database'
```

**解决方案**:

1. 在 `packages/ui/public/locales/en/dialog.json` 的 `vectorStore` 部分添加：

```json
{
    "vectorStore": {
        "upsertTitle": "Upsert Vector Store",
        "upsertDatabase": "Upsert Vector Database"
        // ... 其他字段
    }
}
```

2. 在 `packages/ui/public/locales/zh/dialog.json` 的 `vectorStore` 部分添加：

```json
{
    "vectorStore": {
        "upsertTitle": "上传向量存储",
        "upsertDatabase": "上传向量数据库"
        // ... 其他字段
    }
}
```

3. 在 `VectorStorePopUp.jsx` 中添加：

```javascript
import { useTranslation } from 'react-i18next'

const VectorStorePopUp = () => {
    const { t } = useTranslation('dialog')
    // ...
    // 替换硬编码文本为 t('vectorStore.upsertTitle') 等
}
```

---

### 3. 翻译完整性检查清单

#### 检查方法

对每个文件执行以下检查：

```bash
# 搜索可能的硬编码英文文本
grep -n '"[A-Z][a-z]*' [file.jsx]
grep -n "'[A-Z][a-z]*" [file.jsx]

# 检查是否使用了 useTranslation
grep -n "useTranslation" [file.jsx]

# 检查 t() 函数的使用
grep -n "t(" [file.jsx]
```

#### 待检查的模式

-   [ ] 按钮文本 (Button text)
-   [ ] 工具提示 (Tooltip)
-   [ ] 占位符 (Placeholder)
-   [ ] 标签 (Label)
-   [ ] 标题 (Title)
-   [ ] 描述 (Description)
-   [ ] 错误消息 (Error messages)
-   [ ] 成功消息 (Success messages)
-   [ ] 警告消息 (Warning messages)
-   [ ] 对话框内容 (Dialog content)
-   [ ] 选项标签 (Option labels)
-   [ ] 表格列名 (Table column names)
-   [ ] 菜单项 (Menu items)

---

### 4. 特殊翻译注意事项

#### A. 技术术语处理

以下术语需要谨慎翻译：

| 英文         | 中文翻译         | 说明         |
| ------------ | ---------------- | ------------ |
| API          | API              | 保持英文     |
| JSON         | JSON             | 保持英文     |
| OAuth        | OAuth            | 保持英文     |
| Webhook      | Webhook          | 保持英文     |
| Upsert       | 上传             | 上传并更新   |
| Vector Store | 向量存储         | 固定译法     |
| Embedding    | 嵌入/向量嵌入    | 根据上下文   |
| LLM          | 大语言模型/LLM   | 根据空间决定 |
| RAG          | RAG/检索增强生成 | 根据上下文   |
| Agent        | 智能体           | 固定译法     |
| Chatflow     | 智能体搭建       | 品牌特定译法 |
| AgentflowV2  | 智能体流 (v2)    | 品牌特定译法 |

#### B. 品牌名称保持不变

-   OpenAI
-   Anthropic
-   Google
-   Azure
-   AWS
-   Pinecone
-   Weaviate
-   LangChain
-   LlamaIndex
-   Moduoduo (模多多)

#### C. 动态文本处理

使用插值的文本需要保持变量名：

```javascript
// 正确
t('messages.saved', { type: '智能体' })
// "{{type}}已保存" → "智能体已保存"

// 错误 - 不要硬编码
;('智能体已保存')
```

---

## 📝 审查工作流程

### 第 1 步：自动化扫描 (1-2 小时)

```bash
# 创建扫描脚本
cd packages/ui/src/views/canvas
grep -rn '"[A-Z]' . > hardcoded_canvas.txt

cd ../../ui-component/dialog
grep -rn '"[A-Z]' . > hardcoded_dialogs.txt

# 分析结果，找出所有硬编码文本
```

### 第 2 步：逐文件审查 (8-12 小时)

**优先顺序**:

1. 🔴 **VectorStorePopUp.jsx** - 已知存在硬编码
2. 🔴 **NodeInputHandler.jsx** - 1447 行，最复杂
3. 🔴 **ChatflowConfigurationDialog.jsx** - 10 个标签页
4. 🟡 **AddNodes.jsx** - 搜索和生成功能
5. 🟡 **CanvasHeader.jsx** - 顶部工具栏
6. 🟡 其他 Dialog 组件
7. 🟢 其他 Canvas 组件

### 第 3 步：补充翻译 (4-6 小时)

对发现的所有硬编码文本：

1. 添加英文翻译键到 `en/canvas.json` 或 `en/dialog.json`
2. 添加中文翻译到 `zh/canvas.json` 或 `zh/dialog.json`
3. 更新组件代码，使用 `t()` 函数
4. 测试翻译是否正确显示

### 第 4 步：测试验证 (2-3 小时)

-   [ ] 启动开发服务器
-   [ ] 切换到英文界面，检查所有文本
-   [ ] 切换到中文界面，检查所有文本
-   [ ] 测试所有对话框
-   [ ] 测试所有弹出菜单
-   [ ] 测试所有提示信息
-   [ ] 截图对比

### 第 5 步：文档更新 (1 小时)

-   [ ] 更新本文档的完成状态
-   [ ] 创建翻译覆盖率报告
-   [ ] 提交 Git commit

---

## 🎯 质量标准

### 翻译质量检查

-   [ ] 所有用户可见文本都已翻译
-   [ ] 中文翻译准确、流畅、专业
-   [ ] 术语使用一致（参考术语表）
-   [ ] 格式保持一致（标点、大小写）
-   [ ] 动态文本正确使用插值
-   [ ] 没有遗漏的翻译键

### 代码质量检查

-   [ ] 所有硬编码文本已移除
-   [ ] 正确使用 `useTranslation` hook
-   [ ] 翻译命名空间正确 ('canvas', 'dialog', 'chat', 'common')
-   [ ] 翻译键命名符合规范 (camelCase)
-   [ ] 无控制台错误或警告
-   [ ] 代码格式符合 Prettier 规范

### 用户体验检查

-   [ ] 所有文本在 UI 中正确显示
-   [ ] 文本不会溢出或被截断
-   [ ] 语言切换实时生效
-   [ ] 缺失翻译有合理 fallback
-   [ ] 响应式设计正常工作

---

## 📊 预估工作量

### 时间分配

| 任务                       | 预估时间       | 优先级 |
| -------------------------- | -------------- | ------ |
| 自动化扫描                 | 1-2 小时       | 🔴     |
| VectorStorePopUp 修复      | 0.5 小时       | 🔴     |
| NodeInputHandler 审查      | 3-4 小时       | 🔴     |
| ChatflowConfiguration 审查 | 2-3 小时       | 🔴     |
| 其他核心文件审查           | 3-4 小时       | 🟡     |
| Dialog 组件审查            | 4-6 小时       | 🟡     |
| 补充翻译                   | 2-3 小时       | 🟡     |
| 测试验证                   | 2-3 小时       | 🔴     |
| 文档更新                   | 1 小时         | 🟢     |
| **总计**                   | **19-29 小时** | -      |

### 进度里程碑

-   **Day 1-2**: 完成自动化扫描和核心文件审查 (40%)
-   **Day 3-4**: 完成所有 Dialog 审查和翻译补充 (75%)
-   **Day 5**: 完成测试验证和文档 (100%)

---

## 🔗 相关文档

-   [UI 前端技术文档](../README-UI.md)
-   [剩余翻译任务计划](./TRANSLATION_PLAN.md)
-   [国际化实施指南](../I18N_IMPLEMENTATION_GUIDE.md)

---

## 📞 并行任务：前端样式和 UI 优化

在进行 Canvas 翻译审查的同时，可以并行进行以下 UI 改进：

### 可以立即开始的 UI 任务

1. **Canvas 主题优化**

    - 节点样式优化
    - 连接线样式改进
    - 拖拽交互优化
    - 选中状态视觉反馈

2. **Dialog 视觉改进**

    - 统一对话框样式
    - 优化弹窗动画
    - 改进表单布局
    - 优化按钮设计

3. **响应式优化**

    - 移动端 Canvas 适配
    - 平板端操作优化
    - 小屏幕下的 Dialog 处理

4. **交互体验提升**

    - 节点添加动画
    - 保存成功反馈优化
    - 错误提示改进
    - Loading 状态优化

5. **可访问性改进**
    - 键盘快捷键支持
    - 屏幕阅读器优化
    - 高对比度模式
    - 焦点管理改进

**这些 UI 任务不依赖翻译，可以随时开始！**

---

**创建日期**: 2025-10-17
**最后更新**: 2025-10-17
**文档版本**: 1.0.0
**当前状态**: 基础翻译完成 95%+，需要审查和补充
**预计完成**: 3-5 个工作日
