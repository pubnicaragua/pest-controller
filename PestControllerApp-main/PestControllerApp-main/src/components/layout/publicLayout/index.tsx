import { useEffect, useState } from 'react'
import LandingPage from '../landing'
import { PublicLayoutProps } from './types'

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, showLanding }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    if (window !== undefined) {
      if (window.screen.width <= 620) setIsMobile(true)
    }
  }, [])

  if (isMobile && showLanding) return <LandingPage />

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-no-repeat bg-center bg-cover bg-mobile lg:bg-[url('../../public/images/auth-background.png')] px-5 lg:px-2"
      style={{
        backgroundImage:
          'background-image:linear-gradient(rgba(135, 80, 156, 0.9), rgba(135, 80, 156, 0.9)), url(img/hero-bg.jpg)',
      }}
    >
      <div className="lg:bg-white lg:shadow-xl px-4 pt-12 pb-6 rounded-lg min-w-[40%] min-h-[50%] lg:max-w-[40%]">
        {children}
      </div>
    </div>
  )
}

export default PublicLayout
