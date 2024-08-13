import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	Button,
} from '@headlessui/react'

const PassFailModal = ({
	isOpen,
	setIsOpen,
	data,
	testResultsArray,
	answerStatus,
}) => {
	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="relative z-50">
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				<DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
					<DialogTitle className="font-bold">{`${
						answerStatus ? 'You passed!' : 'You failed :('
					}`}</DialogTitle>
					<Description>Test Results: </Description>
					{data.problem.tests.map((test, index) => {
						const answer = data.problem.answers[index]
						const result = testResultsArray[index]
						console.log(testResultsArray)
						return (
							<p
								key={test}
								className={`${
									result ? 'bg-green-500' : 'bg-red-500'
								}`}>{`Expect ${test} to equal ${answer}.`}</p>
						)
					})}
					<Button
						className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
						onClick={() => setIsOpen(false)}>
						{`${answerStatus ? 'Continue' : 'Try Again'}`}
					</Button>
				</DialogPanel>
			</div>
		</Dialog>
	)
}

export default PassFailModal
