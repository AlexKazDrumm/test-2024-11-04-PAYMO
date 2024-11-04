import React from 'react';
import PaymentForm from './components/PaymentForm/PaymentForm';
import './App.css';

function App() {
  const initiator = 'Иван К.';
  const goal = 'Экскурсия';
  const email = 'example@example.com';

  return (
    <div className="App">
      <PaymentForm initiator={initiator} goal={goal} email={email} />
    </div>
  );
}

export default App;