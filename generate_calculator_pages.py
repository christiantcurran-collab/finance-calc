#!/usr/bin/env python3
"""
Generate individual calculator pages for salaries from £20,000 to £70,000 in £500 intervals.
Each page will be pre-filled with the salary amount and include comprehensive SEO optimization.
"""

import os
import math

def calculate_net_pay(gross_salary, tax_year='2025/26'):
    """Calculate net pay after tax and NI for a given gross salary"""
    # Personal allowance for 2025/26
    personal_allowance = 12570

    # Calculate taxable income
    taxable_income = max(0, gross_salary - personal_allowance)

    # Calculate income tax
    tax = 0
    if taxable_income > 0:
        # Basic rate: 20% on first £37,700 of taxable income
        basic_rate_amount = min(taxable_income, 37700)
        tax += basic_rate_amount * 0.20

        # Higher rate: 40% on remaining taxable income
        higher_rate_amount = max(0, taxable_income - 37700)
        tax += higher_rate_amount * 0.40

    # Calculate National Insurance (8% between £12,570 and £50,270)
    ni_threshold = 12570
    ni_upper_limit = 50270
    ni = 0

    if gross_salary > ni_threshold:
        ni_earnings = min(gross_salary, ni_upper_limit) - ni_threshold
        ni += ni_earnings * 0.08

    # Net pay
    net_pay = gross_salary - tax - ni

    return {
        'gross': gross_salary,
        'tax': round(tax, 2),
        'ni': round(ni, 2),
        'net': round(net_pay, 2),
        'monthly': round(net_pay / 12, 2),
        'weekly': round(net_pay / 52, 2)
    }

def format_currency(amount):
    """Format amount as currency"""
    return f"£{amount:,.0f}" if amount >= 100 else f"£{amount:,.2f}"

def generate_page_content(salary_amount, calculations):
    """Generate the HTML content for a specific salary page"""

    salary_str = str(salary_amount)
    salary_short = salary_str[:-3] + 'k'  # e.g., 25000 -> 25k

    # SEO keywords based on the example provided
    keywords = [
        f"{salary_short} take home pay",
        f"{salary_short} net salary",
        f"{salary_str} per year net income",
        f"{salary_short} gross salary how much net",
        f"{salary_str} gross to net UK",
        f"{salary_str},000 take home London",
        f"{salary_str} a year after tax",
        f"{salary_str} annual salary take home per month",
        f"{salary_short} salary monthly take home",
        f"{salary_str} a year weekly pay after tax",
        f"{salary_str} salary after tax calculator UK",
        f"{salary_short} take home pay calculator",
        "net salary calculator " + salary_str,
        f"{salary_str} income tax calculator [your country]",
        f"{salary_str} salary after tax UK 2025/26",
        f"{salary_str} take home pay this tax year",
        f"{salary_short} salary after tax current year UK",
        f"If I earn {salary_str} a year how much do I get after tax?",
        f"How much is {salary_str} after tax in the UK?",
        f"What is the take home pay on a {salary_str} salary?"
    ]

    # Create meta description
    meta_description = f"What's the take home pay on a {format_currency(salary_amount)} salary in England 2025/26? Calculate your exact net income after tax and National Insurance. Net pay: {format_currency(calculations['net'])} annually."

    # Create title
    title = f"{format_currency(salary_amount)} Salary Take Home Pay Calculator UK 2025/26 | QuidWise"

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-W8KXMNYDCS"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-W8KXMNYDCS');
    </script>

    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9869727060387652"
     crossorigin="anonymous"></script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{meta_description}">
    <meta name="keywords" content="{', '.join(keywords)}">
    <meta name="author" content="QuidWise">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://www.quidwise.co.uk/income-tax-calculator/{salary_amount}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.quidwise.co.uk/income-tax-calculator/{salary_amount}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{meta_description}">
    <meta property="og:image" content="https://www.quidwise.co.uk/logo.svg">
    <meta property="og:site_name" content="QuidWise">
    <meta property="og:locale" content="en_GB">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://www.quidwise.co.uk/income-tax-calculator/{salary_amount}">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{meta_description}">
    <meta name="twitter:image" content="https://www.quidwise.co.uk/logo.svg">

    <title>{title}</title>
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Structured Data - Calculator -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "{format_currency(salary_amount)} Salary Calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "description": "{meta_description}",
      "offers": {{
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "GBP"
      }},
      "author": {{
        "@type": "Organization",
        "name": "QuidWise",
        "url": "https://www.quidwise.co.uk"
      }}
    }}
    </script>
