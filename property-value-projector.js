// Property Value Projector JavaScript

// Embedded projection data (4% average growth, 1.295 volatility)
const PROJECTION_DATA = [
    {year: 1, p10: 0.879809654249802, p25: 0.945744813190315, p50: 1.0350625425677689, p75: 1.1254680374650738, p90: 1.2162516241337429},
    {year: 2, p10: 0.8410425034407446, p25: 0.9410187081358643, p50: 1.0693170381433297, p75: 1.20123210148986, p90: 1.3424855777676286},
    {year: 3, p10: 0.8195442860171532, p25: 0.9457687684740673, p50: 1.0999301507731105, p75: 1.2777679743857948, p90: 1.4715186905953683},
    {year: 4, p10: 0.814967757778807, p25: 0.9513084197218162, p50: 1.1334414106956667, p75: 1.3494653814091004, p90: 1.5810852327047002},
    {year: 5, p10: 0.8060791875656078, p25: 0.9647129073230811, p50: 1.1713430411760086, p75: 1.4246615974324408, p90: 1.6994885354242328},
    {year: 6, p10: 0.8047340368678524, p25: 0.9734964903098464, p50: 1.2118840266418678, p75: 1.4991037087994825, p90: 1.8136422556217988},
    {year: 7, p10: 0.8025161156533144, p25: 0.9949710494840444, p50: 1.2538280287192372, p75: 1.5702901723457519, p90: 1.9202961616393341},
    {year: 8, p10: 0.8052841238675462, p25: 1.0018682920169737, p50: 1.3006627168864515, p75: 1.6425052553561645, p90: 2.040180186763309},
    {year: 9, p10: 0.8122370987260163, p25: 1.0320449286564848, p50: 1.345531312244712, p75: 1.7243544746576802, p90: 2.1689067009174594},
    {year: 10, p10: 0.8097014932326788, p25: 1.0491332304621612, p50: 1.3774345828274561, p75: 1.8108759701758466, p90: 2.2886333538944035},
    {year: 11, p10: 0.8064943356426281, p25: 1.064214030650933, p50: 1.4168017141637637, p75: 1.8885797225390315, p90: 2.420392580473411},
    {year: 12, p10: 0.8055441543743711, p25: 1.077837367854719, p50: 1.4624821400700063, p75: 1.965628845649902, p90: 2.5733966436252005},
    {year: 13, p10: 0.8192220529036965, p25: 1.0934169664307194, p50: 1.5025653933143452, p75: 2.04962565140284, p90: 2.7122055926088513},
    {year: 14, p10: 0.8230945603111806, p25: 1.1183404499801928, p50: 1.5601087184270752, p75: 2.1485891355924, p90: 2.8591645218944404},
    {year: 15, p10: 0.8463891555394286, p25: 1.138301588841584, p50: 1.597151373797376, p75: 2.2317807824879328, p90: 2.963489682514369},
    {year: 16, p10: 0.8577514583898387, p25: 1.1746813343246902, p50: 1.6446836435868906, p75: 2.318670713080114, p90: 3.136293129355049},
    {year: 17, p10: 0.8637633695156498, p25: 1.1986111104566346, p50: 1.7074399506710984, p75: 2.4114876789341415, p90: 3.3219840703436736},
    {year: 18, p10: 0.8691209815904312, p25: 1.2254118667008633, p50: 1.7652417767468598, p75: 2.5344500641840764, p90: 3.515730307912887},
    {year: 19, p10: 0.8778822726935097, p25: 1.255725729722316, p50: 1.81578682324971, p75: 2.664093033136001, p90: 3.6974817525439065},
    {year: 20, p10: 0.8979365535826899, p25: 1.2741454218892243, p50: 1.8659735262593773, p75: 2.742963825755356, p90: 3.8749071125474552}
];

