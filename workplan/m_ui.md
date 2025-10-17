# 自定义全局 UI 组件记录

本文档记录项目中所有自定义的全局 UI 组件，包括组件功能、使用方式、样式配置等信息。

---

## 目录

-   [动画图标组件](#动画图标组件)
-   [Canvas 控制栏组件](#canvas控制栏组件)
-   [主题切换组件](#主题切换组件)
-   [语言切换组件](#语言切换组件)
-   [其他自定义组件](#其他自定义组件)

---

## 动画图标组件

### 位置

`packages/ui/src/ui-component/animated-icons/`

### Canvas 控制栏动画图标

#### 1. PlusIcon - 放大图标

-   **文件**: `PlusIcon.jsx`
-   **功能**: 放大按钮图标
-   **动画效果**: 图标放大并弹跳两次 (scale: 1→1.2→1→1.15→1)
-   **尺寸**: 22px
-   **使用位置**: Canvas 控制栏

#### 2. MinusIcon - 缩小图标

-   **文件**: `MinusIcon.jsx`
-   **功能**: 缩小按钮图标
-   **动画效果**: 图标缩小并弹跳两次 (scale: 1→0.8→1→0.85→1)
-   **尺寸**: 22px
-   **使用位置**: Canvas 控制栏

#### 3. FocusIcon - 居中对齐图标

-   **文件**: `FocusIcon.jsx`
-   **功能**: 居中对齐按钮图标
-   **动画效果**: 十字准星，圆圈和线条收缩 (scale: 1→0.85→1)
-   **尺寸**: 20px
-   **使用位置**: Canvas 控制栏

#### 4. MaximizeIcon - 全屏图标

-   **文件**: `MaximizeIcon.jsx`
-   **功能**: 全屏模式按钮图标
-   **动画效果**: 四个角向外扩散 (translateX/Y: ±2px)
-   **尺寸**: 20px
-   **使用位置**: Canvas 控制栏

#### 5. BlocksIcon - 对齐网格图标(未选中)

-   **文件**: `BlocksIcon.jsx`
-   **功能**: 对齐网格按钮图标(未选中状态)
-   **动画效果**: L 形+小方块，方块对角移动 (translate: -4, 4)
-   **尺寸**: 22px
-   **使用位置**: Canvas 控制栏

#### 6. GridIcon - 对齐网格图标(选中)

-   **文件**: `GridIcon.jsx`
-   **功能**: 对齐网格按钮图标(选中状态)
-   **动画效果**: 田字形静态图标，2×2 网格布局
-   **尺寸**: 22px
-   **使用位置**: Canvas 控制栏

#### 7. GripIcon - 切换背景图标

-   **文件**: `GripIcon.jsx`
-   **功能**: 切换背景按钮图标
-   **动画效果**: 9 个圆点按顺序淡入淡出 (opacity: 1→0.3→1)
-   **尺寸**: 22px
-   **使用位置**: Canvas 控制栏

### 菜单栏动画图标

#### 位置

`packages/ui/src/ui-component/animated-icons/menu/`

#### 1. SettingsIcon - 设置图标

-   **文件**: `SettingsIcon.jsx`
-   **功能**: 用户设置菜单图标
-   **动画效果**: 用户头像路径绘制，圆圈缩放+路径延迟绘制
-   **使用位置**: 左侧菜单栏 - Account Settings

#### 2. ListIcon - 日志图标

-   **文件**: `ListIcon.jsx`
-   **功能**: 日志菜单图标
-   **动画效果**: 文件图标+齿轮旋转 180 度(spring 物理效果)
-   **使用位置**: 左侧菜单栏 - Logs

#### 3. RobotIcon - 助手图标

-   **文件**: `RobotIcon.jsx`
-   **功能**: 助手菜单图标
-   **动画效果**: Twitch 风格路径绘制，3 条路径依次绘制
-   **使用位置**: 左侧菜单栏 - Assistants

#### 4. KeyIcon - 密钥图标

-   **文件**: `KeyIcon.jsx`
-   **功能**: API 密钥菜单图标
-   **动画效果**: 钥匙 Y 轴弹跳+轻微旋转 (bounce: 0.5)
-   **使用位置**: 左侧菜单栏 - API Keys

#### 5. LockIcon - 锁图标

-   **文件**: `LockIcon.jsx`
-   **功能**: 凭证菜单图标
-   **动画效果**: 锁抖动+缩放+锁扣路径长度变化
-   **使用位置**: 左侧菜单栏 - Credentials

#### 6. CctvIcon - 监控图标

-   **文件**: `CctvIcon.jsx`
-   **功能**: 执行记录菜单图标
-   **动画效果**: 监控摄像头旋转(以特定点为原点)+指示点闪烁
-   **使用位置**: 左侧菜单栏 - Executions

#### 7. ArrowDown10Icon - 评估图标

-   **文件**: `ArrowDown10Icon.jsx`
-   **功能**: 评估器菜单图标
-   **动画效果**: 数字"1"和"0"上下交换位置(spring 动画)
-   **使用位置**: 左侧菜单栏 - Evaluators

#### 8. ChartScatterIcon - 散点图图标

-   **文件**: `ChartScatterIcon.jsx`
-   **功能**: 评估菜单图标
-   **动画效果**: 5 个散点依次消失再依次出现(延迟 0.15s)
-   **使用位置**: 左侧菜单栏 - Evaluations

#### 9. BoxesIcon - 盒子图标

-   **文件**: `BoxesIcon.jsx`
-   **功能**: 智能体流程菜单图标
-   **动画效果**: 3 个盒子向不同方向分散 (左下、右下、上)
-   **使用位置**: 左侧菜单栏 - Agentflows

#### 10. GitPullRequestIcon - Git 图标

-   **文件**: `GitPullRequestIcon.jsx`
-   **功能**: 聊天流程菜单图标
-   **动画效果**: Git 分支依次绘制(4 个元素顺序出现)
-   **使用位置**: 左侧菜单栏 - Chatflows

#### 11. BuildingStoreIcon - 商店图标

-   **文件**: `BuildingStoreIcon.jsx`
-   **功能**: 市场菜单图标
-   **动画效果**: 商店门 Y 轴缩放 (scaleY: 1→0.7→1)
-   **使用位置**: 左侧菜单栏 - Marketplaces

#### 12. ToolIcon - 工具图标

-   **文件**: `ToolIcon.jsx`
-   **功能**: 工具菜单图标
-   **动画效果**: 扳手左右摆动旋转-15 度(repeat: 1, reverse)
-   **使用位置**: 左侧菜单栏 - Tools

#### 13. VariableIcon - 变量图标

-   **文件**: `VariableIcon.jsx`
-   **功能**: 变量菜单图标
-   **动画效果**: 变量符号透明度脉冲+中间路径绘制
-   **使用位置**: 左侧菜单栏 - Variables

#### 14. FilesIcon - 文件图标

-   **文件**: `FilesIcon.jsx`
-   **功能**: 文档存储菜单图标
-   **动画效果**: 两个文件层分散展开(对角移动)
-   **使用位置**: 左侧菜单栏 - Document Stores

#### 15. DatabaseIcon - 数据库图标

-   **文件**: `DatabaseIcon.jsx`
-   **功能**: 数据集菜单图标
-   **动画效果**: 数据库顶部椭圆缩放+底层透明度变化
-   **使用位置**: 左侧菜单栏 - Datasets

### 动画图标技术实现

#### 技术栈

-   **React**: 组件开发
-   **framer-motion**: 动画效果库
-   **PropTypes**: 类型验证

#### 标准接口

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

#### 动画状态

-   `normal`: 默认状态
-   `animate`: 动画状态

#### 支持模式

1. **非受控模式**: 图标自身处理 hover 事件
2. **受控模式**: 父组件通过 ref 控制动画

---

## Canvas 控制栏组件

### 位置

-   `packages/ui/src/views/canvas/CustomControls.jsx`
-   `packages/ui/src/views/agentflowsv2/CustomControls.jsx`

### 功能

提供 6 个控制按钮的 Canvas 控制栏：

1. 放大按钮 (PlusIcon)
2. 缩小按钮 (MinusIcon)
3. 居中对齐按钮 (FocusIcon)
4. 全屏模式按钮 (MaximizeIcon)
5. 对齐网格切换按钮 (BlocksIcon/GridIcon)
6. 背景切换按钮 (GripIcon)

### 样式配置

#### 深色模式配色

| 状态 | 按钮背景  | 图标颜色  | 说明                                 |
| ---- | --------- | --------- | ------------------------------------ |
| 默认 | `#23262c` | `#7B7E8C` | darkPrimaryLight，与深色主题卡片一致 |
| 悬浮 | `#32353b` | `#B7BBCB` | darkPrimary800，提供清晰的交互反馈   |
| 选中 | `#23262c` | `#96A9FF` | 蓝紫色强调，突出激活状态             |
| 点击 | `#32353b` | `#96A9FF` | 向下位移 0.225em，配合蓝紫色         |

#### 阴影系统

-   使用深色渐变阴影 (`#2d2f39` → `#0b0c0f`)
-   配合半透明阴影 `rgba(17, 18, 23, 0.6)` 增强立体感
-   点击时阴影收缩，透明度降低至 `0.4`

### 使用方式

```jsx
<CustomControls
    isDarkMode={customization.isDarkMode}
    isSnappingEnabled={isSnappingEnabled}
    setIsSnappingEnabled={setIsSnappingEnabled}
    isBackgroundEnabled={isBackgroundEnabled}
    setIsBackgroundEnabled={setIsBackgroundEnabled}
/>
```

---

## 主题切换组件

### 位置

`packages/ui/src/ui-component/switch/ThemeSwitch.jsx`

### 功能

提供深浅模式切换功能，支持：

-   九章青 (浅色模式)
-   光芒黄 (深色模式)

### 使用方式

```jsx
<ThemeSwitch onThemeChange={handleThemeChange} isDarkMode={isDark} />
```

### 样式特点

-   毛玻璃效果背景
-   平滑过渡动画
-   中英文双语支持

---

## 语言切换组件

### 位置

`packages/ui/src/ui-component/switch/LanguageSwitch.jsx`

### 功能

提供多语言切换功能，支持：

-   中文 (zh)
-   英文 (en)

### 使用方式

```jsx
<LanguageSwitch />
```

---

## 毛玻璃 Tooltip 组件

### 位置

`packages/ui/src/themes/compStyleOverride.js` - MuiTooltip 样式覆盖

### 功能

全局自定义的毛玻璃效果 Tooltip 组件，提供：

-   毛玻璃背景效果 (backdrop-filter: blur)
-   深色/浅色模式适配
-   统一的视觉风格
-   圆角设计和内边距

### 样式配置

#### 深色模式样式

```css
.tooltip {
    backgroundColor: 'rgba(150, 169, 255, 0.25)',
    color: '#fafafa',
    fontSize: '0.875rem',
    borderRadius: '12px',
    padding: '8px 14px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
}

.arrow {
    color: 'rgba(150, 169, 255, 0.25)'
}
```

#### 浅色模式样式

```css
.tooltip {
    backgroundColor: 'rgba(177, 191, 255, 0.25)',
    color: theme.colors?.grey700,
    fontSize: '0.875rem',
    borderRadius: '12px',
    padding: '8px 14px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
}

.arrow {
    color: 'rgba(177, 191, 255, 0.25)'
}
```

### 完整组件代码

#### 深色模式版本

```jsx
MuiTooltip: {
    styleOverrides: {
        tooltip: {
            backgroundColor: 'rgba(150, 169, 255, 0.25)',
            color: '#fafafa',
            fontSize: '0.875rem',
            borderRadius: '12px',
            padding: '8px 14px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
        },
        arrow: {
            color: 'rgba(150, 169, 255, 0.25)'
        }
    }
}
```

#### 浅色模式版本

```jsx
MuiTooltip: {
    styleOverrides: {
        tooltip: {
            backgroundColor: 'rgba(177, 191, 255, 0.25)',
            color: theme.colors?.grey700,
            fontSize: '0.875rem',
            borderRadius: '12px',
            padding: '8px 14px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
        },
        arrow: {
            color: 'rgba(177, 191, 255, 0.25)'
        }
    }
}
```

#### 动态主题版本 (当前实现)

```jsx
MuiTooltip: {
    styleOverrides: {
        tooltip: {
            backgroundColor: theme?.customization?.isDarkMode
                ? 'rgba(150, 169, 255, 0.25)'
                : 'rgba(177, 191, 255, 0.25)',
            color: theme?.customization?.isDarkMode
                ? '#fafafa'
                : theme.colors?.grey700,
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

### 技术特点

#### 毛玻璃效果

-   **backdropFilter**: `blur(10px)` - 背景模糊效果
-   **WebkitBackdropFilter**: `blur(10px)` - WebKit 浏览器兼容
-   **半透明背景**: 使用 rgba 颜色值实现透明效果

#### 颜色系统

-   **深色模式**: 蓝紫色系 `rgba(150, 169, 255, 0.25)`
-   **浅色模式**: 浅蓝色系 `rgba(177, 191, 255, 0.25)`
-   **文字颜色**: 深色模式白色，浅色模式深灰色

#### 设计细节

-   **圆角**: 12px 圆角设计
-   **内边距**: 8px 14px (上下 左右)
-   **字体大小**: 0.875rem (14px)
-   **箭头颜色**: 与背景色保持一致

### 使用方式

```jsx
import { Tooltip } from '@mui/material'

// 基本使用
<Tooltip title="Detect text that could generate harmful output and prevent it from being sent to the language model">
    <Button>Hover me</Button>
</Tooltip>

// 带箭头
<Tooltip title="Tooltip with arrow" arrow>
    <Button>Hover me</Button>
</Tooltip>
```

### 全局应用

此组件通过 MUI 主题系统全局应用，所有使用 MUI Tooltip 的地方都会自动应用此样式。

---

## 其他自定义组件

### StyledButton

-   **位置**: `packages/ui/src/ui-component/button/StyledButton.jsx`
-   **功能**: 自定义按钮组件，支持主题适配
-   **特点**: 统一的按钮样式，支持深色/浅色模式

### MainCard

-   **位置**: `packages/ui/src/ui-component/cards/MainCard.jsx`
-   **功能**: 主卡片容器组件
-   **特点**: 统一的卡片样式，支持响应式设计

### ViewHeader

-   **位置**: `packages/ui/src/layout/MainLayout/ViewHeader.jsx`
-   **功能**: 页面标题头部组件
-   **特点**: 统一的页面标题样式

---

## 组件设计原则

### 1. 一致性

-   所有组件遵循相同的设计语言
-   统一的颜色系统和间距规范
-   一致的交互反馈模式

### 2. 可复用性

-   组件独立封装，接口清晰
-   支持 props 配置，适应不同场景
-   便于在其他项目中复用

### 3. 可维护性

-   代码结构清晰，注释完整
-   使用 TypeScript/PropTypes 进行类型验证
-   遵循 React 最佳实践

### 4. 性能优化

-   使用 React.memo 避免不必要的重渲染
-   动画使用 framer-motion 的 variants 预定义状态
-   避免在动画过程中重新计算

### 5. 用户体验

-   流畅的动画效果，时长控制在 0.3-1 秒
-   清晰的视觉反馈
-   支持键盘导航和屏幕阅读器

---

## 更新记录

### 2025-10-17

-   创建 7 个 Canvas 控制栏动画图标组件
-   创建 15 个菜单栏动画图标组件
-   实现 CustomControls 组件
-   完成深色模式配色设计

### 2025-10-18

-   优化 Canvas 界面顶部栏一致性
-   完善 Marketplace 界面组件
-   清理冗余 CSS 样式
-   修复账单按钮变形问题

---

## 待办事项

-   [ ] 添加更多动画图标组件
-   [ ] 优化移动端响应式设计
-   [ ] 添加组件使用文档
-   [ ] 创建组件展示页面
-   [ ] 添加单元测试

---

_本文档持续更新中..._
