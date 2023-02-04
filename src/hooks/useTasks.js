import { useState, useEffect } from 'react'
import {
  deleteTaskByUserId,
  getTasksByUserId,
  updateTaskByUserId
} from '../services/tasks'

export const useTasks = (userId) => {
  // Tasks
  const [tasks, setTasks] = useState(null)
  const [loading, setLoading] = useState(true)
  const [idsChecked, setIdsChecked] = useState([])

  const handleCheck = async (e, taskId) => {
    await updateTaskByUserId(userId, taskId, { done: e.target.checked })

    if (idsChecked.includes(taskId)) {
      setIdsChecked(isChecked.filter((item) => item !== taskId))
    } else {
      setIdsChecked([...idsChecked, taskId])
    }
  }

  const onTaskDelete = async (taskId) => {
    await deleteTaskByUserId(userId, taskId)
    const data = await getTasksByUserId(userId)
    setTasks(data)
  }

  const onDeleteAll = async () => {
    for (const taskId of idsChecked) {
      await deleteTaskByUserId(userId, taskId)
    }

    setIdsChecked([])

    const data = await getTasksByUserId(userId)
    setTasks(data)
  }

  // Footer
  const [taskLeft, setTaskLeft] = useState(0)
  const [classActive, setClassActive] = useState(false)
  const [classAll, setClassAll] = useState(true)
  const [classCompleted, setClassCompleted] = useState(false)

  const handleAllTasks = () => {
    console.log('aqui all tasks')
    setTasks(tasks)
    setClassAll(true)
    setClassCompleted(false)
    setClassActive(false)
  }

  const handleActiveTasks = () => {
    setTasks(tasks.filter((t) => !t.done))
    setClassActive(true)
    setClassAll(false)
    setClassCompleted(false)
  }

  const handleCompletedTasks = () => {
    console.log('aqui completed tasks')
    setTasks(tasks.filter((t) => t.done))
    setClassCompleted(true)
    setClassAll(false)
    setClassActive(false)
  }

  const getTasks = async() => {
    setLoading(true)
    getTasksByUserId(userId).then((tasks) => {
      setTasks(tasks)
      if (tasks.length) {
        setIdsChecked(
          tasks.filter((task) => task.done).map((t) => t.id)
        )
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    getTasks()
  }, [])

  return {
    tasks,
    loading,
    setTasks,
    handleCheck,
    onTaskDelete,
    onDeleteAll,
    getTasks,
  }
}
