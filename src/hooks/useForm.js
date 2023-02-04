import { useState } from 'react'
import { createTaskByUserId } from '../services/tasks'

export const useForm = (userid) => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const onInputChange = (value) => {
    setInput(value)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (input.length <= 1) return

    setLoading(true)

    await createTaskByUserId(userid, { title: input, done: false })

    setInput('')
    /* inputRef.current.focus() */
    setLoading(false)
    /* console.log(inputRef) */
  }

  return {
    input,
		loading,
    onInputChange,
    onFormSubmit,
  }
}
