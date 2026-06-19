The Girly Pop Finance Tracker

Welcome to the **Girly Pop Finance Tracker**! 
This is a vibrant, pink-themed finance application designed specifically for students to make tracking money fun, approachable, and exciting. Managing finances can be stressful, but opening an app that brings a smile to your face makes staying on top of your budget a breeze!

**[Live Demo Website](https://kirabokarynakiwagama.github.io/girly_pop_finance_tracker/)** 
**[Watch the Demo Video Here]((https://youtu.be/96dprs1MZzw))**

## Features

* **Welcome Page:** 
A friendly introduction to the app, explaining its core purpose, along with developer contact details.

* **Dynamic Dashboard:**
 Gives an instant overview of your financial health, including:
    * Total Transactions
    * Total Income
    * Total Expenses
    * Net Balance
* **Monthly Spending Gauge:** 
A visual progress bar that compares your total real-time expenses against your set monthly spending cap.

* **Records Section:**
 A complete historical log of all entered transactions. Features a **built-in search bar** to instantly filter records by keywords(backed by regex)

* **Add Transactions:** 
Easily log income or expenses by entering the date, description, and amount. (also backed by regex)

* **Custom Settings:** 
Personalize your app by changing the local currency, managing transaction categories, and setting your monthly spending cap.


## Setup Guide

Since this website is built using standard frontend technologies, running it locally on your computer is incredibly simple. No installations required!

1.  **Download the Project:** Clone this repository or download the ZIP file and extract it.
2.  **Open the App:** Navigate to the project folder and double-click the `index.html` file to launch the website instantly in your favorite web browser.

---

## Form Validation & Regex Patterns

To ensure data integrity and prevent errors, robust regular expressions (Regex) were used to validate user inputs:

* **Description Validation:** `/^\S(?:.*\S)?$/` — Ensures descriptions don't start or end with accidental empty spaces.
* **Amount Validation:** `/^(0|[1-9]\d*)(\.\d{1,2})?$/` — Restricts inputs to valid monetary values (allows whole numbers or numbers up to 2 decimal places).
* **Date Validation:** `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/` — Enforces the correct `YYYY-MM-DD` date format.
* **Category & Type Validation:** `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` — Ensures category and transaction types contain only letters, allowing for cleanly spaced words.
* **Duplicate Word Detection (Advanced):** `/\b(\w+)\s+\1\b/i` — An advanced check used to catch and flag accidental repeated words in inputs.

---

## How to Run Tests

This project includes a dedicated testing environment to ensure the regex patterns function properly.

1. Locate the `tests.html` file in the project directory.
2. Open `tests.html` in your web browser.
3. This page will run and display the test cases evaluating the regular expressions, verifying that valid data passes and invalid data is caught.



## Author

**Kirabo Karyna Kiwagama**
- 🎓 Student at ALU
- 📧 [k.kiwagama@alustudent.com](mailto:k.kiwagama@alustudent.com)
- 🐙 [GitHub](https://github.com/KiraboKarynaKiwagama)

---

## Acknowledgments

- Built as part of a summative assignment on building responsive, accessible web applications.
-I put sweat blood and tears into this so I will cry if it does not work.

*Made with 💖 for the Girly Pops. Get saving and spending!*
```
