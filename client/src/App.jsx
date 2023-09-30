import { Route, Routes } from 'react-router-dom'
import { About, Contact, Header, Home, Job_seeker_manage_profile, Job_seeker_signin, Job_seeker_signup, Jobs, Resumes } from './index'
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
      <Route path='/Job_seeker_signup' element={<Job_seeker_signup/>}/>
      <Route path='/Job_seeker_signin' element={<Job_seeker_signin/>}/>
      <Route path='/Job_seeker_manage_profile' element={<Job_seeker_manage_profile/>}/>
      <Route path='/Job_seeker_manage_profile/:id' element={<Job_seeker_manage_profile/>}/>
    </Routes>
    
    </>
  )
}

export default App
