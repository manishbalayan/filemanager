# Full Stack File Manager
A web-based file management system built with **React** and **Node.js**. This application allows users to navigate directories, create files/folders, and perform file operations like Cut, Paste, and Delete directly from the browser.
## Features
* **Navigation:** Browse through folders and files dynamically.
* **Create:** Create new text files and folders instantly.
* **Delete:** Remove files and directories with a confirmation safety check.
* **Move (Cut/Paste):** Move files or folders to different locations using a clipboard-style workflow.
* **Open Files:** View file content in a new browser tab.
* **Context Menu:** Custom "Three Dots" menu for file-specific actions.
---
## 🛠️ Tech Stack
### Frontend
* **React.js:** UI and state management.
* **Axios:** HTTP requests to the backend.
* **CSS:** Clean, functional styling.
### Backend
* **Node.js & Express:** Server logic and API handling.
* **File System (fs):** Native Node.js module to interact with the operating system's files.
* **CORS:** Middleware to allow frontend-backend communication.

---

## ⚙️ Installation & Setup

### 1. Backend Setup
1.  Navigate to the backend folder.
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    node server.js
    ```
    *The server will run on `http://localhost:3004`. The `userdata` folder included in the repo serves as the root storage.*

### 2. Frontend Setup
1.  Navigate to the frontend folder.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React application:
    ```bash
    npm run dev
    ```
    *The app will run on `http://localhost:5173` (or your default Vite port)*

---
## How to Use
### Basic Actions
* **Open Folder:** Click the folder icon or name to enter.
* **Go Back:** Click the `..` folder to go to the parent directory.
* **Open File:** Click a file to view its content in a new tab.
### File Operations
* **Create:** Use the **+ New Folder** or **+ New File** buttons in the top toolbar.
* **Delete:**
    1.  Hover over a file/folder.
    2.  Click the **Three Dots (⋮)** menu.
    3.  Select **Delete** and confirm.
* **Move (Cut & Paste):**
    1.  Click the **Three Dots (⋮)** menu on a file.
    2.  Select **Cut**. (A brown "Paste" button will appear in the toolbar).
    3.  Navigate to the destination folder.
    4.  Click the **Paste** button in the toolbar.
---
## API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/files` | Lists files in a specific path. |
| `GET` | `/file` | Retrieves the content of a file. |
| `POST` | `/createdir` | Creates a new directory. |
| `POST` | `/createfile` | Creates a new empty file. |
| `DELETE`| `/deletefile`| Deletes a specific file. |
| `DELETE`| `/deletedir` | Deletes a directory recursively. |
| `PUT` | `/move` | Moves (renames) a file or folder. |
