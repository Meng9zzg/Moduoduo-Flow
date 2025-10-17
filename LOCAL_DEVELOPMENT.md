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

## Docker 镜像构建指南

### 构建背景

在开源模式下修复了 403 Forbidden 问题后，需要构建包含这些修复的 Docker 镜像。

### 关键问题：依赖安装卡住

#### 问题描述

使用原始 Dockerfile 构建时，会在安装系统依赖的步骤卡住（无响应超过 25 分钟）：

```dockerfile
# 原始 Dockerfile - 会卡住
RUN apk add --update libc6-compat python3 make g++ git
```

**症状：**

-   构建卡在 "Installing gcc (14.2.0-r6)" 步骤
-   显示 `...` 表示输出被截断
-   没有 CPU 使用和磁盘 I/O 活动
-   多次尝试均在同一位置卡住

**根本原因：**
一次性安装 42 个包（包括 gcc、g++ 等大型编译工具）时，Alpine Linux 的包管理器 (apk) 在某些环境下会出现死锁或挂起问题。

### 解决方案：分步安装依赖

#### 优化的 Dockerfile

创建 `Dockerfile.optimized`，将依赖安装分解为多个独立步骤：

```dockerfile
FROM node:20-alpine

# 步骤 1: 安装基础依赖（不包括 g++）
RUN apk add --no-cache --update libc6-compat python3 make git

# 步骤 2: 单独安装 g++（之前卡住的地方）
RUN apk add --no-cache g++

# 步骤 3: 安装 PDF 支持依赖
RUN apk add --no-cache build-base cairo-dev pango-dev

# 步骤 4: 安装 Chromium
RUN apk add --no-cache chromium

# 步骤 5: 安装 curl
RUN apk add --no-cache curl

# 步骤 6: 安装 pnpm
RUN npm install -g pnpm

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_OPTIONS=--max-old-space-size=8192

WORKDIR /usr/src

# 复制源代码
COPY . .

# 安装依赖
RUN pnpm install

# 构建项目
RUN pnpm build

EXPOSE 3000

# 全局安装 flowise
RUN cd packages/server && npm install -g .

CMD [ "flowise", "start" ]
```

#### 关键改进点

1. **分步安装**：将 `apk add` 命令分成 5 个独立步骤
2. **单独处理 g++**：将容易卡住的 g++ 单独安装
3. **添加 --no-cache**：每个 apk 命令都使用 `--no-cache` 避免缓存问题
4. **减少单次包数量**：避免一次性安装 42 个包

### 构建命令

```bash
# 清理旧的构建缓存（可选）
docker buildx prune -af

# 使用优化的 Dockerfile 构建
docker build --progress=plain \
  -f Dockerfile.optimized \
  -t meng9zzg/moduoduo-agent-flow-packages:latest \
  .
```

**参数说明：**

-   `--progress=plain`：显示详细的构建输出
-   `-f Dockerfile.optimized`：使用优化的 Dockerfile
-   `-t`：指定镜像标签

### 构建性能数据

**成功构建统计：**

-   总耗时：约 6-8 分钟
-   镜像大小：3.46GB
-   主要步骤耗时：
    -   系统依赖安装：约 1 分钟
    -   Chromium 安装：40 秒
    -   pnpm install：43 秒（3855 个包）
    -   pnpm build：约 3-4 分钟

**对比原始 Dockerfile：**

-   原始：卡住 25+ 分钟后失败
-   优化：6-8 分钟成功完成

### 故障诊断流程

如果构建卡住，按以下步骤诊断：

#### 1. 检查构建是否真的在工作

```bash
# 检查容器 CPU 和 I/O
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.BlockIO}}"

# 查看 Docker 进程
tasklist | findstr docker
```

**判断标准：**

-   ✅ 正常：有 CPU 使用或 Block I/O 活动
-   ❌ 卡住：CPU 0.00%，Block I/O 无变化

#### 2. 查看详细构建日志

```bash
# 使用 --progress=plain 获取完整输出
docker build --progress=plain -t image-name .
```

#### 3. 检查构建缓存

```bash
# 查看缓存使用情况
docker system df -v

# 如果缓存过大（>10GB），清理
docker buildx prune -af
```

