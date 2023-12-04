function validateForm() {
    // Reset previous error messages
    resetErrors();

    // Get form elements
    var employeeId = document.getElementById("employeeId").value;
    var designation = document.getElementById("designation").value;
    var loanAmount = parseFloat(document.getElementById("loanAmount").value);
    var interestRate = parseFloat(document.getElementById("interest").value);

    // Check employee ID format
    if (employeeId.length < 4 || !employeeId.startsWith("E")) {
        showError("employeeId", "Employee ID must be at least 4 characters long and start with 'E'");
        event.preventDefault(); // Prevent form submission
        return;
    }

    // Calculate loan amount and interest based on designation
    var loanAmountResult = calculateLoanAmount(designation, loanAmount);
    var interestPayableResult = calculateInterestPayable(loanAmountResult, interestRate);

    // Display results
    displayResult(loanAmountResult, interestPayableResult);

    // Prevent form submission
    event.preventDefault();
}

function calculateLoanAmount(designation, originalLoanAmount) {
    // Customize the calculation logic based on the employee's designation
    switch (designation.toLowerCase()) {
        case "manager":
            return originalLoanAmount * 1.1; // Increase loan amount by 10% for managers
        case "employee":
            return originalLoanAmount; // No change for regular employees
        default:
            return originalLoanAmount;
    }
}

function calculateInterestPayable(loanAmount, interestRate) {
    // Simple interest calculation
    return loanAmount * (interestRate / 100);
}

function displayResult(loanAmount, interestPayable) {
    var resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `<strong>Loan Amount:</strong> $${loanAmount.toFixed(2)}<br><strong>Interest Payable:</strong> $${interestPayable.toFixed(2)}`;
}

function showError(fieldId, message) {
    var errorElement = document.getElementById(`${fieldId}Error`);
    errorElement.textContent = message;
}

function resetErrors() {
    var errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (element) {
        element.textContent = "";
    });
}
