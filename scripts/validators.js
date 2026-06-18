// check whether the input was started and ended with a space
function validateDescription(value) {
    const pattern = /^\S(?:.*\S)?$/;

    if (!value || value.trim() === "") {
        return { valid: false, error: "Description cannot be empty" };
    }

    if (!pattern.test(value)) {
        return { valid: false, error: "Description cannot start or end with a space" };
    }

    return { valid: true };
}

// to make sure that numbers have up to 2 decimal points and cannot be negative
function validateAmount(value) {
    const pattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

    if (!value || value.trim() === "") {
        return { valid: false, error: "Amount cannot be empty" };
    }

    if (!pattern.test(value)) {
        return { valid: false, error: "Enter a valid amount like 12 or 12.50" };
    }

    return { valid: true };
}

// to make sure that the format year-month-date is followed with hyphens
function validateDate(value) {
    const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if (!value || value.trim() === "") {
        return { valid: false, error: "Date cannot be empty" };
    }

    if (!pattern.test(value)) {
        return { valid: false, error: "Date must be in YYYY-MM-DD format e.g. 2025-09-29" };
    }

    return { valid: true };
}

//advanced regex that checks for any duplicated words that follow each other
function validateNoDuplicateWords(value) {
    const pattern = /\b(\w+)\s+\1\b/i;

    if (pattern.test(value)) {
        return { valid: false, error: "Description contains a duplicate word" };
    }

    return { valid: true };
}

//checking whether there are any numbers or special characters between words
function validateCategory(value) {
    const pattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

    if (!value || value === "") {
        return { valid: false, error: "Please select a category" };
    }

    if (!pattern.test(value)) {
        return { valid: false, error: "Category can only contain letters" };
    }

    return { valid: true };
}

function validateType(value) {
    const pattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

    if (!value || value === "") {
        return { valid: false, error: "Please select a type" };
    }

    if (!pattern.test(value)) {
        return { valid: false, error: "Type can only contain letters" };
    }

    return { valid: true };
}

//this checks all validators at once and corrects all errors at once
function validateAll(formData) {
    const errors = {};

    const descriptionResult = validateDescription(formData.description);
    if (!descriptionResult.valid) {
        errors.description = descriptionResult.error;
    }

    const duplicateResult = validateNoDuplicateWords(formData.description);
    if (!duplicateResult.valid) {
        errors.description = duplicateResult.error;
    }

    const amountResult = validateAmount(formData.amount);
    if (!amountResult.valid) {
        errors.amount = amountResult.error;
    }

    const dateResult = validateDate(formData.date);
    if (!dateResult.valid) {
        errors.date = dateResult.error;
    }

    const categoryResult = validateCategory(formData.category);
    if (!categoryResult.valid) {
        errors.category = categoryResult.error;
    }

    const typeResult = validateType(formData.type);
    if (!typeResult.valid){
        errors.category = typeResult.error;
    }

    if (Object.keys(errors).length === 0) {
        return { valid: true };
    }

    return { valid: false, errors: errors };
}