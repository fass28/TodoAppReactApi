import Button from 'react-bootstrap/Button';
import './Card.css'

export const Card = ({user,onUserEvent}) => {

  const UserAbout = user.about.split("").slice(0,60).join("")

/*   const onUserEvent = (id) =>{
    console.log(id);
  }
 */
  return (
    <>
      <div className="card-box">
        <div className="user-img-box">
          <div className='user-img'>
            <img src={user.avatar} alt="userImage" className='img' />
          </div>
        </div>
        <div className="name-position">
          <h1 className='user-name'>{user.name}</h1>
          <h4 className='user-position'>{user.jobtitle}</h4>
        </div>
        <div className="about-me"> 
          <h3>About </h3>
          <p>{UserAbout} <a href="">mas...</a></p>
        </div>
        <hr />
        <div>
          <Button size='lg' onClick={() => onUserEvent(user.id)}>SEE USER</Button>
        </div>
      </div>
    </>
  )
}
