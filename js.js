const products = document.querySelectorAll(".item");
const addedList = document.querySelector(".added-cart");
const totalItems = document.getElementById("item-count");
const totalPriceElement = document.querySelector(".total-price");

let totalItemsCount = 0;
let totalPrice = 0;
let cart = [];

products.forEach((item) => {
  const addToCartButton = item.querySelector(".add-to-cart");
  const addItem = item.querySelector(".increase");
  const minusItem = item.querySelector(".decrease");
  const quantityElement = item.querySelector(".Quantity");

  addToCartButton.addEventListener("click", () => {
    addToCartButton.style.opacity = 0;
    const emptyItems = document.querySelectorAll(".empty");
    const nonEmptyItems = document.querySelectorAll(".non-empty");

    emptyItems.forEach((emptyItem) => {
      emptyItem.style.display = "none";
    });

    nonEmptyItems.forEach((nonEmptyItem) => {
      nonEmptyItem.style.opacity = 1;
    });

    const wrapper = item.querySelector(".increase-decrease-wrapper");
    wrapper.style.opacity = 1;
    wrapper.style.zIndex = 1;
    const itemName = item.getAttribute("data-name");
    const itemPrice = parseFloat(item.getAttribute("data-price"));

    addToCart(itemName, itemPrice, quantityElement);

    addItem.addEventListener("click", () => {
      addItemQuantity(itemName, itemPrice, quantityElement);
    });

    minusItem.addEventListener("click", () => {
      minusItemQuantity(itemName, quantityElement, addToCartButton, wrapper);
    });
  });
});

function addItemQuantity(itemName, itemPrice, quantityElement) {
  const item = cart.find((i) => i.name === itemName);

  if (item) {
    item.quantity++;
    quantityElement.innerHTML = `${item.quantity}`;
  }
  updateCart();
}

function minusItemQuantity(
  itemName,
  quantityElement,
  addToCartButton,
  wrapper
) {
  const item = cart.find((i) => i.name === itemName);

  if (item && item.quantity > 1) {
    item.quantity--;
    quantityElement.innerHTML = `${item.quantity}`;
  } else if (item && item.quantity === 1) {
    cart = cart.filter((i) => i.name !== itemName);
    addToCartButton.style.opacity = 1;
    wrapper.style.opacity = 0;
    wrapper.style.zIndex = 0;
  }
  updateCart();
}

function addToCart(name, price, quantityElement) {
  const item = cart.find((i) => i.name === name);

  if (item) {
    item.quantity++;
    quantityElement.innerHTML = `${item.quantity}`;
  } else {
    cart.push({ name, price, quantity: 1 });
    quantityElement.innerHTML = 1;
  }

  updateCart();
}

function updateCart() {
  addedList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const totalItem = item.price * item.quantity;
    total += totalItem;

    const cartItem = document.createElement("li");
    cartItem.className = "cart-item";
    cartItem.setAttribute("data-item", item.name);
    cartItem.innerHTML = `
      ${
        item.name
      } <br/><span class="item-count"style="color:orange; font-weight:500">${
      item.quantity
    }x</span> 
      <span class="each-total">$${totalItem.toFixed(2)}</span>
      <button class="remove-item" onclick="removeFromCart('${item.name}')" 
        style="color:#000; background-color:#fff; position: absolute; top:30%; right:20px;">
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    `;
    cartItem.style.listStyle = "none";
    cartItem.style.borderBottom = "1px solid #0101";
    cartItem.style.position = "relative";
    cartItem.style.padding = "6px";

    addedList.appendChild(cartItem);
  });

  totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  totalPrice = total;

  totalItems.innerText = totalItemsCount;
  totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);

  const productElement = Array.from(document.querySelectorAll(".item")).find(
    (item) => {
      return item.getAttribute("data-name") === name;
    }
  );

  if (productElement) {
    const addToCartButton = productElement.querySelector(".add-to-cart");
    const wrapper = productElement.querySelector(".increase-decrease-wrapper");

    addToCartButton.style.opacity = 1;
    wrapper.style.opacity = 0;
    wrapper.style.zIndex = 0;
  }
  if (cart.length === 0) {
    const emptyItems = document.querySelectorAll(".empty");
    const nonEmptyItems = document.querySelectorAll(".non-empty");

    emptyItems.forEach((emptyItem) => {
      emptyItem.style.opacity = 1;
    });

    nonEmptyItems.forEach((nonEmptyItem) => {
      nonEmptyItem.style.opacity = 0;
    });
  }

  updateCart();
}

document.getElementById("reset-order").addEventListener("click", () => {
  cart = [];
  updateCart();
});

document.getElementById("confirm-order").addEventListener("click", () => {
  document.querySelector(".confirmation").style.display = "block";

  const afterContainer = document.querySelector(".after");
  afterContainer.innerHTML = "";

  let totalItemS = 0;
  cart.forEach((item) => {
    const totalItem = item.price * item.quantity;
    totalItemS += totalItem;

    const confirmationItem = document.createElement("div");
    confirmationItem.style.padding = "5px";
    confirmationItem.innerHTML = `<span style="color:#000">
      ${item.name}</span><br/>
      <span class="item-count" style="color:orange; font-weight:500">${
        item.quantity
      }x</span> 
      <span class="each-total" style="color:#000">$${totalItem.toFixed(
        2
      )}</span>
    `;
    afterContainer.appendChild(confirmationItem);
  });

  let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelector(".total-quantity").innerText = ` $${totalItemS}`;
});

document.querySelector(".confirmation .close").addEventListener("click", () => {
  document.querySelector(".confirmation").style.display = "none";
});

