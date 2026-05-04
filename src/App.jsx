import { useState } from "react";

// ── DATA FROM EXCEL + ENRICHED WITH RESOURCES & PROJECTS ──────────────────
const phases = [
  {
    id: 1,
    label: "PHASE 1",
    title: "The Full Foundation",
    months: "Month 1 – 3",
    color: "#00D4FF",
    accent: "rgba(0,212,255,0.08)",
    border: "rgba(0,212,255,0.25)",
    icon: "🧱",
    salaryUnlock: "₹8–14 LPA",
    tagline: "Build the bedrock. No shortcuts here — this pays dividends forever.",
    sections: [
      {
        name: "The Reasoning Layer",
        month: "Month 1",
        color: "#00D4FF",
        topics: [
          {
            name: "Python Fundamentals",
            subtopics: ["Reading & comprehending code (not just writing)", "Debugging strategies & error interpretation", "Best practices: naming, modularity, organization", "OOP: classes, inheritance, dunder methods", "Decorators, generators, context managers", "Async/await basics"],
            resource: "Corey Schafer Python Series (YouTube) + CS50P Harvard (free)",
            tip: "You already know basics — focus on OOP and decorators. 1 week max.",
          },
          {
            name: "NumPy",
            subtopics: ["Array thinking vs iteration mindset", "Vectorization — the key to fast ML code", "Broadcasting rules", "Memory efficiency & strides", "Universal functions (ufuncs)"],
            resource: "NumPy official tutorial + Kaggle NumPy (free)",
            tip: "Write every loop as a vectorized operation. This habit saves hours later.",
          },
          {
            name: "Pandas",
            subtopics: ["DataFrame operations & indexing", "Data manipulation: merge, groupby, pivot", "Performance optimization (avoid loops in Pandas)", "Real-world data cleaning pipelines", "GroupBy, merge, apply"],
            resource: "Kaggle Pandas Course (free) — 4 hours, very practical",
            tip: "Kaggle course is the best for this. Do it with a real dataset (IPL/Zomato).",
          },
          {
            name: "Statistics",
            subtopics: ["Quantifying uncertainty", "Hypothesis testing (t-test, chi-square)", "Probability distributions (Normal, Binomial, Poisson)", "Sampling & Central Limit Theorem", "Confidence intervals", "Bayesian thinking intro"],
            resource: "StatQuest with Josh Starmer (YouTube) — entire statistics playlist (free)",
            tip: "StatQuest is the GOAT for this. Watch at 1.5x speed. Takes ~2 weeks.",
          },
          {
            name: "Linear Algebra",
            subtopics: ["Geometric intuition (not just computation)", "Matrix operations, dot products", "Vector spaces & transformations", "Eigenvalues & eigenvectors", "SVD (Singular Value Decomposition)", "ML applications of each concept"],
            resource: "3Blue1Brown 'Essence of Linear Algebra' (YouTube, free) + Khan Academy",
            tip: "3Blue1Brown is mandatory. Builds visual intuition that makes Transformers click later.",
          },
          {
            name: "Calculus",
            subtopics: ["Derivatives & partial derivatives", "Chain rule — the foundation of backpropagation", "Gradient intuition", "Optimization fundamentals", "Integrals for probability"],
            resource: "3Blue1Brown Calculus series (YouTube, free)",
            tip: "Don't need to be a calculus expert — just understand gradient descent intuitively.",
          },
        ],
        milestone: "Analyze a real dataset (IPL/Zomato/Netflix) — full EDA with stats insights + plots. Push to GitHub.",
      },
      {
        name: "Classical ML",
        month: "Month 2",
        color: "#7B61FF",
        topics: [
          {
            name: "Linear Regression (Deep Dive — Compression Anchor)",
            subtopics: ["Mathematical foundations from scratch", "Assumptions & violations", "Failure modes to know", "Cost functions (MSE, MAE, Huber)", "Regularization: Ridge (L2) & Lasso (L1)", "Residual analysis & diagnostics"],
            resource: "Andrew Ng ML Specialization – Coursera (audit free) + StatQuest",
            tip: "Master this ONE algorithm deeply. The concepts transfer to everything else.",
          },
          {
            name: "Logistic Regression",
            subtopics: ["Link functions & sigmoid derivation", "Binary & multi-class classification", "Decision boundary visualization", "Threshold selection & calibration", "ROC-AUC interpretation"],
            resource: "Andrew Ng ML Specialization (Coursera, free audit)",
            tip: "Understand why sigmoid is used. You'll need this when studying LLMs.",
          },
          {
            name: "Decision Trees",
            subtopics: ["Splitting criteria: Gini impurity & Entropy", "Pruning strategies", "Overfitting prevention", "Interpretability advantages", "Feature importance calculation"],
            resource: "StatQuest Decision Trees series (YouTube, free)",
            tip: "Best intuition builder. Implement one from scratch in Python.",
          },
          {
            name: "Random Forests",
            subtopics: ["Ensemble methods intuition", "Bagging (Bootstrap Aggregating)", "Feature importance ranking", "Out-of-bag (OOB) error", "Feature subsampling"],
            resource: "StatQuest Random Forests (YouTube, free) + Scikit-Learn docs",
            tip: "First model to try on any tabular classification task. Very robust.",
          },
          {
            name: "Gradient Boosting (XGBoost, LightGBM, CatBoost)",
            subtopics: ["Sequential tree building intuition", "XGBoost — math & parameters", "LightGBM — speed advantages", "CatBoost — categorical handling", "Silent failures & how to detect them", "Hyperparameter tuning strategies"],
            resource: "StatQuest XGBoost series + official docs (free)",
            tip: "XGBoost is the #1 Kaggle competition winner. Master it for interviews.",
          },
          {
            name: "Unsupervised Learning",
            subtopics: ["K-Means & K-Means++ initialization", "DBSCAN — density-based clustering", "Hierarchical clustering & dendrograms", "PCA — dimensionality reduction", "t-SNE / UMAP for visualization", "Anomaly detection methods", "Silhouette score evaluation"],
            resource: "StatQuest PCA + Kaggle Intro to ML (free)",
            tip: "PCA is tested in almost every ML interview. Understand it geometrically.",
          },
        ],
        milestone: "End-to-end ML pipeline: predict loan default or churn. Raw data → trained model → Streamlit app deployed live.",
      },
      {
        name: "Intro MLOps & Deployment",
        month: "Month 2.5",
        color: "#FF6B6B",
        topics: [
          {
            name: "Git & Version Control",
            subtopics: ["Repository management & structure", "Branching strategies (Git Flow)", "Collaborative workflows & PRs", "Code review best practices", ".gitignore for ML projects (large files, models)"],
            resource: "freeCodeCamp Git Full Course (YouTube, free)",
            tip: "Every project must be on GitHub from Day 1. No exceptions.",
          },
          {
            name: "Docker Fundamentals",
            subtopics: ["Why containerize ML apps", "Dockerfile creation for Python/ML apps", "Image optimization (multi-stage builds)", "Container basics: run, stop, exec", "Docker Compose for multi-service apps"],
            resource: "Docker for Beginners — freeCodeCamp (YouTube, free)",
            tip: "Learn this early. Saves you from 'it works on my machine' forever.",
          },
          {
            name: "Basic Model Deployment (FastAPI)",
            subtopics: ["FastAPI basics — async & Pydantic models", "REST API design for ML", "Model serving patterns", "Health check endpoints", "Request/response schemas with validation"],
            resource: "FastAPI Official Tutorial (free) + Amigoscode FastAPI (YouTube)",
            tip: "FastAPI is the standard for ML APIs in India's product companies.",
          },
          {
            name: "Environment Management",
            subtopics: ["Virtual environments (venv, conda)", "Dependency management: pip + poetry", "Requirements.txt & pyproject.toml", "Reproducibility best practices"],
            resource: "Real Python guide on venv (free article)",
            tip: "Always use venv. Never install packages globally.",
          },
        ],
        milestone: "Dockerize your ML model. Deploy it as a FastAPI endpoint. Test it with Postman/curl.",
      },
      {
        name: "Deep Learning Foundations",
        month: "Month 3",
        color: "#00E5A0",
        topics: [
          {
            name: "Neural Networks from Scratch",
            subtopics: ["Backpropagation in NumPy (no frameworks)", "Gradient computation & chain rule", "Activation functions (ReLU, Sigmoid, Tanh, GELU)", "Loss functions (CE, MSE, focal loss)", "Weight initialization (Xavier, He)"],
            resource: "Andrej Karpathy 'Neural Networks: Zero to Hero' (YouTube, free) — MANDATORY",
            tip: "Karpathy's series is the best thing on the internet for this. Do every exercise.",
          },
          {
            name: "PyTorch Fundamentals",
            subtopics: ["Autograd & computational graphs", "Tensor operations (GPU/CPU)", "nn.Module & custom layers", "Training loops (train/eval mode)", "Saving/loading checkpoints", "GPU memory management"],
            resource: "PyTorch Official Tutorials (free) + freeCodeCamp PyTorch course (YouTube)",
            tip: "PyTorch is the industry standard. Learn it deeply — not just copy-paste.",
          },
          {
            name: "Optimization Algorithms",
            subtopics: ["SGD with momentum", "Adam, AdamW, RMSProp", "Learning rate scheduling (cosine, linear warmup)", "When to use which optimizer", "Convergence analysis & loss curves"],
            resource: "fast.ai Practical Deep Learning (free) — Chapter 4",
            tip: "AdamW + cosine LR scheduler is the default for almost everything now.",
          },
          {
            name: "CNNs (Convolutional Neural Networks)",
            subtopics: ["Why convolutions work for spatial data", "Conv layers, filters, stride, padding", "Pooling layers (max, average)", "Famous architectures: ResNet, VGG, EfficientNet", "Transfer learning with pretrained models"],
            resource: "fast.ai Practical Deep Learning Lesson 1–3 (free)",
            tip: "Transfer learning = free performance. Always start with pretrained models.",
          },
          {
            name: "RNNs (Recurrent Neural Networks)",
            subtopics: ["Sequential processing intuition", "Vanishing & exploding gradients — why RNNs fail", "LSTM & GRU — gating mechanisms", "When RNNs vs Transformers", "Sequence modeling tasks"],
            resource: "StatQuest LSTM (YouTube, free)",
            tip: "Learn this to understand WHY Transformers replaced RNNs — critical context.",
          },
          {
            name: "Transformers",
            subtopics: ["Self-attention mechanism (math + intuition)", "Positional encoding", "Multi-head attention", "Encoder-decoder architecture", "Attention visualization & interpretation"],
            resource: "3Blue1Brown Transformers video + HuggingFace NLP Course Chapter 1–3 (free)",
            tip: "Read 'Attention Is All You Need' paper (2017). Then watch 3B1B. Then code it.",
          },
        ],
        milestone: "Fine-tune a BERT model on custom text classification. Deploy on HuggingFace Spaces (free). Share on LinkedIn.",
      },
    ],
  },
  {
    id: 2,
    label: "PHASE 2",
    title: "GenAI + Production ML",
    months: "Month 4 – 5",
    color: "#00E5A0",
    accent: "rgba(0,229,160,0.08)",
    border: "rgba(0,229,160,0.25)",
    icon: "⚡",
    salaryUnlock: "₹15–22 LPA",
    tagline: "The most in-demand skills of 2026. This phase alone can get you placed.",
    sections: [
      {
        name: "GenAI & Embeddings",
        month: "Month 4",
        color: "#00E5A0",
        topics: [
          {
            name: "Embeddings",
            subtopics: ["Word embeddings: Word2Vec, GloVe", "Sentence embeddings: Sentence-BERT", "Contextual embeddings (BERT, RoBERTa)", "Embedding geometry & cosine similarity", "Dimensionality reduction for embeddings"],
            resource: "HuggingFace NLP Course (free) + Jay Alammar blog (free)",
            tip: "Embeddings are the foundation of RAG. Understand them deeply before vector DBs.",
          },
          {
            name: "Vector Databases",
            subtopics: ["Similarity search algorithms (cosine, dot product, L2)", "HNSW indexing — how approximate nearest neighbor works", "IVF (Inverted File) indexing", "Flat search tradeoffs", "Pinecone, ChromaDB, Weaviate, Qdrant — when to use each"],
            resource: "Pinecone Learning Center (free) + ChromaDB docs (free)",
            tip: "ChromaDB for learning/prototyping. Pinecone/Qdrant for production.",
          },
          {
            name: "LLMs (Large Language Models)",
            subtopics: ["Pre-training: next-token prediction", "Fine-tuning & instruction tuning", "RLHF — aligning models with human feedback", "Architectures: GPT, BERT, T5, LLaMA, Mistral", "Model families & parameter counts", "Context windows & KV cache"],
            resource: "Andrej Karpathy LLM lecture (YouTube, free) + Anthropic & OpenAI docs (free)",
            tip: "Karpathy's 'Intro to LLMs' (1hr YouTube video) is the best single resource.",
          },
          {
            name: "Prompt Engineering",
            subtopics: ["Chain-of-thought (CoT) prompting", "Few-shot & zero-shot prompting", "System prompts & role definition", "Prompt optimization & iteration", "Output formatting (JSON, XML, structured)", "Prompt injection & security"],
            resource: "Anthropic Prompt Engineering docs (free) + promptingguide.ai (free)",
            tip: "Structured outputs (JSON mode) are most used in production. Master this.",
          },
          {
            name: "Cost Mathematics for LLMs",
            subtopics: ["Token pricing models (input/output split)", "Request cost estimation", "Scaling cost calculations", "Cache hit rates & savings", "Business model viability math"],
            resource: "OpenAI pricing page + self-study (free)",
            tip: "Interviewers LOVE asking about cost optimization. Know the numbers.",
          },
          {
            name: "RAG (Retrieval-Augmented Generation)",
            subtopics: ["RAG architecture end-to-end", "Chunking strategies: fixed, semantic, recursive", "Dense retrieval vs sparse (BM25)", "Hybrid search (dense + sparse)", "Re-ranking with cross-encoders", "Eval metrics: faithfulness, relevancy, context recall"],
            resource: "DeepLearning.AI RAG short courses (free) + LangChain RAG tutorial (free)",
            tip: "RAG is the #1 production LLM pattern. Build 2–3 RAG projects minimum.",
          },
          {
            name: "Fine-tuning LLMs",
            subtopics: ["When to fine-tune vs prompt engineer", "Cost-benefit analysis of fine-tuning", "Data requirements & quality", "LoRA (Low-Rank Adaptation) — math & intuition", "QLoRA — quantized fine-tuning", "Evaluation strategies post fine-tuning"],
            resource: "Maxime Labonne LLM Course GitHub (free) + HuggingFace PEFT docs (free)",
            tip: "LoRA/QLoRA is the standard. You can fine-tune a 7B model on a free Colab GPU.",
          },
        ],
        milestone: "RAG-based PDF Q&A system with memory, hybrid search, source citations — live demo deployed.",
      },
      {
        name: "Advanced MLOps",
        month: "Month 4.5",
        color: "#FFB347",
        topics: [
          {
            name: "Experiment Tracking",
            subtopics: ["MLflow — setup, tracking, UI", "Weights & Biases (W&B) — logging & dashboards", "Parameter & metric logging", "Artifact management", "Model versioning", "Comparison dashboards & sweeps"],
            resource: "MLflow Getting Started (free) + W&B free tier",
            tip: "W&B has a generous free tier. Use it for all your DL experiments.",
          },
          {
            name: "Model Registry",
            subtopics: ["Versioning strategies (semantic versioning)", "Metadata & lineage tracking", "Promotion: staging → production", "Rollback procedures", "A/B version comparison"],
            resource: "MLflow Model Registry docs (free)",
            tip: "Shows maturity in interviews. Most candidates skip this.",
          },
          {
            name: "Data Versioning",
            subtopics: ["DVC (Data Version Control) setup", "Dataset tracking & diffs", "Reproducibility guarantee", "Data lineage tracking", "Storage backends (S3, GCS, local)"],
            resource: "DVC official docs + tutorial (free)",
            tip: "DVC on GitHub = automatic credibility boost for your projects.",
          },
        ],
        milestone: "Add MLflow tracking + DVC data versioning to your existing ML project. Show experiment comparison dashboard.",
      },
      {
        name: "System Design & Production ML",
        month: "Month 5",
        color: "#FF4757",
        topics: [
          {
            name: "System Design for ML",
            subtopics: ["Scalability patterns for ML services", "Latency optimization strategies", "Data pipeline design", "Streaming vs batch processing tradeoffs", "Fault tolerance & redundancy", "CAP theorem for ML systems"],
            resource: "Educative System Design + YouTube 'ML System Design' playlist (free)",
            tip: "Most important for ₹25 LPA+ interviews. Practice designing out loud.",
          },
          {
            name: "Hybrid Architecture Design",
            subtopics: ["Rules-based systems + ML hybrid", "Classical ML vs LLM routing decisions", "Tiered request routing", "Cost optimization routing", "Decision logic for model selection"],
            resource: "Chip Huyen 'Designing ML Systems' book (core concepts on her blog — free)",
            tip: "Being able to choose the RIGHT tool (not always LLMs) shows senior-level thinking.",
          },
          {
            name: "Caching Strategies",
            subtopics: ["Exact match caching for LLM responses", "Semantic caching (similar queries)", "Fuzzy caching with embeddings", "Cache hit rate optimization", "Invalidation strategies"],
            resource: "GPTCache docs + Redis docs (free)",
            tip: "Semantic caching reduces LLM costs by 60–80% in production. Know this.",
          },
          {
            name: "Fallback Chains",
            subtopics: ["Error handling for ML inference", "Model cascading (expensive → cheap)", "Graceful degradation patterns", "Circuit breaker pattern", "Timeout strategies for LLMs"],
            resource: "LangChain fallbacks docs (free)",
            tip: "Every production AI system needs fallbacks. Shows production maturity.",
          },
          {
            name: "Load Balancing & Scaling",
            subtopics: ["Horizontal vs vertical scaling for ML", "Load balancing strategies", "Auto-scaling based on GPU utilization", "Traffic management (rate limiting)", "Resource optimization for inference"],
            resource: "AWS Architecture Blog (free) + Kubernetes docs",
            tip: "Know the difference between scaling CPU inference vs GPU inference.",
          },
          {
            name: "API Design for ML Systems",
            subtopics: ["RESTful principles for ML endpoints", "Pydantic schemas & validation", "Rate limiting implementation", "Authentication & API keys", "API versioning strategies", "Batch inference endpoints"],
            resource: "FastAPI Advanced Tutorial (free)",
            tip: "Design APIs that other engineers love using. Interview gold.",
          },
          {
            name: "Monitoring & Observability",
            subtopics: ["Prometheus + Grafana setup", "Latency percentiles: p50, p95, p99", "Error rate tracking & alerting", "Cost per request tracking", "Custom ML metrics"],
            resource: "Grafana free tier + Prometheus docs (free)",
            tip: "p99 latency is what customers feel. Always monitor it.",
          },
          {
            name: "Model Drift Detection",
            subtopics: ["Prediction distribution monitoring", "Feature drift: covariate shift", "Concept drift: label distribution shift", "KL divergence for drift detection", "Statistical tests (KS test, PSI)"],
            resource: "Evidently AI docs (free open-source monitoring)",
            tip: "Drift kills production models silently. Evidently AI is free & excellent.",
          },
          {
            name: "Logging & Debugging",
            subtopics: ["Structured logging (JSON logs)", "Log aggregation (ELK stack basics)", "Distributed tracing (OpenTelemetry)", "Production debugging strategies", "Profiling: cProfile, PyTorch Profiler"],
            resource: "OpenTelemetry docs + Python logging docs (free)",
            tip: "Structured logs in JSON are searchable. Never use print() in production.",
          },
        ],
        milestone: "Design a complete AI system on paper: recommendation engine or fraud detection. Present architecture with trade-offs.",
      },
    ],
  },
  {
    id: 3,
    label: "PHASE 3",
    title: "Advanced Production + Specialization",
    months: "Month 6 – 12",
    color: "#FFB347",
    accent: "rgba(255,179,71,0.08)",
    border: "rgba(255,179,71,0.25)",
    icon: "🚀",
    salaryUnlock: "₹22–40 LPA",
    tagline: "Senior-level skills. Most candidates never reach here — that's your advantage.",
    sections: [
      {
        name: "Advanced Production",
        month: "Month 6–8",
        color: "#FFB347",
        topics: [
          {
            name: "CI/CD for ML",
            subtopics: ["Continuous integration for ML code", "Automated ML testing (unit, integration, data validation)", "Continuous deployment pipelines", "Blue-green deployments for zero downtime", "Canary releases for model updates"],
            resource: "GitHub Actions docs (free) + Full Stack Deep Learning (free)",
            tip: "GitHub Actions is free for public repos. Automate everything.",
          },
          {
            name: "A/B Testing Frameworks",
            subtopics: ["Experiment design for ML", "Statistical significance (p-values, confidence)", "Traffic splitting strategies", "Metric selection (business vs technical)", "Interpreting results correctly"],
            resource: "Evan Miller A/B testing guide (free) + Netflix tech blog (free)",
            tip: "Know the math of A/B testing. Interviewers test this at senior levels.",
          },
          {
            name: "Model Evaluation in Production",
            subtopics: ["Business metrics vs technical metrics alignment", "Eval frameworks (RAGAS for RAG)", "Online vs offline evaluation", "Human-in-the-loop evaluation", "Continuous evaluation pipelines"],
            resource: "RAGAS docs (free) + HELM benchmark (free)",
            tip: "RAGAS is the standard for evaluating RAG systems. Know it well.",
          },
          {
            name: "Cost Optimization Advanced",
            subtopics: ["Model distillation (teacher-student)", "Quantization: INT8, INT4, GPTQ", "Inference batching strategies", "Dynamic model selection by request type", "Routing optimization for cost"],
            resource: "HuggingFace Optimum docs (free) + bitsandbytes library",
            tip: "4-bit quantization reduces model size 4x with minimal quality loss. Essential skill.",
          },
          {
            name: "Feature Engineering in Production",
            subtopics: ["Feature stores (Feast, Tecton)", "Online vs offline feature serving", "Feature monitoring & validation", "Pipeline optimization", "Feature versioning"],
            resource: "Feast open-source docs (free)",
            tip: "Feature stores separate the best MLOps engineers from average ones.",
          },
          {
            name: "Data Preprocessing Pipelines",
            subtopics: ["Missing data strategies (imputation, flagging)", "Outlier detection & handling", "Data validation (Great Expectations, Pandera)", "Data augmentation strategies", "Pipeline orchestration"],
            resource: "Great Expectations docs (free) + Pandera docs (free)",
            tip: "Data validation catches bugs before they reach production silently.",
          },
          {
            name: "Model Interpretability",
            subtopics: ["SHAP (SHapley Additive exPlanations) — math & code", "LIME — local interpretable explanations", "Feature importance comparison", "Partial dependence plots", "Explaining models to non-technical stakeholders"],
            resource: "SHAP docs + Christoph Molnar's Interpretable ML book (free online)",
            tip: "SHAP is used in fintech, healthcare, legal AI — high-paying niches.",
          },
          {
            name: "Incident Response & Post-mortems",
            subtopics: ["On-call practices for ML systems", "Root cause analysis methodology", "Post-mortem documentation", "Runbook creation for common failures", "Prevention & monitoring improvements"],
            resource: "Google SRE book (free online)",
            tip: "Google's SRE book is free online. Read the incident management chapters.",
          },
          {
            name: "Security for ML Systems",
            subtopics: ["Model security & IP protection", "API security (auth, rate limiting, input validation)", "Data privacy & PII handling", "Adversarial attacks on ML models", "Compliance: GDPR, SOC2 basics"],
            resource: "OWASP ML Security Top 10 (free)",
            tip: "Security awareness makes you stand out in fintech & healthcare AI roles.",
          },
          {
            name: "Infrastructure as Code",
            subtopics: ["Terraform basics for cloud resources", "Cloud resource management & tagging", "Infrastructure versioning", "Automated provisioning pipelines"],
            resource: "HashiCorp Terraform tutorials (free)",
            tip: "Terraform + GitHub Actions = full automated infrastructure. Senior-level skill.",
          },
          {
            name: "Batch Processing & Pipelines",
            subtopics: ["Batch inference architecture", "Memory management for large batches", "Throughput vs latency optimization", "Airflow DAG design for ML", "Prefect for modern pipeline orchestration"],
            resource: "Apache Airflow docs + Prefect docs (free)",
            tip: "Airflow is the industry standard. Know how to write a DAG.",
          },
          {
            name: "Streaming Data Processing",
            subtopics: ["Kafka fundamentals — topics, partitions, consumers", "Stream processing patterns", "Real-time prediction serving", "Handling late-arriving data", "Exactly-once semantics"],
            resource: "Confluent Kafka tutorials (free) + Faust Python streaming (free)",
            tip: "Kafka knowledge = fintech & e-commerce jobs. High paying niche.",
          },
          {
            name: "Multi-model Serving",
            subtopics: ["Model ensembling strategies", "Routing strategies by confidence/cost", "Shadow deployments for testing", "Graceful model transitions (blue-green)"],
            resource: "BentoML docs (free) + Triton Inference Server docs",
            tip: "Multi-model serving is how big tech runs AI at scale.",
          },
        ],
        milestone: "Full production AI system: multi-agent research assistant with monitoring, CI/CD, cloud deployment, cost tracking.",
      },
    ],
  },
];

