# 国际化术语表 (i18n Glossary)

本文档定义了 Flowise UI 国际化过程中的术语翻译规范。

## 📋 不翻译的术语（保持英文）

### 技术术语 (Technical Terms)

-   **API**, **API Keys**, **API Endpoint**
-   **GPT**, **LLM** (Large Language Model)
-   **Embedding**, **Token**, **Tokenizer**
-   **Webhook**, **WebSocket**
-   **URL**, **HTTP**, **HTTPS**, **JSON**, **YAML**, **XML**
-   **OAuth**, **OAuth2**, **JWT**, **SSO**
-   **Vector Store**, **Vector Database**
-   **Prompt**, **System Message**, **System Prompt**
-   **Node**, **Edge**, **Canvas**
-   **Markdown**, **HTML**, **CSS**
-   **Git**, **GitHub**, **Docker**
-   **Cache**, **Session**, **Cookie**

### AI/ML 相关术语

-   **Fine-tuning**
-   **RAG** (Retrieval-Augmented Generation)
-   **Context Window**
-   **Temperature**, **Top-p**
-   **Max Tokens**
-   **Stream**, **Streaming**

### 品牌和产品名称 (Brand Names)

-   **Flowise**
-   **OpenAI**, **Anthropic**, **Cohere**, **Google AI**
-   **AWS**, **Azure**, **Google Cloud**
-   **Pinecone**, **Supabase**, **Redis**, **PostgreSQL**
-   **Langchain**, **LangSmith**, **LangGraph**
-   **ChromaDB**, **Weaviate**, **Qdrant**
-   **HuggingFace**, **Ollama**

### 配置和代码相关

-   环境变量名（如 `FLOWISE_USERNAME`, `OPENAI_API_KEY`）
-   配置键名
-   文件扩展名（`.json`, `.csv`, `.txt`）
-   代码关键字

---

## ✅ 统一翻译规范

