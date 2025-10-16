# 本地开发环境配置指南

本文档记录如何在 Windows 环境下使用 Node.js 20 配置和启动 Flowise 本地开发环境。

## 环境要求

### 必需软件

1. **Node.js 20.19.5 LTS**

    - 下载地址：https://nodejs.org/download/release/latest-v20.x/
    - 推荐使用 nvm-windows 管理多个 Node 版本

2. **Visual Studio Build Tools 2022**

    - 已安装位置：`D:\Soft\Soft Add\vsBuildTools\anzhuang`
    - 需要包含 "C++ 构建工具" 工作负载

3. **Windows SDK 10.0.26100**

    - 安装位置：`C:\Program Files (x86)\Windows Kits\10\`
    - 包含完整的头文件和库文件

4. **Python 3.11+**
    - 用于 node-gyp 编译 native 模块

## 配置步骤

### 1. 切换到 Node 20.19.5

如果您有多个 Node 版本，使用以下命令切换：

**PowerShell:**

```powershell
$env:PATH = "D:\Soft\Soft Add\Node.js\nvm\v20.19.5;" + $env:PATH
node --version  # 应显示 v20.19.5
```

**Bash:**

```bash
export PATH="/d/Soft/Soft Add/Node.js/nvm/v20.19.5:$PATH"
node --version  # 应显示 v20.19.5
```

### 2. 配置 .npmrc 文件

项目根目录的 `.npmrc` 文件已配置好，包含以下关键设置：

```ini
# node-gyp 配置
msvs_version=2022
msbuild_path=D:\Soft\Soft Add\vsBuildTools\anzhuang\MSBuild\Current\Bin\MSBuild.exe
python=python3
target_platform=win32
target_arch=x64
runtime=node
build_from_source=false
```

**重要说明：**

-   `build_from_source=false` - 优先使用预编译的二进制包，避免编译问题
-   `msvs_version=2022` - 指定 Visual Studio 版本
-   `msbuild_path` - 明确指定 MSBuild 路径

### 3. 安装依赖

在项目根目录运行：

```bash
pnpm install
```

**关键依赖：**

-   `sqlite3@5.1.7` - 使用预编译的 native binding
-   所有依赖会根据 `.npmrc` 配置自动安装

### 4. 配置环境变量

后端开发需要以下环境变量：

```bash
export PORT=8000
export DATABASE_PATH=./database.sqlite
export FLOWISE_USERNAME=admin
export FLOWISE_PASSWORD=admin123
```

或在 packages/server 目录创建 `.env` 文件：

```env
PORT=8000
DATABASE_PATH=./database.sqlite
FLOWISE_USERNAME=admin
FLOWISE_PASSWORD=admin123
```

## 启动开发服务器

### 方式 1: 使用快捷脚本（推荐）

我们创建了几个便捷脚本：

**启动后端开发服务器：**

```bash
# 使用 pnpm dev（支持热重载）
cd packages/server
pnpm dev
```

**启动前端开发服务器：**

```bash
cd packages/ui
pnpm dev
```

### 方式 2: 手动启动

**后端：**

```bash
export PATH="/d/Soft/Soft Add/Node.js/nvm/v20.19.5:$PATH"
cd packages/server
PORT=8000 DATABASE_PATH=./database.sqlite FLOWISE_USERNAME=admin FLOWISE_PASSWORD=admin123 pnpm dev
```

**前端：**

```bash
export PATH="/d/Soft/Soft Add/Node.js/nvm/v20.19.5:$PATH"
cd packages/ui
pnpm dev
```

### 方式 3: 使用提供的批处理脚本

**后端：**

```cmd
start-server-node20.cmd
```

## 验证启动成功

### 后端服务器

启动成功后，应看到以下日志：

```
Loaded 22 translation entries
[INFO]: Starting Flowise...
[INFO]: 📦 [server]: Data Source initialized successfully
[INFO]: 🔄 [server]: Database migrations completed successfully
[INFO]: 🔐 [server]: Identity Manager initialized successfully
[INFO]: 🔧 [server]: Nodes pool initialized successfully
[INFO]: 🎉 [server]: All initialization steps completed successfully!
[INFO]: ⚡️ [server]: Flowise Server is listening at :8000
```

测试后端：

```bash
curl http://localhost:8000/api/v1/chatflows
# 应返回: []
```

### 前端开发服务器

启动成功后，应看到：

```
VITE v5.1.6  ready in XXXXms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

