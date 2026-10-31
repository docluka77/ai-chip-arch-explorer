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

## 0.3 算子与集群资料

新增的动画、矩阵沙盘和模块图是项目原创教学表达。DeepInfer / DeepGEMM使用固定commit的公开实现作为事实依据；页面给出源码行号与可见性/架构边界。Python示例为形状准确的教学伪代码，未复制或分发第三方CUDA内核。Eyeriss / ShiDianNao论文、NVDLA官方文档、NVIDIA CUDA/CUTLASS/NCCL/网络文档和PyTorch文档以链接引用，相关原文及实现权利仍归各权利人。

真实gate/up、缩小4×4矩阵、软件CTA tile与物理Tensor Core PE阵列分别说明。网络动画独立描述具备支持条件的数据中心路径，不承诺用户GPU、NIC或软件的实际兼容性。

## 0.4 RDMA专题

用户指定微信公众号文章仅作为研究入口，未复制全文、作者照片或新闻图片进网站。产品状态标为媒体披露，官方未公开的微架构不臆造。22篇论文与标准通过作者/会议/联盟原始入口引用，作者署名、关键图页与实验条件分别保留；未分发论文PDF。

RDMA路径、SRNIC职责、packet示例、scale-up/out通信域及开销图均为原创教学重绘，不是物理floorplan或测得trace；原文、协议、第三方实现的权利独立适用。byte替换针对存储单位，ByteDance与新闻原文标题保持命名准确。

## 0.5 SRNIC原图摘录

assets/figures/rdma/ 中4张PNG是 Zilong Wang et al., SRNIC: A Scalable Architecture for RDMA NICs, NSDI 2023 的 Figure4/6/7/8，用于对应机制的教育性讨论。保留原图注，正文图外标注论文、作者入口、文件页和原文链接；版权属于原作者或雇主，不纳入本站原创保留权利声明，也不表示获得通用CC再许可。原图来源和裁切记录见同目录provenance.json。

NSDI23卷首版权条款：https://www.usenix.org/sites/default/files/nsdi23_title-organizers.pdf#page=2 。原文：https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf 。

## 0.6 文献目录

新增条目只发布本站的中文导读、事实性书目信息与原始链接；未分发新增论文全文、规范全文或第三方代码。原文、图表、规范和代码分别受原权利人及其许可约束。标准发布概览不冒充全文；厂商技术文档与论文独立评估分开。核对范围与获取限制在每张阅读卡中说明。
