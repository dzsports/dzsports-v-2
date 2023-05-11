import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Publish = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [post,setPost] = useState({
        description: '',
        image:''
    });
    const getUserInfo = () => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
    };
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };
    
      const handlePhoto = (e) => {
        setPost({ ...post, [e.target.name]: e.target.files[0] });
      };
    const handleSubmit = async (e)=>{
        const formData = new FormData();
        formData.append('description', post.description);
        formData.append('image', post.image);
        e.preventDefault();
        console.log(post.image);
        console.log(post.description);
        if (post.description || post.image ){
            console.log(post);
            try {
                const response = await axios.post(`http://localhost:4000/posts/add/${user._id}`, formData);
                console.log(response.data);
                // clear form state
                setPost({
                    description: '',
                    image:''
                });
                setError('');
                window.reload(true);
            } catch (error) {
                console.log(error);
                setError('هناك خطأ ما');
            }
        } else {
            setError('يجب اضافة صورة أو وصف للمنشور');
        }
    }
    useEffect(()=>{
        var fileInput = document.getElementById('imagePost');
        var fileLabel = document.querySelector('label');
        fileInput.addEventListener('change', function() {
        if (fileInput.value) {
            fileLabel.textContent = fileInput.value;
        } else {
            fileLabel.textContent = 'رفع صورة';
        }
        });
        getUserInfo();
    },[])
  return (
    <form className='publish' onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea 
            name="description" id="description" placeholder='أكتب منشورا'
            className=' w-full'
            onChange={handleChange}
            ></textarea>
        <div className="footerPost flex gap-2">
            <input type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handlePhoto} id="imagePost" style={{display:'none'}} />
            <label htmlFor="imagePost">رفع صورة</label>
            <button>نشر</button>
        </div>
    </form>
  )
}

export default Publish
