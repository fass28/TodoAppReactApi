import React from 'react'
import { useTasks } from '../../hooks/useTasks'
import { Loading } from '../Loading/Loading'
import { TodoForm } from '../TodoForm/TodoForm'
import { TodoItem } from '../TodoItem/TodoItem'
import './TodoList.css'

export const TodoList = ({ userId }) => {

  const { tasks, loading, pendingTasks, handleCheck, onTaskDelete, onDeleteAll, getTasks } = useTasks(userId)

  if (loading) return <Loading />

  return (
    <div className="tasks-container">
      <TodoForm userId={userId} onCreated={getTasks} />

      <div className="div-tasks">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            handleCheck={handleCheck}
            onTaskDelete={onTaskDelete}
          />
        ))}
      </div>
      <div className="tasks-footer">
        <span className="span-footer">{pendingTasks} Task Left</span>
        <span
          className='span-footer span-active'
        >
          All
        </span>
        <span
          className='span-footer'
        >
          Active
        </span>
        <span
          className='span-footer'
        >
          Completed
        </span>
        <span className="span-footer spam-active" onClick={onDeleteAll}>
          Clear Completed
        </span>
      </div>
    </div>
  )
}
