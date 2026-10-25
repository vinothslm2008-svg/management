# File / Folder Directory Management System (Mini Project)

A responsive, single-page web application for managing files and folders in a hierarchical structure using a **Tree Data Structure** with an integrated multi-language code editor.

## 🚀 Features

1. **Tree Data Structure:**
   - Every file and folder is represented as a tree node: `{ name, type, children: [], content: "" }`.
   - Root directory contains hierarchical sample folders and files.

2. **File & Folder Operations:**
   - **Create Folder & File:** Add items inside the currently navigated folder with automatic starter code templates (HTML, Python, JavaScript, CSS, etc.).
   - **Delete:** Remove files or folders (deleting a folder recursively removes all nested files and subfolders).
   - **Upload File:** Insert any file from your computer (.py, .html, .js, .txt, images, etc.) into the active folder.
   - **Download:** Download any file from the editor back to your computer.

3. **Multi-Language Code Editor:**
   - Syntax highlighting for HTML, Python, JavaScript, CSS, Java, C/C++, JSON, SQL, and Markdown.
   - In-app editing with live line numbers, Tab key indentation (4 spaces), and `Ctrl+S` auto-save.
   - **Run HTML:** Live one-click execution of HTML files in a new tab.
   - Image preview for `.png`, `.jpg`, `.jpeg`, `.svg`, and `.webp`.

4. **Recursive Traversal & Search:**
   - **Recursive Search:** Instantly search across the entire tree depth by name.
   - **Monospace Tree View:** Monospace visual directory tree generated recursively using `├──` and `└──` connectors with active folder highlighting.

5. **Breadcrumb Navigation:**
   - Clickable breadcrumb navigation (`Root > Folder > Subfolder`) allowing instant return to ancestor folders.

6. **Local Persistence:**
   - Automatically saves and persists the entire directory tree in `localStorage`.

---

## 👥 Project Team
- **Team Leader:** Vinoth
- **Members:** Elango, Naresh, Velumani
