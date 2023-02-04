import { useState, useEffect } from 'react'
import { getUsers } from '../services/users'

export const useUsers = () => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers().then((users) => {
			setUsers(users)
			setLoading(false)
		})
  }, [])

  return {
    users,
		loading
  }
}
