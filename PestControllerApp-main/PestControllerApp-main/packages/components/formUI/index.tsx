import { FormUIProps } from './types'

export const FormUI: React.FC<FormUIProps> = ({ title, onSubmit, children }) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="shadow-xl px-4 pt-3 pb-2 rounded-lg min-w-fit min-h-[50%] w-full lg:max-w-[40%] bg-white lg:pt-3 lg:pb-2">
        <h2 className="text-2xl text-center font-bold lg:text-3xl">{title}</h2>
        <form className="mt-4" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  )
}
