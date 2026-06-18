```markdown
# 💅 Girly Pop Student Finance Tracker

> A fun, accessible finance management tool for students who want to track their spending, set budgets, and stay financially savvy.

**Live Demo:** 
**URL to the complete project:** [kirabokarynakiwagama.github.io/girly_pop_finance_tracker/](https://kirabokarynakiwagama.github.io/girly_pop_finance_tracker/)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Setup Guide](#setup-guide)
- [Features](#features)
- [Regex Catalog](#regex-catalog)
- [Keyboard Map](#keyboard-map)
- [Accessibility Notes](#accessibility-notes)
- [Testing Instructions](#testing-instructions)
- [File Structure](#file-structure)
- [Tech Stack](#tech-stack)
- [Author](#author)

---

## Overview

The **Girly Pop Student Finance Tracker** is a vanilla HTML/CSS/JS web application designed to help students manage their personal finances. Built with accessibility and responsiveness in mind, it allows users to:

- Track income and expenses
- Set monthly spending caps
- Search transactions using regex patterns
- Sort and filter transaction history
- Persist data locally in the browser

**Why "Girly Pop"?** Because managing money should be empowering, not intimidating. This app brings a playful, approachable interface to personal finance.

---

## Setup Guide

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- VS Code (or any code editor) for local development

### Quick Start (Live Server)
1. **Clone the repository:**
   ```bash
   git clone https://github.com/KiraboKarynaKiwagama/girly_pop_finance_tracker.git
   cd girly_pop_finance_tracker
   ```

2. **Open with Live Server:**
   - In VS Code, install the "Live Server" extension
   - Right-click on `index.html` and select **"Open with Live Server"**
   - The app will open at `http://127.0.0.1:5500`

3. **Start using the app:**
   - Navigate using the header links
   - Add your first transaction via the "Add Transaction" form
   - Set a spending cap in Settings

### Manual Setup (No Server)
- Simply open `index.html` directly in your browser
- Note: `localStorage` persistence still works, but some features may behave differently

### Deployment
This app is deployed via **GitHub Pages**:
- Push to the `main` branch
- Enable GitHub Pages in repository settings
- Access via: `https://[username].github.io/[repo-name]/`

---

## Features

### Core Features

| Feature | Description |
| :--- | :--- |
| **📊 Dashboard** | View total transactions, income, expenses, net balance, and a spending cap progress bar with live warnings. |
| **📝 Records Table** | View all transactions in a sortable table. Sort by date, description, category, type, or amount. |
| **🔍 Live Regex Search** | Search transactions using regular expressions with case-insensitive toggle. Matches are highlighted. |
| **➕ Add/Edit Form** | Add new transactions with validation for date, description, amount, category, and type. |
| **⚙️ Settings** | Set a monthly spending cap. Saved in browser's local storage. |
| **💾 Data Persistence** | All transactions and settings automatically saved to `localStorage`. |

### Advanced Features

- **Duplicate Word Detection:** Identifies repeated words in descriptions.
- **Regex Search:** Allows complex pattern matching.
- **Sort Controls:** Sort any column in ascending or descending order.
- **Mobile Responsive:** Table converts to card view on small screens.
- **Accessibility:** Full keyboard navigation and ARIA support.

---

## Regex Catalog

### Validation Patterns

| Field | Pattern | Description | Valid Example | Invalid Example |
| :--- | :--- | :--- | :--- | :--- |
| **Description** | `^\S(?:.*\S)?$` | No leading/trailing spaces; at least one non-space char | `"Lunch at Cafe"` ✅ | `" Lunch"` ❌ |
| **Amount** | `^(0\|[1-9]\d*)(\.\d{1,2})?$` | Positive numbers, up to 2 decimal places | `"12.50"` ✅ | `"12.345"` ❌ |
| **Date** | `^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$` | Strict `YYYY-MM-DD` format | `"2025-09-29"` ✅ | `"29-09-2025"` ❌ |
| **Category** | `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | Letters, spaces, and hyphens only | `"Food"` ✅ | `"Food!"` ❌ |
| **Type** | `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | Letters, spaces, and hyphens only | `"Income"` ✅ | `"Income!"` ❌ |

### Advanced Pattern (Duplicate Words)

| Pattern | Description | Example |
| :--- | :--- | :--- |
| `\b(\w+)\s+\1\b` | Finds repeated consecutive words using back-reference | `"coffee coffee"` ❌ / `"coffee tea"` ✅ |

### Search Examples (Records Page)

| Pattern | What it Finds | Example Matches |
| :--- | :--- | :--- |
| `\.\d{2}\b` | Amounts with cents | `12.50`, `99.99` |
| `(coffee\|tea)` | Mentions of coffee or tea | `"Coffee with friends"`, `"Tea break"` |
| `\b(\w+)\s+\1\b` | Duplicate words | `"bus bus"`, `"book book"` |
| `^Food` | Descriptions starting with "Food" | `"Food delivery"` |
| `[0-9]{4}` | Any 4-digit number | `2025`, `1500` |

---

## Keyboard Map

The app is fully keyboard-navigable. Here's the full key map:

