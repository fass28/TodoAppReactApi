import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../Card/Card';


export const UserPage = () => {
const [users, setUsers] = useState(null)
const navigate = useNavigate()


const baseURL = "https://63cf2168e52f5878299ab5e2.mockapi.io/api/users"

React.useEffect(() => {
  axios.get(baseURL).then((response) => {
    setUsers(response.data);
  });
}, []);

if (!users) return null;

const onUserEvent = (id) => {
  navigate(`/users/${id}`)
}

  return (
    <>
      <div className="container">
        <div className="row">
          {
          users.map((user) => 
            <div 
              className="col-lg-4 col-md-6" key={user.id}>
                <Card user={user} onUserEvent={onUserEvent}/>
            </div>)}        
        </div>
      </div>
    </>
  )
}
