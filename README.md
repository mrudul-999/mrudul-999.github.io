# 🚀 Modern Developer Portfolio for GitHub Pages

A high-performance, glassmorphic personal developer portfolio website designed specifically for zero-friction hosting on **GitHub Pages**.

Built with modern semantic **HTML5**, **Vanilla CSS (Design Tokens & Glassmorphism)**, and **JavaScript**, featuring fluid micro-interactions, responsive grids, and dark/light themes.

---

## ✨ Features Included

- 🌌 **Interactive Constellation Canvas**: Lightweight HTML5 particle mesh that reacts subtly to mouse physics and pauses off-screen for 60 FPS performance.
- 🌓 **Dynamic Theme Switcher**: Seamless Dark & Light modes with persistent `localStorage` memory and system OS preference detection.
- 🎴 **3D Tilt Developer Card**: Interactive 3D perspective hero card with specular reflection and floating tech badges.
- ⌨️ **Typewriter Subtitle**: Rotating roles highlighting Full Stack, Cloud Architecture, AI Systems, and UI engineering.
- 📊 **Animated Counters**: Scroll-triggered performance metrics count-up (shipped projects, uptime standard, experience).
- 🔍 **Interactive Project Filter & Modal Case Studies**: Filter projects by domain (AI, Cloud, FinTech, DevOps) and click to view full architectural case study modals.
- 📋 **1-Click Direct Copy Email**: Instant clipboard copy with visual feedback toast notification.
- 📬 **Interactive Contact Form**: Client-side validation, loading spinner state, and success toast.
- ⚡ **SEO & Social Share Ready**: Complete OpenGraph, Twitter Cards, semantic HTML5, favicon SVG, and `sitemap.xml`.
- 📱 **100% Mobile Responsive**: Fluid layouts on smartphones, tablets, laptops, and ultra-wide displays.

---

## 🚀 How to Deploy to GitHub Pages (In 3 Minutes)

You can deploy this as either your **User Site** (`https://<username>.github.io`) or as a **Project Site** (`https://<username>.github.io/portfolio`).

### Option 1: As Your Main Profile Site (`<username>.github.io`) — Recommended

1. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new)
   - Set the repository name exactly as: `<your-github-username>.github.io`
   - Set repository visibility to **Public**
   - Do **not** initialize with a README (this folder already has one)

2. **Push your code from terminal**:
   ```bash
   cd /Users/mrudul/.gemini/antigravity-ide/scratch/portfolio

   # Initialize git repository
   git init
   git add .
   git commit -m "Initial portfolio release for GitHub Pages"

   # Rename branch to main
   git branch -M main

   # Link to your new GitHub repo and push
   git remote add origin https://github.com/<your-github-username>/<your-github-username>.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** ➔ **Pages** (in the left sidebar)
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`
     - **Branch**: Select `main` / `/ (root)`
     - Click **Save**
   *(Note: A pre-configured `.github/workflows/deploy.yml` is also included if you prefer GitHub Actions mode!)*

4. **Your site is live!** Visit `https://<your-github-username>.github.io` (usually takes ~60 seconds to propagate).

---

### Option 2: As a Project Subdirectory (`<username>.github.io/portfolio`)

If you want the repository named `portfolio`:
1. Create a GitHub repo named `portfolio`.
2. Push this folder to `https://github.com/<your-username>/portfolio.git`.
3. In GitHub **Settings** ➔ **Pages**, select branch `main` and folder `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io/portfolio/`.

---

## 🛠️ Local Development & Testing

To preview the website locally on your computer:

```bash
cd /Users/mrudul/.gemini/antigravity-ide/scratch/portfolio

# Option A: Using Python built-in server (instant)
python3 -m http.server 8000

# Option B: Using Node npx
npx -y serve .
```

Open your browser and navigate to `http://localhost:8000`.

---

## 🎨 Customizing Your Portfolio

### 1. Update Personal Information
Open [`index.html`](index.html) and search for:
- Name (`Mrudul`)
- Email (`mrudul.dev@gmail.com` in hero, contact card, and copy button)
- Social links: GitHub and LinkedIn URLs
- Career Timeline entries in the `<section class="experience">`

### 2. Update Profile & Project Images
Images are stored in `assets/images/`:
- `avatar.jpg`: Your portrait photo
- `project-ai-workspace.jpg`: Project 1 screenshot
- `project-cloud.jpg`: Project 2 screenshot
- `project-fintech.jpg`: Project 3 screenshot
- `project-devops.jpg`: Project 4 screenshot

### 3. Add Custom Domain (Optional)
If you have your own domain (e.g. `mrudul.dev`):
1. Create a file named `CNAME` in the root of this folder containing your domain:
   ```txt
   mrudul.dev
   ```
2. Configure DNS A-records pointing to GitHub Pages IPs.

---

## 📂 Project Directory Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions automated deployment workflow
├── assets/
│   └── images/               # High-res generated assets
│       ├── avatar.jpg
│       ├── project-ai-workspace.jpg
│       ├── project-cloud.jpg
│       ├── project-devops.jpg
│       └── project-fintech.jpg
├── css/
│   └── style.css             # Glassmorphism design system & responsive layout
├── js/
│   ├── canvas-bg.js          # Interactive particle constellation engine
│   └── main.js               # Theme toggle, modal, counters, toast engine
├── 404.html                  # Custom GitHub Pages 404 error page
├── index.html                # Main entry point for GitHub Pages
├── robots.txt                # SEO crawler directives
├── sitemap.xml               # Search engine index sitemap
└── README.md                 # Deployment & setup documentation
```