| Key / Action | Function |
| :--- | :--- |
| **Tab** | Move focus between interactive elements (links, inputs, buttons) |
| **Shift + Tab** | Move focus backward |
| **Enter** | Activate a focused link, button, or submit a form |
| **Space** | Toggle checkboxes (e.g., "Case insensitive" search) |
| **Arrow Keys (↑↓)** | Navigate dropdown menu options |
| **Escape** | Cancel an action or close a dropdown |
| **Ctrl/Cmd + A** | Select all text in input fields |

### Focus Order
1. Skip to main content link
2. Navigation links (Welcome → Dashboard → Records → Add Transaction → Settings)
3. Form inputs and buttons (in order of appearance)
4. Sort controls and search input
5. Footer (no interactive elements)

---

## Accessibility Notes

This app follows WCAG 2.1 AA standards. Key accessibility features include:

### Semantic HTML
- **Landmarks:** `header`, `nav`, `main`, `section`, `footer`
- **Headings:** Proper hierarchy (`h1` → `h2` → `h3`)
- **Tables:** `scope="col"` for headers, `aria-label` where needed

### ARIA Support
- **Live Regions:** `role="status"` and `aria-live="polite"` for success messages
- **Assertive Live Regions:** `aria-live="assertive"` for cap warnings
- **Skip Link:** First focusable element, skips to `#main-content`

### Focus Management
- Visible `:focus-visible` styles on all interactive elements
- Focus indicators meet 3:1 contrast ratio
- No keyboard traps

### Color & Contrast
- All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Color is not the only means of conveying information
- Cap warnings use both color and text labels

### Screen Reader Support
- All form inputs have associated `<label>` elements
- Error messages are announced automatically
- Table data is readable in both desktop and mobile views

---

## Testing Instructions

### Manual Testing Checklist

#### 1. Navigation & Sections
- [ ] Click each nav link → correct section displays
- [ ] Use Tab key → focus moves in logical order
- [ ] Skip link → focuses on main content

#### 2. Form Validation
- [ ] Submit empty form → error messages appear
- [ ] Enter invalid date (e.g., `2025-13-01`) → error shown
- [ ] Enter description with leading space → error shown
- [ ] Enter amount with letters → error shown

#### 3. Search & Regex
- [ ] Type a word → matching transactions appear
- [ ] Toggle "Case insensitive" → search updates
- [ ] Enter regex pattern (e.g., `\d{4}`) → matches found
- [ ] Enter invalid regex (e.g., `\d{`) → error message shown

#### 4. Sorting
- [ ] Sort by Description (A-Z) → alphabetical order
- [ ] Sort by Amount (↑) → ascending amounts
- [ ] Sort by Date (↓) → newest to oldest

#### 5. Spending Cap
- [ ] Set cap in Settings → appears on dashboard
- [ ] Add expenses → progress bar updates
- [ ] Exceed cap → warning message appears (assertive)

#### 6. Persistence
- [ ] Add transaction → refresh page → data remains
- [ ] Set cap → refresh page → cap remains
- [ ] Clear browser data → app resets gracefully

#### 7. Accessibility (Keyboard)
- [ ] Navigate all interactive elements with Tab
- [ ] Submit form with Enter
- [ ] Toggle checkbox with Space
- [ ] No keyboard traps

### Running `tests.html`
If you have a `tests.html` file for unit tests:

1. Open `tests.html` in your browser
2. Open Developer Console (F12 → Console)
3. All assertions should pass with no errors

**Example test output:**
```
✅ validateDate('2025-09-29') → valid
✅ validateAmount('12.50') → valid
❌ validateDescription(' Lunch') → invalid (expected)
```

### Browser Testing Matrix
Test the app on these browsers:

| Browser | Version | Status |
| :--- | :--- | :--- |
| Chrome | Latest | ✅ Pass |
| Firefox | Latest | ✅ Pass |
| Edge | Latest | ✅ Pass |
| Safari | Latest | ✅ Pass |
| Mobile Chrome | Latest | ✅ Pass |
| Mobile Safari | Latest | ✅ Pass |

---

## File Structure

```
girly_pop_finance_tracker/
├── index.html                 # Main entry point
├── README.md                  # This file
├── seed.json                  # Sample data for testing
├── styles/
│   ├── main.css              # Colors, variables, base styles
│   ├── layout.css            # Grid, flexbox, responsive layouts
│   └── components.css        # Cards, buttons, forms, tables
├── scripts/
│   ├── ui.js                 # UI interactions, navigation, settings
│   ├── validators.js         # All regex validation functions
│   ├── state.js              # Data persistence (localStorage)
│   └── search.js             # Search and highlight functionality
└── tests.html                # Unit tests for validation functions
```

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure and landmarks |
| **CSS3** | Variables, Flexbox, Grid, transitions, responsive design |
| **Vanilla JS** | ES6+ modules, DOM manipulation, event handling |
| **localStorage** | Client-side data persistence |
| **GitHub Pages** | Hosting and deployment |
| **Live Server** | Local development environment |

---

## Author

**Kirabo Karyna Kiwagama**
- 🎓 Student at ALU
- 📧 [k.kiwagama@alustudent.com](mailto:k.kiwagama@alustudent.com)
- 🐙 [GitHub](https://github.com/KiraboKarynaKiwagama)

---

## Acknowledgments

- Built as part of a summative assignment on building responsive, accessible web applications.
- Special thanks to the ALU faculty for guidance on accessibility and regex best practices.

---

*Made with 💖 for the Girly Pops. Get saving and spending!*
```
