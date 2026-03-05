<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mrudul Nagrale</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg:        #fafaf7;
    --bg-tint:   #f2f5f0;   /* sage-tinted section bg */
    --bg-warm:   #fdf8f3;   /* warm cream for alternating */
    --card:      #ffffff;
    --border:    #e4e8e0;
    --border2:   #d4dace;

    --accent:    #4a7c59;   /* sage green */
    --accent-mid:#5d9470;
    --accent-lt: #edf4ef;   /* light sage tint */
    --accent-bd: #c3d9c9;   /* sage border */

    --amber:     #b45309;   /* warm amber for secondary highlights */
    --amber-lt:  #fef3c7;
    --amber-bd:  #fcd34d;

    --text:      #1c1c1a;
    --text2:     #5a5a54;
    --text3:     #9a9a90;

    --sans: 'DM Sans', sans-serif;
    --mono: 'DM Mono', monospace;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    font-size: 15px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* ── NAV ── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(250,250,247,0.93);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    padding: 0 48px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }

  .nav-links a {
    font-size: 13px;
    color: var(--text2);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.15s;
  }

  .nav-links a:hover,
  .nav-links a.active { color: var(--accent); }

  .nav-cta {
    font-size: 13px;
    font-weight: 500;
    color: var(--accent);
    text-decoration: none;
    padding: 6px 14px;
    border: 1.5px solid var(--accent);
    border-radius: 6px;
    transition: all 0.15s;
  }

  .nav-cta:hover {
    background: var(--accent);
    color: #fff;
  }

  /* ── LAYOUT ── */
  .container {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 32px;
  }

  section { padding: 80px 0; }

  .label {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 500;
    color: var(--text3);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  /* ── HERO — warm white ── */
  #hero {
    background: var(--bg-warm);
    padding-top: 136px;
    padding-bottom: 80px;
    border-bottom: 1px solid var(--border);
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--accent-lt);
    border: 1px solid var(--accent-bd);
    border-radius: 20px;
    padding: 5px 13px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 28px;
  }

  .badge-dot {
    width: 5px; height: 5px;
    background: var(--accent);
    border-radius: 50%;
    animation: pulse 2.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.35; }
  }

  .hero-name {
    font-size: clamp(36px, 5vw, 54px);
    font-weight: 600;
    letter-spacing: -1.5px;
    line-height: 1.08;
    color: var(--text);
    margin-bottom: 16px;
  }

  .hero-sub {
    font-size: 18px;
    font-weight: 400;
    color: var(--text2);
    margin-bottom: 20px;
  }

  .hero-sub strong {
    color: var(--accent);
    font-weight: 600;
  }

  .hero-desc {
    font-size: 15px;
    color: var(--text2);
    max-width: 520px;
    line-height: 1.8;
    margin-bottom: 36px;
  }

  .hero-links {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 20px;
    font-size: 13px;
    font-weight: 500;
    font-family: var(--sans);
    text-decoration: none;
    border-radius: 7px;
    transition: all 0.15s;
    border: none;
    cursor: pointer;
  }

  .btn-solid {
    background: var(--accent);
    color: #fff;
  }

  .btn-solid:hover { background: var(--accent-mid); }

  .btn-outline {
    background: transparent;
    color: var(--text2);
    border: 1.5px solid var(--border2);
  }

  .btn-outline:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .hero-stats {
    display: flex;
    gap: 40px;
    margin-top: 52px;
    padding-top: 36px;
    border-top: 1px solid var(--border);
  }

  .stat-num {
    font-size: 28px;
    font-weight: 600;
    color: var(--accent);
    display: block;
    letter-spacing: -1px;
    line-height: 1;
  }

  .stat-label {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text3);
    letter-spacing: 0.5px;
    margin-top: 4px;
  }

  /* ── ABOUT — sage tint ── */
  #about {
    background: var(--bg-tint);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .about-body {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 60px;
    align-items: start;
  }

  .about-text p {
    color: var(--text2);
    line-height: 1.85;
    margin-bottom: 16px;
    font-size: 15px;
  }

  .about-text p:last-child { margin-bottom: 0; }
  .about-text strong { color: var(--accent); font-weight: 600; }

  .about-info { display: flex; flex-direction: column; gap: 18px; }

  .info-label {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text3);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  .info-val {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
  }

  /* ── EXPERIENCE — white ── */
  #experience {
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }

  .exp-list { display: flex; flex-direction: column; gap: 14px; }

  .exp-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    border-left: 3px solid var(--accent);
    padding: 26px 28px 22px;
    transition: box-shadow 0.2s;
  }

  .exp-item:hover {
    box-shadow: 0 4px 20px rgba(74,124,89,0.08);
  }

  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3px;
    gap: 16px;
  }

  .exp-role {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
  }

  .exp-date {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text3);
    white-space: nowrap;
    margin-top: 3px;
    flex-shrink: 0;
  }

  .exp-company {
    font-size: 13px;
    color: var(--accent);
    margin-bottom: 16px;
    font-weight: 500;
  }

  .exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 8px; }

  .exp-bullets li {
    font-size: 13.5px;
    color: var(--text2);
    line-height: 1.65;
    display: flex;
    gap: 10px;
  }

  .exp-bullets li::before {
    content: '–';
    color: var(--accent-bd);
    flex-shrink: 0;
  }

  /* ── PROJECTS — warm tint ── */
  #projects {
    background: var(--bg-warm);
    border-bottom: 1px solid var(--border);
  }

  .projects-list { display: flex; flex-direction: column; gap: 14px; }

  .project-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 28px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: start;
    transition: box-shadow 0.2s;
  }

  .project-item:hover {
    box-shadow: 0 4px 20px rgba(74,124,89,0.08);
  }

  /* each project card gets a subtle top stripe colour */
  .project-item:nth-child(1) { border-top: 3px solid var(--accent); }
  .project-item:nth-child(2) { border-top: 3px solid #c2853a; }    /* amber */
  .project-item:nth-child(3) { border-top: 3px solid #7b6fa0; }    /* soft violet */

  .project-tag-pill {
    display: inline-flex;
    background: var(--accent-lt);
    color: var(--accent);
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 500;
    padding: 3px 9px;
    border-radius: 4px;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }

  .project-item:nth-child(2) .project-tag-pill {
    background: var(--amber-lt);
    color: var(--amber);
  }

  .project-item:nth-child(3) .project-tag-pill {
    background: #f3f0fb;
    color: #5e4d9a;
  }

  .project-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
  }

  .project-desc {
    font-size: 13.5px;
    color: var(--text2);
    line-height: 1.7;
    margin-bottom: 16px;
  }

  .project-stack { display: flex; flex-wrap: wrap; gap: 6px; }

  .stack-pill {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text3);
    background: var(--bg-tint);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2px 8px;
  }

  .project-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    padding-top: 2px;
  }

  .project-metric-pill {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 500;
    border-radius: 4px;
    padding: 4px 10px;
    white-space: nowrap;
  }

  .project-item:nth-child(1) .project-metric-pill {
    color: var(--accent);
    background: var(--accent-lt);
    border: 1px solid var(--accent-bd);
  }

  .project-item:nth-child(2) .project-metric-pill {
    color: var(--amber);
    background: var(--amber-lt);
    border: 1px solid #fcd34d;
  }

  .project-item:nth-child(3) .project-metric-pill {
    color: #5e4d9a;
    background: #f3f0fb;
    border: 1px solid #c4b8e8;
  }

  .project-links-v {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
  }

  .proj-link {
    font-size: 12px;
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.15s;
  }

  .proj-link:hover { opacity: 0.65; }

  /* ── SKILLS — sage tint ── */
  #skills {
    background: var(--bg-tint);
    border-bottom: 1px solid var(--border);
  }

  .skills-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  .skill-block-label {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text3);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .skill-pills { display: flex; flex-wrap: wrap; gap: 7px; }

  .skill-pill {
    font-size: 12.5px;
    color: var(--text2);
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 4px 11px;
    transition: all 0.15s;
  }

  .skill-pill:hover {
    border-color: var(--accent-bd);
    color: var(--accent);
  }

  .skill-pill.key {
    color: var(--accent);
    background: var(--accent-lt);
    border-color: var(--accent-bd);
    font-weight: 500;
  }

  /* ── CONTACT — white ── */
  #contact { background: var(--bg); }

  .contact-body { max-width: 520px; }

  .contact-heading {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -1px;
    color: var(--text);
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .contact-heading span { color: var(--accent); }

  .contact-desc {
    color: var(--text2);
    line-height: 1.8;
    margin-bottom: 28px;
  }

  .contact-email {
    display: inline-block;
    font-size: 15px;
    font-weight: 500;
    color: var(--accent);
    text-decoration: none;
    margin-bottom: 28px;
    transition: opacity 0.15s;
  }

  .contact-email:hover { opacity: 0.7; }

  .contact-socials { display: flex; gap: 10px; flex-wrap: wrap; }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text2);
    background: var(--card);
    border: 1.5px solid var(--border2);
    border-radius: 7px;
    text-decoration: none;
    transition: all 0.15s;
  }

  .social-link:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* ── FOOTER ── */
  footer {
    background: var(--bg-tint);
    border-top: 1px solid var(--border);
    padding: 22px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-text {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text3);
  }

  /* ── FADE IN ── */
  .fade {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .fade.in { opacity: 1; transform: translateY(0); }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    nav { padding: 0 20px; }
    .container { padding: 0 20px; }
    footer { padding: 20px; flex-direction: column; gap: 8px; text-align: center; }
    .about-body { grid-template-columns: 1fr; gap: 36px; }
    .skills-body { grid-template-columns: 1fr; }
    .project-item { grid-template-columns: 1fr; }
    .project-right { align-items: flex-start; flex-direction: row; flex-wrap: wrap; }
    .hero-stats { gap: 24px; flex-wrap: wrap; }
    .nav-cta { display: none; }
  }
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#hero" class="nav-logo">Mrudul Nagrale</a>
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#skills">Skills</a></li>
  </ul>
  <a href="#contact" class="nav-cta">Get in touch</a>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="container">
    <div class="hero-badge">
      <span class="badge-dot"></span>
      Open to opportunities · Stuttgart, Germany
    </div>
    <h1 class="hero-name">Mrudul Nagrale</h1>
    <p class="hero-sub">
      <strong>ML Engineer & AI Developer</strong> · M.Sc. CS @ Universität Stuttgart
    </p>
    <p class="hero-desc">
      Building intelligent systems — RAG pipelines, predictive ML models, and production APIs. Previously shipped enterprise integrations to 100+ users at eQ Technologic.
    </p>
    <div class="hero-links">
      <a href="#projects" class="btn btn-solid">View projects</a>
      <a href="#" class="btn btn-outline">Download CV</a>
      <a href="mailto:mrudulnagrale01@gmail.com" class="btn btn-outline">Email me</a>
    </div>
    <div class="hero-stats">
      <div>
        <span class="stat-num">3+</span>
        <div class="stat-label">yrs experience</div>
      </div>
      <div>
        <span class="stat-num">100+</span>
        <div class="stat-label">API users</div>
      </div>
      <div>
        <span class="stat-num">3</span>
        <div class="stat-label">AI/ML projects</div>
      </div>
      <div>
        <span class="stat-num">1.0</span>
        <div class="stat-label">M.Sc. CGPA</div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section id="about">
  <div class="container">
    <div class="label">About</div>
    <div class="about-body">
      <div class="about-text fade">
        <p>I'm a software engineer transitioning into AI/ML, currently pursuing my <strong>M.Sc. in Computer Science at Universität Stuttgart</strong> with a specialisation in Autonomous Systems.</p>
        <p>Before my Master's I spent 3 years at <strong>eQ Technologic</strong> building enterprise REST APIs, graph-based data pipelines in OrientDB, and customer integration solutions — shipping to 100+ active users.</p>
        <p>Now I'm combining that engineering background with hands-on ML: <strong>RAG systems, predictive pipelines, and async data infrastructure</strong> using Python, PyTorch, LangChain, and FastAPI.</p>
      </div>
      <div class="about-info fade">
        <div>
          <div class="info-label">Currently</div>
          <div class="info-val">M.Sc. CS @ Stuttgart</div>
        </div>
        <div>
          <div class="info-label">Location</div>
          <div class="info-val">Stuttgart, Germany</div>
        </div>
        <div>
          <div class="info-label">Previously</div>
          <div class="info-val">eQ Technologic · 3 yrs</div>
        </div>
        <div>
          <div class="info-label">Looking for</div>
          <div class="info-val">ML · AI · Python roles</div>
        </div>
        <div>
          <div class="info-label">Open to</div>
          <div class="info-val">Europe · Remote</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EXPERIENCE -->
