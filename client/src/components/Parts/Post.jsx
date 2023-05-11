import React, { useEffect, useState } from 'react'
import PostImg from '../../assets/salle.jpg'
import comment from '../../assets/comment.png'
import jam from '../../assets/jam.png'
import redjam from '../../assets/redjam.png'
import newPhoto from '../../assets/camera.png'
import follow from '../../assets/follow.png'
import dejafollow from '../../assets/dejafollow.png'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const handleJam = (e) => {
    if(e.target.src === jam) {
      e.target.src = redjam
    } else {
      e.target.src = jam
    }
  }

const Post = ({post}) => {
    const [comments, setComments] = useState(false);
    const [user, setUser] = useState({});
    const getUserInfo = () => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
    };
    useEffect(() => {
      getUserInfo();
  }, []);
  return (
    <div className="post w-full">
        <div className="headPost flex align-middle justify-between">
          <div className="rightPart flex align-middle">
            <i className="userIcon uil uil-user-circle"></i>
            <div className="info flex flex-col justify-center mr-2">
              <span className='text-lg block'>{user.name}</span>
              <span className='text-xs' style={{direction:'ltr'}}>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
          <div className="leftPart">
            <img src={follow} className=' cursor-pointer' alt='follow'/>
            {/* <img src={userPhoto} alt="User PhotoProfile" />
            {id === user._id ? <img src={newPhoto} alt="User PhotoProfile" />
            : user.name === id ? <img src={dejafollow} alt="User PhotoProfile" />: <img src={follow} alt="User PhotoProfile" />} */}
          </div>
        </div>
        <div className="description mb-4">
          {post.description}
        </div>
          {post.image && <img 
            src={`http://localhost:4000/uploads/${post.image}`}
            alt={`Img of ${post.description}`}
          className=' '
        />}
        <div className="react">
          <img src={jam}
            onClick={handleJam}
            alt="jam" 
          />
          <img src={comment}
            alt="comment" 
            onClick={(e)=> setComments(!comments)}
          />
        </div>
        <div className={`comments ${comments ? 'show' : ''}`}>
          <div className="comment">شكرا لكم</div>
          <div className="comment">شكرا لكم</div>
          <div className="comment">شكرا لكم</div>
          <div className="comment">شكرا لكم</div>
        </div>
      </div>
  )
}

export default Post