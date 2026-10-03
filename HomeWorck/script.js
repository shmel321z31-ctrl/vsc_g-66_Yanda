// Находим нужные элементы на странице
const input = document.getElementById('productInput');
const button = document.getElementById('addButton');
const list = document.getElementById('productList');

// 1. Формулируем саму функцию (описываем, ЧТО нужно сделать)
 export function addProduct() {
    const productName = input.value; 
    
    if (productName !== '') {
        const newLi = document.createElement('li'); 
        newLi.textContent = productName; 
        list.appendChild(newLi); 
        input.value = ''; 
    }
}

// 2. Привязываем готовую функцию к клику по кнопке
button.addEventListener('click', addProduct);