</head>
<body>
    <!-- Navigation -->
    <nav class="main-nav">
        <div class="nav-container">
            <a href="../index.html" class="logo-link">
                <div class="quidwise-logo">
                    <img src="../logo.svg" alt="QuidWise Logo" class="logo-image">
                    <div class="logo-text-container">
                        <span class="logo-text">QuidWise</span>
                        <span class="logo-tagline">Make your pay go further</span>
                    </div>
                </div>
            </a>

            <ul class="nav-menu">
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link">
                        Tax & Budgeting <i class="fas fa-chevron-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="../income-tax-calculator.html">Income Tax Calculator</a></li>
                        <li><a href="../budget-planner.html">Budget Planner</a></li>
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a href="#" class="nav-link">
                        Mortgages & Property <i class="fas fa-chevron-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="../mortgage-calculator.html">Mortgage Calculator</a></li>
                        <li><a href="../mortgage-affordability.html">Mortgage Affordability</a></li>
                        <li><a href="../stamp-duty-calculator.html">Stamp Duty Calculator</a></li>
                        <li><a href="../find-mortgage-deals.html">Mortgage Rate Comparison</a></li>
                        <li><a href="../mortgage-overpayment.html">Mortgage Overpayment Calculator</a></li>
                        <li><a href="../buy-or-rent.html">Buy vs Rent Estimate</a></li>
                    </ul>
                </li>

                <li class="nav-item">
                    <a href="../blogs.html" class="nav-link">Blog</a>
                </li>
            </ul>

            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <div class="container">
        <div class="calculator-header">
            <h1><i class="fas fa-calculator"></i> {format_currency(salary_amount)} Salary Calculator</h1>
            <p class="subtitle">Calculate your take-home pay after tax and National Insurance for 2025/26</p>
        </div>

        <div class="calculator-results">
            <div class="result-card">
                <div class="result-header">
                    <h2>{format_currency(salary_amount)} Annual Salary Breakdown</h2>
                </div>

                <div class="salary-breakdown">
                    <div class="breakdown-item">
                        <span class="label">Gross Salary:</span>
                        <span class="value gross">{format_currency(calculations['gross'])}</span>
                    </div>

                    <div class="breakdown-item">
                        <span class="label">Income Tax:</span>
                        <span class="value tax">-{format_currency(calculations['tax'])}</span>
                    </div>

                    <div class="breakdown-item">
                        <span class="label">National Insurance:</span>
                        <span class="value ni">-{format_currency(calculations['ni'])}</span>
                    </div>

                    <div class="breakdown-item total">
                        <span class="label">Net Take-Home Pay:</span>
                        <span class="value net">{format_currency(calculations['net'])}</span>
                    </div>
                </div>

                <div class="frequency-breakdown">
                    <div class="freq-item">
                        <span class="freq-label">Monthly:</span>
                        <span class="freq-value">{format_currency(calculations['monthly'])}</span>
                    </div>
                    <div class="freq-item">
                        <span class="freq-label">Weekly:</span>
                        <span class="freq-value">{format_currency(calculations['weekly'])}</span>
                    </div>
                </div>
            </div>

            <div class="calculator-info">
                <h3>Understanding Your {format_currency(salary_amount)} Salary</h3>
                <p>With a gross salary of {format_currency(salary_amount)}, you'll take home {format_currency(calculations['net'])} annually after deductions for income tax ({format_currency(calculations['tax'])}) and National Insurance ({format_currency(calculations['ni'])}).</p>

                <div class="key-points">
                    <h4>Key Points:</h4>
                    <ul>
                        <li><strong>Tax Year:</strong> 2025/26 (England)</li>
                        <li><strong>Personal Allowance:</strong> £12,570</li>
                        <li><strong>Tax Rate:</strong> 20% basic rate</li>
                        <li><strong>NI Threshold:</strong> £12,570 - £50,270</li>
                    </ul>
                </div>

                <div class="cta-section">
                    <p>Want to calculate a different salary or include pension contributions?</p>
                    <a href="../income-tax-calculator.html" class="cta-button">
                        <i class="fas fa-calculator"></i> Use Full Calculator
                    </a>
                </div>
            </div>
        </div>

        <!-- Google AdSense -->
        <div style="margin-top: 2rem; text-align: center;">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-format="fluid"
                 data-ad-layout-key="-5i+ch-c-7y+nr"
                 data-ad-client="ca-pub-9869727060387652"
                 data-ad-slot="1458643248"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({{}});
            </script>
        </div>

        <footer>
            <div class="footer-content">
                <p class="disclaimer">
                    <i class="fas fa-info-circle"></i>
                    <strong>Disclaimer:</strong> Tax year 2025/26. This calculator is for estimation purposes only. Actual deductions may vary based on your tax code and other circumstances.
                </p>
                <div class="footer-badges">
                    <span class="badge"><i class="fas fa-shield-alt"></i> Privacy-First</span>
                    <span class="badge"><i class="fas fa-lock"></i> Secure</span>
                    <span class="badge"><i class="fas fa-map-marker-alt"></i> Made for UK</span>
                </div>
                <p style="margin-top: 1rem; font-size: 0.85rem; opacity: 0.7;">
                    © 2025 QuidWise. All rights reserved. | QuidWise Ltd Registered in England and Wales.
                </p>
                <p style="font-size: 0.75rem; opacity: 0.6; line-height: 1.5; margin-top: 0.5rem;">
                    We aim to provide calculators and guides, but can't guarantee perfection. Use this information at your own risk. This is not financial advice—always research for your specific circumstances. While we link to other sites, we're not responsible for their content. Product prices and terms can change after publication, so always verify directly with providers. We can't investigate every company's financial stability, and there's always a risk of business failure.
                </p>
            </div>
        </footer>
    </div>

    <script src="../script.js"></script>
    <script src="../navigation.js"></script>
</body>
</html>"""

    return html_content

def main():
    """Generate all calculator pages"""
    # Create salary amounts from 20000 to 70000 in £500 intervals
    salaries = []
    for amount in range(20000, 70001, 500):
        salaries.append(amount)

    print(f"Generating {len(salaries)} calculator pages...")

    # Create output directory if it doesn't exist
    output_dir = "income-tax-calculator"
    os.makedirs(output_dir, exist_ok=True)

    # Generate each page
    for salary in salaries:
        calculations = calculate_net_pay(salary)

        # Generate page content
        content = generate_page_content(salary, calculations)

        # Write to file
        filename = f"{salary}.html"
        filepath = os.path.join(output_dir, filename)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"Generated: {filename} - Net pay: £{calculations['net']:,.0f}")

    print(f"\n✅ Successfully generated {len(salaries)} calculator pages!")
    print(f"Pages saved in: {output_dir}/")
    print(f"URL format: quidwise.co.uk/income-tax-calculator/[amount]")

if __name__ == "__main__":
    main()
