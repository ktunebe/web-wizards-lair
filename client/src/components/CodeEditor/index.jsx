import { useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PROBLEM } from '../../utils/queries'
import { TIER_UP } from '../../utils/mutations'

import PassFailModal from './PassFailModal'
import Editor from '@monaco-editor/react'
import codeRunner from '../../web-worker/codeRunner'

// const starterCode = `const add = (num1, num2) => {
// //Do not touch above this line

// //Do not touch below this line
// }`
// const tests = ['add(2,4)', 'add(55,110)']
// const answers = [6, 165]

const CodeEditor = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [testResultsArray, setTestResultsArray] = useState([])
	const [answerStatus, setAnswerStatus] = useState(false)
	const { loading, error, data } = useQuery(GET_PROBLEM)
	const problem = data?.problem || {}
	console.log(data, loading)
	const [tierUp] = useMutation(TIER_UP)
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
		codeRunner(value, problem.tests, problem.answers, finishedEval)
		setIsOpen(true)
	}

	const finishedEval = async (testResults, userOutput, status, userAnswer) => {
		console.log(problem._id, problem.answers, status, userAnswer)

		if (status) {
			await tierUp({
				variables: {
					solution: { problem: problem._id, solution: userAnswer },
				},
				refetchQueries: [ GET_PROBLEM, "problem"  ]
			})
		}
		setAnswerStatus(status)
		setTestResultsArray(testResults)
	}

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<>
			{data?.problem && (
							<PassFailModal
							data={data}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							testResultsArray={testResultsArray}
							setTestResultsArray={setTestResultsArray}
							answerStatus={answerStatus}
							setAnswerStatus={setAnswerStatus}
						/>
			)}
			<p
				style={{ whiteSpace: 'pre-line' }}
				className="text-white py-4 text-center">
				{problem?.lore}
			</p>
			<Editor
				height="500px"
				defaultLanguage="javascript"
				defaultValue={problem?.starterCode}
				onMount={handleEditorDidMount}
				onChange={handleEditorChange}
				theme="vs-dark"
			/>
			<div className="flex justify-center" style={{ margin: '16px' }}>
				<button className="btn" onClick={runCode}>
					Test Me
				</button>
			</div>
		</>
	)
}

export default CodeEditor
