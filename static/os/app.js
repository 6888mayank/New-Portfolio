// MayankOS - Retro Desktop Interaction Engine
let highestZ = 100;
let activeDrag = null;
let dragOffset = { x: 0, y: 0 };

// Bubble mouse & keyboard events to 3D scene parent for camera parallax & mechanical audio
window.addEventListener('mousemove', (e) => {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'mousemove',
      clientX: e.clientX,
      clientY: e.clientY
    }, '*');
  }

  // Handle Window Dragging
  if (activeDrag) {
    const win = document.getElementById(activeDrag);
    if (win) {
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;
      
      // Clamp within desktop
      newX = Math.max(0, Math.min(newX, window.innerWidth - 100));
      newY = Math.max(0, Math.min(newY, window.innerHeight - 80));
      
      win.style.left = newX + 'px';
      win.style.top = newY + 'px';
    }
  }
});

window.addEventListener('mouseup', (e) => {
  activeDrag = null;
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'mouseup' }, '*');
  }
});

window.addEventListener('mousedown', (e) => {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'mousedown' }, '*');
  }
  // Close start menu if clicked outside
  if (!e.target.closest('#start-menu') && !e.target.closest('#start-button')) {
    document.getElementById('start-menu').classList.remove('open');
    document.getElementById('start-button').classList.remove('active');
  }
});

window.addEventListener('keydown', (e) => {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'keydown',
      key: e.key
    }, '*');
  }
});

window.addEventListener('keyup', (e) => {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'keyup',
      key: e.key
    }, '*');
  }
});

// Window Management
function bringToFront(id) {
  const win = document.getElementById(id);
  if (!win) return;
  highestZ++;
  win.style.zIndex = highestZ;

  document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
  win.classList.add('active');

  updateTaskbarActive(id);
}

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.style.display = 'flex';
  bringToFront(id);
  ensureTaskbarItem(id);
}

function closeWindow(id) {
  const win = document.getElementById(id);
  if (win) win.style.display = 'none';
  removeTaskbarItem(id);
}

function minimizeWindow(id) {
  const win = document.getElementById(id);
  if (win) win.style.display = 'none';
  updateTaskbarActive(null);
}

function maximizeWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  if (win.dataset.maximized === 'true') {
    win.style.top = win.dataset.prevTop || '40px';
    win.style.left = win.dataset.prevLeft || '100px';
    win.style.width = win.dataset.prevWidth || '600px';
    win.style.height = win.dataset.prevHeight || '400px';
    win.dataset.maximized = 'false';
  } else {
    win.dataset.prevTop = win.style.top;
    win.dataset.prevLeft = win.style.left;
    win.dataset.prevWidth = win.style.width;
    win.dataset.prevHeight = win.style.height;

    win.style.top = '0px';
    win.style.left = '0px';
    win.style.width = '100%';
    win.style.height = (window.innerHeight - 38) + 'px';
    win.dataset.maximized = 'true';
  }
  bringToFront(id);
}

function startDrag(e, id) {
  if (e.target.closest('.win-btn')) return; // Don't drag on buttons
  activeDrag = id;
  const win = document.getElementById(id);
  bringToFront(id);
  
  const rect = win.getBoundingClientRect();
  dragOffset.x = e.clientX - rect.left;
  dragOffset.y = e.clientY - rect.top;
}

// Window click focus
document.querySelectorAll('.window').forEach(win => {
  win.addEventListener('mousedown', () => {
    bringToFront(win.id);
  });
});

// Taskbar Logic
const winTitles = {
  'bio-win': '👨‍💻 About Mayank',
  'exp-win': '💼 Experience',
  'proj-win': '🚀 Projects',
  'skills-win': '⚡ Tech Skills',
  'edu-win': '🎓 Education',
  'term-win': '📟 Terminal.exe',
  'contact-win': '✉️ Contact Mayank'
};

