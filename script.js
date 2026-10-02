// ============================================================
//  FILE / FOLDER DIRECTORY MANAGEMENT SYSTEM
//  Plain HTML + CSS + Vanilla JavaScript
//  Data structure: Tree (each node = { name, type, children })
// ============================================================

// ── INITIAL TREE ─────────────────────────────────────────────────────────────
// This is the seed data. Each node in the tree follows the schema:
//   { name: string, type: "folder"|"file", children: [] }
const DEFAULT_TREE = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "Documents",
      type: "folder",
      children: [
        { name: "Resume.pdf",        type: "file", children: [] },
        { name: "CoverLetter.docx",  type: "file", children: [] },
        {
          name: "Projects",
          type: "folder",
          children: [
            { name: "MiniProject.zip", type: "file", children: [] },
            { name: "Notes.txt",       type: "file", children: [] }
          ]
        }
      ]
    },
    {
      name: "Pictures",
      type: "folder",
      children: [
        { name: "Vacation.jpg",  type: "file", children: [] },
        { name: "Profile.png",   type: "file", children: [] },
        {
          name: "Screenshots",
          type: "folder",
          children: [
            { name: "desktop_2024.png", type: "file", children: [] }
          ]
        }
      ]
    },
    {
      name: "Music",
      type: "folder",
      children: [
        { name: "Playlist.m3u",   type: "file", children: [] },
        { name: "Favorites.mp3",  type: "file", children: [] }
      ]
    },
    { name: "README.txt",      type: "file", children: [] },
    { name: "config.json",     type: "file", children: [] }
  ]
};

// ── STATE ─────────────────────────────────────────────────────────────────────
// root      → the whole tree (Tree Data Structure root node)
// path      → array of node references from root down to current folder
// createMode → "folder" | "file" | null
let root;
let path = [];          // navigation stack — path[0] = root
let createMode = null;  // what we are currently creating

// ── PERSISTENCE ───────────────────────────────────────────────────────────────
// Wrap localStorage in try/catch in case it is blocked (private browsing, etc.)
function saveTree() {
  try {
    localStorage.setItem("fds_tree", JSON.stringify(root));
  } catch (e) {
    console.warn("localStorage save failed:", e);
  }
}

function loadTree() {
  try {
    const raw = localStorage.getItem("fds_tree");
    if (raw) {
      root = JSON.parse(raw);
      return true;
    }
  } catch (e) {
    console.warn("localStorage load failed:", e);
  }
  return false;
}

// ── NODE HELPERS ──────────────────────────────────────────────────────────────
/**
 * createNode — factory for a new tree node.
 * @param {string} name
 * @param {"folder"|"file"} type
 */
function createNode(name, type) {
  return { name: name.trim(), type, children: [] };
}

/**
 * currentFolder — returns the folder node the user is currently inside.
 * path is the navigation stack; the last element is the current folder.
 */
function currentFolder() {
  return path[path.length - 1];
}

// ── SANITISE ──────────────────────────────────────────────────────────────────
// Escape user-supplied strings before inserting into innerHTML
// to prevent HTML / XSS injection.
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── NAVIGATE ──────────────────────────────────────────────────────────────────
/**
 * navigate — open a folder by pushing it onto the path stack,
 * then refresh the whole UI.
 * @param {object} folderNode — must be a folder-type tree node
 */
function navigate(folderNode) {
  // Only folders can be "opened"
  if (folderNode.type !== "folder") return;
  // If the folder is already somewhere in the path, slice the path to that point
  // (supports breadcrumb navigation by passing an ancestor node)
  const idx = path.indexOf(folderNode);
  if (idx !== -1) {
    path = path.slice(0, idx + 1);
  } else {
    path.push(folderNode);
  }
  cancelCreate();
  render();
}

// ── DELETE ────────────────────────────────────────────────────────────────────
/**
 * deleteNode — remove a child node from its parent.
 * Deleting a folder removes all descendants (they go with it).
 * This is why tree deletion is O(1) here — we just splice the reference.
 * @param {object} parentFolder — the parent folder node
 * @param {object} targetNode   — the node to remove
 */
