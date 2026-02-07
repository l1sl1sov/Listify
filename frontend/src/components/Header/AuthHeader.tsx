import Header from './Header'
import { authLinks } from '../../constants/links'
import { useEffect } from 'react'

interface SearchProps {
  searchValue: string
  setSearchValue: (id: string) => void
}

interface AuthHeaderProps {
  search: SearchProps
  setDebounce: React.Dispatch<React.SetStateAction<string>>
}

export default function AuthHeader({ search: {searchValue, setSearchValue}, setDebounce }: AuthHeaderProps) {

  const clearSearch = () => {
    setSearchValue('')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(searchValue);
    }, 300);

    return () => clearTimeout(timer)

  }, [searchValue])

  return (
    <Header links={authLinks}>
      <label className="flex border-solid border-2 w-fit group relative">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Find task"
          className="border-none outline-none peer"
        />
        <button
          className="flex items-center 
                     transition-opacity duration-100 opacity-0 group-focus-within:opacity-50
                     pointer-events-none group-focus-within:pointer-events-auto"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <img src="/images/task-icons/cross.svg"></img>
        </button>
      </label>
      <button>log out</button>
    </Header>
  )
}
