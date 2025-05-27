import { colors } from '../../../tailwind.config'
import { FiltersIcon, PlusIcon } from '../../icons'
import { IconButtonUI } from '../IconButtonUI'
import { ContainerListUIProps } from './types'

export const ContainerListUI: React.FC<ContainerListUIProps> = ({
  title,
  description,
  addBtnText = null,
  handleOnClick,
  searchInput,
  filters,
  showFilters = false,
  onShowFilters,
  children,
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <div className="py-2 h-full">
        <div className="flex flex-col h-full gap-3">
          <div className="bg-white p-2 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-start w-full px-2">
                <div className="flex justify-between w-full">
                  <span className="text-xl font-semibold">{title}</span>
                  <div>
                    <IconButtonUI
                      icon={<PlusIcon width="18px" height="18px" fill={colors.primary.DEFAULT} />}
                      onClick={handleOnClick}
                    />
                  </div>
                </div>
                <span className="text-gray">{description}</span>
              </div>
              <div className="flex items-center justify-between w-full mt-3">
                <div className="flex flex-1 items-center">{searchInput ?? null}</div>
                <div className="z-10">
                  {filters ? (
                    <div className="relative">
                      <div className="flex gap-2 cursor-pointer" onClick={onShowFilters}>
                        <i>
                          <FiltersIcon width="20" height="20" fill={colors.gray.DEFAULT} />
                        </i>
                        <span>Filtros</span>
                      </div>
                      <div
                        className={`bg-white absolute shadow-gray shadow-md px-2 pt-2 pb-4 rounded-lg min-w-64 right-0 ${
                          showFilters ? 'block' : 'hidden'
                        }`}
                      >
                        <span className="font-semibold">Filtrar por:</span>
                        {filters}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto overflow-y-scroll">{children}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-2 h-full">
      <div className="flex flex-col h-full gap-3">
        <div className="bg-white p-2 rounded-lg">
          <div className="flex items-center">
            <div
              className={`flex ${searchInput ? 'basis-1/3' : 'basis-full'} flex-col items-start`}
            >
              <span className="text-xl font-semibold">{title}</span>
              <span className="text-gray">{description}</span>
            </div>
            <div className="flex flex-1 items-center">{searchInput ?? null}</div>
            <div className="z-10">
              {filters ? (
                <div className="relative">
                  <div className="flex gap-2 cursor-pointer" onClick={onShowFilters}>
                    <i>
                      <FiltersIcon width="20" height="20" fill={colors.gray.DEFAULT} />
                    </i>
                    <span>Filtros</span>
                  </div>
                  <div
                    className={`bg-white absolute shadow-gray shadow-md px-2 pt-2 pb-4 rounded-lg md:min-w-64 ${
                      showFilters ? 'block' : 'hidden'
                    }`}
                  >
                    <span className="font-semibold">Filtrar por:</span>
                    {filters}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex basis-1/3 gap-8 justify-end">
              {addBtnText && (
                <button
                  className="bg-primary text-white rounded-lg p-3 flex items-center gap-2"
                  onClick={handleOnClick}
                >
                  <i>
                    <PlusIcon width="17px" height="17px" fill="white" />
                  </i>
                  {addBtnText}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex-auto overflow-y-scroll">{children}</div>
      </div>
    </div>
  )
}
