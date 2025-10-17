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

## 2025-10-17: 首页左侧菜单栏自定义动画图标替换

### 任务概述

全面优化首页左侧菜单栏的用户体验，使用自定义动画图标替换所有静态 Tabler 图标，并优化菜单样式和间距。

### 完成内容

#### 1. 菜单样式优化

**修改文件：**

-   `packages/ui/src/layout/MainLayout/Sidebar/MenuList/NavGroup/index.jsx`
-   `packages/ui/src/menu-items/dashboard.js`

**具体改动：**

1. **移除分组标题及占位空间**

    - 移除"Evaluations"和"Others"分组标题
    - 添加条件渲染：只在 title 存在时渲染 Typography 组件

    ```jsx
    subheader={
        group.title ? (
            <Typography>...</Typography>
        ) : null
    }
    ```

2. **调整菜单项间距**
    - 标签间距：从`gap: 1` (8px) 减小到`gap: 0.75` (6px)
    - 标签内边距：保持`py: 1.25` (20px)

#### 2. 图标动画触发机制

**修改文件：**

-   `packages/ui/src/layout/MainLayout/Sidebar/MenuList/NavItem/index.jsx`

**实现方案：**

1. 使用`useRef`存储图标引用
2. 添加`handleMouseEnter`和`handleMouseLeave`处理函数
3. 在 ListItemButton 上添加 hover 事件监听
4. 通过 ref 调用图标的`startAnimation()`和`stopAnimation()`方法

```jsx
const iconRef = useRef(null)

const handleMouseEnter = () => {
    if (iconRef.current?.startAnimation) {
        iconRef.current.startAnimation()
    }
}

const handleMouseLeave = () => {
    if (iconRef.current?.stopAnimation) {
        iconRef.current.stopAnimation()
    }
}

;<ListItemButton onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <Icon ref={iconRef} />
</ListItemButton>
```

#### 3. 创建 15 个自定义动画图标

所有图标位于：`packages/ui/src/ui-component/animated-icons/menu/`

##### 用户提供的动画图标 (10 个)

| 序号 | 菜单项           | 组件名             | 动画效果                                  |
| ---- | ---------------- | ------------------ | ----------------------------------------- |
| 1    | Account Settings | SettingsIcon       | 用户头像路径绘制，圆圈缩放+路径延迟绘制   |
| 2    | Logs             | ListIcon           | 文件图标+齿轮旋转 180 度(spring 物理效果) |
| 3    | Assistants       | RobotIcon          | Twitch 风格路径绘制，3 条路径依次绘制     |
| 4    | API Keys         | KeyIcon            | 钥匙 Y 轴弹跳+轻微旋转 (bounce: 0.5)      |
| 5    | Credentials      | LockIcon           | 锁抖动+缩放+锁扣路径长度变化              |
| 6    | Executions       | CctvIcon           | 监控摄像头旋转(以特定点为原点)+指示点闪烁 |
| 7    | Evaluators       | ArrowDown10Icon    | 数字"1"和"0"上下交换位置(spring 动画)     |
| 8    | Evaluations      | ChartScatterIcon   | 5 个散点依次消失再依次出现(延迟 0.15s)    |
| 9    | Agentflows       | BoxesIcon          | 3 个盒子向不同方向分散 (左下、右下、上)   |
| 10   | Chatflows        | GitPullRequestIcon | Git 分支依次绘制(4 个元素顺序出现)        |

##### 自定义创建的动画图标 (5 个)

| 序号 | 菜单项          | 组件名            | 动画效果                                   |
| ---- | --------------- | ----------------- | ------------------------------------------ |
| 11   | Marketplaces    | BuildingStoreIcon | 商店门 Y 轴缩放 (scaleY: 1→0.7→1)          |
| 12   | Tools           | ToolIcon          | 扳手左右摆动旋转-15 度(repeat: 1, reverse) |
| 13   | Variables       | VariableIcon      | 变量符号透明度脉冲+中间路径绘制            |
| 14   | Document Stores | FilesIcon         | 两个文件层分散展开(对角移动)               |
| 15   | Datasets        | DatabaseIcon      | 数据库顶部椭圆缩放+底层透明度变化          |

#### 4. 图标实现模式

所有动画图标遵循统一的实现模式：

**技术栈：**

-   `framer-motion`: 动画库
-   `forwardRef`: React 引用转发
-   `useImperativeHandle`: 暴露控制方法
-   `useAnimation`: framer-motion 动画控制
-   `PropTypes`: 类型验证

**标准接口：**

```jsx
// Props
{
    stroke: 1.5,        // 线条粗细
    size: '1.3rem',     // 图标尺寸
    className: string,  // 自定义类名
    onMouseEnter: func, // 鼠标进入回调
    onMouseLeave: func  // 鼠标离开回调
}

// 暴露方法
{
    startAnimation: () => void,  // 开始动画
    stopAnimation: () => void    // 停止动画
}
```

**动画状态：**

-   `normal`: 默认状态
-   `animate`: 动画状态

**支持两种模式：**

1. **非受控模式**: 图标自身处理 hover 事件
2. **受控模式**: 父组件通过 ref 控制动画

#### 5. 配置文件更新

**修改文件：**

-   `packages/ui/src/menu-items/dashboard.js`

**具体改动：**

1. **移除 Tabler Icons 导入**：

    - IconKey, IconLock, IconVariable, IconFiles, IconDatabase, IconTool, IconBuildingStore, IconUsersGroup, IconTestPipe, IconChartHistogram

