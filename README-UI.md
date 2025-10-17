# UI 前端技术文档 (Frontend Technical Documentation)

> **Moduoduo Agent Flow** - 前端架构与开发指南

---

## 📋 目录

-   [技术栈](#技术栈)
-   [开发环境](#开发环境)
-   [目录结构](#目录结构)
-   [核心技术详解](#核心技术详解)
-   [页面视图清单](#页面视图清单)
-   [国际化 (i18n)](#国际化-i18n)
-   [主题系统](#主题系统)
-   [开发指南](#开发指南)
-   [近期更新](#近期更新)

---

## 🛠️ 技术栈

### 核心框架

-   **React** `18.2.0` - UI 框架
-   **Vite** `5.0.2` - 构建工具 (快速开发服务器)
-   **React Router** `6.3.0` - 路由管理

### UI 组件库

-   **Material-UI (MUI)** `5.15.0` - UI 组件库
    -   `@mui/material` - 核心组件
    -   `@mui/icons-material` - 图标库
    -   `@mui/lab` - 实验性组件
    -   `@mui/x-data-grid` - 数据表格
    -   `@mui/x-tree-view` - 树形视图
-   **@tabler/icons-react** `3.30.0` - Tabler 图标集
-   **lucide-react** `0.546.0` - Lucide 图标集

### 状态管理

-   **Redux** `4.0.5` - 状态容器
-   **@reduxjs/toolkit** `2.2.7` - Redux 工具集
-   **React Redux** `8.0.5` - React 绑定

### 样式方案

-   **SCSS/SASS** `1.42.1` - CSS 预处理器
-   **Emotion** `11.10.6` - CSS-in-JS
    -   `@emotion/react`
    -   `@emotion/styled`
    -   `@emotion/cache`

### 国际化

-   **i18next** `25.6.0` - 国际化核心
-   **react-i18next** `16.0.1` - React 集成
-   **i18next-http-backend** `3.0.2` - HTTP 后端加载
-   **i18next-browser-languagedetector** `8.2.0` - 浏览器语言检测

### 表单处理

-   **Formik** `2.2.6` - 表单管理
-   **Yup** `0.32.9` - 模式验证

### 流程图编辑器

-   **ReactFlow** `11.5.6` - 流程图可视化编辑器

### 代码编辑器

-   **CodeMirror** `6.x` - 代码编辑器
    -   `@codemirror/lang-javascript`
    -   `@codemirror/lang-json`
    -   `@codemirror/lang-markdown`
    -   `@uiw/react-codemirror` - React 封装

### 富文本编辑器

-   **TipTap** `2.11.5` - 可扩展富文本编辑器
    -   `@tiptap/react`
    -   `@tiptap/starter-kit`
    -   `@tiptap/extension-code-block-lowlight`
    -   `@tiptap/extension-mention`
    -   `@tiptap/extension-placeholder`

### Markdown 渲染

-   **react-markdown** `8.0.6` - Markdown 渲染
-   **react-syntax-highlighter** `15.5.0` - 代码高亮
-   **remark-gfm** `3.0.1` - GitHub Flavored Markdown
-   **remark-math** `5.1.1` - 数学公式支持
-   **rehype-mathjax** `4.0.2` - MathJax 渲染
-   **rehype-raw** `7.0.0` - 原始 HTML 支持

### 图表

-   **Recharts** `2.12.6` - 响应式图表库

### 其他工具库

-   **axios** `1.12.0` - HTTP 客户端
-   **lodash** `4.17.21` - 工具函数库
-   **moment** `2.29.3` - 日期时间处理
-   **uuid** `9.0.1` - UUID 生成
-   **dompurify** `3.2.6` - HTML 净化
-   **notistack** `2.0.4` - 通知提示
-   **framer-motion** `4.1.13` - 动画库
-   **react-rewards** `2.1.0` - 奖励动画
-   **react-perfect-scrollbar** `1.5.8` - 完美滚动条

---

## 💻 开发环境

### Node.js 要求

```
Node: >=18.15.0 <19.0.0 || ^20
pnpm: >=9
```

### 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器 (http://localhost:3000)
pnpm dev

# 构建生产版本
pnpm build

# 清理构建产物
pnpm clean

# 完全清理 (包括 node_modules)
pnpm nuke
```

### Vite 配置

-   **开发服务器**: `localhost:3000`
-   **代理**: API 请求代理到 `localhost:8000`
-   **构建输出**: `./build`

---

## 📁 目录结构

```
packages/ui/
├── public/                      # 静态资源
│   ├── locales/                # 翻译文件
│   │   ├── en/                # 英文翻译 (34个JSON)
│   │   └── zh/                # 中文翻译 (34个JSON)
│   └── index.html
├── src/
│   ├── api/                    # API 请求层
│   │   ├── apikey.js
│   │   ├── assistants.js
│   │   ├── chatflows.js
│   │   ├── credentials.js
│   │   ├── nodes.js          # 节点相关API (支持i18n)
│   │   └── ...
│   ├── assets/                 # 静态资源
│   │   ├── images/
│   │   └── scss/              # SCSS样式
│   │       ├── style.scss     # 主样式文件
│   │       └── _themes-vars.module.scss
│   ├── components/             # 业务组件
│   │   ├── animated-icons/    # 动画图标组件
│   │   └── ui/                # UI组件
│   ├── hooks/                  # 自定义Hooks
│   ├── i18n/                   # 国际化配置
│   │   └── config.js          # i18next配置
│   ├── layout/                 # 布局组件
│   │   ├── MainLayout/        # 主布局 (带侧边栏)
│   │   │   ├── Header/        # 顶部导航栏
│   │   │   ├── Sidebar/       # 侧边栏
│   │   │   └── index.jsx
│   │   ├── AuthLayout/        # 认证布局 (登录/注册页)
│   │   ├── MinimalLayout/     # 最小布局
│   │   ├── NavigationScroll.jsx
│   │   └── NavMotion.jsx
│   ├── menu-items/             # 菜单配置
│   │   ├── index.js
│   │   └── ...
│   ├── routes/                 # 路由配置
│   │   ├── MainRoutes.jsx     # 主路由
│   │   ├── AuthRoutes.jsx     # 认证路由
│   │   ├── CanvasRoutes.jsx   # 画布路由
│   │   ├── ChatbotRoutes.jsx  # 聊天机器人路由
│   │   ├── ExecutionRoutes.jsx # 执行路由
│   │   ├── RequireAuth.jsx    # 认证守卫
│   │   └── index.jsx
│   ├── store/                  # Redux 状态管理
│   │   ├── actions.js         # Actions
│   │   ├── constant.js        # 常量
│   │   ├── reducer.jsx        # Root Reducer
│   │   ├── reducers/          # 各模块Reducers
│   │   ├── context/           # React Context
│   │   │   ├── ConfigContext.jsx
│   │   │   ├── ConfirmContextProvider.jsx
│   │   │   ├── ErrorContext.jsx
│   │   │   └── ReactFlowContext.jsx
│   │   └── index.jsx
│   ├── themes/                 # MUI主题配置
│   │   ├── compStyleOverride.js  # 组件样式覆盖
│   │   ├── palette.js            # 调色板 (深色/浅色)
│   │   ├── typography.js         # 字体排版
│   │   └── index.js
│   ├── ui-component/           # 通用UI组件
│   │   ├── array/             # 数组输入组件
│   │   ├── button/            # 按钮组件
│   │   ├── cards/             # 卡片组件
│   │   ├── checkbox/          # 复选框组件
│   │   ├── dialog/            # 对话框组件
│   │   ├── dropdown/          # 下拉框组件
│   │   ├── editor/            # 编辑器组件
│   │   ├── extended/          # 扩展组件
│   │   ├── file/              # 文件组件
│   │   ├── form/              # 表单组件
│   │   ├── grid/              # 网格组件
│   │   ├── icons/             # 图标组件
│   │   ├── input/             # 输入框组件
│   │   ├── json/              # JSON编辑器
│   │   ├── loading/           # 加载组件
│   │   ├── markdown/          # Markdown渲染
│   │   ├── pagination/        # 分页组件
│   │   ├── rbac/              # 权限控制组件
│   │   ├── switch/            # 开关组件
│   │   │   ├── DarkModeSwitch.jsx
│   │   │   └── LanguageSwitch.jsx
│   │   ├── table/             # 表格组件
│   │   ├── tabs/              # 选项卡组件
│   │   └── tooltip/           # 工具提示组件
│   ├── utils/                  # 工具函数
│   ├── views/                  # 页面视图 (27个页面)
│   │   ├── account/           # 账户管理
│   │   ├── agentexecutions/   # Agent执行
│   │   ├── agentflows/        # Agent流程
│   │   ├── agentflowsv2/      # Agent流程V2
│   │   ├── apikey/            # API密钥管理
│   │   ├── assistants/        # AI助手
│   │   ├── auth/              # 认证 (登录/注册)
│   │   ├── canvas/            # 画布编辑器
│   │   ├── chatbot/           # 聊天机器人
│   │   ├── chatflows/         # 聊天流程
│   │   ├── chatmessage/       # 聊天消息
│   │   ├── credentials/       # 凭证管理
│   │   ├── datasets/          # 数据集
│   │   ├── docstore/          # 文档存储
│   │   ├── evaluations/       # 评估
│   │   ├── evaluators/        # 评估器
│   │   ├── files/             # 文件管理
│   │   ├── marketplaces/      # 市场模板
│   │   ├── organization/      # 组织管理
│   │   ├── roles/             # 角色管理
│   │   ├── serverlogs/        # 服务器日志
│   │   ├── settings/          # 设置
│   │   ├── tools/             # 工具
│   │   ├── users/             # 用户管理
│   │   ├── variables/         # 变量管理
│   │   ├── vectorstore/       # 向量存储
│   │   └── workspace/         # 工作区
│   ├── App.jsx                 # 应用根组件
│   ├── config.js               # 配置文件
│   ├── ErrorBoundary.jsx       # 错误边界
│   ├── index.jsx               # 入口文件
│   └── serviceWorker.js        # Service Worker
├── package.json
├── vite.config.js
└── README.md
```

---

## 🏗️ 核心技术详解

### 1. 路由系统 (React Router v6)

**路由配置**: [src/routes/index.jsx](packages/ui/src/routes/index.jsx)

```javascript
import { useRoutes } from 'react-router-dom'
import MainRoutes from './MainRoutes'
import CanvasRoutes from './CanvasRoutes'
import ChatbotRoutes from './ChatbotRoutes'
import AuthRoutes from './AuthRoutes'
import ExecutionRoutes from './ExecutionRoutes'

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthRoutes, CanvasRoutes, ChatbotRoutes, ExecutionRoutes])
}
```

**路由模块**:

-   **MainRoutes**: 主应用路由 (需要认证)
-   **AuthRoutes**: 认证路由 (登录/注册)
-   **CanvasRoutes**: 画布编辑器路由
-   **ChatbotRoutes**: 聊天机器人路由
-   **ExecutionRoutes**: 执行详情路由

**认证守卫**: [src/routes/RequireAuth.jsx](packages/ui/src/routes/RequireAuth.jsx)

-   自动检测认证状态
-   开源模式下绕过认证
-   未认证自动重定向到登录页

### 2. 状态管理 (Redux)

**Store 配置**: [src/store/index.jsx](packages/ui/src/store/index.jsx)

```javascript
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
export { store }
```

**主要 Reducers**:

-   **customization**: 主题定制 (深色模式、字体大小等)
-   **canvas**: 画布状态
-   **dialog**: 对话框状态
-   **notifier**: 通知状态

**Context Providers**:

-   **ConfigProvider**: 配置上下文
-   **ConfirmContextProvider**: 确认对话框上下文
-   **ErrorProvider**: 错误处理上下文
-   **ReactFlowContext**: ReactFlow 画布上下文

### 3. 国际化 (i18next)

**配置文件**: [src/i18n/config.js](packages/ui/src/i18n/config.js)

**支持语言**:

-   🇺🇸 English (en)
-   🇨🇳 中文 (zh)

**翻译命名空间** (34 个):

```javascript
ns: [
    'common', // 通用文案
    'menu', // 菜单导航
    'workspace', // 工作区
    'header', // 头部组件
    'validation', // 表单验证
    'error', // 错误消息
    'dialog', // 对话框组件
    'flowmenu', // 流程列表菜单
    'canvas', // Canvas画布
    'chatflows', // Chatflows页面
    'agentflows', // Agentflows页面
    'tools', // Tools页面
    'credentials', // Credentials页面
    'marketplaces', // Marketplaces页面
    'assistants', // Assistants页面
    'variables', // Variables页面
    'executions', // Executions页面
    'docstores', // Document Stores页面
    'apikeys', // API Keys页面
    'datasets', // Datasets页面
    'evaluators', // Evaluators页面
    'evaluations', // Evaluations页面
    'evaluationResult', // Evaluation Result页面
    'users', // Users页面
    'roles', // Roles页面
    'organization', // Organization页面
    'account', // Account页面
    'auth', // Auth页面
    'chat', // Chat组件
    'files', // Files页面
    'loginActivity', // Login Activity页面
    'logs', // Logs页面
    'serverlogs', // Server Logs页面
    'executionDetails' // Execution Details页面
]
```

**使用方式**:

```javascript
import { useTranslation } from 'react-i18next'

function MyComponent() {
    // 使用单个命名空间
    const { t } = useTranslation('common')

    // 使用多个命名空间
    const { t } = useTranslation(['users', 'common'])

    return (
        <div>
            <h1>{t('pageTitle')}</h1>
            <button>{t('common:save')}</button>
            <p>{t('description', { name: 'John' })}</p>
        </div>
    )
}
```

**语言切换组件**: [src/ui-component/switch/LanguageSwitch.jsx](packages/ui/src/ui-component/switch/LanguageSwitch.jsx)

-   动画图标设计
-   语言自动保存到 localStorage
-   实时切换无需刷新

### 4. 主题系统 (MUI Theme)

**主题配置**: [src/themes/index.js](packages/ui/src/themes/index.js)

**支持模式**:

-   🌞 浅色模式 (Light Mode)
-   🌙 深色模式 (Dark Mode)

**主题定制**:

-   **palette.js**: 调色板配置
-   **typography.js**: 字体排版
-   **compStyleOverride.js**: 组件样式覆盖 (400+ 行)

**深色模式切换**: [src/ui-component/switch/DarkModeSwitch.jsx](packages/ui/src/ui-component/switch/DarkModeSwitch.jsx)

### 5. 表单处理 (Formik + Yup)

**表单验证示例**:

```javascript
import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8).required('Required')
})

<Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={(values) => handleSubmit(values)}
>
    {/* Form fields */}
</Formik>
```

### 6. 流程图编辑器 (ReactFlow)

**画布组件**: [src/views/canvas](packages/ui/src/views/canvas)

**功能特性**:

-   拖拽节点
-   连接线编辑
-   缩放/平移
-   撤销/重做
-   节点配置
-   自动布局

**上下文**: [src/store/context/ReactFlowContext.jsx](packages/ui/src/store/context/ReactFlowContext.jsx)

---

## 📄 页面视图清单

### 核心功能页面

| 页面              | 路径            | 说明               | 翻译状态 |
| ----------------- | --------------- | ------------------ | -------- |
| **Canvas**        | `/canvas/:id`   | 流程图画布编辑器   | ✅       |
| **Chatflows**     | `/chatflows`    | 聊天流程列表       | ✅       |
| **Agentflows**    | `/agentflows`   | Agent 流程列表     | ✅       |
| **Agentflows V2** | `/agentflowsv2` | Agent 流程 V2 列表 | ✅       |
| **Chatbot**       | `/chatbot/:id`  | 聊天机器人界面     | ✅       |
| **Marketplaces**  | `/marketplaces` | 模板市场           | ✅       |

### 数据管理页面

| 页面                | 路径               | 说明        | 翻译状态 |
| ------------------- | ------------------ | ----------- | -------- |
| **Tools**           | `/tools`           | 工具管理    | ✅       |
| **Credentials**     | `/credentials`     | 凭证管理    | ✅       |
| **Assistants**      | `/assistants`      | AI 助手管理 | ✅       |
| **Variables**       | `/variables`       | 变量管理    | ✅       |
| **Document Stores** | `/document-stores` | 文档存储    | ✅       |
| **Vector Stores**   | `/vector-stores`   | 向量存储    | ✅       |
| **Datasets**        | `/datasets`        | 数据集管理  | ✅       |

### 评估与监控

| 页面                 | 路径                   | 说明           | 翻译状态 |
| -------------------- | ---------------------- | -------------- | -------- |
| **Executions**       | `/executions`          | 执行记录       | ✅       |
| **Agent Executions** | `/agentexecutions/:id` | Agent 执行详情 | ✅       |
| **Evaluators**       | `/evaluators`          | 评估器管理     | ✅       |
| **Evaluations**      | `/evaluations`         | 评估结果       | ✅       |
| **Server Logs**      | `/logs`                | 服务器日志     | ✅       |

### 用户与权限管理

| 页面             | 路径            | 说明       | 翻译状态 |
| ---------------- | --------------- | ---------- | -------- |
| **Users**        | `/users`        | 用户管理   | ✅       |
| **Roles**        | `/roles`        | 角色管理   | ✅       |
| **Workspace**    | `/workspace`    | 工作区管理 | ✅       |
| **Organization** | `/organization` | 组织管理   | ✅       |
| **Account**      | `/account`      | 账户设置   | ✅       |

### 系统管理

| 页面         | 路径        | 说明         | 翻译状态 |
| ------------ | ----------- | ------------ | -------- |
| **API Keys** | `/apikey`   | API 密钥管理 | ✅       |
| **Files**    | `/files`    | 文件管理     | ✅       |
| **Settings** | `/settings` | 系统设置     | ✅       |

### 认证页面

| 页面         | 路径        | 说明 | 翻译状态 |
| ------------ | ----------- | ---- | -------- |
| **Login**    | `/login`    | 登录 | ✅       |
| **Register** | `/register` | 注册 | ✅       |

---

## 🌍 国际化 (i18n)

### 翻译进度总览

**前端页面**: 100% ✅

-   所有 27 个页面已完成翻译
-   34 个翻译命名空间
-   约 1100+ 翻译条目

**后端节点**: 20% 🟡

-   ✅ Chat Models (10 个节点)
-   🟡 其他节点类型待完成

### 翻译文件结构

```
packages/ui/public/locales/
├── en/                         # 英文翻译
│   ├── common.json            # 通用文案 (按钮、操作等)
│   ├── menu.json              # 菜单项
│   ├── header.json            # 头部组件
│   ├── validation.json        # 表单验证
│   ├── error.json             # 错误消息
│   ├── dialog.json            # 对话框
│   ├── chatflows.json         # Chatflows页面
│   ├── agentflows.json        # Agentflows页面
│   ├── tools.json             # Tools页面
│   ├── credentials.json       # Credentials页面
│   ├── marketplaces.json      # Marketplaces页面
│   ├── assistants.json        # Assistants页面
│   ├── variables.json         # Variables页面
│   ├── executions.json        # Executions页面
│   ├── docstores.json         # Document Stores页面
│   ├── apikeys.json           # API Keys页面
│   ├── datasets.json          # Datasets页面
│   ├── evaluators.json        # Evaluators页面
│   ├── evaluations.json       # Evaluations页面
│   ├── users.json             # Users页面
│   ├── roles.json             # Roles页面
│   ├── organization.json      # Organization页面
│   ├── account.json           # Account页面
│   ├── workspace.json         # Workspace页面
│   ├── auth.json              # Auth页面
│   ├── chat.json              # Chat组件
│   ├── files.json             # Files页面
│   ├── canvas.json            # Canvas画布
│   ├── flowmenu.json          # 流程列表菜单
│   ├── loginActivity.json     # Login Activity页面
│   ├── logs.json              # Logs页面
│   ├── serverlogs.json        # Server Logs页面
│   ├── executionDetails.json  # Execution Details页面
│   └── evaluationResult.json  # Evaluation Result页面
└── zh/                         # 中文翻译 (同结构)
```

### 添加新翻译

#### 1. 创建翻译文件

```bash
# 创建英文翻译
packages/ui/public/locales/en/mypage.json

# 创建中文翻译
packages/ui/public/locales/zh/mypage.json
```

#### 2. 添加翻译内容

**en/mypage.json**:

```json
{
    "pageTitle": "My Page",
    "description": "This is my page",
    "buttonSave": "Save",
    "buttonCancel": "Cancel"
}
```

**zh/mypage.json**:

```json
{
    "pageTitle": "我的页面",
    "description": "这是我的页面",
    "buttonSave": "保存",
    "buttonCancel": "取消"
}
```

#### 3. 在配置中注册命名空间

编辑 [src/i18n/config.js](packages/ui/src/i18n/config.js):

```javascript
ns: [
    'common',
    'menu',
    // ... 其他命名空间
    'mypage'  // 新增
],
```

#### 4. 在组件中使用

```javascript
import { useTranslation } from 'react-i18next'

function MyPage() {
    const { t } = useTranslation(['mypage', 'common'])

    return (
        <div>
            <h1>{t('pageTitle')}</h1>
            <p>{t('description')}</p>
            <button>{t('common:save')}</button>
        </div>
    )
}
```

### 翻译最佳实践

1. **命名约定**:

    - 使用 camelCase: `pageTitle`, `buttonSave`
    - 语义化命名: `deleteConfirmTitle` 优于 `title1`

2. **参数化翻译**:

    ```javascript
    // 翻译文件
    {
        "greeting": "Hello, {{name}}!",
        "itemCount": "You have {{count}} items"
    }

    // 使用
    t('greeting', { name: 'John' })
    t('itemCount', { count: 5 })
    ```

3. **复用通用文案**:

    - 按钮: `common:save`, `common:cancel`, `common:delete`
    - 操作: `common:add`, `common:edit`, `common:view`
    - 状态: `common:success`, `common:error`, `common:loading`

4. **技术术语处理**:
    - API, HTTP, JSON, UUID 等保持英文
    - LLM 可翻译为"大语言模型"或保持 LLM
    - 根据上下文决定是否翻译

---

## 🎨 主题系统

### 深色模式 vs 浅色模式

**切换方式**:

-   点击右上角月亮/太阳图标
-   自动保存到 Redux Store
-   持久化到 localStorage

**主题配置**: [src/themes/](packages/ui/src/themes/)

### 调色板 (Palette)

**浅色模式**:

```javascript
{
    primary: {
        main: '#2196f3',    // 蓝色
        light: '#e3f2fd',
        dark: '#1e88e5'
    },
    secondary: {
        main: '#9c27b0',    // 紫色
        light: '#f3e5f5',
        dark: '#7b1fa2'
    },
    background: {
        default: '#fafafa',
        paper: '#ffffff'
    }
}
```

**深色模式**:

```javascript
{
    primary: {
        main: '#90caf9',
        dark: '#42a5f5'
    },
    secondary: {
        main: '#ce93d8',
        dark: '#ab47bc'
    },
    background: {
        default: '#121212',
        paper: '#1e1e1e'
    }
}
```

### 字体排版 (Typography)

```javascript
{
    fontFamily: [
        'Inter',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        'sans-serif'
    ].join(','),
    h1: { fontSize: '2.125rem', fontWeight: 500 },
    h2: { fontSize: '1.5rem', fontWeight: 500 },
    h3: { fontSize: '1.25rem', fontWeight: 500 },
    body1: { fontSize: '0.875rem' },
    button: { textTransform: 'none' }
}
```

### 组件样式覆盖

**示例**: [src/themes/compStyleOverride.js:L1-L50](packages/ui/src/themes/compStyleOverride.js#L1-L50)

自定义了以下组件样式:

-   Button
-   TextField
-   Chip
-   Card
-   Dialog
-   Drawer
-   Menu
-   Table
-   Tabs
-   等 20+ 个组件

---

## 📖 开发指南

### 添加新页面

#### 1. 创建页面组件

```javascript
// packages/ui/src/views/mypage/index.jsx
import { useTranslation } from 'react-i18next'
import MainCard from '@/ui-component/cards/MainCard'

const MyPage = () => {
    const { t } = useTranslation('mypage')

    return (
        <MainCard title={t('pageTitle')}>
            <div>{t('content')}</div>
        </MainCard>
    )
}

export default MyPage
```

#### 2. 添加路由

编辑 [src/routes/MainRoutes.jsx](packages/ui/src/routes/MainRoutes.jsx):

```javascript
import MyPage from '@/views/mypage'

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        // ... 其他路由
        {
            path: '/mypage',
            element: <MyPage />
        }
    ]
}
```

#### 3. 添加菜单项

编辑 [src/menu-items/index.js](packages/ui/src/menu-items/index.js):

```javascript
import { IconMyIcon } from '@tabler/icons-react'

const menuItems = {
    items: [
        {
            id: 'mypage',
            title: 'My Page',
            type: 'item',
            url: '/mypage',
            icon: IconMyIcon,
            breadcrumbs: false
        }
    ]
}
```

#### 4. 创建翻译文件

**en/mypage.json**:

```json
{
    "pageTitle": "My Page",
    "content": "Welcome to my page"
}
```

**zh/mypage.json**:

```json
{
    "pageTitle": "我的页面",
    "content": "欢迎来到我的页面"
}
```

#### 5. 更新 i18n 配置

编辑 [src/i18n/config.js](packages/ui/src/i18n/config.js):

```javascript
ns: [
    // ... 其他命名空间
    'mypage' // 新增
]
```

### 添加新组件

#### 通用组件示例

```javascript
// packages/ui/src/ui-component/mycomponent/MyComponent.jsx
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const MyComponent = ({ title, children }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper
            }}
        >
            <Typography variant='h5'>{title}</Typography>
            {children}
        </Box>
    )
}

