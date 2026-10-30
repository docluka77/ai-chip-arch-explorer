# 第三方资料与素材

本项目原创界面、交互重绘与解释文字保留权利；该声明不覆盖下列第三方内容及技术事实。

## 官方图与论文图

- NVIDIA RTX Blackwell GPU Architecture白皮书v1.1的Figure3/4/5/6，按PDF第8/9/11/12页提取，保留图号与caption，仅移除不相关页眉正文。
- AMD RDNA4发布资料PDF第8/10页，保留完整slide；GPUOpen的第二代AI Accelerator图。
- DeepSeek V4.1 Flash报告Figure3/4及DeepInfer官方部署系统图，固定来源commit见research-data.js。
- 其余Rubin、Groq3、TPU8i/8t、MI455X、HC1、M890官方图片直接从发布方网站加载，或链接到原始文档。图片类型明确区分架构、系统、封装渲染和板卡照片。

上述资料用于带分析与批注的架构教学，版权属于各发布方；不声明获得了将厂商原图重新授权为本项目作品的许可。官方原文、图号、页码、日期和权利人在页面及research-data.js中保留。官方图的可见性与项目原创代码的复用许可是两件事。

PDF裁图坐标、页码、URL保存在assets/figures/source-provenance.json。没有复制第三方推理实现代码，相关内核只作职责说明并链接原仓库。

## 字体

Noto Sans SC来自Google Fonts官方仓库，采用SIL Open Font License 1.1。下载公开原字体后，在本地根据页面字符裁剪，最终字体构建无需向字体服务发送页面文字。完整许可在assets/fonts/OFL.txt。字体许可不受本项目保留权利声明收窄。

## 软件与名称

DeepInfer源码本身为Apache-2.0，DeepSeek模型仓库有独立MIT条款；本项目未复制其实现，不对其重新授权。NVIDIA、AMD、Google、Groq、Taalas、Alibaba、ByteDance、DeepSeek及其产品名归各权利人。项目没有厂商背书。

网站不加载第三方运行时脚本或统计服务；仅官方远程图和资料外链需要联网。旧0.1按原样归档，保留其历史资料日期。
