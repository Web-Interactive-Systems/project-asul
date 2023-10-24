import { useState, useEffect } from 'react';
export function useNonce() {
  const [nonce, setNonce] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const rand = crypto.getRandomValues(new Uint8Array(32));
      const nonce = btoa(String.fromCharCode(...rand));
      const hashed = await crypto.subtle.digest('SHA-256', rand);
      console.log('nonce', nonce);
      setNonce({ nonce, hashed });
      setLoading(false);
    })();
  }, []);

  return [nonce, loading];
}