MyComponent.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default MyComponent
```

### API 调用规范

#### 创建 API 模块

```javascript
// packages/ui/src/api/myapi.js
import client from './client'

const getAllItems = () => client.get('/api/v1/items')
const getItem = (id) => client.get(`/api/v1/items/${id}`)
const createItem = (body) => client.post('/api/v1/items', body)
const updateItem = (id, body) => client.put(`/api/v1/items/${id}`, body)
const deleteItem = (id) => client.delete(`/api/v1/items/${id}`)

export default {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}
```

#### 在组件中使用

```javascript
import { useEffect, useState } from 'react'
import myapi from '@/api/myapi'

function MyComponent() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        myapi
            .getAllItems()
            .then((res) => setItems(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    return <div>{/* 渲染 items */}</div>
}
```

### 表单处理

#### Formik + Yup 示例

```javascript
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

const MyForm = ({ onSubmit }) => {
    const { t } = useTranslation(['mypage', 'validation'])

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t('validation:required'))
            .min(3, t('validation:minLength', { count: 3 })),
        email: Yup.string().email(t('validation:invalidEmail')).required(t('validation:required'))
    })

    return (
        <Formik initialValues={{ name: '', email: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <TextField
                        name='name'
                        label={t('name')}
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        name='email'
                        label={t('email')}
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        fullWidth
                        margin='normal'
                    />
                    <Button type='submit' variant='contained'>
                        {t('common:submit')}
                    </Button>
                </form>
            )}
        </Formik>
    )
}
```

### 代码风格规范

**Prettier 配置** (根目录 package.json):

```json
{
    "prettier": {
        "printWidth": 140,
        "singleQuote": true,
        "jsxSingleQuote": true,
        "trailingComma": "none",
        "tabWidth": 4,
        "semi": false,
        "endOfLine": "auto"
    }
}
```

**ESLint 规则**:

-   React 推荐规则
-   React Hooks 规则
-   Prettier 集成

**命令**:

```bash
# 格式化代码
pnpm format

