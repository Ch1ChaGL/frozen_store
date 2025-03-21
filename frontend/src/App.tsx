import { useEffect, useState } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

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
    alert(tg.initData);
    fetch('https://65cd-128-140-117-243.ngrok-free.app/hello/getUserData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // любое значение
        'ngrok-skip-browser-warning': 'true',
        initData: tg.initData, // Передаём Telegram initData
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
