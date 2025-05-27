import { SearchIcon } from '../../../packages/icons'
import { colors } from '../../../tailwind.config'
import { SearchInputProps } from './types'

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 rounded-xl py-2 px-2">
      <i>
        <SearchIcon width="20px" height="20px" fill={colors.gray.DEFAULT} />
      </i>
      <input
        className="placeholder-gray w-full text-xl font-extralight focus:outline-none"
        type="text"
        name="search"
        placeholder="Buscar"
        value={value}
        onChange={ev => onChange(ev.target.value)}
      />
    </div>
  )
}

export default SearchInput
