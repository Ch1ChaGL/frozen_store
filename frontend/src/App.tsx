import { useEffect, useState } from 'react';

function App() {
  const [userData, setUserData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //@ts-ignore
    const tg = window.Telegram?.WebApp;
    if (!tg) {
      setError('Не в Telegram Web App');
      return;
    }

    fetch('https://d1d9-2a01-e5c0-5317-00-2.ngrok-free.app/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // любое значение
        'ngrok-skip-browser-warning': 'true',
        tg_init_data: tg.initData, // Передаём Telegram initData
      },
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className='App'>
      <h1>Данные пользователя:</h1>
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      {userData ? (
        <p>{JSON.stringify(userData, null, 2)}</p>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default App;
