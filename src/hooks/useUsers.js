import { useState, useEffect } from 'react'
import { getUsers } from '../services/users'

export const useUsers = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then((users) => setUsers(users))
  }, [])

  return {
    users
  }
}
