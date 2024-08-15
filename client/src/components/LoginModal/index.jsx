import { useState } from 'react'
import {
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Dialog,
	DialogPanel,
	Button,
} from '@headlessui/react'

import Login from './Login'
import Signup from './Signup'

const LoginModal = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button
				className="absolute-middle rounded bg-lannisterRed py-2 px-4 text-sm border-2 border-lannisterGold text-lannisterGold data-[hover]:bg-jet data-[hover]:text-lannisterRed data-[hover]:border-lannisterRed transition-colors duration-500 ease-in-out"
				onClick={() => setIsOpen(true)}>
				Log In/Sign Up
			</Button>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="relative z-50">
				<div className="fixed inset-0 flex w-screen items-start pt-[20%] justify-center p-4 overflow-y-auto backdrop-blur-sm">
					<DialogPanel className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 space-y-4">
						<TabGroup className="w-full">
							<TabList className="flex flex-wrap justify-evenly ">
								<Tab className="w-1/3 bg-danger mx-2 text-white bg-lannisterGold py-2 data-[selected]:bg-lannisterRed data-[selected]:border-2 data-[hover]:underline">
									Log In
								</Tab>
								<Tab className="w-1/3 bg-danger mx-2 text-white bg-lannisterGold py-2 data-[selected]:bg-lannisterRed data-[selected]:border-2 data-[hover]:underline">
									Sign Up
								</Tab>
							</TabList>
							<TabPanels className="">
								<TabPanel className="">
									<Login isOpen={isOpen} setIsOpen={setIsOpen} />
								</TabPanel>
								<TabPanel>
									<Signup className="" isOpen={isOpen} setIsOpen={setIsOpen} />
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
