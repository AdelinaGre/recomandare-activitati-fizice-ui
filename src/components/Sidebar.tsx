import React from 'react'
import viteLogo from '/vite.svg'
import home from '../icons/home.png'
import cloudy from '../icons/cloudy.png'
import user from '../icons/user.png'
import disease from '../icons/heart-disease.png'
import logout from '../icons/logout.png'

import '../styles/sidebar.css'

const Sidebar : React.FC =() => {
  return (
    <div className='menu'>
      <div className='logo'>
       
     
     <div className='menu-items'>
      <a href="#"  className="item">
      <img src={home} className="home-logo" alt="Vite logo" />
        Dashboard
        </a>

        <a href="../change_weather.tsx"  className="item">
          <img src={cloudy} alt="Vite logo" />
          Change Weather
        </a>

        <a href="#"  className="item">
      <img src={user}  alt="Vite logo" />
        Users</a>
        <a href="#"  className="item">
      <img src={disease} alt="Vite logo" />
        Diseases</a>
        <a href="#"  className="item">
      <img src={logout} alt="Vite logo" />
        Log out</a>



     </div>
    </div>
    </div>
  )
}

export default Sidebar