import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../components/Loading/Loading'
import { TodoForm } from '../components/TodoForm/TodoForm'
import { TodoHeader } from '../components/TodoHeader/TodoHeader'
import { TodoItem } from '../components/TodoItem/TodoItem'
import { TodoList } from '../components/TodoList/TodoList'
import { useTasks } from '../hooks/useTasks'
import {
  createTaskByUserId,
  deleteTaskByUserId,
  getTasksByUserId,
  updateTaskByUserId
} from '../services/tasks'

export const UserPageTodo = () => {
  const { userId } = useParams()
  

  const [filteredTasks, setFilteredTasks] = useState(null)
  const [creatingTask, setCreatingTask] = useState(false)

  const [formState, setFormState] = useState('')
  const [isChecked, setIsChecked] = useState([])
  const [taskLeft, setTaskLeft] = useState(0)
  const [loading, setLoading] = useState('disabled')
  const [classActive, setClassActive] = useState(false)
  const [classAll, setClassAll] = useState(true)
  const [classCompleted, setClassCompleted] = useState(false)

  const onInputChange = (value) => {
    setFormState(value)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (formState.length <= 1 || tasks.some((task) => task.title === formState))
      return

    setCreatingTask(true)

    await createTaskByUserId(userId, { title: formState, done: false })

    setCreatingTask(false)

    setFormState('')
    setLoading('disabled')
    const data = await getTasksByUserId(userId)
    setTasks(data)
    /* inputRef.current.focus() */
    setLoading('')
    /* console.log(inputRef) */
  }

  const onTaskDelete = async (taskId) => {
    await deleteTaskByUserId(userId, taskId)
    const data = await getTasksByUserId(userId)
    setFilteredTasks(data)
  }

  const handleCheck = async (e, taskId) => {
    await updateTaskByUserId(userid, taskId, { done: e.target.checked })

    if (isChecked.includes(taskId)) {
      setIsChecked(isChecked.filter((item) => item !== taskId))
    } else {
      setIsChecked([...isChecked, taskId])
    }
  }

  const deleteAll = async () => {
    for (const taskId of isChecked) {
      await deleteTaskByUserId(userId, taskId)
    }

    setIsChecked([])

    const data = await getTasksByUserId(userId)
    setFilteredTasks(data)
  }

  const handleAllTasks = () => {
    console.log('aqui all tasks')
    setFilteredTasks(tasks)
    setClassAll(true)
    setClassCompleted(false)
    setClassActive(false)
  }

  const handleActiveTasks = () => {
    setFilteredTasks(tasks.filter((t) => !t.done))
    setClassActive(true)
    setClassAll(false)
    setClassCompleted(false)
  }

  const handleCompletedTasks = () => {
    console.log('aqui completed tasks')
    setFilteredTasks(tasks.filter((t) => t.done))
    setClassCompleted(true)
    setClassAll(false)
    setClassActive(false)
  }

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
