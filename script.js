/* =========================================================
   CAR DEALERSHIP SIMULATOR
   SCRIPT.JS
   ========================================================= */

"use strict";

/* =========================================================
   GAME DATA
========================================================= */

const STARTING_MONEY = 20000000000;

let money = STARTING_MONEY;
let inventory = [];
let carsForSale = [];
let sales = [];
let customers = [];

let currentCustomer = null;
let currentDeal = null;
let currentPurchaseCar = null;
let currentSaleCar = null;

let auction = {
  active: false,
  car: null,
  startingBid: 0,
  currentBid: 0,
  yourBid: 0,
  timer: 0,
  interval: null
};

let customerCountdown = 15;
let gameMinutes = 9 * 60;

let autoSave = true;
let customerNotifications = true;


/* =========================================================
   50 CARS
   Simulator prices are intentionally increasing.
========================================================= */

const cars = [
  {
    id: 1,
    name: "Suzuki Alto",
    category: "hatchback",
    price: 5000000,
    engine: "660cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "39 HP"
  },
  {
    id: 2,
    name: "Suzuki Wagon R",
    category: "hatchback",
    price: 5500000,
    engine: "1000cc",
    transmission: "Manual",
    fuel: "Petrol",
    seats: 5,
    power: "67 HP"
  },
  {
    id: 3,
    name: "Suzuki Cultus",
    category: "hatchback",
    price: 6000000,
    engine: "1000cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "66 HP"
  },
  {
    id: 4,
    name: "Suzuki Swift",
    category: "hatchback",
    price: 6500000,
    engine: "1200cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "82 HP"
  },
  {
    id: 5,
    name: "Suzuki Ravi",
    category: "pickup",
    price: 7000000,
    engine: "800cc",
    transmission: "Manual",
    fuel: "Petrol",
    seats: 2,
    power: "37 HP"
  },
  {
    id: 6,
    name: "Suzuki Bolan",
    category: "mpv",
    price: 7500000,
    engine: "800cc",
    transmission: "Manual",
    fuel: "Petrol",
    seats: 8,
    power: "37 HP"
  },
  {
    id: 7,
    name: "Suzuki Every",
    category: "mpv",
    price: 8000000,
    engine: "660cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 4,
    power: "64 HP"
  },
  {
    id: 8,
    name: "Toyota Vitz",
    category: "hatchback",
    price: 8500000,
    engine: "1000cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "69 HP"
  },
  {
    id: 9,
    name: "Toyota Passo",
    category: "hatchback",
    price: 9000000,
    engine: "1000cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "68 HP"
  },
  {
    id: 10,
    name: "Toyota Aqua",
    category: "hatchback",
    price: 9500000,
    engine: "1500cc",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    power: "99 HP"
  },
  {
    id: 11,
    name: "Honda Fit",
    category: "hatchback",
    price: 10000000,
    engine: "1300cc",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    power: "98 HP"
  },
  {
    id: 12,
    name: "Kia Picanto",
    category: "hatchback",
    price: 10500000,
    engine: "1000cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "66 HP"
  },
  {
    id: 13,
    name: "Hyundai Grand i10",
    category: "hatchback",
    price: 11000000,
    engine: "1200cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "83 HP"
  },
  {
    id: 14,
    name: "Changan Alsvin",
    category: "sedan",
    price: 11500000,
    engine: "1500cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "105 HP"
  },
  {
    id: 15,
    name: "Toyota Yaris",
    category: "sedan",
    price: 12000000,
    engine: "1300cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "97 HP"
  },
  {
    id: 16,
    name: "Honda City",
    category: "sedan",
    price: 12500000,
    engine: "1500cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "118 HP"
  },
  {
    id: 17,
    name: "Toyota Corolla",
    category: "sedan",
    price: 13000000,
    engine: "1800cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "138 HP"
  },
  {
    id: 18,
    name: "Honda Civic",
    category: "sedan",
    price: 14000000,
    engine: "1500cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "176 HP"
  },
  {
    id: 19,
    name: "Proton Saga",
    category: "sedan",
    price: 14500000,
    engine: "1300cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "90 HP"
  },
  {
    id: 20,
    name: "Hyundai Elantra",
    category: "sedan",
    price: 15000000,
    engine: "2000cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "154 HP"
  },
  {
    id: 21,
    name: "Changan Karvaan",
    category: "mpv",
    price: 15500000,
    engine: "1200cc",
    transmission: "Manual",
    fuel: "Petrol",
    seats: 7,
    power: "98 HP"
  },
  {
    id: 22,
    name: "Honda BR-V",
    category: "suv",
    price: 16000000,
    engine: "1500cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 7,
    power: "118 HP"
  },
  {
    id: 23,
    name: "Kia Stonic",
    category: "suv",
    price: 16500000,
    engine: "1400cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "99 HP"
  },
  {
    id: 24,
    name: "Hyundai Tucson",
    category: "suv",
    price: 17000000,
    engine: "2000cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "155 HP"
  },
  {
    id: 25,
    name: "Kia Sportage",
    category: "suv",
    price: 17500000,
    engine: "2000cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "155 HP"
  },
  {
    id: 26,
    name: "MG ZS",
    category: "suv",
    price: 18000000,
    engine: "1500cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "106 HP"
  },
  {
    id: 27,
    name: "MG ZS EV",
    category: "electric",
    price: 18500000,
    engine: "Electric",
    transmission: "Automatic",
    fuel: "Electric",
    seats: 5,
    power: "148 HP"
  },
  {
    id: 28,
    name: "MG HS",
    category: "suv",
    price: 19000000,
    engine: "1500cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "160 HP"
  },
  {
    id: 29,
    name: "Hyundai Sonata",
    category: "sedan",
    price: 20000000,
    engine: "2000cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "152 HP"
  },
  {
    id: 30,
    name: "Toyota Prius",
    category: "sedan",
    price: 21000000,
    engine: "1800cc",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    power: "121 HP"
  },
  {
    id: 31,
    name: "Toyota Premio",
    category: "sedan",
    price: 22000000,
    engine: "1800cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "132 HP"
  },
  {
    id: 32,
    name: "Toyota Camry",
    category: "sedan",
    price: 23000000,
    engine: "2500cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "203 HP"
  },
  {
    id: 33,
    name: "DFSK Glory 580",
    category: "suv",
    price: 24000000,
    engine: "1500cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 7,
    power: "145 HP"
  },
  {
    id: 34,
    name: "Haval Jolion",
    category: "suv",
    price: 25000000,
    engine: "1500cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "143 HP"
  },
  {
    id: 35,
    name: "Haval H6",
    category: "suv",
    price: 26000000,
    engine: "1500cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "171 HP"
  },
  {
    id: 36,
    name: "Changan Oshan X7",
    category: "suv",
    price: 27000000,
    engine: "1500cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 7,
    power: "185 HP"
  },
  {
    id: 37,
    name: "BAIC BJ40",
    category: "suv",
    price: 28000000,
    engine: "2000cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "218 HP"
  },
  {
    id: 38,
    name: "Proton X70",
    category: "suv",
    price: 29000000,
    engine: "1500cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "150 HP"
  },
  {
    id: 39,
    name: "Kia Sorento",
    category: "suv",
    price: 30000000,
    engine: "2400cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 7,
    power: "172 HP"
  },
  {
    id: 40,
    name: "Hyundai Santa Fe",
    category: "suv",
    price: 31000000,
    engine: "2400cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 7,
    power: "174 HP"
  },
  {
    id: 41,
    name: "Toyota Hilux",
    category: "pickup",
    price: 33000000,
    engine: "2800cc Diesel",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 5,
    power: "201 HP"
  },
  {
    id: 42,
    name: "Isuzu D-Max",
    category: "pickup",
    price: 34000000,
    engine: "3000cc Diesel",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 5,
    power: "175 HP"
  },
  {
    id: 43,
    name: "Toyota Fortuner",
    category: "suv",
    price: 36000000,
    engine: "2800cc Diesel",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 7,
    power: "201 HP"
  },
  {
    id: 44,
    name: "Haval H6 HEV",
    category: "electric",
    price: 38000000,
    engine: "1500cc Hybrid",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    power: "240 HP"
  },
  {
    id: 45,
    name: "Toyota Land Cruiser Prado",
    category: "luxury",
    price: 42000000,
    engine: "2800cc Diesel",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 7,
    power: "201 HP"
  },
  {
    id: 46,
    name: "Kia Carnival",
    category: "mpv",
    price: 46000000,
    engine: "3500cc",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 8,
    power: "268 HP"
  },
  {
    id: 47,
    name: "Toyota Land Cruiser",
    category: "luxury",
    price: 50000000,
    engine: "3500cc Twin Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 7,
    power: "409 HP"
  },
  {
    id: 48,
    name: "Mercedes-Benz E-Class",
    category: "luxury",
    price: 55000000,
    engine: "2000cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "255 HP"
  },
  {
    id: 49,
    name: "BMW 5 Series",
    category: "luxury",
    price: 60000000,
    engine: "2000cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "255 HP"
  },
  {
    id: 50,
    name: "Range Rover Sport",
    category: "luxury",
    price: 70000000,
    engine: "3000cc Turbo",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    power: "355 HP"
  }
];


