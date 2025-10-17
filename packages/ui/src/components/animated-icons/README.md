# 动画图标集成指南

本项目支持两种图标方案:

## 方案 1: Tabler Icons (当前使用)

-   位置: `@tabler/icons-react`
-   特点: 静态图标,轻量级
-   配置: `src/store/constant.js` 中的 `AGENTFLOW_ICONS`

## 方案 2: Lucide React + Framer Motion 动画

-   位置: `lucide-react` (已安装)
-   特点: 带动画效果,现代化
-   需要: 结合 `framer-motion` 实现动画

## 如何切换到动画图标

### 步骤 1: 在 `constant.js` 中添加 Lucide 图标

```javascript
// 导入 Lucide 图标
import {
    Bot,
    Sparkles,
    Play,
    GitBranch
    // ... 更多图标
} from 'lucide-react'

// 创建动画图标配置
export const AGENTFLOW_LUCIDE_ICONS = [
    {
        name: 'llmAgentflow',
        icon: Sparkles, // Lucide 图标
        color: '#64B5F6',
        animated: true // 标记为动画图标
    }
    // ... 更多配置
]
```

### 步骤 2: 修改 AgentFlowNode.jsx 渲染逻辑

```javascript
// 在 AgentFlowNode.jsx 中
import { motion } from 'framer-motion'

const renderIcon = (node) => {
    const foundIcon = AGENTFLOW_ICONS.find((icon) => icon.name === node.name)

    if (!foundIcon) return null

    // 如果是动画图标
    if (foundIcon.animated) {
        return (
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                <foundIcon.icon size={24} color={'white'} />
            </motion.div>
        )
    }

    // 静态图标
    return <foundIcon.icon size={24} color={'white'} />
}
```

## 可用的 Lucide 动画图标

### 推荐图标映射

| 节点类型  | Tabler (旧)          | Lucide (新) | 动画效果建议 |
| --------- | -------------------- | ----------- | ------------ |
| Start     | IconPlayerPlayFilled | Play        | 脉冲/缩放    |
| LLM       | IconSparkles         | Sparkles    | 闪烁/旋转    |
| Agent     | IconRobot            | Bot         | 上下浮动     |
| Condition | IconArrowsSplit      | GitBranch   | 分支展开     |
| Loop      | IconRepeat           | Repeat      | 循环旋转     |
| Tool      | IconTools            | Wrench      | 晃动         |
| Retriever | IconLibrary          | BookMarked  | 翻页效果     |

## 动画效果示例

### 1. 悬停缩放

```javascript
whileHover={{ scale: 1.2 }}
```

### 2. 旋转动画

```javascript
animate={{ rotate: 360 }}
transition={{ repeat: Infinity, duration: 2 }}
```

### 3. 脉冲效果

```javascript
animate={{ scale: [1, 1.1, 1] }}
transition={{ repeat: Infinity, duration: 1.5 }}
```

### 4. 闪烁效果

```javascript
animate={{ opacity: [1, 0.5, 1] }}
transition={{ repeat: Infinity, duration: 2 }}
```

## 完整实现示例

参考以下文件查看完整实现:

-   `/examples/animated-icon-constant.js` - 图标配置示例
-   `/examples/animated-icon-node.jsx` - 节点组件示例

## 性能优化

1. 仅在悬停时触发动画 (使用 `whileHover`)
2. 使用 `useReducedMotion` 检测用户偏好
3. 避免过多同时运行的动画

## 浏览更多图标

-   Lucide Icons: https://lucide.dev/icons/
-   Tabler Icons: https://tabler.io/icons
