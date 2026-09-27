// ✳️ Написать функцию которая генерирует массив из чисел в определенном диапазоне с определенным шагом (по умолчанию 1). Например: getRange(1, 10) -> [1,2,3,4,5,6,7,8,9,10]; getRange(10, 30, 5) -> [10,15,20,25,30].



function range(start, end, step = 1) {
    let result = [];

    for (let i = start; i <= end; i += step) {
        result.push(i);
    }

    return result;
}
console.log(range(10, 30, 5));


// ✳️ Написать функцию переворота строки. СТАНДАРТНУЮ ФУНКЦИЮ REVERSE НЕ ИСПОЛЬЗОВАТЬ. Например: myReverse("123456789") -> "987654321". ПОДСКАЗКА: нужно запустить цикл со счетчиком в обратную сторону через оператор - -, то есть от например 10 до 0 (10..9..8..7..6..5..4..3..2..1)


function myReverse(str) {
    let result = "";
    for (let i = str.length - 1; i >= 0; i--) {
        result = result + str[i];
    }
    return result;
}
console.log(myReverse("123456789"));


// ✳️ Написать функцию которая маскирует номер банковской карты. Например: maskCard("4815154823541789") -> "481515XXXXXX1789". Должны быть видны первые 6 и последние 4 символа, остальные скрыть символом(по умолчанию Х). Причем сделать так чтобы скрывающий символ можно было передавать как параметр. Например: maskCard("4815154823541789", "*") -> "481515******1789".



function mask(card, symbol = "X") {
    let result = "";
    for (let i = 0; i < card.length; i++) {
        if (i < 6 || i >= card.length - 4) {
            result = result + card[i];
        } else {
            result = result + symbol;
        }
    }
    return result;
}
console.log(mask("4815154823541789"));