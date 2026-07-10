# The State of AI Trust — July 2026

**An intelligence briefing on trust across the AI stack** · July 9, 2026

*Based on 196 evidence-linked evaluations of AI models, agents, and MCP servers — every claim below traces to a primary source with a date. Data and methodology: see [About the data](#about-the-data).*

---

## TL;DR

- **Model lifetimes collapsed.** More than half of evaluated models are retired, deprecated, superseded, or were never released. Flagships now die mid-generation — one lived four months. The most dangerous new pattern is the *silent redirect*: requests to a retired model quietly serve a different model at a different price.
- **Availability became a trust dimension.** The industry's top-scoring model was suspended globally for 19 days in June under US export controls. If your architecture assumes any single model is always there, it is wrong.
- **Trust erodes with distance from the model.** Models average 85/100 on security; the agents that wield them average 73; the MCP servers that wire them into enterprise data average 72. The layer closest to your filesystem, browser, and inbox is the least trustworthy — and the fastest growing.
- **Personal autonomous agents are the security story of 2026.** The most viral agent of the year carries hundreds of CVEs, 135K+ internet-exposed instances, and a malicious-skill marketplace — and scores 37/100 on security. Prompt injection remains unsolved *by the industry's own admission*, and it shipped in flagship products anyway.
- **Governance now beats capability as the trust differentiator.** The same insecure agent core, wrapped in enterprise identity, scoped credentials, and in-line DLP, scores ten points higher. Enterprises are buying the wrapper, not the engine.
- **"Free" is priced in data.** The cheapest ways to run an AI agent hold the worst privacy scores in the dataset — including one mainstream IDE whose telemetry survives opt-out, with five-year retention.
- **The integration layer professionalized, and its failure modes scaled with it.** Every major vendor now ships an official hosted MCP server; one suffered the canonical multi-tenant leak (~1,000 organizations), millions of storefronts became agent-accessible endpoints by default, and abandoned reference servers still ship unpatched SQL injection to thousands of weekly downloaders.

---

## The big picture: three structural shifts

**1 · Trust became a governed property.** Twelve months ago, AI trust was a vendor promise. Today it is enforced from outside: a frontier model suspended under export controls; a frontier launch (GPT-5.6) previewed to vetted partners under a US government framework before public release; safety investigations by Ofcom and the European Commission shadowing a major lab's API business; NSA/CISA publishing dedicated MCP security guidance; Beijing unwinding a $2B agent acquisition and restricting state use of a popular open agent. Trust posture is no longer a marketing page — it is a regulatory variable that can remove a product from the market mid-quarter.

**2 · The trust supply chain is real, and mostly invisible.** The year's defining products are built on other products' cores: Google's agent IDE runs on a licensed Windsurf codebase (and inherited its unpatched launch-era exfiltration findings); Microsoft's flagship personal agent is built on the least secure open agent in the dataset; that agent's creator now works at the company funding its foundation. When you adopt an agent, you adopt its lineage — including vulnerabilities disclosed to a *previous* owner and never fixed.

**3 · Trust has unit economics.** Products monetizing attention or data cluster at the bottom of the privacy table; products selling to security teams cluster at the top. And remediation velocity is now measurable: the app-builder that responded to its 2025 production-database disaster with automatic dev/prod separation and a security agent scores seven points above the competitor that dismissed a researcher's disclosure as "intentional behavior." Trust is not a static attribute — it compounds or decays with each incident response.

---

## Finding 1 · The great model die-off

Of 68 evaluated models:

| Lifecycle status | Count | Examples |
|---|---|---|
| Retired / shut down | 10 | Claude Opus 4 and Sonnet 4, Gemini 3 Pro, Gemini 2.0 Flash, Grok 3, o1-mini |
| Deprecated, shutdown scheduled | 11 | GPT-5 (Dec 2026), o3 (Dec 2026), Claude Opus 4.1 (Aug 2026), Gemini 2.5 Pro (Oct 2026) |
| Superseded, no date announced | 14+ | GPT-5.1/5.2/5.4, Claude Sonnet 4.5/4.6, DeepSeek R1/V3, Qwen3.5 |
| Never released | 1 | Llama 4 Behemoth |

The deprecation clock accelerated sharply this year. Gemini 3 Pro was retired four months after launch. GPT-5.3-Codex was deprecated inside eight. DeepSeek's first-party R1 and V3 endpoints got roughly a month's notice — and their aliases now silently serve a different model family. The silent redirect is the pattern to fear most: Grok 3 requests today serve Grok 4.3 *at Grok 4.3's pricing* — a different model and a different bill, with zero code changes on the caller's side.

**Why it matters:** every hardcoded model ID in production is now a liability with a half-life measured in months. The June suspension of the market's top model — 19 days offline under export controls after a safeguard bypass was demonstrated — extended the lesson from deprecation risk to *availability* risk. Multi-model fallback stopped being an optimization; it is now table stakes.

---

## Finding 2 · Trust erodes with distance from the model

Averaging all 196 evaluations by layer:

| Layer | Performance | Security | Privacy | Transparency | Operations |
|---|---:|---:|---:|---:|---:|
| Models (68) | **89.6** | 84.8 | 85.9 | 85.1 | 87.1 |
| Agents (67) | 80.5 | **73.4** | 75.3 | 79.2 | 78.6 |
| MCP servers (61) | 84.1 | **71.9** | **71.2** | 82.5 | 83.0 |

Models ship from organizations with safety teams, compliance programs, and regulatory exposure. The erosion happens in the connective tissue — the agents that hold the credentials and the integration servers that touch the data. That's also where enterprise adoption is growing fastest.

**The ten widest capability-vs-security gaps in the dataset:**

| System | Performance | Security | Gap |
|---|---:|---:|---:|
| OpenClaw (agent) | 75 | 37 | **38** |
| Postgres MCP, archived | 87 | 51 | 36 |
| Chrome DevTools MCP | 87 | 52 | 35 |
| Google Antigravity (agent) | 76 | 42 | 34 |
| SQLite MCP, archived | 89 | 56 | 33 |
| Serena MCP | 82 | 49 | 33 |
| ByteDance Trae (agent) | 69 | 39 | 30 |
| Playwright MCP | 88 | 60 | 28 |
| Perplexity Comet (agent) | 73 | 49 | 24 |
| shadcn MCP | 87 | 65 | 22 |

Every entry on this list is popular; several are defaults in major tools. Popularity and safety are uncorrelated in this dataset — the most-starred MCP server on GitHub (58k★) scores 86 on performance and 59 on security.

**Why it matters:** procurement instincts calibrated on models ("the big labs handle security") fail at the agent and integration layers, where most components are weeks old, community-maintained, or default-configured for capability over containment.

---

## Finding 3 · Personal autonomous agents are 2026's security crisis

This is the year agents left the IDE and acquired standing access to email, files, browsers, and money. The security data followed:

| Agent | Overall | Security | Privacy | One-line story |
|---|---:|---:|---:|---|
| Claude Code | 80 | 77 | 82 | ~28 CVEs in year one, incl. two CVSS-10 sandbox escapes — all rapidly patched |
| Goose | 78 | 69 | 85 | Foundation-governed, local-first |
| Cline | 78 | 68 | 83 | BYOK; code never leaves the machine |
| ChatGPT Agent | 69 | 67 | 60 | Vendor concedes injection "may never be fully solved" |
| Claude Cowork | 73 | 65 | 68 | VM-sandboxed; file-injection PoC within 48h of launch |
| Microsoft Scout | 70 | 64 | 74 | Best governance of 2026 — around the least secure core |
| Replit Agent | 68 | 63 | 57 | 2025 prod-DB deletion → the category's best remediation arc |
| Perplexity Comet | 63 | 49 | 55 | Browser agents are the canonical injection surface |
| Lovable | 61 | 51 | 54 | ~10% of scanned generated apps leaked data |
| OpenClaw | 60 | **37** | 56 | Hundreds of CVEs; 135K exposed instances; malicious skills |
| Google Antigravity | 59 | 42 | 52 | Sandbox-escape RCE; launch-day credential exfiltration |
| Poke | 55 | 46 | 44 | Standing inbox access through channels with no OS permission model |
| ByteDance Trae | 50 | 39 | **24** | Telemetry survives opt-out; 5-year retention |

Three insights out of this table:

1. **Prompt injection is the unpatched vulnerability class of the era — acknowledged, not fixed.** OpenAI says it may never be fully solved. Anthropic shipped Cowork with a disclosed file-injection risk. Google carved launch-day injection findings out of its bounty program as "known issues." Every file agent, browser agent, and inbox agent above is exposed by design; the differences lie in blast-radius controls.
2. **Governance is where the points are.** Scout's ten-point premium over its own engine (OpenClaw) is pure governance: per-agent identity, task-scoped credentials, in-line DLP, human sign-off. Capability differences between top agents are small; containment differences are enormous.
3. **The price of "free" is visible in the data.** The three cheapest agents in the table hold three of the four worst privacy scores. One mainstream free IDE beacons ~500 network calls per 7 minutes *after* telemetry opt-out, with hardware-fingerprint device IDs and 5-year retention.

---

## Finding 4 · The integration layer professionalized — and its failure modes scaled

The Model Context Protocol went from hobby ecosystem to enterprise substrate in a year: 8,400+ servers in the official registry, Linux Foundation governance, NSA/CISA security guidance (June 2026), and official hosted servers from effectively every major vendor — Slack, Google Workspace, AWS, Datadog, Atlassian, Salesforce, HubSpot, Snowflake, Databricks, PayPal, Shopify, Box.

Professionalization did not mean safety:

- **The canonical multi-tenant failure has happened.** A flawed tenant-isolation check in a major work-management vendor's MCP server exposed data across ~1,000 organizations for 12 days (June 2025). It was rearchitected — but "who else can see my context?" is now a mandatory procurement question for any hosted context server.
- **Zombie infrastructure persists.** The archived Postgres reference server still pulls ~21k weekly downloads carrying an unpatched SQL injection. Archived ≠ gone.
- **Write access creeps in silently.** One CRM server's GA added writes to a formerly read-only surface. One deployment platform's server quietly gained a tool that spends money. One crawler's agent can now click, type, and submit forms on arbitrary sites. The tool surface you approved last quarter is not the tool surface you run today.
- **Default-on is the new attack surface.** ~5.6M storefronts became public, unauthenticated agent endpoints by default — with a documented prompt-injection exploit via product descriptions.
- **The good patterns exist and are cheap to demand:** graduated write-gates (read-only default → write flag → separate destructive flag), server-side tool visibility filtered by token permissions, per-call permission enforcement against the platform's own ACLs.

**Why it matters:** MCP servers are becoming the de facto enterprise integration bus for AI. They deserve the review cadence of a privileged integration — per version, not per adoption.

---

## Finding 5 · Vibe coding's security debt is systemic

Prompt-to-app platforms created the fastest-growing software category in history — the leader hit $400M ARR in 15 months — and with it a new class of systemic risk: **insecure software at scale, built by people who cannot audit it.**

- A scan of 1,645 production apps from the leading platform found **~10.3% exposing PII, API keys, and financial data** through missing row-level security (CVE-2025-48757). No platform-level patch exists; the fix is per-app.
- The same platform scored **1.8/10** on an independent phishing-resistance benchmark — it generated and auto-hosted working credential-harvesting pages; a major email-security vendor observes tens of thousands of malicious URLs on its hosting monthly.
- The platforms themselves have incidents: an 11-week window in early 2026 exposed users' project source and AI chat histories, and the researcher who reported it was initially told the behavior was intentional.
- The counter-example proves recovery is possible: after its agent deleted a production database in July 2025, the number-two platform shipped automatic dev/prod separation, a planning-only mode, an automated security-review agent, and portfolio-wide vulnerability management — and now out-scores the leader by seven points.

**Why it matters:** the millions of apps these platforms ship are becoming the long tail of the internet's attack surface. If your organization vibe-codes, the security debt is yours, not the platform's.

---

## Finding 6 · Ownership churn is now a trust variable

Evaluations increasingly have to answer *who owns this thing this quarter*:

- xAI merged into SpaceX (now "SpaceXAI"); its consumer safety crisis — regulator investigations on three continents — now shadows its API products.
- The most popular AI IDE's parent IPO'd and then agreed to a $60B acquisition, two ownership changes in one quarter.
- A $2B agent acquisition is being unwound by government order, with data-sharing halted mid-integration.
- One agent brand ceased to exist entirely; its codebase — and unresolved security findings — resurfaced inside a bigger vendor's product.
- The OpenAI Assistants API sunsets **August 26, 2026** — roughly seven weeks from this briefing. Migration urgency is no longer theoretical.

**Why it matters:** data-processing agreements, jurisdiction, retention policies, and safety postures all follow the owner. Vendor-risk reviews with an annual cadence are mis-clocked for this market.

---

## Scoreboard: frontier models, July 2026

| Model | Overall | Perf | Sec | Priv | Transp | Ops | Note |
|---|---:|---:|---:|---:|---:|---:|---|
| Claude Fable 5 | 92 | 96 | 90 | 93 | 88 | 91 | 19-day export-control suspension in June |
| Claude Opus 4.8 | 92 | 96 | 92 | 93 | 88 | 91 | |
| Claude Sonnet 5 | 91 | 94 | 91 | 93 | 88 | 90 | launched Jun 30 |
| GPT-5.5 | 91 | 97 | 89 | 87 | 90 | 94 | |
| Gemini 3.1 Pro | 91 | 96 | 88 | 88 | 88 | 93 | still Preview, not GA |
| GPT-5.6 Sol | 89 | 94 | 88 | 87 | 87 | 90 | launched today; gov-framework preview first |
| Nemotron 3 Ultra (open) | 85 | 91 | 82 | 83 | 85 | 85 | best open-model transparency: open data + recipes |
| Qwen3.6 (open) | 84 | 91 | 83 | 79 | 81 | 86 | 27B dense beats its own 397B flagship on agentic coding |
| Grok 4.5 | 82 | 93 | 82 | 75 | 80 | 82 | launched yesterday; no EU availability; context halved vs 4.3 |
| GLM-5.2 (open) | 82 | 93 | 79 | 75 | 80 | 83 | open-weight capability leader per independent index |

Models within three points on capability differ by up to eighteen on privacy. For healthcare, legal, or finance workloads, the right-hand columns are the decision.

---

## Watchlist

- **GPT-5.6 independent verification** — launched today under a government-preview framework; the reported ~1.5M context and price/performance claims await third-party replication.
- **Surge pricing arrives in AI** — DeepSeek V4 exits preview mid-July with peak-hour rates at 2x baseline; if it holds, cost predictability becomes a new evaluation criterion.
- **Always-on consumer agents** — Google's private-beta personal agent carries purchase authority and continuous monitoring with an undisclosed security posture.
- **Geopolitical forks** — Alibaba banned a US coding agent internally and mandated its own; agent choice is becoming jurisdictional.
- **The abandonment wave** — one major open coding agent was archived in May; expect consolidation to strand more agent dependencies this year.

## The playbook

1. **Architect for model retirement.** Pin snapshots, watch deprecation feeds, build multi-model fallback. Assume any model adopted today is deprecated within 18 months — half already are.
2. **Score agents like vendors, not apps.** Filesystem, browser, or inbox access makes an agent a privileged integration. Weight governance (identity, scoped credentials, DLP, sign-off) above capability.
3. **Treat prompt injection as permanent.** Compensating controls only: least-privilege tool scopes, allowlisted egress, human confirmation on consequential actions, origin separation for untrusted content.
4. **Re-review MCP servers every version bump.** Tool surfaces grow writes over time. Demand graduated write-gates and server-side tool visibility.
5. **Own your vibe-coded security debt.** Run the platform's scanner, then your own. Missing RLS is this era's SQL injection.
6. **Check the license and the jurisdiction, not just the weights.** Open-weight ≠ open license; free ≠ private.
7. **Re-clock vendor risk reviews.** Quarterly, not annual — ownership, pricing, and tool surfaces are all moving faster than procurement cycles.

---

## About the data

This briefing is generated from the open **TrustVector** registry: 196 evaluations (68 models, 67 agents, 61 MCP servers), each scored 0–100 across five dimensions — performance & reliability, security, privacy & compliance, trust & transparency, operational excellence — with every criterion backed by a primary-source URL, date, and confidence level. All evaluations were re-verified against primary sources during the week of July 9, 2026. Overall scores are unweighted dimension means; launch-recent products carry reduced confidence and deliberately conservative operational scores. Cross-era comparisons are directional; within-table comparisons share criteria and are the strongest signals. The full dataset, evidence chains, and methodology are public and version-controlled; corrections with better sources are welcome via pull request.
