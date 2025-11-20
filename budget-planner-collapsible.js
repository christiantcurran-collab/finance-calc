// Collapsible Section Toggle
function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        icon.classList.remove('rotated');
    } else {
        content.classList.add('open');
        icon.classList.add('rotated');
    }
}

// Expand All / Collapse All
function expandAll() {
    const contents = document.querySelectorAll('.collapsible-content');
    const icons = document.querySelectorAll('.toggle-icon');
    
    contents.forEach(content => content.classList.add('open'));
    icons.forEach(icon => icon.classList.add('rotated'));
}

function collapseAll() {
    const contents = document.querySelectorAll('.collapsible-content');
    const icons = document.querySelectorAll('.toggle-icon');
    
    contents.forEach(content => content.classList.remove('open'));
    icons.forEach(icon => icon.classList.remove('rotated'));
}

// Handle Premium Download with Stripe Payment Link
// Note: You need to create a Payment Link in your Stripe Dashboard for £2.99
// Then replace the URL below with your actual Payment Link
function handlePremiumDownload() {
    // Store budget data in sessionStorage for after payment
    const budgetData = collectBudgetData();
    sessionStorage.setItem('budgetData', JSON.stringify(budgetData));
    
    // TODO: Replace this with your actual Stripe Payment Link from your Stripe Dashboard
    // Go to: https://dashboard.stripe.com/test/payment-links
    // Create a new Payment Link for "QuidWise Premium Budget Export" at £2.99
    // Set success URL to: https://www.quidwise.co.uk/budget-planner.html?payment=success
    // Set cancel URL to: https://www.quidwise.co.uk/budget-planner.html?payment=cancel
    
    const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_XXXXXXXXXXXXX'; // Replace with your link
    
    // Redirect to Stripe Payment Link
    window.location.href = STRIPE_PAYMENT_LINK;
}

// Check for successful payment on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('payment') === 'success') {
        // Retrieve saved budget data
        const budgetData = JSON.parse(sessionStorage.getItem('budgetData'));
        
        if (budgetData) {
            // Download the premium Excel file
            downloadPremiumExcel(budgetData);
            sessionStorage.removeItem('budgetData');
            
            // Show success message
            alert('✅ Payment successful! Your premium budget is downloading now.');
            
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    } else if (urlParams.get('payment') === 'cancel') {
        alert('Payment cancelled. You can try again anytime.');
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

function collectBudgetData() {
    const data = {
        income: {},
        expenses: {}
    };
    
    // Collect income
    const incomeInputs = document.querySelectorAll('.income-input');
    incomeInputs.forEach(input => {
        data.income[input.id] = parseFloat(input.value) || 0;
    });
    
    // Collect expenses
    const expenseInputs = document.querySelectorAll('.expense-input');
    expenseInputs.forEach(input => {
        data.expenses[input.id] = parseFloat(input.value) || 0;
    });
    
    return data;
}

function downloadPremiumExcel(data) {
    // Create workbook with QuidWise branding
    const wb = XLSX.utils.book_new();
    
    // Define QuidWise colors
    const primaryColor = { rgb: "1A6B5C" };
    const lightGreen = { rgb: "E8F5F3" };
    const white = { rgb: "FFFFFF" };
    
    // Create header rows
    const headerData = [
        ['QuidWise Budget Planner'],
        ['Your Personal Monthly Budget'],
        ['Generated: ' + new Date().toLocaleDateString('en-GB')],
        [],
        []
    ];
    
    // Income section
    const incomeData = [
        ['INCOME', 'Amount (£)'],
        ['Income from Employment', data.income.incomeEmployment || 0],
        ['Income from Pension', data.income.incomePension || 0],
        ['Income from Benefits', data.income.incomeBenefits || 0],
        ['Other Income', data.income.incomeOther || 0],
        [],
        ['TOTAL INCOME', (data.income.incomeEmployment || 0) + (data.income.incomePension || 0) + (data.income.incomeBenefits || 0) + (data.income.incomeOther || 0)]
    ];
    
    // Expenses by category
    const expenseData = [
        [],
        ['EXPENSES BY CATEGORY', 'Amount (£)'],
        []
    ];
    
    // Add all expense categories
    const categories = ['Home', 'Insurance', 'Transport', 'Loan Repayments', 'Food & Drink', 'Family', 'Entertainment', 'Health', 'Clothes', 'Education', 'Other'];
    
    let totalExpenses = 0;
    
    categories.forEach(category => {
        const categoryExpenses = [];
        let categoryTotal = 0;
        
        Object.entries(data.expenses).forEach(([key, value]) => {
            const input = document.getElementById(key);
            if (input && input.getAttribute('data-category') === category && value > 0) {
                const label = input.closest('.budget-input-group').querySelector('label').textContent.trim();
                categoryExpenses.push([label, value]);
                categoryTotal += value;
            }
        });
        
        if (categoryTotal > 0) {
            expenseData.push([category, '']);
            categoryExpenses.forEach(([label, value]) => {
                expenseData.push(['  ' + label, value]);
            });
            expenseData.push(['Subtotal', categoryTotal]);
            expenseData.push([]);
            totalExpenses += categoryTotal;
        }
    });
    
    expenseData.push(['TOTAL EXPENSES', totalExpenses]);
    expenseData.push([]);
    
    // Summary
    const totalIncome = (data.income.incomeEmployment || 0) + (data.income.incomePension || 0) + (data.income.incomeBenefits || 0) + (data.income.incomeOther || 0);
    const remaining = totalIncome - totalExpenses;
    
    const summaryData = [
        ['SUMMARY', 'Amount (£)'],
        ['Total Income', totalIncome],
        ['Total Expenses', totalExpenses],
        ['Remaining', remaining],
        [],
        [remaining >= 0 ? '✓ You have money left over!' : '⚠ You are overspending!', '']
    ];
    
    // Combine all data
    const allData = [...headerData, ...incomeData, ...expenseData, ...summaryData];
    
    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(allData);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 40 },
        { wch: 15 }
    ];
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Budget');
    
    // Download file
    XLSX.writeFile(wb, 'QuidWise_Budget_' + new Date().toISOString().split('T')[0] + '.xlsx');
}

