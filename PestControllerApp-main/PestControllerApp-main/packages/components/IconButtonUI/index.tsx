import { IconButtonUIProps } from './types'

export const IconButtonUI: React.FC<IconButtonUIProps> = ({ icon, onClick, outlined = true }) => {
  if (outlined)
    return (
      <button className="border-2 border-primary rounded-lg p-2 md:mr-4" onClick={onClick}>
        {icon}
      </button>
    )

  return (
    <button className="md:mr-4" onClick={onClick}>
      {icon}
    </button>
  )
}
