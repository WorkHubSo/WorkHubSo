import { Route, Routes } from 'react-router-dom'
import { About, Applied_jobs, Change_password, Company_dashboard, Contact, Dashboard, Edit_profile, Employer_signin, Employer_signup, Home, Job_candidates, Job_detail, Job_seeker_manage_profile, Job_seeker_signin, Job_seeker_signup, Jobs, JopOffer, Manage_jobs, Resume_detail, Resumes, View_Job_detail } from './index'
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
        <Route path='/Job_detail/:_id' element={<Job_detail/>} />
        <Route path='/Resumes' element={<Resumes />} />
        <Route path='/Resume_detail/:_id' element={<Resume_detail />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Job_seeker_signup' element={<Job_seeker_signup />} />
        <Route path='/Job_seeker_signin' element={<Job_seeker_signin />} />
        <Route path='/Job_seeker_manage_profile' element={<Job_seeker_manage_profile />} />
        <Route path='/Job_seeker_manage_profile/:id' element={<Job_seeker_manage_profile />} />
        <Route path='/View_job_seeker_profile' element={<View_job_seeker_profile />} />
        <Route path='/Applied_jobs' element={<Applied_jobs/>} />

        {/* employers routes  */}
        <Route path='/Employer_signup' element={<Employer_signup />} />
        <Route path='/Employer_signin' element={<Employer_signin />} />
        <Route path='/Dashboard' element={<Dashboard />}>
          <Route index element={<Company_dashboard/>} />
          <Route path='Company_dashboard' element={<Company_dashboard/>} />
          <Route path='job_offer' element={<JopOffer/>} />
          <Route path='job_candidates' element={<Job_candidates/>} />
          <Route path='edit_profile' element={<Edit_profile/>} />
          <Route path='job_offer/:_id' element={<JopOffer/>} />
          <Route path='view_job_detail/:_id' element={<View_Job_detail/>} />
          <Route path='change_password' element={<Change_password/>} />
          <Route path='Manage_jobs' element={<Manage_jobs/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
