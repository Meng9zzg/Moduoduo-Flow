# UI 修改工作日志

本文档记录所有前端 UI 相关的修改和优化工作。

---

## 2025-10-17: Canvas 控制栏组件优化

### 任务概述

对 Canvas 页面底部控制栏进行全面优化，包括自定义动画图标、深色模式配色设计、bug 修复等。

### 完成内容

#### 1. 自定义动画图标组件

创建了 7 个自定义动画图标组件，位于 `packages/ui/src/ui-component/animated-icons/`：

| 图标组件     | 文件名           | 功能             | 动画效果                                     | 尺寸 |
| ------------ | ---------------- | ---------------- | -------------------------------------------- | ---- |
| PlusIcon     | PlusIcon.jsx     | 放大按钮         | 图标放大并弹跳两次 (scale: 1→1.2→1→1.15→1)   | 22px |
| MinusIcon    | MinusIcon.jsx    | 缩小按钮         | 图标缩小并弹跳两次 (scale: 1→0.8→1→0.85→1)   | 22px |
| FocusIcon    | FocusIcon.jsx    | 居中对齐         | 十字准星，圆圈和线条收缩 (scale: 1→0.85→1)   | 20px |
| MaximizeIcon | MaximizeIcon.jsx | 全屏模式         | 四个角向外扩散 (translateX/Y: ±2px)          | 20px |
| BlocksIcon   | BlocksIcon.jsx   | 对齐网格(未选中) | L 形+小方块，方块对角移动 (translate: -4, 4) | 22px |
| GridIcon     | GridIcon.jsx     | 对齐网格(选中)   | 田字形静态图标，2×2 网格布局                 | 22px |
| GripIcon     | GripIcon.jsx     | 切换背景         | 9 个圆点按顺序淡入淡出 (opacity: 1→0.3→1)    | 22px |

**技术实现：**

-   使用 `framer-motion` 库实现流畅动画
-   所有图标支持 `forwardRef`，可被父组件控制
-   使用 `useAnimation` hook 和 `useImperativeHandle` 暴露动画控制接口
-   支持悬浮自动触发动画，也支持外部手动控制
-   统一使用 PropTypes 进行类型验证

#### 2. CustomControls 组件更新

**位置：**

-   `packages/ui/src/views/canvas/CustomControls.jsx`
-   `packages/ui/src/views/agentflowsv2/CustomControls.jsx`

**主要改动：**

1. 导入所有自定义图标组件
2. 替换原有的 `IconZoomIn`, `IconZoomOut` 等 Tabler Icons
3. 为每个按钮添加 MUI Tooltip，使用全局毛玻璃样式
4. 第 5 个按钮（对齐网格）根据 `isSnappingEnabled` 状态动态切换图标：
    - 未选中：显示 `BlocksIcon`
    - 选中：显示 `GridIcon` (田字形)
5. 所有按钮使用 flexbox 居中对齐
6. 添加 PropTypes 验证

#### 3. 深色模式配色设计

**文件：**

-   `packages/ui/src/views/canvas/CustomControls.css`
-   `packages/ui/src/views/agentflowsv2/CustomControls.css`

**配色方案：**

| 状态 | 按钮背景  | 图标颜色  | 说明                                 |
| ---- | --------- | --------- | ------------------------------------ |
| 默认 | `#23262c` | `#7B7E8C` | darkPrimaryLight，与深色主题卡片一致 |
| 悬浮 | `#32353b` | `#B7BBCB` | darkPrimary800，提供清晰的交互反馈   |
| 选中 | `#23262c` | `#96A9FF` | 蓝紫色强调，突出激活状态             |
| 点击 | `#32353b` | `#96A9FF` | 向下位移 0.225em，配合蓝紫色         |

**阴影系统：**

-   使用深色渐变阴影 (`#2d2f39` → `#0b0c0f`)
-   配合半透明阴影 `rgba(17, 18, 23, 0.6)` 增强立体感
-   点击时阴影收缩，透明度降低至 `0.4`

**设计理念：**

-   颜色梯度从深到浅：`#7B7E8C` → `#B7BBCB` → `#96A9FF`
-   所有颜色来自主题色系统，保持品牌一致性
-   使用蓝紫色作为强调色，增强品牌辨识度

#### 4. Bug 修复

##### Bug 1: 全屏模式主题颜色丢失