function deleteNode(parentFolder, targetNode) {
  const idx = parentFolder.children.indexOf(targetNode);
  if (idx !== -1) {
    parentFolder.children.splice(idx, 1);
    // If we were inside the deleted folder (or a sub-folder), navigate up
    if (path.includes(targetNode)) {
      path = path.slice(0, path.indexOf(targetNode));
    }
    saveTree();
    render();
  }
}

// ── SEARCH (RECURSIVE) ───────────────────────────────────────────────────────
/**
 * searchTree — recursively walk the entire tree and collect nodes whose
 * names contain the query string (case-insensitive).
 *
 * Recursion is the natural fit here: a folder's children may themselves
 * be folders with children, forming a tree of arbitrary depth.
 *
 * @param {object}   node    — current tree node being visited
 * @param {string}   query   — lowercased search string
 * @param {object[]} pathArr — ancestor nodes from root to current node
 * @param {object[]} results — accumulated result array (mutated in-place)
 */
function searchTree(node, query, pathArr, results) {
  // Build the display path string for this node
  const currentPath = [...pathArr, node];

  if (node.name.toLowerCase().includes(query)) {
    results.push({
      node,
      path: currentPath   // full path array, used to navigate on click
    });
  }

  // ← RECURSION: visit every child in the children array
  if (node.type === "folder") {
    for (const child of node.children) {
      searchTree(child, query, currentPath, results);  // recursive call
    }
  }
}

// ── RENDER TREE VIEW (RECURSIVE) ─────────────────────────────────────────────
/**
 * renderTreeLines — recursively generate the monospace tree view text.
 * Uses classic box-drawing connectors: ├──, └──, │
 *
 * @param {object}   node       — current tree node
 * @param {string}   prefix     — indentation prefix built up through recursion
 * @param {boolean}  isLast     — is this node the last child of its parent?
 * @param {string[]} lines      — accumulated output lines (mutated in-place)
 * @param {object}   activeFolderNode — the currently open folder (for highlight)
 */
function renderTreeLines(node, prefix, isLast, lines, activeFolderNode) {
  const connector = isLast ? "└── " : "├── ";
  const icon = node.type === "folder" ? "📁" : "📄";
  const isCurrent = node === activeFolderNode;
  const cssClass = node.type === "folder"
    ? (isCurrent ? "tree-folder tree-current" : "tree-folder")
    : "tree-file";

  // Wrap each line in a <span> for colouring; escaping prevents injection
  const label = `<span class="${cssClass}">${escapeHtml(prefix + connector + icon + " " + node.name)}</span>`;
  lines.push(label);

  // ← RECURSION: render children with updated prefix
  if (node.type === "folder" && node.children.length > 0) {
    const childPrefix = prefix + (isLast ? "    " : "│   ");
    node.children.forEach((child, i) => {
      const last = i === node.children.length - 1;
      renderTreeLines(child, childPrefix, last, lines, activeFolderNode);  // recursive
    });
  }
}

function renderTree() {
  const treeEl = document.getElementById("tree-view");
  const active = currentFolder();
  const lines = [];

  // Root node itself
  const rootClass = active === root ? "tree-folder tree-current" : "tree-folder";
  lines.push(`<span class="${rootClass}">📁 ${escapeHtml(root.name)}</span>`);

  // Render each top-level child recursively
  root.children.forEach((child, i) => {
    const last = i === root.children.length - 1;
    renderTreeLines(child, "", last, lines, active);
  });

  treeEl.innerHTML = lines.join("\n");
}

// ── RENDER BREADCRUMB ─────────────────────────────────────────────────────────
function renderBreadcrumb() {
  const ol = document.getElementById("breadcrumb");
  ol.innerHTML = "";
  path.forEach((node, idx) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "crumb-btn" + (idx === path.length - 1 ? " active" : "");
    btn.textContent = idx === 0 ? "🏠 Root" : node.name;
    btn.disabled = idx === path.length - 1;
    if (idx < path.length - 1) {
      btn.addEventListener("click", () => navigate(node));
    }
    li.appendChild(btn);
    ol.appendChild(li);
  });
}

