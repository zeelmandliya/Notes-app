# QuickNote - React Note-Taking Web App (Git Demo)

A simple, modern, OneNote/Notion-inspired note-taking web application built with **React** and **Vite** for Git demonstration sessions.

---

## 🛠️ Tech Stack & Features

- **Frontend Framework:** React 18 + Vite
- **Styling:** Modern Vanilla CSS (Flexbox layout, CSS variables, clean typography)
- **Icons:** Lucide React
- **Persistence:** LocalStorage with debounced auto-save (no backend required)
- **Features:**
  - 📝 Split view with left Sidebar & right Note Editor
  - ➕ Create, edit, and delete notes
  - 🔍 Real-time search filter
  - 💾 Automatic debounced save state indicator ("Saving...", "All changes saved")
  - 📱 Clean responsive design

---

## 📁 Project Structure

```text
Git Demo Project/
├── index.html            # Main HTML document with Inter font setup
├── package.json          # Project dependencies & Vite scripts
├── vite.config.js        # Vite dev server configuration
├── README.md             # Project documentation & Git demo instructions
└── src/
    ├── main.jsx          # React DOM entry point
    ├── index.css         # Global design system, layout, and styling
    ├── App.jsx           # Root component (State management, LocalStorage, Debounce)
    └── components/
        ├── Sidebar.jsx   # Left sidebar wrapper (Search bar, New Note button)
        ├── NoteList.jsx  # Render list of note preview cards
        └── NoteEditor.jsx# Right panel (Editable title, body textarea, save status)
```

---

## 🚀 How to Run the Project

### 1. Install Dependencies
Open your terminal in the project folder and run:
```bash
npm install
```

### 2. Start the Development Server
Launch Vite's local dev server:
```bash
npm run dev
```

Open your browser at the URL shown in the terminal (usually `http://localhost:3000`).

---

## 🎯 Step-by-Step Git Demo Guide

> **Note:** This project folder is purposely NOT initialized as a Git repository so you can perform the steps manually during your live demonstration!

### Step 1: Initialize Git Repository
```bash
git init
```

### Step 2: Check Repository Status
```bash
git status
```

### Step 3: Stage Files
```bash
git add .
```

### Step 4: Make Initial Commit
```bash
git commit -m "Initial commit: Add React note-taking web app structure"
```

### Step 5: Create and Switch to a Feature Branch
```bash
git checkout -b feature/dark-mode-theme
# or: git branch feature/dark-mode-theme && git checkout feature/dark-mode-theme
```

### Step 6: Make changes, Stage & Commit on Feature Branch
```bash
git status
git add .
git commit -m "feat: Add dark mode toggle or styling update"
```

### Step 7: Merge Feature Branch into Main
```bash
git checkout main
git merge feature/dark-mode-theme
```

---

## 💡 License
Open source and beginner friendly for educational & demo purposes.
