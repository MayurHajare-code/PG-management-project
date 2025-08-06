import { useEffect, useState } from 'react';
import API from '../api';

function Home() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.get('/home')
      .then(res => setMsg(res.data))
      .catch(() => setMsg('Not authenticated.'));
  }, []);

  return (
    <div>
      <h2>{msg}</h2>
    </div>
  );
}

export default Home;
