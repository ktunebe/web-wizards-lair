import { useRef, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PROBLEM } from '../../utils/queries'
import { TIER_UP } from '../../utils/mutations'
import { QUERY_ME } from '../../utils/queries'
import { Button } from '@headlessui/react'

import PassFailModal from './PassFailModal'
import Editor from '@monaco-editor/react'
import codeRunner from '../../web-worker/codeRunner'

import './styles.css'

const CodeEditor = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [testResultsArray, setTestResultsArray] = useState([])
	const [answerStatus, setAnswerStatus] = useState(false)
	const [userOutputArray, setUserOutputArray] = useState(false)
	const { loading, error, data } = useQuery(GET_PROBLEM)
	const problem = data?.problem || {}
	const { data: userData } = useQuery(QUERY_ME)
	const user = userData?.me || {}
	const [tierUp] = useMutation(TIER_UP)
	// useRef is a react hook similar to useState. Difference is all it holds is a reference to an element on the page
	const editorRef = useRef(null)

	// State to store viewport height and width
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

	// Update viewport width on resize
	useEffect(() => {
		const handleResize = () => {
			setViewportWidth(window.innerWidth)
			setViewportHeight(window.innerHeight)
		}
		// Attach event listener
		window.addEventListener('resize', handleResize)

		// Clean up event listener on unmount
		return () => window.removeEventListener('resize', handleResize)
	}, [])

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
		let untrimmedValue = getEditorCode()
		console.log(untrimmedValue)
		let value = untrimmedValue
			.replace("//Don't edit above this line.", '')
			.replace("//Don't edit below this line.", '')
		console.log(value)
		codeRunner(value, problem.tests, problem.answers, finishedEval)
		setIsOpen(true)
	}

	const finishedEval = async (testResults, userOutput, status, userAnswer) => {
		if (status) {
			console.log(userAnswer)
			await tierUp({
				variables: {
					solution: { problem: problem._id, solution: userAnswer },
				},

				// refetchQueries: [ GET_PROBLEM, "problem"  ]
			})
		}

		setAnswerStatus(status)
		setTestResultsArray(testResults)
		setUserOutputArray(userOutput)
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
					userOutputArray={userOutputArray}
					setUserOutputArray={setUserOutputArray}
					answerStatus={answerStatus}
					setAnswerStatus={setAnswerStatus}
				/>
			)}

			<div className="w-full flex flex-col items-center">
				<div className="container flex flex-col md:flex-row items-center md:gap-4 w-full md:h-[50vh]">
					{viewportWidth < 768 ? (
						<p className="w-3/4 text-center text-red-500 border border-red-500 p-2 mb-2">
							You may want to return on a larger screen!
						</p>
					) : (
						''
					)}
					<div className="flex flex-col justify-center items-center text-center min-h-64 h-1/2 md:h-full w-2/3 md:w-2/5 scroll-img whitespace-pre-line overflow-y-auto">
						{viewportWidth < 768 || viewportHeight < 700 ? (
							''
						) : (
							<p className="text-lannisterRed w-3/4 border-y border-lannisterRed leading-snug mb-1 xl:py-4">
								{problem?.lore}
							</p>
						)}
						<p className="text-black w-3/4 pt-2">{problem?.instructions}</p>
					</div>
					<div className="py-2 w-full md:w-3/5 h-full">
						<Editor
							height="100%"
							width="100%"
							defaultLanguage="javascript"
							defaultValue={data?.problem.starterCode}
							options={{
								minimap: {
									enabled: false,
								},
							}}
							onMount={handleEditorDidMount}
							onChange={handleEditorChange}
							theme="vs-dark"
						/>
					</div>
				</div>
				<Button
					className="rounded bg-lannisterRed my-4 py-2 px-8 text-sm text-center border-2 border-lannisterGold text-lannisterGold data-[hover]:text-white data-[hover]:border-white data-[active]:bg-jet transition-colors duration-300 ease-in-out"
					onClick={runCode}>
					Submit
				</Button>
			</div>
			<img className="avatar-style" src={user.avatar} alt="user avatar image" />
		</>
	)
}

export default CodeEditor
