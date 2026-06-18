// Filter transactions based on search term
function searchTransactions(searchTerm, caseSensitive = false) {
    const allTransactions = getAllTransactions();
    
    if (!searchTerm || searchTerm.trim() === '') {
        return allTransactions;
    }
    
    return allTransactions.filter(transaction => {
        const fields = [
            transaction.description,
            transaction.category,
            transaction.type,
            transaction.date,
            transaction.amount
        ];
        
        return fields.some(field => {
            const fieldStr = String(field);
            return caseSensitive 
                ? fieldStr.includes(searchTerm)
                : fieldStr.toLowerCase().includes(searchTerm.toLowerCase());
        });
    });
}

// Highlight matched text
function highlightMatch(text, searchTerm, caseSensitive) {
    if (!searchTerm || !text) return text;
    
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, flags);
    
    return text.replace(regex, '<mark>$1</mark>');
}

// Display search results in the table
function displaySearchResults(searchTerm, caseSensitive = false) {
    const results = searchTransactions(searchTerm, caseSensitive);
    const searchError = document.getElementById('search-error');
    
    if (results.length === 0) {
        searchError.textContent = `No results for "${searchTerm}"`;
        renderTable([]);
        return;
    }
    
    searchError.textContent = '';
    
    const highlighted = results.map(transaction => ({
        ...transaction,
        description: highlightMatch(transaction.description, searchTerm, caseSensitive),
        category: highlightMatch(transaction.category, searchTerm, caseSensitive),
        date: highlightMatch(transaction.date, searchTerm, caseSensitive),
        type: highlightMatch(transaction.type, searchTerm, caseSensitive)
    }));
    
    renderTable(highlighted);
}

// Set up search event listeners
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const caseToggle = document.getElementById('case-toggle');
    const searchBtn = document.getElementById('search-btn');
    const clearBtn = document.getElementById('clear-search-btn');
    
    // Search button - only search when clicked
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value;
        const caseSensitive = !caseToggle.checked;
        
        if (searchTerm.trim() === '') {
            displayTransactions();
        } else {
            displaySearchResults(searchTerm, caseSensitive);
        }
    });
    
    // Clear search
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        caseToggle.checked = false;
        document.getElementById('search-error').textContent = '';
        displayTransactions();
    });
}

