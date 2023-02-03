import Button from 'react-bootstrap/Button';
import './Card.css'

export const Card = ({user,onUserEvent}) => {

  const userName = user.name.split("").slice(0,15).join("")
  const UserAbout = user.about.split("").slice(0,35).join("")


  return (
    <>
      <div className="card-box">
        <div className="user-img-box">
          <div className='user-img'>
            <img src={user.avatar} alt="userImage" className={(user.sex === 'male') ? 'img-male' : 'img-female'} />
          </div>
        </div>
        <div className="name-position">
          <h1 className='user-name'>{userName}</h1>
          <h4 className='user-position'>{user.jobtitle}</h4>
        </div>
        <div className="about-me"> 
          <h3>About </h3>
          <p>{UserAbout}</p>
        </div>
        <hr />
        <div>
          <Button size='lg' className='button' onClick={() => onUserEvent(user.id)}>SEE USER</Button>
        </div>
      </div>
    </>
  )
}
