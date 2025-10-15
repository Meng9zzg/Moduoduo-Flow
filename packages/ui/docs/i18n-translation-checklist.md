# 国际化翻译清单 (i18n Translation Checklist)

本文档追踪各模块的翻译进度。

---

## 📊 总体进度

| 状态      | 数量   | 百分比   |
| --------- | ------ | -------- |
| ✅ 已完成 | 0      | 0%       |
| 🚧 进行中 | 0      | 0%       |
| ⏳ 待开始 | 16     | 100%     |
| **总计**  | **16** | **100%** |

---

## 📋 模块翻译清单

### 阶段 1：基础设施

-   [ ] i18n 配置文件创建
-   [ ] 翻译资源目录结构建立
-   [ ] App.jsx 集成 i18n
-   [ ] LanguageSwitch 组件更新

---

### 阶段 2：P0 - 最高优先级

#### 1. 通用文案 (common.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P0
-   **包含内容**:
    -   通用按钮（Save, Cancel, Delete, Edit, Add, Confirm, Close）
    -   通用操作（Search, Filter, Export, Import）
    -   通用状态（Loading, Success, Error, Warning）
    -   其他通用文本

#### 2. 菜单导航 (menu.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P0
-   **涉及文件**:
    -   `menu-items/dashboard.js`
    -   `menu-items/settings.js`
    -   `menu-items/agentsettings.js`
    -   `menu-items/customassistant.js`
-   **翻译项**:
    -   Chatflows, Agentflows, Executions, Assistants
    -   Marketplaces, Tools, Credentials, Variables
    -   API Keys, Document Stores
    -   Datasets, Evaluators, Evaluations
    -   Users, Roles, Workspaces, SSO Config
    -   Logs, Account Settings

#### 3. 工作区切换 (workspace.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P0
-   **涉及文件**:
    -   `layout/MainLayout/Header/OrgWorkspaceBreadcrumbs/index.jsx`
    -   `layout/MainLayout/Header/WorkspaceSwitcher/index.jsx`
-   **翻译项**:
    -   Switching organization/workspace...
    -   Workspace Unavailable
    -   Select Workspace/Organization
    -   Organization's name format

#### 4. Header 头部组件 (header.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P0
-   **涉及文件**:
    -   `layout/MainLayout/Header/index.jsx`
    -   `layout/MainLayout/Header/ProfileSection`
-   **翻译项**:
    -   Upgrade button
    -   Logout
    -   Profile settings
    -   Theme switch tooltip
    -   Language switch tooltip

---

### 阶段 3：P1 - 高优先级

#### 5. Chatflows 模块 (chatflows.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P1
-   **涉及文件**:
    -   `views/chatflows/`
    -   `ui-component/table/FlowListTable.jsx`
-   **翻译项**:
    -   Page title, descriptions
    -   Create/Edit/Delete operations
    -   Table headers (Name, Type, Created, Updated)
    -   Dialog titles and messages

#### 6. Agentflows 模块 (agentflows.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P1
-   **涉及文件**:
    -   `views/agentflows/`
    -   `views/agentflowsv2/`
-   **翻译项**:
    -   Similar to Chatflows
    -   Agent-specific terms

#### 7. Executions 模块 (executions.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P1
-   **涉及文件**:
    -   `views/agentexecutions/`
    -   `ui-component/table/ExecutionsListTable.jsx`
-   **翻译项**:
    -   Execution logs
    -   Status messages
    -   Timeline displays

#### 8. Assistants 模块 (assistants.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P1
-   **涉及文件**:
    -   `views/assistants/`
-   **翻译项**:
    -   Assistant configuration
    -   OpenAI Assistants related terms

#### 9. Credentials 模块 (credentials.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P1
-   **涉及文件**:
    -   `views/credentials/`
-   **翻译项**:
    -   Credential types
    -   Add/Edit/Delete credentials
    -   Security warnings

#### 10. Tools 模块 (tools.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P1
-   **涉及文件**:
    -   `views/tools/`
-   **翻译项**:
    -   Tool descriptions
    -   Configuration options

---

