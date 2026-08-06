# AetherCore Product Updates & Semantic Changelog

> LLM/Agent context: structured semantic index for AetherCore release notes,
> website blog cards, QA checks, and product copy alignment. This file avoids
> secrets and keeps claims conservative: implemented, validated, partial,
> pending, or planned.

## Product Overview

AetherCore is a local-first desktop agent system built around a Rust runtime,
CEF desktop UI, local Ollama models, explicit tool permissions, and human
approval for sensitive actions. The current validated local model path is
`aethercore/models`, with `qwen2.5-coder:3b` exposed as the active local model.

## Chronological Timeline Index

| Version | Release Date | Primary Tags | Focus Area |
| :--- | :--- | :--- | :--- |
| **v0.4.0** | 2026-06-17 | Local AI, Qwen, Performance, CEF | on-demand Qwen, CEF performance, PT-BR demo, Dossier & IBGE Advisory |
| **v0.3.9** | 2026-06-16 | Frontend, CEF, UX, Rust | new dynamic frontend connected to sessions, ARL, activities, and permissions |
| **v0.3.8** | 2026-06-16 | Qwen, Tools, Rust, Security | textual Qwen tool intents converted into permission-aware Rust ToolUse calls |
| **v0.3.7** | 2026-06-15 | Qwen, Checkpoints, Tools | dynamic task checkpoints and unified desktop tool registry |
| **v0.3.6** | 2026-06-12 | Local AI, Qwen, Ollama, Performance | larger model cleanup and Qwen-only local desktop focus |
| **v0.3.5** | 2026-06-12 | Telegram, Gateway, UX | interactive Telegram keyboard for model/status/admin actions |
| **v0.3.2** | 2026-06-08 | Local AI, Qwen, UX | local Qwen VRAM tuning and agent checkbox correction |
| **v0.3.1** | 2026-06-08 | Compilation, Rust, Bootstrap | native release build and auto-bootstrap launcher flow |
| **v0.3.0-beta** | 2026-06-07 | Ollama, VRAM, PowerShell | transparent local Ollama proxy for VRAM allocation |
| **v0.3.0** | 2026-05-29 | Design System, Ollama, DevOps | visual redesign and local model lifecycle management |
| **v0.2.0** | 2026-05-21 | Ollama, Local AI, Performance | model path normalization and cache cleanup |
| **v0.1.8** | 2026-05-21 | Agents, Council, Architecture | local-first multi-participant planning council |
| **v0.1.7** | 2026-05-18 | UX, Excel, Agents | transparent tool rendering and XLSX stabilization |
| **v0.1.6** | 2026-05-11 | Excel, Rust, BI | native XLSX engines and write approval governance |
| **v0.1.5** | 2026-05-10 | CEF, Desktop, Rust | Chromium Embedded Framework desktop runtime |
| **v0.1.4** | 2026-05-08 | Design System, QA, UX | visual polish and launch QA |
| **v0.1.3** | 2026-05-05 | Telegram, Gateway, Security | standalone Telegram gateway with allowlist and long polling |
| **v0.1.2** | 2026-05-01 | Milestone, Rust, Validation | pre-release 0.1.0 integration and documentation reconciliation |
| **v0.1.1** | 2026-04-28 | ARL, Audit, Security | Aether Reliability Layer and guardrails |
| **v0.1.0** | 2026-04-27 | CSP, Browser, RAG | strict CSP, BrowserReal sandbox, and expanded ingestion |
| **v0.0.9** | 2026-04-13 | Architecture, Rust, API | complete internal capability catalog |
| **v0.0.8** | 2026-04-08 | Audit, Workspaces, BI | local workspace isolation and persistence audit |
| **v0.0.7** | 2026-04-04 | Desktop, GUI, Stability | desktop stabilization, uploads, secure storage, QA |
| **v0.0.6** | 2026-03-18 | Security, Sandbox, Agents | read-only, approval, and full-access governance profiles |
| **v0.0.5** | 2026-02-06 | MCP, Plugins, Extensibility | plugin manifest, stdio MCP, and slash commands |
| **v0.0.4** | 2025-12-17 | RAG, Workspaces, Embeddings | workspace persistence, documents, vault, and local RAG foundations |
| **v0.0.3** | 2025-10-29 | Uplinks, Models, Local AI | explicit separation between local engines and cloud uplinks |
| **v0.0.2** | 2025-09-11 | Sessions, Identity, Persistence | local session runtime and workspace-bound identity |
| **v0.0.1** | 2025-07-31 | Origin, Rust, Shell | initial desktop Rust shell and local-first direction |

## Detailed Semantic Increments

### v0.4.0 - Local Demo And On-Demand Inference

