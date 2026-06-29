# 🧭 Adham — AI Chatbot Business: Context & Resume Prompt

> Save-point for continuing in a fresh chat. Read the **"PROMPT TO START A NEW CHAT"** at the bottom and paste it into a new session.

---

## 👤 Who I am
- **Adham** — beginner dev, working with an Opus model (via the Kiro Web interface) as my build partner.
- **Goal:** earn a real income (~$70–100/week to start) fast, legally.
- **Contact:** `adhammahmood83@gmail.com` · WhatsApp `+8801811643000` · Fiverr `fiverr.com/s/2K3qBNr`

## 🔄 The strategy (current)
Landing-page freelancing is too commoditized in 2026 (AI lets anyone DIY). **Pivoted to selling AI automation — specifically: custom AI website chatbots/assistants for businesses, starting with REAL ESTATE AGENTS.**
- **Model:** a *service* (done-for-you), NOT a SaaS. Few clients at $150–300 setup + $30–50/mo.
- **Why real estate:** agents have money, live on leads, are non-technical → easy "yes."
- The bottleneck is **distribution (getting clients)**, not building. Building is done with my AI partner.

## 🤝 How I want the AI to work with me ("captain mode")
- Be the **lead decision-maker**: propose the plan, make technical calls, give **ordered, click-by-click** steps. ELI10. Be **honest about risks**. Small testable batches. Reassure me.
- I **cannot access the filesystem** (browser). Surface code, use **GitHub + push**, deploy to **Vercel**, give **live links**.

## ✅ What's BUILT (live)
**Repo:** `adhamcodes/realtor-assistant` → deployed on **Vercel** (auto-deploys on push to `main`).
- **`index.html`** — a demo real-estate site ("Skyline Realty") with the chatbot on it = the **sales demo**.
- **`widget.js`** — the embeddable chat bubble (clients paste one `<script>` line to add it).
- **`api/chat.js`** — backend "secret keeper": holds the API key, calls Google **Gemini**, captures leads.
- **Model:** `gemini-2.5-flash-lite` (free-tier on my account; `gemini-2.0-flash` had 0 free quota).
- **Lead delivery:** when the bot collects name + contact + intent, it emails the lead via **Resend** to `LEAD_EMAIL`.

**Vercel environment variables set:**
- `GEMINI_API_KEY` — from aistudio.google.com (free)
- `RESEND_API_KEY` — from resend.com (free)
- `LEAD_EMAIL` — my Gmail (also my Resend signup email, required for Resend test mode)

**Status:** ✅ Day 1 (it talks) and ✅ Day 2 (it emails leads) both DONE and verified working.

## 🛠️ How to customize for a real client (delivery)
1. Edit the **`BUSINESS`** text block in `api/chat.js` with the client's real info (name, areas, hours, services).
2. (Optional) change `data-name` / `data-accent` in the embed snippet to their brand.
3. Give them the one-line embed snippet (in README) to paste on their site.
4. For leads to reach a real client's inbox: verify a domain in Resend (free, ~5 min) and update the `from` address.

## ⏭️ The 7-day plan & where we are
- ✅ Day 1 — Build the chatbot (talks)
- ✅ Day 2 — Lead capture + email delivery
- ⬜ Day 3 — Make per-client setup trivial / polish
- ⬜ Day 4–5 — Build a 1-page **service offer site** (the pitch) + finalize pricing
- ⬜ Day 6 — Outreach prep: list of ~30–50 real estate agents + messages + demo video
- ⬜ Day 7 — Launch outreach; land first client → customize → deploy → get paid (via Fiverr/invoice → Payoneer)

## 🔑 Other assets
- **Portfolio:** `adhamcodes/My-Portfolio` → live at `portfolio-adham-mu.vercel.app` (premium, interactive).
- **Repos:** `realtor-assistant` (this), `My-Portfolio`, `web-demos` (older demos), `SwipeIQ` (old project, not current focus).

---

## 🟢 PROMPT TO START A NEW CHAT
```
You are my "captain" — lead developer & strategist. Make the decisions, give ordered click-by-click steps, explain in simple ELI10 terms, be honest about risks, work in small testable batches. I'm on a browser (no filesystem access) — surface code, push to GitHub, deploy to Vercel, give live links.

CONTEXT: I'm Adham, a beginner. Goal: earn ~$70-100/week fast. We pivoted away from commoditized landing pages to selling CUSTOM AI WEBSITE CHATBOTS to businesses (starting niche: REAL ESTATE AGENTS). It's a done-for-you service ($150-300 setup + $30-50/mo), not a SaaS. The bottleneck is getting clients, not building.

ALREADY BUILT & LIVE (repo adhamcodes/realtor-assistant, deployed on Vercel):
- A real estate chatbot: demo site (index.html), embeddable widget (widget.js), backend (api/chat.js) using Google Gemini model "gemini-2.5-flash-lite".
- It answers visitors 24/7 AND captures leads (name+contact+intent) and emails them via Resend.
- Vercel env vars: GEMINI_API_KEY, RESEND_API_KEY, LEAD_EMAIL. Both Day 1 (talks) and Day 2 (emails leads) are DONE and working.
- To customize per client: edit the BUSINESS block in api/chat.js + give them the embed <script> snippet.

NEXT STEPS: Day 3 = make per-client setup easy/polish. Day 4-5 = build a 1-page service offer site + pricing. Day 6 = outreach prep (list of real estate agents + messages + demo video). Day 7 = launch outreach to land the first client.

My portfolio: adhamcodes/My-Portfolio (live at portfolio-adham-mu.vercel.app). Contact: adhammahmood83@gmail.com, Fiverr fiverr.com/s/2K3qBNr.

Pick up from here. Read CONTEXT.md in the adhamcodes/realtor-assistant repo for full details.
```

---
*Last updated: Day 2 complete — chatbot live, talks, and emails leads. Next: client-ready polish + offer page + outreach.*
