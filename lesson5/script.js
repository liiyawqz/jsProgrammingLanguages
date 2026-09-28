let users = [
  {
      login: "aliia",
      password: "1234",
      name: "Aliia"
  },
  {
      login: "admin",
      password: "admin",
      name: "Администратор"
  },
  {
      login: "student",
      password: "1111",
      name: "Студент"
  },
  {
      login: "user",
      password: "2222",
      name: "Пользователь"
  },
  {
      login: "test",
      password: "0000",
      name: "Тестовый пользователь"
  }
];

let button = document.getElementById("loginButton");
let message = document.getElementById("message");

button.addEventListener("click", function() {

  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;

  let user = users.find(function(user) {
      return user.login === login && user.password === password;
  });

  if (user) {
      message.textContent = "Добро пожаловать, " + user.name + "!";
  } else {
      message.textContent = "Неверный логин или пароль";
  }
});

//   Написать функцию которая считает сумму параметров переданных в функцию. Передавать можно сколько угодно параметров. Например: sumAll(2,5,6,7) -> 20; sumAll(1,2,3,4,5,6,7,8,9,10) -> 55

  function sumAll() {
    let sum = 0;

    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }

    return sum;
}

console.log(sumAll(2, 5, 6, 7)); 
console.log(sumAll(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); 