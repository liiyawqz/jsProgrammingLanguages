document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
  
    if (orderForm) {
      const regexFIO = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,100}$/;
      const regexPhone = /^\+?[0-9\s\-\(\)]{7,18}$/;
      const regexEmail = /^[a-zA-R0-9._%+-]+@[a-zA-R0-9.-]+\.[a-zA-R]{2,}$/;
  
      const fioInput = document.getElementById('fio');
      const phoneInput = document.getElementById('phone');
      const emailInput = document.getElementById('email');
  
      function validateInput(input, regex, errorEl, errorMessage) {
        const value = input.value.trim();
        if (!regex.test(value)) {
          input.classList.add('invalid');
          input.classList.remove('valid');
          errorEl.textContent = errorMessage;
          return false;
        } else {
          input.classList.remove('invalid');
          input.classList.add('valid');
          errorEl.textContent = '';
          return true;
        }
      }
  
      fioInput?.addEventListener('input', () => {
        validateInput(fioInput, regexFIO, document.getElementById('fio-error'), 'Введите корректное ФИО');
      });
  
      phoneInput?.addEventListener('input', () => {
        validateInput(phoneInput, regexPhone, document.getElementById('phone-error'), 'Введите корректный номер телефона');
      });
  
      emailInput?.addEventListener('input', () => {
        validateInput(emailInput, regexEmail, document.getElementById('email-error'), 'Введите корректный email');
      });
  
      orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const isFioValid = validateInput(fioInput, regexFIO, document.getElementById('fio-error'), 'Заполните правильно ФИО!!!');
        const isPhoneValid = validateInput(phoneInput, regexPhone, document.getElementById('phone-error'), 'Заполните правильно телефон!!!');
        const isEmailValid = validateInput(emailInput, regexEmail, document.getElementById('email-error'), 'Заполните правильно email!!');
  
        if (isFioValid && isPhoneValid && isEmailValid) {
          alert('Заказ успешно оформлен! Спасибо за покупку.');
          orderForm.reset();
          [fioInput, phoneInput, emailInput].forEach(el => el.classList.remove('valid', 'invalid'));
        }
      });
    }
  });


  document.addEventListener('DOMContentLoaded', async () => {
    const view = document.querySelector('[data-js="book-view"]');
    if (!view) return; 
  
    const GENRES = {
      classic: 'Классика',
      scifi: 'Фантастика',
      fantasy: 'Фэнтези',
      dystopia: 'Антиутопия',
      detective: 'Детектив',
      nonfiction: 'Нон-фикшн'
    };
  
    const id = Number(new URLSearchParams(location.search).get('id')) || 1;
  
    if (location.protocol === 'file:') {
      view.innerHTML =
        '<div class="panel"><h3>Откройте сайт через Live Server</h3>' +
        '<p>Страница открыта как файл (file://), браузер блокирует загрузку JSON. ' +
        'Запустите сайт через расширение Live Server в VS Code.</p></div>';
      return;
    }
  
    let books;
    try {
      const res = await fetch('data/books.json');
      if (!res.ok) throw new Error(`books.json не найден (код ${res.status}). Проверьте путь data/books.json`);
      books = await res.json();
    } catch (err) {
      console.error(err);
      view.innerHTML =
        `<div class="panel"><h3>Ошибка загрузки данных</h3><p>${err.message}</p></div>`;
      return;
    }
  
    const book = books.find(b => b.id === id);
    if (!book) {
      view.innerHTML =
        '<div class="panel"><h3>Книга не найдена</h3>' +
        '<p><a href="catalog.html">Вернуться в каталог</a></p></div>';
      return;
    }
  
    try {
      renderBook(book);
      renderRelated(book, books);
    } catch (err) {
      console.error(err);
      view.innerHTML =
        `<div class="panel"><h3>Ошибка отображения</h3><p>${err.message}</p></div>`;
    }
  
    function renderBook(book) {
      document.title = `${book.title} — Книжный Вайб`;
  
      const cover = document.querySelector('[data-js="book-cover"]');
      cover.src = book.cover;
      cover.alt = `Обложка книги ${book.title}`;
      cover.className = `cover g${book.id}`;
  
      document.querySelector('[data-js="book-title"]').textContent = book.title;
      document.querySelector('[data-js="book-author"]').textContent = book.author;
  
      const genreLink = document.querySelector('[data-js="book-genre"]');
      genreLink.textContent = GENRES[book.genre] || book.genre;
      genreLink.href = `catalog.html?genre=${book.genre}`;
  
      const stars = document.querySelector('[data-js="book-stars"]');
      stars.style.setProperty('--r', book.rating);
      stars.setAttribute('aria-label', `Рейтинг ${book.rating} из 5`);
  
      document.querySelector('[data-js="book-rating-text"]').textContent = `${book.rating} из 5`;
      document.querySelector('[data-js="book-description"]').textContent = book.description;
      document.querySelector('[data-js="book-price"]').textContent = `${book.price} сом`;
  
      const info = document.querySelector('[data-js="book-info"]');
      info.dataset.bookId = book.id;
      info.dataset.genre = book.genre;
      info.dataset.rating = book.rating;
      info.dataset.price = book.price;
      info.dataset.author = book.author;
    }
  
    function renderRelated(current, books) {
      const grid = document.querySelector('[data-js="related-grid"]');
      if (!grid) return;
  
      const others = books.filter(b => b.id !== current.id);
      const same = others.filter(b => b.genre === current.genre);
      const rest = others.filter(b => b.genre !== current.genre);
      const related = [...same, ...rest].slice(0, 4);
  
      grid.innerHTML = related.map(b => `
        <article class="card" data-book-id="${b.id}" data-genre="${b.genre}"
                 data-rating="${b.rating}" data-price="${b.price}" data-author="${b.author}">
          <a href="book.html?id=${b.id}">
            <img class="cover g${b.id}" src="${b.cover}" alt="Обложка книги ${b.title}">
          </a>
          <div>
            <h3><a href="book.html?id=${b.id}">${b.title}</a></h3>
            <p class="by">${b.author}</p>
          </div>
          <div class="row">
            <span class="stars" style="--r:${b.rating}" aria-label="Рейтинг ${b.rating} из 5"></span>
            <b>${b.price} сом</b>
          </div>
          <div class="acts">
            <button class="btn sm" data-js="add-to-cart">В корзину</button>
            <button class="btn sm ghost" data-js="mark-read">Прочитано</button>
          </div>
        </article>
      `).join('');
    }
  });