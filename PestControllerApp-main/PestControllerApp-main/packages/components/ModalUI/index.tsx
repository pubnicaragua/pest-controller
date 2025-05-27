import { colors } from '../../../tailwind.config'
import { CloseIcon } from '../../icons'
import { LineDividerUI } from '../DividerLineUI'
import { ModalUIProps } from './types'

export const ModalUI: React.FC<ModalUIProps> = ({ title, visible, children, onClose }) => {
  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-between items-end md:items-center max-w-[100vw]">
      <div className="relative p-4 w-full max-w-full max-h-full">
        <div
          className="relative bg-white rounded-lg shadow p-3 overflow-y-auto max-w-[95vw]"
          style={{ maxHeight: '90vh' }}
        >
          <div className="flex justify-between items-center px-3">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button type="button" onClick={onClose} className="btn btn-link p-0">
              <CloseIcon width="14" height="14" fill={colors.gray.dark} />
            </button>
          </div>
          <LineDividerUI />
          {children}
        </div>
      </div>
    </div>
  )
}