const agentic = {
  title: "AI Agents & MCP",
  color: "#C084FC",
  icon: "🤖",
  month: "Month 5–8 (parallel)",
  note: "Not in your Excel — but CRITICAL for 2026 roles. Run this in parallel with Phase 2–3.",
  topics: [
    { name: "Agent Architectures", detail: "ReAct (Reason + Act), Plan-and-Execute, Reflexion. The mental models behind every agent." },
    { name: "LangGraph", detail: "Stateful multi-step agents using graph-based workflows. The production standard for complex agents." },
    { name: "CrewAI", detail: "Multi-agent collaboration — role-based agents that work together. Great for research & content workflows." },
    { name: "AutoGen (Microsoft)", detail: "Conversational multi-agent framework. Used in enterprise settings." },
    { name: "MCP (Model Context Protocol)", detail: "Anthropic's open standard to connect AI agents to tools, APIs, files. The USB-C of AI tooling." },
    { name: "Tool Integration", detail: "Web search, code execution, database queries, API calls — connecting agents to the real world." },
    { name: "Agent Evaluation & Reliability", detail: "Testing agent correctness, hallucination mitigation, trajectory evaluation." },
  ],
  resources: [
    "LangGraph docs + DeepLearning.AI Agents course (free)",
    "CrewAI docs (free) + AutoGen Microsoft (free)",
    "Anthropic MCP docs at modelcontextprotocol.io (free)",
  ],
  milestone: "Multi-agent system: web search agent + document reader + report writer — fully autonomous pipeline.",
};

const interviewPlan = [
  { area: "DSA / Coding", weeks: "Week 45–48", tasks: ["LeetCode: Arrays, Strings, Trees, Graphs, DP", "Target: 150 Medium problems on NeetCode.io roadmap", "Practice: 2 problems/day, 5 days/week"], resource: "NeetCode.io (free) — best structured DSA prep" },
  { area: "ML Theory Deep Dive", weeks: "Week 45–50", tasks: ["Explain every algorithm from scratch (no notes)", "Know trade-offs: when to use what", "Transformers, attention, fine-tuning — deep questions"], resource: "StatQuest + your own notes" },
  { area: "System Design (AI)", weeks: "Week 48–52", tasks: ["Design: RAG system, recommendation engine, fraud detection", "Practice drawing architecture diagrams", "Know: latency, cost, scalability trade-offs"], resource: "Chip Huyen blog + YouTube ML system design" },
  { area: "Project Deep Dive", weeks: "Ongoing", tasks: ["For EACH project: problem, solution, stack, metrics, challenges", "Prepare to whiteboard the architecture", "Know every trade-off you made"], resource: "Your own GitHub projects" },
  { area: "Behavioral / HR", weeks: "Week 51–52", tasks: ["STAR format for every story", "Leadership, conflict, failure, learning examples", "Salary negotiation: always counter by 20–30%"], resource: "Glassdoor + LinkedIn salary data" },
];

const freeResources = [
  { category: "Python & ML", items: ["Corey Schafer Python (YouTube)", "Andrew Ng ML Specialization (Coursera audit)", "StatQuest (YouTube) — stats + ML", "Kaggle Learn (all free)", "fast.ai (free)"] },
  { category: "Deep Learning", items: ["Andrej Karpathy Neural Networks Zero to Hero (YouTube)", "3Blue1Brown (YouTube)", "HuggingFace NLP Course (free)", "PyTorch Tutorials (free)", "fast.ai (free)"] },
  { category: "LLMs & RAG", items: ["DeepLearning.AI Short Courses (free)", "Maxime Labonne LLM Course (GitHub, free)", "promptingguide.ai (free)", "Anthropic & OpenAI docs (free)", "LangChain tutorials (free)"] },
  { category: "Agents", items: ["LangGraph docs (free)", "CrewAI docs (free)", "Anthropic MCP docs (free)", "DeepLearning.AI Agents course (free)", "AutoGen Microsoft (free)"] },
  { category: "MLOps", items: ["Full Stack Deep Learning (free)", "MLflow docs (free)", "DVC docs (free)", "Docker freeCodeCamp (YouTube)", "GitHub Actions docs (free)"] },
  { category: "System Design", items: ["Chip Huyen blog (free)", "Google SRE Book (free online)", "Educative system design basics (YouTube)", "Netflix tech blog (free)", "Martin Fowler blog (free)"] },
];

const Pill = ({ label, color }) => (
  <span style={{
    background: color + "18", color, border: `1px solid ${color}40`,
    borderRadius: "4px", padding: "2px 8px", fontSize: "10px",
    letterSpacing: "1px", fontWeight: "700", flexShrink: 0,
  }}>{label}</span>
);

export default function UltimateRoadmap() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [openPhase, setOpenPhase] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [openTopic, setOpenTopic] = useState(null);
  const [checked, setChecked] = useState({});

  const toggleCheck = (k) => setChecked(p => ({ ...p, [k]: !p[k] }));

  const tabs = [
    { id: "roadmap", label: "🗺️ Full Roadmap" },
    { id: "agents", label: "🤖 AI Agents" },
    { id: "interview", label: "🎯 Interview Prep" },
    { id: "resources", label: "📚 Resources" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#060A10", color: "#E2E8F0", fontFamily: "'IBM Plex Mono','Courier New',monospace" }}>
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(180deg,#0D1424 0%,#060A10 100%)",
        borderBottom: "1px solid #1A2236",
        padding: "36px 20px 28px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(0,212,255,0.07) 0%,transparent 100%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{
            display: "inline-flex", gap: "6px", alignItems: "center",
            background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)",
            borderRadius: "4px", padding: "4px 12px", fontSize: "10px", color: "#00D4FF",
            letterSpacing: "2px", marginBottom: "14px",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4FF" }} />
            COMBINED: YOUR EXCEL DATA + FULL RESEARCH • MAY 2026
          </div>
          <h1 style={{
            fontSize: "clamp(24px,4.5vw,48px)", fontWeight: "900", margin: "0 0 8px",
            background: "linear-gradient(135deg,#FFFFFF 0%,#00D4FF 45%,#7B61FF 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            letterSpacing: "-1px",
          }}>THE ULTIMATE AI ENGINEERING ROADMAP</h1>
          <p style={{ color: "#4A5568", fontSize: "13px", margin: "0 0 20px" }}>
            54 topics from your Excel · Enriched with subtopics, free resources & projects · 12-month plan · ₹25 LPA+ target
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { l: "3 Phases", v: "#00D4FF" },
              { l: "6 Sections", v: "#7B61FF" },
              { l: "54 Topics", v: "#00E5A0" },
              { l: "200+ Subtopics", v: "#FFB347" },
              { l: "100% Free Resources", v: "#FF4757" },
            ].map(s => (
              <div key={s.l} style={{
                background: s.v + "15", border: `1px solid ${s.v}30`,
                borderRadius: "6px", padding: "6px 14px", fontSize: "11px",
                color: s.v, fontWeight: "700",
              }}>{s.l}</div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ borderBottom: "1px solid #1A2236", padding: "0 20px", display: "flex", gap: 0, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: "transparent", color: activeTab === t.id ? "#00D4FF" : "#4A5568",
            border: "none", borderBottom: `2px solid ${activeTab === t.id ? "#00D4FF" : "transparent"}`,
            padding: "14px 18px", cursor: "pointer", fontSize: "12px",
            fontFamily: "inherit", fontWeight: activeTab === t.id ? "700" : "400",
            whiteSpace: "nowrap", transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "28px 16px" }}>

        {/* ── ROADMAP TAB ── */}
        {activeTab === "roadmap" && (
          <div>
            {/* Profile banner */}
            <div style={{
              background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.2)",
              borderRadius: "8px", padding: "14px 18px", marginBottom: "28px",
              fontSize: "13px", color: "#94A3B8", lineHeight: 1.7,
            }}>
              📋 <strong style={{ color: "#00E5A0" }}>Your profile:</strong> Basic Python · 1–2 hrs/day · 12-month target · ₹25 LPA+
              &nbsp;—&nbsp; This roadmap merges your uploaded Excel (54 topics) with enriched subtopics, free resources, and milestone projects tailored for your profile.
              <br />
              <strong style={{ color: "#E2E8F0" }}>Click Phase → Section → Topic</strong> to expand the full drill-down.
            </div>

            {phases.map(phase => (
              <div key={phase.id} style={{ marginBottom: "16px" }}>
                {/* Phase header */}
                <div
                  onClick={() => { setOpenPhase(openPhase === phase.id ? null : phase.id); setOpenSection(null); setOpenTopic(null); }}
                  style={{
                    background: openPhase === phase.id ? phase.accent : "#0A0F18",
                    border: `1px solid ${openPhase === phase.id ? phase.border : "#1A2236"}`,
                    borderRadius: openPhase === phase.id ? "8px 8px 0 0" : "8px",
                    padding: "20px 22px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "16px",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{
                    width: 48, height: 48, background: phase.color + "18",
                    border: `1px solid ${phase.color}40`, borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px", flexShrink: 0,
                  }}>{phase.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: 3 }}>
                      <Pill label={phase.label} color={phase.color} />
                      <Pill label={phase.months} color={phase.color} />
                      <Pill label={"Unlocks " + phase.salaryUnlock} color="#00E5A0" />
                    </div>
                    <div style={{ fontSize: "17px", fontWeight: "800", color: "#F8FAFC" }}>{phase.title}</div>
                    <div style={{ fontSize: "12px", color: "#4A5568", marginTop: 2 }}>{phase.tagline}</div>
                  </div>
                  <div style={{ color: "#4A5568", fontSize: "20px", transition: "transform 0.2s", transform: openPhase === phase.id ? "rotate(90deg)" : "none" }}>›</div>
                </div>

                {openPhase === phase.id && (
                  <div style={{
                    background: "#0A0F18", border: `1px solid ${phase.border}`,
                    borderTop: "none", borderRadius: "0 0 8px 8px", padding: "16px",
                  }}>
                    {phase.sections.map(section => (
                      <div key={section.name} style={{ marginBottom: "10px" }}>
                        {/* Section header */}
                        <div
                          onClick={() => { setOpenSection(openSection === section.name ? null : section.name); setOpenTopic(null); }}
                          style={{
                            background: openSection === section.name ? section.color + "10" : "#0D1424",
                            border: `1px solid ${openSection === section.name ? section.color + "50" : "#1A2236"}`,
                            borderRadius: openSection === section.name ? "6px 6px 0 0" : "6px",
                            padding: "14px 18px", cursor: "pointer",
                            display: "flex", alignItems: "center", gap: "12px",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", gap: "8px", marginBottom: 2, flexWrap: "wrap" }}>
                              <Pill label={section.month} color={section.color} />
                              <Pill label={`${section.topics.length} topics`} color="#4A5568" />
                            </div>
                            <div style={{ fontSize: "15px", fontWeight: "700", color: "#E2E8F0" }}>{section.name}</div>
                          </div>
                          <div style={{ color: "#4A5568", fontSize: "16px", transition: "transform 0.2s", transform: openSection === section.name ? "rotate(90deg)" : "none" }}>›</div>
                        </div>

                        {openSection === section.name && (
                          <div style={{
                            background: "#0D1424", border: `1px solid ${section.color}40`,
                            borderTop: "none", borderRadius: "0 0 6px 6px", padding: "14px",
                          }}>
                            {section.topics.map((topic, ti) => (
                              <div key={topic.name} style={{ marginBottom: "8px" }}>
                                {/* Topic header */}
                                <div
                                  onClick={() => setOpenTopic(openTopic === topic.name ? null : topic.name)}
                                  style={{
                                    background: openTopic === topic.name ? "#161E2E" : "#0A0F18",
                                    border: `1px solid ${openTopic === topic.name ? section.color + "40" : "#1A2236"}`,
                                    borderRadius: openTopic === topic.name ? "6px 6px 0 0" : "6px",
                                    padding: "12px 16px", cursor: "pointer",
                                    display: "flex", alignItems: "center", gap: "10px",
                                  }}
                                >
                                  <div style={{
                                    width: 28, height: 28, background: "#1A2236",
                                    borderRadius: "5px", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: "11px", fontWeight: "800",
                                    color: section.color, flexShrink: 0,
                                  }}>{String(ti + 1).padStart(2, "0")}</div>
                                  <div style={{ flex: 1, fontSize: "13px", fontWeight: "700", color: "#CBD5E1" }}>{topic.name}</div>
                                  <div style={{ color: "#4A5568", fontSize: "14px" }}>{openTopic === topic.name ? "▾" : "▸"}</div>
                                </div>

                                {openTopic === topic.name && (
                                  <div style={{
                                    background: "#161E2E", border: `1px solid ${section.color}30`,
                                    borderTop: "none", borderRadius: "0 0 6px 6px",
                                    padding: "16px 18px",
                                  }}>
                                    {/* Subtopics */}
                                    <div style={{ marginBottom: 14 }}>
                                      <div style={{ fontSize: "10px", color: "#4A5568", letterSpacing: "2px", marginBottom: 8 }}>SUBTOPICS TO MASTER</div>
                                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                        {topic.subtopics.map((s, si) => {
                                          const k = `${topic.name}-${si}`;
                                          return (
                                            <div
                                              key={si}
                                              onClick={() => toggleCheck(k)}
                                              style={{
                                                background: checked[k] ? section.color + "20" : "#0D1424",
                                                border: `1px solid ${checked[k] ? section.color + "60" : "#1A2236"}`,
                                                borderRadius: "5px", padding: "5px 10px",
                                                fontSize: "11px", color: checked[k] ? section.color : "#94A3B8",
                                                cursor: "pointer", transition: "all 0.15s",
                                                textDecoration: checked[k] ? "line-through" : "none",
                                                display: "flex", alignItems: "center", gap: "5px",
                                              }}
                                            >
                                              <span style={{ fontSize: "9px" }}>{checked[k] ? "✓" : "○"}</span> {s}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    {/* Resource */}
                                    <div style={{
                                      background: "#0A0F18", border: "1px solid #1A2236",
                                      borderRadius: "5px", padding: "10px 13px", marginBottom: 10,
                                    }}>
                                      <div style={{ fontSize: "10px", color: "#00E5A0", letterSpacing: "1.5px", marginBottom: 4 }}>📎 FREE RESOURCE</div>
                                      <div style={{ fontSize: "12px", color: "#94A3B8" }}>{topic.resource}</div>
                                    </div>
                                    {/* Tip */}
                                    {topic.tip && (
                                      <div style={{
                                        background: section.color + "08",
                                        border: `1px solid ${section.color}25`,
                                        borderRadius: "5px", padding: "9px 13px",
                                      }}>
                                        <div style={{ fontSize: "10px", color: section.color, letterSpacing: "1.5px", marginBottom: 3 }}>💡 PRO TIP</div>
                                        <div style={{ fontSize: "12px", color: "#CBD5E1" }}>{topic.tip}</div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}

                            {/* Section milestone */}
                            <div style={{
                              marginTop: 12,
                              background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.25)",
                              borderRadius: "6px", padding: "12px 14px",
                            }}>
                              <div style={{ fontSize: "10px", color: "#00E5A0", letterSpacing: "1.5px", marginBottom: 4 }}>🏆 SECTION MILESTONE PROJECT</div>
                              <div style={{ fontSize: "12px", color: "#CBD5E1" }}>{section.milestone}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div style={{
              marginTop: 16, background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.15)", borderRadius: "8px",
              padding: "14px 18px", fontSize: "12px", color: "#4A5568", textAlign: "center",
            }}>
              Click subtopic chips to mark them done ✓ · Track your progress topic by topic
            </div>
          </div>
        )}

        {/* ── AGENTS TAB ── */}
        {activeTab === "agents" && (
          <div>
            <div style={{
              background: "rgba(192,132,252,0.07)", border: "1px solid rgba(192,132,252,0.25)",
              borderRadius: "8px", padding: "18px 20px", marginBottom: "24px",
            }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "28px" }}>{agentic.icon}</span>
                <div>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <Pill label={agentic.title} color="#C084FC" />
                    <Pill label={agentic.month} color="#C084FC" />
                    <Pill label="NOT IN EXCEL — ADDED FROM RESEARCH" color="#FF4757" />
                  </div>
                  <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.7 }}>{agentic.note}</div>
                </div>
              </div>
            </div>

            {agentic.topics.map((t, i) => (
              <div key={t.name} style={{
                background: "#0A0F18", border: "1px solid #1A2236",
                borderRadius: "8px", padding: "16px 18px", marginBottom: "10px",
                display: "flex", gap: "14px",
              }}>
                <div style={{
                  width: 34, height: 34, background: "#C084FC18",
                  border: "1px solid #C084FC40", borderRadius: "6px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: "800", color: "#C084FC", flexShrink: 0,
                }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div style={{ fontWeight: "700", color: "#C084FC", fontSize: "14px", marginBottom: "5px" }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: "#94A3B8", lineHeight: 1.6 }}>{t.detail}</div>
                </div>
              </div>
            ))}

            <div style={{
              marginTop: "20px", background: "#0A0F18", border: "1px solid #1A2236",
              borderRadius: "8px", padding: "18px 20px",
            }}>
              <div style={{ fontSize: "10px", color: "#C084FC", letterSpacing: "2px", marginBottom: "12px" }}>📚 FREE RESOURCES FOR AGENTS</div>
              {agentic.resources.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", fontSize: "13px", color: "#94A3B8" }}>
                  <span style={{ color: "#C084FC", flexShrink: 0 }}>›</span> {r}
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "12px", background: "rgba(0,229,160,0.06)",
              border: "1px solid rgba(0,229,160,0.25)", borderRadius: "8px", padding: "14px 18px",
            }}>
              <div style={{ fontSize: "10px", color: "#00E5A0", letterSpacing: "1.5px", marginBottom: "6px" }}>🏆 MILESTONE PROJECT</div>
              <div style={{ fontSize: "13px", color: "#CBD5E1" }}>{agentic.milestone}</div>
            </div>
          </div>
        )}

        {/* ── INTERVIEW TAB ── */}
        {activeTab === "interview" && (
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px", color: "#F1F5F9" }}>Interview Prep Plan</h2>
            <p style={{ color: "#4A5568", fontSize: "13px", marginBottom: "24px" }}>Start at Month 9. Apply at Month 10. Have offers by Month 12.</p>

            {interviewPlan.map((area, i) => {
              const colors = ["#00D4FF", "#7B61FF", "#00E5A0", "#FFB347", "#FF4757"];
              const c = colors[i];
              return (
                <div key={area.area} style={{
                  background: "#0A0F18", border: `1px solid ${c}30`,
                  borderLeft: `3px solid ${c}`, borderRadius: "0 8px 8px 0",
                  padding: "18px 20px", marginBottom: "12px",
                }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
                    <div style={{ fontWeight: "700", color: c, fontSize: "14px" }}>{area.area}</div>
                    <Pill label={area.weeks} color={c} />
                  </div>
                  {area.tasks.map((task, ti) => (
                    <div key={ti} style={{ display: "flex", gap: "8px", marginBottom: "7px", fontSize: "12px", color: "#94A3B8" }}>
                      <span style={{ color: c, flexShrink: 0 }}>›</span> {task}
                    </div>
                  ))}
                  <div style={{
                    marginTop: "10px", background: "#0D1424",
                    borderRadius: "5px", padding: "8px 12px",
                    fontSize: "11px", color: "#4A5568",
                  }}>📎 {area.resource}</div>
                </div>
              );
            })}

            <div style={{
              marginTop: "20px", background: "#0A0F18",
              border: "1px solid #1A2236", borderRadius: "8px", padding: "20px",
            }}>
              <div style={{ fontSize: "11px", color: "#FFB347", letterSpacing: "2px", marginBottom: "14px" }}>💼 EXPECTED INTERVIEW ROUNDS (₹25 LPA Companies)</div>
              {[
                ["Round 1", "Online Assessment", "DSA — 2–3 LeetCode Medium in 90 minutes"],
                ["Round 2", "Technical Screen", "Python, ML concepts, explain your projects in detail"],
                ["Round 3", "AI/ML Deep Dive", "RAG design, agents, fine-tuning trade-offs, system internals"],
                ["Round 4", "ML System Design", "Design scalable RAG / recommendation / fraud detection system"],
                ["Round 5", "HR + Offer", "Negotiation — always counter by 20–30%. Know your worth."],
              ].map(([r, title, desc], i) => (
                <div key={r} style={{
                  display: "flex", gap: "12px", padding: "10px 0",
                  borderBottom: i < 4 ? "1px solid #1A2236" : "none",
                }}>
                  <div style={{ fontSize: "10px", color: "#FFB347", fontWeight: "700", minWidth: "65px", marginTop: "2px" }}>{r}</div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#E2E8F0" }}>{title}</div>
                    <div style={{ fontSize: "12px", color: "#4A5568" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "14px", background: "rgba(0,229,160,0.05)",
              border: "1px solid rgba(0,229,160,0.2)", borderRadius: "8px", padding: "18px 20px",
            }}>
              <div style={{ fontSize: "11px", color: "#00E5A0", letterSpacing: "2px", marginBottom: "12px" }}>🏢 WHERE TO APPLY IN INDIA</div>
              {[
                { tier: "Tier 1 — Highest Pay", cos: "Google, Microsoft, Amazon, NVIDIA, Atlassian (India offices)" },
                { tier: "Tier 2 — Product Companies", cos: "Flipkart, Swiggy, Zepto, Razorpay, CRED, Meesho, PhonePe, Groww" },
                { tier: "Tier 3 — AI-First Startups (fast growth)", cos: "Sarvam AI, Krutrim, Mad Street Den, Fractal Analytics, Sigmoid, Turing" },
                { tier: "Platform", cos: "LinkedIn Jobs, Naukri.com, AngelList, company career pages directly" },
              ].map((row, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "10px", color: "#00E5A0", letterSpacing: "1px", marginBottom: "3px" }}>{row.tier}</div>
                  <div style={{ fontSize: "12px", color: "#94A3B8" }}>{row.cos}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESOURCES TAB ── */}
        {activeTab === "resources" && (
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px", color: "#F1F5F9" }}>Master Free Resource List</h2>
            <p style={{ color: "#4A5568", fontSize: "13px", marginBottom: "24px" }}>Every resource you need. 100% free. No paid courses required.</p>

            {freeResources.map((cat, i) => {
              const colors = ["#00D4FF", "#7B61FF", "#FF6B6B", "#C084FC", "#FFB347", "#FF4757"];
              const c = colors[i];
              return (
                <div key={cat.category} style={{
                  background: "#0A0F18", border: `1px solid ${c}30`,
                  borderRadius: "8px", padding: "18px 20px", marginBottom: "12px",
                }}>
                  <div style={{ fontWeight: "700", color: c, fontSize: "13px", letterSpacing: "0.5px", marginBottom: "12px" }}>
                    {cat.category}
                  </div>
                  {cat.items.map((item, ii) => (
                    <div key={ii} style={{
                      display: "flex", gap: "10px", marginBottom: "8px",
                      fontSize: "13px", color: "#94A3B8",
                    }}>
                      <span style={{
                        background: "#00E5A020", color: "#00E5A0",
                        border: "1px solid #00E5A040", borderRadius: "3px",
                        padding: "1px 6px", fontSize: "9px", letterSpacing: "1px",
                        flexShrink: 0, marginTop: "2px", height: "fit-content",
                      }}>FREE</span>
                      {item}
                    </div>
                  ))}
                </div>
              );
            })}

            <div style={{
              background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)",
              borderRadius: "8px", padding: "18px 20px", marginTop: "6px",
            }}>
              <div style={{ fontSize: "11px", color: "#00D4FF", letterSpacing: "2px", marginBottom: "12px" }}>💡 HOW TO USE RESOURCES EFFECTIVELY</div>
              {[
                "One resource per topic. Finish it. Don't switch midway — completion matters.",
                "Watch at 1.5x speed. Slow down only for complex math.",
                "Code EVERY example yourself. Watching ≠ learning.",
                "Use ChatGPT/Claude as your tutor — ask it to explain anything confusing.",
                "Build the project BEFORE moving to next topic. Hands-on cements knowledge.",
                "Free tier is enough: Colab GPU, HuggingFace Spaces, Streamlit Cloud, Render.",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "9px", fontSize: "13px", color: "#94A3B8" }}>
                  <span style={{ color: "#00D4FF", flexShrink: 0 }}>›</span> {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          marginTop: "48px", borderTop: "1px solid #1A2236", paddingTop: "20px",
          textAlign: "center", fontSize: "10px", color: "#1E293B", letterSpacing: "1.5px",
        }}>
          BUILT FROM YOUR EXCEL (54 TOPICS) + RESEARCH ENRICHMENT • ₹25 LPA AI ENGINEER ROADMAP 2026
        </div>
      </div>
    </div>
  );
}