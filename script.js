// ============================================================
//  FILE / FOLDER DIRECTORY MANAGEMENT SYSTEM
//  Tree Data Structure + Integrated Multi-Language Code Editor
//  Each node: { name, type: "folder"|"file", children: [], content: "" }
// ============================================================

// ── STARTER TEMPLATES BY FILE EXTENSION ──────────────────────────────────────
const STARTER_TEMPLATES = {
  html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>New Document</title>\n  <style>\n    body { font-family: sans-serif; padding: 2rem; }\n    h1 { color: #2f5bea; }\n  </style>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>Created in File Directory Management System.</p>\n</body>\n</html>',
  py: '#!/usr/bin/env python3\n"""Sample Python Script"""\n\ndef main():\n    print("Hello from Python!")\n    numbers = [1, 2, 3, 4, 5]\n    squared = [x ** 2 for x in numbers]\n    print(f"Squares: {squared}")\n\nif __name__ == "__main__":\n    main()\n',
  js: '// JavaScript Module\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Developer"));\n',
  css: '/* Stylesheet */\n\n:root {\n  --primary: #2f5bea;\n  --bg: #f8fafc;\n}\n\nbody {\n  font-family: system-ui, sans-serif;\n  background: var(--bg);\n  margin: 0;\n  padding: 1.5rem;\n}\n',
  json: '{\n  "projectName": "My Project",\n  "version": "1.0.0",\n  "active": true,\n  "items": [\n    "sample 1",\n    "sample 2"\n  ]\n}\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}\n',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}\n',
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}\n',
  sql: '-- SQL Sample Query\nSELECT id, name, email, created_at\nFROM users\nWHERE active = 1\nORDER BY created_at DESC;\n',
  md: '# Documentation\n\n## Overview\nThis file was created in the File Directory Management System.\n\n### Features\n- Tree Data Structure\n- Multi-language Code Editor\n- Recursive Search & Rendering\n',
  txt: 'Hello! This is a plain text file.\nYou can edit, save, and manage files in this folder.\n'
};

// ── DEFAULT SEED TREE ────────────────────────────────────────────────────────
const DEFAULT_TREE = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "Documents",
      type: "folder",
      children: [
        {
          name: "Resume.txt",
          type: "file",
          children: [],
          content: "VINOTH\nFull Stack Developer & Student\n\nTechnical Skills:\n- Languages: JavaScript, Python, C++, HTML5, CSS3\n- Core Concepts: Data Structures & Algorithms (Trees, Graphs, Recursion)\n- Tools: Git, GitHub, Vercel, VS Code\n\nProjects:\n1. File / Folder Directory Management System (Mini Project)\n2. Interactive Web Applications\n\nEducation:\nB.E. Computer Science & Engineering"
        },
        {
          name: "ProjectNotes.md",
          type: "file",
          children: [],
          content: "# Mini Project Viva Notes\n\n## 1. What is a Tree Data Structure?\nA hierarchical, non-linear data structure consisting of nodes connected by edges.\nEach node contains data and references to child nodes.\n\n## 2. Where is Recursion used?\n- `searchTree()`: Recursively traverses subtrees to find nodes matching query.\n- `renderTree()`: Recursively formats directory tree with connectors (├──, └──).\n- `deleteNode()`: Removes parent reference, automatically deleting full subtree.\n\n## 3. Team Members:\n- Team Leader: Vinoth\n- Members: Elango, Naresh, Velumani"
        }
      ]
    },
    {
      name: "SourceCode",
      type: "folder",
      children: [
        {
          name: "index.html",
          type: "file",
          children: [],
          content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <title>Sample Web Page</title>\n  <style>\n    body { font-family: sans-serif; padding: 2rem; background: #f0f4ff; }\n    h1 { color: #2f5bea; }\n  </style>\n</head>\n<body>\n  <h1>Welcome to Directory Management!</h1>\n  <p>Click "Run HTML" in the editor toolbar to view this page live.</p>\n</body>\n</html>'
        },
        {
          name: "style.css",
          type: "file",
          children: [],
          content: "/* Theme Styles */\n:root {\n  --accent: #2f5bea;\n  --bg: #ffffff;\n  --text: #1a202c;\n}\n\n.card {\n  border-radius: 12px;\n  box-shadow: 0 4px 16px rgba(0,0,0,0.08);\n  padding: 1.5rem;\n}"
        },
        {
          name: "app.py",
          type: "file",
          children: [],
          content: '#!/usr/bin/env python3\n"""Tree Data Structure Implementation in Python"""\n\nclass TreeNode:\n    def __init__(self, name, node_type="file"):\n        self.name = name\n        self.type = node_type\n        self.children = []\n        self.content = ""\n\n    def add_child(self, child):\n        self.children.append(child)\n\ndef recursive_search(node, query):\n    results = []\n    if query.lower() in node.name.lower():\n        results.append(node.name)\n    for child in node.children:\n        results.extend(recursive_search(child, query))\n    return results\n\nif __name__ == "__main__":\n    root = TreeNode("root", "folder")\n    print(f"Tree initialized with root: {root.name}")'
        },
        {
          name: "script.js",
          type: "file",
          children: [],
          content: '// Main Logic\nfunction createNode(name, type) {\n  return {\n    name: name.trim(),\n    type: type,\n    children: [],\n    content: ""\n  };\n}\n\nconsole.log("Tree System Ready!");'
        }
      ]
    },
    {
      name: "config.json",
      type: "file",
      children: [],
      content: '{\n  "appName": "File Directory Management System",\n  "version": "2.0.0",\n  "editor": {\n    "tabSize": 4,\n    "syntaxHighlighting": true,\n    "autoSave": true\n  },\n  "team": {\n    "leader": "Vinoth",\n    "members": ["Elango", "Naresh", "Velumani"]\n  }\n}'
    },
    {
      name: "query.sql",
      type: "file",
      children: [],
      content: "-- College Project Database Sample\nCREATE TABLE directory_nodes (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    parent_id INT NULL,\n    name VARCHAR(255) NOT NULL,\n    type ENUM('folder', 'file') NOT NULL,\n    content LONGTEXT,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nSELECT * FROM directory_nodes ORDER BY type, name ASC;"
    }
  ]
};

