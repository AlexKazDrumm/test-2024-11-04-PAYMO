import React from 'react';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field';
import styles from './FormInput.module.css';

function FormInput({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  mask,
  maskChar,
  maxLength,
  className,
  suffix,
  isCurrency = false,
}) {
  return (
    <div className={`${styles.formGroup} ${error ? styles.error : ''} ${className || ''}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {isCurrency ? (
        <CurrencyInput
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          decimalsLimit={2}
          onValueChange={(val) => onChange({ target: { name, value: val } })}
          suffix={suffix}
          className={styles.input}
        />
      ) : mask ? (
        <InputMask
          mask={mask}
          maskChar={maskChar}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.input}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={styles.input}
        />
      )}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default FormInput;