import { useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROBLEM } from '../../utils/queries'

import Editor from '@monaco-editor/react'
import codeRunner from '../../web-worker/codeRunner'

// const starterCode = `const add = (num1, num2) => {
// //Do not touch above this line  
	
// //Do not touch below this line
// }`
// const tests = ['add(2,4)', 'add(55,110)']
// const answers = [6, 165]



const CodeEditor = () => {
	const { loading, error, data } = useQuery(GET_PROBLEM, { variables: { problemTier: 1 } })
	console.log(data?.problem)

	// useRef is a react hook similar to useState. Difference is all it holds is a reference to an element on the page
	const editorRef = useRef(null)

	function handleEditorDidMount(editor, monaco) {
		// when editor mounts (added to virual DOM) function runs and and sets the editorRef's current property to the editor element so we can access it later
		editorRef.current = editor
	}

	function handleEditorChange(value, event) {
		console.log(value)
		// setCode(value)
	}

	function getEditorCode() {
		if (editorRef.current) {
			console.log(editorRef.current)
			return editorRef.current.getValue()
		}

		return null
	}

	const runCode = () => {
		let value = getEditorCode()
		codeRunner(value, data.problem.tests, data.problem.answers, finishedEval)
	}

	const finishedEval = (testResults, userOutput) => {
		console.log(testResults, userOutput)
	}

	if (loading) {
		return (
			<div>Loading...</div>
		)
	}

	return (
		<>
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
