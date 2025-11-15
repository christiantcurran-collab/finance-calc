// Find Mortgage Deals JavaScript

function filterDeals() {
    const dealType = document.getElementById('dealType').value;
    const ltvFilter = document.getElementById('ltvFilter').value;
    const termFilter = document.getElementById('termFilter').value;

    // Get all tables
    const twoYearTable = document.getElementById('twoYearTable');
    const fiveYearTable = document.getElementById('fiveYearTable');
    const trackerTable = document.getElementById('trackerTable');

    // Show/hide tables based on deal type
    if (dealType === 'all' || dealType === 'fixed') {
        if (termFilter === 'all' || termFilter === '2') {
            twoYearTable.closest('.calculator-card').style.display = 'block';
        } else {
            twoYearTable.closest('.calculator-card').style.display = 'none';
        }

        if (termFilter === 'all' || termFilter === '5') {
            fiveYearTable.closest('.calculator-card').style.display = 'block';
        } else {
            fiveYearTable.closest('.calculator-card').style.display = 'none';
        }
    } else {
        twoYearTable.closest('.calculator-card').style.display = 'none';
        fiveYearTable.closest('.calculator-card').style.display = 'none';
    }

    if (dealType === 'all' || dealType === 'tracker') {
        trackerTable.closest('.calculator-card').style.display = 'block';
    } else {
        trackerTable.closest('.calculator-card').style.display = 'none';
    }

    // Filter rows by LTV
    filterTableByLTV(twoYearTable, ltvFilter);
    filterTableByLTV(fiveYearTable, ltvFilter);
    filterTableByLTV(trackerTable, ltvFilter);

    // Scroll to results
    document.querySelector('.calculator-card:nth-of-type(3)').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

function filterTableByLTV(table, ltvFilter) {
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        if (ltvFilter === 'all') {
            row.style.display = '';
        } else {
            const ltvCell = row.cells[2].textContent.replace('%', '');
            const ltvValue = parseInt(ltvCell);
            
            if (ltvValue <= parseInt(ltvFilter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// Initialize - show all deals
document.addEventListener('DOMContentLoaded', function() {
    // All tables visible by default
});