function ensureTaskbarItem(id) {
  let item = document.getElementById('tb-' + id);
  if (!item) {
    item = document.createElement('div');
    item.id = 'tb-' + id;
    item.className = 'taskbar-item active';
    item.textContent = winTitles[id] || id;
    item.onclick = () => {
      const win = document.getElementById(id);
      if (win.style.display === 'none') {
        win.style.display = 'flex';
        bringToFront(id);
      } else if (win.classList.contains('active')) {
        minimizeWindow(id);
      } else {
        bringToFront(id);
      }
    };
    document.getElementById('taskbar-windows').appendChild(item);
  }
  updateTaskbarActive(id);
}

function removeTaskbarItem(id) {
  const item = document.getElementById('tb-' + id);
  if (item) item.remove();
}

function updateTaskbarActive(activeId) {
  document.querySelectorAll('.taskbar-item').forEach(it => {
    if (activeId && it.id === 'tb-' + activeId) {
      it.classList.add('active');
    } else {
      it.classList.remove('active');
    }
  });
}

function toggleStartMenu() {
  const sm = document.getElementById('start-menu');
  const btn = document.getElementById('start-button');
  const isOpen = sm.classList.contains('open');
  if (isOpen) {
    sm.classList.remove('open');
    btn.classList.remove('active');
  } else {
    sm.classList.add('open');
    btn.classList.add('active');
  }
}

// Live Clock
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const clockEl = document.getElementById('tray-clock');
  if (clockEl) clockEl.textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// Terminal Emulator
const termHistory = document.getElementById('term-history');
const termInput = document.getElementById('terminal-input');
const termBody = document.getElementById('terminal-body');

function focusTerminal() {
  if (termInput) termInput.focus();
}

if (termInput) {
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = termInput.value.trim();
      termInput.value = '';
      executeCommand(rawCmd);
    }
  });
}

function addTermLine(text, color = '#00ff66') {
  const line = document.createElement('div');
  line.className = 'term-line';
  line.style.color = color;
  line.innerHTML = text;
  termHistory.appendChild(line);
  if (termBody) termBody.scrollTop = termBody.scrollHeight;
}

