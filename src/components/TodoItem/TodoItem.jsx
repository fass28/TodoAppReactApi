import React from 'react'
import './TodoItem.css'

export const TodoItem = ({ task, handleCheck, onTaskDelete }) => {

  return (
    <>
      <div className="li-tasks">
        <input
          id={`input-check-box${task.id}`}
          type="checkbox"
          checked={task.done}
          className="input-checkbox"
          onChange={(e) => handleCheck(e, task.id)}
        ></input>
        <label htmlFor={`input-check-box${task.id}`} className="task-text">
          {task.title} - {task.done ? 'true' : 'false'}
        </label>

        <span className="button-x" onClick={() => onTaskDelete(task.id)}>
          X
        </span>
      </div>
    </>
  )
}
