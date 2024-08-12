import { useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Dialog } from '@headlessui/react'

import Login from './Login'
import Signup from './Signup'

const LoginModal = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="absolute-middle btn btn-danger">
				Log In/Sign Up
			</button>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="relative z-50">
				<div className="dialog-backdrop" aria-hidden="true" />
				<div className="dialog-container">
					<div className="dialog-panel">
						<TabGroup className="">
							<TabList className="row justify-center mt-2">
								<Tab className="col-4 bg-danger mx-2 text-white btn ">
									Log In
								</Tab>
								<Tab className="col-4 bg-danger mx-2 text-white btn ">
									Sign Up
								</Tab>
							</TabList>
							<TabPanels className="">
								<TabPanel>
									<Login isOpen={isOpen} setIsOpen={setIsOpen} />
								</TabPanel>
								<TabPanel>
									<Signup isOpen={isOpen} setIsOpen={setIsOpen} />
								</TabPanel>
							</TabPanels>
						</TabGroup>
					</div>
				</div>
			</Dialog>
		</>
	)
}
export default LoginModal
