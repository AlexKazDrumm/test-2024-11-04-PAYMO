import sha256 from 'crypto-js/sha256';

export const sendPaymentData = (formData, initiator, goal, email) => {
  const transactionId = Date.now().toString();
  const apiKey = process.env.REACT_APP_API_KEY;
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const amountInCents = parseFloat(formData.amount) * 100;
  const hashString = `${apiKey}${transactionId}${amountInCents}${secretKey}`;
  const hashSum = sha256(hashString).toString();

  const data = {
    api_key: apiKey,
    transaction: transactionId,
    description: `Платеж для ${goal}`,
    amount: formData.amount,
    email: email,
    custom_data: {
      initiator,
      goal,
      name: formData.name,
      message: formData.message,
    },
    hash_sum: hashSum,
  };

  console.log('Отправка данных:', data);

  return data;
};