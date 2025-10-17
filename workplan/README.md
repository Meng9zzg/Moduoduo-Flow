# 📁 工作计划文档目录 (Workplan Directory)

> **说明**: 本目录包含所有项目的工作计划、实施指南和进度报告

---

## 📋 文档索引 (按日期排序)

### 🗓️ 2025-10-17

#### 1. [20251017_Canvas_Translation_Audit.md](20251017_Canvas_Translation_Audit.md)

**Canvas 页面翻译审查计划** 🔴 **最高优先级**

-   **状态**: 基础翻译完成 95%+，需要审查和补充
-   **工作量**: 19-29 小时
-   **目标**: 完成 Canvas 页面所有子菜单、弹窗、3-4 级页面的翻译审查
-   **关键任务**:
    -   修复 VectorStorePopUp 硬编码文本
    -   审查 9 个 Canvas 核心文件
    -   审查 28 个 Dialog 组件
    -   补充缺失翻译
    -   测试验证

**关键模块**:

-   Canvas 主画布 (180+ 翻译键)
-   Dialog 对话框 (900+ 翻译键，47 个对话框)
-   Chat 弹窗
-   节点输入处理
-   配置面板

---

#### 2. [20251017_Backend_Node_Translation_Plan.md](20251017_Backend_Node_Translation_Plan.md)

**后端节点翻译总体计划**

-   **状态**: 11/200+ 节点完成 (5%)
-   **工作量**: 60-120 小时
-   **目标**: 完成所有后端节点的国际化翻译
-   **分阶段计划**:
    -   **Phase 1**: Chat Models (剩余 18 个) - 高优先级 🔴
    -   **Phase 2**: Tools (42 个) - 高优先级 🔴
    -   **Phase 3**: Document Loaders (39 个) - 中优先级 🟡
    -   **Phase 4**: Vector Stores (24 个) - 中优先级 🟡
    -   **Phase 5**: Embeddings (15 个) - 中优先级 🟡
    -   **Phase 6**: Agents (剩余 11 个) - 中优先级 🟡
    -   **Phase 7-10**: 其他类别 - 低优先级 🟢

**已完成**:

-   ✅ 10 个 Chat Models 节点
-   ✅ 1 个 Agents 节点 (AirtableAgent)

---

### 🗓️ 2025-10-16

#### 3. [20251016_I18N_Implementation_Guide.md](20251016_I18N_Implementation_Guide.md)

**国际化实施指南**

-   **类型**: 技术实施文档
-   **用途**: 前端国际化开发指南
-   **内容**:
    -   剩余组件修改清单
    -   Users、Roles、Organization、Workspace 页面实施细节
    -   代码示例和最佳实践

**状态**: ✅ 前端页面 100%完成

---

#### 4. [20251016_Marketplace_Translation_Report.md](20251016_Marketplace_Translation_Report.md)

**市场模板翻译报告**

-   **类型**: 完成报告
-   **处理文件**: 50 个市场模板 JSON 文件
-   **成功率**: 100%
-   **内容分类**:
    -   Chatflows: 24 个 ✅
    -   Agentflows v2: 13 个 ✅
    -   Tools: 13 个 ✅

**状态**: ✅ 已完成

---

#### 5. [20251016_Backend_I18N_Architecture.md](20251016_Backend_I18N_Architecture.md)

**后端 i18n 架构文档**

-   **类型**: 技术架构文档
-   **内容**:
    -   TranslationService 实现
    -   翻译文件格式和目录结构
    -   API 集成方案
    -   使用示例和测试方法

**状态**: ✅ 架构已完成并投入使用

---

## 📊 项目整体进度

### 前端国际化 (Frontend i18n)

-   **状态**: ✅ 100% 完成
-   **翻译文件**: 34 个命名空间
-   **翻译条目**: 1100+ 条
-   **页面覆盖**: 27 个页面全部完成

### 后端节点国际化 (Backend Nodes i18n)

-   **状态**: 🟡 5% 完成
-   **已翻译**: 11 个节点
-   **待翻译**: 189+ 个节点
-   **预计完成**: 6-8 周 (根据投入时间)

### Canvas 页面优化

-   **翻译状态**: 🟡 95% 完成
-   **待审查**: 37 个文件
-   **待修复**: 1 个已知问题 (VectorStorePopUp)
-   **预计完成**: 3-5 个工作日

---

## 🎯 当前优先级

### 🔴 最高优先级

1. **Canvas 翻译审查** (19-29 小时)
    - 文档: [20251017_Canvas_Translation_Audit.md](20251017_Canvas_Translation_Audit.md)
    - 原因: 用户使用最频繁的核心页面
    - 下一步: 修复 VectorStorePopUp，然后系统审查

### 🔴 高优先级

2. **Chat Models 翻译** (剩余 18 个，4-6 小时)

    - 文档: [20251017_Backend_Node_Translation_Plan.md](20251017_Backend_Node_Translation_Plan.md) Phase 1
    - 原因: 核心功能，使用频率高

3. **Tools 翻译** (42 个，8-12 小时)
    - 文档: [20251017_Backend_Node_Translation_Plan.md](20251017_Backend_Node_Translation_Plan.md) Phase 2
    - 原因: 工具节点是主要功能

### 🟡 中优先级

4. **Document Loaders** (39 个)
5. **Vector Stores** (24 个)
6. **Embeddings** (15 个)
7. **Agents** (剩余 11 个)

### 🟢 低优先级

8. **其他节点类别** (Chains, Memory, etc.)

---

## 📁 文件命名规范

### 格式

```
YYYYMMDD_[Category]_[Task_Name].md
```

### 示例

-   `20251017_Canvas_Translation_Audit.md`
-   `20251017_Backend_Node_Translation_Plan.md`
-   `20251016_I18N_Implementation_Guide.md`

### 分类标签

-   **Translation**: 翻译相关
-   **Architecture**: 架构设计
-   **Implementation**: 实施指南
-   **Report**: 完成报告
-   **Audit**: 审查计划
-   **Plan**: 工作计划

---

## 🔗 相关文档

### 项目根目录

-   [README.md](../README.md) - 项目主文档
-   [README-UI.md](../README-UI.md) - UI 前端技术文档

### 部署文档

-   [DEPLOYMENT.md](../DEPLOYMENT.md) - 部署指南
-   [LOCAL_DEVELOPMENT.md](../LOCAL_DEVELOPMENT.md) - 本地开发环境配置

### 其他文档

-   [CONTRIBUTING.md](../CONTRIBUTING.md) - 贡献指南
-   [SECURITY.md](../SECURITY.md) - 安全政策
-   [LICENSE.md](../LICENSE.md) - 许可证

---

## 📞 使用说明

### 如何添加新文档

1. 使用标准命名格式：`YYYYMMDD_Category_Task.md`
2. 将文件放入 `workplan/` 目录
3. 更新本 README.md 的索引

### 如何查找文档

-   按日期查找：文件名以日期开头
-   按分类查找：文件名包含分类标签
-   按优先级查找：查看"当前优先级"部分

### 如何更新进度

1. 修改相应的工作计划文档
2. 更新本 README.md 的"项目整体进度"部分
3. 提交 git commit

---

**最后更新**: 2025-10-17
**文档版本**: 1.0.0
**维护者**: 项目团队
