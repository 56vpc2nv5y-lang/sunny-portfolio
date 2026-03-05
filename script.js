// ===== 1. 页面滚动渐显动画 (Scroll Reveal) =====
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.classList.add("visible");
  }
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ===== 2. 自动更新页脚年份 =====
const yearEl = document.getElementById("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

// ===== 3. 项目折叠卡片交互逻辑 (Accordion) =====
const toggles = document.querySelectorAll(".proj-toggle");
toggles.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const bodyId = btn.getAttribute("aria-controls");
    const body = document.getElementById(bodyId);
    if (!body) return;

    btn.setAttribute("aria-expanded", String(!expanded));
    btn.querySelector(".plus").textContent = expanded ? "+" : "−";
    body.hidden = expanded;
  });
});

// ===== 4. 技能实践证据库 (Skills Evidence) =====
const evidenceData = {
  viz: {
    title: "数据可视化：",
    items: [
      { label: "数说故事实习 — 月度 KPI 报告与验证", href: "#exp-datastory", meta: "使用 Tableau 搭建核心指标与绩效跟踪仪表盘" },
      { label: "数据分析工作室项目", href: "#proj-studio", meta: "带领工作室实现创收，并为客户定制销售数据看板" },
      { label: "航空飞行数据分析", href: "javascript:void(0)", meta: "(PDF待上传) 飞行数据的深度可视化实践" }
    ]
  },
  r_stat: {
    title: "R 语言应用经验：",
    items: [
      { label: "黄金价格预测模型", href: "#gp-gold", meta: "基于 R 语言的时间序列对比研究与预测建模" },
      { label: "计量经济学助教工作", href: "#exp-ta", meta: "主讲使用 R 语言脚本进行回归分析与机器学习的实操课程" },
      { label: "互联网医疗科普分析", href: "#proj-health", meta: "在 R 语言中实现有序逻辑回归与结构方程模型 (SEM)" }
    ]
  },
  python: {
    title: "Python 应用经验：",
    items: [
      { label: "政务社交媒体评论分析 (NLP)", href: "#proj-gov-nlp", meta: "处理 2 万条评论数据的全自动化流：数据预处理 → 文本分类 → 指标提取" },
      { label: "银行理财产品认购预测", href: "#gp-bank", meta: "基于 Python 进行 XGBoost 模型优化与预测开发" },
      { label: "健康管理参与度分析", href: "#proj-health", meta: "底层数据预处理清洗与建模支持" },
      { label: "计量经济学助教工作", href: "#exp-ta", meta: "使用 Python 为学生提供补充分析与实操代码演示" },
      { label: "海通证券投资助理实习", href: "#exp-securities", meta: "市场报告底层数据的自动化处理与分析脚本开发" },
      { label: "城市幸福指数研究项目", href: "#proj-happiness", meta: "XGBoost 建模调参及多源异构数据清洗整合" }
    ]
  },
  sql: {
    title: "SQL 实践经验：",
    items: [
      { label: "数说故事 (DataStory) 实习 — 月度 KPI 报告与验证", href: "#exp-datastory", meta: "为管理层报告编写复杂 SQL 提取、清洗数据并进行指标逻辑校验" },
      { label: "对分易学习管理系统", href: "#gp-duifenyi", meta: "在线学习系统的数据库结构设计设计与 ER 建模" }
    ]
  },
  ml: {
    title: "机器学习项目经验：",
    items: [
      { label: "银行理财产品认购预测", href: "#gp-bank", meta: "结合深度特征工程的 XGBoost 分类器" },
      { label: "健康管理参与度分析", href: "#proj-health", meta: "基于统计学习方法的用户核心驱动因素分析" },
      { label: "随机森林模型应用 — 信用评估与乳腺癌数据预测", href: "javascript:void(0)", meta: '相关文件：<a href="ML3_random forest.pdf" target="_blank">项目报告 (PDF)</a> | <a href="ML3_random forest.R" download>源代码 (R)</a>' },
      { label: "基于层次聚类的网络舆情失焦分类与预测研究", href: "ML5_Hierarchical Clustering–Based Classification and Prediction of Online Public Opinion Defocusing.pdf", meta: '(中文) <a href="ML5_Hierarchical Clustering–Based Classification and Prediction of Online Public Opinion Defocusing.pdf" target="_blank">查看报告全文 (PDF)</a>' }
    ]
  },
  ts: {
    title: "时间序列分析经验：",
    items: [
      { label: "黄金价格预测模型", href: "#gp-gold", meta: "ARIMA 模型与灰色模型 (GM) 预测效果的深度对比" },
      { label: "基于 ARIMA 模型的餐厅短期客流预测", href: "javascript:void(0)", meta: '相关文件：<a href="TIME2_restaurant.png" target="_blank">分析图表 (PNG)</a> | <a href="TIME2_Short-Term Restaurant Customer Flow Forecasting with ARIMA.pdf" target="_blank">论文全文 (PDF)</a>' },
      { label: "基于 ARIMA 模型的全球气温变化预测研究", href: "TIME3_An ARIMA-Based Study on Global Temperature Change Forecasting.pdf", meta: '(中文) <a href="TIME3_An ARIMA-Based Study on Global Temperature Change Forecasting.pdf" target="_blank">查看论文 (PDF)</a>' }
    ]
  },
  causal: {
    title: "因果推断分析经验：",
    items: [
      { label: "电动汽车：绿色环保还是利益权衡？", href: "#gp-ev", meta: "生命周期评估 (LCA) 与条件因果分析" },
      { label: "城市幸福指数研究项目", href: "#proj-happiness", meta: "基于大规模观测数据的宏观政策影响评估" }
    ]
  },
  nlp: {
    title: "自然语言处理 (NLP) 经验：",
    items: [
      { label: "政务社交媒体评论挖掘分析", href: "#proj-gov-nlp", meta: "基于公众社交媒体互动数据的情感分析与主题建模" },
      { label: "基于 IMDB 电影评论数据集的情感分析", href: "NLP1_Sentiment Analysis on the IMDB Dataset.pdf", meta: '<a href="NLP1_Sentiment Analysis on the IMDB Dataset.pdf" target="_blank">查看分析报告 (PDF)</a>' },
      { label: "基于方面级别的细粒度情感分析 (餐厅评论数据)", href: "javascript:void(0)", meta: "对比评估了传统机器模型 (TF-IDF + SVM) 与深度学习模型 (Bi-LSTM + Attention) 的分类表现。" }
    ]
  },
  genai: {
    title: "生成式 AI (Gen AI) 经验：",
    items: [
      { label: "检索增强生成技术 (RAG) 在医疗与科研领域的应用", href: "AI1_RAG in medical and research.pdf", meta: '<a href="AI1_RAG in medical and research.pdf" target="_blank">查看说明文档 (PDF)</a>' }
    ]
  }
};

