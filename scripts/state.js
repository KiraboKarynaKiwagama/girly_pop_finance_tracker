let transactions = [];

function addTransactionToState(formData) {
    const transaction = {
        id: Date.now(),
        type: formData.type,
        date: formData.date,
        description: formData.description,
        category: formData.category,
        amount: formData.amount
    };
    
    transactions.push(transaction);
    saveToLocalStorage(transactions);
    return transaction;
}

function getAllTransactions() {
    return [...transactions];  // Returns a copy
}

function initializeState() {
    transactions = loadFromLocalStorage();
    console.log('State initialized with transactions');
}

function deleteTransactionFromState(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveToLocalStorage(transactions);
}

function clearAllTransactions() {
    transactions = [];
    saveToLocalStorage(transactions);
}