<section id="experience">
  <div class="container">
    <div class="label">Experience</div>
    <div class="exp-list">

      <div class="exp-item fade">
        <div class="exp-header">
          <div class="exp-role">Software Development Engineer</div>
          <div class="exp-date">Jun 2024 — Sept 2025</div>
        </div>
        <div class="exp-company">eQ Technologic · Pune, India</div>
        <ul class="exp-bullets">
          <li>Debugged HikariCP connection pooling issues — reducing support tickets by 35% and improving system reliability</li>
          <li>Contributed to OAuth 2.0 client credentials flow for the Windchill connector</li>
          <li>Resolved 25+ bugs across two Agile release cycles in an 8+ year legacy Java codebase</li>
        </ul>
      </div>

      <div class="exp-item fade">
        <div class="exp-header">
          <div class="exp-role">Software Implementation Engineer</div>
          <div class="exp-date">Aug 2022 — Jun 2024</div>
        </div>
        <div class="exp-company">eQ Technologic · Pune, India</div>
        <ul class="exp-bullets">
          <li>Built 20+ REST API endpoints on eQube-MI supporting 100+ active users across 5+ enterprise systems</li>
          <li>Modeled 10+ entity types and 15+ relationships in OrientDB for end-to-end data traceability</li>
          <li>30+ JUnit tests reducing manual QA effort by 40% · recognised as Star Performer</li>
          <li>Delivered Windchill–Solumina sync for iBASEt, eliminating manual data entry between PLM and MES</li>
        </ul>
      </div>

    </div>
  </div>
