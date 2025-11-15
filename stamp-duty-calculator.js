// Stamp Duty Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('stampDutyForm');
    const resultsSection = document.getElementById('results');
    const locationSelect = document.getElementById('location');
    const firstTimeBuyerRadios = document.getElementsByName('firstTimeBuyer');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateStampDuty();
    });

    // Update first-time buyer visibility based on location
    locationSelect.addEventListener('change', updateFirstTimeBuyerInfo);

    function updateFirstTimeBuyerInfo() {
        const location = locationSelect.value;
        const ftbGroup = document.querySelector('[for="firstTimeBuyer"]').closest('.input-group');
        const small = ftbGroup.querySelector('small');
        
        if (location === 'scotland') {
            small.textContent = 'First-time buyer relief increases the nil rate band to £175,000 (saving up to £600)';
        } else {
            small.textContent = 'First-time buyer relief is available if the property is under £500,000 (UK) or £175,000 (Scotland)';
        }
    }

    function calculateStampDuty() {
        const propertyPrice = parseFloat(document.getElementById('propertyPrice').value);
        const location = document.getElementById('location').value;
        const isAdditional = document.querySelector('input[name="additionalProperty"]:checked').value === 'yes';
        const isFirstTimeBuyer = document.querySelector('input[name="firstTimeBuyer"]:checked').value === 'yes';

        let stampDuty = 0;
        let bands = [];
        let taxLabel = '';
        let reliefMessage = '';

        if (location === 'uk') {
            // England, Wales, Northern Ireland - SDLT
            taxLabel = 'Stamp Duty (SDLT)';
            
            if (isFirstTimeBuyer && !isAdditional && propertyPrice <= 500000) {
                // First-time buyer relief
                bands = calculateUKFirstTimeBuyer(propertyPrice);
                reliefMessage = 'First-time buyer relief applied: No SDLT up to £300,000, then 5% up to £500,000.';
            } else if (isAdditional) {
                // Additional property - 5% surcharge
                bands = calculateUKAdditional(propertyPrice);
                reliefMessage = 'Additional property surcharge: Extra 5% on all bands.';
            } else {
                // Standard rates
                bands = calculateUKStandard(propertyPrice);
            }
        } else {
            // Scotland - LBTT
            taxLabel = 'Land and Buildings Transaction Tax (LBTT)';
            
            if (isFirstTimeBuyer && !isAdditional) {
                // First-time buyer relief (increased nil rate band to £175,000)
                bands = calculateScotlandFirstTimeBuyer(propertyPrice);
                reliefMessage = 'First-time buyer relief applied: Nil rate band increased to £175,000 (saving up to £600).';
            } else if (isAdditional) {
                // Additional Dwelling Supplement - 6% surcharge
                bands = calculateScotlandAdditional(propertyPrice);
                reliefMessage = 'Additional Dwelling Supplement (ADS): Extra 6% on all bands.';
            } else {
                // Standard rates
                bands = calculateScotlandStandard(propertyPrice);
            }
        }

        stampDuty = bands.reduce((sum, band) => sum + band.tax, 0);

        // Display results
        displayResults(propertyPrice, stampDuty, bands, taxLabel, reliefMessage);
    }

    function calculateUKStandard(price) {
        const bands = [
            { threshold: 125000, rate: 0, label: 'Up to £125,000' },
            { threshold: 250000, rate: 0.02, label: '£125,001 to £250,000' },
            { threshold: 925000, rate: 0.05, label: '£250,001 to £925,000' },
            { threshold: 1500000, rate: 0.10, label: '£925,001 to £1,500,000' },
            { threshold: Infinity, rate: 0.12, label: 'Above £1,500,000' }
        ];
        return calculateBands(price, bands);
    }

    function calculateUKFirstTimeBuyer(price) {
        const bands = [
            { threshold: 300000, rate: 0, label: 'Up to £300,000' },
            { threshold: 500000, rate: 0.05, label: '£300,001 to £500,000' },
            { threshold: Infinity, rate: 0, label: 'Above £500,000' }
        ];
        return calculateBands(price, bands);
    }

    function calculateUKAdditional(price) {
        const bands = [
            { threshold: 125000, rate: 0.05, label: 'Up to £125,000' },
            { threshold: 250000, rate: 0.07, label: '£125,001 to £250,000' },
            { threshold: 925000, rate: 0.10, label: '£250,001 to £925,000' },
            { threshold: 1500000, rate: 0.15, label: '£925,001 to £1,500,000' },
            { threshold: Infinity, rate: 0.17, label: 'Above £1,500,000' }
        ];
        return calculateBands(price, bands);
    }

    function calculateScotlandStandard(price) {
        const bands = [
            { threshold: 145000, rate: 0, label: 'Up to £145,000' },
            { threshold: 250000, rate: 0.02, label: '£145,001 to £250,000' },
            { threshold: 325000, rate: 0.05, label: '£250,001 to £325,000' },
            { threshold: 750000, rate: 0.10, label: '£325,001 to £750,000' },
            { threshold: Infinity, rate: 0.12, label: 'Above £750,000' }
        ];
        return calculateBands(price, bands);
    }

    function calculateScotlandFirstTimeBuyer(price) {
        const bands = [
            { threshold: 175000, rate: 0, label: 'Up to £175,000' },
            { threshold: 250000, rate: 0.02, label: '£175,001 to £250,000' },
            { threshold: 325000, rate: 0.05, label: '£250,001 to £325,000' },
            { threshold: 750000, rate: 0.10, label: '£325,001 to £750,000' },
            { threshold: Infinity, rate: 0.12, label: 'Above £750,000' }
        ];
        return calculateBands(price, bands);
    }

    function calculateScotlandAdditional(price) {
        const bands = [
            { threshold: 145000, rate: 0.06, label: 'Up to £145,000' },
            { threshold: 250000, rate: 0.08, label: '£145,001 to £250,000' },
            { threshold: 325000, rate: 0.11, label: '£250,001 to £325,000' },
            { threshold: 750000, rate: 0.16, label: '£325,001 to £750,000' },
            { threshold: Infinity, rate: 0.18, label: 'Above £750,000' }
        ];
        return calculateBands(price, bands);
    }

    function calculateBands(price, bands) {
        let remaining = price;
        let previousThreshold = 0;
        const results = [];

        for (const band of bands) {
            if (remaining <= 0) break;

            const bandWidth = Math.min(remaining, band.threshold - previousThreshold);
            const tax = bandWidth * band.rate;

            if (bandWidth > 0) {
                results.push({
                    label: band.label,
                    amount: bandWidth,
                    rate: band.rate * 100,
                    tax: tax
                });
            }

            remaining -= bandWidth;
            previousThreshold = band.threshold;

            if (band.threshold === Infinity) break;
        }

        return results;
    }

    function displayResults(price, stampDuty, bands, taxLabel, reliefMessage) {
        // Update tax label
        document.getElementById('taxLabel').textContent = taxLabel;

        // Display total
        document.getElementById('totalStampDuty').textContent = '£' + stampDuty.toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        document.getElementById('displayPrice').textContent = '£' + price.toLocaleString('en-GB');
        document.getElementById('displayTotal').textContent = '£' + stampDuty.toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const effectiveRate = (stampDuty / price * 100).toFixed(2);
        document.getElementById('effectiveRate').textContent = effectiveRate + '%';

        // Display band breakdown
        const bandBreakdown = document.getElementById('bandBreakdown');
        bandBreakdown.innerHTML = '';

        bands.forEach(band => {
            const item = document.createElement('div');
            item.className = 'breakdown-item';
            item.innerHTML = `
                <span>${band.label} @ ${band.rate}%</span>
                <span>£${band.tax.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            `;
            bandBreakdown.appendChild(item);
        });

        // Show relief message if applicable
        const reliefInfo = document.getElementById('reliefInfo');
        if (reliefMessage) {
            document.getElementById('reliefText').textContent = reliefMessage;
            reliefInfo.style.display = 'block';
        } else {
            reliefInfo.style.display = 'none';
        }

        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

