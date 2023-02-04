import React from 'react'
import { useTasks } from '../../hooks/useTasks'
import { Loading } from '../Loading/Loading'
import { TodoForm } from '../TodoForm/TodoForm'
import { TodoItem } from '../TodoItem/TodoItem'
import './TodoList.css'

export const TodoList = ({ userId }) => {

  const { tasks, loading, handleCheck, onTaskDelete, onDeleteAll } = useTasks(userId)

  if (loading) return <Loading />

  return (
    <div className="tasks-container">
      <TodoForm userId={userId} />

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
        {/* <span className="span-footer">{taskLeft} Task Left</span>
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
        </span> */}
        <span className="span-footer spam-active" onClick={onDeleteAll}>
          Clear Completed
        </span>
      </div>
    </div>
  )
}
