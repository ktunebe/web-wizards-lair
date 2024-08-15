import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
import Auth from '../../utils/auth'

const Header = () => {
	const logout = (event) => {
		event.preventDefault()
		Auth.logout()
	}
	return (
		<header className="bg-neutral-900  mb-4 py-3 flex align-center">
			<div className="container flex justify-between gap-2 align-center text-center">
				<Link className="text-light flex items-center" to="/">
					<h1
						className="m-0 font-bold text-8xl font-pressStart"
						style={{ fontSize: '2rem', color: '#95A3A4' }}>
						Project 3
					</h1>
				</Link>
				<div className="flex flex-wrap justify-center gap-2">
					{Auth.loggedIn() ? (
						<>
							<Link className="w-min" to="/me">
								<Button className="rounded bg-jet data-[hover]:bg-lightGray py-2 px-4 text-sm text-white">
									View Profile
								</Button>
							</Link>
							<Button
								className="rounded bg-jet data-[hover]:bg-lightGray py-2 px-4 text-sm text-white"
								onClick={logout}>
								Logout
							</Button>
						</>
					) : (
						''
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