// ── STATE ────────────────────────────────────────────────────────────────────
let root;
let navPath = [];        // Navigation stack from root down to current folder
let createMode = null;   // "folder" | "file" | null
let pendingDel = null;   // { parent, target }
let openFile = null;     // Active file node displayed in editor
let editMode = false;    // Whether editor is in textarea edit mode
let toastTimer = null;

// ── PERSISTENCE (localStorage with try/catch) ────────────────────────────────
function saveTree() {
  try {
    localStorage.setItem("fds_v3_tree", JSON.stringify(root));
  } catch (e) {
    console.warn("localStorage save failed:", e);
  }
}

function loadTree() {
  try {
    const raw = localStorage.getItem("fds_v3_tree");
    if (raw) {
      root = JSON.parse(raw);
      sanitizeTree(root);
      return true;
    }
  } catch (e) {
    console.warn("localStorage load failed:", e);
  }
  return false;
}

// Ensure every node in tree has valid properties
function sanitizeTree(node) {
  if (!node) return;
  if (typeof node.content !== "string") node.content = "";
  if (!Array.isArray(node.children)) node.children = [];
  node.children.forEach(sanitizeTree);
}

// ── HELPERS ──────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cur() {
  return navPath[navPath.length - 1];
}

function createNode(name, type) {
  const trimmed = name.trim();
  const ext = getExt(trimmed);
  const defaultContent = (type === "file" && STARTER_TEMPLATES[ext]) ? STARTER_TEMPLATES[ext] : "";
  return {
    name: trimmed,
    type: type,
    children: [],
    content: defaultContent
  };
}

// ── FILE EXTENSION & LANGUAGE MAP ────────────────────────────────────────────
const LANG_MAP = {
  js: "JavaScript", ts: "TypeScript", jsx: "JSX", tsx: "TSX",
  html: "HTML", htm: "HTML",
  css: "CSS", scss: "SCSS",
  py: "Python", java: "Java",
  c: "C", cpp: "C++", cs: "C#",
  go: "Go", rs: "Rust", rb: "Ruby", php: "PHP",
  swift: "Swift", kt: "Kotlin", sh: "Shell",
  json: "JSON", xml: "XML", yaml: "YAML", yml: "YAML",
  md: "Markdown", txt: "Plain Text", csv: "CSV", sql: "SQL"
};

