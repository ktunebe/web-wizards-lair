import { useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PROBLEM } from '../../utils/queries'
import { TIER_UP } from '../../utils/mutations'
// import { Dialog } from '@headlessui/react'
import PassFailModal from './PassFailModal'
 
import Editor from '@monaco-editor/react'
import codeRunner from '../../web-worker/codeRunner'

// const starterCode = `const add = (num1, num2) => {
// //Do not touch above this line  
	
// //Do not touch below this line
// }`
// const tests = ['add(2,4)', 'add(55,110)']
// const answers = [6, 165]

// let answerStatus


// const Modal = ({isOpen, setIsOpen, data, testResultsArray, answerStatus}) => {
	
// 	return (
// 		<Dialog
// 				open={isOpen}
// 				onClose={() => setIsOpen(false)}
// 				className="relative z-50"
// 				>
// 				<div className="dialog-backdrop" aria-hidden="true" />
// 				<div className="dialog-container">
// 					<div className="dialog-panel">
// 						{data.problem.tests.map((test, index) => {
// 							const answer = data.problem.answers[index]
// 							const result = testResultsArray[index]
// 							console.log(testResultsArray)
// 							return (
// 							<p key={test} className={`${result ? 'bg-green-500' : 'bg-red-500'}`}>{`Expect ${test} to equal ${answer}.`}</p>
// 							)
// 						})}
// 						<button>{`${answerStatus ? 'Continue' : 'Try Again'}`}</button>
// 					</div>
// 				</div>
// 			</Dialog>
// 	)
// }

const CodeEditor = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [testResultsArray, setTestResultsArray] = useState([])
	const [answerStatus, setAnswerStatus] = useState(false)
	const { loading, error, data } = useQuery(GET_PROBLEM)
	console.log(data)
	const [ tierUp ] = useMutation(TIER_UP)
	// useRef is a react hook similar to useState. Difference is all it holds is a reference to an element on the page
	const editorRef = useRef(null)

	function handleEditorDidMount(editor, monaco) {
		// when editor mounts (added to virual DOM) function runs and and sets the editorRef's current property to the editor element so we can access it later
		editorRef.current = editor
	}

	function handleEditorChange(value, event) {
		// setCode(value)
	}

	function getEditorCode() {
		if (editorRef.current) {
			return editorRef.current.getValue()
		}

		return null
	}

	const runCode = () => {
		let value = getEditorCode()
		codeRunner(value, data.problem.tests, data.problem.answers, finishedEval)
		setIsOpen(true)
		
	}

	const finishedEval = async (testResults, userOutput, status, userAnswer) => {
		console.log(data.problem._id, data.problem.answers, status, userAnswer)

		if (status) {
			await tierUp({
				variables: { solution: { problem: data.problem._id, solution: userAnswer } }
				
			})
		}
		setAnswerStatus(status)
		setTestResultsArray(testResults)
	}

	if (loading) {
		return (
			<div>Loading...</div>
		)
	}

	return (
		<>
				<PassFailModal 
					data={data} 
					isOpen={isOpen} 
					setIsOpen={setIsOpen} 
					testResultsArray={testResultsArray} 
					setTestResultsArray={setTestResultsArray}
					answerStatus={answerStatus}
					setAnswerStatus={setAnswerStatus}
				/>
				<p style={{ whiteSpace: 'pre-line' }} className='text-white py-4 text-center'>{data.problem?.lore}</p>
			<Editor
				height="500px"
				defaultLanguage="javascript"
				defaultValue={data?.problem.starterCode}
				onMount={handleEditorDidMount}
				onChange={handleEditorChange}
				theme="vs-dark"
			/>
			<div className="flex-row justify-center" style={{ margin: '16px' }}>
				<button className="btn" onClick={runCode}>
					Test Me
				</button>
			</div>
		</>
	)
}

export default CodeEditor