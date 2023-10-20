import { broadcast, supabase } from '@/lib/supabase';
import { useState } from 'react';

export function RealtimeFormTest () {
  const [inputValue, setInputValue] = useState('')
  const [inputValue2, setInputValue2] = useState('')

  const add = async () => {
    await supabase.from('Match').insert({
      title: inputValue,
    })
    console.log('added match')
    setInputValue('')
  }

  const add2 = async () => {
    await supabase.from('Test').insert({
      title: inputValue2,
    })
    console.log('added test')
    setInputValue2('')
  }

  return <>
    <button onClick={() => broadcast.notifications.send('info', '*', [1, 2, 3])}>
        Send notif
    </button>
    <button onClick={() => broadcast.notifications.send('edt-change', '*', [1, 2, 3])}>
        Send edt change
    </button>
    <br/>
    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    <button onClick={add}>Ajouter match</button>
    <input value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} />
    <button onClick={add2}>Ajouter test</button>
  </>
}