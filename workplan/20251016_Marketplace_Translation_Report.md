# Marketplace Templates Translation Report

**Date:** 2025-10-16
**Task:** Add Chinese `description_zh` fields to all marketplace template JSON files

## Summary

-   **Total Files Processed:** 50
-   **Successfully Translated:** 50
-   **Files Skipped:** 0
-   **Errors:** 0

### Breakdown by Directory

| Directory                                    | File Count | Status      |
| -------------------------------------------- | ---------- | ----------- |
| `packages/server/marketplaces/chatflows/`    | 24         | ✅ Complete |
| `packages/server/marketplaces/agentflowsv2/` | 13         | ✅ Complete |
| `packages/server/marketplaces/tools/`        | 13         | ✅ Complete |

## Translation Details

### Chatflows (24 files)

1. **Advanced Structured Output Parser.json**

    - EN: Return response as a JSON structure as specified by a Zod schema
    - ZH: 按照 Zod 模式返回符合指定结构的 JSON 响应

2. **Conversational Agent.json**

    - EN: A conversational agent designed to use tools and chat model to provide responses
    - ZH: 一个对话智能体,旨在使用工具和聊天模型提供响应

3. **Conversational Retrieval QA Chain.json**

    - EN: Documents QnA using Retrieval Augmented Generation (RAG) with Mistral and FAISS for similarity search
    - ZH: 使用 Mistral 和 FAISS 进行相似性搜索的检索增强生成 (RAG) 文档问答

4. **Conversation Chain.json**

    - EN: Basic example of Conversation Chain with built-in memory - works exactly like ChatGPT
    - ZH: 带有内置记忆功能的对话链基础示例 - 工作方式与 ChatGPT 完全相同

5. **Context Chat Engine.json**

    - EN: Answer question based on retrieved documents (context) while remembering previous conversations
    - ZH: 基于检索到的文档(上下文)回答问题,同时记住之前的对话

6. **CSV Agent.json**

    - EN: Analyse and summarize CSV data
    - ZH: 分析和总结 CSV 数据

7. **Github Docs QnA.json**

    - EN: Github Docs QnA using Retrieval Augmented Generation (RAG)
    - ZH: 使用检索增强生成 (RAG) 的 Github 文档问答系统

8. **HuggingFace LLM Chain.json**

    - EN: Simple LLM Chain using HuggingFace Inference API on falcon-7b-instruct model
    - ZH: 使用 HuggingFace 推理 API 在 falcon-7b-instruct 模型上的简单 LLM 链

9. **Image Generation.json**

    - EN: Generate image using Replicate Stability text-to-image generative AI model
    - ZH: 使用 Replicate Stability 文本转图像生成式 AI 模型生成图像

10. **Input Moderation.json**

    - EN: Detect text that could generate harmful output and prevent it from being sent to the language model
    - ZH: 检测可能产生有害输出的文本,并阻止其发送到语言模型

11. **List Output Parser.json**

    - EN: Return response as a list (array) instead of a string/text
    - ZH: 将响应以列表(数组)形式返回,而非字符串/文本

12. **LLM Chain.json**

    - EN: Basic example of stateless (no memory) LLM Chain with a Prompt Template and LLM Model
    - ZH: 无状态(无记忆)LLM 链的基础示例,包含提示模板和 LLM 模型

13. **Local QnA.json**

    - EN: QnA chain using Ollama local LLM, LocalAI embedding model, and Faiss local vector store
    - ZH: 使用 Ollama 本地 LLM、LocalAI 嵌入模型和 Faiss 本地向量存储的问答链

14. **Multiple Documents QnA.json**

    - EN: Tool agent that can retrieve answers from multiple sources using relevant Retriever Tools
    - ZH: 可以使用相关检索工具从多个来源检索答案的工具智能体

15. **OpenAI Assistant.json**

    - EN: OpenAI Assistant that has instructions and can leverage models, tools, and knowledge to respond to user queries
    - ZH: 具有指令的 OpenAI 助手,可以利用模型、工具和知识来响应用户查询

16. **OpenAPI YAML Agent.json**

    - EN: Given an OpenAPI YAML file, agent automatically decide which API to call, generating url and body request from conversation
    - ZH: 给定 OpenAPI YAML 文件,智能体自动决定调用哪个 API,从对话中生成 URL 和请求体

17. **Prompt Chaining.json**

    - EN: Use output from a chain as prompt for another chain, similar to chain of thought
    - ZH: 将一个链的输出用作另一个链的提示,类似于思维链

18. **Query Engine.json**

    - EN: Stateless query engine designed to answer question over your data using LlamaIndex
    - ZH: 使用 LlamaIndex 设计的无状态查询引擎,用于回答关于您数据的问题