2. **添加自定义图标导入**：

    ```javascript
    import SettingsIcon from '@/ui-component/animated-icons/menu/SettingsIcon'
    import ListIcon from '@/ui-component/animated-icons/menu/ListIcon'
    import RobotIcon from '@/ui-component/animated-icons/menu/RobotIcon'
    import KeyIcon from '@/ui-component/animated-icons/menu/KeyIcon'
    import LockIcon from '@/ui-component/animated-icons/menu/LockIcon'
    import CctvIcon from '@/ui-component/animated-icons/menu/CctvIcon'
    import ArrowDown10Icon from '@/ui-component/animated-icons/menu/ArrowDown10Icon'
    import ChartScatterIcon from '@/ui-component/animated-icons/menu/ChartScatterIcon'
    import BoxesIcon from '@/ui-component/animated-icons/menu/BoxesIcon'
    import GitPullRequestIcon from '@/ui-component/animated-icons/menu/GitPullRequestIcon'
    import BuildingStoreIcon from '@/ui-component/animated-icons/menu/BuildingStoreIcon'
    import ToolIcon from '@/ui-component/animated-icons/menu/ToolIcon'
    import VariableIcon from '@/ui-component/animated-icons/menu/VariableIcon'
    import FilesIcon from '@/ui-component/animated-icons/menu/FilesIcon'
    import DatabaseIcon from '@/ui-component/animated-icons/menu/DatabaseIcon'
    ```

3. **更新 icons 对象**：
   将所有菜单项的 icon 引用从 Tabler Icons 更新为自定义动画图标

#### 6. 动画细节设计

**动画时长控制：**

-   快速动画：0.3-0.4 秒 (工具类图标)
-   中速动画：0.6 秒 (大部分图标)
-   慢速动画：0.8-1 秒 (复杂动画，如变量符号)
-   顺序动画：使用 delay 控制时序

**动画曲线：**

-   `easeInOut`: 大部分动画
-   `linear`: 路径绘制
-   `spring`: 物理弹跳效果

**性能优化：**

-   使用`variants`预定义动画状态
-   避免在动画过程中重新计算
-   使用`transform`属性而非 position 属性

### 文件清单

#### 新增文件 (15 个)

```
packages/ui/src/ui-component/animated-icons/menu/
├── SettingsIcon.jsx          # Account Settings
├── ListIcon.jsx              # Logs
├── RobotIcon.jsx             # Assistants
├── KeyIcon.jsx               # API Keys
├── LockIcon.jsx              # Credentials
├── CctvIcon.jsx              # Executions
├── ArrowDown10Icon.jsx       # Evaluators
├── ChartScatterIcon.jsx      # Evaluations
├── BoxesIcon.jsx             # Agentflows
├── GitPullRequestIcon.jsx    # Chatflows
├── BuildingStoreIcon.jsx     # Marketplaces
├── ToolIcon.jsx              # Tools
├── VariableIcon.jsx          # Variables
├── FilesIcon.jsx             # Document Stores
└── DatabaseIcon.jsx          # Datasets
```

#### 修改文件 (3 个)

-   `packages/ui/src/menu-items/dashboard.js` - 菜单配置
-   `packages/ui/src/layout/MainLayout/Sidebar/MenuList/NavGroup/index.jsx` - 分组组件
-   `packages/ui/src/layout/MainLayout/Sidebar/MenuList/NavItem/index.jsx` - 菜单项组件

### Git 提交信息

**Commit:** `6b77cf26`

```
feat(ui): 完成首页左侧菜单栏自定义动画图标替换
```

**提交内容：**

-   27 个文件修改
-   4806 行新增
-   53 行删除

### 技术栈

-   **React**: 组件开发
-   **framer-motion (v4.1.13)**: 动画效果
-   **PropTypes**: 类型验证
-   **React Hooks**: useRef, useAnimation, useImperativeHandle, useCallback

### 用户体验提升

1. **视觉反馈增强**

    - 鼠标悬浮时触发流畅的图标动画
    - 每个图标都有独特的动画效果
    - 提升界面活力和品牌辨识度

2. **操作效率优化**

    - 动画时长控制在 0.3-1 秒之间
    - 不影响用户快速浏览和点击
    - 保持原有的视觉风格和尺寸

3. **空间利用优化**
    - 移除不必要的分组标题
    - 缩小菜单项间距，增加可视区域
    - 保持舒适的内边距

### 设计原则

1. **一致性**: 所有图标遵循相同的实现模式和接口规范
2. **流畅性**: 使用 easeInOut 曲线，动画自然流畅
3. **适度性**: 动画时长适中，不喧宾夺主
4. **可维护性**: 代码结构清晰，便于后续扩展和维护
5. **可复用性**: 组件独立封装，可在其他项目中复用

### 测试要点

-   [x] 所有 15 个菜单图标正确显示
-   [x] 鼠标悬浮按钮时动画正常触发
-   [x] 动画结束后恢复正常状态
-   [x] 图标尺寸和颜色与原设计一致
-   [x] 菜单间距调整正确 (6px)
-   [x] 分组标题正确移除
-   [x] 深色/浅色模式下图标颜色正常
-   [x] 构建无错误，无警告
-   [x] 菜单点击功能正常
-   [x] 性能表现良好，无卡顿

### 已知问题

无

---

## 下次修改时间：待定

_本文档持续更新中..._