// ── RENDER DIRECTORY LIST ─────────────────────────────────────────────────────
function renderDirList() {
  const folder = currentFolder();
  const ul = document.getElementById("dir-list");
  const title = document.getElementById("folder-title");
  ul.innerHTML = "";
  title.textContent = folder.name === "root" ? "Root" : folder.name;

  if (folder.children.length === 0) {
    const empty = document.createElement("li");
    empty.className = "dir-empty";
    empty.textContent = "This folder is empty.";
    ul.appendChild(empty);
    return;
  }

  // Sort: folders first, then files, both alphabetical
  const sorted = [...folder.children].sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  sorted.forEach(child => {
    const li = document.createElement("li");
    li.className = "dir-item" + (child === currentFolder() ? " active-folder" : "");
    li.setAttribute("role", "listitem");

    const icon = document.createElement("span");
    icon.className = "dir-item-icon";
    icon.textContent = child.type === "folder" ? "📁" : "📄";
    icon.style.color = child.type === "folder" ? "var(--folder-color)" : "var(--file-color)";

    const name = document.createElement("span");
    name.className = "dir-item-name";
    name.textContent = child.name;   // textContent = safe, no injection

    const typeTag = document.createElement("span");
    typeTag.className = "dir-item-type";
    typeTag.textContent = child.type;

    const delBtn = document.createElement("button");
    delBtn.className = "dir-item-delete";
    delBtn.title = `Delete ${child.name}`;
    delBtn.textContent = "🗑";
    delBtn.setAttribute("aria-label", `Delete ${child.name}`);

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      confirmDelete(folder, child);
    });

    if (child.type === "folder") {
      li.addEventListener("click", () => navigate(child));
    }

    li.appendChild(icon);
    li.appendChild(name);
    li.appendChild(typeTag);
    li.appendChild(delBtn);
    ul.appendChild(li);
  });
}

// ── RENDER (all at once) ─────────────────────────────────────────────────────
function render() {
  renderBreadcrumb();
  renderDirList();
  renderTree();
}

// ── CREATE FLOW ───────────────────────────────────────────────────────────────
function showCreateForm(type) {
  createMode = type;
  const form    = document.getElementById("create-form");
  const label   = document.getElementById("create-form-label");
  const input   = document.getElementById("create-input");
  const errEl   = document.getElementById("create-error");
  label.textContent = type === "folder" ? "Folder name:" : "File name:";
  input.value = "";
  errEl.hidden = true;
  form.hidden = false;
  input.focus();
}

function cancelCreate() {
  createMode = null;
  document.getElementById("create-form").hidden = true;
  document.getElementById("create-input").value = "";
  document.getElementById("create-error").hidden = true;
}

function confirmCreate() {
  const input = document.getElementById("create-input");
  const errEl = document.getElementById("create-error");
  const rawName = input.value.trim();

  // Validation 1: empty name
  if (!rawName) {
    showError(errEl, "Name cannot be empty.");
    return;
  }

  // Validation 2: duplicate name in same folder (case-insensitive)
  const folder = currentFolder();
  const duplicate = folder.children.some(
    c => c.name.toLowerCase() === rawName.toLowerCase()
  );
  if (duplicate) {
    showError(errEl, `A ${createMode} named "${escapeHtml(rawName)}" already exists here.`);
    return;
  }

  // All good — create and insert the new node into the tree
  const node = createNode(rawName, createMode);
  folder.children.push(node);
  saveTree();
  cancelCreate();
  render();
  showToast(`${createMode === "folder" ? "📁" : "📄"} "${rawName}" created!`);
}

function showError(el, msg) {
  el.innerHTML = msg;   // already escaped where needed
  el.hidden = false;
}

// ── DELETE FLOW ───────────────────────────────────────────────────────────────
let pendingDelete = null;   // { parent, target }

function confirmDelete(parentFolder, targetNode) {
  pendingDelete = { parent: parentFolder, target: targetNode };
  const msg = document.getElementById("modal-msg");
  const typeWord = targetNode.type === "folder" ? "folder" : "file";
  const warning  = targetNode.type === "folder"
    ? " All contents inside it will also be deleted."
    : "";
  msg.textContent = `Delete ${typeWord} "${targetNode.name}"?${warning}`;
  document.getElementById("modal-overlay").hidden = false;
}