19. **ReAct Agent.json**

    - EN: An agent that uses ReAct (Reason + Act) logic to decide what action to take
    - ZH: 使用 ReAct(推理 + 行动)逻辑来决定采取什么行动的智能体

20. **Replicate LLM.json**

    - EN: Use Replicate API that runs Llama 13b v2 model with LLMChain
    - ZH: 使用运行 Llama 13b v2 模型的 Replicate API 与 LLMChain

21. **Simple Chat Engine.json**

    - EN: Simple chat engine to handle back and forth conversations using LlamaIndex
    - ZH: 使用 LlamaIndex 处理来回对话的简单聊天引擎

22. **SQL DB Chain.json**

    - EN: Answer questions over a SQL database
    - ZH: 针对 SQL 数据库回答问题

23. **SubQuestion Query Engine.json**

    - EN: Breaks down query into sub questions for each relevant data source, then combine into final response
    - ZH: 将查询分解为每个相关数据源的子问题,然后组合成最终响应

24. **Tool Agent.json**
    - EN: An agent designed to use tools and LLM with function calling capability to provide responses
    - ZH: 设计用于使用工具和具有函数调用能力的 LLM 来提供响应的智能体

### AgentflowsV2 (13 files)

1. **Agentic RAG.json**

    - EN: An agent based approach using AgentflowV2 to perform self-correcting question answering over documents
    - ZH: 使用 AgentflowV2 的智能体方法,对文档执行自我纠正的问答

2. **Agents Handoff.json**

    - EN: A customer support agent that can handoff tasks to different agents based on scenarios
    - ZH: 一个客户支持智能体,可以根据场景将任务移交给不同的智能体

3. **Deep Research With Multi-turn Conversations.json**

    - EN: Deep research system that conducts multi-turn agent conversations to perform web search, synthesize insights and generate well-structured white papers
    - ZH: 进行多轮智能体对话的深度研究系统,执行网络搜索、综合见解并生成结构良好的白皮书

4. **Deep Research With Subagents.json**

    - EN: Multi-agent system that breaks down complex queries, assigns tasks to subagents, and synthesizes findings into detailed reports.
    - ZH: 多智能体系统,分解复杂查询,将任务分配给子智能体,并将结果综合成详细报告

5. **Human In The Loop.json**

    - EN: An email reply HITL (human in the loop) agent that can proceed or refine the email with user input
    - ZH: 一个电子邮件回复 HITL(人机协同)智能体,可以根据用户输入继续或改进电子邮件

6. **Interacting With API.json**

    - EN: Different ways of agents that can interact with APIs
    - ZH: 智能体与 API 交互的不同方式

7. **Iterations.json**

    - EN: An agent that can iterate over a list of items and perform actions on each item
    - ZH: 可以迭代项目列表并对每个项目执行操作的智能体

8. **Simple RAG.json**

    - EN: A basic RAG agent that can retrieve documents from document store and answer questions
    - ZH: 一个基本的 RAG 智能体,可以从文档存储中检索文档并回答问题

9. **SQL Agent.json**

    - EN: An agent that can perform question answering over a database
    - ZH: 可以对数据库执行问答的智能体

10. **Structured Output.json**

    - EN: Return structured output from LLM
    - ZH: 从 LLM 返回结构化输出

11. **Supervisor Worker.json**

    - EN: A hierarchical supervisor agent that plan the steps, and delegate tasks to worker agents based on user query
    - ZH: 一个分层监督智能体,规划步骤并根据用户查询将任务委派给工作智能体

12. **Translator.json**

    - EN: Translate text from one language to another
    - ZH: 将文本从一种语言翻译成另一种语言

13. **Workplace Chat.json**
    - EN: An agent that can post AI responses to Workplace channels like Slack and Teams
    - ZH: 可以将 AI 响应发布到 Slack 和 Teams 等工作场所频道的智能体

### Tools (13 files)

1. **Add Hubspot Contact.json**

    - EN: Add new contact to Hubspot
    - ZH: 向 Hubspot 添加新联系人

2. **Create Airtable Record.json**

    - EN: Add column1, column2 to Airtable
    - ZH: 向 Airtable 添加 column1、column2

3. **Get Current DateTime.json**

    - EN: Useful to get todays day, date and time.
    - ZH: 用于获取今天的日期和时间

4. **Get Stock Mover.json**

    - EN: Get the stocks that has biggest price/volume moves, e.g. actives, gainers, losers, etc.
    - ZH: 获取价格/成交量变动最大的股票,例如活跃股、涨幅榜、跌幅榜等

5. **Make Webhook.json**

    - EN: Useful when you need to send message to Discord
    - ZH: 当您需要向 Discord 发送消息时使用

6. **Perplexity AI Search.json**

    - EN: Useful when conducting research using Perplexity AI online model.
    - ZH: 使用 Perplexity AI 在线模型进行研究时使用

