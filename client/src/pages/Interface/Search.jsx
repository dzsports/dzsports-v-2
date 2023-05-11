import React, { useEffect, useState } from 'react'
// import { HashLink as Link } from 'react-router-hash-link';
import axios from 'axios'
import getPlace from '../../components/functions/GetPlace'
import userPhoto from '../../assets/user.png'
import follow from '../../assets/follow.png'

const Search = () => {
  const [place , setPlace] = useState({
    wilaya: '',
    daira: '',
    baladia: ''
  })
  const [searchResults, setSearchResults] = useState([]);

  const handlChange = (e) => {
    setPlace({...place , [e.target.name] : e.target.value})
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    document.querySelector('.dontResult').innerHTML = 'ليس هناك نتائج توافق بحثك'
    if (place.wilaya && place.daira && place.baladia) {
      try {
        const response = await axios.post('http://localhost:4000/search', place);
        setSearchResults(response.data.users);
        console.log(response.data.users);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      document.querySelector('.dontResult').innerHTML = 'املئ جميع الخانات للبحث'
    }
  };

  useEffect(() => {
    getPlace('wilayaSelect1','dairaSelect1','baladiaSelect1');
  })
  return (
    <>
      <div className="search flex flex-col" onSubmit={handleSearch}>
        <label htmlFor="address" className='titlesearch'>البحث عن نادي</label>
        <form className="places flex flex-col gap-2">
          <div className="wilaya">
            <label htmlFor="wilaya" className=' ml-1' >الولاية</label>
            <select name="wilaya" id="wilaya" onChange={handlChange} defaultValue={document.querySelectorAll('#wilaya option')[0]} className='wilayaSelect1'>
            </select>
          </div>
          <div className="daira">
            <label htmlFor="daira" className=' ml-1' >الدائرة</label>
            <select name="daira" id="daira" onChange={handlChange} defaultValue={document.querySelectorAll('#daira option')[0]} className='dairaSelect1'>
            </select>
          </div>
          <div className="baladia">
            <label htmlFor="baladia" className=' ml-1' >البلدية</label>
            <select name="baladia" id="baladia" onChange={handlChange} defaultValue={document.querySelectorAll('#baladia option')[0]} className='baladiaSelect1'>
            </select>
          </div>
          <button className="search">بحث</button>
        </form>
      <div className="searchResult">
        <div className='text-center mb-4 mt-4 text-2xl'>نتائج البحث</div>
        {searchResults.length > 0 ? (
            searchResults.map((userFound) => (
              <div
                key={userFound._id}
                className="accountResult flex gap-2 align-middle justify-between md:w-2/3 w-full"
              >
                <img src={follow} alt="follow" className="w-8" />
                <a href={`/dzsports/profile/${userFound._id}`} className='flex gap-2 align-middle justify-between cursor-pointer'>
                  <span className="text-xl text-white">{userFound.name}</span>
                  <img src={userFound.photoProfile ?`http://localhost:4000/uploads/${userFound.photoProfile}`:userPhoto} alt="userPhoto" className="w-8 h-8" />
                </a>
              </div>
            ))
          ) : (
            <div className='dontResult text-center text-red-600 font-semibold'></div>
          )}
      </div>
      </div>
    </>
  )
}

export default Search