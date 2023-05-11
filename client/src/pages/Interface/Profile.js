import React from 'react'

import UserNavbar from '../../components/Global/UserNavbar'
import Search from './Search'
import Accounts from './Accounts'

import './style.css'
import UserInfo from './UserInfo'

const Profile = () => {
    return (
    <div className=' bg-[#fafafa]'>
        <UserNavbar />
        <div className='page flex justify-start align-middle mt-14'>
            <Accounts />
            <UserInfo />
            <Search />
        </div>
    </div>
    )
}
export default Profile