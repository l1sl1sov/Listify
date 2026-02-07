import TaskList from '../../components/TasksList/TaskList'
import AuthHeader from '../../components/Header/AuthHeader'
import { useState } from 'react'

export const WorkspacePage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [debounced, setDebounced] = useState('')

  return (
    <div className="container">
      <AuthHeader search={{searchValue, setSearchValue}} setDebounce={setDebounced} />
      <TaskList debouncedValue={debounced}/>
    </div>
  )
}
