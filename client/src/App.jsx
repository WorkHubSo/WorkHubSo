import { Route, Routes } from 'react-router-dom'
import { About, Contact, Header, Home, Jobs, Resumes } from './index'
import './App.css'
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Jobs' element={<Jobs/>}/>
      <Route path='/Resumes' element={<Resumes/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/About' element={<About/>}/>
    </Routes>
    
    </>
  )
}

export default App
