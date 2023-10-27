import { useState, useEffect } from 'react';
export function useNonce() {
  const [nonce, setNonce] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const rand = crypto.getRandomValues(new Uint8Array(16));
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      const nonceBytes = encoder.encode(decoder.decode(rand));
      const hash = await window.crypto.subtle.digest('SHA-256', nonceBytes);
      const hashed = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      setNonce({ nonce: decoder.decode(rand), hashed });
      setLoading(false);
    })();
  }, []);

  return [nonce, loading];
}
