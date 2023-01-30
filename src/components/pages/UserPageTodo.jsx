import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './UserPageTodo.css'

export const UserPageTodo = () => {
  const [tasks, setTasks] = useState(null);
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const [formState, setFormState] = useState('')

  const baseURLtasks = `https://63cf2168e52f5878299ab5e2.mockapi.io/api/users/${userid}/tasks`
  const baseURL = `https://63cf2168e52f5878299ab5e2.mockapi.io/api/users/${userid}`



 // console.log("params de ", userid);

  useEffect(() => {
    axios.get(baseURLtasks).then((response) => {
      setTasks(response.data);
    axios.get(baseURL).then((response) => {
        setUser(response.data);
      });
    });
  }, []);

  if (!tasks || !user) return null;



const onFormSubmit = (e) => {
  e.preventDefault()
  console.log(formState);
  axios.post(baseURLtasks, {
    title: formState
  }).then((response) => {
    setFormState(response.data);
  })
}

  return (
    <>
    <div className="container">
      <div className="tasks-box col-lg-10 col-md-8 col-sm-12">
        <h1>{user.name}</h1>
        <form action="" onSubmit={onFormSubmit} >
          <div className="div-tasks">
            <input type="text" className="w-100"  placeholder="enter a new Todo" onChange={(e)=> setFormState(e.target.value)} />
            {tasks.map((task) => (
              <div className="li-tasks" key={task.id}>
              <input type="checkbox" className="input-checkbox"></input>
                {task.title}
              </div> ))
            }
          </div>
        <div className="tasks-footer">
          <span className="span1 span">{tasks.length} Task Left</span>
          <span className="span2 span">All</span>
          <span className="span3 span">Active</span>
          <span className="span4 span">Completed</span>
          <span className="span5 span">Clear Completed</span>
        </div>
        </form>
      </div>
    </div>
    </>
  );
};
