import { useForm } from '../../hooks/useForm'
import './TodoForm.css'

export const TodoForm = ({ userId }) => {

  const { input, loading, onInputChange, onFormSubmit} = useForm(userId)

  return (
    <form onSubmit={onFormSubmit} className="form">
      <span className={!loading ? 'loader-0' : 'loader'}></span>
      <span>
        <input
          id="input-form"
          value={input}
          type="text"
          className="input-form"
          placeholder="Enter a new Todo"
          onChange={(e) => onInputChange(e.target.value)}
          disabled={loading ? 'disabled' : ''}
          /* ref={inputRef} */
        />
      </span>
    </form>
  )
}
