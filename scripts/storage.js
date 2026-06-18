//save transactions array to local storage
function saveToLocalStorage(transactionsArray){
    localStorage.setItem('girly_pop_transactions', JSON.stringify(transactionsArray));
}

// Load transactions array from localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem('girly_pop_transactions');
    return data ? JSON.parse(data) : [];
}

