import { useEffect, useRef, useState } from 'react'
import { createTaskByUserId } from '../services/tasks'

export const useForm = (userid) => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const onInputChange = (value) => {
    setInput(value)
  }

  const onFormSubmit = async (e, tasks) => {
    e.preventDefault()
    if (input.length <= 1 || tasks.some((task) => task.title === input)) return false
    setLoading(true)
    await createTaskByUserId(userid, { title: input, done: false })
    setInput('')
    setLoading(false)
    return true
  }

  useEffect(() => {
    if (!loading) {
      setFocus()
    }
  }, [loading])

  const inputRef = useRef(null)

  const setFocus = () => {
    inputRef.current && inputRef.current.focus()
  }

  return {
    input,
		loading,
    inputRef,
    onInputChange,
    onFormSubmit,
  }
}