7. **Print or Export Text Document.json**

    - EN: Print or export text content to various formats. Supported `inType` values include md, html, and fountain, while supported `outType` values include pdf, epub, zip, and docx. The default `inType` is md, and the default `outType` is pdf. Provide a concise file name for the document in the `name` field. Once the print or export process is initiated, a JSON response will be returned.
    - ZH: 将文本内容打印或导出为各种格式。支持的 `inType` 值包括 md、html 和 fountain,支持的 `outType` 值包括 pdf、epub、zip 和 docx。默认 `inType` 为 md,默认 `outType` 为 pdf。在 `name` 字段中为文档提供简洁的文件名。打印或导出过程启动后,将返回 JSON 响应

8. **Send Discord Message.json**

    - EN: Send message to Discord channel
    - ZH: 向 Discord 频道发送消息

9. **Send Slack Message.json**

    - EN: Send message to Slack channel
    - ZH: 向 Slack 频道发送消息

10. **Send Teams Message.json**

    - EN: Send message to Teams channel
    - ZH: 向 Teams 频道发送消息

11. **SendGrid Email.json**

    - EN: Send email using SendGrid
    - ZH: 使用 SendGrid 发送电子邮件

12. **Spider Web Scraper.json**

    - EN: This tool is useful for extracting up-to-date information (text) from web pages, making it ideal for gathering data for analysis. If the user provides multiple URLs, process each one separately and then synthesize the extracted information into a single, comprehensive response. Make sure to add the HTTP protocol (https://) to website URLs if the user forgets to do so.\n\nImportant: The webpage_scraper function retrieves the raw text content of any webpage. It does not provide any structural information like headings, paragraphs, or specific elements.
    - ZH: 此工具用于从网页中提取最新信息(文本),非常适合收集数据进行分析。如果用户提供多个 URL,请分别处理每个 URL,然后将提取的信息综合成一个全面的响应。如果用户忘记添加 HTTP 协议 (https://),请确保将其添加到网站 URL 中\n\n 重要提示:webpage_scraper 函数检索任何网页的原始文本内容。它不提供标题、段落或特定元素等结构信息

13. **Spider Web Search & Scrape.json**
    - EN: This tool provides real-time information from the internet using a Metasearch Engine, ensuring up-to-date and relevant responses. Use it to research complex topics by strategically breaking them down into multiple, targeted search queries, exploring different facets and subtopics to gather a comprehensive understanding. If needed, you can use this tool multiple times, but refine your queries based on previous results rather than repeating the same search. Before using the tool, make sure to improve the user's search query to make it clear, thorough, and optimized for the most relevant results.
    - ZH: 此工具使用元搜索引擎从互联网提供实时信息,确保提供最新且相关的响应。使用它通过战略性地将复杂主题分解为多个有针对性的搜索查询来研究,探索不同的方面和子主题以获得全面的理解。如果需要,您可以多次使用此工具,但应根据先前的结果优化查询,而不是重复相同的搜索。在使用该工具之前,请确保改进用户的搜索查询,使其清晰、全面并针对最相关的结果进行优化

## Translation Guidelines Applied

All translations followed these principles:

1. **Professional Technical Chinese:** Used standard technical terminology appropriate for AI/ML domain
2. **Accuracy:** Maintained the exact meaning and technical precision of the original English
3. **Natural Flow:** Translations read naturally in Chinese while preserving technical accuracy
4. **Consistent Terminology:**
    - "Agent" → "智能体"
    - "RAG" → "检索增强生成 (RAG)" or kept as "RAG"
    - "Chain" → "链"
    - "Query" → "查询"
    - "Retrieval" → "检索"
    - "Database" → "数据库"
5. **Tone:** Maintained the same professional and informative tone as the English version

## File Structure

Each JSON file now contains:

-   `description`: Original English description (unchanged)
-   `description_zh`: NEW Chinese translation added immediately after `description`
-   All other fields: Unchanged

## Example Transformation

```json
// Before
{
  "description": "An agent based approach using AgentflowV2 to perform self-correcting question answering over documents",
  "usecases": ["Reflective Agent", "Documents QnA"],
  ...
}

// After
{
  "description": "An agent based approach using AgentflowV2 to perform self-correcting question answering over documents",
  "description_zh": "使用 AgentflowV2 的智能体方法,对文档执行自我纠正的问答",
  "usecases": ["Reflective Agent", "Documents QnA"],
  ...
}
```

## Notes

-   All JSON files remain valid and properly formatted
-   No other fields were modified
-   The `description_zh` field was inserted immediately after the `description` field
-   Original formatting and indentation preserved
-   All 50 files successfully processed with no errors

## Files Not Committed

As requested, no git commit was made. All changes are staged and ready for review.