let projectionChart = null;
let equityChart = null;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('projectorForm');
    const resultsSection = document.getElementById('results');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        projectPropertyValue();
    });

    function projectPropertyValue() {
        const propertyValue = parseFloat(document.getElementById('propertyValue').value);
        const deposit = parseFloat(document.getElementById('deposit').value);

        // Get 5-year projections
        const year5 = PROJECTION_DATA[4]; // Year 5 data

        // Calculate projected values for each percentile
        const projections = {
            p10: { multiplier: year5.p10, value: propertyValue * year5.p10, label: '10th Percentile (Pessimistic)' },
            p25: { multiplier: year5.p25, value: propertyValue * year5.p25, label: '25th Percentile (Below Average)' },
            p50: { multiplier: year5.p50, value: propertyValue * year5.p50, label: '50th Percentile (Median)' },
            p75: { multiplier: year5.p75, value: propertyValue * year5.p75, label: '75th Percentile (Above Average)' },
            p90: { multiplier: year5.p90, value: propertyValue * year5.p90, label: '90th Percentile (Optimistic)' }
        };

        // Display results
        displayResults(propertyValue, deposit, projections);
        createChart(propertyValue);
        createEquityChart(propertyValue, deposit);
    }

    function displayResults(initialValue, deposit, projections) {
        const tableBody = document.getElementById('projectionTable');
        tableBody.innerHTML = '';

        // Create table rows for each percentile
        const percentiles = ['p10', 'p25', 'p50', 'p75', 'p90'];
        percentiles.forEach(p => {
            const proj = projections[p];
            const gain = proj.value - initialValue;
            const gainPercent = ((gain / initialValue) * 100).toFixed(1);

            const row = document.createElement('tr');
            if (p === 'p50') {
                row.className = 'highlight-row';
            }
            
            row.innerHTML = `
                <td><strong>${proj.label}</strong></td>
                <td>${proj.multiplier.toFixed(2)}x</td>
                <td><strong>£${proj.value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></td>
                <td style="color: ${gain >= 0 ? 'var(--success-color)' : 'var(--danger-color)'}">
                    ${gain >= 0 ? '+' : ''}£${gain.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} 
                    (${gain >= 0 ? '+' : ''}${gainPercent}%)
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Display equity projections
        displayEquityResults(initialValue, deposit, projections);

        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function displayEquityResults(initialValue, deposit, projections) {
        const equityTableBody = document.getElementById('equityTable');
        equityTableBody.innerHTML = '';

        const mortgageBalance = initialValue - deposit;

        // Create equity table rows for each percentile
        const percentiles = ['p10', 'p25', 'p50', 'p75', 'p90'];
        percentiles.forEach(p => {
            const proj = projections[p];
            const futureEquity = proj.value - mortgageBalance;
            const equityChange = futureEquity - deposit;
            const equityChangePercent = deposit > 0 ? ((equityChange / deposit) * 100).toFixed(1) : 0;

            const row = document.createElement('tr');
            if (p === 'p50') {
                row.className = 'highlight-row';
            }
            
            row.innerHTML = `
                <td><strong>${proj.label}</strong></td>
                <td>£${proj.value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                <td>£${mortgageBalance.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                <td><strong style="color: ${futureEquity >= 0 ? 'var(--success-color)' : 'var(--danger-color)'}">
                    £${futureEquity.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </strong></td>
                <td style="color: ${equityChange >= 0 ? 'var(--success-color)' : 'var(--danger-color)'}">
                    ${equityChange >= 0 ? '+' : ''}£${equityChange.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    ${deposit > 0 ? ` (${equityChange >= 0 ? '+' : ''}${equityChangePercent}%)` : ''}
                </td>
            `;
            equityTableBody.appendChild(row);
        });
    }

    function createChart(initialValue) {
        const ctx = document.getElementById('projectionChart');

        // Destroy existing chart if it exists
        if (projectionChart) {
            projectionChart.destroy();
        }

        // Prepare data for chart (5 years only)
        const fiveYearData = PROJECTION_DATA.slice(0, 5);
        const years = [0, ...fiveYearData.map(d => d.year)];
        const p10Data = [initialValue, ...fiveYearData.map(d => initialValue * d.p10)];
        const p25Data = [initialValue, ...fiveYearData.map(d => initialValue * d.p25)];
        const p50Data = [initialValue, ...fiveYearData.map(d => initialValue * d.p50)];
        const p75Data = [initialValue, ...fiveYearData.map(d => initialValue * d.p75)];
        const p90Data = [initialValue, ...fiveYearData.map(d => initialValue * d.p90)];

        // Create funnel chart (area chart with multiple lines)
        projectionChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: '90th Percentile (Optimistic)',
                        data: p90Data,
                        borderColor: '#0052a3',
                        backgroundColor: 'rgba(0, 82, 163, 0.1)',
                        borderWidth: 2,
                        fill: '+1',
                        tension: 0.4
                    },
                    {
                        label: '75th Percentile',
                        data: p75Data,
                        borderColor: '#0066cc',
                        backgroundColor: 'rgba(0, 102, 204, 0.15)',
                        borderWidth: 2,
                        fill: '+1',
                        tension: 0.4
                    },
                    {
                        label: '50th Percentile (Median)',
                        data: p50Data,
                        borderColor: '#3385d6',
                        backgroundColor: 'rgba(51, 133, 214, 0.2)',
                        borderWidth: 3,
                        fill: '+1',
                        tension: 0.4
                    },
                    {
                        label: '25th Percentile',
                        data: p25Data,
                        borderColor: '#6ba3e0',
                        backgroundColor: 'rgba(107, 163, 224, 0.15)',
                        borderWidth: 2,
                        fill: '+1',
                        tension: 0.4
                    },
                    {
                        label: '10th Percentile (Pessimistic)',
                        data: p10Data,
                        borderColor: '#a3c9eb',
                        backgroundColor: 'rgba(163, 201, 235, 0.1)',
                        borderWidth: 2,
                        fill: 'origin',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    title: {
                        display: true,
                        text: '5-Year Property Value Projection Range',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '£' + context.parsed.y.toLocaleString('en-GB', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years from Now'
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Property Value (£)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '£' + value.toLocaleString('en-GB', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    function createEquityChart(initialValue, deposit) {
        const ctx = document.getElementById('equityChart');

        // Destroy existing chart if it exists
        if (equityChart) {
            equityChart.destroy();
        }

        const mortgageBalance = initialValue - deposit;

        // Prepare equity data for chart (5 years only)
        const fiveYearData = PROJECTION_DATA.slice(0, 5);
        const years = [0, ...fiveYearData.map(d => d.year)];
        const p10Equity = [deposit, ...fiveYearData.map(d => (initialValue * d.p10) - mortgageBalance)];
        const p25Equity = [deposit, ...fiveYearData.map(d => (initialValue * d.p25) - mortgageBalance)];
        const p50Equity = [deposit, ...fiveYearData.map(d => (initialValue * d.p50) - mortgageBalance)];
        const p75Equity = [deposit, ...fiveYearData.map(d => (initialValue * d.p75) - mortgageBalance)];
        const p90Equity = [deposit, ...fiveYearData.map(d => (initialValue * d.p90) - mortgageBalance)];

        // Create funnel chart for equity
        equityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: '90th Percentile (Optimistic)',
                        data: p90Equity,
                        borderColor: '#1a6b5c',
                        backgroundColor: 'rgba(26, 107, 92, 0.1)',
                        borderWidth: 2,
                        fill: '+1',
                        tension: 0.4
                    },
                    {
                        label: '75th Percentile',
                        data: p75Equity,
                        borderColor: '#2a8b7c',
                        backgroundColor: 'rgba(42, 139, 124, 0.15)',
                        borderWidth: 2,
                        fill: '+1',
                        tension: 0.4
                    },
                    {
                        label: '50th Percentile (Median)',
                        data: p50Equity,
                        borderColor: '#3aab9c',
                        backgroundColor: 'rgba(58, 171, 156, 0.2)',
                        borderWidth: 3,
                        fill: '+1',
                        tension: 0.4
                    },
                    {
                        label: '25th Percentile',
                        data: p25Equity,
                        borderColor: '#6bcbbc',
                        backgroundColor: 'rgba(107, 203, 188, 0.15)',
                        borderWidth: 2,
                        fill: '+1',
                        tension: 0.4
                    },
                    {
                        label: '10th Percentile (Pessimistic)',
                        data: p10Equity,
                        borderColor: '#9cebdc',
                        backgroundColor: 'rgba(156, 235, 220, 0.1)',
                        borderWidth: 2,
                        fill: 'origin',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    title: {
                        display: true,
                        text: '5-Year Equity Projection Range',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '£' + context.parsed.y.toLocaleString('en-GB', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years from Now'
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Equity Value (£)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '£' + value.toLocaleString('en-GB', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }
});

