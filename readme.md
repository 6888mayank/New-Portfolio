# 🚀 Mayank Sharma — 3D Interactive Retro Portfolio & MayankOS

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://mayank-portfolio-two-virid.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-6888mayank-181717?style=for-the-badge&logo=github)](https://github.com/6888mayank)
[![Three.js](https://img.shields.io/badge/Three.js-0.137-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

<h3>An immersive 3D retro workspace portfolio built with Three.js, WebGL, custom GLSL shaders, and an interactive retro desktop OS.</h3>

<p>
  <strong>🌐 Live Production:</strong> 
  <a href="https://mayank-portfolio-two-virid.vercel.app">mayank-portfolio-two-virid.vercel.app</a>
</p>

</div>

---

## 👨‍💻 About Me

Hi, I'm **Mayank Sharma**, a **Software Engineer & AI Engineer** pursuing a Bachelor's degree in Computer Science (Data Science, Artificial Intelligence, Machine Learning) at **GLA University, Mathura** with academic coursework from **IIT Guwahati**.

* 💼 **Current Role:** Junior Software Developer (AI) at *Satya Support Services*
* 🤖 **Core Focus:** Agentic AI (multi-agent workflows, tool execution, multi-step reasoning), Retrieval-Augmented Generation (RAG) pipelines, Vector Databases, and resilient microservices / REST APIs.
* 🛠️ **Languages & Frameworks:** Python, Java, TypeScript, JavaScript, React.js, Node.js, Express.js, Spring Boot, Spring AI.

---

## ✨ Features & Architecture

### 🖥️ 3D Photorealistic Workspace
* Rendered using **Three.js** and **WebGL** with pre-baked high-resolution textures and lighting from Blender for 60 FPS performance across devices.
* Animated coffee steam and CRT monitor scanlines rendered using custom **GLSL vertex and fragment shaders**.
* Realistic spatial audio system featuring retro mechanical keyboard clicks, mouse up/down feedback, and ambient office hum.

### 🪟 MayankOS (Interactive CRT Monitor)
* The CRT monitor on the desk runs **MayankOS** — an interactive 90s retro desktop embedded using Three.js `CSS3DRenderer`.
* **Draggable & Resizable Windows:**
  * 👨‍💻 **About Mayank:** Professional summary, background, and career focus.
  * 💼 **Work Experience:** Roles at Satya Support Services, Enigoal, and Coding Blocks.
  * 🚀 **Projects Showcase:** Agentic-AI System, Payment Orchestration Engine, Order Management System, Speedopro, and more.
  * ⚡ **Technical Skills:** Categorized inventory of AI/ML, languages, cloud, and backend skills.
  * 🎓 **Education & Certifications:** GLA University, IIT Guwahati, Wipro DICE Cyber Security, Coding Blocks, NIELIT CCC.
  * 📟 **MS-DOS Interactive Terminal (`Terminal.exe`):** Functional CLI terminal that responds to commands (`help`, `bio`, `skills`, `projects`, `exp`, `edu`, `contact`, `clear`) with synchronized 3D mechanical keyboard audio feedback!
  * ✉️ **Contact Form:** Direct communication portal.

### 🎥 Seamless Camera System
* **Instant Desk Focus:** Clicking START immediately moves the camera into a focused desk and monitor view.
* **Monitor Zoom:** Hovering or clicking on the CRT screen seamlessly zooms into MayankOS.
* **FreeCam Mode:** Toggle 360° orbit controls to inspect the entire 3D workspace.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **3D & Graphics** | Three.js (v0.137), WebGL, CSS3DRenderer, Draco GLTF Compression |
| **Shaders** | Custom GLSL (glslify) for CRT jitter & coffee steam |
| **Frontend & UI** | React 17, TypeScript, Framer Motion, Vanilla CSS |
| **Animation & Controls** | GSAP, Tween.js, Bezier-Easing, OrbitControls |
| **Build & Tooling** | Webpack 5, Babel, ts-loader |
| **Deployment** | Vercel (Auto-deploy from `main` branch) |

---

## 🚀 Local Development Setup

To run this project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/6888mayank/New-Portfolio.git

# 2. Navigate to project folder
cd New-Portfolio

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open `http://localhost:8080` in your browser.

### Production Build

```bash
# Build production bundle to public/
npm run build

# Start local server
npm start
```

---

## 📬 Contact & Connect

* **Portfolio:** [mayank-portfolio-two-virid.vercel.app](https://mayank-portfolio-two-virid.vercel.app)
* **GitHub:** [@6888mayank](https://github.com/6888mayank)

---

<div align="center">
  <sub>Concept originally inspired by Henry Heffernan. Customized, enhanced, and engineered by Mayank Sharma.</sub>
</div>
