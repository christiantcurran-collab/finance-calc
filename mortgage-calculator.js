// Mortgage Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mortgageForm');
    const resultsSection = document.getElementById('results');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateMortgage();
    });

    function calculateMortgage() {
        // Get input values
        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const termYears = parseInt(document.getElementById('term').value);
        const annualRate = parseFloat(document.getElementById('interestRate').value);

        // Calculate monthly payment using standard mortgage formula
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = termYears * 12;

        let monthlyPayment;
        if (monthlyRate === 0) {
            // If interest rate is 0%, simple division
            monthlyPayment = loanAmount / numberOfPayments;
        } else {
            // Standard mortgage payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
            monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        const totalRepayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalRepayment - loanAmount;

        // Display results
        document.getElementById('monthlyPayment').textContent = '£' + monthlyPayment.toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        document.getElementById('displayLoan').textContent = '£' + loanAmount.toLocaleString('en-GB');
        document.getElementById('displayTerm').textContent = termYears + ' years (' + numberOfPayments + ' months)';
        document.getElementById('displayRate').textContent = annualRate + '%';
        
        document.getElementById('totalRepayment').textContent = '£' + totalRepayment.toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        document.getElementById('totalInterest').textContent = '£' + totalInterest.toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