/* =========================================================
   CUSTOMER NAMES
========================================================= */

const customerNames = [
  "Ali Khan",
  "Ahmed Raza",
  "Usman Malik",
  "Hamza Sheikh",
  "Bilal Ahmed",
  "Hassan Ali",
  "Omar Farooq",
  "Zain Abbas",
  "Saad Hussain",
  "Daniyal Khan",
  "Ayaan Malik",
  "Arham Raza",
  "Fahad Ahmed",
  "Talha Sheikh",
  "Muneeb Khan"
];


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (id) => document.getElementById(id);

const moneyDisplay = $("moneyDisplay");
const inventoryCount = $("inventoryCount");
const gameTimeDisplay = $("gameTime");

const dashboardMoney = $("dashboardMoney");
const dashboardInventory = $("dashboardInventory");
const dashboardForSale = $("dashboardForSale");
const dashboardSales = $("dashboardSales");
const dashboardCustomers = $("dashboardCustomers");
const dashboardCarsSold = $("dashboardCarsSold");
const dashboardProfit = $("dashboardProfit");

const buyCarsGrid = $("buyCarsGrid");
const inventoryGrid = $("inventoryGrid");
const forSaleGrid = $("forSaleGrid");

const inventoryEmpty = $("inventoryEmpty");
const forSaleEmpty = $("forSaleEmpty");

const notification = $("notification");
const notificationTitle = $("notificationTitle");
const notificationMessage = $("notificationMessage");

const carDetailsModal = $("carDetailsModal");
const buyCarModal = $("buyCarModal");
const salePriceModal = $("salePriceModal");


/* =========================================================
   MONEY FORMAT
========================================================= */

function formatMoney(value) {
  return "Rs " + Number(value || 0).toLocaleString("en-PK");
}


/* =========================================================
   SAVE / LOAD
========================================================= */

function saveGame() {
  if (!autoSave) {
    return;
  }

  const data = {
    money,
    inventory,
    carsForSale,
    sales,
    customers,
    autoSave,
    customerNotifications,
    gameMinutes
  };

  localStorage.setItem(
    "carDealershipSimulatorSave",
    JSON.stringify(data)
  );
}


