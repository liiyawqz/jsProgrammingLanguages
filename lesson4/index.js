// ✳️ Написать приложение Counter (Счетчик).Логика у приложения следующая: если число больше нуля, то оно должно быть зеленого цвета, если ноль то серого, если меньше нуля то красного. Должны быть 3 кнопки как на скриншоте: увеличить, сбросить, уменьшить.
// Дизайн на ваш вкус


let number = 0;
function checkNumber(){
    let getNumber = document.getElementById('number')
    if (number > 0){
        getNumber.style.color = 'green';
    }else if (number ===0){
        getNumber.style.color = 'grey';
    }else{
        getNumber.style.color = 'red';

    }

    getNumber.textContent = number;

}

function plus(){
    number++;
    checkNumber();

}
function min(){
    number--;
    checkNumber();

}
function reset(){
    number = 0;
    checkNumber();
}