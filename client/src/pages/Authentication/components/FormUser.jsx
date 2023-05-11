import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getPlace from '../../../components/functions/GetPlace';

const FormUser = (props) => {
    
    const [user, setUser] = useState({
        typeOfUser:'user',
        name:'',
        email:'',
        password:'',
        phone:'',
        birthday:'',
        wilaya:'',
        daira:'',
        baladia:'',
        sport:'',
        gender:''
    });
    const [checkPassword,setCkeckPassword] = useState('')
    const [errors,setErrors] = useState([]);
    const [jsonMessage,setJsonMessage] = useState('');
    const [error,setError] = useState('');


    const handleChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleCheckPassword = (event) => {
        const checkedPassword = event.target.value;
        setCkeckPassword(checkedPassword);
    };
    const Login = async (event) => {
        event.preventDefault();
        console.log(user);
        let errors = [];
        if (user.name.length < 6) {
            errors.push('nameError');
        }
        if (user.password.length < 8) {
            errors.push('passwordError');
        }
        if (user.password !== checkPassword) {
            errors.push('checkPasswordError');
        }
        if (user.phone.length !== 10) {
            errors.push('phoneError');
        }
        setErrors(errors);
        console.log(errors);
        if (!errors.length) {
            console.log(user);
            try {
                const response = await axios.post('http://localhost:4000/signup',user)
                setError('');
                setJsonMessage(response.data.message)
                setErrors([]);
                console.log(response.data);
            } catch (error) {
                console.log(error);
                setJsonMessage('')
                setError('رقم الهاتف مستخدم سابقا');
            }
        } else {
            errors = [];
            setErrors(errors);
            setJsonMessage('')
            setError('يجب أن تكون جميع العلومات مملوئة بشكل صحيح')
        }
    };
    useEffect(()=>{
        getPlace('wilayaSelect0','dairaSelect0','baladiaSelect0');
    })
    return (
        <form action="" method='get' className={props.activeForm === 'client' ? 'active p-4' : 'hidden'} onSubmit={Login}>
            {jsonMessage && <div className="jsonMessage text-center mt-6 p-2 w-fit mx-auto mb-4">{jsonMessage}</div>}
            {error && <div className="error text-center mt-6 p-2 w-fit mx-auto mb-4">{error}</div>}
            <div className="parts flex">
            <div className="part flex flex-col gap-4">
                <div className="input flex flex-col">
                    <label htmlFor="name">الإسم الكامل</label>
                    <input type="text" id='name' name='name' className={errors.includes('nameError') ? 'red-border':null} onChange={handleChange} required />
                    <small className={errors.includes('nameError') ? ' text-red-700':'hidden'}>يجب أن يكون الإسم أطول من 6 أحرف</small>
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="email">البريد الإلكتروني</label>
                    <input type="email" id='email' name='email' onChange={handleChange} required />
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="phone">رقم الهاتف</label>
                    <input type="number" id='phone' name='phone' required className={errors.includes('phoneError') ? 'red-border' :null} onChange={handleChange} />
                    <small className={errors.includes('phoneError') ? ' text-red-700' : 'hidden'} >رقم هاتف غير صالح</small>
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="password">كلمة السر</label>
                    <input type="password" id='password' name='password' className={errors.includes('passwordError') ? 'red-border' :null} onChange={handleChange} required />
                    <small className={errors.includes('passwordError') ? ' text-red-700':'hidden'}>يجب أن تكون كلمة السر أطول من 8 أحرف</small>
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="confirmPassword">تأكيد كلمة السر</label>
                    <input type="password" id='confirmPassword' name='confirmPassword' className={errors.includes('checkPasswordError') ? 'red-border' :null} onChange={handleCheckPassword} required />
                    <small className={errors.includes('checkPasswordError') ? ' text-red-700':'hidden'}>كلمتي السر غير متطابقتين</small>
                </div>
            </div>
            <div className="part flex flex-col gap-4">
                <div className="input flex flex-col">
                    <label htmlFor="birthday">تاريخ الميلاد</label>
                    <input type="date" id='birthday' name='birthday' onChange={handleChange} required />
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="address">مكان السكن</label>
                    <div className="places flex flex-col gap-2">
                        <div className="wilaya">
                            <label htmlFor="wilaya" className=' ml-1' >الولاية</label>
                            <select name="wilaya" id="wilaya" className='wilayaSelect0' defaultValue={document.querySelectorAll('#wilaya option')[0]} onChange={handleChange} required >
                                
                            </select>
                        </div>
                        <div className="daira">
                            <label htmlFor="daira" className=' ml-1'>الدائرة</label>
                            <select name="daira" id="daira" className='dairaSelect0' defaultValue={document.querySelectorAll('#daira option')[0]} onChange={handleChange} required>
                            </select>
                        </div>
                        <div className="baladia">
                            <label htmlFor="baladia" className=' ml-1' >البلدية</label>
                            <select name="baladia" id="baladia" className='baladiaSelect0' defaultValue={document.querySelectorAll('#baladia option')[0]} onChange={handleChange} required>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="sport">رياضتك المفضلة</label>
                    <input type="text" name="sport" id="sport" onChange={handleChange} required />
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="gender">الجنس</label>
                    <select name="gender" id="gender" onChange={handleChange} required>
                        <option value="man" selected>ذكر</option>
                        <option value="woman">انثى</option>
                    </select>
                </div>
            </div>
            </div>
            <input type="submit" value="إنشاء حساب" className=' cursor-pointer'/>
        </form>
    )
}

export default FormUser