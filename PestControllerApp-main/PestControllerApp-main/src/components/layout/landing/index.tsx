/* eslint-disable @next/next/no-img-element */
import { LoadingUI } from '../../../../packages/components'

const LandingPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-mobile">
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="w-80 h-auto mb-10">
          <img src="/images/pest-logo-2.png" alt="pest controller logo" />
        </div>
        <div>
          <LoadingUI />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