function loadGame() {
  const saved = localStorage.getItem(
    "carDealershipSimulatorSave"
  );

  if (!saved) {
    return;
  }

  try {
    const data = JSON.parse(saved);

    money = Number(data.money ?? STARTING_MONEY);
    inventory = Array.isArray(data.inventory)
      ? data.inventory
      : [];

    carsForSale = Array.isArray(data.carsForSale)
      ? data.carsForSale
      : [];

    sales = Array.isArray(data.sales)
      ? data.sales
      : [];

    customers = Array.isArray(data.customers)
      ? data.customers
      : [];

    autoSave = data.autoSave !== false;

    customerNotifications =
      data.customerNotifications !== false;

    gameMinutes =
      Number(data.gameMinutes ?? 540);

  } catch (error) {
    console.error("Save data could not be loaded:", error);
  }
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

let notificationTimeout;

function showNotification(title, message, icon = "✓") {
  if (!notification) {
    return;
  }

  notificationTitle.textContent = title;
  notificationMessage.textContent = message;

  const iconElement = $("notificationIcon");

  if (iconElement) {
    iconElement.textContent = icon;
  }

  notification.classList.remove("hidden");

  clearTimeout(notificationTimeout);

  notificationTimeout = setTimeout(() => {
    notification.classList.add("hidden");
  }, 4000);
}


/* =========================================================
   NAVIGATION
========================================================= */

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = $(screenId);

  if (!target) {
    console.warn("Screen not found:", screenId);
    return;
  }

  target.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.remove("active");
  });

  const matchingButton = document.querySelector(
    `[data-screen="${screenId}"]`
  );

  if (matchingButton) {
    matchingButton.classList.add("active");
  }

  if (screenId === "inventoryScreen") {
    renderInventory();
  }

  if (screenId === "forSaleScreen") {
    renderForSale();
  }

  if (screenId === "salesScreen") {
    renderSales();
  }

  if (screenId === "customersScreen") {
    updateCustomerScreen();
  }
}


/* =========================================================
   NAVIGATION BUTTONS
========================================================= */

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const screenId = button.dataset.screen;

    if (screenId) {
      showScreen(screenId);
    }
  });
});


/* =========================================================
   QUICK ACTION BUTTONS
========================================================= */

$("quickBuyBtn")?.addEventListener("click", () => {
  showScreen("buyCarsScreen");
});

$("quickAuctionBtn")?.addEventListener("click", () => {
  showScreen("auctionScreen");
});

$("quickInventoryBtn")?.addEventListener("click", () => {
  showScreen("inventoryScreen");
});

$("quickForSaleBtn")?.addEventListener("click", () => {
  showScreen("forSaleScreen");
});

$("inventoryBuyBtn")?.addEventListener("click", () => {
  showScreen("buyCarsScreen");
});


/* =========================================================
   CAR RENDERING
========================================================= */

function getCarEmoji(category) {
  if (category === "suv") {
    return "🚙";
  }

  if (category === "pickup") {
    return "🛻";
  }

  if (category === "mpv") {
    return "🚐";
  }

  if (category === "luxury") {
    return "🏎️";
  }

  if (category === "electric") {
    return "🔋";
  }

  return "🚘";
}


function createCarCard(car, options = {}) {
  const card = document.createElement("article");

  card.className = "car-card";

  const visual = document.createElement("div");
  visual.className = "car-visual";

  visual.innerHTML = `
    <span class="car-category">
      ${escapeHTML(car.category)}
    </span>

    <span class="car-number">
      #${car.stockNumber || car.id}
    </span>

    ${getCarEmoji(car.category)}
  `;

  const content = document.createElement("div");
  content.className = "car-content";

  const title = document.createElement("h3");
  title.textContent = car.name;

  const meta = document.createElement("div");
  meta.className = "car-meta";

  [
    car.engine,
    car.transmission,
    car.fuel,
    `${car.seats} seats`
  ].forEach((text) => {
    const tag = document.createElement("span");

    tag.className = "car-tag";
    tag.textContent = text;

    meta.appendChild(tag);
  });

  const price = document.createElement("div");
  price.className = "car-price";

  price.innerHTML =
    `${formatMoney(options.price ?? car.price)} ` +
    `<small>simulator price</small>`;

  const actions = document.createElement("div");
  actions.className = "car-actions";

  const detailsButton = document.createElement("button");
  detailsButton.className = "action-btn small";
  detailsButton.textContent = "Details";

  detailsButton.addEventListener("click", () => {
    openCarDetails(car);
  });

  actions.appendChild(detailsButton);

  if (options.buy) {
    const buyButton = document.createElement("button");

    buyButton.className =
      "action-btn small primary";

    buyButton.textContent = "Buy";

    buyButton.addEventListener("click", () => {
      openBuyModal(car);
    });

    actions.appendChild(buyButton);
  }

  if (options.inventory) {
    const sellButton = document.createElement("button");

    sellButton.className =
      "action-btn small primary";

    sellButton.textContent = "For Sale";

    sellButton.addEventListener("click", () => {
      openSalePriceModal(car);
    });

    actions.appendChild(sellButton);
  }

  if (options.forSale) {
    const customerButton = document.createElement("button");

    customerButton.className =
      "action-btn small primary";

    customerButton.textContent = "Deal";

    customerButton.addEventListener("click", () => {
      startDealForCar(car);
    });

    actions.appendChild(customerButton);
  }

  content.appendChild(title);
  content.appendChild(meta);
  content.appendChild(price);
  content.appendChild(actions);

  card.appendChild(visual);
  card.appendChild(content);

  return card;
}


/* =========================================================
   BUY CARS
========================================================= */