**问题描述：**
在浅色模式下点击全屏按钮，进入全屏后背景变成深色，没有保持当前主题。

**修复方案：**

1. **CSS 修改** (`index.css`):

```css
/* 浅色模式全屏 */
.reactflow-parent-wrapper:fullscreen {
    background-color: #ffffff;
}

/* 深色模式全屏 */
.reactflow-parent-wrapper.dark-mode:fullscreen {
    background-color: #1a1a1a;
}
```

2. **添加 dark-mode 类** (修改 4 个文件):

-   `packages/ui/src/views/canvas/index.jsx:588`
-   `packages/ui/src/views/agentflowsv2/Canvas.jsx:711`
-   `packages/ui/src/views/agentflowsv2/MarketplaceCanvas.jsx:107`

```jsx
<div className={`reactflow-parent-wrapper ${customization.isDarkMode ? 'dark-mode' : ''}`}>
```

**影响文件：**

-   `packages/ui/src/views/canvas/index.css`
-   `packages/ui/src/views/canvas/index.jsx`
-   `packages/ui/src/views/agentflowsv2/index.css`
-   `packages/ui/src/views/agentflowsv2/Canvas.jsx`
-   `packages/ui/src/views/agentflowsv2/MarketplaceCanvas.jsx`

##### Bug 2: 第五个图标选中状态样式错误

**问题描述：**
第五个图标（切换对齐网格）在选中状态下应该显示田字形样式，并且大小要与其他图标一致。

**修复方案：**

1. 创建新的 `GridIcon` 组件（田字形，2×2 网格）
2. 在 `CustomControls.jsx` 中根据状态动态切换：

```jsx
{
    isSnappingEnabled ? <GridIcon size={22} /> : <BlocksIcon size={22} />
}
```

**影响文件：**

-   `packages/ui/src/ui-component/animated-icons/GridIcon.jsx` (新建)
-   `packages/ui/src/views/canvas/CustomControls.jsx`
-   `packages/ui/src/views/agentflowsv2/CustomControls.jsx`

##### Bug 3: 全局 Tooltip 箭头和文字框颜色不一致

**问题描述：**
深色和浅色模式下，tooltip 的箭头和文字框颜色、透明度不一致。

**原因分析：**
MUI 的 tooltip 箭头是通过 CSS border 三角形实现的，需要使用 `color` 属性而不是 `backgroundColor`。

**修复方案：**

修改 `packages/ui/src/themes/compStyleOverride.js`:

```javascript
MuiTooltip: {
    styleOverrides: {
        tooltip: {
            backgroundColor: theme?.customization?.isDarkMode
                ? 'rgba(150, 169, 255, 0.25)'
                : 'rgba(177, 191, 255, 0.25)',
            color: theme?.customization?.isDarkMode ? '#fafafa' : theme.colors?.grey700,
            fontSize: '0.875rem',
            borderRadius: '12px',
            padding: '8px 14px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
        },
        arrow: {
            color: theme?.customization?.isDarkMode
                ? 'rgba(150, 169, 255, 0.25)'
                : 'rgba(177, 191, 255, 0.25)'
        }
    }
}
```

**影响文件：**

-   `packages/ui/src/themes/compStyleOverride.js`

#### 5. 其他优化

##### 控制栏位置调整

-   从 `bottom: 60px` 调整为 `bottom: 40px`
-   保持与底部 40px 的合适距离

##### Tooltip 翻译更新

**中文** (`packages/ui/public/locales/zh/canvas.json`):

```json
"controls": {
    "zoomIn": "放大",
    "zoomOut": "缩小",
    "fitView": "居中对齐",
    "fullScreen": "全屏模式",
    "toggleSnapping": "切换对齐网格",
    "toggleBackground": "切换背景"
}
```

**英文** (`packages/ui/public/locales/en/canvas.json`):

```json
"controls": {
    "zoomIn": "Zoom In",
    "zoomOut": "Zoom Out",
    "fitView": "Center Align",
    "fullScreen": "Full Screen",
    "toggleSnapping": "Toggle snapping",
    "toggleBackground": "Toggle background"
}
```

##### 图标尺寸调整

-   移除 CSS 中固定的 SVG 尺寸限制
-   通过 props 传递 size，实现灵活控制
-   图标 1, 2, 5, 6: 22px
-   图标 3, 4: 20px

##### CSS 样式优化

```css
.custom-controls-wrapper .btn svg {
    display: block;
}
```

