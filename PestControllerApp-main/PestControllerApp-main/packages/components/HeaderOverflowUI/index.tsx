import { HeaderOverFlowUIProps } from './types'

export const HeaderOverFlowUI: React.FC<HeaderOverFlowUIProps> = ({ title }) => {
  return (
    <div className="w-fit mb-4">
      <h2 className="font-semibold text-2xl">{title}</h2>
      <div className="w-2/3 h-[2px] bg-primary" />
    </div>
  )
}
