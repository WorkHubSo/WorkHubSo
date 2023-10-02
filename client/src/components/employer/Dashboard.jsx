import { Outlet } from 'react-router-dom'
import { Dashboard_sidebar } from '../../index'
const Dashboard = () => {
	return (
		<div className='w-full'>
			<div className="w-full  p-4 flex flex-row justify-start items-start gap-10">
				<Dashboard_sidebar/>
			<Outlet/>
			</div>
		</div>
	)
}

export default Dashboard