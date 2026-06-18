let transactions = [];

function showSection(sectionId){
    const sections = document.querySelectorAll('.section');
    //gets all sections with the id

    sections.forEach(section => {
        section.classList.remove('active');
        //this removes active from whichever section currently has the active

        if (section.id === sectionId){
            section.classList.add('active');
            //now it places active on whichever section is chosen
        }
    
    });


}

function setupNav(){
    const navLinks = document.querySelectorAll('nav a');
    //collect the nav links

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            //adding a click listener to each link
            event.preventDefault();
            //this is to prevent default link behaviour

            const sectionId = this.getAttribute('href').substring(1);
            //getting section ID from the data section attribute

            showSection(sectionId);
        });
    });

    console.log('Navigation setup complete!');
}

function setupFormValidation(){
    const form = document.getElementById('transaction-form');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        console.log('Form Submitted!');

        //now we get all values from the form
        const formData = {
            type: document.getElementById('type').value,
            date: document.getElementById('date').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            amount: document.getElementById('amount').value,
        };

        //validate the form
        const validationResult = validateForm(formData);

        if (validationResult.isValid) {
            //if valid, save the transaction
            saveTransaction(formData);
        } else {
            // if invalid, show errors
            showValidationErrors(validationResult.errors);
        }
    });

}

function validateForm(formData){
    
    const result = validateAll(formData);

    if (result.valid) {
        return{
            isValid: true,
            errors: {}
        };
    } else {
        return {
            isValid: false,
            errors: result.errors
        };
    }
    

    //validating each field
    const dateValidation = validateDate(formData.date);
    if (!dateValidation.isValid) {
        errors.date = dateValidation.message;
        isValid = false;
    }

    const descriptionValidation = validateDescription(formData.description);
    if (!descriptionValidation.isValid) {
        errors.description = descriptionValidation.message;
        isValid = false;
    }

    const amountValidation = validateAmount(formData.amount);
    if (!amountValidation.isValid) {
        errors.amount = amountValidation.message;
        isValid = false;
    }

    const categoryValidation = validateCategory(formData.category);
    if (!categoryValidation.isValid) {
        errors.category = categoryValidation.message;
        isValid = false;
    }

    const typeValidation = validateType(formData.type);
    if (!typeValidation.isValid) {
        errors.type = typeValidation.message;
        isValid = false;
    }

    return {
        isValid : isValid,
        errors: errors
    };
}

function showValidationErrors(errors) {
    clearAllErrors();
    //first is to clear any already existing error messages
 
    if (errors.date) {
        document.getElementById('date-error').textContent = errors.date;
    }
    if (errors.description) {
        document.getElementById('description-error').textContent = errors.description;
    }
    if (errors.amount) {
        document.getElementById('amount-error').textContent = errors.amount;
    }
    if (errors.category){
        document.getElementById('category-error').textContent = errors.category;
    }
    if (errors.type) {
        document.getElementById('type-error').textContent = errors.type;
    }
}

//clear all error messsages
function clearAllErrors() {
    document.querySelectorAll('.error-msg, .error').forEach(el => {
        el.textContent = '';
    });
}

function saveTransaction(formData) {
    // Create a unique ID for this transaction
    const transaction = {
        id: Date.now(),
        type: formData.type,
        date: formData.date,
        description: formData.description,
        category: formData.category,
        amount: formData.amount
    };
    
    // Add to the array
    transactions.push(transaction);
    
    // Save to localStorage
    saveToLocalStorage(transactions);
    
    // Display in table
    displayTransactions();
    
    // Reset form
    document.getElementById('transaction-form').reset();
    clearAllErrors();
    
    console.log('Transaction saved!', transaction);
}

function displayTransactions() {
    const recordsBody = document.getElementById('records-body');
    recordsBody.innerHTML = ''; // Clear existing rows
    
    if (transactions.length === 0) {
        document.getElementById('empty-message').style.display = 'block';
        return;
    }
    
    document.getElementById('empty-message').style.display = 'none';
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${transaction.type}</td>
            <td>UGX ${parseFloat(transaction.amount).toFixed(2)}</td>
        `;
        recordsBody.appendChild(row);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Load saved transactions from localStorage
    transactions = loadFromLocalStorage();
    
    // Display them immediately
    displayTransactions();
    
    // Setup everything else
    setupNav();
    showSection('welcome');
    setupFormValidation();
});


