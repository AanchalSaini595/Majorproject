
// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get reference to elements
    const currencyOne = document.getElementById("currency-one");
    const currencyTwo = document.getElementById("currency-two");
    const amountOne = document.getElementById("amount-one");
    const amountTwo = document.getElementById("amount-two");
    const swapButton = document.getElementById("swap");
    const rateDisplay = document.getElementById("rate");
    const fade=document.getElementsByTagName(".para");
    // Fetch exchange rates
    setTimeout(() => {
       fade.show()
    }, 2000);
    function calculate() {
        const currencyOneValue = currencyOne.value;
        const currencyTwoValue = currencyTwo.value;
        console.log(currencyOneValue);

        fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[currencyTwoValue];
                amountTwo.value = (amountOne.value * rate).toFixed(2); // Convert and round to 2 decimal places
            })
            .catch(error => {
                console.log("Error fetching exchange rates:", error);
            });
    }

    // Event listeners
    currencyOne.addEventListener("change", calculate);
    currencyTwo.addEventListener("change", calculate);
    amountOne.addEventListener("input", calculate);
    amountTwo.addEventListener("input", calculate);
    swapButton.addEventListener("click", function() {
        // Swap currencies
        const temp = currencyOne.value;
        currencyOne.value = currencyTwo.value;
        currencyTwo.value = temp;
        calculate();
    });
    // Initial calculation
    calculate();
});
