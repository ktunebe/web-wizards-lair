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
}) => {

	const handlePass = () => {
		setIsOpen(false)
		window.location.reload()
	}

	return (
		<Dialog
			open={isOpen}
			onClose={() => {}}
			className="relative z-50">
			<DialogBackdrop className="fixed inset-0 bg-black/80" />
			<div className="fixed inset-0 w-screen overflow-y-auto p-4">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel className="w-3/4 space-y-4 border bg-jet text-lightGray p-12">
						<DialogTitle className="font-bold">{`${
							answerStatus ? 'You passed!' : 'You failed!'
						}`}</DialogTitle>
						<Description>Test Results: </Description>
						{data.problem.tests.map((test, index) => {
							const answer = data.problem.answers[index]
							const userOutput = userOutputArray[index]
							const result = testResultsArray[index]
							console.log(testResultsArray)
							return (
								<div
									key={test}
									className={`text-white border-4 p-4 rounded`}>
										<p>{`Expect ${test} to equal: ${answer}.`}</p> <p className={`rounded w-1/2 ${
										result ? 'bg-green-800' : 'bg-lannisterRed'
									}`}>Your output: {userOutput}</p>
								</div>
								
							)
						})}
					<div className="flex flex-col">
						<div className="nes-balloon from-right self-end">
							<p className="self-start">You smell!!</p>
						</div>
						<img className="self-end" src="misc-images/archmage.png" />
					</div>
						<Button
							className={`rounded ${answerStatus ? 'bg-green-800' : 'bg-lannisterRed'} py-2 px-4 text-sm border-2 text-white data-[hover]:bg-jet data-[active]:bg-jet`}
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
