const form = document.querySelector('#loan-form');

form.addEventListener('submit', calculateResults);

const output = document.querySelector('#output');
output.style.display = 'none'

function calculateResults(e) {
    const cardBody = document.querySelector('.card-body')
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const loader = document.querySelector('#loader');

    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

       loader.style.display = 'inline-block';
        setTimeout(() => {
            loader.style.display = 'none';
            output.style.display = 'block';
        },1000)
        
    } else {
        const alert = document.createElement("div");
        alert.className = 'alert-danger'
        alert.textContent = 'Пожалуйста, заполните все поля';
        cardBody.prepend(alert)

        document.querySelector('.btn').addEventListener('click', ()=>{
            alert.remove()
        })
    }

    e.preventDefault();
}
 