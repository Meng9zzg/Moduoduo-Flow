# 如何使用动画图标 / How to Use Animated Icons

## 快速开始 / Quick Start

### 方法 1: 使用现有的 Lucide 图标

在 `packages/ui/src/store/constant.js` 中修改 AGENTFLOW_ICONS 数组:

```javascript
export const AGENTFLOW_ICONS = [
    // 示例 1: 保持静态图标 (当前默认)
    {
        name: 'conditionAgentflow',
        icon: IconArrowsSplit, // Tabler 图标
        color: '#FFB938'
        // 不添加 animated 属性,图标保持静态
    },

    // 示例 2: 启用动画效果
    {
        name: 'llmAgentflow',
        icon: LucideSparkles, // 改为 Lucide 图标
        color: '#64B5F6',
        animated: true // 添加此属性启用动画
    },

    // 示例 3: 另一个动画示例
    {
        name: 'agentAgentflow',
        icon: Bot, // Lucide Bot 图标
        color: '#4DD0E1',
        animated: true
    }
]
```

### 方法 2: 添加新的 Lucide 图标

如果你想使用的图标还没有导入:

1. 在 `constant.js` 顶部添加导入:

```javascript
import {
    Bot,
    Sparkles as LucideSparkles,
    Play,
    // 添加新图标,例如:
    Zap, // 闪电
    Rocket, // 火箭
    Brain // 大脑
} from 'lucide-react'
```

2. 更新 LucideIcons 导出:

```javascript
export const LucideIcons = {
    Bot,
    LucideSparkles,
    Play,
    // 添加新图标
    Zap,
    Rocket,
    Brain
}
```

3. 在 AGENTFLOW_ICONS 中使用:

```javascript
{
    name: 'customFunctionAgentflow',
    icon: Zap,              // 使用新导入的图标
    color: '#E4B7FF',
    animated: true
}
```

## 可用的 Lucide 图标映射

| 节点类型        | 推荐 Lucide 图标 | 动画效果  |
| --------------- | ---------------- | --------- |
| Start           | Play             | 脉冲/缩放 |
| LLM             | LucideSparkles   | 闪烁/旋转 |
| Agent           | Bot              | 上下浮动  |
| Condition       | GitBranch        | 分支展开  |
| Loop            | LucideRepeat     | 循环旋转  |
| Tool            | Wrench           | 晃动      |
| Retriever       | BookMarked       | 翻页效果  |
| Human Input     | UserRoundSearch  | 缩放      |
| Direct Reply    | MessageSquare    | 脉冲      |
| Custom Function | FunctionSquare   | 闪烁      |
| Sticky Note     | LucideStickyNote | 悬停放大  |
| HTTP            | Globe            | 旋转      |
| Iteration       | Workflow         | 流动效果  |
| Execute Flow    | Workflow         | 流动效果  |

## 自定义动画效果

如果想要自定义动画效果,修改 `AgentFlowNode.jsx` 中的 motion.div 属性:

```javascript
// 当前默认动画: 悬停时缩放+旋转
<motion.div
    whileHover={{ scale: 1.2, rotate: 10 }}
    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
>

// 示例 1: 持续脉冲效果
<motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
>

// 示例 2: 持续旋转
<motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
>

// 示例 3: 悬停缩放
<motion.div
    whileHover={{ scale: 1.3 }}
    transition={{ type: 'spring', stiffness: 400 }}
>
```

## 浏览完整图标库

-   Lucide Icons 官网: https://lucide.dev/icons/
-   搜索你想要的图标,复制图标名称,然后导入使用

## 注意事项

1. **渐进式迁移**: 你可以一次修改一个图标,不影响其他图标
2. **性能优化**: 动画仅在悬停时触发,避免性能问题
3. **保持一致**: 建议同一类型的节点使用相似的动画风格
4. **测试效果**: 修改后刷新浏览器查看效果

## 示例: 完整的图标配置

```javascript
export const AGENTFLOW_ICONS = [
    // 静态图标 - 保持原样
    {
        name: 'conditionAgentflow',
        icon: IconArrowsSplit,
        color: '#FFB938'
    },

    // 动画图标 - 添加 animated: true
    {
        name: 'llmAgentflow',
        icon: LucideSparkles,
        color: '#64B5F6',
        animated: true
    },

    {
        name: 'agentAgentflow',
        icon: Bot,
        color: '#4DD0E1',
        animated: true
    }
]
```

现在你可以按照自己的喜好逐步修改每个图标了! 🎉