const ICON_MAP = {
  js: "🟨", ts: "🔷", jsx: "⚛️", tsx: "⚛️",
  html: "🌐", htm: "🌐", css: "🎨", scss: "🎨",
  py: "🐍", java: "☕", c: "⚙️", cpp: "⚙️", cs: "💠",
  go: "🐹", rs: "🦀", rb: "💎", php: "🐘", swift: "🍎",
  kt: "🎯", sh: "🖥️", json: "📋", xml: "📄", yaml: "📄", yml: "📄",
  md: "📝", txt: "📝", csv: "📊", sql: "🗄️",
  pdf: "📕", zip: "🗜️",
  jpg: "🖼️", jpeg: "🖼️", png: "🖼️", gif: "🖼️", svg: "🖼️", webp: "🖼️"
};

function getExt(name) {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

function getLang(name) {
  return LANG_MAP[getExt(name)] || "Text";
}

function getIcon(name) {
  return ICON_MAP[getExt(name)] || "📄";
}

// ── SYNTAX HIGHLIGHTER ───────────────────────────────────────────────────────
function highlight(code, lang) {
  let h = esc(code);

  if (lang === "HTML") {
    // HTML Comments
    h = h.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tok-comment">$1</span>');
    // Tags and attributes
    h = h.replace(/(&lt;\/?)([\w-]+)([^&]*?)(\/?&gt;)/g, (_, op, tag, attrs, cl) => {
      const formattedAttrs = attrs.replace(/([\w:-]+)(=)/g, '<span class="tok-attr">$1</span><span class="tok-op">$2</span>');
      return `${op}<span class="tok-tag">${tag}</span>${formattedAttrs}${cl}`;
    });
    // Attribute strings
    h = h.replace(/(&quot;[^&]*?&quot;)/g, '<span class="tok-string">$1</span>');
    return h;
  }

  if (lang === "CSS" || lang === "SCSS") {
    h = h.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>');
    h = h.replace(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))/g, '<span class="tok-number">$1</span>');
    h = h.replace(/(&quot;[^&]*?&quot;|'[^']*')/g, '<span class="tok-string">$1</span>');
    h = h.replace(/\b([\w-]+)\s*(?=:)/g, '<span class="tok-property">$1</span>');
    h = h.replace(/\b(\d+\.?\d*)(px|em|rem|vh|vw|%|pt|s|ms|deg)?\b/g, '<span class="tok-number">$1$2</span>');
    return h;
  }

  if (lang === "Python") {
    const pyKws = /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g;
    const pyBuiltins = /\b(print|len|range|enumerate|zip|map|filter|list|dict|tuple|set|str|int|float|bool|type|isinstance|hasattr|getattr|setattr|open|super|self|__init__|__name__|__main__)\b/g;
    h = h.replace(/(#[^\n]*)/g, '<span class="tok-comment">$1</span>');
    h = h.replace(/('(?:[^'\\]|\\.)*'|&quot;(?:[^&]|&(?!quot;))*?&quot;)/g, '<span class="tok-string">$1</span>');
    h = h.replace(/(@[\w.]+)/g, '<span class="tok-decorator">$1</span>');
    h = h.replace(pyKws, '<span class="tok-keyword">$1</span>');
    h = h.replace(pyBuiltins, '<span class="tok-builtin">$1</span>');
    h = h.replace(/\b(\d+\.?\d*)\b/g, '<span class="tok-number">$1</span>');
    return h;
  }

  if (lang === "JSON") {
    h = h.replace(/(&quot;[^&]*?&quot;)\s*:/g, '<span class="tok-property">$1</span>:');
    h = h.replace(/:\s*(&quot;[^&]*?&quot;)/g, ': <span class="tok-string">$1</span>');
    h = h.replace(/\b(true|false|null)\b/g, '<span class="tok-keyword">$1</span>');
    h = h.replace(/\b(\d+\.?\d*)\b/g, '<span class="tok-number">$1</span>');
    return h;
  }

  if (lang === "SQL") {
    const sqlKws = /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|PRIMARY|KEY|AUTO_INCREMENT|NOT|NULL|DEFAULT|TIMESTAMP|ORDER|BY|GROUP|HAVING|LIMIT|JOIN|INNER|LEFT|RIGHT|OUTER|ON|AND|OR|AS|DESC|ASC|COUNT|SUM|AVG|MIN|MAX)\b/gi;
    h = h.replace(/(--[^\n]*)/g, '<span class="tok-comment">$1</span>');
    h = h.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="tok-string">$1</span>');
    h = h.replace(sqlKws, '<span class="tok-keyword">$1</span>');
    h = h.replace(/\b(\d+\.?\d*)\b/g, '<span class="tok-number">$1</span>');
    return h;
  }

  // JS / TS / Java / C / C++ / Go / Rust / PHP / etc.
  const generalKws = /\b(abstract|as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|type|typeof|undefined|var|void|while|with|yield|int|float|double|boolean|char|string|String|byte|long|short|include|stdio|iostream)\b/g;
  h = h.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>');
  h = h.replace(/(\/\/[^\n]*)/g, '<span class="tok-comment">$1</span>');
  h = h.replace(/(&quot;(?:[^&]|&(?!quot;))*?&quot;|'(?:[^'\\]|\\.)*'|&#96;[^&#]*?&#96;)/g, '<span class="tok-string">$1</span>');
  h = h.replace(generalKws, '<span class="tok-keyword">$1</span>');
  h = h.replace(/\b(\d+\.?\d*)\b/g, '<span class="tok-number">$1</span>');
  return h;
}

// ── EDITOR CONTROLLER ────────────────────────────────────────────────────────
function openFileEditor(node) {
  openFile = node;
  editMode = false;

  const ext = getExt(node.name);
  const lang = getLang(node.name);
  const icon = getIcon(node.name);

  // Update Toolbar
  document.getElementById("editor-filename").textContent = node.name;
  document.getElementById("editor-file-icon").textContent = icon;
  document.getElementById("editor-lang-badge").textContent = lang.substring(0, 10);

  // Toolbar Actions
  document.getElementById("btn-edit-file").hidden = false;
  document.getElementById("btn-save-file").hidden = true;
  document.getElementById("btn-cancel-edit").hidden = true;
  document.getElementById("btn-download-file").hidden = false;

  // Show "Run HTML" button only if the open file is HTML
  const isHtml = (ext === "html" || ext === "htm");
  document.getElementById("btn-run-html").hidden = !isHtml;

  // Switch to read view
  showReadMode();
  renderDirList();
}

function showReadMode() {
  if (!openFile) return;

  const readBody = document.getElementById("editor-body-read");
  const editBody = document.getElementById("editor-body-edit");
  const empty = document.getElementById("editor-empty");
  const codeWrap = document.getElementById("code-wrap");
  const imgWrap = document.getElementById("image-preview-wrap");
  const imgEl = document.getElementById("image-preview");

  readBody.hidden = false;
  editBody.hidden = true;
  empty.style.display = "none";

  const content = openFile.content || "";
  const isDataImg = content.startsWith("data:image/");

  if (isDataImg && imgWrap && imgEl) {
    imgWrap.hidden = false;
    codeWrap.hidden = true;
    imgEl.src = content;
  } else {
    if (imgWrap) imgWrap.hidden = true;
    codeWrap.hidden = false;
    const lang = getLang(openFile.name);
    document.getElementById("code-view").innerHTML = highlight(content, lang);
    setLineNumbers("line-nums-read", content);
  }

  updateStatusBar("READ ONLY");
}

function enterEditMode() {
  if (!openFile) return;
  editMode = true;

  document.getElementById("btn-edit-file").hidden = true;
  document.getElementById("btn-save-file").hidden = false;
  document.getElementById("btn-cancel-edit").hidden = false;

  document.getElementById("editor-body-read").hidden = true;
  document.getElementById("editor-body-edit").hidden = false;

  const ta = document.getElementById("code-editor");
  ta.value = openFile.content || "";
  setLineNumbers("line-nums-edit", ta.value);
  updateStatusBar("EDITING");
  ta.focus();
}

function saveEdit() {
  if (!openFile) return;
  const ta = document.getElementById("code-editor");
  openFile.content = ta.value;
  saveTree();
  editMode = false;

  document.getElementById("btn-edit-file").hidden = false;
  document.getElementById("btn-save-file").hidden = true;
  document.getElementById("btn-cancel-edit").hidden = true;

  showReadMode();
  showToast("💾 Changes saved successfully!");
}

function cancelEdit() {
  if (!openFile) return;
  editMode = false;
  document.getElementById("btn-edit-file").hidden = false;
  document.getElementById("btn-save-file").hidden = true;
  document.getElementById("btn-cancel-edit").hidden = true;
  showReadMode();
}

function closeEditor() {
  openFile = null;
  editMode = false;

  document.getElementById("editor-body-read").hidden = false;
  document.getElementById("editor-body-edit").hidden = true;
  document.getElementById("editor-empty").style.display = "flex";
  document.getElementById("code-wrap").hidden = true;
  const imgWrap = document.getElementById("image-preview-wrap");
  if (imgWrap) imgWrap.hidden = true;

  document.getElementById("editor-filename").textContent = "No file open";
  document.getElementById("editor-file-icon").textContent = "📄";
  document.getElementById("editor-lang-badge").textContent = "TXT";

  document.getElementById("btn-edit-file").hidden = true;
  document.getElementById("btn-save-file").hidden = true;
  document.getElementById("btn-cancel-edit").hidden = true;
  document.getElementById("btn-run-html").hidden = true;
  document.getElementById("btn-download-file").hidden = true;

  updateStatusBar("IDLE");
  renderDirList();
}

function setLineNumbers(elementId, text) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const lines = (text || "").split("\n");
  el.textContent = lines.map((_, i) => i + 1).join("\n");
}

