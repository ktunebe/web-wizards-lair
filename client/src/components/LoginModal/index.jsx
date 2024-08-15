import { useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import Login from './Login'
import Signup from './Signup'

const LoginModal = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="nes-btn absolute-middle is-warning"
				>
				Log In/Sign Up
			</button>
			<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
						<TabGroup className="">
							<TabList className="flex flex-wrap justify-center gap-8 mt-2 border-b-4">
								<Tab className="w-1/3 bg-danger mx-2 text-white btn ">
									Log In
								</Tab>
								<Tab className="w-1/3 bg-danger mx-2 text-white btn ">
									Sign Up
								</Tab>
							</TabList>
							<TabPanels className="">
								<TabPanel className='bg-red-500'>
									<Login isOpen={isOpen} setIsOpen={setIsOpen} />
								</TabPanel>
								<TabPanel>
									<Signup isOpen={isOpen} setIsOpen={setIsOpen} />
								</TabPanel>
							</TabPanels>
						</TabGroup>
          </DialogPanel>
        </div>
      </Dialog>
			{/* <Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="relative z-50">
				<div className="dialog-backdrop" aria-hidden="true" />
				<div className="dialog-container">
					<div className="dialog-panel">

					</div>
				</div>
			</Dialog> */}
		</>
	)
}
export default LoginModal
