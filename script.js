// ===== Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Project filter chips (works with <details> cards)
const chips = Array.from(document.querySelectorAll(".chip"));
const projCards = Array.from(document.querySelectorAll(".proj-card"));

function setActiveChip(el){
  chips.forEach(c => c.classList.remove("active"));
  el.classList.add("active");
}

function applyFilter(tag){
  projCards.forEach(card => {
    const tags = (card.getAttribute("data-tags") || "").split(",").map(s => s.trim());
    const show = (tag === "all") || tags.includes(tag);
    card.style.display = show ? "" : "none";

    // optional: collapse hidden items
    if (!show && card.open) card.open = false;
  });
}

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    const tag = chip.getAttribute("data-filter");
    setActiveChip(chip);
    applyFilter(tag);
  });
});

// ===== Skills evidence panel
const skillTabs = Array.from(document.querySelectorAll(".skill-tab"));
const titleEl = document.getElementById("evidence-title");
const listEl = document.getElementById("evidence-list");

// You can edit these to match your real evidence.
// "anchor" links jump to the section ids you already have.
const evidenceMap = {
  sql: [
    { where: "Experience: DataStory — KPI reporting & validation", anchor: "#exp-datastory" },
    { where: "Project: National Happiness Index — data processing", anchor: "#proj-happiness" },
  ],
  tableau: [
    { where: "Experience: DataStory — BI dashboards", anchor: "#exp-datastory" },
    { where: "Projects — visualization summaries", anchor: "#projects" },
  ],
  python_nlp: [
    { where: "Project: Government Social Media Comment Analysis (NLP)", anchor: "#proj-gov-nlp" },
  ],
  modelling: [
    { where: "Project: Health Engagement — multi-model analysis", anchor: "#proj-health" },
    { where: "Education: Statistical Modelling modules", anchor: "#education" },
  ],
  market_research: [
    { where: "Experience: Haitong Securities — market reports", anchor: "#exp-securities" },
    { where: "Project: Health Engagement — indicators and recommendations", anchor: "#proj-health" },
  ],
};

function renderEvidence(skillKey, label){
  titleEl.textContent = `Usage Evidence for ${label}:`;
  listEl.innerHTML = "";

  const items = evidenceMap[skillKey] || [];
  if (items.length === 0){
    const empty = document.createElement("div");
    empty.className = "evidence-item";
    empty.textContent = "Add evidence items for this skill.";
    listEl.appendChild(empty);
    return;
  }

  items.forEach(it => {
    const div = document.createElement("div");
    div.className = "evidence-item";
    div.innerHTML = `
      <div class="where">${it.where}</div>
      <a href="${it.anchor}">View evidence →</a>
    `;
    listEl.appendChild(div);
  });
}

function setActiveSkill(tab){
  skillTabs.forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  tab.setAttribute("aria-selected", "true");
  skillTabs.filter(t => t !== tab).forEach(t => t.setAttribute("aria-selected", "false"));
}

skillTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const skillKey = tab.getAttribute("data-skill");
    const label = tab.textContent.trim();
    setActiveSkill(tab);
    renderEvidence(skillKey, label);
  });
});

// initial
renderEvidence("sql", "SQL");
