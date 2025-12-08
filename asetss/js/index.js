
const btn = document.getElementById("btn");

const buy = () => {
  const InputCustomerName = document.getElementById("Customer-name").value.trim();
  const inputCustomerDrink = document.getElementById("Customer-drink").value;
  const inputCustomerAddOns = document.getElementById("Customer-Add-ons").value.trim();
  const ordersTr = document.getElementById("ordersTr");

  let CustomerName = InputCustomerName || undefined;

  if (!inputCustomerDrink) return alert("Error: Drink type is required.");

  let AddOns = inputCustomerAddOns ? inputCustomerAddOns.split(",") : [];

  const orderCoffee = (CustomerName = "Anonymous customer", inputCustomerDrink, ...AddOns) => {
    const newOrder = document.createElement("tr");
    newOrder.innerHTML = `<td>${CustomerName}</td>
        <td>${inputCustomerDrink}</td>
        <td>${AddOns.length > 0 ? AddOns.join(" - ") : "No extras selected."}</td>`;
    ordersTr.appendChild(newOrder);

  };

  orderCoffee(CustomerName, inputCustomerDrink, ...AddOns);

  document.querySelector(".order-box").reset();



  let play = confirm("If you guess the number correctly, your order will be free!");

  if (play) {
    const magicNumber = Math.floor(Math.random() * 10) + 1;
    let guessedCorrect = false;
    for (let i = 1; i <= 3; i++) {

      let Guess = Number(prompt("Guess a number between 1 and 10"));

      if (Guess < 0 || Guess > 10 || isNaN(Guess)) {
        alert("please enter a number between 1 and 10");
        continue;
      }

      if (Guess === magicNumber) {
        alert(`Congratulations! You guessed ${magicNumber}. Your order is FREE! 🎉`);
        guessedCorrect = true;
        break;
      } else {
        let hint = Guess < magicNumber ? "too low" : "too high";
        alert(`Try again! It's ${hint}.`);
      }
    }
    if (!guessedCorrect) {
      alert(`Game over! The magic number was ${magicNumber}. 😔`);
    }

  }

};


btn.onclick = buy;

const tdClean = document.getElementById("clean");

const clean = () => ordersTr.innerHTML = "";

tdClean.onclick = clean;
