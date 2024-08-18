import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
import Auth from '../../utils/auth'

const Header = () => {
	const logout = (event) => {
		event.preventDefault()
		Auth.logout()
	}
	return (
		<header className={`bg-neutral-900 py-3 flex align-center justify-center`}>
			<div className={`container flex gap-2 align-center text-center  ${Auth.loggedIn() ? 'justify-between' : 'justify-center'}`}>
				<Link className="flex items-center hover:text-white hover:no-underline" to="/">
					<h1
						className="m-0 font-bold text-2xl sm:text-3xl md:text-4xl text-center font-pressStart"
						>
						The Web Wizard's Lair
					</h1>
				</Link>
					{Auth.loggedIn() ? (
						<>
				<div className="flex flex-wrap justify-center gap-2">
							<Link className="w-min" to="/me">
								<Button className="rounded bg-jet data-[hover]:bg-lightGray py-2 px-4 text-sm text-white">
									My Profile
								</Button>
							</Link>
							<Button
								className="rounded bg-jet data-[hover]:bg-lightGray py-2 px-4 text-sm text-white"
								onClick={logout}>
								Logout
							</Button>
				</div>
						</>
					) : (
						''
					)}
			</div>
		</header>
	)
}

export default Header
