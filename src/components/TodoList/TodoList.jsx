import React, { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { Loading } from '../Loading/Loading'
import { TodoForm } from '../TodoForm/TodoForm'
import { TodoItem } from '../TodoItem/TodoItem'
import './TodoList.css'

export const TodoList = ({ userId }) => {
  const {
    filteredTasks,
    loading,
    pendingTasks,
    filterText,
    handleCheck,
    onTaskDelete,
    onDeleteAll,
    getTasks,
    handleFilter,
  } = useTasks(userId)

  const filters = ['All', 'Active', 'Completed']

  if (loading) return <Loading />

  return (
    <div className="tasks-container">
      <TodoForm userId={userId} onCreated={getTasks} />

      <div className="div-tasks">
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            handleCheck={(e, taskId) => handleCheck(e, taskId)}
            onTaskDelete={onTaskDelete}
          />
        ))}
      </div>
      <div className="tasks-footer">
        <span className="span-footer">{pendingTasks} Task Left</span>
        {filters.map((f) => {
          return (
            <span
              key={f}
              className={`span-footer ${filterText === f ? 'span-active' : ''}`}
              onClick={() => handleFilter(f)}
            >
              {f}
            </span>
          )
        })}
        <span className="span-footer span-active" onClick={onDeleteAll}>
          Clear Completed
        </span>
      </div>
    </div>
  )
}
