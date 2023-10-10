import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const Private_route_job_seekers = () => {
	const jobSeekerToken = Cookies.get('jobSeekerToken')

	if (!jobSeekerToken) {
		return <Navigate to='/Job_seeker_signin' />
	}
	return <Outlet />

}

export default Private_route_job_seekers