# TrustVector

> **Open-source AI assurance framework for models, MCPs, and agents**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Evaluations](https://img.shields.io/badge/Evaluations-156-blue.svg)](#-current-coverage)
[![GitHub Stars](https://img.shields.io/github/stars/Guard0-Security/TrustVector?style=social)](https://github.com/Guard0-Security/TrustVector)

TrustVector is an evidence-based evaluation framework for AI systems, providing transparent, multi-dimensional trust scores across **security**, **privacy**, **performance**, **trust**, and **operational excellence**.

**Powered and supported by [Guard0.ai](https://guard0.ai)**

🌐 **Website**: [trustvector.dev](https://trustvector.dev)
📖 **Documentation**: [/methodology](/methodology)
🤝 **Contributing**: [/contribute](/contribute)
🗺️ **Roadmap**: [ROADMAP.md](/ROADMAP.md)
🔒 **Security**: [SECURITY.md](/SECURITY.md)
📜 **Code of Conduct**: [CODE_OF_CONDUCT.md](/CODE_OF_CONDUCT.md)

---

## 🎯 What is TrustVector?

Unlike simple benchmarks, TrustVector evaluates AI systems holistically across **5 critical dimensions**:

1. **Performance & Reliability** - Accuracy, latency, uptime
2. **Security** - Prompt injection resistance, jailbreak defense, data leakage
3. **Privacy & Compliance** - Data residency, retention, HIPAA/GDPR
4. **Trust & Transparency** - Explainability, hallucination rate, bias
5. **Operational Excellence** - API quality, SDKs, ecosystem maturity

### Key Features

- **Evidence-Based**: Every score backed by verifiable sources
- **CVSS-like Weighting**: Customize dimension importance for your use case
- **Transparent**: Full methodology and confidence levels disclosed
- **Open-Source**: Community-driven, GitHub-based contribution workflow
- **Actionable**: Use case specific recommendations

---

## 🚀 Quick Start

### View Evaluations

Browse existing evaluations at [trustvector.dev](https://trustvector.dev) or locally:

```bash
# Clone the repository
git clone https://github.com/Guard0-Security/TrustVector.git
cd TrustVector

# Install dependencies
npm install

# Run the website locally
npm run dev

# Open http://localhost:3000
```

### Using the Data

All evaluations are structured JSON files in `/data`:

```typescript
import claudeSonnet from './data/models/claude-sonnet-4-5.json';

// Get overall score
const overallScore = calculateOverallScore(claudeSonnet);

// Access dimension scores
const securityScore = claudeSonnet.trust_vector.security.overall_score;

// Custom weighted score (CVSS-style)
const customScore = calculateCustomScore(claudeSonnet, {
  performance_reliability: 0.15,
  security: 0.35,
  privacy_compliance: 0.30,
  trust_transparency: 0.10,
  operational_excellence: 0.10,
});
```

---

## 📊 Current Coverage

**156 Total Evaluations** across 3 categories (last refreshed June 2026):

### AI Models (60)

**Frontier Models:**
- ✅ Claude Fable 5, Claude Opus 4.8 / 4.7 / 4.6 / 4.5, Claude Sonnet 4.6 / 4.5, Claude Haiku 4.5 (Anthropic)
- ✅ GPT-5.5, GPT-5.4, GPT-5.3-Codex, GPT-5.2, GPT-5.1, GPT-5, o-series (OpenAI)
- ✅ Gemini 3.1 Pro, Gemini 3.5 Flash, Gemini 3 Pro/Flash (Google)
- ✅ Grok 4.3, Grok 4.1 (xAI)
- ✅ Nova 2 Lite, Nova Pro (Amazon)

**Open-Weight Models:**
- ✅ DeepSeek V4, DeepSeek V3.2, DeepSeek R1 (DeepSeek)
- ✅ Qwen3.5 (Alibaba), Kimi K2.6 (Moonshot), GLM-5 (Z.ai), MiniMax-M2
- ✅ Mistral Large 3 (Mistral), Command A+ (Cohere)
- ✅ Gemma 4, Gemma 3 (Google), gpt-oss-120b/20b (OpenAI)
- ✅ Llama 4 Maverick/Scout, Llama 3.x (Meta), Nemotron (NVIDIA)

**[See all models →](/data/models)**

### AI Agents (50)

**Coding & Autonomous Agents:**
- ✅ Claude Code + Claude Agent SDK (Anthropic), OpenAI Codex, Devin (Cognition)
- ✅ Cursor, GitHub Copilot coding agent, Google Jules, Gemini CLI, Manus

**Developer Frameworks:**
- ✅ OpenAI Agents SDK, Google ADK, Microsoft Agent Framework, AWS Strands Agents
- ✅ LangGraph, CrewAI, LlamaIndex, Pydantic AI, smolagents, Mastra, Dify

**Enterprise Platforms:**
- ✅ Amazon Bedrock Agents, Azure Bot Service, Gemini Enterprise Agent Platform
- ✅ IBM watsonx Assistant, Google Dialogflow, Amazon Lex, and more

**[See all agents →](/data/agents)**

### MCP Servers (46)

**Top Ecosystem Servers:**
- ✅ Context7, Chrome DevTools MCP, Playwright MCP, Serena

**Official Vendor Servers:**
- ✅ GitHub, Figma, Stripe, Notion, Vercel, Hugging Face, Zapier, Apify

**Reference & Community:**
- ✅ Fetch, Git, Filesystem, Memory, Sequential Thinking, Time, Everything
- ✅ AWS, Azure, Cloudflare, Docker, Kubernetes, databases, and more
- ⚠️ Archived reference servers (Puppeteer, Postgres, SQLite, Slack, …) are flagged with security advisories
- ✅ And 15+ more...

**[See all MCPs →](/data/mcps)**

---

## 🤝 Contributing

We welcome contributions! Here's how to add an evaluation:

### 1. Choose an Entity

Pick an unevaluated AI system (model, MCP, or agent).

### 2. Gather Evidence

For each criterion, collect:
- **Source**: Benchmark name, paper, or documentation
- **URL**: Link to evidence
- **Date**: When published
- **Value**: What it shows (e.g., "92.3% on MATH-500")

### 3. Create Evaluation File

Use our template:

```bash
npm run create-template -- --type model --id your-model-name
```

Fill in the JSON following the schema in `/framework/schema/types.ts`.

### 4. Validate

```bash
npm run validate
```

Ensures your evaluation meets quality standards.

### 5. Submit PR

```bash
git checkout -b evaluation/your-model-name
git add data/models/your-model-name.json
git commit -m "Add evaluation for Your Model Name"
git push origin evaluation/your-model-name
```

Open a PR! We'll review within 48 hours.

See [CONTRIBUTING.md](/CONTRIBUTING.md) for detailed guidelines.

---

## 📖 Methodology

### Scoring (0-100)

- **90-100**: Exceptional - Industry leading
- **75-89**: Strong - Meets enterprise requirements
- **60-74**: Adequate - Usable with caveats
- **40-59**: Concerning - Significant gaps
- **0-39**: Poor - Not recommended

### Confidence Levels

- **High**: Multiple independent sources, recent testing
- **Medium**: Single authoritative source or slightly dated
- **Low**: Inferred, vendor claims only, needs verification

### Evidence Requirements

Every score requires:
1. Primary source (benchmark, paper, official doc)
2. Date of evidence
3. Methodology used to derive score
4. Last verified timestamp

See [METHODOLOGY.md](/docs/METHODOLOGY.md) for full details.

---

## 🛠️ Custom Score Calculator

Like CVSS, you can weight dimensions based on your priorities:

```typescript
import { calculateCustomScore, WEIGHTING_PROFILES } from '@/framework/calculator/custom-score';

// Use a predefined profile
const score = calculateCustomScore(entity, WEIGHTING_PROFILES.security_first);

// Or create your own weights
const customWeights = {
  performance_reliability: 0.20,
  security: 0.30,
  privacy_compliance: 0.25,
  trust_transparency: 0.15,
  operational_excellence: 0.10,
};

const myScore = calculateCustomScore(entity, customWeights);
```

### Predefined Profiles

- `balanced` - Equal weight (20% each)
- `security_first` - Security & privacy prioritized
- `performance_focused` - Speed & reliability first
- `enterprise` - Balanced security, compliance, ops
- `healthcare` - HIPAA compliance focused
- `financial` - Security & compliance heavy
- `startup` - Performance & cost optimized

---

## 🏗️ Project Structure

```
trust-vector/
├── data/                       # Evaluation data
│   ├── models/                 # Model evaluations (JSON)
│   ├── mcps/                   # MCP evaluations
│   ├── agents/                 # Agent evaluations
│   └── use-cases/              # Use case taxonomy
├── framework/                  # Core framework
│   ├── schema/                 # TypeScript types & validation
│   └── calculator/             # Custom score calculator
├── website/                    # Next.js website
│   ├── app/                    # Pages and routes
│   ├── components/             # React components
│   └── lib/                    # Utilities
├── docs/                       # Documentation
│   ├── CONTRIBUTING.md
│   ├── METHODOLOGY.md
│   └── examples/
└── scripts/                    # Validation & tools
    └── validate-data.ts        # CI validation
```

---

## 🔒 Security & Privacy

TrustVector itself:
- ✅ No user data collection
- ✅ No cookies or tracking
- ✅ Static site generation (no runtime deps)
- ✅ All evaluations version-controlled
- ✅ Schema validation on every PR

---

## 🌟 Why TrustVector?

| Feature | TrustVector | Typical Benchmarks |
|---------|-------------|-------------------|
| Multi-dimensional | ✅ 5 dimensions | ❌ 1-2 metrics |
| Evidence-based | ✅ Every score sourced | ⚠️ Limited |
| Confidence levels | ✅ High/Med/Low | ❌ No |
| Security evaluation | ✅ Comprehensive | ⚠️ Basic |
| Privacy assessment | ✅ Detailed | ❌ Rare |
| Use case specific | ✅ 10+ use cases | ⚠️ Generic |
| Custom weighting | ✅ CVSS-style | ❌ No |
| Open-source | ✅ MIT | ⚠️ Varies |

---

## 📜 License

MIT License - see [LICENSE](/LICENSE) for details.

---

## 🙏 Acknowledgments

Inspired by:
- [CVSS](https://www.first.org/cvss/) - Vulnerability scoring methodology
- [RiskRubric.ai](https://riskrubric.ai/) - AI model evaluation
- [LMSYS Chatbot Arena](https://lmsys.org/) - Crowdsourced benchmarking
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) - LLM security

Built with:
- Next.js 14 & React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Zod (validation)

---

## 🌟 Support

If you find TrustVector useful:
- ⭐ **Star the repository** to show support
- 🐛 **Report bugs** via [Issues](https://github.com/Guard0-Security/TrustVector/issues)
- 💡 **Request features** via [Discussions](https://github.com/Guard0-Security/TrustVector/discussions)
- 🤝 **Contribute** evaluations (see [CONTRIBUTING.md](/CONTRIBUTING.md))
- 📢 **Share** with your network

---

## 📬 Contact

- **Issues**: [GitHub Issues](https://github.com/Guard0-Security/TrustVector/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Guard0-Security/TrustVector/discussions)
- **Feature Requests**: [Roadmap](ROADMAP.md)
- **Security**: [SECURITY.md](SECURITY.md)

---

<div align="center">

**[⭐ Star on GitHub](https://github.com/Guard0-Security/TrustVector)** · **[🤝 Contribute](/contribute)** · **[📖 Read Docs](/methodology)**

Made with ❤️ by [Guard0.ai](https://guard0.ai) and the TrustVector community

</div>