# 检查代码规范
pnpm lint

# 自动修复
pnpm lint-fix
```

---

## 📅 近期更新

### 2025-10-17

-   ✅ 添加 animated-icons 组件文档
-   ✅ 更新部署文档，添加最新 Docker 镜像信息
-   ✅ 添加 Docker 镜像构建指南和优化的 Dockerfile

### 2025-10-16

-   ✅ 修复开源模式下的 403 Forbidden 问题
-   ✅ 添加 Node 20 本地开发环境配置文档
-   ✅ 修复翻译模块导入失败问题
-   ✅ 修复 Docker 构建失败问题
-   ✅ 优化 UI 组件样式和用户体验

### 2025-10-16 (i18n 完成)

-   ✅ **完成阶段 1**: 前端所有页面国际化 (100%)
-   ✅ **完成阶段 2**: 后端 i18n 架构设计
-   ✅ **完成阶段 3 (第一批)**: 10 个 Chat Models 节点翻译
-   ✅ 新增 34 个翻译命名空间
-   ✅ 总计约 1100+ 翻译条目

### 主要改进

-   🎨 统一深色模式下输入框和选择框的背景色
-   🌐 语言切换组件优化 (动画图标)
-   🔧 错误页面 UI 优化
-   📝 市场模板卡片文字样式统一

---

## 🔗 相关文档

-   [I18N 实施指南](I18N_IMPLEMENTATION_GUIDE.md) - 详细的国际化实施步骤
-   [翻译报告](TRANSLATION_REPORT.md) - 市场模板翻译统计
-   [部署指南](DEPLOYMENT.md) - 完整的部署文档
-   [本地开发配置](LOCAL_DEVELOPMENT.md) - Node 20 环境配置

---

## 📞 技术支持

如有问题或建议，请通过以下方式联系:

-   提交 Issue
-   查看文档
-   联系开发团队

---

**最后更新**: 2025-10-17
**文档版本**: 1.0.0
