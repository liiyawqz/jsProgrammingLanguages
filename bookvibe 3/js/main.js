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




(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  document.addEventListener('mouseover', function (e) {
    const card = e.target.closest('.card');
    if (card && !card.contains(e.relatedTarget)) {
      card.classList.add('is-hover');
    }
  });

  document.addEventListener('mouseout', function (e) {
    const card = e.target.closest('.card');
    if (card && !card.contains(e.relatedTarget)) {
      card.classList.remove('is-hover');
    }
  });

  function flyToCart(button) {
    const badge = document.querySelector('[data-js="cart-count"]');
    if (!badge) return;

    const from = button.getBoundingClientRect();
    const to = badge.getBoundingClientRect();

    if (!reduceMotion) {
      const plus = document.createElement('div');
      plus.classList.add('fly-plus');
      plus.textContent = '+1';
      plus.style.left = from.left + from.width / 2 - 14 + 'px';
      plus.style.top = from.top + 'px';
      document.body.appendChild(plus);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          const dx = to.left - from.left - from.width / 2 + 14;
          const dy = to.top - from.top;
          plus.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(.4)';
          plus.style.opacity = '0';
        });
      });

      setTimeout(function () {
        plus.remove();
      }, 850);
    }

    setTimeout(function () {
      badge.classList.add('bump');
      setTimeout(function () {
        badge.classList.remove('bump');
      }, 400);
    }, reduceMotion ? 0 : 700);
  }

  function starBurst(button) {
    if (reduceMotion) return;
    const rect = button.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
      const star = document.createElement('span');
      star.classList.add('star-burst');
      star.textContent = '★';
      star.style.left = cx + 'px';
      star.style.top = cy + 'px';

      const angle = (Math.PI * 2 * i) / 8;
      const distance = getRandomNumber(40, 80);
      star.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
      star.style.setProperty('--dy', Math.sin(angle) * distance + 'px');

      document.body.appendChild(star);
      setTimeout(function () {
        star.remove();
      }, 700);
    }
  }

  document.addEventListener('click', function (e) {
    const addBtn = e.target.closest('[data-js="add-to-cart"]');
    if (addBtn) flyToCart(addBtn);

    const readBtn = e.target.closest('[data-js="mark-read"]');
    if (readBtn) starBurst(readBtn);
  });

  const hero = document.querySelector('.hero');
  const stack = document.querySelector('.stack');

  if (hero && stack && !reduceMotion) {
    hero.addEventListener('mousemove', function (e) {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5; 
      const y = (e.clientY - r.top) / r.height - 0.5;
      stack.style.transform =
        'translate(' + x * 24 + 'px, ' + y * 24 + 'px) rotate(' + x * 4 + 'deg)';
    });

    hero.addEventListener('mouseleave', function () {
      stack.style.transform = '';
    });
  }
})();