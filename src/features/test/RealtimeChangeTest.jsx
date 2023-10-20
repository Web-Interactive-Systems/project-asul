import { broadcast, postgres } from "@/lib/supabase"

export function RealtimeChangeTest () {
  broadcast.notifications.on('edt-change', (payload) => {
    console.log('edt-change', payload)
  })
  broadcast.notifications.on('info', (payload) => {
    console.log('info', payload)
  })
  postgres.match.on('INSERT', (payload) => {
    console.log('match insert', payload)
  })
  postgres.test.on('INSERT', (payload) => {
    console.log('test insert', payload)
  })
  postgres.test.on('DELETE', (payload) => {
    console.log('test delete', payload)
  })
}