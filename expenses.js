/**
 * Expenses Guide - Interactive functionality
 * Powers the savings estimator, category cards, quiz, and FAQ
 */

document.addEventListener('DOMContentLoaded', function() {
    renderCategoryCards();
    renderQuizChecklist();
});

/* ========================================
   CATEGORY CARDS
   ======================================== */

function renderCategoryCards() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;

    container.innerHTML = EXPENSE_CATEGORIES.map(function(cat) {
        var claimableCount = cat.claimableExamples.length;

        // Build claimable items
        var claimableItems = cat.claimableExamples.map(function(ex) {
            var partial = ex.partialClaim ? '<span class="partial-badge">Partial claim</span>' : '';
            return '<li>' +
                '<span class="claim-icon yes"><i class="fas fa-circle-check"></i></span>' +
                '<div class="claim-item-text"><strong>' + ex.item + '</strong>' + partial + '<br><span>' + ex.detail + '</span></div>' +
                '</li>';
        }).join('');

        // Build not-claimable items
        var notClaimableItems = cat.notClaimableExamples.map(function(ex) {
            return '<li>' +
                '<span class="claim-icon no"><i class="fas fa-circle-xmark"></i></span>' +
                '<div class="claim-item-text"><strong>' + ex.item + '</strong><br><span>' + ex.detail + '</span></div>' +
                '</li>';
        }).join('');

        // Build tips
        var tipsHtml = '';
        if (cat.tips && cat.tips.length > 0) {
            tipsHtml = '<div class="tips-section"><h4><i class="fas fa-lightbulb"></i> Tips</h4><ul>' +
                cat.tips.map(function(tip) { return '<li>' + tip + '</li>'; }).join('') +
                '</ul></div>';
        }

        // Build simplified expense option
        var simplifiedHtml = '';
        if (cat.simplifiedExpenseOption) {
            var ratesHtml = cat.simplifiedExpenseOption.rates.map(function(r) {
                return '<div class="simplified-rate"><span class="condition">' + r.condition + '</span><span class="amount">' + r.amount + '</span></div>';
            }).join('');
            simplifiedHtml = '<div class="simplified-box"><h4><i class="fas fa-bolt"></i> Simplified Expense Option</h4>' +
                '<p style="font-size:0.88rem;color:#555;margin-bottom:0.5rem;">' + cat.simplifiedExpenseOption.description + '</p>' +
                '<div class="simplified-rates">' + ratesHtml + '</div></div>';
        }

        return '<div class="category-card" id="card-' + cat.id + '">' +
            '<div class="category-card-header" onclick="toggleCard(\'' + cat.id + '\')">' +
                '<div class="category-icon"><i class="fas ' + cat.icon + '"></i></div>' +
                '<div class="category-header-text">' +
                    '<h3>' + cat.name + '</h3>' +
                    '<span class="hmrc-tag">SA103: ' + cat.hmrcCategory + '</span>' +
                '</div>' +
                '<span class="category-count">' + claimableCount + ' claimable</span>' +
                '<span class="category-toggle"><i class="fas fa-chevron-down"></i></span>' +
            '</div>' +
            '<div class="category-card-body">' +
                '<div class="category-card-content">' +
                    '<p class="category-description">' + cat.description + '</p>' +
                    '<div class="claim-section">' +
                        '<div class="claim-section-title claimable"><i class="fas fa-circle-check"></i> You CAN Claim</div>' +
                        '<ul class="claim-list">' + claimableItems + '</ul>' +
                    '</div>' +
                    '<div class="claim-section">' +
                        '<div class="claim-section-title not-claimable"><i class="fas fa-circle-xmark"></i> You CANNOT Claim</div>' +
                        '<ul class="claim-list">' + notClaimableItems + '</ul>' +
                    '</div>' +
                    simplifiedHtml +
                    tipsHtml +
                    '<a href="expenses/' + cat.id + '.html" class="category-deep-link">Read full ' + cat.name + ' guide <i class="fas fa-arrow-right"></i></a>' +
                '</div>' +
            '</div>' +
        '</div>';
    }).join('');
}

function toggleCard(id) {
    var card = document.getElementById('card-' + id);
    if (card) {
        card.classList.toggle('expanded');
    }
}

