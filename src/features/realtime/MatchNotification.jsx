import {supabase} from '@lib/supabase';
const channel = supabase.channel('main')

export function MatchNotification () {
  const handleClick = function () {
    console.log('clicked')
    channel.subscribe((status) => {
      console.log('status', status)
      if (status !== 'SUBSCRIBED') {
        return null
      }

      console.log('before', channel)

      channel.send({
        type: 'broadcast',
        event: 'test',
        payload: { message: 'Hello from the client!' },
      })

      console.log('after')
    })
  }

  return (
    <button onClick={handleClick}>Match</button>
  )
}