import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

const Private_route_employers = () => {
	const employerToken = Cookies.get('employerToken')
	if(!employerToken){
		return <Navigate to='/Employer_signin'/>
	}

	return <Outlet/>
}

export default Private_route_employers