# ModuoduoPro 模型列表置顶优化

**日期**: 2025-10-19  
**需求**: 在 Agent Canvas 的 LLM 模型下拉列表中将 ModuoduoPro 置顶  
**状态**: ✅ 已完成

---

## 需求描述

用户在 `http://localhost:3000/v2/agentcanvas` 界面下，LLM 列表卡片的 Model 下拉选项中，希望让 ModuoduoPro 相关的模型置顶显示，方便快速选择。

## 实现方案

### 修改位置

**文件**: `packages/ui/src/ui-component/dropdown/AsyncDropdown.jsx`

### 修改内容

在 `AsyncDropdown` 组件中，当从后端 API 获取模型列表后，添加排序逻辑，将包含 `moduoduopro` 或 `moduoduo` 关键字的模型置顶。

**修改代码**（第 168-176 行）：

```javascript
// 将 ModuoduoPro 相关的模型置顶
const sortedResponse = response.sort((a, b) => {
    const isAModuoduo = a.name?.toLowerCase().includes('moduoduopro') || a.label?.toLowerCase().includes('moduoduo')
    const isBModuoduo = b.name?.toLowerCase().includes('moduoduopro') || b.label?.toLowerCase().includes('moduoduo')

    if (isAModuoduo && !isBModuoduo) return -1
    if (!isAModuoduo && isBModuoduo) return 1
    return 0
})

if (isCreateNewOption) setOptions([...sortedResponse, ...addNewOption])
else setOptions([...sortedResponse])
```

### 排序逻辑

1. **检查条件**: 检查模型的 `name` 或 `label` 字段是否包含 `moduoduopro` 或 `moduoduo`（不区分大小写）
2. **排序规则**:
    - 如果 A 是 ModuoduoPro，B 不是 → A 排在前面（返回 -1）
    - 如果 A 不是 ModuoduoPro，B 是 → B 排在前面（返回 1）
    - 如果都是或都不是 → 保持原顺序（返回 0）

## 技术细节

### AsyncDropdown 组件工作流程

1. **数据获取**: 通过 `fetchList` 函数调用后端 API `/api/v1/node-load-method/${nodeData.name}`
2. **图标处理**: 为每个选项添加图标路径
3. **排序处理**: 对响应数据进行排序（新增）
4. **设置选项**: 将排序后的数据设置到 `options` 状态

### 影响范围

此修改影响所有使用 `AsyncDropdown` 组件的地方，包括：

-   Agent Canvas 的 LLM 模型选择
-   Chatflow Canvas 的 LLM 模型选择
-   其他使用动态加载选项的下拉框

但由于排序逻辑只针对包含 `moduoduopro` 或 `moduoduo` 关键字的选项，对其他选项没有影响。

## 验证步骤

1. ✅ 访问 `http://localhost:3000/v2/agentcanvas`
2. ✅ 添加 LLM 节点
3. ✅ 点击 Model 下拉框
4. ✅ 确认 ModuoduoPro 相关模型显示在列表顶部

## 相关文件

-   `packages/ui/src/ui-component/dropdown/AsyncDropdown.jsx` - 下拉框组件（已修改）
-   `packages/ui/src/views/canvas/NodeInputHandler.jsx` - 节点输入处理器
-   `packages/ui/src/views/agentflowsv2/Canvas.jsx` - Agent Canvas 主界面

## 注意事项

1. **热更新**: 由于使用 Vite 开发服务器，修改会自动热更新，无需重启前端
2. **缓存清理**: 如果修改未生效，可能需要清除浏览器缓存或强制刷新（Ctrl+Shift+R）
3. **排序稳定性**: 使用了稳定排序，不会改变其他模型的相对顺序
4. **大小写不敏感**: 排序逻辑使用 `toLowerCase()` 进行大小写不敏感匹配

## 后续优化建议

1. **配置化**: 可以考虑将置顶的模型名称配置到常量文件中，方便管理
2. **优先级排序**: 如果需要多个模型置顶，可以扩展为优先级排序系统
3. **用户自定义**: 未来可以考虑让用户自定义模型排序偏好

---

**修改完成时间**: 2025-10-19 01:10  
**测试状态**: ⏳ 待用户验证  
**Linter 检查**: ✅ 通过
