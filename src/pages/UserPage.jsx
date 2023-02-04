import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card/Card'
import { Loading } from '../components/Loading/Loading'
import { useUsers } from '../hooks/useUsers'

export const UserPage = () => {
  const { users, loading } = useUsers()

  const navigate = useNavigate()

  const onUserEvent = (id) => {
    navigate(`/users/${id}`)
  }

  if (loading) return <Loading />
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
