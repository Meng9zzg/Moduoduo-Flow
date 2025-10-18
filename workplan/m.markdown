后端开发运行：@LOCAL_DEVELOPMENT.md 阅读这份文件，查看对应的这几个脚本，@setup-node20.cmd @start-backend-node20.cmd @start-dev-node20.cmd @start-server-node20.cmd ，启动并运行项目。要求：使用 node20，启动本地的开发环境，前后端都要本地开发环境。

推荐的一键启动流程是：

# 1. 切换到 Node 20.19.5

$env:PATH = "D:\Soft\Soft Add\Node.js\nvm\v20.19.5;" + $env:PATH

# 2. 设置环境变量

$env:PORT=8000
$env:DATABASE_PATH="./database.sqlite"
$env:FLOWISE_USERNAME="admin"
$env:FLOWISE_PASSWORD="admin123"

# 3. 一键启动前后端

pnpm dev

全局翻译执行：阅读这份文档，了解项目的全局 I18N 工作进度。@Translation_Work_Comprehensive_Guide.md ，执行翻译工作。翻译开始前先制定计划，我批准后你再执行。阶段任务完成后，让我审查。审查后把工作进度和遇到的问题更新到这个 markdown 文档上。之后询问我是否提交 git。翻译要遵循之前的工作，不要胡编乱造。阶段任务完成后，自动检查剩余工作量，提交新的计划给我。我审核后，你继续执行翻译。

前端及 UI 开发：阅读前端和 UI 开发文档，@README-UI.md ，了解熟悉我的自定义组件@m_ui.md 。执行前端 UI 修改工作。每次修改结束，都刷新下页面（你的工作不涉及重启前后端），让我在前端界面确认下效果。如果需要后端重启或者强刷页面才能看到效果的，你要告诉我。我确认你的修改结果后，你要把阶段性工作的记录到@UI-MODIFICATION-LOG.md 前端和 UI 工作日志文档中。之后问我要不要提交 git，我同意后你提交。
