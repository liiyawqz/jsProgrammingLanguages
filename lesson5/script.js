const users = [
    { login: "aliya",   
      password: "1111",  
      name: "Алия" },

    { login: "ais",  
      password: "2222",   
      name: "Айс" },

    { login: "saule",   
      password: "3333",   
      name: "Сауле" },

    { login: "kuba",   
      password: "4444",   
      name: "Куба" },

    { login: "sake",  
      password: "5555",   
      name: "Саке" },

    { login: "bema",   
      password: "6666",   
      name: "Бема" },

    { login: "alym", 
      password: "7777",   
      name: "Алым" },

    { login: "admin",  
      password: "admin1", 
      name: "Администратор" }
  ];
  
  const form = document.getElementById("form");
  const msg = document.getElementById("msg");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value;
  
    const user = users.find(u => u.login === login && u.password === password);
  
    if (user) {
      msg.className = "ok";
      msg.textContent = `Добро пожаловать, ${user.name}! Вы успешно авторизованы.`;
    } else {
      msg.className = "err";
      msg.textContent = "Ошибка: неверный логин или пароль.";
    }
  });
  

  const hints = document.getElementById("hints");
  users.forEach(u => {
    const li = document.createElement("li");
    li.innerHTML = "<code></code>";
    li.firstChild.textContent = `${u.login} / ${u.password}`;
    hints.appendChild(li);
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