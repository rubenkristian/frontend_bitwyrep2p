import { signal, useSignal } from '@preact/signals-react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const count = signal(0);
export default function Home() {  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button onClick={() => count.value++}>+1</button>
      value {count}
    </main>
  )
}
