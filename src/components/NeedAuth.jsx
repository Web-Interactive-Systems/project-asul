import { useState, useEffect } from 'react';
import sessionStore from '@/store/session';
import { useStore } from '@nanostores/react';

export default function NeedAuth({ children, fallback = <p>You are not logged in</p> }) {
  const [mounted, setMounted] = useState(false);
  const session = useStore(sessionStore);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!session) {
    return fallback;
  }

  return children;
}
