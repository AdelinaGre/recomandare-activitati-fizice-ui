import { FormEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import User from './components/User'
import UpBar from './components/UpBar'
import Api_disp from './components/Api_disp'
import WeatherWidget from './components/weather'
import './App.css'

const App = () => {
  const [inputValue, setInputValue] = useState('London')
  const [location, setLocation] = useState('London')
  
  const handleFormSubmit =(e : FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLocation(inputValue)
  }
  return (
    <>
          <UpBar />
      <div className="dashboard">
     
        <Sidebar />
        <div className="weather-widget-container">
          <form onSubmit={handleFormSubmit}>
            <input type="text" value={inputValue} 
            onChange={(e)=>{setInputValue(e.target.value)}}/>
            <button type="submit">Update Location</button>
          </form>
        <WeatherWidget location={location}/>
        </div>
        <div className="dashboard-content">
          {/* <Content />
          <User /> */}
         <Api_disp />
        </div>
      </div>
    </>
  );
};
export default App;

