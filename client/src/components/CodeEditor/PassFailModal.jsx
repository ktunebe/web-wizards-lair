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
	answerStatus,
}) => {
	return (
		<Dialog
			open={isOpen}
			onClose={() => {}}
			className="relative z-50">
			<DialogBackdrop className="fixed inset-0 bg-black/80" />
			<div className="fixed inset-0 w-screen overflow-y-auto p-4">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel className="w-1/2 space-y-4 border bg-jet text-lightGray p-12">
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
									className={`text-white ${
										result ? 'bg-green-800' : 'bg-lannisterRed'
									}`}>{`Expect ${test} to equal ${answer}.`}</p>
							)
						})}
					<div className="flex flex-col">
						<div className="nes-balloon from-right self-end">
							<p className="self-start">Josh's Message Here!!</p>
						</div>
						<img className="self-end" src="misc-images/archmage.png" />
					</div>
						<Button
							className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
							onClick={() => setIsOpen(false)}>
							{`${answerStatus ? 'Continue' : 'Try Again'}`}
						</Button>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}

export default PassFailModal