</section>

<!-- PROJECTS -->
<section id="projects">
  <div class="container">
    <div class="label">Projects</div>
    <div class="projects-list">

      <div class="project-item fade">
        <div>
          <div class="project-tag-pill">AI / LLM</div>
          <div class="project-name">Document Q&A with RAG</div>
          <p class="project-desc">End-to-end Retrieval-Augmented Generation system. Upload any PDF and ask natural language questions. Document chunking, semantic embeddings, sub-100ms FAISS retrieval.</p>
          <div class="project-stack">
            <span class="stack-pill">Python</span>
            <span class="stack-pill">LangChain</span>
            <span class="stack-pill">FAISS</span>
            <span class="stack-pill">FastAPI</span>
            <span class="stack-pill">Gradio</span>
            <span class="stack-pill">HuggingFace</span>
          </div>
        </div>
        <div class="project-right">
          <div class="project-metric-pill">~78% accuracy</div>
          <div class="project-links-v">
            <a href="#" class="proj-link">↗ Live demo</a>
            <a href="#" class="proj-link">↗ GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-item fade">
        <div>
          <div class="project-tag-pill">ML Pipeline</div>
          <div class="project-name">Predictive Maintenance Pipeline</div>
          <p class="project-desc">Full ML pipeline on NASA CMAPSS dataset predicting jet engine Remaining Useful Life. Compared Random Forest, XGBoost, and LSTM with MLflow experiment tracking.</p>
          <div class="project-stack">
            <span class="stack-pill">Python</span>
            <span class="stack-pill">XGBoost</span>
            <span class="stack-pill">PyTorch</span>
            <span class="stack-pill">MLflow</span>
            <span class="stack-pill">FastAPI</span>
            <span class="stack-pill">scikit-learn</span>
          </div>
        </div>
        <div class="project-right">
          <div class="project-metric-pill">RMSE 18.4</div>
          <div class="project-links-v">
            <a href="#" class="proj-link">↗ Live demo</a>
            <a href="#" class="proj-link">↗ GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-item fade">
        <div>
          <div class="project-tag-pill">Data Engineering</div>
          <div class="project-name">Async Weather Data Pipeline</div>
          <p class="project-desc">Async Python pipeline ingesting hourly weather data for 15 European cities. Statistical anomaly detection, scheduled hourly execution, REST API with 92% test coverage.</p>
          <div class="project-stack">
            <span class="stack-pill">asyncio</span>
            <span class="stack-pill">FastAPI</span>
            <span class="stack-pill">SQLAlchemy</span>
            <span class="stack-pill">pytest</span>
            <span class="stack-pill">Docker</span>
            <span class="stack-pill">APScheduler</span>
          </div>
        </div>
        <div class="project-right">
          <div class="project-metric-pill">92% coverage</div>
          <div class="project-links-v">
            <a href="#" class="proj-link">↗ Live demo</a>
            <a href="#" class="proj-link">↗ GitHub</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- SKILLS -->
