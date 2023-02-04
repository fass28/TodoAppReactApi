import './TodoInput.css'

export const TodoInput = ({ loading, value, onInputChange }) => {
  return (
    <>
      <span className={!loading ? 'loader-0' : 'loader'}></span>
      <span>
        <input
          id="input-form"
          value={value}
          type="text"
          className="input-form"
          placeholder="Enter a new Todo"
          onChange={(e) => onInputChange(e.target.value)}
          disabled={loading}
          /* ref={inputRef} */
        />
      </span>
    </>
  )
}
