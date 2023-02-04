import { useParams } from 'react-router-dom'
import { TodoHeader } from '../components/TodoHeader/TodoHeader'
import { TodoList } from '../components/TodoList/TodoList'

export const UserPageTodo = () => {
  const { userId } = useParams()

  return (
    <>
      <div className="container">
        <div className="tasks-box col-lg-10 col-md-8 col-sm-12">
          <TodoHeader userId={userId} />

          <TodoList userId={userId} />
        </div>
      </div>
    </>
  )
}