function syncLineNums() {
  const ta = document.getElementById("code-editor");
  setLineNumbers("line-nums-edit", ta.value);
  updateStatusBar("EDITING");
}

function updateStatusBar(mode) {
  if (!openFile) {
    document.getElementById("status-lang").textContent = "—";
    document.getElementById("status-lines").textContent = "0 lines";
    document.getElementById("status-chars").textContent = "0 chars";
    document.getElementById("status-mode").textContent = "IDLE";
    return;
  }
  const text = editMode ? document.getElementById("code-editor").value : (openFile.content || "");
  const lines = text ? text.split("\n").length : 0;
  const chars = text ? text.length : 0;

  document.getElementById("status-lang").textContent = getLang(openFile.name);
  document.getElementById("status-lines").textContent = lines + (lines === 1 ? " line" : " lines");
  document.getElementById("status-chars").textContent = chars + " chars";
  document.getElementById("status-mode").textContent = mode || (editMode ? "EDITING" : "READ ONLY");
}

// ── NAVIGATION & TREE OPERATIONS ─────────────────────────────────────────────
/**
 * navigate — moves into a folder node and updates breadcrumb & contents
 */
function navigate(folderNode) {
  if (folderNode.type !== "folder") return;
  const idx = navPath.indexOf(folderNode);
  if (idx !== -1) {
    navPath = navPath.slice(0, idx + 1);
  } else {
    navPath.push(folderNode);
  }
  cancelCreate();
  render();
}

