import { Route, Routes } from 'react-router-dom'
import { About, Contact, Footer, Header, Home, Job_seeker_manage_profile, Job_seeker_signin, Job_seeker_signup, Jobs, Resumes } from './index'
import './App.css'
import View_job_seeker_profile from './components/job_seeker/job_seeker_profile/View_job_seeker_profile'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer position='top-center'/>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Jobs' element={<Jobs />} />
        <Route path='/Resumes' element={<Resumes />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Job_seeker_signup' element={<Job_seeker_signup />} />
        <Route path='/Job_seeker_signin' element={<Job_seeker_signin />} />
        <Route path='/Job_seeker_manage_profile' element={<Job_seeker_manage_profile />} />
        <Route path='/Job_seeker_manage_profile/:id' element={<Job_seeker_manage_profile />} />
        <Route path='/View_job_seeker_profile' element={<View_job_seeker_profile />} />
      </Routes>

      <Footer />

    </>
  )
}

export default App
