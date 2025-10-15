# Moduoduo Agent Flow 部署指南

本文档提供了完整的部署和运行指南，帮助你快速启动 Moduoduo Agent Flow 项目。

## 📦 部署方式

### 方式 1：Docker 部署（推荐）

这是最简单的部署方式，无需配置本地开发环境。

#### 前置要求

-   安装 [Docker](https://www.docker.com/get-started)
-   安装 [Docker Compose](https://docs.docker.com/compose/install/)

#### 快速启动

```bash
# 1. 克隆仓库
git clone https://github.com/9zzg/Moduoduo-Agent-Flow.git
cd Moduoduo-Agent-Flow/docker

# 2. 拉取 Docker 镜像（可选，docker-compose 会自动拉取）
docker pull meng9zzg/moduoduo-agent-flow-packages-i18ln:latest

# 3. 启动服务
docker-compose up -d

# 4. 查看服务状态
docker-compose ps

# 5. 查看日志
docker-compose logs -f
```

#### 访问应用

-   **应用地址**: http://localhost:8000
-   **默认账号**: admin
-   **默认密码**: admin123

#### 停止服务

```bash
# 停止服务
docker-compose stop

# 停止并删除容器
docker-compose down

# 停止并删除容器和数据卷
docker-compose down -v
```

---

### 方式 2：从源码运行

适合需要进行开发或定制的场景。

#### 前置要求

-   **Node.js**: 18.15.0 - 18.x 或 20.x
-   **pnpm**: >= 9.0.0
-   **Python**: 3.x（某些依赖需要）
-   **构建工具**:
    -   Windows: Visual Studio Build Tools
    -   macOS: Xcode Command Line Tools
    -   Linux: build-essential

#### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/9zzg/Moduoduo-Agent-Flow.git
cd Moduoduo-Agent-Flow

# 2. 安装 pnpm（如果未安装）
npm install -g pnpm

# 3. 安装依赖
pnpm install

# 4. 构建项目
pnpm build

# 5. 启动开发服务器
pnpm dev
```

#### 生产环境启动

```bash
# 启动主服务
pnpm start

# 启动 Worker 服务（队列模式）
pnpm start-worker
```

#### 访问应用

-   **前端地址**: http://localhost:8080
-   **后端 API**: http://localhost:3000

---

## 🔧 配置说明

### Docker 环境变量

在 `docker` 目录下创建 `.env` 文件（可参考 `.env.example`）：

```env
# 端口配置
PORT=3000

# 数据持久化路径
DATABASE_PATH=/root/.flowise
LOG_PATH=/root/.flowise/logs
SECRETKEY_PATH=/root/.flowise
BLOB_STORAGE_PATH=/root/.flowise/storage

# 认证配置
FLOWISE_USERNAME=admin
FLOWISE_PASSWORD=admin123

# JWT 配置（生产环境请修改）
JWT_AUTH_TOKEN_SECRET=your_secret_key_here
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret_here
EXPRESS_SESSION_SECRET=your_session_secret_here

# 密码加密配置
PASSWORD_SALT_HASH_ROUNDS=10
TOKEN_HASH_SECRET=your_token_hash_secret

# SMTP 邮件配置（可选）
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_email_password
SMTP_SECURE=false
SENDER_EMAIL=noreply@example.com
```

### 重要安全提示 ⚠️

**生产环境部署时，请务必修改以下配置：**

1. **修改默认密码**

    ```env
    FLOWISE_USERNAME=your_admin_username
    FLOWISE_PASSWORD=your_secure_password
    ```

2. **生成安全的密钥**

    ```bash
    # 使用 openssl 生成随机密钥
    openssl rand -base64 32
    ```

3. **配置 HTTPS**（生产环境必须）
    - 使用 Nginx 或 Traefik 作为反向代理
    - 配置 SSL 证书

---

## 📊 Docker 镜像信息

### 镜像详情

-   **镜像名称**: `meng9zzg/moduoduo-agent-flow-packages-i18ln:latest`
-   **镜像大小**: 3.41 GB
-   **包含内容**:
    -   ✅ 完整的前端构建（包含 i18n 国际化）
    -   ✅ 完整的后端服务
    -   ✅ JWT 认证系统
    -   ✅ Session 管理
    -   ✅ 密码加密
    -   ✅ SMTP 邮件服务
    -   ✅ 所有必要的依赖

### 镜像拉取

```bash
docker pull meng9zzg/moduoduo-agent-flow-packages-i18ln:latest
```

### 从 Docker Hub 查看

访问：https://hub.docker.com/r/meng9zzg/moduoduo-agent-flow-packages-i18ln

---

## 🛠️ 常见问题

### 1. Docker 容器启动失败

**问题**: 容器启动后立即退出

**解决方案**:

```bash
# 查看容器日志
docker-compose logs

# 检查端口是否被占用
netstat -ano | findstr :8000  # Windows
lsof -i :8000                  # macOS/Linux

# 如果端口被占用，修改 docker-compose.yml 中的端口映射
ports:
  - '8001:3000'  # 将 8000 改为其他端口
```

### 2. 权限问题

**问题**: 无法创建数据目录

**解决方案**:

```bash
# Linux/macOS
chmod -R 777 ~/.flowise

# Windows（以管理员身份运行 PowerShell）
icacls "C:\Users\YourName\.flowise" /grant Everyone:F
```

### 3. 依赖安装失败

**问题**: `pnpm install` 失败

**解决方案**:

```bash
# 清理缓存
pnpm store prune
rm -rf node_modules
rm pnpm-lock.yaml

# 重新安装
pnpm install

# 如果仍然失败，尝试使用 --no-frozen-lockfile
pnpm install --no-frozen-lockfile
```

### 4. Node 版本不兼容

**问题**: Node 版本不满足要求

**解决方案**:

```bash
# 安装 nvm（Node Version Manager）
# Windows: https://github.com/coreybutler/nvm-windows
# macOS/Linux: https://github.com/nvm-sh/nvm

# 安装并使用 Node 20
nvm install 20
nvm use 20

# 验证版本
node --version
```

---

## 📚 更多资源

-   **GitHub 仓库**: https://github.com/9zzg/Moduoduo-Agent-Flow
-   **Docker Hub**: https://hub.docker.com/r/meng9zzg/moduoduo-agent-flow-packages-i18ln
-   **官方文档**: https://doc.9zzg.com
-   **问题反馈**: https://github.com/9zzg/Moduoduo-Agent-Flow/issues

---

## 🎯 快速命令参考

### Docker 命令

```bash
# 启动
docker-compose up -d

# 停止
docker-compose stop

# 重启
docker-compose restart

# 查看日志
docker-compose logs -f

# 进入容器
docker-compose exec flowise sh

# 删除容器和数据
docker-compose down -v
```

### 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 生产启动
pnpm start

# 运行测试
pnpm test

# 代码格式化
pnpm format

# 代码检查
pnpm lint
```

---

## ⚡ 性能优化建议

1. **使用 Redis 作为缓存**（队列模式）

    ```env
    MODE=queue
    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```

2. **配置数据库持久化**

    ```env
    DATABASE_TYPE=postgres
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_NAME=flowise
    DATABASE_USER=flowise
    DATABASE_PASSWORD=your_password
    ```

3. **启用 Metrics 监控**
    ```env
    ENABLE_METRICS=true
    METRICS_PROVIDER=prometheus
    ```

---

## 📞 技术支持

如有问题，请通过以下方式联系：

-   **邮箱**: m@9zzg.com
-   **GitHub Issues**: https://github.com/9zzg/Moduoduo-Agent-Flow/issues

---

**祝你使用愉快！** 🎉
