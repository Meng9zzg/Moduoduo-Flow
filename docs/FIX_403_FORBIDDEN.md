# 修复开源模式下的 403 Forbidden 问题

## 问题描述

在本地开发环境中，访问以下端点时遇到 403 Forbidden 错误：

-   `/api/v1/datasets`
-   `/api/v1/evaluations`
-   `/api/v1/evaluators`
-   `/api/v1/logs`

这些端点在开源模式下应该可以直接访问，无需认证和权限检查。

## 根本原因分析

通过调试发现了两个主要问题：

### 1. 后端认证中间件未正确绕过开源模式

在开源模式（`Platform.OPEN_SOURCE`）下，系统仍然执行了以下检查：

-   **功能特性检查**：`IdentityManager.checkFeatureByPlan()` 检查用户订阅计划
-   **身份验证检查**：`verifyToken()` 验证 JWT token
-   **权限检查**：`checkPermission()` 检查 RBAC 权限

虽然权限检查已经正确绕过，但功能特性检查和某些身份验证逻辑仍然在执行。

### 2. 前端代理配置错误（主要原因）

**这是导致 403 错误的根本原因：**

在 `packages/ui/vite.config.js` 中，Vite 开发服务器的代理配置指向了错误的端口：

```javascript
const serverPort = 3001 // 错误的端口
```

而后端实际运行在 **8000** 端口。这导致：

-   浏览器的所有 `/api/*` 请求被代理到 `localhost:3001`（不存在或旧进程）
-   后端日志看不到任何来自浏览器的请求
-   curl 直接访问 `localhost:8000` 可以正常工作，但浏览器不行

## 修复方案

### 修复 1：后端 - IdentityManager 功能特性检查

**文件：** `packages/server/src/IdentityManager.ts`

**位置：** 第 277-296 行

**修改内容：**

```typescript
public static checkFeatureByPlan(feature: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        // 在开源模式下，完全绕过功能特性检查
        const identityManager = await IdentityManager.getInstance()
        if (identityManager.isOpenSource()) {
            return next()
        }

        const user = req.user
        if (user) {
            if (!user.features || Object.keys(user.features).length === 0) {
                return res.status(403).json({ message: ErrorMessage.FORBIDDEN })
            }
            if (Object.keys(user.features).includes(feature) && user.features[feature] === 'true') {
                return next()
            }
        }
        return res.status(403).json({ message: ErrorMessage.FORBIDDEN })
    }
}
```

**关键改动：**

-   将中间件改为异步函数（`async`）
-   在函数开头添加开源模式检查
-   如果是开源模式，立即调用 `next()` 跳过所有检查

### 修复 2：后端 - 内部请求认证绕过

**文件：** `packages/server/src/index.ts`

**位置：** 第 225-239 行

**修改内容：**

```typescript
const isWhitelisted = whitelistURLs.some((url) => req.path.startsWith(url))
if (isWhitelisted) {
    next()
} else if (req.headers['x-request-from'] === 'internal') {
    // 在开源模式下，也绕过内部请求的身份验证
    if (this.identityManager.getPlatformType() === Platform.OPEN_SOURCE) {
        return next()
    }
    verifyToken(req, res, next)
} else {
    // 在开源模式下，完全绕过身份验证
    if (this.identityManager.getPlatformType() === Platform.OPEN_SOURCE) {
        return next()
    }
    // ... 其他认证逻辑
}
```

**关键改动：**

-   在处理 `x-request-from: internal` 头的分支中添加开源模式检查
-   在 else 分支的认证逻辑前添加开源模式检查

### 修复 3：前端 - RequireAuth 组件

**文件：** `packages/ui/src/routes/RequireAuth.jsx`

**位置：** 第 39-49 行

**修改内容：**

```javascript
// 步骤 1: 部署类型特定逻辑
// 开源模式：允许所有功能（绕过认证、权限和显示检查）
if (isOpenSource) {
    return children
}

// 步骤 2: 认证检查
// 如果用户未认证，重定向到登录页面
if (!currentUser) {
    return <Navigate to='/login' replace state={{ path: location.pathname }} />
}
```

**关键改动：**

-   将开源模式检查提前到认证检查之前
-   确保在开源模式下，直接渲染子组件，不进行任何认证检查

### 修复 4：前端 - Vite 代理配置（核心修复）

**文件：** `packages/ui/vite.config.js`

**位置：** 第 11 行

**修改内容：**

```javascript
if (mode === 'development') {
    const serverEnv = dotenv.config({ processEnv: {}, path: '../server/.env' }).parsed
    const serverHost = 'localhost'
    const serverPort = 8000 // 修改：从 3001 改为 8000
    if (!Number.isNaN(serverPort) && serverPort > 0 && serverPort < 65535) {
        proxy = {
            '^/api(/|$).*': {
                target: `http://${serverHost}:${serverPort}`,
                changeOrigin: true
            }
        }
    }
}
```

**关键改动：**

-   将 `serverPort` 从 `3001` 改为 `8000`
-   确保前端代理正确转发请求到后端服务器

## 验证步骤

### 1. 验证后端正常运行

```bash
# 检查后端端口
netstat -ano | findstr ":8000"

