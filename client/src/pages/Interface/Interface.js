import React from 'react'

import UserNavbar from '../../components/Global/UserNavbar'
import Search from './Search'
import Accounts from './Accounts'
import Posts from './Posts'

import './style.css'

const Interface = () => {
  return (
    <div className=' bg-[#fafafa]'>
      <UserNavbar />
      <div className='page flex justify-start align-middle mt-14'>
        <Accounts />
        {/* <Posts /> */}
        <Search />
      </div>
    </div>
  )
}

export default Interface