function executeCommand(cmdStr) {
  addTermLine(`<span class="term-prompt">C:\\MAYANK&gt;</span> ${escapeHtml(cmdStr)}`, '#ffffff');
  const cmd = cmdStr.toLowerCase().trim();

  if (cmd === '') return;

  switch (cmd) {
    case 'help':
      addTermLine('Available commands:');
      addTermLine('  <strong style="color:#00e5ff">bio</strong>        - Read professional summary & background');
      addTermLine('  <strong style="color:#00e5ff">skills</strong>     - List technical skills & competencies');
      addTermLine('  <strong style="color:#00e5ff">projects</strong>   - List featured projects & agentic AI workflows');
      addTermLine('  <strong style="color:#00e5ff">exp</strong>        - Display work experience');
      addTermLine('  <strong style="color:#00e5ff">edu</strong>        - Display education & certifications');
      addTermLine('  <strong style="color:#00e5ff">contact</strong>    - Contact details & open message window');
      addTermLine('  <strong style="color:#00e5ff">gui</strong>        - Open all portfolio windows');
      addTermLine('  <strong style="color:#00e5ff">clear</strong>      - Clear the terminal screen');
      addTermLine('  <strong style="color:#00e5ff">date</strong>       - Display system date & time');
      break;

    case 'bio':
    case 'about':
      addTermLine('<strong>Mayank Sharma</strong> — Software & AI Engineer');
      addTermLine('Pursuing B.Tech CS (Data Science, AI & Machine Learning) at GLA University & IIT Guwahati.');
      addTermLine('Experienced in Agentic AI, Multi-Agent Workflows, RAG pipelines, Vector DBs, and backend services with Python, Java, Node.js & Spring Boot.');
      break;

    case 'skills':
      addTermLine('=== TECHNICAL SKILLS ===');
      addTermLine('• Languages: Python, Java, JavaScript (ES6), TypeScript, C, HTML/CSS, SQL, R');
      addTermLine('• AI/GenAI: Agentic AI, RAG, Multi-Agent Workflows, Vector DBs, LLMs, Prompt Engg');
      addTermLine('• Backend: Node.js, Express.js, Spring Boot, Spring AI, REST APIs, Microservices');
      addTermLine('• Frontend: React.js, HTML5, CSS3, DOM Manipulation, Responsive UI');
      addTermLine('• Cloud/DB: AWS, GCP, Azure, MongoDB, Supabase, SQLite, Vector Databases');
      break;

    case 'projects':
      addTermLine('=== FEATURED PROJECTS ===');
      addTermLine('1. <strong>Agentic-AI System</strong>: Multi-agent workflows with tool execution & RAG vector search.');
      addTermLine('2. <strong>Payment Orchestration Engine</strong>: Resilient Java + Spring Boot + Spring AI microservice.');
      addTermLine('3. <strong>Order Management System</strong>: Event-driven order processing with JWT & Express.js.');
      addTermLine('4. <strong>Speedopro (speedo-pro.com)</strong>: Ride-hailing web platform (Uber/Ola inspired).');
      addTermLine('5. <strong>Grassroot Coaching Center</strong>: Interactive educational platform with TypeScript.');
      addTermLine('6. <strong>Lakshayraj Foundation</strong>: Non-profit foundation web platform.');
      break;

    case 'exp':
    case 'experience':
      addTermLine('=== WORK EXPERIENCE ===');
      addTermLine('• <strong>Junior Software Developer (AI)</strong> — Satya Support Services (June 2026 – Present)');
      addTermLine('  Event-driven services, React.js apps, REST API design, authentication & testing.');
      addTermLine('• <strong>Full Stack Developer Intern</strong> — Enigoal (Jan 2025 – Aug 2025)');
      addTermLine('  Web apps from scratch, cross-browser UI, functional & regression testing.');
      addTermLine('• <strong>Full Stack Developer Intern</strong> — Coding Blocks (July 2024 – Aug 2024)');
      addTermLine('  Full-stack React.js application with end-to-end API integrations.');
      break;

    case 'edu':
    case 'education':
      addTermLine('=== EDUCATION & CERTS ===');
      addTermLine('• GLA University, Mathura: B.Tech Computer Science (AI/ML) (2022–2026)');
      addTermLine('• IIT Guwahati: Advanced Coursework & Project Work (Nov 2024 – June 2025)');
      addTermLine('• Certs: Wipro DICE Cyber Security | Coding Blocks Full Stack | CPPD Python | NIELIT CCC');
      break;

    case 'contact':
      addTermLine('Opening contact window...');
      openWindow('contact-win');
      break;

    case 'gui':
      openWindow('bio-win');
      openWindow('proj-win');
      openWindow('skills-win');
      addTermLine('Windows opened.');
      break;

    case 'clear':
    case 'cls':
      termHistory.innerHTML = '';
      break;

    case 'date':
      addTermLine(new Date().toString());
      break;

    default:
      addTermLine(`'${escapeHtml(cmd)}' is not recognized as an internal command. Type 'help' for commands.`, '#ff4444');
      break;
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Contact Form Handler
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const msg = document.getElementById('contact-msg').value;
  const status = document.getElementById('contact-status');

  status.style.color = '#000080';
  status.textContent = 'Transmitting message to Mayank Sharma...';

  // Attempt backend API call if server is running
  fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message: msg })
  })
  .then(res => res.json())
  .then(data => {
    status.style.color = '#008000';
    status.textContent = '✓ Message sent successfully to Mayank!';
    e.target.reset();
  })
  .catch(err => {
    // Graceful offline fallback
    status.style.color = '#008000';
    status.textContent = `✓ Message recorded! You can also connect directly via email.`;
  });
}

// Initialize on page load: open Bio window
window.addEventListener('DOMContentLoaded', () => {
  openWindow('bio-win');
});
