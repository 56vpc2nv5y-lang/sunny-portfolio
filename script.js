// ===== Skills evidence (tabs style) =====
// 修正重点：补全了 r_stat 和 office 的数据，并确保 key 与 HTML 的 data-skill 一致
const evidenceData = {
  sql: {
    title: "Usage Evidence for SQL:",
    items: [
      { label: "DataStory Internship — Monthly KPI reporting & validation", href: "#exp-datastory", meta: "SQL extraction, cleaning, and metric checks for management reports" },
      { label: "DataStory Internship — Dashboard metric pipeline", href: "#exp-datastory", meta: "KPI monitoring supporting performance tracking" },
      { label: "Happiness Index Project", href: "#proj-happiness", meta: "Joined multi-year public datasets for index construction" }
    ]
  },
  tableau: {
    title: "Usage Evidence for Tableau:",
    items: [
      { label: "DataStory Internship — 10+ dashboards for leadership review", href: "#exp-datastory", meta: "BI dashboards for performance tracking and reporting" }
    ]
  },
  python_nlp: {
    title: "Usage Evidence for Python (NLP):",
    items: [
      { label: "Government Social Media Comment Analysis (NLP)", href: "#proj-gov-nlp", meta: "Pipeline on 20,000 comments: preprocessing → categorization → metrics" },
      { label: "RAG-based QA System", href: "#gp-rag", meta: "Vector embeddings and semantic search pipeline" }
    ]
  },
  modelling: {
    title: "Usage Evidence for Statistical Modelling:",
    items: [
      { label: "Health Engagement via the Internet", href: "#proj-health", meta: "Driver analysis through modelling with interpretable recommendations" },
      { label: "Teaching Assistant (Econometrics)", href: "#exp-ta", meta: "Econometrics + modelling concepts taught and applied in practice" },
      { label: "Graduate Project: Advanced Statistical Modelling", href: "#gp-stat", meta: "GLM and multivariate analysis on complex datasets" }
    ]
  },
  // 补全 R Language 数据
  r_stat: {
    title: "Usage Evidence for R Language:",
    items: [
      { label: "Statistical Modelling Coursework", href: "#gp-stat", meta: "Applied GLM, hypothesis testing, and causal inference using R" },
      { label: "Econometrics TA Support", href: "#exp-ta", meta: "Assisted in troubleshooting R scripts for regression analysis" }
    ]
  },
  // 补全 Microsoft Suite 数据
  office: {
    title: "Usage Evidence for Microsoft Suite:",
    items: [
      { label: "Audit Intern @ Huaxing CPA", href: "#exp-audit", meta: "Advanced Excel for financial variance analysis and data reconciliation" },
      { label: "Investment Assistant @ Haitong", href: "#exp-securities", meta: "PowerPoint for daily/weekly market trend reporting and client insights" }
    ]
  }
};

const tabs = document.querySelectorAll(".skill-tab");
const evidenceTitle = document.getElementById("evidence-title");
const evidenceList = document.getElementById("evidence-list");

function renderEvidence(key) {
  const data = evidenceData[key];
  if (!data) {
    console.error("No data found for skill:", key);
    return;
  }

  // 清空旧内容
  evidenceList.innerHTML = "";
  evidenceTitle.textContent = data.title;

  data.items.forEach(it => {
    const row = document.createElement("div");
    row.className = "evidence-item";
    row.innerHTML = `
      <div class="evidence-bullet">→</div>
      <div>
        <div><a href="${it.href}">${it.label}</a></div>
        <div class="evidence-meta">${it.meta}</div>
      </div>
    `;
    evidenceList.appendChild(row);
  });
}

// 绑定点击事件
tabs.forEach(t => {
  t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    renderEvidence(t.dataset.skill);
  });
});

// 默认选择 (根据你的截图，默认选中 Python)
const defaultTab = document.querySelector('.skill-tab[data-skill="python_nlp"]');
if (defaultTab) {
    defaultTab.click();
}
