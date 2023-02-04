import { useState, useEffect } from 'react'
import {
  deleteTaskByUserId,
  getTasksByUserId,
  updateTaskByUserId
} from '../services/tasks'

export const useTasks = (userId) => {
  // Tasks
  const [tasks, setTasks] = useState(null)
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [idsChecked, setIdsChecked] = useState([])
  const [pendingTasks, setPendingTasks] = useState(0)

  const handleCheck = async (e, taskId) => {
    await updateTaskByUserId(userId, taskId, { done: e.target.checked })

    if (idsChecked.includes(taskId)) {
      setIdsChecked(idsChecked.filter((item) => item !== taskId))
    } else {
      setIdsChecked([...idsChecked, taskId])
    }

    getTasks()
  }

  const onTaskDelete = async (taskId) => {
    await deleteTaskByUserId(userId, taskId)
    getTasks()
  }

  const onDeleteAll = async () => {
    for (const taskId of idsChecked) {
      await deleteTaskByUserId(userId, taskId)
    }
    setIdsChecked([])
    getTasks()
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
  
  // Filters
  const [filterText, setFilterText] = useState('All')

  const handleFilter = (filter) => {
    setFilterText(filter)
    if (filter === 'All') {
      setFilteredTasks(tasks)
    } else {
      const done = filter === 'Completed'
      const tasksFiltered = tasks.filter((t) => t.done === done)
      setFilteredTasks(tasksFiltered)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  useEffect(() => {
    if (!tasks) {
      setPendingTasks(0)
    } else {
      const pendingTasks = tasks.filter(task => !task.done)
      setPendingTasks(pendingTasks.length)
      setFilteredTasks(tasks)
    }
  }, [tasks])

  return {
    tasks,
    filteredTasks,
    loading,
    pendingTasks,
    filterText,
    setTasks,
    handleCheck,
    onTaskDelete,
    onDeleteAll,
    getTasks,
    setFilteredTasks,
    handleFilter,
  }
}