### 阶段 4：P2 - 中等优先级

#### 11. Document Stores 模块 (docstore.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P2
-   **涉及文件**:
    -   `views/docstore/`
    -   `ui-component/table/DocumentStoreTable.jsx`
    -   `ui-component/cards/DocumentStoreCard.jsx`
-   **翻译项**:
    -   Document upload/management
    -   Store configuration

#### 12. Variables 模块 (variables.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P2
-   **涉及文件**:
    -   `views/variables/`
-   **翻译项**:
    -   Variable types
    -   Add/Edit operations

#### 13. API Keys 模块 (apikey.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P2
-   **涉及文件**:
    -   `views/apikey/`
-   **翻译项**:
    -   API key management
    -   Security notices

#### 14. Datasets/Evaluations 模块

-   **状态**: ⏳ 待开始
-   **优先级**: P2
-   **涉及文件**:
    -   `views/datasets/` → datasets.json
    -   `views/evaluations/` → evaluations.json
    -   `views/evaluators/` → evaluators.json
-   **翻译项**:
    -   Dataset operations
    -   Evaluation metrics
    -   Evaluator configuration

---

### 阶段 5：P3 - 低优先级

#### 15. 用户和权限管理

-   **状态**: ⏳ 待开始
-   **优先级**: P3
-   **涉及文件**:
    -   `views/users/` → users.json
    -   `views/roles/` → roles.json
    -   `views/workspace/` → workspace.json
    -   `views/organization/` → organization.json
-   **翻译项**:
    -   User management
    -   Role permissions (RBAC)
    -   Workspace settings
    -   Organization settings

#### 16. 其他模块

-   **状态**: ⏳ 待开始
-   **优先级**: P3
-   **涉及文件**:
    -   `views/account/` → account.json
    -   `views/serverlogs/` → logs.json
    -   `views/settings/` → settings.json
    -   `views/auth/` → auth.json
-   **翻译项**:
    -   Account settings
    -   Server logs
    -   Authentication pages

---

### 阶段 6：通用组件库

#### 17. 表单验证 (validation.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P1
-   **翻译项**:
    -   Required field messages
    -   Min/Max length validations
    -   Format validations (email, URL)
    -   Custom validation messages

#### 18. 对话框组件 (dialog.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P2
-   **涉及文件**:
    -   `ui-component/dialog/` 所有对话框
-   **翻译项**:
    -   Dialog titles
    -   Confirmation messages
    -   Button labels

#### 19. 表格组件 (table.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P2
-   **涉及文件**:
    -   `ui-component/table/` 所有表格
-   **翻译项**:
    -   Column headers
    -   Empty state messages
    -   Pagination text

#### 20. 错误消息 (error.json)

-   **状态**: ⏳ 待开始
-   **优先级**: P1
-   **翻译项**:
    -   API error messages
    -   Network errors
    -   Validation errors
    -   System errors

---

## 📝 翻译注意事项

### 专业术语保持英文

-   API, API Keys, API Endpoint
-   GPT, LLM, Embedding, Token
-   Webhook, JSON, OAuth, SSO
-   Vector Store, Prompt
-   所有品牌名称

### 统一翻译规范

-   Workspace → 工作区（不用"工作空间"）
-   Credentials → 凭证（不用"证书"）
-   Document Stores → 文档存储
-   Chatflows → 聊天流
-   Agentflows → 代理流

### 布局考虑

-   中文通常比英文短，留意按钮宽度
-   表格列标题尽量简洁
-   长文本使用省略号 + Tooltip

---

## ✅ 验收标准

每个模块完成后需确认：

-   [ ] 英文和中文翻译文件都已创建
-   [ ] 所有硬编码文本已替换为翻译 Key
-   [ ] 本地测试语言切换功能正常
-   [ ] 无控制台 `missingKey` 错误
-   [ ] 界面布局无错位或溢出
-   [ ] 专业术语按术语表处理
-   [ ] 翻译准确、简洁、易懂

---

**创建时间：** 2025-10-15
**最后更新：** 2025-10-15
**维护者：** Flowise UI Team
