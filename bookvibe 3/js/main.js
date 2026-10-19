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