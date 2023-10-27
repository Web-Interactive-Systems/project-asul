import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';

export default function NeedAuth({ children, fallback = <p>You are not logged in</p> }) {
  const [mounted, setMounted] = useState(false);
  const session = useStore($userSession);

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
