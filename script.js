// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.classList.add("visible");
  }
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// ===== Year in footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Project filter chips =====
const chips = document.querySelectorAll(".chip");
const projects = document.querySelectorAll(".project");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;

    projects.forEach(p => {
      const tags = (p.dataset.tags || "").split(",").map(s => s.trim());
      const show = (f === "all") || tags.includes(f);
      p.style.display = show ? "" : "none";
    });
  });
});

// ===== Skills evidence mapping =====
const evidence = {
  sql: [
    { title: "DataStory Internship — Reporting & dashboards", href: "#exp-datastory", meta: "Monthly reporting, KPI extraction & validation" },
    { title: "National Happiness Index (Project)", href: "#proj-happiness", meta: "Index construction + analysis pipeline" }
  ],
  excel: [
    { title: "Audit Internship — Financial analysis", href: "#exp-audit", meta: "Variance / error-rate analysis, PCA" },
    { title: "Haitong Securities — Market reporting", href: "#exp-securities", meta: "Daily/weekly reports and data compilation" }
  ],
  tableau: [
    { title: "DataStory Internship — 10+ dashboards", href: "#exp-datastory", meta: "BI dashboards for performance tracking" }
  ],
  python: [
    { title: "Government Social Media NLP (Project)", href: "#proj-gov-nlp", meta: "Data pipeline + text processing" },
    { title: "TA — ML analysis for learning outcomes", href: "#exp-ta", meta: "Decision Trees / XGBoost / NN (supplementary)" }
  ],
  stata: [
    { title: "TA — Econometrics workshops", href: "#exp-ta", meta: "Panel data (GMM), PCA, DiD, IV" }
  ],
  ml: [
    { title: "TA — Student performance modelling", href: "#exp-ta", meta: "ML models to identify predictors" },
    { title: "Health Engagement (Project)", href: "#proj-health", meta: "Random Forest and other approaches" }
  ],
  modelling: [
    { title: "Health Engagement (Project)", href: "#proj-health", meta: "Multiple modelling approaches + SEM" },
    { title: "Audit Internship", href: "#exp-audit", meta: "PCA + analytical checks" }
  ],
  nlp: [
    { title: "Government Social Media NLP (Project)", href: "#proj-gov-nlp", meta: "20,000 comments pipeline" },
    { title: "DataStory — Sentiment analysis", href: "#exp-datastory", meta: "50K+ comments sentiment insights" }
  ],
  viz: [
    { title: "DataStory — Tableau dashboards", href: "#exp-datastory", meta: "Visualization for leadership review" },
    { title: "Health Engagement (Project)", href: "#proj-health", meta: "Tableau visualizations for strategy" }
  ],
  risk: [
    { title: "Audit Internship — Compliance & control", href: "#exp-audit", meta: "Risk points + governance exposure" }
  ],
  finance: [
    { title: "Haitong Securities — Market & industry reporting", href: "#exp-securities", meta: "Market trends and portfolio insights" }
  ],
  storytelling: [
    { title: "Haitong Securities — Weekly insights", href: "#exp-securities", meta: "Insights delivered to clients" },
    { title: "National Happiness Index (Project)", href: "#proj-happiness", meta: "Policy-oriented recommendations" }
  ]
};

const evidenceBox = document.getElementById("evidence-box");
const evidenceDesc = document.getElementById("evidence-desc");
const skillBtns = document.querySelectorAll(".skill-item");

function renderEvidence(skillKey, label) {
  evidenceBox.innerHTML = "";
  const items = evidence[skillKey] || [];
  evidenceDesc.textContent = items.length
    ? `Evidence for ${label}:`
    : `No evidence mapped yet for ${label}. (You can add links in script.js)`;

  items.forEach(it => {
    const div = document.createElement("div");
    div.className = "evidence-item";
    div.innerHTML = `
      <a href="${it.href}">${it.title}</a>
      <div class="evidence-meta">${it.meta}</div>
    `;
    evidenceBox.appendChild(div);
  });
}

skillBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    skillBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const key = btn.dataset.skill;
    const label = btn.textContent.trim();
    renderEvidence(key, label);
  });
});

// Default select a skill on load
const defaultSkill = document.querySelector('.skill-item[data-skill="sql"]');
if (defaultSkill) defaultSkill.click();