<section id="skills">
  <div class="container">
    <div class="label">Skills</div>
    <div class="skills-body">

      <div class="skill-block fade">
        <div class="skill-block-label">Languages</div>
        <div class="skill-pills">
          <span class="skill-pill key">Python</span>
          <span class="skill-pill">Java</span>
          <span class="skill-pill">SQL</span>
          <span class="skill-pill">JavaScript</span>
          <span class="skill-pill">Bash</span>
        </div>
      </div>

      <div class="skill-block fade">
        <div class="skill-block-label">ML / AI</div>
        <div class="skill-pills">
          <span class="skill-pill key">LangChain</span>
          <span class="skill-pill key">PyTorch</span>
          <span class="skill-pill">scikit-learn</span>
          <span class="skill-pill">XGBoost</span>
          <span class="skill-pill">FAISS</span>
          <span class="skill-pill">HuggingFace</span>
          <span class="skill-pill">RAG</span>
          <span class="skill-pill">MLflow</span>
        </div>
      </div>

      <div class="skill-block fade">
        <div class="skill-block-label">Data & Backend</div>
        <div class="skill-pills">
          <span class="skill-pill key">FastAPI</span>
          <span class="skill-pill">pandas</span>
          <span class="skill-pill">NumPy</span>
          <span class="skill-pill">asyncio</span>
          <span class="skill-pill">SQLAlchemy</span>
          <span class="skill-pill">REST APIs</span>
        </div>
      </div>

      <div class="skill-block fade">
        <div class="skill-block-label">Tools & Concepts</div>
        <div class="skill-pills">
          <span class="skill-pill">Git</span>
          <span class="skill-pill">Docker</span>
          <span class="skill-pill">pytest</span>
          <span class="skill-pill">OrientDB</span>
          <span class="skill-pill">Linux</span>
          <span class="skill-pill">Agile/Scrum</span>
          <span class="skill-pill">OOP</span>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="container">
    <div class="label">Contact</div>
    <div class="contact-body">
      <h2 class="contact-heading fade">Let's work <span>together.</span></h2>
      <p class="contact-desc fade">Open to ML Engineer, AI Developer, and Python Backend roles across Europe. I respond within 24 hours.</p>
      <a href="mailto:mrudulnagrale01@gmail.com" class="contact-email fade">mrudulnagrale01@gmail.com</a>
      <div class="contact-socials fade">
        <a href="https://linkedin.com/in/mrudul-nagrale" class="social-link">↗ LinkedIn</a>
        <a href="https://github.com/mrudul-999" class="social-link">↗ GitHub</a>
        <a href="#" class="social-link">↓ Resume PDF</a>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-text">© 2026 Mrudul Nagrale</div>
  <div class="footer-text">Stuttgart, Germany · Open to Remote</div>
</footer>

<script>
  const fades = document.querySelectorAll('.fade');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  fades.forEach(el => obs.observe(el));

  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : '';
    });
  });
</script>

</body>
</html>
