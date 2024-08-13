console.log('Main started!')

let timeoutId
// get this from codemirror
const codeRunner = async (userAnswer, tests, answers, finishedEval) => {
    if (window.Worker) {
      const worker = new Worker('/worker.js')
    
      worker.onmessage = e => {
        const { testResults, userOutput, status } = e.data
        clearTimeout(timeoutId)
        worker.terminate()
        finishedEval(testResults, userOutput, status, userAnswer)
      }
    
      worker.postMessage({
        type: 'EVAL_ANSWER',
        answers: answers,
        codeToRun: userAnswer,
        codeTests: tests
      })

      timeoutId = setTimeout(() => {
        worker.terminate()
      }, 3000)
    
    } else {
      console.log('Workers are not supported')
    }
}




export default codeRunner