访问浏览器：http://localhost:3000

## 常见问题

### 问题 1: sqlite3 包未找到

**错误信息：**

```
DriverPackageNotInstalledError: SQLite package has not been found installed
```

**解决方法：**

1. 确认使用 Node 20.19.5
2. 删除 node_modules 并重新安装：
    ```bash
    rm -rf node_modules
    pnpm install
    ```

### 问题 2: node-gyp 找不到 Windows SDK

**错误信息：**

```
gyp ERR! find VS - missing any Windows SDK
```

**解决方法：**
检查 `.npmrc` 文件是否包含正确的 node-gyp 配置（见上文第 2 步）。

### 问题 3: 端口被占用

**错误信息：**

```
Error: listen EADDRINUSE: address already in use :::8000
```

**解决方法：**

```bash
# 查找占用端口的进程
netstat -ano | findstr ":8000"

# 停止该进程
taskkill /F /PID <进程ID>
```

### 问题 4: Segmentation Fault

如果出现段错误，通常是 native 模块版本不匹配：

1. 清理 build 目录：

    ```bash
    find node_modules -name "build" -type d -exec rm -rf {} +
    ```

2. 重新安装：
    ```bash
    pnpm install --force
    ```

## 开发工作流

### 修改代码后

-   **TypeScript 文件修改**：nodemon 会自动检测并重启服务器
-   **前端代码修改**：Vite 会自动热重载（HMR）

### 调试后端

后端使用 nodemon 监听文件变化：

```bash
# 查看监听的文件
# nodemon 配置在 packages/server/package.json 中

# 手动重启
# 在 nodemon 运行时输入: rs
```

### 查看日志

-   后端日志：直接在运行 `pnpm dev` 的终端查看
-   前端日志：浏览器开发者工具 Console

## 项目结构

```
Moduoduo-Agent-Flow/
├── packages/
│   ├── server/          # 后端服务器
│   │   ├── src/         # TypeScript 源码
│   │   ├── dist/        # 编译后的 JavaScript
│   │   ├── bin/run      # 启动入口
│   │   └── package.json
│   │
│   ├── ui/              # 前端应用
│   │   ├── src/         # React 源码
│   │   └── package.json
│   │
│   └── components/      # 共享组件
│       └── locales/     # 翻译文件
│
├── .npmrc               # npm/pnpm 配置（重要！）
└── pnpm-workspace.yaml  # pnpm workspace 配置
```

## 技术栈

-   **后端**: Node.js, TypeScript, Express, TypeORM, SQLite
-   **前端**: React, Vite, Material-UI
-   **构建工具**: pnpm (workspace), TypeScript, nodemon
-   **数据库**: SQLite (通过 TypeORM)
-   **国际化**: i18next, react-i18next

## 额外资源

-   Node.js 20 文档: https://nodejs.org/docs/latest-v20.x/api/
-   pnpm 文档: https://pnpm.io/
-   TypeORM 文档: https://typeorm.io/
-   Vite 文档: https://vitejs.dev/

## 故障排除清单

如果遇到启动问题，按顺序检查：

1. ✅ Node 版本是否为 20.19.5？

    ```bash
    node --version
    ```

2. ✅ .npmrc 配置是否正确？

    ```bash
    cat .npmrc | grep msvs_version
    ```

3. ✅ 依赖是否完整安装？

    ```bash
    ls node_modules/.pnpm/sqlite3@5.1.7
    ```

4. ✅ 端口是否被占用？

    ```bash
    netstat -ano | findstr ":8000"
    netstat -ano | findstr ":3000"
    ```

5. ✅ 环境变量是否设置？
    ```bash
    echo $PORT
    echo $DATABASE_PATH
    ```

## 贡献者注意事项

-   提交代码前确保本地开发环境正常运行
-   不要修改 `.npmrc` 中的 node-gyp 配置
-   添加新的 native 依赖前请先测试兼容性

## 更新日志

-   **2025-10-17**: 初始版本，记录 Node 20 本地开发配置
    -   配置 .npmrc 解决 Windows SDK 问题
    -   成功安装 sqlite3 预编译版本
    -   前后端开发服务器启动成功