const tabs = document.querySelectorAll(".skill-tab");
const evidenceTitle = document.getElementById("evidence-title");
const evidenceList = document.getElementById("evidence-list");

// 动态渲染选项卡内容的函数
function renderEvidence(key) {
  const data = evidenceData[key];
  if (!data) return;

  evidenceTitle.textContent = data.title;
  evidenceList.innerHTML = ""; // 清空当前列表内容

  data.items.forEach(it => {
    const row = document.createElement("div");
    row.className = "evidence-item";
    
    // 生成 DOM 结构
    row.innerHTML = `
      <div class="evidence-bullet">→</div>
      <div>
       <div><a class="evidence-link" href="${it.href}" ${it.href.startsWith('#') || it.href.startsWith('javascript') ? '' : 'target="_blank"'}>${it.label}</a></div>
        <div class="evidence-meta">${it.meta}</div>
      </div>
    `;
    evidenceList.appendChild(row);
  });

  // === 新增：绑定锚点链接点击事件，处理对应卡片的自动展开 ===
  document.querySelectorAll(".evidence-link").forEach(link => {
    link.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if(href.startsWith("#")) {
            // 获取目标 DOM 元素
            const targetId = href.substring(1);
            const targetEl = document.getElementById(targetId);
            
            if(targetEl) {
                // 如果目标是一个折叠卡片 (.project-collapsible)，且目前处于关闭状态，则触发展开点击
                if(targetEl.classList.contains("project-collapsible")) {
                    const toggleBtn = targetEl.querySelector(".proj-toggle");
                    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
                    if(!isExpanded) {
                        toggleBtn.click();
                    }
                }
            }
        }
    });
  });
}

// 绑定选项卡点击切换事件
tabs.forEach(t => {
  t.addEventListener("click", () => {
    // 重置所有选项卡的激活状态
    tabs.forEach(x => {
      x.classList.remove("active");
      x.setAttribute("aria-selected", "false");
    });
    // 激活当前点击的选项卡
    t.classList.add("active");
    t.setAttribute("aria-selected", "true");
    
    // 渲染对应内容
    renderEvidence(t.dataset.skill);
  });
});

// ===== 5. 页面加载后的默认初始化行为 =====
document.addEventListener("DOMContentLoaded", () => {
  // 默认选中第一个 "Visualization (数据可视化)" 标签
  const defaultTab = document.querySelector('.skill-tab[data-skill="viz"]');
  if (defaultTab) {
    defaultTab.click();
  }
});

// ===== 6. 注重隐私的访问统计逻辑 (Privacy-Friendly Analytics) =====
(async function initAnalytics() {
  const counterEl = document.getElementById("visit-count");
  const statContainer = document.getElementById("visit-stat");
  
  // 🔥 这里已经修改为您的专属 Vercel 域名 🔥
  const API_ENDPOINT = "https://sunny-portfolio-lemon.vercel.app/api/visit"; 

  try {
    const currentPath = window.location.pathname;

    // 获取 URL 中的推广追踪参数 (ref)
    const urlParams = new URLSearchParams(window.location.search);
    const refTag = urlParams.get('ref') || ''; 

    // 发送带有页面路径和追踪标签的请求
    const response = await fetch(`${API_ENDPOINT}?path=${encodeURIComponent(currentPath)}&ref=${encodeURIComponent(refTag)}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.total_visits) {
        // 触发数字滚动动画并显示统计容器
        animateValue(counterEl, 0, data.total_visits, 1500);
        statContainer.style.opacity = "1";
      }
    }
  } catch (err) {
    console.log("Analytics skipped (local or network error)."); // 本地环境或网络错误时静默跳过
  }
})();

// 辅助函数：实现数字平滑滚动的动画效果
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = end; 
    }
  };
  window.requestAnimationFrame(step);
}