function closeModal() {
  pendingDelete = null;
  document.getElementById("modal-overlay").hidden = true;
}

// ── SEARCH FLOW ───────────────────────────────────────────────────────────────
function runSearch() {
  const query = document.getElementById("search-input").value.trim().toLowerCase();
  const resultsEl = document.getElementById("search-results");
  resultsEl.innerHTML = "";

  if (!query) {
    const msg = document.createElement("li");
    msg.className = "search-no-results";
    msg.textContent = "Type something to search.";
    resultsEl.appendChild(msg);
    return;
  }

  const results = [];
  // searchTree uses recursion to walk the entire tree
  searchTree(root, query, [], results);

  if (results.length === 0) {
    const msg = document.createElement("li");
    msg.className = "search-no-results";
    msg.textContent = "No results found.";
    resultsEl.appendChild(msg);
    return;
  }

  results.forEach(({ node, path: nodePath }) => {
    const li = document.createElement("li");
    li.className = "search-result-item";

    const icon = document.createElement("span");
    icon.className = "search-result-icon";
    icon.textContent = node.type === "folder" ? "📁" : "📄";

    const info = document.createElement("div");
    info.className = "search-result-info";

    const nameEl = document.createElement("div");
    nameEl.className = "search-result-name";
    nameEl.textContent = node.name;

    // Build path string: "root > Documents > Projects"
    const pathStr = nodePath.map(n => n.name === "root" ? "root" : n.name).join(" › ");
    const pathEl = document.createElement("div");
    pathEl.className = "search-result-path";
    pathEl.title = pathStr;
    pathEl.textContent = pathStr;

    info.appendChild(nameEl);
    info.appendChild(pathEl);
    li.appendChild(icon);
    li.appendChild(info);

    // Clicking a result navigates to its parent folder
    li.addEventListener("click", () => {
      // nodePath includes the node itself at the end; parent is nodePath[nodePath.length - 2]
      // We rebuild path to navigate correctly
      if (node.type === "folder") {
        // Navigate into the folder itself
        path = nodePath;
      } else {
        // Navigate to the parent folder
        path = nodePath.slice(0, -1);
      }
      render();
      // Clear search
      document.getElementById("search-input").value = "";
      document.getElementById("search-results").innerHTML = "";
      showToast(`Navigated to "${pathStr}"`);
    });

    resultsEl.appendChild(li);
  });
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ── INIT & EVENT WIRING ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Load from localStorage or fall back to default seed tree
  if (!loadTree()) {
    root = DEFAULT_TREE;
    saveTree();
  }

  // Start at root
  path = [root];
  render();

  // — New Folder / File buttons
  document.getElementById("btn-add-folder").addEventListener("click", () => {
    showCreateForm("folder");
  });
  document.getElementById("btn-add-file").addEventListener("click", () => {
    showCreateForm("file");
  });

  // — Create form: Confirm
  document.getElementById("btn-confirm-create").addEventListener("click", confirmCreate);

  // — Create form: Cancel
  document.getElementById("btn-cancel-create").addEventListener("click", cancelCreate);

  // — Create form: Enter key shortcut
  document.getElementById("create-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") confirmCreate();
    if (e.key === "Escape") cancelCreate();
  });

  // — Modal: Confirm delete
  document.getElementById("modal-confirm").addEventListener("click", () => {
    if (pendingDelete) {
      const name = pendingDelete.target.name;
      deleteNode(pendingDelete.parent, pendingDelete.target);
      showToast(`🗑 "${name}" deleted.`);
    }
    closeModal();
  });

  // — Modal: Cancel
  document.getElementById("modal-cancel").addEventListener("click", closeModal);

  // — Close modal on overlay click
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal-overlay")) closeModal();
  });

  // — Search button
  document.getElementById("btn-search").addEventListener("click", runSearch);

  // — Search on Enter key
  document.getElementById("search-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch();
  });

  // — Live search as user types
  document.getElementById("search-input").addEventListener("input", () => {
    const val = document.getElementById("search-input").value.trim();
    if (val.length >= 1) runSearch();
    else document.getElementById("search-results").innerHTML = "";
  });
});
