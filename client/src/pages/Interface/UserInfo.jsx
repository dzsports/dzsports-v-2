import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link';




// IMPORT PHOTOS
import userPhoto from '../../assets/user.png'
import newPhoto from '../../assets/camera.png'
import follow from '../../assets/follow.png'
import dejafollow from '../../assets/dejafollow.png'
import Publish from '../../components/Parts/Publish';
import Post from '../../components/Parts/Post';
import axios from 'axios';

const UserInfo = () => {

    const [admin, setAdmin] = useState({});
    const [user, setUser] = useState({});
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    const [photoProfile, setPhotoProfile] = useState('');
    const [message, setMessage] = useState('');

    const getUserInfo = () => {
        const storedUser = localStorage.getItem('user');
        setAdmin(JSON.parse(storedUser));
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/posts/get/${id}`);
            setPosts(response.data.posts);
            console.log(response.data.posts);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/getUser/${id}`);
            console.log(response.data.userFound);
            setUser(response.data.userFound);
            console.log(user);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handlePhoto = (e) => {
        setPhotoProfile(e.target.files[0]);
        setMessage('');
        document.querySelector('.photoObligat').innerHTML = `هل تريد تغيير الصورة الى ${document.querySelector('#photoProfile').value}`
    }
    const changePhotoProfile = async (e) => {
        e.preventDefault();
        if (photoProfile) {
        const formData = new FormData();
        formData.append('image',photoProfile);
        console.log(formData);
        // setMessage('');
        try {
            const response = await axios.post(`http://localhost:4000/posts/add/${user._id}`, formData);
            const response2 = await axios.post(`http://localhost:4000/changephotoprofile/${user._id}`, formData);
            console.log(response.data);
            console.log(response2.data);
            // clear form state
            setPhotoProfile('');
            setMessage();
            document.querySelector('.photoObligat').innerHTML = `<div class='jsonMessage'>تم تغيير الصورة بنجاح</div>`
            localStorage.setItem('user',JSON.stringify(response2.data))
        } catch (error) {
            console.log(error);
        }
        } else {
            document.querySelector('.photoObligat').innerHTML = 'عليك اختيار صورة أولا '
        }
    }
    useEffect(() => {
        getUserInfo();
        fetchUserData();
        fetchData();
    },[]);
    return (
        <div className='profile'>
            <div className="userInfo">
                <div className="coverture"></div>
                    <input type="file" name="photoProfile" id="photoProfile" className='inputPhoto hidden' onChange={handlePhoto} />
                <div className="photoProfile relative z-40 mx-auto">
                    <img src={user.photoProfile ? `http://localhost:4000/uploads/${user.photoProfile}` : userPhoto} alt="User PhotoProfile" />
                    {user._id === admin._id ? <div className='label'><label htmlFor="photoProfile"><img src={newPhoto} alt="User PhotoProfile" /></label></div>
                    : admin.following.includes(id) ? <div className='label'><img src={dejafollow} alt="deja follow" /></div>: <div className='label'><img src={follow} alt="User PhotoProfile" /></div>}
                </div>
                <div className="inforamtions">
                    <small className="photoObligat block w-full text-center font-semibold" ></small>
                    {admin._id === user._id &&<form  onSubmit={changePhotoProfile}> <button className='changePhoto'>تغيير الصورة</button></form>}
                    {/* {message && <div className='jsonMessage'>{message}</div>} */}
                    <h3 className="username text-center text-2xl font-semibold">{user.name}</h3>
                    <h5 className="text-center text-lg">{user.sport}</h5>
                    <div className="infoCards flex justify-center gap-4 mt-4 flex-wrap">
                        <div className="card">
                            <div className="cardTitle font-semibold">البريد الإلكتروني</div>
                            <Link to={`mailto:${user.email}`} className="cardContent">{user.email}</Link>
                        </div>
                        <div className="card">
                            <div className="cardTitle font-semibold">رقم الهاتف</div>
                            <Link to={`tel:${user.phone}`} className="cardContent">{user.phone}</Link>
                        </div>
                        <div className="card">
                            <div className="cardTitle font-semibold">الولاية</div>
                            <div className="cardContent">{user.wilaya}</div>
                        </div>
                        <div className="card">
                            <div className="cardTitle font-semibold">الدائرة</div>
                            <div className="cardContent">{user.daira}</div>
                        </div>
                        {user.baladia && <div className="card">
                            <div className="cardTitle font-semibold">البلدية</div>
                            <div className="cardContent">{user.baladia}</div>
                        </div> }
                    </div>
                </div>
            </div>
            <div className='posts'>
                <Publish />
                {posts && posts.map( post => <Post key={post._id} post={post} />)}
            </div>
        </div>
    )
}

export default UserInfo