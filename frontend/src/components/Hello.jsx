import { useState, useEffect } from 'react';
import api from '../services/api';

function Hello() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchHello();
  }, []);

  const fetchHello = async () => {
    try {
      const response = await api.get('/hello');
      setMessage(response.data);
    } catch (error) {
      console.error('Error fetching hello:', error);
    }
  };

  const fetchHelloWithName = async () => {
    if (!name.trim()) return;
    try {
      const response = await api.get(`/hello/${name}`);
      setMessage(response.data);
    } catch (error) {
      console.error('Error fetching hello with name:', error);
    }
  };

  return (
    <div className="hello-component">
      <h2>Hello Component</h2>
      <p>{message}</p>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={fetchHelloWithName}>Greet</button>
      </div>
    </div>
  );
}

export default Hello;
