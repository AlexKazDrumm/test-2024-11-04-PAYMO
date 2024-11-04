export const validateForm = (form) => {
  const errors = {};

  if (!form.cardNumber) {
    errors.cardNumber = 'Введите номер карты';
  } else {
    const digits = form.cardNumber.replace(/\s/g, '');
    if (digits.length !== 16) {
      errors.cardNumber = 'Номер карты должен содержать 16 цифр';
    } else {
      let sum = 0;
      let shouldDouble = false;

      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits.charAt(i), 10);

        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
      }

      if (sum % 10 !== 0) {
        errors.cardNumber = 'Неверный номер карты';
      }
    }
  }

  if (!form.expiryDate) {
    errors.expiryDate = 'Введите срок действия карты';
  } else if (form.expiryDate.length !== 5) {
    errors.expiryDate = 'Неверный формат срока действия';
  } else {
    const [month, year] = form.expiryDate.split('/');
    if (!month || !year || isNaN(month) || isNaN(year)) {
      errors.expiryDate = 'Неверный формат срока действия';
    } else {
      const monthNum = parseInt(month, 10);
      if (monthNum < 1 || monthNum > 12) {
        errors.expiryDate = 'Неверный месяц в сроке действия';
      }
    }
  }

  if (!form.cvv) {
    errors.cvv = 'Введите CVV';
  } else if (!/^\d{3}$/.test(form.cvv)) {
    errors.cvv = 'CVV должен состоять из 3 цифр';
  }

  const amount = parseFloat(form.amount);
  if (!amount) {
    errors.amount = 'Введите сумму перевода';
  } else if (amount < 10) {
    errors.amount = 'Сумма должна быть не менее 10 рублей';
  }

  if (!form.name) {
    errors.name = 'Введите ваше имя';
  } else if (form.name.length > 50) {
    errors.name = 'Имя не должно превышать 50 символов';
  }

  if (form.message && form.message.length > 50) {
    errors.message = 'Сообщение не должно превышать 50 символов';
  }

  return errors;
};