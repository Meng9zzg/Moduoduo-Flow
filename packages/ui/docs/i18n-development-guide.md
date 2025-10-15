# 国际化开发指南 (i18n Development Guide)

本文档为 Flowise UI 项目的国际化开发提供指导和最佳实践。

---

## 📚 目录

1. [技术栈](#技术栈)
2. [目录结构](#目录结构)
3. [基础用法](#基础用法)
4. [高级用法](#高级用法)
5. [新增翻译流程](#新增翻译流程)
6. [常见问题](#常见问题)
7. [调试技巧](#调试技巧)

---

## 🛠️ 技术栈

我们使用以下库实现国际化：

-   **i18next**: 核心国际化框架
-   **react-i18next**: React 集成
-   **i18next-http-backend**: 动态加载翻译文件
-   **i18next-browser-languagedetector**: 自动检测浏览器语言

---

## 📁 目录结构

```
packages/ui/
├── public/
│   └── locales/              # 翻译资源文件
│       ├── en/               # 英文翻译
│       │   ├── common.json
│       │   ├── menu.json
│       │   ├── chatflows.json
│       │   └── ...
│       └── zh/               # 中文翻译
│           ├── common.json
│           ├── menu.json
│           ├── chatflows.json
│           └── ...
├── src/
│   ├── i18n/
│   │   └── config.js         # i18n配置文件
│   └── ...
└── docs/
    ├── i18n-glossary.md      # 术语表
    └── i18n-development-guide.md  # 本文档
```

---

## 🎯 基础用法

### 1. 在 React 组件中使用翻译

```jsx
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
    const { t } = useTranslation()

    return (
        <div>
            <h1>{t('common.welcome')}</h1>
            <button>{t('common.save')}</button>
        </div>
    )
}
```

### 2. 使用特定命名空间

```jsx
import { useTranslation } from 'react-i18next'

const ChatflowsPage = () => {
    // 加载 chatflows 和 common 命名空间
    const { t } = useTranslation(['chatflows', 'common'])

    return (
        <div>
            <h1>{t('chatflows:title')}</h1>
            <button>{t('common:save')}</button>
        </div>
    )
}
```

### 3. 在非 React 代码中使用

```javascript
import i18n from '@/i18n/config'

// 在普通JS文件中
const message = i18n.t('common.error')

// 在Yup验证中
import * as Yup from 'yup'

const schema = Yup.object({
    name: Yup.string()
        .required(i18n.t('validation.nameRequired'))
        .min(3, i18n.t('validation.nameMinLength', { min: 3 }))
})
```

---

## 🚀 高级用法

### 1. 插值（变量替换）

**翻译文件：**

```json
{
    "greeting": "Hello, {{name}}!",
    "itemCount": "You have {{count}} items"
}
```

**使用：**

```jsx
<p>{t('greeting', { name: 'John' })}</p>
// 输出: Hello, John!

<p>{t('itemCount', { count: 5 })}</p>
// 输出: You have 5 items
```

### 2. 复数形式

**翻译文件：**

```json
{
    "items": {
        "one": "{{count}} item",
        "other": "{{count}} items"
    }
}
```

**使用：**

```jsx
<p>{t('items', { count: 1 })}</p>  // 1 item
<p>{t('items', { count: 5 })}</p>  // 5 items
```

### 3. 默认值（防止缺失翻译）

```jsx
// 如果 key 不存在，显示默认文本
<p>{t('someKey', 'Default Text')}</p>

// 或使用 defaultValue 选项
<p>{t('someKey', { defaultValue: 'Default Text' })}</p>
```

### 4. 日期和数字格式化

```jsx
import { useTranslation } from 'react-i18next'

const { t, i18n } = useTranslation()

// 日期格式化
const date = new Date()
const formattedDate = new Intl.DateTimeFormat(i18n.language).format(date)

// 数字格式化
const number = 1234.56
const formattedNumber = new Intl.NumberFormat(i18n.language).format(number)
```

### 5. 动态切换语言

```jsx
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
    const { i18n } = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        localStorage.setItem('language', lng)
    }

    return (
        <>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('zh')}>中文</button>
        </>
    )
}
```

---

## ➕ 新增翻译流程

### 步骤 1：确定文案所属模块

-   **通用文案** → `common.json` (按钮、操作、状态)
-   **菜单相关** → `menu.json`
-   **特定模块** → 对应模块的 JSON 文件

### 步骤 2：添加翻译 Key

**位置：** `packages/ui/public/locales/`

**英文翻译：** `en/mymodule.json`

```json
{
    "newFeatureTitle": "My New Feature",
    "newFeatureDescription": "This is a description"
}
```

**中文翻译：** `zh/mymodule.json`

```json
{
    "newFeatureTitle": "我的新功能",
    "newFeatureDescription": "这是一段描述"
}
```

### 步骤 3：在组件中使用

```jsx
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
    const { t } = useTranslation('mymodule')

    return (
        <div>
            <h1>{t('newFeatureTitle')}</h1>
            <p>{t('newFeatureDescription')}</p>
        </div>
    )
}
```

### 步骤 4：测试验证

1. 启动开发服务器：`pnpm dev`
2. 切换语言测试
3. 检查控制台是否有 `missingKey` 错误
4. 验证文本显示正确，无布局问题

---

## ❓ 常见问题

### Q1: 为什么我的翻译没有生效？

**可能原因：**

1. 翻译文件路径不正确
2. 命名空间未加载
3. 翻译 Key 拼写错误
4. 浏览器缓存未清除

**解决方法：**

```jsx
// 确保加载了正确的命名空间
const { t } = useTranslation(['mymodule', 'common'])

// 检查控制台是否有错误信息
// 清除浏览器缓存或硬刷新 (Ctrl+Shift+R)
```

### Q2: 如何处理长文本导致的布局问题？

**使用 CSS 处理：**

```css
.text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

**或使用 Tooltip 显示完整文本：**

```jsx
import { Tooltip } from '@mui/material'
;<Tooltip title={t('longText')}>
    <span className='text-overflow'>{t('longText')}</span>
</Tooltip>
```

### Q3: 菜单配置是静态对象，如何翻译？

**方案 1：使用函数返回配置**

```javascript
// menu-items/dashboard.js
import i18n from '@/i18n/config'

export const getDashboardMenu = () => ({
    id: 'dashboard',
    children: [
        {
            id: 'chatflows',
            title: i18n.t('menu.chatflows')
        }
    ]
})
```

**方案 2：在组件中动态翻译**

```jsx
const MenuItem = ({ item }) => {
    const { t } = useTranslation('menu')
    return <div>{t(item.titleKey)}</div>
}
```

### Q4: 如何避免硬编码文本？

**❌ 错误示例：**

```jsx
<button>Save</button>
<h1>Welcome to Flowise</h1>
```

**✅ 正确示例：**

```jsx
const { t } = useTranslation()
<button>{t('common.save')}</button>
<h1>{t('common.welcomeTitle')}</h1>
```

### Q5: 如何处理 HTML 标签中的翻译？

**使用 Trans 组件：**

```jsx
import { Trans } from 'react-i18next'

// 翻译文件
{
  "termsAgreement": "I agree to the <1>Terms of Service</1> and <3>Privacy Policy</3>"
}

// 组件中
<Trans i18nKey="termsAgreement">
    I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
</Trans>
```

---

## 🐛 调试技巧

### 1. 开启调试模式

**编辑：** `src/i18n/config.js`

```javascript
i18n.init({
    debug: true // 开启调试
    // ...
})
```

**控制台输出示例：**

```
i18next::translator: missingKey en common saveButton
```

### 2. 检查当前语言

```jsx
import { useTranslation } from 'react-i18next'

const { i18n } = useTranslation()
console.log('Current language:', i18n.language)
console.log('Available languages:', i18n.languages)
```

### 3. 查看已加载的翻译

```javascript
console.log(i18n.store.data)
// 输出:
// {
//   en: { common: {...}, menu: {...} },
//   zh: { common: {...}, menu: {...} }
// }
```

### 4. 手动重新加载翻译

```javascript
i18n.reloadResources(['en', 'zh'], ['common', 'menu'])
```

---

## ✅ 最佳实践

### 1. 命名规范

**推荐格式：** `模块.功能.具体内容`

```json
{
    "chatflows.create.title": "Create Chatflow",
    "chatflows.create.description": "Create a new chatflow",
    "chatflows.edit.title": "Edit Chatflow",
    "chatflows.delete.confirm": "Are you sure you want to delete this chatflow?"
}
```

### 2. 避免过度嵌套

**❌ 不推荐：**

```json
{
    "user": {
        "profile": {
            "settings": {
                "privacy": {
                    "title": "Privacy Settings"
                }
            }
        }
    }
}
```

**✅ 推荐：**

```json
{
    "userProfilePrivacyTitle": "Privacy Settings"
}
```

### 3. 合理使用命名空间

-   **common.json**: 全局通用文案（按钮、操作）
-   **模块.json**: 模块特定文案
-   **validation.json**: 表单验证消息
-   **error.json**: 错误提示消息

### 4. 保持翻译文件同步

每次添加英文翻译时，同时添加中文翻译，避免遗漏。

### 5. 提交前检查清单

-   [ ] 英文和中文翻译都已添加
-   [ ] 翻译 Key 命名规范
-   [ ] 本地测试语言切换正常
-   [ ] 无控制台 `missingKey` 错误
-   [ ] 界面布局无异常

---

## 📞 支持与反馈

如有问题或建议，请：

1. 查阅本文档和术语表
2. 在团队内部讨论
3. 提交 Issue 到项目仓库

---

**最后更新：** 2025-10-15
**维护者：** Flowise UI Team
