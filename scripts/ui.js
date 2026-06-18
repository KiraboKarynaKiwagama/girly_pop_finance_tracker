function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) section.classList.add('active');
    });
}

function setupNav() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSection(this.getAttribute('href').substring(1));
        });
    });
}

function setupForm() {
    const form = document.getElementById('transaction-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            type: document.getElementById('type').value,
            date: document.getElementById('date').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            amount: document.getElementById('amount').value
        };
        
        const result = validateAll(formData);
        
        if (result.valid) {
            addTransactionToState(formData);
            updateUI();
            this.reset();
            document.getElementById('live-region').textContent = 'Transaction saved!';
        } else {
            showErrors(result.errors);
        }
    });
}

function showErrors(errors) {
    // Clear all errors first
    document.querySelectorAll('.error-msg, .error').forEach(el => el.textContent = '');
    
    // Show new errors
    if (errors.date) document.getElementById('date-error').textContent = errors.date;
    if (errors.description) document.getElementById('description-error').textContent = errors.description;
    if (errors.amount) document.getElementById('amount-error').textContent = errors.amount;
    if (errors.category) document.getElementById('category-error').textContent = errors.category;
    if (errors.type) document.getElementById('type-error').textContent = errors.type;
}

function renderTable(transactions) {
    const tbody = document.getElementById('records-body');
    tbody.innerHTML = '';
    
    if (!transactions || transactions.length === 0) {
        document.getElementById('empty-message').style.display = 'block';
        return;
    }
    
    document.getElementById('empty-message').style.display = 'none';
    
    transactions.forEach(t => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td>${t.type}</td>
            <td>UGX ${parseFloat(t.amount).toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

function displayTransactions() {
    renderTable(getAllTransactions());
}

function setupSort() {
    const btn = document.getElementById('sort-btn');
    if (!btn) return;
    
    btn.addEventListener('click', function() {
        const sortBy = document.getElementById('sort-select').value;
        const direction = document.getElementById('sort-direction').value;
        const sorted = sortTransactions(getAllTransactions(), sortBy, direction);
        renderTable(sorted);
    });
}

function sortTransactions(arr, sortBy, direction) {
    const sorted = [...arr];
    sorted.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        if (typeof valA === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }
        return direction === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
    return sorted;
}

function renderDashboard() {
    const transactions = getAllTransactions();
    let income = 0, expenses = 0;
    
    transactions.forEach(t => {
        const amount = parseFloat(t.amount);
        t.type === 'income' ? income += amount : expenses += amount;
    });
    
    document.getElementById('total-transactions').textContent = transactions.length;
    document.getElementById('total-income').textContent = `UGX ${income.toFixed(2)}`;
    document.getElementById('total-expenses').textContent = `UGX ${expenses.toFixed(2)}`;
    document.getElementById('net-balance').textContent = `UGX ${(income - expenses).toFixed(2)}`;
}

function setupSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    
    input.addEventListener('input', function() {
        const term = this.value;
        const caseInsensitive = document.getElementById('case-toggle').checked;
        
        if (!term) {
            displayTransactions();
            return;
        }
        
        try {
            const flags = caseInsensitive ? 'i' : '';
            const regex = new RegExp(term, flags);
            const filtered = getAllTransactions().filter(t => regex.test(t.description));
            renderTable(filtered);
            document.getElementById('search-error').textContent = '';
        } catch (e) {
            document.getElementById('search-error').textContent = 'Invalid regex pattern';
        }
    });
}

function getCap() {
    const cap = localStorage.getItem('spendingCap');
    return cap ? parseFloat(cap) : 0;
}

function updateCap() {
    const cap = getCap();
    const transactions = getAllTransactions();
    const now = new Date();
    const spent = transactions
        .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === now.getMonth())
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const container = document.querySelector('.cap-progress-container');
    if (!container || cap <= 0) {
        if (container) container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    const percent = Math.min((spent / cap) * 100, 100);
    
    document.getElementById('cap-progress-fill').style.width = percent + '%';
    document.getElementById('cap-progress-text').textContent = Math.round(percent) + '% used';
    document.getElementById('cap-spent').textContent = 'Spent: UGX ' + spent.toLocaleString();
    document.getElementById('cap-remaining').textContent = 'UGX ' + Math.max(0, cap - spent).toLocaleString() + ' remaining';
    
    const warning = document.getElementById('cap-warning');
    if (spent > cap) {
        warning.className = 'cap-warning danger show';
        warning.textContent = 'Exceeded cap by UGX ' + (spent - cap).toLocaleString();
    } else if (percent >= 90) {
        warning.className = 'cap-warning danger show';
        warning.textContent = 'At ' + Math.round(percent) + '% of cap';
    } else if (percent >= 70) {
        warning.className = 'cap-warning warning show';
        warning.textContent = 'Used ' + Math.round(percent) + '% of cap';
    } else {
        warning.className = 'cap-warning';
    }
}

function setupSettings() {
    document.getElementById('save-settings-btn').addEventListener('click', function() {
        const cap = document.getElementById('spending-cap').value;
        
        if (cap && !isNaN(cap) && parseFloat(cap) > 0) {
            localStorage.setItem('spendingCap', cap);
            document.getElementById('settings-status').textContent = 'Cap saved!';
            document.getElementById('settings-status').style.color = 'green';
            updateCap();
        } else if (cap === '') {
            localStorage.removeItem('spendingCap');
            document.getElementById('settings-status').textContent = ' Cap removed';
            document.getElementById('settings-status').style.color = 'green';
            updateCap();
        } else {
            document.getElementById('settings-status').textContent = ' Enter a valid amount';
            document.getElementById('settings-status').style.color = 'red';
        }
        
        setTimeout(() => document.getElementById('settings-status').textContent = '', 3000);
    });
    
    // Load saved cap
    const cap = getCap();
    if (cap > 0) document.getElementById('spending-cap').value = cap;
}

function updateUI() {
    displayTransactions();
    renderDashboard();
    updateCap();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeState(); // From state.js
    setupNav();
    setupForm();
    setupSearch();
    setupSort();
    setupSettings();
    showSection('welcome');
    updateUI();
});