/* ========================================
   SAVINGS ESTIMATOR
   ======================================== */

function calculateSavings() {
    var input = document.getElementById('incomeInput');
    var result = document.getElementById('savingsResult');
    var amountEl = document.getElementById('savingsAmount');
    var detailEl = document.getElementById('savingsDetail');

    var income = parseInt(input.value.replace(/[^0-9]/g, ''));
    if (!income || income < 1000) {
        result.classList.remove('visible');
        return;
    }

    // Estimate typical claimable expenses as % of income
    // Typical freelancer claims 15-25% of income as expenses
    var lowExpenses = Math.round(income * 0.10);
    var highExpenses = Math.round(income * 0.20);

    // Calculate tax saving based on marginal rate
    var lowRate, highRate;
    if (income <= 50270) {
        lowRate = 0.20; // basic rate
        highRate = 0.20;
    } else if (income <= 125140) {
        lowRate = 0.20;
        highRate = 0.40; // higher rate
    } else {
        lowRate = 0.40;
        highRate = 0.45;
    }

    // Also include NI saving (8% for basic, 2% for higher)
    var niRate = income <= 50270 ? 0.08 : 0.02;

    var lowSaving = Math.round(lowExpenses * (lowRate + niRate));
    var highSaving = Math.round(highExpenses * (highRate + niRate));

    amountEl.textContent = '\u00a3' + lowSaving.toLocaleString() + ' \u2013 \u00a3' + highSaving.toLocaleString();
    detailEl.textContent = 'Estimated tax saving if you claim \u00a3' + lowExpenses.toLocaleString() + ' \u2013 \u00a3' + highExpenses.toLocaleString() + ' in expenses (typical for a \u00a3' + income.toLocaleString() + ' income).';

    result.classList.add('visible');
}

// Allow pressing Enter in the input
document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('incomeInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateSavings();
            }
        });
    }
});

/* ========================================
   QUIZ: AM I CLAIMING ENOUGH?
   ======================================== */

function renderQuizChecklist() {
    var container = document.getElementById('quizChecklist');
    if (!container) return;

    container.innerHTML = EXPENSE_CATEGORIES.map(function(cat) {
        return '<li><input type="checkbox" id="quiz-' + cat.id + '" value="' + cat.id + '"><label for="quiz-' + cat.id + '">' + cat.name + '</label></li>';
    }).join('');
}

function checkQuiz() {
    var checkboxes = document.querySelectorAll('#quizChecklist input[type="checkbox"]');
    var result = document.getElementById('quizResult');
    var countEl = document.getElementById('missingCount');
    var textEl = document.getElementById('missingText');
    var savingEl = document.getElementById('potentialSaving');

    var checked = 0;
    var uncheckedCategories = [];
    checkboxes.forEach(function(cb) {
        if (cb.checked) {
            checked++;
        } else {
            uncheckedCategories.push(cb.value);
        }
    });

    var missing = EXPENSE_CATEGORIES.length - checked;

    if (missing === 0) {
        countEl.textContent = '\u2705';
        countEl.style.color = '#1B4332';
        textEl.textContent = 'Great job! You\'re claiming across all major categories.';
        savingEl.textContent = 'Keep those receipts and records up to date!';
    } else {
        countEl.textContent = missing;
        countEl.style.color = '#E76F51';

        var missingNames = uncheckedCategories.map(function(id) {
            var cat = EXPENSE_CATEGORIES.find(function(c) { return c.id === id; });
            return cat ? cat.name : id;
        });

        textEl.innerHTML = 'categories you\'re <strong>not claiming</strong>. You could be missing out on: <em>' + missingNames.join(', ') + '</em>.';

        // Rough estimate: ~£200-500 per missed category
        var lowSave = missing * 200;
        var highSave = missing * 500;
        savingEl.textContent = 'Potential extra saving: \u00a3' + lowSave.toLocaleString() + ' \u2013 \u00a3' + highSave.toLocaleString() + '/year';
    }

    result.classList.add('visible');
}

/* ========================================
   FAQ TOGGLE
   ======================================== */

function toggleFaq(element) {
    var item = element.closest('.faq-item');
    if (item) {
        item.classList.toggle('expanded');
    }
}

