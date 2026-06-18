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

async function initializeState() {
    // Try to load from localStorage first
    transactions = loadFromLocalStorage();
    
    // If no data exists, load seed data instead
    if (transactions.length === 0) {
        await loadSeedData();
    }
}

async function loadSeedData() {
    try {
        // Fetch seed.json
        const response = await fetch('seed.json');
        const seedData = await response.json();
        
        // Load seed data into transactions
        transactions = seedData;
        
        // Save to localStorage
        saveToLocalStorage(transactions);
        
        console.log('Seed data loaded:', transactions.length, 'transactions');
    } catch (error) {
        console.error('Error loading seed data:', error);
    }
}

function deleteTransactionFromState(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveToLocalStorage(transactions);
}

function clearAllTransactions() {
    transactions = [];
    saveToLocalStorage(transactions);
}