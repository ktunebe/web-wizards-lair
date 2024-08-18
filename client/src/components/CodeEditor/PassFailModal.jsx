import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	DialogBackdrop,
	Button,
} from '@headlessui/react'



const PassFailModal = ({
	isOpen,
	setIsOpen,
	data,
	testResultsArray,
	userOutputArray,
	answerStatus,
	wizardDialog
}) => {


	const handlePass = () => {
		setIsOpen(false)
		window.location.reload()
	}

	return (
		<Dialog open={isOpen} onClose={() => {}} className="relative z-50">
			<DialogBackdrop className="fixed inset-0 bg-black/80" />
			<div className="fixed inset-0 w-screen overflow-y-auto p-4">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel className="w-3/4 space-y-4 border bg-jet text-lightGray p-12">
						<DialogTitle className="pb-4 font-bold text-2xl text-white text-center">{`${
							answerStatus ? 'You passed!' : 'You failed!'
						}`}</DialogTitle>
						<Description className='text-white'>Test Results: </Description>
						{data.problem.tests.map((test, index) => {
							console.log(userOutputArray)
							const answer = data.problem.answers[index]
							const userOutput = userOutputArray[index]
							const result = testResultsArray[index]
							return (
								<div key={test} className={`text-white border-4 p-4 rounded flex flex-col items-start`}>
									<p className='py-2'>{`Expect ${test} to equal: ${answer}.`}</p>{' '}
									<p
										className={`rounded p-1 ${
											result ? 'bg-green-800' : 'bg-lannisterRed'
										}`}>
										Your output: {userOutput == null ?  "You didn't return anything!" : JSON.stringify(userOutput)}
									</p>
								</div>
							)
						})}
						<div className="flex flex-col">
							<div className="nes-balloon from-right self-end">
								<p className="self-start text-black">{wizardDialog}</p>
							</div>
							<img className="self-end" src="misc-images/archmage.png" alt='image of arch-mage' />
						</div>
						<Button
							className={`rounded ${
								answerStatus ? 'bg-green-800' : 'bg-lannisterRed'
							} py-2 px-4 text-sm border-2 text-white data-[hover]:bg-jet data-[active]:bg-jet`}
							onClick={answerStatus ? handlePass : () => setIsOpen(false)}>
							{`${answerStatus ? 'Continue' : 'Try Again'}`}
						</Button>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}

export default PassFailModal
