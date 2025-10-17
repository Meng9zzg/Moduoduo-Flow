# Tools 节点翻译映射表

快速参考所有工具节点的英文和中文翻译。

| #   | 节点名称                  | 英文标签                | 中文标签             | 类别      |
| --- | ------------------------- | ----------------------- | -------------------- | --------- |
| 1   | agentAsTool               | Agent as Tool           | 代理工具             | API/集成  |
| 2   | arxiv                     | Arxiv                   | Arxiv                | 学术/知识 |
| 3   | awsDynamoDBKVStorage      | AWS DynamoDB KV Storage | AWS DynamoDB KV 存储 | 云服务    |
| 4   | awsSNS                    | AWS SNS                 | AWS SNS              | 云服务    |
| 5   | braveSearchAPI            | BraveSearch API         | BraveSearch API      | 搜索      |
| 6   | calculator                | Calculator              | 计算器               | 实用工具  |
| 7   | chainTool                 | Chain Tool              | 链工具               | 集成      |
| 8   | chatflowTool              | Chatflow Tool           | 聊天流工具           | 集成      |
| 9   | codeInterpreterE2B        | Code Interpreter by E2B | E2B 代码解释器       | 实用工具  |
| 10  | composio                  | Composio                | Composio             | 集成      |
| 11  | currentDateTime           | CurrentDateTime         | 当前日期时间         | 实用工具  |
| 12  | customTool                | Custom Tool             | 自定义工具           | 实用工具  |
| 13  | exaSearch                 | Exa Search              | Exa Search           | 搜索      |
| 14  | gmail                     | Gmail                   | Gmail                | 通信      |
| 15  | googleCalendar            | Google Calendar         | Google Calendar      | 通信      |
| 16  | googleDocs                | Google Docs             | Google Docs          | 文档      |
| 17  | googleDrive               | Google Drive            | Google Drive         | 文件      |
| 18  | googleCustomSearch        | Google Custom Search    | Google Custom Search | 搜索      |
| 19  | googleSheetsTool          | Google Sheets           | Google Sheets        | 文档      |
| 20  | jiraTool                  | Jira                    | Jira                 | 协作      |
| 21  | jsonPathExtractor         | JSON Path Extractor     | JSON 路径提取器      | 实用工具  |
| 22  | microsoftOutlook          | Microsoft Outlook       | Microsoft Outlook    | 通信      |
| 23  | microsoftTeams            | Microsoft Teams         | Microsoft Teams      | 通信      |
| 24  | openAPIToolkit            | OpenAPI Toolkit         | OpenAPI Toolkit      | API       |
| 25  | queryEngineToolLlamaIndex | QueryEngine Tool        | QueryEngine 工具     | 集成      |
| 26  | readFile                  | Read File               | 读取文件             | 文件      |
| 27  | requestsDelete            | Requests Delete         | Requests Delete      | API       |
| 28  | requestsGet               | Requests Get            | Requests Get         | API       |
| 29  | requestsPost              | Requests Post           | Requests Post        | API       |
| 30  | requestsPut               | Requests Put            | Requests Put         | API       |
| 31  | retrieverTool             | Retriever Tool          | 检索器工具           | 集成      |
| 32  | searchAPI                 | SearchApi               | SearchApi            | 搜索      |
| 33  | searXNG                   | SearXNG                 | SearXNG              | 搜索      |
| 34  | serpAPI                   | Serp API                | Serp API             | 搜索      |
| 35  | serper                    | Serper                  | Serper               | 搜索      |
| 36  | stripeAgentTool           | StripeAgentTool         | StripeAgentTool      | 支付      |
| 37  | tavilyAPI                 | Tavily API              | Tavily API           | 搜索      |
| 38  | webBrowser                | Web Browser             | Web 浏览器           | 网络      |
| 39  | webScraperTool            | Web Scraper Tool        | Web 抓取工具         | 网络      |
| 40  | wolframAlpha              | WolframAlpha            | WolframAlpha         | 知识      |
| 41  | writeFile                 | Write File              | 写入文件             | 文件      |

## 翻译原则

1. **品牌名称保持不变**：Google, Microsoft, AWS, Stripe, WolframAlpha 等
2. **技术术语保持英文**：API, HTTP, JSON, URL 等
3. **动作词语本地化**：Read → 读取, Write → 写入, Search → 搜索
4. **保持简洁性**：确保中文翻译简洁明了，易于理解

## 文件位置

-   英文翻译：`packages/components/locales/en/nodes/tools.json`
-   中文翻译：`packages/components/locales/zh/nodes/tools.json`
-   节点源码：`packages/components/nodes/tools/[NodeName]/[NodeName].ts`
