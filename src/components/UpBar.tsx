import React from 'react'
import viteLogo from '/vite.svg'
import hacker from '../icons/hacker.png'
import '../styles/sidebar.css'

const UpBar : React.FC =() => {
    return (
      
        <div className='menu-container'>
          <div className='logo'>
        <a href="https://vitejs.dev" target="_blank" >
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <h2>Weather & Health Tracker</h2>
          </div>
          <img src={hacker} className="hacker-logo" alt="Vite logo" />
        </div>
      
        )
        }
        export default UpBar;