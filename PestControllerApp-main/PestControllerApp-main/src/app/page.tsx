'use client'

import { NextPage } from 'next'
import { LoadingUI } from '../../packages/components'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (window !== undefined) {
      router.push('/services')
    }
  }, [router])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <LoadingUI />
    </div>
  )
}

export default Home
