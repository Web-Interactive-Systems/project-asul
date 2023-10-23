import { useState, useEffect } from 'react';
export function useNonce() {
  const [nonce, setNonce] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/data/nonce')
      .then((res) => res.json())
      .then((data) => setNonce(data.nonce))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  return [nonce, loading];
}
