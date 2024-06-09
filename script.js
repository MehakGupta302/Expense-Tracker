const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const form = document.getElementById("form");

// Local Storage Structure
// const tmpTransactions = [
//   { id: 1, text: "car", amount: 2000 },
//   { id: 2, text: "Salary", amount: 20000 },
//   { id: 3, text: "Phone", amount: -10000 },
//   { id: 4, text: "flower", amount: -40 },
//   { id: 5, text: "go home", amount: 4000 }

// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add tracsations to dom
function addToDom(transactions) {
  // Take the sign
  const sign = transactions.amount < 0 ? "-" : "+";

  // Create LI
  const item = document.createElement("li");

  // Add class
  item.classList.add(transactions.amount < 0 ? "minus" : "plus");

  // inner html of item
  item.innerHTML = `
    ${transactions.text} <span>${sign}${Math.abs(transactions.amount)}</span>
    <button class="delete-btn" onclick=removeItem(${transactions.id})>X</button>
    `;

  // Add to list
  list.appendChild(item);
}

// Update balance, Income and expense
function updateValus() {
  const amount = transactions.map((value) => value.amount);
  const total = amount.reduce((tmp, value) => (tmp += value), 0).toFixed(2);
  const income = amount.filter((value) => value > 0).reduce((tmp , value ) => tmp += value , 0);
  const expense = amount.filter((value) => value < 0).reduce((tmp , value)=> tmp += value , 0) * -1;

  balance.innerHTML = `$${total}`;
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML =`$${expense}`;

}


// Adding the transactions
function addTransaction(e){
    e.preventDefault();
    
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("Pleas Enter something to Text and Amount Inputs");
    } else {
      const transaction = {
        id : getRandomId(),
        text : text.value.trim(),
        amount : +amount.value.trim()
      }



      // Push the data
      transactions.push(transaction);

      // Add to dom
      addToDom(transaction);


      // update
      updateValus();

      // Add to local Storage
      updateLocalStorage();

      text.value = "";
      amount.value = "";
      
    }
}

// The get Raondom Id Function
function getRandomId(){
  return Math.floor(Math.random() * 100000000);
}

// Remove Item
function removeItem(id){
  transactions = transactions.filter(value => value.id !== id);
  init();
  updateLocalStorage();
}

// Update Local Storage
function updateLocalStorage(){
  localStorage.setItem('transactions' , JSON.stringify(transactions));
}

function init() {
  list.innerHTML = " ";
  transactions.forEach(addToDom);
  updateValus();
}

init();


// Events 
form.addEventListener('submit' , addTransaction);