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
    { title: "DataStory Internship — Monthly KPI reporting", href: "#exp-datastory", meta: "SQL extraction, cleaning, validation for management reports" },
    { title: "DataStory Internship — Dashboard metrics pipeline", href: "#exp-datastory", meta: "KPI tracking for performance review" }
  ],
  excel: [
    { title: "DataStory Internship — Reporting operations", href: "#exp-datastory", meta: "Excel validation + recurring reporting workflow" },
    { title: "Audit Internship — Risk checks & transaction review", href: "#exp-audit", meta: "200+ transactions, variance/error-rate analysis" },
    { title: "Haitong Securities — Daily/weekly reporting", href: "#exp-securities", meta: "Report production based on market data" }
  ],
  tableau: [
    { title: "DataStory Internship — 10+ BI dashboards", href: "#exp-datastory", meta: "Performance tracking & leadership review dashboards" },
    { title: "Health Engagement (Project) — Visual summaries", href: "#proj-health", meta: "Insights translated into stakeholder-friendly charts" }
  ],
  python: [
    { title: "Government Social Media NLP (Project)", href: "#proj-gov-nlp", meta: "Data collection + preprocessing pipeline for 20,000 comments" },
    { title: "Health Engagement (Project) — Modelling workflow", href: "#proj-health", meta: "Modelling + analysis pipeline" }
  ],
  stata: [
    { title: "Teaching Assistant — Econometrics workshops", href: "#exp-ta", meta: "Panel data (GMM), causal inference (DiD/IV), PCA" }
  ],
  ml: [
    { title: "Teaching Assistant — Learning outcome analysis", href: "#exp-ta", meta: "Decision Trees / Neural Networks / XGBoost (supplementary)" },
    { title: "Health Engagement (Project)", href: "#proj-health", meta: "Random Forest and other approaches for driver analysis" }
  ],
  modelling: [
    { title: "Health Engagement (Project) — Multi-method modelling", href: "#proj-health", meta: "Clustering, ordinal logistic regression, SEM, etc." },
    { title: "Audit Internship — PCA-based risk scanning", href: "#exp-audit", meta: "Operational/financial risk point identification" }
  ],
  nlp: [
    { title: "Government Social Media Comment Analysis (Project)", href: "#proj-gov-nlp", meta: "Unstructured → structured engagement metrics" },
    { title: "DataStory Internship — Sentiment analysis (50K+)", href: "#exp-datastory", meta: "Brand comment sentiment insights for marketing strategy" }
  ],
  viz: [
    { title: "DataStory Internship — Dashboards for tracking", href: "#exp-datastory", meta: "Tableau dashboards + KPI monitoring" },
    { title: "DataStory Internship — ESG visualization", href: "#exp-datastory", meta: "Indicator structuring + engagement visualization" },
    { title: "Health Engagement (Project) — Insight storytelling", href: "#proj-health", meta: "Clear visuals to support recommendations" }
  ],
  risk: [
    { title: "Audit Internship — Compliance & internal control", href: "#exp-audit", meta: "Risk identification under IFRS context" }
  ],
  finance: [
    { title: "Haitong Securities — Market trend reporting", href: "#exp-securities", meta: "Price/volume comparison + investment insights" }
  ],
  storytelling: [
    { title: "Haitong Securities — Weekly insights", href: "#exp-securities", meta: "Reports + roadshow support for clients" },
    { title: "National Happiness Index (Project)", href: "#proj-happiness", meta: "Interpretable rankings + factor-attribution insights" }
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
