// Mortgage Calculator JavaScript

let principalChart = null;

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
        const mortgageType = document.querySelector('input[name="mortgageType"]:checked').value;

        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = termYears * 12;

        let monthlyPayment, totalRepayment, totalInterest;
        let firstPaymentInterest = 0, firstPaymentPrincipal = 0;

        if (mortgageType === 'interestOnly') {
            // Interest-only mortgage
            monthlyPayment = loanAmount * monthlyRate;
            totalRepayment = (monthlyPayment * numberOfPayments) + loanAmount;
            totalInterest = monthlyPayment * numberOfPayments;
            firstPaymentInterest = monthlyPayment;
            firstPaymentPrincipal = 0;
        } else {
            // Repayment mortgage
            if (monthlyRate === 0) {
                monthlyPayment = loanAmount / numberOfPayments;
                firstPaymentInterest = 0;
                firstPaymentPrincipal = monthlyPayment;
            } else {
                // Standard mortgage payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
                monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                               (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                
                // First payment breakdown
                firstPaymentInterest = loanAmount * monthlyRate;
                firstPaymentPrincipal = monthlyPayment - firstPaymentInterest;
            }
            
            totalRepayment = monthlyPayment * numberOfPayments;
            totalInterest = totalRepayment - loanAmount;
        }

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

        // Show/hide first payment breakdown
        const firstPaymentBreakdown = document.getElementById('firstPaymentBreakdown');
        if (mortgageType === 'repayment') {
            document.getElementById('firstPaymentInterest').textContent = '£' + firstPaymentInterest.toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            document.getElementById('firstPaymentPrincipal').textContent = '£' + firstPaymentPrincipal.toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            firstPaymentBreakdown.style.display = 'block';
        } else {
            firstPaymentBreakdown.style.display = 'none';
        }

        // Generate and display chart
        if (mortgageType === 'repayment') {
            generatePrincipalChart(loanAmount, monthlyPayment, monthlyRate, termYears);
        } else {
            document.getElementById('chartSection').style.display = 'none';
        }

        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function generatePrincipalChart(loanAmount, monthlyPayment, monthlyRate, termYears) {
        // Calculate principal balance at the end of each year
        const years = [];
        const balances = [];
        
        let balance = loanAmount;
        years.push(0);
        balances.push(balance);

        for (let year = 1; year <= termYears; year++) {
            for (let month = 1; month <= 12; month++) {
                const interestPayment = balance * monthlyRate;
                const principalPayment = monthlyPayment - interestPayment;
                balance = Math.max(0, balance - principalPayment);
            }
            years.push(year);
            balances.push(balance);
        }

        // Destroy existing chart if it exists
        if (principalChart) {
            principalChart.destroy();
        }

        // Create new chart
        const ctx = document.getElementById('principalChart').getContext('2d');
        principalChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Outstanding Principal',
                    data: balances,
                    borderColor: 'rgb(26, 107, 92)',
                    backgroundColor: 'rgba(26, 107, 92, 0.1)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '£' + context.parsed.y.toLocaleString('en-GB', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '£' + (value / 1000).toFixed(0) + 'k';
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                }
            }
        });

        document.getElementById('chartSection').style.display = 'block';
    }
});
