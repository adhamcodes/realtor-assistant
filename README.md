# AI Realtor Assistant 🤖🏡

A plug-in AI chat assistant for real estate (or any) business websites. It answers visitor
questions 24/7 and nudges interested visitors to leave their name + contact (lead capture).

This is the **service product** Adham sells: build it for a client, customize it with their
info, deploy it, and hand them a one-line embed snippet.

---

## What's in here
| File | What it does |
|------|--------------|
| `index.html` | A demo real-estate site ("Skyline Realty") with the assistant on it — your **sales demo** |
| `widget.js` | The embeddable chat bubble + window (this is what a client pastes on their site) |
| `api/chat.js` | The "secret keeper" backend — holds the API key & talks to Google Gemini |
| `README.md` | This guide |

---

## How to deploy (one time, on Vercel)
1. Push this repo to GitHub (done).
2. Go to **vercel.com → Add New → Project → import `realtor-assistant`**.
3. **Before deploying**, open **Environment Variables** and add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** *(your Gemini key from aistudio.google.com — keep it secret!)*
4. Click **Deploy**.
5. You'll get a live URL like `https://realtor-assistant.vercel.app` — open it and chat with the bubble. 🎉

> 🔑 The API key lives **only** in Vercel's settings — never in the code, never shared. That's why it's safe.

---

## How to make it "a specific client's" assistant
1. Open `api/chat.js` → edit the **`BUSINESS`** block with that client's real info
   (agency name, areas served, hours, services). That's the bot's knowledge.
2. (Optional) In the embed snippet, change `data-name` and `data-accent` to their brand + color.

## How a client adds it to THEIR website
They paste this one line into their site's HTML (before `</body>`):

```html
<script src="https://realtor-assistant.vercel.app/widget.js"
        data-api="https://realtor-assistant.vercel.app/api/chat"
        data-name="Their Business Name"
        data-accent="#1f6feb"></script>
```

That's it — the chat bubble appears on their site.

---

## Cost
- Hosting (Vercel): **free**.
- AI (Gemini): **free tier** covers lots of chats; beyond that it's a few cents per conversation.

## Model note
`api/chat.js` uses `gemini-2.0-flash`. If that ever errors, change the `MODEL` value at the top
of the file to `gemini-1.5-flash`.


---

## Lead delivery (email notifications)
When the assistant collects a visitor's name + contact + intent, it emails the lead to the agent.

**Setup (one time):**
1. Sign up free at **resend.com** → **API Keys → Create API Key** → copy it.
2. In Vercel → project → **Settings → Environment Variables**, add:
   - `RESEND_API_KEY` = your Resend key
   - `LEAD_EMAIL` = the email where leads should arrive
3. **Redeploy** (Vercel → Deployments → latest → Redeploy) so the new variables load.

**Test mode note:** Resend's default sender (`onboarding@resend.dev`) only delivers to the email you
signed up to Resend with — so set `LEAD_EMAIL` to that same email for testing. To send leads to a
real client's inbox, verify a domain in Resend (free, ~5 min) and change the `from` address in `api/chat.js`.
