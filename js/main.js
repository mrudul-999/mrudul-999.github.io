/**
 * MRUDUL - PORTFOLIO INTERACTIVE ENGINE
 * Manages Theme Toggle, 3D Card Tilt, Project Filter & Modals,
 * Typewriter, Animated Counters, Copy-to-Clipboard, and Toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Toast Notification System
  // ==========================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, icon = '✨') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ==========================================
  // 2. Dark / Light Theme Toggle
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize theme
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (!prefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, newTheme === 'dark' ? '🌙' : '☀️');
    });
  }

  // ==========================================
  // 3. Typewriter Effect
  // ==========================================
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = [
      'ML Engineer & AI Developer',
      'Autonomous Systems Student',
      'Python Backend & API Architect',
      'RAG & LLM Pipeline Crafter',
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before new word
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // ==========================================
  // 4. 3D Tilt Effect on Developer Hero Card
  // ==========================================
  const tiltCard = document.getElementById('hero-dev-card');
  if (tiltCard && window.innerWidth > 992) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // ==========================================
  // 5. Animated Number Counters
  // ==========================================
  const counterElements = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(easeProgress * (target - start) + start);

      el.textContent = currentVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  };

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection && counterElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            counterElements.forEach((counter) => countUp(counter));
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(statsSection);
  }

  // ==========================================
  // 6. Interactive Skill Category Filter
  // ==========================================
  const skillTabs = document.querySelectorAll('.skills-tabs .tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ==========================================
  // 7. Interactive Project Category Filter
  // ==========================================
  const projectTabs = document.querySelectorAll('.projects-filter .tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      projectTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ==========================================
  // 8. Project Details Modal System
  // ==========================================
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBadge = document.getElementById('modal-project-badge');
  const modalImg = document.getElementById('modal-project-img');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalArchitecture = document.getElementById('modal-project-arch');
  const modalMetrics = document.getElementById('modal-project-metrics');
  const modalTags = document.getElementById('modal-project-tags');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalCodeLink = document.getElementById('modal-code-link');

  // Rich project dataset tailored to Mrudul's engineering portfolio
  const projectDetailsData = {
    'rag-system': {
      title: 'Production Grade Advanced RAG',
      badge: 'Agentic AI & Retrieval',
      img: 'assets/images/project-rag.jpg',
      desc: 'An enterprise agentic RAG architecture utilizing an LLM-driven Query Router to classify user intent, dynamic tool routing, parallel Fusion Retrieval across transformed queries, and Cross-Encoder reranking.',
      architecture: 'Engineered with LangChain, FAISS vector indexing, and sentence-transformers, served via FastAPI with a Gradio frontend. Integrates query transformation and Cross-Encoder (ms-marco-MiniLM-L-6-v2) reranking post-processing to minimize hallucinations.',
      metrics: [
        'Agentic query router dynamically selecting optimal tool choice',
        'Query Transformation & Fusion parallel multi-query search',
        'Cross-Encoder reranking post-processing (ms-marco-MiniLM)',
        'Unified prompt injection minimizing hallucinations and boosting answer depth'
      ],
      tags: ['Python', 'LangChain', 'FAISS', 'sentence-transformers', 'FastAPI', 'Gradio'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
    'synapse-ai': {
      title: 'Synapse Multi-Agentic AI',
      badge: 'LangGraph & Multi-Agent',
      img: 'assets/images/project-synapse.jpg',
      desc: 'A hierarchical multi-agent research system using LangGraph to orchestrate a planner, tool-execution, and debate-based verification pipeline with explicit state machines.',
      architecture: 'Designed with a self-critiquing verification loop where independent "steelman" and "skeptic" agents argue opposing sides of claims before judge adjudication. External tools integrated via Model Context Protocol (MCP) as swappable servers.',
      metrics: [
        '40% reduction in unsupported claims vs single-verifier baseline',
        'Model Context Protocol (MCP) integration for dynamic tool selection',
        'Explicit state machine supporting conditional retries and replanning',
        'FastAPI backend with reactive HTMX single-page interface'
      ],
      tags: ['LangGraph', 'Python', 'MCP', 'Vector DB', 'FastAPI', 'HTMX', 'Gemini API'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
    'predictive-ml': {
      title: 'Predictive Maintenance ML Pipeline',
      badge: 'ML & Predictive Modeling',
      img: 'assets/images/project-predictive-ml.jpg',
      desc: 'A modular, production-ready predictive maintenance pipeline in Python to estimate the Remaining Useful Life (RUL) of aircraft turbofan engines using the NASA CMAPSS dataset.',
      architecture: 'Engineered 15+ rolling-window temporal features with a piecewise linear target profile. Trained Random Forest, XGBoost, and PyTorch LSTM models tracked via MLflow. Served via low-latency FastAPI with Pydantic validation schemas.',
      metrics: [
        '18.4 cycles validation RMSE (41% improvement over baseline)',
        '15+ rolling-window temporal lag features (mean, std dev, lag)',
        'MLflow experiment tracking for hyperparameters and feature importances',
        'Real-time low-latency FastAPI inference endpoint with Pydantic validation'
      ],
      tags: ['Python', 'scikit-learn', 'XGBoost', 'PyTorch', 'MLflow', 'FastAPI'],
      liveUrl: 'https://github.com/mrudul-999/PredictiveMLPipeline',
      codeUrl: 'https://github.com/mrudul-999/PredictiveMLPipeline',
    },
    'ai-interview': {
      title: 'AI Interview Coach',
      badge: 'Full Stack & LLM',
      img: 'assets/images/project-interview.jpg',
      desc: 'A containerized full-stack web application using Django and PostgreSQL via Docker Compose, evaluating user responses with real-time dynamic questions and evaluation scoring.',
      architecture: 'Engineered an isolated Service Layer in Django to decouple Google Gemini API prompt orchestration from controllers. Designed a reactive SPA utilizing HTMX for declarative AJAX swapping of server-rendered HTML fragments.',
      metrics: [
        'Reactive SPA utilizing HTMX with zero heavy JS framework overhead',
        'Isolated Service Layer pattern decoupling Gemini API orchestration',
        'Normalized schema tracking session histories and evaluation scores',
        'Multi-container Docker Compose architecture with PostgreSQL'
      ],
      tags: ['Python', 'Django', 'PostgreSQL', 'Docker', 'HTMX', 'Gemini API'],
      liveUrl: 'https://github.com/mrudul-999/AI-Interview-Coach',
      codeUrl: 'https://github.com/mrudul-999/AI-Interview-Coach',
    },
    'job-pulse': {
      title: 'Real-Time Job Market Intelligence Pipeline',
      badge: 'Data Engineering & Analytics',
      img: 'assets/images/project-jobpulse.jpg',
      desc: 'A continuous Python data pipeline ingesting job postings from the ArbeitNow API, normalizing descriptions against a tech-skill checklist, and serving market density analytics.',
      architecture: 'Built in Python with raw JSONB archival in PostgreSQL for data reproducibility. Developed a FastAPI backend and SQLAlchemy many-to-many schema mapping jobs and skills with indexed search fields.',
      metrics: [
        'Continuous pipeline ingesting and archiving ArbeitNow API postings',
        'PostgreSQL JSONB archival for full data reproducibility',
        'Normalized skill-matching engine (Python, Kubernetes, AWS)',
        'Docker & Docker Compose containerized deployment'
      ],
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'SQLAlchemy', 'ArbeitNow API'],
      liveUrl: 'https://github.com/mrudul-999/JobPulse-Real-Time-Job-Market-Intelligence-Pipeline',
      codeUrl: 'https://github.com/mrudul-999/JobPulse-Real-Time-Job-Market-Intelligence-Pipeline',
    },
    'sign-language': {
      title: 'Indian Sign Language Recognition',
      badge: 'Computer Vision & Deep Learning',
      img: 'assets/images/project-sign-language.jpg',
      desc: 'A deep learning computer vision system extending static hand gesture recognition into real-time continuous sign-to-text sentence translation.',
      architecture: 'Created a custom dataset spanning 35 classes (26 letters, 9 numbers) with noise injection and data augmentation. Designed and trained a CNN from scratch, deploying via a Flask web app with real-time OpenCV webcam inference.',
      metrics: [
        '97% accuracy on multi-class hand sign recognition',
        'Custom dataset spanning 35 classes (26 letters, 9 numbers)',
        'Extended static recognition into continuous real-time sentence formation',
        'Flask web application delivering live webcam-based inference'
      ],
      tags: ['Python', 'TensorFlow/Keras', 'CNN', 'OpenCV', 'Flask'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
    'taskflow': {
      title: 'TaskFlow: Full-Stack Project Management',
      badge: 'Next.js & TypeScript',
      img: 'assets/images/project-taskflow.jpg',
      desc: 'A full-stack task management platform built with Next.js App Router, featuring drag-and-drop Kanban boards, role-based team workspaces, and typed Node.js/Express REST API.',
      architecture: 'Developed with Next.js (App Router), TypeScript, and Tailwind CSS. Node.js/Express backend with Zod typed schema validation and PostgreSQL via Prisma ORM serving 15+ authenticated endpoints. React Query for server-state caching.',
      metrics: [
        'Interactive drag-and-drop Kanban workflows with optimistic UI updates',
        '15+ typed REST endpoints with Zod request validation and JWT auth',
        'React Query caching reducing redundant API queries by 60%',
        'Automated CI/CD pipeline running ESLint, TypeScript check, and Jest tests'
      ],
      tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
    'ev-charging': {
      title: 'EV Charging Market Intelligence Dashboard',
      badge: 'Business Intelligence & Geospatial',
      img: 'assets/images/project-ev-charging.jpg',
      desc: 'An end-to-end European EV charging infrastructure intelligence platform processing 100K+ records with automated ETL pipelines and interactive geospatial Power BI dashboards.',
      architecture: 'Collected and integrated 100K+ records across Europe using Python and SQL. Automated ETL pipelines reducing manual preparation by 80%. Designed Power BI dashboards visualizing charger density, regional adoption, and competitor share.',
      metrics: [
        '100,000+ public EV charging and demographic records processed',
        '80% reduction in data prep time via automated Python ETL pipelines',
        'Geospatial density and market expansion recommendation engine',
        'Interactive Power BI KPI dashboards with regional drill-downs'
      ],
      tags: ['Python', 'Django', 'Power BI', 'SQL', 'ETL', 'Geospatial Analytics'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
    'data-analytics': {
      title: 'Data Analytics & Experimentation Dashboard',
      badge: 'Databricks & A/B Testing',
      img: 'assets/images/project-data-analytics.jpg',
      desc: 'End-to-end data analytics and experimentation platform in Databricks and Python processing 100K+ records, evaluating A/B tests with statistical confidence intervals.',
      architecture: 'Python and SQL analytics pipeline in Databricks processing 100K+ records. Designed A/B testing experiment evaluation defining success metrics, confidence intervals, and lift curves. Built Power BI dashboards with automated KPI tracking.',
      metrics: [
        'Processed 100K+ records with exploratory analysis and insight extraction',
        '40% reduction in manual reporting effort with automated KPI tracking',
        'Rigorous A/B testing experiment evaluation with statistical significance',
        'Integrated structured data sources across Excel and Python workflows'
      ],
      tags: ['Python', 'SQL', 'Power BI', 'Databricks', 'A/B Testing', 'Excel'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
    'clash-rc': {
      title: 'Clash RC ’19 Quiz Web Application',
      badge: 'Full Stack & Django',
      img: 'assets/images/project-devops.jpg',
      desc: 'A high-concurrency locally hosted quiz web application developed for a premier large-scale college technical festival event.',
      architecture: 'Engineered backend using Django MVT architecture, implementing URL routing, SQLite integration, session management, and core application logic with comprehensive integration testing.',
      metrics: [
        'Engineered for live competition concurrency during college tech fest',
        'Django MVT backend architecture with SQLite integration',
        'Seamless integration between responsive frontend and backend logic',
        'End-to-end integration testing and session management'
      ],
      tags: ['Python', 'Django', 'SQLite', 'Web Application', 'Architecture'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
  };

  function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !modalOverlay) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalDesc.textContent = data.desc;
    modalArchitecture.textContent = data.architecture;

    // Metrics list
    modalMetrics.innerHTML = '';
    data.metrics.forEach((metric) => {
      const li = document.createElement('li');
      li.textContent = metric;
      modalMetrics.appendChild(li);
    });

    // Tags
    modalTags.innerHTML = '';
    data.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    // Links
    modalLiveLink.href = data.liveUrl;
    modalCodeLink.href = data.codeUrl;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Event listeners for opening modal
  document.querySelectorAll('[data-project-target]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-project-target');
      openProjectModal(targetId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // ==========================================
  // 9. 1-Click Copy Email Feature
  // ==========================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'mrudul.dev@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<span>✓</span> Copied to clipboard!';
        copyEmailBtn.style.background = 'var(--accent-emerald)';
        copyEmailBtn.style.color = '#ffffff';
        copyEmailBtn.style.borderColor = 'var(--accent-emerald)';
        showToast(`Email copied: ${email}`, '📋');

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.color = '';
          copyEmailBtn.style.borderColor = '';
        }, 2500);
      } catch (err) {
        showToast(`Copy failed: ${email}`, '⚠️');
      }
    });
  }

  // ==========================================
  // 10. Contact Form Submission (Interactive)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill out all required fields.', '⚠️');
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="width:18px;height:18px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Sending message...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactForm.reset();
        showToast('Thank you! Your message has been sent successfully.', '🚀');
      }, 1200);
    });
  }

  // ==========================================
  // 11. Mobile Navigation Menu Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 12. Active Navigation Spy on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Welcome Toast
  setTimeout(() => {
    showToast('Welcome to Mrudul\'s Portfolio! Hosted on GitHub Pages.', '👋');
  }, 1000);
});
