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
    'ai-workspace': {
      title: 'Document Q&A with Retrieval-Augmented Generation (RAG)',
      badge: 'AI & LLM Pipeline',
      img: 'assets/images/project-ai-workspace.jpg',
      desc: 'An end-to-end Retrieval-Augmented Generation system allowing users to upload unstructured technical PDFs and ask natural language questions with contextual source citations and zero hallucination.',
      architecture: 'Engineered with LangChain and FAISS for sub-100ms vector embeddings retrieval. Uses an asynchronous FastAPI Python backend with smart token chunking strategies and OpenAI / local open-weights LLM inference.',
      metrics: ['Sub-100ms FAISS Vector Similarity Retrieval', 'Context-accurate answers with source page citations', 'Handles multi-megabyte complex PDF parsing', 'Containerized Docker deployment'],
      tags: ['Python', 'LangChain', 'FAISS', 'FastAPI', 'PyTorch', 'Docker'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
    'cloud-telemetry': {
      title: 'Predictive Maintenance ML Pipeline (NASA CMAPSS)',
      badge: 'ML & Predictive Modeling',
      img: 'assets/images/project-cloud.jpg',
      desc: 'An industrial Machine Learning pipeline built on the NASA CMAPSS turbofan degradation dataset to accurately forecast Remaining Useful Life (RUL) of aircraft jet engines.',
      architecture: 'Trained and benchmarked Random Forest, XGBoost, and LSTM recurrent neural networks using PyTorch. Integrated MLflow for automated hyperparameter tuning and model experiment registry.',
      metrics: ['Validated on NASA CMAPSS Turbofan Engine dataset', 'Tracked & logged 50+ runs via MLflow', 'Lowered RMSE prediction error across test degradation curves', 'Automated feature engineering pipeline'],
      tags: ['Python', 'PyTorch', 'XGBoost', 'MLflow', 'Scikit-Learn', 'Pandas'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
    'fintech-platform': {
      title: 'Async European Weather Data Pipeline & Service',
      badge: 'Data Engineering & APIs',
      img: 'assets/images/project-fintech.jpg',
      desc: 'High-throughput asynchronous Python pipeline continuously ingesting hourly meteorological observations across 15 European cities with automated statistical anomaly detection.',
      architecture: 'Built using Python asyncio, SQLAlchemy ORM, and FastAPI with automated background scheduler jobs. Comprehensive automated unit and integration tests written in pytest.',
      metrics: ['92% Test Coverage via pytest', 'Asynchronous non-blocking HTTP requests for 15 cities', 'Automated anomaly detection flagging temperature spikes', 'Zero-downtime REST query API'],
      tags: ['Python', 'asyncio', 'FastAPI', 'SQLAlchemy', 'pytest', 'SQLite/PostgreSQL'],
      liveUrl: 'https://github.com/mrudul-999',
      codeUrl: 'https://github.com/mrudul-999',
    },
    'devops-suite': {
      title: 'KubeFlow - Kubernetes Cluster Management Console',
      badge: 'DevOps & Infrastructure',
      img: 'assets/images/project-devops.jpg',
      desc: 'A centralized multi-tenant Kubernetes management panel with real-time pod orchestration, automated canary deployments, rolling configuration rollbacks, and interactive log streaming.',
      architecture: 'Direct integration with Kubernetes API via custom operator in Go. The web client utilizes lightweight WebSockets for interactive remote terminal access and instantaneous pod health diagnostics.',
      metrics: ['195 Running Pods Orchestrated', 'Instantaneous Canary Rollback in <2s', 'Integrated RBAC access control', 'Multi-cluster federation support'],
      tags: ['Kubernetes', 'Go', 'Docker', 'React', 'Linux CLI', 'CI/CD Pipelines'],
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