/**
 * deleteNode — removes child node from its parent
 * Splicing from the array removes the entire subtree (O(1) reference deletion).
 */
function deleteNode(parentFolder, targetNode) {
  const idx = parentFolder.children.indexOf(targetNode);
  if (idx !== -1) {
    parentFolder.children.splice(idx, 1);
    // If we were inside the deleted folder, navigate back up
    if (navPath.includes(targetNode)) {
      navPath = navPath.slice(0, navPath.indexOf(targetNode));
    }
    // If the open file was deleted, close the editor
    if (openFile === targetNode) {
      closeEditor();
    }
    saveTree();
    render();
  }
}

/**
 * searchTree — RECURSIVE algorithm
 * Visits each node, checks if name matches query, and recursively traverses children.
 */
function searchTree(node, query, pathArr, results) {
  const currentPath = [...pathArr, node];
  if (node.name.toLowerCase().includes(query)) {
    results.push({ node, path: currentPath });
  }
  if (node.type === "folder" && Array.isArray(node.children)) {
    for (const child of node.children) {
      searchTree(child, query, currentPath, results); // ← Recursive step
    }
  }
}

/**
 * renderTreeLines — RECURSIVE algorithm
 * Builds visual text tree with ├── and └── box-drawing connectors.
 */
function renderTreeLines(node, prefix, isLast, lines, activeFolder) {
  const connector = isLast ? "└── " : "├── ";
  const icon = node.type === "folder" ? "📁" : getIcon(node.name);
  const isCurrent = (node === activeFolder);
  const cssClass = node.type === "folder"
    ? (isCurrent ? "tree-folder tree-current" : "tree-folder")
    : "tree-file";

  lines.push(`<span class="${cssClass}">${esc(prefix + connector + icon + " " + node.name)}</span>`);

  if (node.type === "folder" && node.children.length > 0) {
    const childPrefix = prefix + (isLast ? "    " : "│   ");
    node.children.forEach((child, i) => {
      const last = (i === node.children.length - 1);
      renderTreeLines(child, childPrefix, last, lines, activeFolder); // ← Recursive step
    });
  }
}

