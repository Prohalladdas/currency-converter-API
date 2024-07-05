let base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurrency = document.querySelector(".form select");
let toCurrency = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currencyCode in countryList) {
        // console.log(code, countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        if (select.name === "form" && currencyCode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected"
        };
        select.append(newOption);
    };
    // Call update flag
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
};

let updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    // matlab less than 1 or negative number agar enter kiya toh empty ho jayega
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1"
    };
    // console.log(fromCurrency.value,toCurrency.value);
    let URL = `${base_url}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[toCurrency.value.toLowerCase()]
    // console.log(rate);

    let finalAmount = amountValue * rate;
    msg.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`
}



let updateFlag = (element) => {
    // console.log(element);
    let currencyCode = element.value;
    let cuntryCode = countryList[currencyCode]; //IN,US...
    let newSrc = `https://flagsapi.com/${cuntryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// 
btn.addEventListener("click", (evt) => {
    // button click per kuch bhi autometic nehi hoga jo kuch ham karenge wahi change hoga(jaise link pe kuch extra add likha nehi hoga )
    evt.preventDefault();
    updateExchangeRate();
})

window.activeElement("load", () => {
    updateExchangeRate();
})