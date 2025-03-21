import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://f8bf-128-140-117-243.ngrok-free.app/hello/getHello', {
      headers: {
        'ngrok-skip-browser-warning': 'true', // любое значение
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
        }
        return res.text();
      })
      .then(data => {
        setResponse(JSON.parse(data));
      })
      .catch(err => {
        setError(err.message);
        setResponse(null); // Обнуляем response, если есть ошибка
      });
  }, []);

  return (
    <div className='App'>
      <h1>Ответ с сервера:</h1>
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      {response ? <p>{response.message}</p> : !error && <p>Загрузка...</p>}
    </div>
  );
}

export default App;