- **Status**: validated in local package.
- **Key delivery**: AetherCore opens without starting Ollama or loading Qwen.
- **Runtime**: local Qwen starts only when a real message needs inference.
- **Memory policy**: Ollama provider uses `keep_alive=0s` by default.
- **Frontend & UI Polish**: PT-BR copy, local demo positioning, CEF scroll tuning, reduced blur/repaint, and bundle assets aligned with the packaged desktop.
- **Expandable Tabs Navigation**: Replaced the static header navbar with Victor Welander's Expandable Tabs navigation component, dynamically synced with React Router path changes.
- **FAQ Pro Integration**: Integrated Edwin Vakayil's FAQ Pro interactive, search-enabled accordion component for local governance questions.
- **GPU-Accelerated Aurora Background**: Added Aceternity's dynamic Aurora Background behind the hero section, fully optimized to run on the GPU composite layer via `transform: translate3d(...) rotate(...)` instead of repaint-heavy `background-position` changes or fixed background attachments to guarantee buttery-smooth 60fps/120fps scrolling.
- **Dossier & Advisory Updates**: Integrated the new `/dossie` feasibility page for funding grants (Centelha Paraná) and updated the `/sobre` page to document AetherCore's team governance, including voluntary technical statistics advisory (IBGE) and the Dual-Control Audit Paradigm.

### v0.3.9 - Dynamic Frontend And Product Design System

- **Status**: implemented and packaged.
- **Key delivery**: the frontend adapted from `C:\Users\Xgm\Desktop\app` now represents actual AetherCore states.
- **Surface**: sessions, documents, local model state, ARL, approvals, permissions, runtime status, and agent activities.
- **Activity source**: the drawer consumes backend `agent_task` events instead of static demo steps.

### v0.3.8 - Qwen Tool Use With Rust Runtime Policies

- **Status**: implemented with local validation.
- **Key delivery**: textual JSON emitted by Qwen can be converted into native `ToolUse` calls when the tool is allowed.
- **Safety**: the Rust runtime applies permission policy before execution.
- **Scope**: supports the idea of local models using real workspace tools without bypassing governance.

### v0.3.7 - Dynamic Checkpoints And Tool Registry

- **Status**: implemented in desktop flow.
- **Key delivery**: checkpoints can be task-specific and model-guided instead of copying a fixed initial hub.
- **Rule**: Qwen should ask specific questions when there is real ambiguity.
- **Tooling**: desktop tools are registered in `rust/crates/tools/src/lib.rs`.

### v0.3.6 - Model Cleanup And Qwen-Only Focus

- **Status**: applied.
- **Key delivery**: larger local models were removed from the active desktop selector after RAM pressure tests.
- **Current model**: `qwen2.5-coder:3b`.
- **Current model path**: `aethercore/models`.

### v0.3.5 - Interactive Telegram Keyboard

- **Status**: implemented for the Telegram gateway.
- **Key delivery**: operational keyboard/menu for model selection, status, and admin actions.
- **Safety**: Telegram remains allowlisted and based on long polling; it does not automatically grant local desktop tool execution.

### v0.3.2 - Local Qwen VRAM And Agent Checkbox Fix

- **Status**: stabilized.
- **Key delivery**: Qwen no longer receives unsupported `think` parameters.
- **UX**: initial hub fallback became deterministic for simple greetings.
- **Error handling**: Ollama status codes are preserved more clearly.

### v0.3.1 - Native Compilation And Auto-Bootstrap

- **Status**: implemented.
- **Key delivery**: native release build and launcher redirection to ensure correct environment variables.
- **Runtime**: reduced dependence on background proxy interception.

### v0.3.0-beta - Local VRAM Proxy

- **Status**: historical bridge release.
- **Key delivery**: transparent PowerShell proxy rewrote Ollama payloads to force GPU allocation.
- **Current note**: later native builds reduced reliance on this proxy path.

### v0.3.0 - Ollama Lifecycle And Design Upgrade

- **Status**: historical design and runtime milestone.
- **Key delivery**: local Ollama lifecycle management, dark/light visual redesign, and status interceptors.

### v0.2.x - Models, Workspaces, And Local Storage

- **Status**: historical foundation.
- **Key delivery**: standardized local model storage, cache cleanup, sandboxed workspace metadata, and early agent planning structures.

### v0.1.x - Desktop Foundations

- **Status**: pre-release foundation.
- **Key delivery**: CEF desktop runtime, ARL guardrails, XLSX tools, Telegram gateway, CSP hardening, BrowserReal sandbox, secure storage, and documentation reconciliation.

### v0.0.x - Original Architecture

- **Status**: historical origin.
- **Key delivery**: Rust desktop shell, session runtime, explicit local/cloud model routing, workspaces, RAG foundations, plugins, MCP, tools, and sandbox governance.

## Blog Coverage Check

The public blog should expose, at minimum, the following recent product updates:

- v0.4.0 local demo and on-demand inference.
- v0.3.9 dynamic frontend and design system.
- v0.3.8 Qwen tool use through the Rust runtime.
- v0.3.7 dynamic checkpoints and unified tool registry.
- v0.3.6 model cleanup and Qwen-only focus.
- v0.3.5 Telegram interactive keyboard.
- v0.3.2 local Qwen VRAM and checkbox fix.
- v0.3.1 native compilation and auto-bootstrap.
- v0.3.0-beta VRAM proxy bridge.

## Current Known Limits

- CEF has an unavoidable base RAM cost even when Ollama and Qwen are not loaded.
- Qwen may need direct prompts to choose tools instead of answering only in text.
- Larger local models should stay out of the active selector until RAM/VRAM is
  revalidated.
- Older documentation may mention Hermes, Gemma, or legacy path structures; those references
  are historical unless a current note explicitly reactivates them.
