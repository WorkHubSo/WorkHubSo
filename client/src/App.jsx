import { Route, Routes } from 'react-router-dom';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import View_job_seeker_profile from './components/job_seeker/job_seeker_profile/View_job_seeker_profile';
import { About, Applied_jobs, Change_password, Company_dashboard, Contact, Dashboard, Edit_profile, Employer_signin, Employer_signup, Home, Job_detail, Job_seeker_manage_profile, Job_seeker_signin, Job_seeker_signup, Jobs, JopOffer, Manage_jobs, Opps, Private_route_employers, Private_route_job_seekers, Resume_detail, Resumes, View_Job_detail } from './index';
function App() {
  return (
    <>
      <ToastContainer position='top-center' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Jobs' element={<Jobs />} />
        <Route path='/Job_detail/:_id' element={<Job_detail />} />
        <Route path='/Resumes' element={<Resumes />} />
        <Route path='/Resume_detail/:_id' element={<Resume_detail />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Job_seeker_signup' element={<Job_seeker_signup />} />
        <Route path='/Job_seeker_signin' element={<Job_seeker_signin />} />

        {/* here emplemented private routes of job seeker */}
        

        <Route path='/Job_seeker_manage_profile' element={<Private_route_job_seekers />}>
          <Route path='/Job_seeker_manage_profile' element={<Job_seeker_manage_profile />} />
        </Route>


        <Route path='/Job_seeker_manage_profile/:id' element={<Private_route_job_seekers />}>
          <Route path='/Job_seeker_manage_profile/:id' element={<Job_seeker_manage_profile />} />
        </Route>


        <Route path='/View_job_seeker_profile' element={<Private_route_job_seekers />}>
          <Route path='/View_job_seeker_profile' element={<View_job_seeker_profile />} />
        </Route>


        <Route path='/Applied_jobs' element={<Private_route_job_seekers />}>
          <Route path='/Applied_jobs' element={<Applied_jobs />} />
        </Route>

        {/* employers routes  */}
        <Route path='/Employer_signup' element={<Employer_signup />} />
        <Route path='/Employer_signin' element={<Employer_signin />} />
        <Route path='/Dashboard' element={<Private_route_employers />}>
          <Route path='/Dashboard' element={<Dashboard />}>
            <Route index element={<Company_dashboard />} />
            <Route path='Company_dashboard' element={<Company_dashboard />} />
            <Route path='job_offer' element={<JopOffer />} />
            <Route path='edit_profile' element={<Edit_profile />} />
            <Route path='job_offer/:_id' element={<JopOffer />} />
            <Route path='view_job_detail/:_id' element={<View_Job_detail />} />
            <Route path='change_password' element={<Change_password />} />
            <Route path='Manage_jobs' element={<Manage_jobs />} />
          </Route>
        </Route>
        <Route path='*' element={<Opps />} />
      </Routes>
    </>
  )
}

export default App
