// EMI Calculator

document.getElementById('calculator-form').addEventListener('submit', function (e) {

    e.preventDefault();

    const P = parseFloat(document.getElementById('amount').value);

    const r = parseFloat(document.getElementById('rate').value) / 12 / 100;

    const n = parseInt(document.getElementById('months').value);



    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPayment = emi * n;

    const totalInterest = totalPayment - P;



    document.getElementById('emi-value').textContent = emi.toFixed(2);

    document.getElementById('total-payment').textContent = totalPayment.toFixed(2);

    document.getElementById('total-interest').textContent = totalInterest.toFixed(2);



    updateEMIPieChart(P, totalInterest);

});



// Counter Animation

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

    const updateCount = () => {

        const target = +counter.getAttribute('data-target');

        const count = +counter.innerText;

        const increment = target / 100;



        if (count < target) {

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCount, 30);

        } else {

            counter.innerText = target;

        }

    };

    updateCount();

});



// Progress Bars

const progressBars = document.querySelectorAll('.progress-bar');



function animateProgressBars() {

    progressBars.forEach(bar => {

        const value = parseInt(bar.getAttribute('data-value'));

        const fill = bar.querySelector('span');

        let width = 0;

        const interval = setInterval(() => {

            if (width >= value) {

                clearInterval(interval);

            } else {

                width++;

                fill.style.width = width + '%';

            }

        }, 20);

    });

}



// Animate progress bars on scroll into view

function isElementInViewport(el) {

    const rect = el.getBoundingClientRect();

    return (

        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&

        rect.bottom >= 0

    );

}



function checkScroll() {

    progressBars.forEach(bar => {

        if (isElementInViewport(bar) && !bar.classList.contains('animated')) {

            bar.classList.add('animated');

            animateProgressBars();

        }

    });

}



window.addEventListener('scroll', checkScroll);

window.addEventListener('load', checkScroll);



// Pie Chart: Loan Type Distribution

const loanPieChart = new Chart(document.getElementById("loanPieChart"), {

    type: 'pie',

    data: {

        labels: ["Personal", "Home", "Business"],

        datasets: [{

            label: "Loan Distribution",

            data: [40, 35, 25],

            backgroundColor: ["#0074D9", "#2ECC40", "#FF4136"]

        }]

    },

    options: {

        responsive: false,

        plugins: {

            legend: {

                position: 'bottom'

            }

        }

    }

});



// Pie Chart: EMI Breakdown

let emiPieChart;



function updateEMIPieChart(principal, interest) {

    const ctx = document.getElementById("emiPieChart").getContext("2d");



    const data = {

        labels: ["Principal", "Interest"],

        datasets: [{

            data: [principal, interest],

            backgroundColor: ["#0074D9", "#FF4136"]

        }]

    };



    const config = {

        type: 'pie',

        data: data,

        options: {

            responsive: false,

            plugins: {

                legend: {

                    position: 'bottom'

                }

            }

        }

    };



    if (emiPieChart) {

        emiPieChart.destroy();

    }



    emiPieChart = new Chart(ctx, config);

}