
//b. напишите функцию, transfer, которая получает два счета,
//  и выполняет перевод между счетами вызывая методы deposit 
//  и Откажитесь соответственно.


//--------------------------------> b <--------------------------


class iban {
  constructor(iban, owner, balance) {
    this.iban = iban;
    this.owner = owner;
    this.balance = balance;
  }

  // Метод снятия денег
  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
  // Метод пополнения счета
  deposit(amount) {
    this.balance += amount;
  }

  // Метод получения текущего баланса
  getBalance() {
    return this.balance;
  }
}


function transfer(sender, receiver, amount) {
  console.log(`\n--- Попытка перевода ${amount} от ${sender.owner} к ${receiver.owner} ---`);
  
  // Проверяем, хватает ли денег у отправителя
  if (sender.balance >= amount) {
    sender.withdraw(amount);   // Снимаем у одного
    receiver.deposit(amount);  // Кладем другому
    console.log(" Перевод успешно завершен!");
  } else {
    console.log(" Перевод отклонен: недостаточно средств.");
  }
}   // <--- Закрываем функцию ЗДЕСЬ
  // Создание нескольких объектов счетов
const account1 = new iban("DE8937040044013000", "Кеша Питерский", 1000);//при помощи оператора new , мы вводим 
const account2 = new iban("FR1420041010001302606", "Пётр Кукушкин", 500);//данныее  в конструктор

// Создание массива из счетов
const accountsList = [account1, account2];// — это метод переменной в кот. находятся массивы

transfer(accountsList[1],accountsList[0],100);

// Выводим итоговую информацию по всем счетам
console.log("\n=== ИТОГОВОЕ СОСТОЯНИЕ СЧЕТОВ ===");
accountsList.forEach((acc, index) => {
  console.log(`Счёт #${index + 1}:`);
  console.log(`  Владелец: ${acc.owner}`);
  console.log(`  IBAN: ${acc.iban}`);
  console.log(`  Баланс: ${acc.getBalance()}`);
  console.log("---------------------------------");
});