| 英文                | 中文         | 说明               | 示例                                    |
| ------------------- | ------------ | ------------------ | --------------------------------------- |
| **Chatflows**       | AI 对话流    | 核心业务术语       | Create a new chatflow → 创建新聊天流    |
| **Agentflows**      | 智能体代理流 | 核心业务术语       | Agent execution → 智能体代理执行        |
| **Assistants**      | 助手         | OpenAI Assistants  | Create assistant → 创建助手             |
| **Workspace**       | 工作区       | 不用"工作空间"     | Switch workspace → 切换工作区           |
| **Organization**    | 组织         |                    | My organization → 我的组织              |
| **Credentials**     | 凭证         | 不用"证书"或"凭据" | Add credential → 添加凭证               |
| **Variables**       | 变量         |                    | Environment variable → 环境变量         |
| **Document Stores** | 文档存储     |                    | Document store settings → 文档存储设置  |
| **Tools**           | 工具         |                    | Available tools → 可用工具              |
| **Marketplaces**    | 市场         |                    | Browse marketplace → 浏览市场           |
| **Executions**      | 执行记录     |                    | View execution logs → 查看执行记录      |
| **Datasets**        | 数据集       |                    | Upload dataset → 上传数据集             |
| **Evaluators**      | 评估器       |                    | Configure evaluator → 配置评估器        |
| **Evaluations**     | 评估         |                    | Run evaluation → 运行评估               |
| **Roles**           | 角色         | RBAC 权限          | User role → 用户角色                    |
| **Users**           | 用户         |                    | Manage users → 管理用户                 |
| **Logs**            | 日志         |                    | Server logs → 服务器日志                |
| **Settings**        | 设置         |                    | Account settings → 账户设置             |
| **Template**        | 模板         |                    | Use template → 使用模板                 |
| **Flow**            | 流程         |                    | Flow configuration → 流程配置           |
| **Message**         | 消息         |                    | Chat message → 聊天消息                 |
| **History**         | 历史记录     |                    | Chat history → 聊天历史                 |
| **Upload**          | 上传         |                    | Upload file → 上传文件                  |
| **Download**        | 下载         |                    | Download data → 下载数据                |
| **Export**          | 导出         |                    | Export flow → 导出流程                  |
| **Import**          | 导入         |                    | Import flow → 导入流程                  |
| **Deploy**          | 部署         |                    | Deploy to production → 部署到生产环境   |
| **Test**            | 测试         |                    | Test connection → 测试连接              |
| **Preview**         | 预览         |                    | Preview result → 预览结果               |
| **Save**            | 保存         |                    | Save changes → 保存更改                 |
| **Delete**          | 删除         |                    | Delete item → 删除项目                  |
| **Edit**            | 编辑         |                    | Edit configuration → 编辑配置           |
| **Cancel**          | 取消         |                    | Cancel operation → 取消操作             |
| **Confirm**         | 确认         |                    | Confirm deletion → 确认删除             |
| **Search**          | 搜索         |                    | Search flows → 搜索流程                 |
| **Filter**          | 筛选         |                    | Filter by type → 按类型筛选             |
| **Sort**            | 排序         |                    | Sort by date → 按日期排序               |
| **Refresh**         | 刷新         |                    | Refresh page → 刷新页面                 |
| **Copy**            | 复制         |                    | Copy to clipboard → 复制到剪贴板        |
| **Duplicate**       | 复制         | 复制整个项目       | Duplicate flow → 复制流程               |
| **Share**           | 分享         |                    | Share link → 分享链接                   |
| **Publish**         | 发布         |                    | Publish flow → 发布流程                 |
| **Unpublish**       | 取消发布     |                    | Unpublish flow → 取消发布流程           |
| **Enable**          | 启用         |                    | Enable feature → 启用功能               |
| **Disable**         | 禁用         |                    | Disable option → 禁用选项               |
| **Connect**         | 连接         |                    | Connect nodes → 连接节点                |
| **Disconnect**      | 断开连接     |                    | Disconnect service → 断开服务           |
| **Load**            | 加载         |                    | Load more → 加载更多                    |
| **Loading**         | 加载中       |                    | Loading... → 加载中...                  |
| **Success**         | 成功         |                    | Operation successful → 操作成功         |
| **Error**           | 错误         |                    | Error occurred → 发生错误               |
| **Warning**         | 警告         |                    | Warning message → 警告消息              |
| **Info**            | 信息         |                    | Information → 信息                      |
| **Required**        | 必填         | 表单验证           | This field is required → 此字段为必填项 |
| **Optional**        | 可选         |                    | Optional field → 可选字段               |
| **Default**         | 默认         |                    | Default value → 默认值                  |
| **Custom**          | 自定义       |                    | Custom configuration → 自定义配置       |
| **Advanced**        | 高级         |                    | Advanced settings → 高级设置            |
| **Basic**           | 基础         |                    | Basic information → 基础信息            |

---

## 📝 翻译原则

### 1. 保持一致性

-   同一术语在整个应用中使用统一翻译
-   例如：`Workspace` 统一翻译为"工作区"，不要混用"工作空间"

### 2. 简洁明了

-   中文翻译应简洁易懂
-   避免过长的翻译导致界面布局问题

### 3. 专业术语保留

-   广为人知的技术术语保持英文
-   例如：API、JSON、HTTP 等无需翻译

### 4. 上下文适应

-   根据具体场景调整翻译
-   例如：`Load` 可译为"加载"或"加载更多"，取决于上下文

### 5. 用户友好

-   面向普通用户的术语尽量通俗化
-   技术文档可使用更专业的表达

---

## 🔄 动态更新

本术语表会随着项目发展持续更新。如遇到新术语，请参考以下流程：

1. 检查是否为技术术语 → 保持英文
2. 检查是否为品牌名 → 保持英文
3. 查找行业通用翻译 → 使用业界标准
4. 团队讨论确定 → 添加到术语表

---

**最后更新：** 2025-10-15
**维护者：** 9zzg M
