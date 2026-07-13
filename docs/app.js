/* Step engine: renders one node at a time, keeps history for Back,
   persists position so a refresh doesn't lose the call. */

(function () {
  const view = document.getElementById("view");
  const rail = document.getElementById("stageRail");
  const backBtn = document.getElementById("backBtn");
  const restartBtn = document.getElementById("restartBtn");
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayBody = document.getElementById("overlayBody");
  const overlayClose = document.getElementById("overlayClose");

  const STORE_KEY = "call-assistant-state";

  let state = load() || { nodeId: "start", history: [] };
  if (!DATA.tree[state.nodeId]) state = { nodeId: "start", history: [] };

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)); }
    catch { return null; }
  }

  function save() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  function go(nodeId) {
    state.history.push(state.nodeId);
    state.nodeId = nodeId;
    save();
    render();
  }

  function back() {
    if (!state.history.length) return;
    state.nodeId = state.history.pop();
    save();
    render();
  }

  function restart() {
    state = { nodeId: "start", history: [] };
    save();
    render();
  }

  /* ---------- rendering ---------- */

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderRail(stageIndex) {
    rail.innerHTML = "";
    DATA.stages.forEach((name, i) => {
      const step = el("div", "rail-step", name);
      if (i < stageIndex) step.classList.add("done");
      if (i === stageIndex) step.classList.add("current");
      rail.appendChild(step);
    });
  }

  function renderSayCards(container, node) {
    const cards = el("div", "cards");
    node.say.forEach((variant, i) => {
      const card = el("div", "say-card");
      if (i === 0) card.appendChild(el("div", "eyebrow", "Say"));
      if (node.say.length > 1) card.appendChild(el("div", "variant-label", variant.label));
      card.appendChild(el("p", "say-text", variant.text));
      cards.appendChild(card);
    });
    if (node.tip) {
      const tip = el("div", "tip-card");
      tip.appendChild(el("span", null, node.tip));
      cards.appendChild(tip);
    }
    container.appendChild(cards);
  }

  function renderOptions(container, options, label) {
    const wrap = el("div", "options");
    wrap.appendChild(el("div", "options-label", label));
    options.forEach((opt, i) => {
      const btn = el("button", "option-btn" + (opt.primary ? " primary" : ""));
      const main = el("span", "option-main");
      main.appendChild(el("span", "key-hint", String(i + 1)));
      main.appendChild(el("span", null, opt.label));
      btn.appendChild(main);
      btn.appendChild(el("span", "arrow", "→"));
      btn.addEventListener("click", () => go(opt.to));
      wrap.appendChild(btn);
    });
    container.appendChild(wrap);
  }

  function renderScript(node) {
    view.appendChild(el("h1", "step-title", node.title));
    renderSayCards(view, node);
    renderOptions(view, node.options, node.optionsLabel || (node.options.length > 1 ? "They respond" : "Next"));
  }

  function renderDiscovery(node) {
    view.appendChild(el("h1", "step-title", node.title));

    const lead = el("div", "say-card");
    lead.appendChild(el("div", "eyebrow", "Open with"));
    lead.appendChild(el("p", "say-text", node.lead));
    view.appendChild(lead);

    const list = el("div", "q-list");
    list.style.marginTop = "12px";
    const head = el("div", "q-list-head");
    head.appendChild(el("div", "options-label", "Work through, tap to mark asked"));
    list.appendChild(head);
    node.questions.forEach((q) => {
      const item = el("button", "q-item");
      item.appendChild(el("span", "q-mark"));
      item.appendChild(el("span", "q-text", q));
      item.addEventListener("click", () => item.classList.toggle("asked"));
      list.appendChild(item);
    });
    view.appendChild(list);

    const situations = el("div", "situations");
    situations.appendChild(el("div", "options-label", "If they say"));
    const chips = el("div", "chip-row");
    chips.style.marginTop = "8px";
    const reveal = el("div", "vp-reveal");

    node.situations.forEach((s) => {
      const chip = el("button", "chip", s.label);
      chip.addEventListener("click", () => {
        const isActive = chip.classList.contains("active");
        chips.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        reveal.innerHTML = "";
        if (!isActive) {
          chip.classList.add("active");
          const card = el("div", "say-card");
          card.appendChild(el("div", "eyebrow", "Respond"));
          card.appendChild(el("p", "say-text", s.vp));
          reveal.appendChild(card);
        }
      });
      chips.appendChild(chip);
    });

    situations.appendChild(chips);
    situations.appendChild(reveal);
    view.appendChild(situations);

    if (node.angle) view.appendChild(el("p", "angle", node.angle));

    renderOptions(view, [{ label: node.next.label, to: node.next.to, primary: true }], "When you have enough");
  }

  function renderEnd(node) {
    const card = el("div", "end-card" + (node.tone === "success" ? " success" : ""));
    card.appendChild(el("h1", "end-title", node.title));
    card.appendChild(el("p", "end-text", node.text));
    const list = el("ul", "check-list");
    node.checklist.forEach((c) => list.appendChild(el("li", null, c)));
    card.appendChild(list);
    view.appendChild(card);

    renderOptions(view, [{ label: "Start the next call", to: "start", primary: node.tone === "success" }], "Wrap up");
  }

  function render() {
    const node = DATA.tree[state.nodeId];
    view.innerHTML = "";
    renderRail(node.stage);

    if (node.kind === "script") renderScript(node);
    else if (node.kind === "discovery") renderDiscovery(node);
    else renderEnd(node);

    backBtn.disabled = state.history.length === 0;
    window.scrollTo(0, 0);
  }

  /* ---------- overlays ---------- */

  function openPanel(key) {
    const panel = DATA.panels[key];
    overlayTitle.textContent = panel.title;
    overlayBody.innerHTML = "";
    panel.sections.forEach((section) => {
      const sec = el("div", "panel-section");
      sec.appendChild(el("h3", null, section.heading));
      const ul = el("ul");
      section.items.forEach((item) => ul.appendChild(el("li", null, item)));
      sec.appendChild(ul);
      overlayBody.appendChild(sec);
    });
    overlay.hidden = false;
    overlayBody.scrollTop = 0;
    overlayClose.focus();
  }

  function closePanel() {
    overlay.hidden = true;
  }

  document.querySelectorAll(".jump-btn").forEach((btn) => {
    btn.addEventListener("click", () => openPanel(btn.dataset.panel));
  });

  overlayClose.addEventListener("click", closePanel);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePanel();
  });

  /* ---------- keyboard ---------- */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") return closePanel();
    if (!overlay.hidden) return;
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (e.key >= "1" && e.key <= "9") {
      const buttons = view.querySelectorAll(".option-btn");
      const idx = Number(e.key) - 1;
      if (buttons[idx]) buttons[idx].click();
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      back();
    }
  });

  backBtn.addEventListener("click", back);
  restartBtn.addEventListener("click", restart);

  render();
})();
