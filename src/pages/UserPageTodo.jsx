import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TodoInput } from '../components/TodoInput/TodoInput'
import { TodoItem } from '../components/TodoItem/TodoItem'
import {
  createTaskByUserId,
  deleteTaskByUserId,
  getTasksByUserId,
  updateTaskByUserId
} from '../services/tasks'
import { getUserById } from '../services/users'
import './UserPageTodo.css'

export const UserPageTodo = () => {
  const [tasks, setTasks] = useState(null)
  const [filteredTasks, setFilteredTasks] = useState(null)

  const { userid } = useParams()
  const [user, setUser] = useState(null)
  const [formState, setFormState] = useState('')
  const [isChecked, setIsChecked] = useState([])
  const [taskLeft, setTaskLeft] = useState(0)
  const [loading, setLoading] = useState('disabled')
  const [classActive, setClassActive] = useState(false)
  const [classAll, setClassAll] = useState(true)
  const [classCompleted, setClassCompleted] = useState(false)

  /* const inputRef = useRef(null) */

  useEffect(() => {
    getTasksByUserId(userid).then((tasks) => {
      setTasks(tasks)
      setFilteredTasks(tasks)
      if (tasks.length) {
        setIsChecked(tasks.filter((task) => task.done).map((t) => t.id))
      }
      setTaskLeft(tasks.filter((task) => !task.done).length)
      setLoading('')
    })

    getUserById(userid).then((user) => {
      setUser(user)
    })
  }, [])

  const onInputChange = (value) => {
    setFormState(value)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (formState.length <= 1 || tasks.some((task) => task.title === formState))
      return

    await createTaskByUserId(userid, { title: formState, done: false })
    setFormState('')
    setLoading('disabled')
    const data = await getTasksByUserId(userid)
    setFilteredTasks(data)
    /* inputRef.current.focus() */
    setLoading('')
    /* console.log(inputRef) */
  }

  const onTaskDelete = async (taskId) => {
    await deleteTaskByUserId(userid, taskId)
    const data = await getTasksByUserId(userid)
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
      await deleteTaskByUserId(userid, taskId)
    }

    setIsChecked([])
  
    const data = await getTasksByUserId(userid)
    setFilteredTasks(data)
  }

  if (!tasks || !user || !filteredTasks) return null

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
          <div className="title-name">
            <h1>TO DO LIST</h1>
            <h2>{user.name}</h2>
          </div>
          <form action="" onSubmit={onFormSubmit} className="form">
            <TodoInput loading={loading} value={formState} onInputChange={onInputChange} />
          </form>
          <div className="div-tasks">
            {filteredTasks.map((task) => (
              <TodoItem key={task.id} task={task} handleCheck={handleCheck} onTaskDelete={onTaskDelete} />
            ))}
          </div>
          <div className="tasks-footer">
            <span className="span-footer">{taskLeft} Task Left</span>
            <span
              className={`span-footer ${classAll ? 'span-active' : ''}`}
              onClick={handleAllTasks}
            >
              All
            </span>
            <span
              className={`span-footer ${classActive ? 'span-active' : ''}`}
              onClick={handleActiveTasks}
            >
              Active
            </span>
            <span
              className={`span-footer ${classCompleted ? 'span-active' : ''}`}
              onClick={handleCompletedTasks}
            >
              Completed
            </span>
            <span className="span-footer spam-active" onClick={deleteAll}>
              Clear Completed
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
