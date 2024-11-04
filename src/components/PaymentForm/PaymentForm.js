import React, { useState } from 'react';
import { validateForm } from '../../utils/validation';
import FormInput from '../FormInput/FormInput';
import { sendPaymentData } from '../../features/api';
import styles from './PaymentForm.module.css';

function PaymentForm({ initiator, goal, email }) {
  const [form, setForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
    name: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'name' || name === 'message') && value.length > 50) {
      setForm((prevForm) => ({ ...prevForm, [name]: value.slice(0, 50) }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    sendPaymentData(form, initiator, goal, email);

    setNotification('Данные успешно отправлены.');
  };

  return (
    <div className={styles.container}>
      {notification && <div className={styles.notification}>{notification}</div>}
      <span className={styles.title}>
        {initiator} собирает на «{goal}»
      </span>
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Номер карты"
          id="cardNumber"
          name="cardNumber"
          placeholder="Введите номер карты"
          value={form.cardNumber}
          onChange={handleChange}
          error={errors.cardNumber}
          mask="9999 9999 9999 9999"
          maskChar=""
        />

        <div className={styles.inlineGroup}>
          <FormInput
            label="Срок действия"
            id="expiryDate"
            name="expiryDate"
            placeholder="ММ/ГГ"
            value={form.expiryDate}
            onChange={handleChange}
            error={errors.expiryDate}
            mask="99/99"
            maskChar=""
            className={styles.inlineInput}
          />
          <FormInput
            label="CVV"
            id="cvv"
            name="cvv"
            placeholder="Введите CVV"
            value={form.cvv}
            onChange={handleChange}
            error={errors.cvv}
            type="password"
            maxLength="3"
            className={styles.inlineInput}
          />
        </div>

        <FormInput
          label="Сумма перевода"
          id="amount"
          name="amount"
          placeholder="Введите сумму"
          value={form.amount}
          onChange={handleChange}
          error={errors.amount}
          suffix="₽"
          isCurrency={true}
        />

        <FormInput
          label="Ваше имя"
          id="name"
          name="name"
          placeholder="Введите имя"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          maxLength="50"
        />

        <FormInput
          label="Сообщение получателю"
          id="message"
          name="message"
          placeholder="Введите сообщение"
          value={form.message}
          onChange={handleChange}
          error={errors.message}
          maxLength="50"
        />

        <div className={styles.buttonsGroup}>
          <button type="submit" className={styles.submitButton}>
            Перевести
          </button>
          <button
            type="button"
            className={styles.returnButton}
            onClick={() => console.log('Возврат на предыдущую страницу')}
          >
            Вернуться
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;