### 常见问题

#### 问题 1：构建卡在 gcc 安装

**症状：**

```
#6 3.685 (11/42) Installing gcc (14.2.0-r6)
#6 ...
```

**解决方案：**
使用 `Dockerfile.optimized` 分步安装依赖。

#### 问题 2：构建缓存导致使用旧代码

**症状：**
镜像构建成功，但运行时仍有 403 错误。

**解决方案：**

```bash
# 清理缓存后重新构建
docker buildx prune -af
docker build --no-cache -f Dockerfile.optimized -t image-name .
```

#### 问题 3：Docker Desktop 资源不足

**症状：**
构建过程中 Docker Desktop 崩溃或极慢。

**解决方案：**

1. 增加 Docker Desktop 的内存限制（至少 8GB）
2. 增加磁盘空间限制（至少 60GB）
3. 清理未使用的镜像和容器：
    ```bash
    docker system prune -a
    ```

### 验证镜像

构建成功后验证镜像：

```bash
# 查看镜像
docker images | grep meng9zzg/moduoduo-agent-flow-packages

# 测试运行
docker run -d -p 3001:3000 \
  -e FLOWISE_USERNAME=admin \
  -e FLOWISE_PASSWORD=admin123 \
  meng9zzg/moduoduo-agent-flow-packages:latest

# 等待启动（约 10-20 秒）
sleep 20

# 测试 API
curl http://localhost:3001/api/v1/chatflows
# 应返回: []

# 测试开源模式
curl http://localhost:3001/api/v1/settings
# 应返回: {"PLATFORM_TYPE":"open source"}

# 停止容器
docker stop $(docker ps -q --filter ancestor=meng9zzg/moduoduo-agent-flow-packages:latest)
```

### 推送到 Docker Hub

```bash
# 登录 Docker Hub
docker login

# 推送镜像
docker push meng9zzg/moduoduo-agent-flow-packages:latest

# 验证推送成功
docker pull meng9zzg/moduoduo-agent-flow-packages:latest
```

### 最佳实践总结

1. **分步安装系统依赖**

    - 不要一次性安装过多包
    - 将大型工具（gcc、g++）单独安装
    - 每个 RUN 命令使用 `--no-cache`

2. **使用详细输出**

    - 始终使用 `--progress=plain` 查看完整日志
    - 便于诊断卡住的具体位置

3. **定期清理缓存**

    - 构建前运行 `docker buildx prune -af`
    - 避免使用过时的缓存层

4. **监控构建过程**

    - 使用 `docker stats` 监控资源使用
    - 超过 5 分钟无输出就应该检查

5. **保留优化的 Dockerfile**
    - 将 `Dockerfile.optimized` 提交到代码库
    - 在 CI/CD 中使用优化版本

### 相关文件

-   [Dockerfile](./Dockerfile) - 原始 Dockerfile（会卡住）
-   [Dockerfile.optimized](./Dockerfile.optimized) - 优化的 Dockerfile（推荐使用）
-   [docs/FIX_403_FORBIDDEN.md](./docs/FIX_403_FORBIDDEN.md) - 403 问题修复文档

### 技术要点

**为什么分步安装能解决问题？**

1. **减少单次操作复杂度**：每个 RUN 层独立执行，减少死锁可能
2. **更好的错误隔离**：如果某个包安装失败，只影响该步骤
3. **利用 Docker 层缓存**：前面的步骤可以缓存，加速后续构建
4. **避免 Alpine APK 的并发问题**：减少同时处理的依赖关系

**Alpine vs Debian 镜像：**

-   Alpine 更小（~5MB vs ~100MB）但包管理器较简单
-   Debian 更稳定但镜像更大
-   本项目选择 Alpine 是为了减小镜像体积

## 更新日志

-   **2025-10-17**: 初始版本，记录 Node 20 本地开发配置
    -   配置 .npmrc 解决 Windows SDK 问题
    -   成功安装 sqlite3 预编译版本
    -   前后端开发服务器启动成功
-   **2025-10-17**: 添加 Docker 镜像构建指南
    -   记录依赖安装卡住问题和解决方案
    -   提供优化的 Dockerfile 和构建流程
    -   包含完整的故障诊断和最佳实践