function renderBuyCars() {
  if (!buyCarsGrid) {
    return;
  }

  const search = ($("carSearch")?.value || "")
    .trim()
    .toLowerCase();

  const category =
    $("carCategoryFilter")?.value || "all";

  buyCarsGrid.innerHTML = "";

  const filtered = cars.filter((car) => {
    const matchesSearch =
      !search ||
      car.name.toLowerCase().includes(search) ||
      car.category.toLowerCase().includes(search);

    const matchesCategory =
      category === "all" ||
      car.category === category;

    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    buyCarsGrid.innerHTML = `
      <div class="empty-state">
        <div>🔎</div>
        <h3>No Cars Found</h3>
        <p>Try another search or category.</p>
      </div>
    `;

    return;
  }

  filtered.forEach((car) => {
    buyCarsGrid.appendChild(
      createCarCard(car, { buy: true })
    );
  });
}


$("carSearch")?.addEventListener(
  "input",
  renderBuyCars
);

$("carCategoryFilter")?.addEventListener(
  "change",
  renderBuyCars
);


/* =========================================================
   CAR DETAILS MODAL
========================================================= */

function openCarDetails(car) {
  if (!carDetailsModal) {
    return;
  }

  const content = $("carModalContent");

  if (!content) {
    return;
  }

  content.innerHTML = `
    <div class="modal-car-hero">
      ${getCarEmoji(car.category)}
    </div>

    <div class="modal-car-details">

      <h3>${escapeHTML(car.name)}</h3>

      <p>
        ${escapeHTML(car.category.toUpperCase())}
      </p>

      <div class="spec-grid">

        <div class="spec-item">
          <span>Price</span>
          <strong>${formatMoney(car.price)}</strong>
        </div>

        <div class="spec-item">
          <span>Engine</span>
          <strong>${escapeHTML(car.engine)}</strong>
        </div>

        <div class="spec-item">
          <span>Transmission</span>
          <strong>${escapeHTML(car.transmission)}</strong>
        </div>

        <div class="spec-item">
          <span>Fuel</span>
          <strong>${escapeHTML(car.fuel)}</strong>
        </div>

        <div class="spec-item">
          <span>Seats</span>
          <strong>${car.seats}</strong>
        </div>

        <div class="spec-item">
          <span>Power</span>
          <strong>${escapeHTML(car.power)}</strong>
        </div>

      </div>

      <div class="modal-actions">

        <button
          class="action-btn"
          id="modalCloseDetailsBtn"
        >
          Close
        </button>

        <button
          class="action-btn primary"
          id="modalBuyCarBtn"
        >
          Buy Vehicle
        </button>

      </div>

    </div>
  `;

  carDetailsModal.classList.remove("hidden");

  $("modalCloseDetailsBtn")?.addEventListener(
    "click",
    closeCarDetails
  );

  $("modalBuyCarBtn")?.addEventListener(
    "click",
    () => {
      closeCarDetails();
      openBuyModal(car);
    }
  );
}


function closeCarDetails() {
  carDetailsModal?.classList.add("hidden");
}

$("closeCarModalBtn")?.addEventListener(
  "click",
  closeCarDetails
);


/* =========================================================
   BUY MODAL
========================================================= */

function openBuyModal(car) {
  currentPurchaseCar = car;

  if (!$("buyCarDetails") || !buyCarModal) {
    return;
  }

  $("buyCarDetails").innerHTML = `
    <div class="modal-car-details">

      <h3>${escapeHTML(car.name)}</h3>

      <p>
        Purchase this vehicle for
        <strong>${formatMoney(car.price)}</strong>.
      </p>

      <div class="spec-grid">

        <div class="spec-item">
          <span>Engine</span>
          <strong>${escapeHTML(car.engine)}</strong>
        </div>

        <div class="spec-item">
          <span>Fuel</span>
          <strong>${escapeHTML(car.fuel)}</strong>
        </div>

        <div class="spec-item">
          <span>Power</span>
          <strong>${escapeHTML(car.power)}</strong>
        </div>

        <div class="spec-item">
          <span>Seats</span>
          <strong>${car.seats}</strong>
        </div>

      </div>

    </div>
  `;

  buyCarModal.classList.remove("hidden");
}


function closeBuyModal() {
  currentPurchaseCar = null;
  buyCarModal?.classList.add("hidden");
}


$("closeBuyModalBtn")?.addEventListener(
  "click",
  closeBuyModal
);

$("cancelBuyBtn")?.addEventListener(
  "click",
  closeBuyModal
);


$("confirmBuyBtn")?.addEventListener(
  "click",
  buySelectedCar
);


function buySelectedCar() {
  if (!currentPurchaseCar) {
    return;
  }

  const price = currentPurchaseCar.price;

  if (money < price) {
    showNotification(
      "Purchase Failed",
      "You do not have enough capital for this vehicle.",
      "!"
    );

    return;
  }

  const color =
    $("carColorSelect")?.value || "Black";

  const condition =
    $("carConditionSelect")?.value || "good";

  const ownedCar = {
    ...currentPurchaseCar,
    stockNumber:
      "STK-" +
      String(Date.now()).slice(-7),

    purchasePrice: price,
    askingPrice: null,
    color,
    condition,
    purchasedAt: new Date().toLocaleString("en-PK"),
    status: "inventory"
  };

  money -= price;

  inventory.push(ownedCar);

  showNotification(
    "Vehicle Purchased",
    `${ownedCar.name} has been added to your inventory.`,
    "🚘"
  );

  closeBuyModal();

  updateUI();
  saveGame();
}


/* =========================================================
   INVENTORY
========================================================= */

function renderInventory() {
  if (!inventoryGrid) {
    return;
  }

  inventoryGrid.innerHTML = "";

  if (inventory.length === 0) {
    inventoryEmpty?.classList.remove("hidden");
    return;
  }

  inventoryEmpty?.classList.add("hidden");

  inventory.forEach((car) => {
    inventoryGrid.appendChild(
      createCarCard(car, {
        inventory: true,
        price: car.purchasePrice
      })
    );
  });
}


/* =========================================================
   PUT CAR FOR SALE
========================================================= */

function openSalePriceModal(car) {
  currentSaleCar = car;

  if (!salePriceModal) {
    return;
  }

  const details = $("saleCarDetails");

  if (details) {
    details.innerHTML = `
      <div class="modal-car-details">

        <h3>${escapeHTML(car.name)}</h3>

        <p>
          You purchased this car for
          <strong>${formatMoney(car.purchasePrice)}</strong>.
        </p>

        <div class="spec-grid">

          <div class="spec-item">
            <span>Color</span>
            <strong>${escapeHTML(car.color || "Black")}</strong>
          </div>

          <div class="spec-item">
            <span>Condition</span>
            <strong>${escapeHTML(car.condition || "Good")}</strong>
          </div>

        </div>

      </div>
    `;
  }

  const input = $("askingPriceInput");

  if (input) {
    input.value = Math.round(
      car.purchasePrice * 1.2
    );
  }

  salePriceModal.classList.remove("hidden");
}


function closeSalePriceModal() {
  currentSaleCar = null;
  salePriceModal?.classList.add("hidden");
}


$("closeSalePriceModalBtn")?.addEventListener(
  "click",
  closeSalePriceModal
);

$("cancelSalePriceBtn")?.addEventListener(
  "click",
  closeSalePriceModal
);


$("confirmSalePriceBtn")?.addEventListener(
  "click",
  putCarForSale
);


function putCarForSale() {
  if (!currentSaleCar) {
    return;
  }

  const input = $("askingPriceInput");

  const askingPrice = Number(
    input?.value || 0
  );

  if (
    !Number.isFinite(askingPrice) ||
    askingPrice <= 0
  ) {
    showNotification(
      "Invalid Price",
      "Enter a valid asking price.",
      "!"
    );

    return;
  }

  const index = inventory.findIndex(
    (car) => car.stockNumber === currentSaleCar.stockNumber
  );

  if (index === -1) {
    showNotification(
      "Error",
      "This vehicle is no longer in inventory.",
      "!"
    );

    closeSalePriceModal();
    return;
  }

  const car = inventory.splice(index, 1)[0];

  car.askingPrice = askingPrice;
  car.status = "for-sale";

  carsForSale.push(car);

  showNotification(
    "Car Listed",
    `${car.name} is now available for sale.`,
    "🏷️"
  );

  closeSalePriceModal();

  updateUI();
  saveGame();
}


/* =========================================================
   CARS FOR SALE
========================================================= */

function renderForSale() {
  if (!forSaleGrid) {
    return;
  }

  forSaleGrid.innerHTML = "";

  if (carsForSale.length === 0) {
    forSaleEmpty?.classList.remove("hidden");
    return;
  }

  forSaleEmpty?.classList.add("hidden");

  carsForSale.forEach((car) => {
    forSaleGrid.appendChild(
      createCarCard(car, {
        forSale: true,
        price: car.askingPrice
      })
    );
  });
}


/* =========================================================
   CUSTOMER SYSTEM
========================================================= */

function generateCustomer() {
  const name =
    customerNames[
      Math.floor(
        Math.random() * customerNames.length
      )
    ];

  const budget =
    Math.floor(
      (5000000 +
        Math.random() * 70000000) /
        500000
    ) * 500000;

  const customer = {
    id: Date.now(),
    name,
    budget,
    interest:
      carsForSale.length > 0
        ? carsForSale[
            Math.floor(
              Math.random() * carsForSale.length
            )
          ].name
        : "Looking around",
    createdAt: new Date().toLocaleTimeString()
  };

  customers.push(customer);

  currentCustomer = customer;

  if (carsForSale.length > 0) {
    createRandomDeal();
  } else {
    currentDeal = null;
  }

  customerCountdown = 15;

  updateCustomerScreen();

  if (customerNotifications) {
    showNotification(
      "New Customer!",
      `${name} has entered the dealership.`,
      "👤"
    );
  }

  updateUI();
  saveGame();
}


function createRandomDeal() {
  if (!currentCustomer || carsForSale.length === 0) {
    currentDeal = null;
    return;
  }

  const car =
    carsForSale[
      Math.floor(
        Math.random() * carsForSale.length
      )
    ];

  const askingPrice =
    Number(car.askingPrice);

  let offer =
    askingPrice *
    (0.72 + Math.random() * 0.24);

  if (offer > currentCustomer.budget) {
    offer = Math.min(
      currentCustomer.budget,
      askingPrice * 0.9
    );
  }

  offer = Math.max(
    car.purchasePrice * 0.8,
    offer
  );

  offer =
    Math.round(offer / 50000) *
    50000;

  currentDeal = {
    car,
    offer,
    originalOffer: offer,
    bargainCount: 0
  };

  updateCustomerScreen();
}


function updateCustomerScreen() {
  const name = $("customerName");
  const description = $("customerDescription");
  const budget = $("customerBudget");
  const interest = $("customerInterest");

  const dealCarName = $("dealCarName");
  const customerOffer = $("customerOffer");
  const dealMessage = $("dealMessage");

  if (!currentCustomer) {
    if (name) {
      name.textContent = "Waiting for customer...";
    }

    if (description) {
      description.textContent =
        "A customer will arrive automatically.";
    }

    if (budget) {
      budget.textContent = formatMoney(0);
    }

    if (interest) {
      interest.textContent = "—";
    }
  } else {
    if (name) {
      name.textContent =
        currentCustomer.name;
    }

    if (description) {
      description.textContent =
        "Customer is interested in buying a vehicle.";
    }

    if (budget) {
      budget.textContent =
        formatMoney(currentCustomer.budget);
    }

    if (interest) {
      interest.textContent =
        currentCustomer.interest;
    }
  }

  if (!currentDeal) {
    if (dealCarName) {
      dealCarName.textContent =
        "No active deal";
    }

    if (customerOffer) {
      customerOffer.textContent =
        formatMoney(0);
    }

    if (dealMessage) {
      dealMessage.textContent =
        carsForSale.length === 0
          ? "Put a car up for sale to receive customer offers."
          : "Waiting for a customer deal.";
    }

    return;
  }

  if (dealCarName) {
    dealCarName.textContent =
      currentDeal.car.name;
  }

  if (customerOffer) {
    customerOffer.textContent =
      formatMoney(currentDeal.offer);
  }

  if (dealMessage) {
    dealMessage.textContent =
      "The customer has made an offer. You can accept, bargain, or reject.";
  }
}


/* =========================================================
   CUSTOMER COUNTDOWN
========================================================= */

function startCustomerTimer() {
  setInterval(() => {

    customerCountdown--;

    if (customerCountdown < 0) {
      customerCountdown = 0;
    }

    const countdown =
      $("customerCountdown");

    const customersCountdown =
      $("customersCountdown");

    if (countdown) {
      countdown.textContent =
        `${customerCountdown}s`;
    }

    if (customersCountdown) {
      customersCountdown.textContent =
        `${customerCountdown}s`;
    }

    if (customerCountdown === 0) {
      generateCustomer();
    }

  }, 1000);
}


/* =========================================================
   DEAL BUTTONS
========================================================= */

function startDealForCar(car) {
  if (!currentCustomer) {
    generateCustomer();
  }

  if (!currentCustomer) {
    return;
  }

  currentDeal = {
    car,
    offer: Math.round(
      car.askingPrice *
      (0.75 + Math.random() * 0.2) /
      50000
    ) * 50000,
    originalOffer: 0,
    bargainCount: 0
  };

  currentDeal.originalOffer =
    currentDeal.offer;

  currentCustomer.interest =
    car.name;

  updateCustomerScreen();

  showScreen("customersScreen");
}


$("acceptDealBtn")?.addEventListener(
  "click",
  acceptDeal
);


function acceptDeal() {
  if (!currentDeal) {
    showNotification(
      "No Deal",
      "There is no active customer offer.",
      "!"
    );

    return;
  }

  openPaperwork(currentDeal);
}


$("rejectDealBtn")?.addEventListener(
  "click",
  rejectDeal
);


function rejectDeal() {
  if (!currentDeal) {
    showNotification(
      "No Deal",
      "There is no active deal to reject.",
      "!"
    );

    return;
  }

  showNotification(
    "Deal Rejected",
    `${currentCustomer?.name || "The customer"} left without buying.`,
    "✕"
  );

  currentDeal = null;
  updateCustomerScreen();
  saveGame();
}


$("bargainBtn")?.addEventListener(
  "click",
  bargainDeal
);


function bargainDeal() {
  if (!currentDeal) {
    showNotification(
      "No Deal",
      "There is no active customer offer.",
      "!"
    );

    return;
  }

  if (currentDeal.bargainCount >= 2) {
    showNotification(
      "Bargain Limit",
      "The customer has already been pushed too far.",
      "!"
    );

    return;
  }

  currentDeal.bargainCount++;

  const increase =
    currentDeal.car.askingPrice *
    (0.025 + Math.random() * 0.055);

  currentDeal.offer = Math.min(
    currentDeal.car.askingPrice,
    Math.round(
      (currentDeal.offer + increase) /
      50000
    ) * 50000
  );

  const chance =
    Math.random();

  if (
    chance < 0.12 &&
    currentDeal.bargainCount >= 2
  ) {
    showNotification(
      "Customer Left",
      "The customer did not agree to the bargaining.",
      "👋"
    );

    currentDeal = null;
  } else {
    showNotification(
      "Bargain Successful",
      `New offer: ${formatMoney(currentDeal.offer)}`,
      "🤝"
    );
  }

  updateCustomerScreen();
}


/* =========================================================
   PAPERWORK
========================================================= */

function openPaperwork(deal) {
  if (!deal) {
    return;
  }

  showScreen("paperworkScreen");

  $("paperCarName").textContent =
    deal.car.name;

  $("paperSalePrice").textContent =
    formatMoney(deal.offer);

  $("paperBuyerName").textContent =
    "—";

  $("buyerName").value =
    currentCustomer?.name || "";

  clearSignature();
}


$("cancelPaperworkBtn")?.addEventListener(
  "click",
  () => {
    showScreen("customersScreen");
  }
);


$("completeSaleBtn")?.addEventListener(
  "click",
  completeSale
);


function completeSale() {
  if (!currentDeal || !currentCustomer) {
    showNotification(
      "Sale Error",
      "There is no active sale.",
      "!"
    );

    return;
  }

  const buyerName =
    $("buyerName")?.value.trim();

  if (!buyerName) {
    showNotification(
      "Buyer Name Required",
      "Enter the buyer's full name before completing the sale.",
      "!"
    );

    return;
  }

  if (!hasSignature()) {
    showNotification(
      "Signature Required",
      "The buyer must sign the paperwork.",
      "✍️"
    );

    return;
  }

  const car = currentDeal.car;

  const saleIndex =
    carsForSale.findIndex(
      (item) =>
        item.stockNumber ===
        car.stockNumber
    );

  if (saleIndex === -1) {
    showNotification(
      "Sale Error",
      "This vehicle is no longer available.",
      "!"
    );

    currentDeal = null;
    return;
  }

  carsForSale.splice(saleIndex, 1);

  const salePrice =
    Number(currentDeal.offer);

  const purchasePrice =
    Number(car.purchasePrice);

  const profit =
    salePrice - purchasePrice;

  money += salePrice;

  const sale = {
    id: Date.now(),
    carName: car.name,
    buyerName,
    salePrice,
    purchasePrice,
    profit,
    date: new Date().toLocaleString("en-PK"),
    stockNumber: car.stockNumber
  };

  sales.push(sale);

  customers = customers.filter(
    (customer) =>
      customer.id !== currentCustomer.id
  );

  showNotification(
    "SALE COMPLETED!",
    `${car.name} sold for ${formatMoney(salePrice)}. Profit: ${formatMoney(profit)}.`,
    "💰"
  );

  currentDeal = null;
  currentCustomer = null;

  $("buyerName").value = "";

  clearSignature();

  updateUI();
  saveGame();

  showScreen("salesScreen");
}


/* =========================================================
   SIGNATURE CANVAS
========================================================= */

const signatureCanvas =
  $("signatureCanvas");

let signatureContext = null;
let drawingSignature = false;
let signatureHasInk = false;

function setupSignatureCanvas() {
  if (!signatureCanvas) {
    return;
  }

  signatureContext =
    signatureCanvas.getContext("2d");

  signatureContext.lineWidth = 2.5;
  signatureContext.lineCap = "round";
  signatureContext.lineJoin = "round";
  signatureContext.strokeStyle = "#111";

  signatureCanvas.addEventListener(
    "pointerdown",
    startSignature
  );

  signatureCanvas.addEventListener(
    "pointermove",
    drawSignature
  );

  signatureCanvas.addEventListener(
    "pointerup",
    stopSignature
  );

  signatureCanvas.addEventListener(
    "pointercancel",
    stopSignature
  );

  signatureCanvas.addEventListener(
    "pointerleave",
    stopSignature
);


  clearSignature();
}


function getCanvasPosition(event) {
  const rect =
    signatureCanvas.getBoundingClientRect();

  return {
    x:
      (event.clientX - rect.left) *
      (signatureCanvas.width / rect.width),

    y:
      (event.clientY - rect.top) *
      (signatureCanvas.height / rect.height)
  };
}


function startSignature(event) {
  if (!signatureContext) {
    return;
  }

  drawingSignature = true;
  signatureHasInk = true;

  const position =
    getCanvasPosition(event);

  signatureContext.beginPath();

  signatureContext.moveTo(
    position.x,
    position.y
  );
}


function drawSignature(event) {
  if (
    !drawingSignature ||
    !signatureContext
  ) {
    return;
  }

  const position =
    getCanvasPosition(event);

  signatureContext.lineTo(
    position.x,
    position.y
  );

  signatureContext.stroke();
}


function stopSignature() {
  drawingSignature = false;
}


function clearSignature() {
  if (!signatureContext || !signatureCanvas) {
    return;
  }

  signatureContext.clearRect(
    0,
    0,
    signatureCanvas.width,
    signatureCanvas.height
  );

  signatureHasInk = false;
}


function hasSignature() {
  return signatureHasInk;
}


$("clearSignatureBtn")?.addEventListener(
  "click",
  clearSignature
);


/* =========================================================
   SALES HISTORY
========================================================= */

function renderSales() {
  const body = $("salesTableBody");

  if (!body) {
    return;
  }

  body.innerHTML = "";

  let totalRevenue = 0;
  let totalProfit = 0;

  sales.forEach((sale) => {
    totalRevenue += Number(sale.salePrice);
    totalProfit += Number(sale.profit);

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${escapeHTML(sale.carName)}</td>
      <td>${escapeHTML(sale.buyerName)}</td>
      <td>${formatMoney(sale.salePrice)}</td>
      <td>${formatMoney(sale.profit)}</td>
      <td>${escapeHTML(sale.date)}</td>
    `;

    body.appendChild(row);
  });

  $("salesTotalCars").textContent =
    sales.length;

  $("salesRevenue").textContent =
    formatMoney(totalRevenue);

  $("salesProfit").textContent =
    formatMoney(totalProfit);
}


/* =========================================================
   AUCTION
========================================================= */

function startAuction() {
  if (auction.active) {
    showNotification(
      "Auction Active",
      "Finish the current auction first.",
      "!"
    );

    return;
  }

  const availableCars =
    cars.filter(
      (car) =>
        !inventory.some(
          (owned) =>
            owned.id === car.id
        )
    );

  if (availableCars.length === 0) {
    showNotification(
      "No Auction Cars",
      "There are no cars available for auction.",
      "!"
    );

    return;
  }

  const car =
    availableCars[
      Math.floor(
        Math.random() *
        availableCars.length
      )
    ];

  const startingBid =
    Math.round(
      (car.price * 0.65) /
      50000
    ) * 50000;

  auction.active = true;
  auction.car = car;
  auction.startingBid = startingBid;
  auction.currentBid = startingBid;
  auction.yourBid = 0;
  auction.timer = 30;

  clearInterval(auction.interval);

  auction.interval = setInterval(
    auctionTick,
    1000
  );

  updateAuctionUI();

  showNotification(
    "Auction Started",
    `${car.name} is now being auctioned.`,
    "🔨"
  );
}


function auctionTick() {
  if (!auction.active) {
    return;
  }

  auction.timer--;

  /*
    AI bidders occasionally increase
    the current bid.
  */
  if (
    Math.random() < 0.28 &&
    auction.timer > 2
  ) {
    const increase =
      Math.max(
        50000,
        Math.round(
          auction.currentBid *
          (0.025 + Math.random() * 0.045) /
          50000
        ) * 50000
      );

    auction.currentBid += increase;

    if (
      auction.yourBid > 0 &&
      auction.currentBid >= auction.yourBid
    ) {
      auction.yourBid = 0;
    }
  }

  if (auction.timer <= 0) {
    finishAuction();
    return;
  }

  updateAuctionUI();
}


function placeBid() {
  if (!auction.active) {
    showNotification(
      "No Auction",
      "Start an auction first.",
      "!"
    );

    return;
  }

  const amount =
    Number($("bidAmount")?.value || 0);

  if (!Number.isFinite(amount)) {
    return;
  }

  if (
    amount <= auction.currentBid
  ) {
    showNotification(
      "Bid Too Low",
      "Your bid must be higher than the current bid.",
      "!"
    );

    return;
  }

  if (amount > money) {
    showNotification(
      "Not Enough Capital",
      "You do not have enough capital for this bid.",
      "!"
    );

    return;
  }

  auction.yourBid = amount;
  auction.currentBid = amount;

  $("bidAmount").value = "";

  showNotification(
    "Bid Placed",
    `You bid ${formatMoney(amount)}.`,
    "🔨"
  );

  updateAuctionUI();
}


function finishAuction() {
  clearInterval(auction.interval);

  const won =
    auction.yourBid > 0 &&
    auction.yourBid >= auction.currentBid;

  /*
    If another AI bidder pushed above your bid,
    you lose. Otherwise you win.
  */
  const playerWon =
    auction.yourBid > 0 &&
    auction.yourBid >= auction.currentBid;

  if (playerWon) {
    if (auction.yourBid <= money) {

      const ownedCar = {
        ...auction.car,

        stockNumber:
          "AUC-" +
          String(Date.now()).slice(-7),

        purchasePrice:
          auction.yourBid,

        askingPrice: null,

        color: "Auction Stock",

        condition: "Good",

        purchasedAt:
          new Date().toLocaleString("en-PK"),

        status: "inventory"
      };

      money -= auction.yourBid;

      inventory.push(ownedCar);

      showNotification(
        "Auction Won!",
        `${ownedCar.name} was added to your inventory.`,
        "🏆"
      );

    } else {
      showNotification(
        "Auction Lost",
        "Your final bid exceeded your available capital.",
        "!"
      );
    }

  } else {
    showNotification(
      "Auction Finished",
      "Another bidder won the vehicle.",
      "🔨"
    );
  }

  auction.active = false;
  auction.car = null;
  auction.startingBid = 0;
  auction.currentBid = 0;
  auction.yourBid = 0;
  auction.timer = 0;
  auction.interval = null;

  updateAuctionUI();
  updateUI();
  saveGame();
}


function updateAuctionUI() {
  const carName = $("auctionCarName");
  const details = $("auctionCarDetails");
  const startingBid = $("auctionStartingBid");
  const currentBid = $("auctionCurrentBid");
  const yourBid = $("yourHighestBid");
  const timer = $("auctionTimer");
  const message = $("auctionMessage");

  if (!auction.active || !auction.car) {

    if (carName) {
      carName.textContent =
        "No Auction Running";
    }

    if (details) {
      details.textContent =
        "Start an auction to begin bidding.";
    }

    if (startingBid) {
      startingBid.textContent =
        formatMoney(0);
    }

    if (currentBid) {
      currentBid.textContent =
        formatMoney(0);
    }

    if (yourBid) {
      yourBid.textContent =
        formatMoney(0);
    }

    if (timer) {
      timer.textContent = "30";
    }

    if (message) {
      message.textContent =
        "No auction is currently running.";
    }

    return;
  }

  if (carName) {
    carName.textContent =
      auction.car.name;
  }

  if (details) {
    details.textContent =
      `${auction.car.engine} • ${auction.car.fuel} • ${auction.car.power}`;
  }

  if (startingBid) {
    startingBid.textContent =
      formatMoney(auction.startingBid);
  }

  if (currentBid) {
    currentBid.textContent =
      formatMoney(auction.currentBid);
  }

  if (yourBid) {
    yourBid.textContent =
      formatMoney(auction.yourBid);
  }

  if (timer) {
    timer.textContent =
      String(auction.timer);
  }

  if (message) {
    message.textContent =
      "Bidders are competing for this vehicle.";
  }
}


$("startAuctionBtn")?.addEventListener(
  "click",
  startAuction
);

$("placeBidBtn")?.addEventListener(
  "click",
  placeBid
);


/* =========================================================
   SETTINGS
========================================================= */

$("autoSaveToggle")?.addEventListener(
  "change",
  (event) => {
    autoSave = event.target.checked;

    if (autoSave) {
      saveGame();
    }
  }
);


$("customerNotificationsToggle")
  ?.addEventListener(
    "change",
    (event) => {
      customerNotifications =
        event.target.checked;

      saveGame();
    }
  );


$("darkModeToggle")?.addEventListener(
  "change",
  (event) => {
    document.body.classList.toggle(
      "dark-mode",
      event.target.checked
    );

    localStorage.setItem(
      "carDealershipDarkMode",
      event.target.checked
        ? "1"
        : "0"
    );
  }
);


function loadSettings() {
  const dark =
    localStorage.getItem(
      "carDealershipDarkMode"
    );

  if (dark === "1") {
    document.body.classList.add(
      "dark-mode"
    );

    if ($("darkModeToggle")) {
      $("darkModeToggle").checked = true;
    }
  }

  if ($("autoSaveToggle")) {
    $("autoSaveToggle").checked =
      autoSave;
  }

  if ($("customerNotificationsToggle")) {
    $("customerNotificationsToggle").checked =
      customerNotifications;
  }
}


$("resetGameBtn")?.addEventListener(
  "click",
  resetGame
);


function resetGame() {
  const confirmed =
    window.confirm(
      "Reset your entire dealership? This cannot be undone."
    );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem(
    "carDealershipSimulatorSave"
  );

  money = STARTING_MONEY;
  inventory = [];
  carsForSale = [];
  sales = [];
  customers = [];

  currentCustomer = null;
  currentDeal = null;

  showNotification(
    "Dealership Reset",
    "Your dealership has been reset.",
    "↻"
  );

  updateUI();
  saveGame();
  showScreen("dashboardScreen");
}


/* =========================================================
   GAME CLOCK
========================================================= */

function updateGameClock() {
  gameMinutes++;

  if (gameMinutes >= 24 * 60) {
    gameMinutes = 0;
  }

  const hours24 =
    Math.floor(gameMinutes / 60);

  const minutes =
    gameMinutes % 60;

  const suffix =
    hours24 >= 12
      ? "PM"
      : "AM";

  let hours12 =
    hours24 % 12;

  if (hours12 === 0) {
    hours12 = 12;
  }

  const timeText =
    `${String(hours12).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")} ` +
    suffix;

  if (gameTimeDisplay) {
    gameTimeDisplay.textContent =
      timeText;
  }

  if (autoSave) {
    saveGame();
  }
}


/* =========================================================
   MAIN UI UPDATE
========================================================= */

function updateUI() {
  const totalProfit =
    sales.reduce(
      (sum, sale) =>
        sum + Number(sale.profit || 0),
      0
    );

  if (moneyDisplay) {
    moneyDisplay.textContent =
      formatMoney(money);
  }

  if (dashboardMoney) {
    dashboardMoney.textContent =
      formatMoney(money);
  }

  if ($("buyCarsMoney")) {
    $("buyCarsMoney").textContent =
      formatMoney(money);
  }

  if (inventoryCount) {
    inventoryCount.textContent =
      inventory.length;
  }

  if (dashboardInventory) {
    dashboardInventory.textContent =
      inventory.length;
  }

  if (dashboardForSale) {
    dashboardForSale.textContent =
      carsForSale.length;
  }

  if (dashboardSales) {
    dashboardSales.textContent =
      sales.length;
  }

  if (dashboardCustomers) {
    dashboardCustomers.textContent =
      customers.length;
  }

  if (dashboardCarsSold) {
    dashboardCarsSold.textContent =
      sales.length;
  }

  if (dashboardProfit) {
    dashboardProfit.textContent =
      formatMoney(totalProfit);
  }

  renderInventory();
  renderForSale();
  renderSales();
  updateCustomerScreen();
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================================================
   CLOSE MODALS WITH ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }

    carDetailsModal?.classList.add("hidden");
    buyCarModal?.classList.add("hidden");
    salePriceModal?.classList.add("hidden");

  }
);


/* =========================================================
   CLOSE NOTIFICATION
========================================================= */

$("closeNotificationBtn")
  ?.addEventListener(
    "click",
    () => {
      notification?.classList.add("hidden");
    }
  );


/* =========================================================
   INITIALIZE
========================================================= */

function initializeGame() {
  loadGame();
  loadSettings();

  setupSignatureCanvas();

  renderBuyCars();
  updateAuctionUI();
  updateUI();

  startCustomerTimer();

  setInterval(
    updateGameClock,
    1000
  );

  /*
    First customer appears after
    the normal 15-second countdown.
  */

  showScreen("dashboardScreen");
}


initializeGame();
```
