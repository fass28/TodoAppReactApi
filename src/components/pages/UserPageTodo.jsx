import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserPageTodo.css";

export const UserPageTodo = () => {
  const [tasks, setTasks] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(null);

  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const [formState, setFormState] = useState("");
  const [isChecked, setIsChecked] = useState([]);
  const [taskLeft, setTaskLeft] = useState(0);
  const [loading, setLoading] = useState('disabled');
  const [classActive, setClassActive] = useState(false);
  const [classAll, setClassAll] = useState(true);
  const [classCompleted, setClassCompleted] = useState(false);
  


  const inputRef = useRef(null);
  
  const baseURLtasks = `https://63cf2168e52f5878299ab5e2.mockapi.io/api/users/${userid}/tasks`;
  const baseURL = `https://63cf2168e52f5878299ab5e2.mockapi.io/api/users/${userid}`;
  
  useEffect( () => {
    axios.get(baseURLtasks).then((response) => {
      setTasks(response.data)
      setFilteredTasks(response.data)
      if(response.data.length) {
        setIsChecked(response.data.filter(task => task.done).map(t => t.id))
      }
      setTaskLeft(response.data.filter(task => !task.done).length)
      setLoading('')
    })
    axios.get(baseURL).then((response) => {setUser(response.data)})
  }, [])
  
  const onInputChange =  (e) => {
    setFormState(e.target.value)
  }
  
  const  onFormSubmit = async (e) => {
    e.preventDefault() 
    if (formState.length <= 1 || tasks.some((task) => task.title === formState)) return;
    
    await axios.post(baseURLtasks, {title: formState,done: false,})
    setFormState('')
    setLoading('disabled')
    const getResponse = await axios.get(baseURLtasks)
    setFilteredTasks(getResponse.data)
    inputRef.current.focus()
    setLoading('')
    console.log(inputRef);
  }

  const onDeleteTaskTodo = async(taskId) => {
    const baseURLtasksId = `https://63cf2168e52f5878299ab5e2.mockapi.io/api/users/${userid}/tasks/${taskId}`
    await axios.delete(baseURLtasksId)
    const getResponse = await axios.get(baseURLtasks)
    setFilteredTasks(getResponse.data)
  }

  const handleCheck = async  (e,taskId) => {
    const baseURLtasksId = `https://63cf2168e52f5878299ab5e2.mockapi.io/api/users/${userid}/tasks/${taskId}`
    axios.put(baseURLtasksId, {done: e.target.checked})

    if (isChecked.includes(taskId)) {
      setIsChecked(isChecked.filter((item) => item !== taskId))
    } else {
      setIsChecked([...isChecked, taskId])
    }
  };

 
  const deleteAll = async() => {
    console.log(isChecked)
     let ArrayUrlById = []
    ArrayUrlById = isChecked.map((c) => {
      let arrayURL = `https://63cf2168e52f5878299ab5e2.mockapi.io/api/users/${userid}/tasks/${c}`;

      return arrayURL
    })
    console.log(ArrayUrlById)
    const deleteItem = async (url) => {
      const response = await axios.delete(url)
      console.log(response.data)
    };

    for (const url of ArrayUrlById) {
      await deleteItem(url)
    }
    const getResponse = await axios.get(baseURLtasks)
    setFilteredTasks(getResponse.data)
  }

  if (!tasks || !user || !filteredTasks) return null;


  const handleAllTasks = () => {
    console.log('aqui all tasks');
    setFilteredTasks(tasks)
    setClassAll(true)
    setClassCompleted(false)
    setClassActive(false)
  }

  const handleActiveTasks = () => {
    setFilteredTasks(tasks.filter(t => !t.done))
    setClassActive(true)
    setClassAll(false)
    setClassCompleted(false)
  }
  
  const handleCompletedTasks = () => {
    console.log('aqui completed tasks');
    setFilteredTasks(tasks.filter(t => t.done))
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
          <span className={!loading ? 'loader-0' : 'loader' }></span>
          <span>
              <input
                id="input-form"
                value={formState}
                type="text"
                className="input-form"
                placeholder="Enter a new Todo"
                onChange={(e) => onInputChange(e)}
                disabled={loading}
                ref={inputRef}
              />
          </span>
          </form>
            <div className="div-tasks">
              {filteredTasks.map((task) => (
                <div className="li-tasks" key={task.id}>
                  <input
                   id={`input-check-box${task.id}`}
                    type="checkbox"
                    defaultChecked={task.done}
                    className="input-checkbox"
                    onChange={(e) => handleCheck(e,task.id)}
                  >
                  </input>
                  <label htmlFor={`input-check-box${task.id}`} className="task-text">{task.title}</label>
                   
                  <span
                      className="button-x"
                      onClick={() => onDeleteTaskTodo(task.id)}
                    >
                      X
                  </span>
                 
                </div>
              ))}
            </div>
            <div className="tasks-footer">
              <span className="span-footer">{taskLeft} Task Left</span>
              <span className={`span-footer ${(classAll) ? 'span-active' : ''}`} onClick={handleAllTasks}>All</span>
              <span className={`span-footer ${(classActive) ? 'span-active' : ''}`} onClick={handleActiveTasks}>Active</span>
              <span className={`span-footer ${(classCompleted) ? 'span-active' : ''}`} onClick={handleCompletedTasks}>Completed</span>
              <span className="span-footer spam-active" onClick={deleteAll}>
                Clear Completed
              </span>
            </div>
        </div>
      </div>
    </>
  );
};