-   移除了 `width` 和 `height` 固定值
-   使用 `display: block` 防止 inline 空白问题

### 文件清单

#### 新增文件 (7 个)

```
packages/ui/src/ui-component/animated-icons/
├── PlusIcon.jsx          # 放大图标
├── MinusIcon.jsx         # 缩小图标
├── FocusIcon.jsx         # 居中对齐图标
├── MaximizeIcon.jsx      # 全屏图标
├── BlocksIcon.jsx        # 对齐网格图标(未选中)
├── GridIcon.jsx          # 对齐网格图标(选中，田字形)
└── GripIcon.jsx          # 切换背景图标
```

#### 修改文件 (10 个)

**Canvas 页面：**

-   `packages/ui/src/views/canvas/CustomControls.jsx` - 控制组件
-   `packages/ui/src/views/canvas/CustomControls.css` - 控制组件样式
-   `packages/ui/src/views/canvas/index.jsx` - Canvas 主文件
-   `packages/ui/src/views/canvas/index.css` - Canvas 样式

**AgentFlow V2 页面：**

-   `packages/ui/src/views/agentflowsv2/CustomControls.jsx` - 控制组件
-   `packages/ui/src/views/agentflowsv2/CustomControls.css` - 控制组件样式
-   `packages/ui/src/views/agentflowsv2/Canvas.jsx` - AgentFlow Canvas
-   `packages/ui/src/views/agentflowsv2/MarketplaceCanvas.jsx` - 市场 Canvas
-   `packages/ui/src/views/agentflowsv2/index.css` - AgentFlow 样式

**主题配置：**

-   `packages/ui/src/themes/compStyleOverride.js` - 全局 MUI 组件样式

### Git 提交信息

**Commit:** `57611be5`

```
feat(ui): 优化Canvas控制栏组件 - 自定义图标、深色模式配色和全局样式修复
```

**提交内容：**

-   20 个文件修改
-   1206 行新增
-   66 行删除

### GitHub 分支

**主分支：** `main`

-   包含所有修改，已推送到远程仓库

**组件复用分支：** `feature/canvas-controls-component`

-   专门保存 Canvas 控制栏组件，便于后续复用
-   远程地址：https://github.com/Meng9zzg/Moduoduo-Flow/tree/feature/canvas-controls-component

### 技术栈

-   **React**: 组件开发
-   **framer-motion**: 动画效果
-   **Material-UI (MUI)**: Tooltip 组件
-   **i18next**: 国际化翻译
-   **PropTypes**: 类型验证
-   **CSS3**: 样式和深色模式

### 后续复用指南

如需在其他项目中复用 Canvas 控制栏组件，请参考以下步骤：

1. **切换到组件分支：**

```bash
git checkout feature/canvas-controls-component
```

2. **复制以下文件到新项目：**

    - 所有动画图标组件 (`animated-icons/`)
    - `CustomControls.jsx` 和 `CustomControls.css`
    - 相关翻译文件 (`locales/*/canvas.json`)

3. **安装依赖：**

```bash
npm install framer-motion @mui/material react-i18next prop-types
```

4. **集成到项目：**
    - 导入 `CustomControls` 组件
    - 传递必要的 props（`isDarkMode`, `isSnappingEnabled` 等）
    - 根据需要调整主题色配置

### 设计原则

1. **动画流畅性**: 所有动画使用 easeInOut 曲线，duration 控制在 0.6s 内
2. **颜色系统性**: 所有颜色来自主题配置，确保全局一致
3. **响应式反馈**: 悬浮、点击、选中状态都有明确的视觉反馈
4. **可复用性**: 组件独立封装，接口清晰，易于移植
5. **类型安全**: 使用 PropTypes 验证，减少运行时错误

### 测试要点

-   [x] 所有 6 个按钮图标正确显示
-   [x] 悬浮时动画正常触发
-   [x] 深色/浅色模式切换正常
-   [x] 全屏模式保持当前主题
-   [x] Tooltip 样式统一（箭头和文字框）
-   [x] 第 5 个按钮选中时显示田字形
-   [x] 所有图标水平居中对齐
-   [x] 图标尺寸正确（3、4 号 20px，其他 22px）
-   [x] 翻译正确显示（中英文）
-   [x] 点击按钮功能正常（放大、缩小、居中、全屏等）

### 已知问题

无

---

## 下次修改时间：待定

_本文档持续更新中..._
