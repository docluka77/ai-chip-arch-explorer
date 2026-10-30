# 现代 AI 芯片架构观察室 0.2

从官方原图，逐层拆到计算单元内部。原仓库的 CNN / MAESTRO 页面继续保留在根目录，本目录提供新的独立界面。

在线入口：[芯片架构观察室](https://docluka77.github.io/ai-chip-arch-explorer/observatory/)。直接打开本目录 index.html 也能阅读，不需要安装或构建。官方远程图片与资料链接需要联网。

## 阅读顺序

1. 从原图拆芯片：切换官方图并放大；推荐按RTX Blackwell的GPU → GPC → TPC → SM → 子分区逐层进入。
2. DeepSeek怎么跑：V4.1 Flash的真实40层配置、CSA2共享、MoE路由教学、DeepInfer执行与开源边界。
3. 瓶颈实验：保留可编辑的Dense Decode简化模型，不将它套到复杂MoE模型。
4. 看懂设计差异：先讲三个问题，完整技术表折叠在后面。
5. 原始资料：33份资料及具体证据边界。
6. 我的笔记：当前浏览器保存，可备份迁移。

## 继续修改

- data.js：初版芯片条目。
- research-data.js：原图、资料版本、DeepSeek官方配置和40层共享关系。
- layers.js：多层微架构重绘、原图查看、矩阵教学。
- case-study.js：DeepSeek / DeepInfer案例。
- app.js：应用交互、对照、实验、笔记、深链接。
- theme.css / responsive.css：新版浅色主题、大字号及手机阅读。

旧观察室0.1完整保存在 [archive/v01/index.html](archive/v01/index.html)。

## 不应混淆的边界

完整GB202为192SM，RTX5090启用170SM；数据中心SM100与消费级GB202也不同。矩阵4×4沙盘是数学教学，不是厂商未披露的物理PE布线。

真武M890已有技术文档；V900另分代。MI455X封装渲染、HC1板卡照片与真正内部框图分别标注；字节暂无核实到的官方内部图。

DeepInfer是推理软件而非芯片。模型结构、软件引擎、硬件映射分开；浏览器不运行模型。厂商生产系统全图并不等于完整在线服务已经开源。

审阅日期：2026-10-30，未连接自动抓取更新。

## 许可

原创代码与表达保留所有权利，公开可读，复用须获授权；不是开源许可证。第三方官方图、字体及软件许可独立适用，不纳入本项目独占权利。

详见 [LICENSE](LICENSE)、[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。Noto Sans SC字体采用SIL OFL，许可位于assets/fonts/OFL.txt。
