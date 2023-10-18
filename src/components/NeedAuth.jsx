import useSession from '@/hooks/useSession';

export default function NeedAuth({ children, fallback = <p>You are not logged in</p> }) {
  const [session, loading] = useSession();
  console.log(session);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (!session) {
    return fallback;
  }

  return children;
}
