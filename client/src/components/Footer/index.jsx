import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@headlessui/react'
 
const Footer = () => {
	const location = useLocation()
	const navigate = useNavigate()
	return (
		<footer className="bg-neutral-900 w-full text-light p-4">
			<div className="container text-center mb-5">
				<h4>&copy; {new Date().getFullYear()} - Proj 3 Starter</h4>
			</div>
		</footer>
	)
}

export default Footer
