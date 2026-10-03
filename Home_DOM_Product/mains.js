// ==========================================
// 1. ИСХОДНЫЕ ДАННЫЕ (СОСТОЯНИЕ)
// ==========================================
let products = [
    { id: 1, name: "Молоко", category: "Молочные продукты", bought: false },
    { id: 2, name: "Хлеб", category: "Выпечка", bought: true },
    { id: 3, name: "Сыр", category: "Молочные продукты", bought: false },
    { id: 4, name: "Яблоки", category: "Фрукты", bought: false }
];

let currentFilter = "all"; // "all", "need", "bought"
let draftProducts = null;  // Черновик (null, если черновик не активен)

const app = document.querySelector("#app");

// ==========================================
// 2. ИНТЕРФЕЙС (DOM)
// ==========================================
function createUI(app) {
    const title = document.createElement("h1");
    title.textContent = "Список продуктов";

    // Индикация режима черновика
    const draftBanner = document.createElement("div");
    draftBanner.id = "draft-banner";
    draftBanner.textContent = "⚠️ Режим черновика активен!";
    draftBanner.style.display = "none";
    draftBanner.style.color = "orange";

    // Форма добавления (2 поля ввода)
    const form = document.createElement("form");
    
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.placeholder = "Название продукта";
    inputName.required = true;

    const inputCategory = document.createElement("input");
    inputCategory.type = "text";
    inputCategory.placeholder = "Категория";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Добавить";

    form.append(inputName, inputCategory, submitButton);

    // Блок кнопок фильтрации
    const filterContainer = document.createElement("div");
    
    const filterAllBtn = document.createElement("button");
    filterAllBtn.type = "button";
    filterAllBtn.textContent = "Все";

    const filterNeedBtn = document.createElement("button");
    filterNeedBtn.type = "button";
    filterNeedBtn.textContent = "Нужно купить";

    const filterBoughtBtn = document.createElement("button");
    filterBoughtBtn.type = "button";
    filterBoughtBtn.textContent = "Куплено";

    filterContainer.append(filterAllBtn, filterNeedBtn, filterBoughtBtn);

    // Блок кнопок черновика
    const draftContainer = document.createElement("div");

    const createDraftBtn = document.createElement("button");
    createDraftBtn.type = "button";
    createDraftBtn.textContent = "Создать черновик";

    const saveDraftBtn = document.createElement("button");
    saveDraftBtn.type = "button";
    saveDraftBtn.textContent = "Сохранить изменения";
    saveDraftBtn.disabled = true;

    const cancelDraftBtn = document.createElement("button");
    cancelDraftBtn.type = "button";
    cancelDraftBtn.textContent = "Отменить изменения";
    cancelDraftBtn.disabled = true;

    draftContainer.append(createDraftBtn, saveDraftBtn, cancelDraftBtn);

    // Список
    const list = document.createElement("ul");

    app.append(title, draftBanner, form, filterContainer, draftContainer, list);

    return {
        form,
        inputName,
        inputCategory,
        list,
        draftBanner,
        filterAllBtn,
        filterNeedBtn,
        filterBoughtBtn,
        createDraftBtn,
        saveDraftBtn,
        cancelDraftBtn
    };
}

const ui = createUI(app);

// ==========================================
// 3. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==========================================

// Возвращает массив, с которым сейчас работаем (активный черновик или основной список)
function getActiveProducts() {
    return draftProducts !== null ? draftProducts : products;
}

function normalizeProductName(productName) {
    return productName.trim().toLowerCase();
}

function hasProduct(productName) {
    const normalizedName = normalizeProductName(productName);
    return getActiveProducts().some(product => normalizeProductName(product.name) === normalizedName);
}

// ==========================================
// 4. ОТРЕСОВКА (RENDER)
// ==========================================
function renderProducts() {
    const activeList = getActiveProducts();

    // 1. Фильтрация данных (без изменения исходного массива)
    let filteredProducts = activeList;
    if (currentFilter === "need") {
        filteredProducts = activeList.filter(product => !product.bought);
    } else if (currentFilter === "bought") {
        filteredProducts = activeList.filter(product => product.bought);
    }

    // 2. Очистка списка
    ui.list.innerHTML = "";

    // 3. Генерация DOM элементов
    filteredProducts.forEach(product => {
        const li = document.createElement("li");
        
        // Связываем id объекта с DOM через data-атрибут
        li.dataset.id = product.id; 
        li.textContent = `${product.name} (${product.category})`;

        if (product.bought) {
            li.classList.add("bought");
        }

        ui.list.append(li);
    });

    // 4. Обновление состояния кнопок черновика
    const isDraft = draftProducts !== null;
    ui.draftBanner.style.display = isDraft ? "block" : "none";
    ui.createDraftBtn.disabled = isDraft;
    ui.saveDraftBtn.disabled = !isDraft;
    ui.cancelDraftBtn.disabled = !isDraft;
}

// ==========================================
// 5. ЛОГИКА РАБОТЫ С ДАННЫМИ
// ==========================================

// Добавление продукта
function addProduct(name, category) {
    if (!name.trim() || hasProduct(name)) {
        return;
    }

    const newProduct = {
        id: Date.now(), // Уникальный ID
        name: name.trim(),
        category: category.trim() || "Разное",
        bought: false
    };

    getActiveProducts().push(newProduct);
    renderProducts();
}
// Переключение состояния bought
function toggleProduct(id) {
    const activeList = getActiveProducts();
    const product = activeList.find(item => item.id === id);

    if (product) {
        product.bought = !product.bought;
        renderProducts();
    }
}

// Черновик (Глубокая копия)
function createDraft() {
    draftProducts = structuredClone(products);
    renderProducts();
}

function saveDraft() {
    if (draftProducts !== null) {
        products = draftProducts;
        draftProducts = null;
        renderProducts();
    }
}

function cancelDraft() {
    if (draftProducts !== null) {
        draftProducts = null;
        renderProducts();
    }
}

// ==========================================
// 6. СОБЫТИЯ (LISTENERS)
// ==========================================

// Отправка формы
ui.form.addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct(ui.inputName.value, ui.inputCategory.value);
    ui.inputName.value = "";
    ui.inputCategory.value = "";
    ui.inputName.focus();
});

// Клик по элементу списка (Делегирование)
ui.list.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li || !ui.list.contains(li)) return;

    const id = Number(li.dataset.id);
    toggleProduct(id);
});

// Фильтры
ui.filterAllBtn.addEventListener("click", () => {
    currentFilter = "all";
    renderProducts();
});

ui.filterNeedBtn.addEventListener("click", () => {
    currentFilter = "need";
    renderProducts();
});

ui.filterBoughtBtn.addEventListener("click", () => {
    currentFilter = "bought";
    renderProducts();
});

// Черновик
ui.createDraftBtn.addEventListener("click", createDraft);
ui.saveDraftBtn.addEventListener("click", saveDraft);
ui.cancelDraftBtn.addEventListener("click", cancelDraft);

// Первоначальный рендер
renderProducts();