import { Route, Routes } from 'react-router-dom'
import { About, Candidate, Change_password, Company_dashboard, Contact, Dashboard, Edit_profile, Employer_signin, Employer_signup, Home, Job_seeker_manage_profile, Job_seeker_signin, Job_seeker_signup, Jobs, JopOffer, Resume_detail, Resumes } from './index'
import './App.css'
import View_job_seeker_profile from './components/job_seeker/job_seeker_profile/View_job_seeker_profile'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer position='top-center'/>
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
        <Route path='/Resume_detail/:_id' element={<Resume_detail />} />

        {/* employers routes  */}
        <Route path='/Employer_signup' element={<Employer_signup />} />
        <Route path='/Employer_signin' element={<Employer_signin />} />
        <Route path='/Dashboard' element={<Dashboard/>}>
          <Route index element={<Company_dashboard/>} />
          <Route path='Company_dashboard' element={<Company_dashboard/>} />
          <Route path='job_offer' element={<JopOffer/>} />
          <Route path='candidate' element={<Candidate/>} />
          <Route path='edit_profile' element={<Edit_profile/>} />
          <Route path='change_password' element={<Change_password/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
