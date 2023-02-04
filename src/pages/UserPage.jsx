import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card/Card'
import { useUsers } from '../hooks/useUsers'

export const UserPage = () => {
  const { users } = useUsers()

  const navigate = useNavigate()

  const onUserEvent = (id) => {
    navigate(`/users/${id}`)
  }

  console.log(users)

  if (!users) return null
  return (
    <>
      <div className="container">
        <div className="row">
          {users.map((user) => (
            <div className="col-lg-4 col-md-6" key={user.id}>
              <Card user={user} onUserEvent={onUserEvent} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
