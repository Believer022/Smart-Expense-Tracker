# Smart Expense Tracker

![Project Status](https://img.shields.io/badge/status-complete-success)
![Tech Stack](https://img.shields.io/badge/stack-HTML_CSS_JS-blue)

A modern, responsive, and privacy-focused Personal Finance Application built with pure **HTML, CSS, and Vanilla JavaScript**. Designed to help users track expenses, analyze spending habits, and maintain financial discipline without the need for complex accounts or backend connectivity.

## 🚀 Overview

The **Smart Expense Tracker** is a single-page application (SPA) that provides a premium fintech experience directly in the browser. It features real-time analytics, category-wise breakdowns, and persistent local storage, ensuring your data remains safe on your device.

This project demonstrates professional frontend engineering standards, including semantic markup, modular CSS architecture, and object-oriented JavaScript patterns.

---

## ✨ Key Features

- **📊 Visual Analytics**: Interactive Bar and Doughnut charts (via Chart.js) to visualize spending trends and category distribution.
- **💾 Local Persistence**: All data is stored securely in your browser's `LocalStorage` - no data leaves your device.
- **🏷️ Smart Categorization**: Automatic color-coding and icon mapping for categories like Food, Travel, Bills, and Shopping.
- **🔍 Advanced Filtering**: Search expenses by title and filter by category or date range.
- **📱 Fully Responsive**: A mobile-first design that adapts seamlessly from desktop dashboards to mobile screens.
- **⚡ Zero Latency**: Instant feedback and UI updates with no server round-trips.

---

## 🛠️ Tech Stack

*   **Core**: HTML5, CSS3, ES6+ JavaScript
*   **Storage**: Browser LocalStorage API
*   **Visualization**: [Chart.js](https://www.chartjs.org/)
*   **Icons**: [RemixIcon](https://remixicon.com/)
*   **Fonts**: Inter & Poppins (Google Fonts)
*   **Architecture**: Modular JS (MVC-inspired)

---

## 📂 Folder Structure

```
smart-expense-tracker/
├── index.html          # Main application entry point
├── css/
│   └── style.css       # Global styles, variables, and components
├── js/
│   ├── app.js          # Application Orchestrator & Event Listeners
│   ├── data.js         # Data Management (CRUD + LocalStorage)
│   ├── ui.js           # UI Rendering & DOM Manipulation
│   └── charts.js       # Chart.js Integration & Logic
└── assets/             # Static assets (icons, images)
```

---

## 🚀 How to Run Locally

Since this project uses no backend, getting started is instant.

1.  **Clone the repository** (or download the files).
2.  **Open `index.html`** in any modern web browser.
    *   *Tip: For the best experience, use a local development server like Live Server in VS Code to avoid any strict browser file-protocol restrictions with ES6 modules.*

### Using VS Code Live Server
1.  Open the project folder in VS Code.
2.  Right-click `index.html`.
3.  Select "Open with Live Server".

---

## 💡 Implementation Details

### Data Persistence
The `DataManager` class (`js/data.js`) interfaces with the browser's `localStorage`. Expenses are serialized into JSON strings for storage and parsed back into objects upon application load. This ensures data survives page reloads and browser restarts.

### Modern Architecture
The JavaScript code avoids "spaghetti code" by separating concerns:
*   **Data Layer**: Handles business logic and storage.
*   **UI Layer**: Manages the DOM, rendering, and animations.
*   **Chart Layer**: Wraps third-party library logic to keep the main codebase clean.

---

## 🔮 Future Enhancements

*   **Export Data**: Ability to export expenses as CSV or PDF.
*   **Budget Goals**: Set monthly limits per category and get alerts.
*   **Dark Mode**: A toggle for a dark-themed UI.
*   **Cloud Sync**: Optional backend integration (Node/Firebase) for cross-device syncing.

---

## 👨‍💻 Author

Built as a portfolio-grade project to demonstrate robust frontend capabilities.
