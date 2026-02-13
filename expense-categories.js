/**
 * HMRC Expense Categories for UK Self-Employed / Freelancers
 * Maps to SA103 Self Assessment form categories
 * Tax year: 2024/25 and 2025/26
 */

const EXPENSE_CATEGORIES = [
    {
        id: "office-supplies",
        name: "Office, Stationery & Software",
        hmrcCategory: "Office costs",
        icon: "fa-desktop",
        description: "Costs for running your workspace, from paper clips to software subscriptions.",
        claimableExamples: [
            { item: "Stationery & printing", detail: "Paper, pens, ink cartridges, notebooks", partialClaim: false },
            { item: "Postage & packaging", detail: "Stamps, courier fees, padded envelopes", partialClaim: false },
            { item: "Software subscriptions", detail: "Adobe Creative Cloud, Microsoft 365, project management tools", partialClaim: false },
            { item: "Phone bills", detail: "Business proportion of mobile/landline bills", partialClaim: true },
            { item: "Internet", detail: "Business proportion of broadband", partialClaim: true },
            { item: "Computer equipment", detail: "Laptops, monitors, keyboards, mice (if used <2 years, otherwise capital allowance)", partialClaim: false },
            { item: "Domain names & hosting", detail: "Website hosting, domain registration", partialClaim: false }
        ],
        notClaimableExamples: [
            { item: "Personal phone calls", detail: "The personal proportion of a shared phone bill" },
            { item: "Home broadband (full amount)", detail: "Only the business proportion is claimable" },
            { item: "Personal software", detail: "Netflix, Spotify, gaming subscriptions" }
        ],
        tips: [
            "Keep a log of business vs personal phone usage to justify your split to HMRC.",
            "If you buy a laptop for \u00a3800 and use it 70% for business, you can claim \u00a3560.",
            "Software subscriptions are allowable expenses, not capital allowances \u2014 claim them in the year you pay."
        ]
    },
    {
        id: "travel",
        name: "Travel & Mileage",
        hmrcCategory: "Travel costs",
        icon: "fa-car",
        description: "Getting to clients, business meetings, and work-related travel.",
        claimableExamples: [
            { item: "Mileage (simplified)", detail: "45p/mile for first 10,000 miles, 25p/mile after", partialClaim: false },
            { item: "Public transport", detail: "Train, bus, tube fares for business travel", partialClaim: false },
            { item: "Parking", detail: "Business-related parking charges", partialClaim: false },
            { item: "Congestion charges & tolls", detail: "For business journeys only", partialClaim: false },
            { item: "Hotels & overnight stays", detail: "When travelling for business away from home", partialClaim: false },
            { item: "Flights", detail: "For business trips (economy class is safest)", partialClaim: false },
            { item: "Vehicle insurance", detail: "Business proportion if using own vehicle", partialClaim: true },
            { item: "Fuel", detail: "Business proportion (alternative to mileage rate)", partialClaim: true }
        ],
        notClaimableExamples: [
            { item: "Commuting", detail: "Travel between your home and your regular workplace is NOT claimable" },
            { item: "Personal travel", detail: "Holiday flights, personal road trips" },
            { item: "Fines & penalties", detail: "Speeding tickets, parking fines \u2014 even on business trips" },
            { item: "Mileage AND actual costs", detail: "You must choose one method per vehicle \u2014 you can\u2019t claim both" }
        ],
        tips: [
            "If you work from home and travel to a client\u2019s office, that IS claimable \u2014 it\u2019s not commuting.",
            "Use a mileage tracking app to log business miles as you drive. HMRC can ask for evidence.",
            "The 45p/mile rate covers fuel, insurance, MOT, servicing, and depreciation \u2014 you can\u2019t claim these separately if using mileage.",
            "Keep receipts for parking and tolls even if you use the mileage method \u2014 these are claimed separately."
        ],
        simplifiedExpenseOption: {
            description: "Use HMRC\u2019s flat rate mileage instead of tracking actual vehicle costs",
            rates: [
                { condition: "Cars & goods vehicles: first 10,000 miles", amount: "45p per mile" },
                { condition: "Cars & goods vehicles: above 10,000 miles", amount: "25p per mile" },
                { condition: "Motorcycles", amount: "24p per mile" },
                { condition: "Bicycles", amount: "20p per mile" }
            ]
        }
    },
    {
        id: "working-from-home",
        name: "Working from Home",
        hmrcCategory: "Premises costs",
        icon: "fa-house-laptop",
        description: "Costs of using your home as your workplace.",
        claimableExamples: [
            { item: "Flat rate allowance", detail: "\u00a36/week (\u00a326/month) if you work from home 25+ hours/month \u2014 no receipts needed", partialClaim: false },
            { item: "Electricity", detail: "Business proportion based on room usage and hours", partialClaim: true },
            { item: "Gas/heating", detail: "Business proportion", partialClaim: true },
            { item: "Council tax", detail: "Business proportion", partialClaim: true },
            { item: "Mortgage interest", detail: "Business proportion (not repayments)", partialClaim: true },
            { item: "Rent", detail: "Business proportion", partialClaim: true },
            { item: "Home insurance", detail: "Business proportion", partialClaim: true }
        ],
        notClaimableExamples: [
            { item: "Mortgage capital repayments", detail: "Only the interest portion is claimable" },
            { item: "Full household bills", detail: "Only the business proportion" },
            { item: "Home improvements", detail: "Redecorating your kitchen is not a business expense" },
            { item: "Furniture for personal rooms", detail: "Only office furniture for a dedicated work space" }
        ],
        tips: [
            "The flat rate (\u00a36/week) is simpler but usually less than actual costs. Calculate both and pick the higher one.",
            "To calculate your proportion: divide the area of your office by total home area, then multiply by hours used for work vs total hours.",
            "You can use the flat rate AND claim broadband/phone separately \u2014 the flat rate only covers utilities.",
            "Be careful claiming too much \u2014 if HMRC considers a room exclusively for business, it could affect Capital Gains Tax relief when you sell your home."
        ],
        simplifiedExpenseOption: {
            description: "Use HMRC\u2019s flat rate instead of calculating actual household costs",
            rates: [
                { condition: "25-50 hours/month working from home", amount: "\u00a310 per month" },
                { condition: "51-100 hours/month", amount: "\u00a318 per month" },
                { condition: "101+ hours/month", amount: "\u00a326 per month" }
            ]
        }
    },
    {
        id: "professional-services",
        name: "Professional Fees & Insurance",
        hmrcCategory: "Legal and financial costs",
        icon: "fa-scale-balanced",
        description: "Accountants, lawyers, insurance, and professional memberships.",
        claimableExamples: [
            { item: "Accountant fees", detail: "For preparing accounts and tax returns", partialClaim: false },
            { item: "Legal fees", detail: "For business-related legal advice or contracts", partialClaim: false },
            { item: "Professional indemnity insurance", detail: "Required by many freelance professions", partialClaim: false },
            { item: "Public liability insurance", detail: "If required for your work", partialClaim: false },
            { item: "Professional body memberships", detail: "ACCA, RICS, ICE, etc. \u2014 must be relevant to your trade", partialClaim: false },
            { item: "Bank charges", detail: "Business account fees and charges", partialClaim: false },
            { item: "Credit card charges", detail: "Interest and fees on business transactions", partialClaim: false },
            { item: "Debt recovery costs", detail: "Chasing unpaid invoices", partialClaim: false }
        ],
        notClaimableExamples: [
            { item: "Personal legal fees", detail: "Divorce lawyers, personal disputes" },
            { item: "Fines & penalties", detail: "HMRC late filing penalties, court fines" },
            { item: "Personal bank charges", detail: "Overdraft fees on personal accounts" },
            { item: "Life insurance", detail: "This is personal, not business" }
        ],
        tips: [
            "Your accountant\u2019s fee for preparing your Self Assessment is always allowable \u2014 even if you\u2019re not a limited company.",
            "If you use a personal bank account for business, only the business-related charges are claimable.",
            "Professional subscriptions must be on HMRC\u2019s approved list for your profession."
        ]
    },
    {
        id: "marketing",
        name: "Advertising & Marketing",
        hmrcCategory: "Advertising costs",
        icon: "fa-bullhorn",
        description: "Promoting your freelance business.",
        claimableExamples: [
            { item: "Google/Facebook ads", detail: "Online advertising spend", partialClaim: false },
            { item: "Business cards", detail: "Design and printing", partialClaim: false },
            { item: "Website costs", detail: "Design, hosting, domain, maintenance", partialClaim: false },
            { item: "Portfolio hosting", detail: "Behance Pro, Dribbble Pro, etc.", partialClaim: false },
            { item: "Email marketing tools", detail: "Mailchimp, ConvertKit subscriptions", partialClaim: false },
            { item: "Networking event tickets", detail: "If primarily for business purposes", partialClaim: false },
            { item: "Trade show costs", detail: "Stand rental, display materials", partialClaim: false }
        ],
        notClaimableExamples: [
            { item: "Client entertaining", detail: "Taking a client to lunch or dinner is NOT claimable (HMRC is strict on this)" },
            { item: "Gifts to clients over \u00a350", detail: "Small branded gifts may be OK, but meals/experiences are not" },
            { item: "Personal social media", detail: "Your personal Instagram isn\u2019t marketing" }
        ],
        tips: [
            "Client entertaining is the big trap \u2014 HMRC almost never allows it. Don\u2019t claim those client lunches.",
            "Branded gifts under \u00a350 per person per year containing a conspicuous ad for your business may be allowable.",
            "Website costs are fully claimable \u2014 hosting, domain, design, content creation."
        ]
    },
    {
        id: "clothing",
        name: "Clothing & Uniform",
        hmrcCategory: "Clothing costs",
        icon: "fa-shirt",
        description: "Work-specific clothing and protective gear.",
        claimableExamples: [
            { item: "Protective clothing", detail: "Hi-vis, steel-toe boots, hard hats", partialClaim: false },
            { item: "Uniforms", detail: "With your business logo or required by profession", partialClaim: false },
            { item: "Costumes", detail: "If you\u2019re a performer \u2014 clown outfits, period costumes", partialClaim: false },
            { item: "Laundry of work clothing", detail: "Washing/dry cleaning of uniforms", partialClaim: false }
        ],
        notClaimableExamples: [
            { item: "Smart clothes for meetings", detail: "A suit you could also wear personally is NOT claimable" },
            { item: "Everyday workwear", detail: "Jeans, trainers, shirts \u2014 even if you only wear them for work" },
            { item: "Glasses", detail: "Even if needed for screen work \u2014 this is personal" }
        ],
        tips: [
            "The test is: could you wear it on the street? If yes, it\u2019s probably not claimable.",
            "A branded polo with your company logo IS claimable. A plain polo is NOT."
        ]
    },
    {
        id: "training",
        name: "Training & Development",
        hmrcCategory: "Other allowable expenses",
        icon: "fa-graduation-cap",
        description: "Courses, books, and professional development.",
        claimableExamples: [
            { item: "Courses to update existing skills", detail: "A web developer learning a new framework", partialClaim: false },
            { item: "Industry conferences", detail: "Tickets, travel, accommodation", partialClaim: false },
            { item: "Professional books & journals", detail: "Technical books, trade publications", partialClaim: false },
            { item: "Online learning", detail: "Udemy, Coursera, LinkedIn Learning \u2014 if relevant to current work", partialClaim: false }
        ],
        notClaimableExamples: [
            { item: "Training for a new career", detail: "A plumber training to become an accountant" },
            { item: "Qualifications to START a business", detail: "The initial qualification to enter your trade" },
            { item: "General interest courses", detail: "A cooking class (unless you\u2019re a chef)" }
        ],
        tips: [
            "The key distinction: updating/maintaining existing skills = claimable. Acquiring entirely new skills for a different trade = not claimable.",
            "Conference travel and accommodation is claimable on top of the ticket price."
        ]
    },
    {
        id: "staff",
        name: "Staff & Subcontractor Costs",
        hmrcCategory: "Wages, salaries and other staff costs",
        icon: "fa-users",
        description: "Paying people to help with your business.",
        claimableExamples: [
            { item: "Subcontractor payments", detail: "Paying other freelancers to help deliver work", partialClaim: false },
            { item: "Virtual assistant", detail: "Administrative support", partialClaim: false },
            { item: "Employee salaries", detail: "If you employ staff (including employer NI)", partialClaim: false },
            { item: "Employer pension contributions", detail: "Workplace pension contributions", partialClaim: false },
            { item: "Agency fees", detail: "Recruitment/temp agency costs", partialClaim: false }
        ],
        notClaimableExamples: [
            { item: "Your own salary (sole trader)", detail: "You pay yourself from profits \u2014 it\u2019s not an expense" },
            { item: "Your own pension (sole trader)", detail: "Claim pension tax relief separately, not as business expense" },
            { item: "Payments to family with no work done", detail: "Must be genuine work at a reasonable rate" }
        ],
        tips: [
            "If you subcontract work, check if CIS (Construction Industry Scheme) applies to you.",
            "Paying a spouse/partner is allowed if they genuinely do work at a market rate. Keep records of what they do."
        ]
    },
    {
        id: "stock-materials",
        name: "Stock & Materials",
        hmrcCategory: "Cost of goods bought for resale or goods used",
        icon: "fa-box-open",
        description: "Raw materials, stock for resale, and direct costs of delivering your service.",
        claimableExamples: [
            { item: "Raw materials", detail: "Wood, fabric, ingredients \u2014 whatever you use to make products", partialClaim: false },
            { item: "Stock for resale", detail: "Products you buy to sell on", partialClaim: false },
            { item: "Direct project costs", detail: "Stock photography, fonts, assets bought for client projects", partialClaim: false }
        ],
        notClaimableExamples: [
            { item: "Personal items from stock", detail: "If you take stock for personal use, it must be accounted for at market value" }
        ],
        tips: [
            "If using accruals accounting, you must do a year-end stocktake. Cash basis doesn\u2019t require this."
        ]
    },
    {
        id: "financial",
        name: "Interest & Bank Charges",
        hmrcCategory: "Interest on bank and other business loans",
        icon: "fa-landmark",
        description: "Borrowing costs and financial charges for your business.",
        claimableExamples: [
            { item: "Business loan interest", detail: "Interest (not capital repayments) on business loans", partialClaim: false },
            { item: "Business bank account fees", detail: "Monthly fees, transaction charges", partialClaim: false },
            { item: "Business credit card interest", detail: "On business purchases only", partialClaim: false },
            { item: "Hire purchase interest", detail: "On business equipment", partialClaim: false },
            { item: "Overdraft charges", detail: "Business account overdraft fees", partialClaim: false }
        ],
        notClaimableExamples: [
            { item: "Loan capital repayments", detail: "Only the interest portion, not the repayment of the principal" },
            { item: "Personal loan interest", detail: "Even if you used personal funds for business" }
        ],
        tips: [
            "If you use a personal credit card for business, only the interest on business transactions is claimable."
        ]
    }
];