function renderTree() {
  const active = cur();
  const lines = [];
  const rootClass = (active === root) ? "tree-folder tree-current" : "tree-folder";
  lines.push(`<span class="${rootClass}">📁 ${esc(root.name)}</span>`);

  root.children.forEach((child, i) => {
    const isLast = (i === root.children.length - 1);
    renderTreeLines(child, "", isLast, lines, active);
  });

  document.getElementById("tree-view").innerHTML = lines.join("\n");
}

// ── RENDER BREADCRUMB ────────────────────────────────────────────────────────
function renderBreadcrumb() {
  const ol = document.getElementById("breadcrumb");
  ol.innerHTML = "";
  navPath.forEach((node, idx) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "crumb-btn" + (idx === navPath.length - 1 ? " active" : "");
    btn.textContent = (idx === 0) ? "🏠 Root" : node.name;
    btn.disabled = (idx === navPath.length - 1);
    if (idx < navPath.length - 1) {
      btn.onclick = () => navigate(node);
    }
    li.appendChild(btn);
    ol.appendChild(li);
  });
}

// ── RENDER DIRECTORY LIST ────────────────────────────────────────────────────
function renderDirList() {
  const folder = cur();
  document.getElementById("folder-title").textContent = (folder.name === "root") ? "Root" : folder.name;
  const ul = document.getElementById("dir-list");
  ul.innerHTML = "";

  if (!folder.children || folder.children.length === 0) {
    ul.innerHTML = '<li class="dir-empty">This folder is empty.<br><span style="font-size:0.75rem;opacity:0.7">Click "New File" or "Upload" to add files.</span></li>';
    return;
  }

  // Sort: Folders first, then files, alphabetically
  const sorted = [...folder.children].sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  sorted.forEach(child => {
    const li = document.createElement("li");
    const isOpen = (child === openFile);
    li.className = "dir-item" + (isOpen ? " is-open" : "");

    const icon = document.createElement("span");
    icon.className = "dir-item-icon";
    icon.textContent = (child.type === "folder") ? "📁" : getIcon(child.name);
    icon.style.color = (child.type === "folder") ? "var(--folder)" : "var(--file)";

    const name = document.createElement("span");
    name.className = "dir-item-name";
    name.textContent = child.name;

    const typeTag = document.createElement("span");
    typeTag.className = "dir-item-type";
    typeTag.textContent = (child.type === "folder") ? "folder" : getLang(child.name);

    const delBtn = document.createElement("button");
    delBtn.className = "dir-item-del";
    delBtn.textContent = "🗑";
    delBtn.title = "Delete " + child.name;
    delBtn.onclick = (e) => {
      e.stopPropagation();
      askDelete(folder, child);
    };

    if (child.type === "folder") {
      li.onclick = () => navigate(child);
    } else {
      li.onclick = () => openFileEditor(child);
    }

    li.append(icon, name, typeTag, delBtn);
    ul.appendChild(li);
  });
}

function render() {
  renderBreadcrumb();
  renderDirList();
  renderTree();
}

// ── CREATE FILE / FOLDER FLOW ────────────────────────────────────────────────
function showCreateForm(type) {
  createMode = type;
  document.getElementById("create-form-label").textContent = (type === "folder") ? "Folder name:" : "File name:";
  const inp = document.getElementById("create-input");
  inp.value = "";
  inp.placeholder = (type === "folder") ? "e.g. MyFolder" : "e.g. script.py, index.html";
  document.getElementById("create-error").hidden = true;
  document.getElementById("create-form").hidden = false;
  inp.focus();
}

function cancelCreate() {
  createMode = null;
  document.getElementById("create-form").hidden = true;
  document.getElementById("create-error").hidden = true;
}

