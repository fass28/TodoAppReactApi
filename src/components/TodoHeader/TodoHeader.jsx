import React, { useEffect, useState } from 'react'
import { getUserById } from '../../services/users'
import './TodoHeader.css'

export const TodoHeader = ({ userId }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserById(userId).then((user) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  if (loading) return 'loading...'

  return (
    <div className="title-name">
      <h1>TO DO LIST</h1>
      <h2>{user.name}</h2>
    </div>
  )
}
