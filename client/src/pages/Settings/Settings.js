import React from 'react'
import UserNavbar from '../../components/Global/UserNavbar'
import SettingsForm from './SettingsForm'

const Settings = () => {

  return (
    <div className=' bg-[#fafafa]'>
      <UserNavbar />
      <div className='formsPage'>
        <div className="formIntro">
          <h1 className='relative text-white my-3 mx-auto w-full text-4xl'>الإعدادات</h1>
        </div>
        <div className="formsInfo">
          <div className="forms">
            <SettingsForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings