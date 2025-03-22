import { useEffect, useState } from 'react'; // Убедись, что путь к компоненту правильный
import { IUsers } from './types/Users/Users.interface';
import Card from './components/Card/Card';

function App() {
  const [userData, setUserData] = useState<IUsers | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //@ts-ignore
    const tg = window.Telegram?.WebApp;
    if (!tg) {
      setError('Не в Telegram Web App');
      return;
    }

    fetch(
      'https://4442-2a0c-16c2-500-631-00-c574.ngrok-free.app/auth/authenticate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          tg_init_data: tg.initData, // Передаем Telegram initData
        },
      },
    )
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className='App'>
      <h1>Данные пользователя:</h1>
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      {userData ? (
        <Card {...userData} /> // Передаем все данные в UserCard
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default App;
