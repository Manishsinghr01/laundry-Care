const cart = {};

function updateTable() {
  const tbody = document.getElementById("addedBody");
  tbody.innerHTML = "";

  const names = Object.keys(cart);
  let total = 0;

  if (names.length === 0) {
    // "No items added" message
    const tr = document.createElement("tr");
    tr.id = "noItemsRow";
    tr.innerHTML = `
      <td colspan="3" style="font-size:13px; color:#777; text-align:center;">
        No items added
      </td>
    `;
    tbody.appendChild(tr);
  } else {
    names.forEach((name, index) => {
      const price = cart[name];
      total += price;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${name}</td>
        <td>₹${price.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  document.getElementById("totalAmount").textContent = total.toFixed(2);
}

function addService(name, price, addBtnId, removeBtnId) {
  if (!cart[name]) {
    cart[name] = price;
  }
  // toggle buttons: add hide, remove show
  document.getElementById(addBtnId).style.display = "none";
  document.getElementById(removeBtnId).style.display = "inline-block";

  updateTable();
}

function removeService(name, addBtnId, removeBtnId) {
  if (cart[name]) {
    delete cart[name];
  }
  // toggle buttons: remove hide, add show
  document.getElementById(removeBtnId).style.display = "none";
  document.getElementById(addBtnId).style.display = "inline-block";

  updateTable();
}

function scrollToBooking() {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}

// EmailJS booking
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const total = document.getElementById("totalAmount").textContent;
  const services = Object.keys(cart)
    .map((name) => `${name} - ₹${cart[name].toFixed(2)}`)
    .join(", ");

  const templateParams = {
    customer_name: fullName,
    customer_email: email,
    customer_phone: phone,
    selected_services: services || "No services selected",
    total_amount: total,
  };

  // apne EmailJS SERVICE_ID & TEMPLATE_ID yaha daalo
  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then(
      function () {
        document.getElementById("bookingMessage").style.display = "block";
      },
      function () {
        alert("Error sending email. Please try again.");
      }
    );
});

// Newsletter subscription (front-end only)
function handleSubscribe(event) {
  event.preventDefault();
  const name = document.getElementById("subName").value;
  const email = document.getElementById("subEmail").value;
  alert("Thank you " + name + " for subscribing with " + email + "!");
  event.target.reset();
}

// page load pe table ko initialise karo
window.addEventListener("load", updateTable);
