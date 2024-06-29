import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import User from './components/User'
import UpBar from './components/UpBar'
import Api_disp from './components/Api_disp'
import './App.css'

const App = () => {
  return (
    <>
          <UpBar />
      <div className="dashboard">
        <Sidebar />
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



// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more.  here was
//       </p>
//     </>
//   )
// }

// export default App
