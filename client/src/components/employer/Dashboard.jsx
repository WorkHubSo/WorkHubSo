import { Outlet } from 'react-router-dom'
import { Dashboard_sidebar } from '../../index'
import { SiWorkplace } from 'react-icons/si'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
const Dashboard = () => {
	const [ showMenu , setShowMenu] = useState(true);
	return (
		<div className='w-full'>
			<div className='relative p-5 lg:hidden flex flex-row justify-between items-center gap-5'>
				<h1 className=" text-xl tracking-tighter"><SiWorkplace size={40} className="inline text-[#007bff]" />ork<span className="text-[#333333]">Hubso</span></h1>
				{
					showMenu ? <AiOutlineMenu size={25} className="lg:hidden block absolute right-5" onClick={() => setShowMenu(!showMenu)} />
						: <AiOutlineClose size={25} className="lg:hidden block absolute right-5" onClick={() => setShowMenu(!showMenu)} />
				}
			</div>
			<div className="w-full  p-4 flex flex-row justify-start items-start gap-10">
				<Dashboard_sidebar setShowMenu={setShowMenu} showMenu={showMenu} />
				<Outlet />
			</div>
		</div>
	)
}

export default Dashboard