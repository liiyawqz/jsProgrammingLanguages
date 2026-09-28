// ✳️ Написать приложение Counter (Счетчик).Логика у приложения следующая: если число больше нуля, то оно должно быть зеленого цвета, если ноль то серого, если меньше нуля то красного. Должны быть 3 кнопки как на скриншоте: увеличить, сбросить, уменьшить.
// Дизайн на ваш вкус


// let number = 0;
// function checkNumber(){
//     let getNumber = document.getElementById('number')
//     if (number > 0){
//         getNumber.style.color = 'green';
//     }else if (number ===0){
//         getNumber.style.color = 'grey';
//     }else{
//         getNumber.style.color = 'red';

//     }

//     getNumber.textContent = number;

// }

// function plus(){
//     number++;
//     checkNumber();

// }
// function min(){
//     number--;
//     checkNumber();

// }
// function reset(){
//     number = 0;
//     checkNumber();
// }


// Создать приложение "Лото". Приложение должно по нажатию на кнопку генерировать 6 случайных чисел (от 1 до 99) и выводить их на интерфейс. Каждое число должно быть в двузначном формате, то есть вместо 5 вывести 05, если 25 то просто 25. Дизайн приложения на ваш вкус,  ВАЖНО: кружки с числами надо создавать через JavaScript.
// Подсказка: функция которая сгенерирует случайное число в диапазоне:

// function getRandomInt(min, max) {
// min = Math.ceil(min);
// max = Math.floor(max);
// return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let button = document.getElementById("generate");
let numbers = document.getElementById("numbers");

button.addEventListener("click", function() {

    numbers.innerHTML = "";

    for (let i = 0; i < 6; i++) {

        let number = getRandomInt(1, 99);

        let circle = document.createElement("div");

        circle.classList.add("number");

        circle.textContent = number.toString().padStart(2, "0");

        numbers.appendChild(circle);
    }
});