function confirmCreate() {
  const inp = document.getElementById("create-input");
  const err = document.getElementById("create-error");
  const raw = inp.value.trim();

  // Validation 1: Empty name
  if (!raw) {
    err.textContent = "Name cannot be empty.";
    err.hidden = false;
    return;
  }

  // Validation 2: Case-insensitive duplicate in current folder
  const duplicate = cur().children.some(c => c.name.toLowerCase() === raw.toLowerCase());
  if (duplicate) {
    err.innerHTML = `A ${createMode} named "<strong>${esc(raw)}</strong>" already exists here.`;
    err.hidden = false;
    return;
  }

  // Create node and append
  const node = createNode(raw, createMode);
  cur().children.push(node);
  saveTree();
  cancelCreate();
  render();

  showToast(`${createMode === "folder" ? "📁" : getIcon(raw)} "${raw}" created!`);

  // Auto-open new file in editor and switch to edit mode immediately!
  if (createMode === "file") {
    openFileEditor(node);
    enterEditMode();
  }
}

// ── DELETE FLOW ──────────────────────────────────────────────────────────────
function askDelete(parentFolder, targetNode) {
  pendingDel = { parent: parentFolder, target: targetNode };
  const warn = (targetNode.type === "folder") ? " All files and subfolders inside it will also be deleted." : "";
  document.getElementById("modal-msg").innerHTML = `Delete ${targetNode.type} "<strong>${esc(targetNode.name)}</strong>"?${warn}`;
  document.getElementById("modal-overlay").hidden = false;
}

function closeModal() {
  pendingDel = null;
  document.getElementById("modal-overlay").hidden = true;
}

// ── SEARCH FLOW ──────────────────────────────────────────────────────────────
function runSearch() {
  const q = document.getElementById("search-input").value.trim().toLowerCase();
  const sl = document.getElementById("search-results");
  sl.innerHTML = "";

  if (!q) {
    sl.innerHTML = '<li class="search-no-results">Type something to search...</li>';
    return;
  }

  const results = [];
  searchTree(root, q, [], results);

  if (results.length === 0) {
    sl.innerHTML = '<li class="search-no-results">No results found.</li>';
    return;
  }

  results.forEach(({ node, path: np }) => {
    const li = document.createElement("li");
    li.className = "search-result-item";

    const ic = document.createElement("span");
    ic.style.fontSize = "1rem";
    ic.textContent = (node.type === "folder") ? "📁" : getIcon(node.name);

    const info = document.createElement("div");
    info.style.overflow = "hidden";

    const nm = document.createElement("div");
    nm.className = "search-result-name";
    nm.textContent = node.name;

    const ps = np.map(n => n.name === "root" ? "root" : n.name).join(" › ");
    const pe = document.createElement("div");
    pe.className = "search-result-path";
    pe.title = ps;
    pe.textContent = ps;

    info.append(nm, pe);
    li.append(ic, info);

    li.onclick = () => {
      // Navigate to location
      navPath = (node.type === "folder") ? np : np.slice(0, -1);
      render();
      if (node.type === "file") {
        openFileEditor(node);
      }
      document.getElementById("search-input").value = "";
      sl.innerHTML = "";
      showToast(`Navigated to "${ps}"`);
    };

    sl.appendChild(li);
  });
}

// ── TOAST NOTIFICATIONS ──────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById("toast");
  t.innerHTML = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