# 应该看到类似输出：
# TCP    0.0.0.0:8000           0.0.0.0:0              LISTENING       52244

# 测试后端 API
curl http://localhost:8000/api/v1/settings
# 应该返回：{"PLATFORM_TYPE":"open source"}

curl http://localhost:8000/api/v1/datasets
# 应该返回数据集列表（可能为空数组）
```

### 2. 验证前端代理配置

```bash
# 检查前端端口
netstat -ano | findstr ":3000"

# 测试通过前端代理访问后端
curl http://localhost:3000/api/v1/settings
# 应该返回：{"PLATFORM_TYPE":"open source"}
```

### 3. 验证浏览器访问

1. 打开浏览器访问 `http://localhost:3000`
2. 硬刷新清除缓存（Ctrl + Shift + R）
3. 访问以下页面，应该都能正常加载：
    - Datasets（数据集）
    - Evaluations（评估）
    - Evaluators（评估器）
    - Logs（日志）

### 4. 检查后端日志

在后端日志中应该能看到类似输出：

```
[PermissionCheck] Permission: datasets:view, isOpenSource: true, platform: open source, user: null
[PermissionCheck] Open source mode detected - bypassing permission check
```

## 故障排查

### 问题 1：修改 TypeScript 文件后未生效

**原因：** nodemon 只监听文件变化并重启，但不会自动编译 TypeScript。

**解决方案：**

```bash
# 手动编译 TypeScript
cd packages/server
pnpm build

# 然后 nodemon 会自动检测到 dist/ 目录的变化并重启
```

### 问题 2：浏览器仍然显示 403

**可能原因：**

1. 浏览器缓存了旧的响应
2. 前端服务器未重启，仍使用旧的代理配置
3. 多个后端进程冲突

**解决方案：**

```bash
# 1. 清理所有 node 进程
tasklist | findstr "node.exe"
taskkill //F //PID <进程ID>

# 2. 重新启动后端
cd packages/server
PORT=8000 DATABASE_PATH=./database.sqlite pnpm dev

# 3. 重新启动前端
cd packages/ui
pnpm dev

# 4. 浏览器硬刷新（Ctrl + Shift + R）
```

### 问题 3：端口被占用

**解决方案：**

```bash
# 检查端口占用
netstat -ano | findstr ":<端口号>"

# 杀掉占用端口的进程
taskkill //F //PID <进程ID>
```

## 技术要点总结

### 1. 开源模式检测

系统通过以下方式检测开源模式：

```typescript
const identityManager = await IdentityManager.getInstance()
const isOpenSource = identityManager.isOpenSource()
const platformType = identityManager.getPlatformType() // 返回 Platform.OPEN_SOURCE
```

### 2. 认证中间件执行顺序

```
1. checkFeatureByPlan (功能特性检查)
   ↓
2. verifyToken (JWT 验证)
   ↓
3. checkPermission (RBAC 权限检查)
   ↓
4. 路由处理函数
```

在开源模式下，所有中间件都应该直接调用 `next()` 跳过检查。

### 3. Vite 代理机制

在开发模式下，Vite 会将匹配的请求代理到后端：

-   前端运行在 `localhost:3000`
-   请求 `/api/*` 会被代理到 `localhost:8000`
-   浏览器只看到 `localhost:3000`，不需要处理 CORS

## 相关文件清单

修改的文件：

-   `packages/server/src/IdentityManager.ts`
-   `packages/server/src/index.ts`
-   `packages/ui/src/routes/RequireAuth.jsx`
-   `packages/ui/vite.config.js`

参考的文件：

-   `packages/server/src/enterprise/rbac/PermissionCheck.ts` (已有正确的开源模式绕过)
-   `packages/server/src/routes/index.ts` (路由配置)
-   `packages/ui/src/api/client.js` (API 客户端配置)

## 后续建议

1. **添加开源模式标识**：在前端页面显示当前运行模式（开源/企业）
2. **统一中间件逻辑**：创建一个统一的开源模式检查包装器
3. **改进配置管理**：将端口配置集中到环境变量中，避免硬编码
4. **添加集成测试**：测试开源模式下的各种场景

## 参考资源

-   [LOCAL_DEVELOPMENT.md](../LOCAL_DEVELOPMENT.md) - 本地开发环境配置
-   [Vite 代理配置文档](https://vitejs.dev/config/server-options.html#server-proxy)
-   [Express 中间件文档](https://expressjs.com/en/guide/using-middleware.html)
