// import {
//     products
// } from "./Fridge.js";



let products = [
    { id: 1, name: "Молоко",
         category: "Молочные продукты",
          bought: false 
        },
    { id: 2, name: "Хлеб",
         category: "Выпечка",
          bought: true 
        },
    { id: 3, name: "Сыр",
        category: "Молочные продукты",
         bought: false 
        },
    { id: 4, name: "Яблоки",
         category: "Фрукты",
          bought: false
         }
];

let currentFilter = "all"; // "all", "need", "bought"
let draftProducts = null;  // Черновик (null, если черновик не активен)

const app = document.querySelector("#app");


function createUI(app) {
    const title = document.createElement("h1");
    title.textContent = "Список продуктов";
     
    app.append(title); //добавить в  DOM после элемента,  prepend - перед элементом
    
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
     filterAllBtn.type = "button"; // Лучше "button", иначе она тоже будет отправлять форму
     filterAllBtn.textContent = "Все продукты";
 

    const filterNeedBtn = document.createElement("button");
filterNeedBtn.type = "button";
filterNeedBtn.textContent = "Нужно купить";


     const filterBoughtBtn = document.createElement("button");
    filterBoughtBtn.type = "button";
    filterBoughtBtn.textContent = "Куплено";

    filterContainer.append(filterAllBtn, filterNeedBtn, filterBoughtBtn );
    
    const list = document.createElement("ul");
    app.append(form, filterContainer, list, );
  
    
     return {
        form,
        inputName,
        inputCategory,
        list,
        // draftBanner,
        filterAllBtn,
        filterNeedBtn,
        filterBoughtBtn,
        createDraftBtn,
        // saveDraftBtn,
        // cancelDraftBtn
    };

}
const ui = createUI(app);


function normalizeProductName(productName) {
    return productName.trim().toLowerCase();    //trim - убирает пробелы в начале и в конце строки, toLowerCase - переводит все буквы в маленькие
}

function hasProduct(productName) {
    const normalizedName = normalizeProductName(productName);
    return products.some(product => normalizeProductName(product) === normalizedName)
}

function addProduct(productName) {
    if (hasProduct(productName) || !productName) {
        return
    }
    const newProduct = {
        id: Date.now(), // Уникальный ID
        name: name.trim(),
        category: category.trim() || "Разное",
        bought: false
    };
    products.push(newProduct);
    const li = document.createElement("li");
    li.textContent = productName;
    list.append(li);
}
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
function handleAddProductFromList() {
    const uniqueProducts = [...new Set(productsFromList)];
    console.log("Before for Each", uniqueProducts);
    //new Set === Новый Set, [...new Set(productsFromList)] => новый массив
    productsFromList.forEach(addProduct);
    console.log(uniqueProducts);
}

addFromListButton.addEventListener("click", handleAddProductFromList);

list.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li || !list.contains(li)) {
        return

    }
    event.target.classList.toggle("bought");
});
// Переключение состояния bought
function toggleProduct(id) {
    const activeList = getActiveProducts();
    const product = activeList.find(item => item.id === id);

    if (product) {
        product.bought = !product.bought;
        renderProducts();
    }
}

function handleSubmit(e) {
    e.preventDefault(); // отменяет стандартное поведение браузера при отправке формы
    const productName = input.value.trim(); // trim - убирает пробелы в начале и в конце строки 
    addProduct(productName);
    input.value = "";// очищает поле ввода после добавления продукта
    input.focus();
}

//addEventListener
form.addEventListener("submit", handleSubmit); // submit - событие отправки формы, handleSubmit - функция, которая будет вызвана при этом событии