// ── INITIALIZATION & EVENT WIRING ────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Load from localStorage or initialize with rich default tree
  if (!loadTree()) {
    root = JSON.parse(JSON.stringify(DEFAULT_TREE));
    sanitizeTree(root);
    saveTree();
  }

  navPath = [root];
  render();

  // Explorer: Create Folder & File buttons
  document.getElementById("btn-add-folder").onclick = () => showCreateForm("folder");
  document.getElementById("btn-add-file").onclick = () => showCreateForm("file");
  document.getElementById("btn-confirm-create").onclick = confirmCreate;
  document.getElementById("btn-cancel-create").onclick = cancelCreate;
  document.getElementById("create-input").onkeydown = (e) => {
    if (e.key === "Enter") confirmCreate();
    if (e.key === "Escape") cancelCreate();
  };

  // Upload File handler
  const uploadInput = document.getElementById("file-upload-input");
  document.getElementById("btn-upload-file").onclick = () => uploadInput.click();
  uploadInput.onchange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    let completed = 0;
    let lastUploadedNode = null;

    files.forEach(file => {
      const reader = new FileReader();
      const isImage = file.type.startsWith("image/");

      reader.onload = (ev) => {
        const fileContent = ev.target.result;
        let fileName = file.name;
        // Avoid duplicate in folder
        const exists = cur().children.some(c => c.name.toLowerCase() === fileName.toLowerCase());
        if (exists) {
          fileName = "copy_" + fileName;
        }

        const newNode = {
          name: fileName,
          type: "file",
          children: [],
          content: fileContent
        };
        cur().children.push(newNode);
        lastUploadedNode = newNode;
        completed++;

        if (completed === files.length) {
          saveTree();
          render();
          showToast(`📥 Uploaded ${completed} file(s)!`);
          if (lastUploadedNode) {
            openFileEditor(lastUploadedNode);
          }
        }
      };

      if (isImage) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });

    uploadInput.value = "";
  };

  // Reset Sample Files Button
  document.getElementById("btn-reset-demo").onclick = () => {
    if (confirm("Reset directory to default sample folders and files?")) {
      root = JSON.parse(JSON.stringify(DEFAULT_TREE));
      sanitizeTree(root);
      saveTree();
      navPath = [root];
      closeEditor();
      render();
      showToast("↺ Reset to default sample tree!");
    }
  };

  // Editor Action Buttons
  document.getElementById("btn-edit-file").onclick = enterEditMode;
  document.getElementById("btn-save-file").onclick = saveEdit;
  document.getElementById("btn-cancel-edit").onclick = cancelEdit;
  document.getElementById("btn-close-editor").onclick = closeEditor;

  // Run HTML button
  document.getElementById("btn-run-html").onclick = () => {
    if (!openFile) return;
    const win = window.open();
    if (win) {
      win.document.open();
      win.document.write(openFile.content || "<!DOCTYPE html><html><body>Empty HTML file</body></html>");
      win.document.close();
    } else {
      alert("Pop-up blocked! Please allow pop-ups for this site to run HTML.");
    }
  };

  // Download File button
  document.getElementById("btn-download-file").onclick = () => {
    if (!openFile) return;
    const isDataImg = (openFile.content || "").startsWith("data:image/");
    const a = document.createElement("a");

    if (isDataImg) {
      a.href = openFile.content;
    } else {
      const blob = new Blob([openFile.content || ""], { type: "text/plain;charset=utf-8" });
      a.href = URL.createObjectURL(blob);
    }
    a.download = openFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`⬇️ Downloaded "${openFile.name}"`);
  };

  // Textarea Editor Events (Live Line Numbers + Tab Key + Ctrl+S)
  const ta = document.getElementById("code-editor");
  ta.addEventListener("input", syncLineNums);
  ta.addEventListener("scroll", () => {
    document.getElementById("line-nums-edit").scrollTop = ta.scrollTop;
  });
  ta.addEventListener("keydown", (e) => {
    // Tab key inserts 4 spaces
    if (e.key === "Tab") {
      e.preventDefault();
      const s = ta.selectionStart;
      const en = ta.selectionEnd;
      ta.value = ta.value.substring(0, s) + "    " + ta.value.substring(en);
      ta.selectionStart = ta.selectionEnd = s + 4;
      syncLineNums();
    }
    // Ctrl+S / Cmd+S shortcut to save
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      saveEdit();
    }
  });

  // Modal Buttons
  document.getElementById("modal-confirm").onclick = () => {
    if (pendingDel) {
      const name = pendingDel.target.name;
      deleteNode(pendingDel.parent, pendingDel.target);
      showToast(`🗑 "<strong>${esc(name)}</strong>" deleted.`);
    }
    closeModal();
  };
  document.getElementById("modal-cancel").onclick = closeModal;
  document.getElementById("modal-overlay").onclick = (e) => {
    if (e.target === document.getElementById("modal-overlay")) closeModal();
  };

  // Search Events
  document.getElementById("btn-search").onclick = runSearch;
  document.getElementById("search-input").onkeydown = (e) => {
    if (e.key === "Enter") runSearch();
  };
  document.getElementById("search-input").oninput = () => {
    const val = document.getElementById("search-input").value.trim();
    if (val.length >= 1) runSearch();
    else document.getElementById("search-results").innerHTML = "";
  };
});
