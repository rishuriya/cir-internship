import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Error() {

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 4000)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundImage: "url('/img/register_bg_2.png')", }}>
      <div className='flex justify-center items-center' style={{ width: '100vw', height: '100vh' }}>
        <h1 className='font-fuzzyBubble text-2xl font-bold'>This page doesn&apos;t seem to exist</h1>
      </div>
    </div>
  )
}