/* ============================================================
   AI Realtor Assistant — embeddable chat widget
   A client adds this to their site with ONE line:
     <script src="https://YOUR-DEPLOY.vercel.app/widget.js"
             data-api="https://YOUR-DEPLOY.vercel.app/api/chat"
             data-name="Skyline Realty"></script>
   ============================================================ */
(function () {
  var script = document.currentScript || {};
  var API = script.getAttribute && script.getAttribute("data-api")
    ? script.getAttribute("data-api")
    : "/api/chat";
  var BRAND = (script.getAttribute && script.getAttribute("data-name")) || "Skyline Realty";
  var ACCENT = (script.getAttribute && script.getAttribute("data-accent")) || "#1f6feb";

  // ---- styles ----
  var css = `
  .ra-btn{position:fixed;right:22px;bottom:22px;width:62px;height:62px;border-radius:50%;background:${ACCENT};
    box-shadow:0 10px 30px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;cursor:pointer;
    z-index:2147483000;transition:transform .2s;border:none}
  .ra-btn:hover{transform:scale(1.06)}
  .ra-btn svg{width:28px;height:28px;fill:#fff}
  .ra-win{position:fixed;right:22px;bottom:96px;width:370px;max-width:calc(100vw - 32px);height:540px;max-height:calc(100vh - 130px);
    background:#fff;border-radius:18px;box-shadow:0 24px 70px rgba(0,0,0,.3);display:none;flex-direction:column;overflow:hidden;
    z-index:2147483000;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
  .ra-win.ra-open{display:flex;animation:ra-pop .25s ease}
  @keyframes ra-pop{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  .ra-head{background:${ACCENT};color:#fff;padding:16px 18px;display:flex;align-items:center;gap:10px}
  .ra-head .ra-dot{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e}
  .ra-head b{font-size:15px;font-weight:600;line-height:1.1}
  .ra-head small{display:block;opacity:.85;font-weight:400;font-size:12px}
  .ra-head .ra-x{margin-left:auto;cursor:pointer;font-size:20px;opacity:.9;background:none;border:none;color:#fff}
  .ra-body{flex:1;overflow-y:auto;padding:16px;background:#f6f8fb;display:flex;flex-direction:column;gap:10px}
  .ra-msg{max-width:82%;padding:11px 14px;border-radius:14px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
  .ra-bot{background:#fff;border:1px solid #e6eaf0;color:#1a2233;align-self:flex-start;border-bottom-left-radius:4px}
  .ra-user{background:${ACCENT};color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
  .ra-typing{align-self:flex-start;color:#8a97a8;font-size:13px;padding:4px 6px}
  .ra-foot{display:flex;gap:8px;padding:12px;border-top:1px solid #eef1f5;background:#fff}
  .ra-foot input{flex:1;border:1px solid #dde3ec;border-radius:999px;padding:11px 16px;font-size:14px;outline:none}
  .ra-foot input:focus{border-color:${ACCENT}}
  .ra-foot button{background:${ACCENT};border:none;color:#fff;width:42px;height:42px;border-radius:50%;cursor:pointer;font-size:17px;flex-shrink:0}
  .ra-credit{text-align:center;font-size:10.5px;color:#aeb7c4;padding:0 0 8px;background:#fff}
  `;
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // ---- elements ----
  var btn = document.createElement("button");
  btn.className = "ra-btn";
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.3 1.1 4.4 2.9 5.9L4 21l4.3-1.8c1.1.3 2.4.5 3.7.5 5.5 0 10-3.8 10-8.7S17.5 3 12 3z"/></svg>';

  var win = document.createElement("div");
  win.className = "ra-win";
  win.innerHTML =
    '<div class="ra-head"><span class="ra-dot"></span><span><b>' + BRAND + ' Assistant</b><small>Typically replies instantly</small></span><button class="ra-x" aria-label="close">&times;</button></div>' +
    '<div class="ra-body" id="ra-body"></div>' +
    '<div class="ra-credit">⚡ AI assistant</div>' +
    '<div class="ra-foot"><input id="ra-input" placeholder="Ask me anything..." autocomplete="off"><button id="ra-send" aria-label="send">➤</button></div>';

  document.body.appendChild(btn);
  document.body.appendChild(win);

  var body = win.querySelector("#ra-body");
  var input = win.querySelector("#ra-input");
  var messages = [];

  function add(role, text) {
    var d = document.createElement("div");
    d.className = "ra-msg " + (role === "user" ? "ra-user" : "ra-bot");
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function open() {
    win.classList.add("ra-open");
    if (messages.length === 0) {
      var hi = "Hi! 👋 I'm " + BRAND + "'s assistant. Looking to buy, sell, or rent? Ask me anything!";
      messages.push({ role: "assistant", content: hi });
      add("assistant", hi);
    }
    setTimeout(function () { input.focus(); }, 100);
  }
  function close() { win.classList.remove("ra-open"); }

  btn.addEventListener("click", function () { win.classList.contains("ra-open") ? close() : open(); });
  win.querySelector(".ra-x").addEventListener("click", close);

  async function send() {
    var text = input.value.trim();
    if (!text) return;
    input.value = "";
    add("user", text);
    messages.push({ role: "user", content: text });

    var typing = document.createElement("div");
    typing.className = "ra-typing";
    typing.textContent = BRAND + " is typing…";
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    try {
      var r = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages }),
      });
      var data = await r.json();
      typing.remove();
      var reply = data.reply || "Sorry, please try again.";
      messages.push({ role: "assistant", content: reply });
      add("assistant", reply);
    } catch (e) {
      typing.remove();
      add("assistant", "Hmm, I couldn't connect. Please try again in a moment.");
    }
  }

  win.querySelector("#ra-send").addEventListener("click", send);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });
})();
