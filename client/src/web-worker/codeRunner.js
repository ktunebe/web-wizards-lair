console.log('Main started!')

let timeoutId
// get this from codemirror
const codeRunner = (userAnswer, tests, answers) => {
    if (window.Worker) {
      const worker = new Worker('/worker.js')
    
      worker.onmessage = e => {
        // switch(e.data.type) {
        //   case 'CORRECT':
        //     alert('Answer is correct!')
        //     break
        //   default:
        //     alert('Too bad, try again')
        // }
        const { testResults, userOutput } = e.data
        console.log(testResults, userOutput)
        clearTimeout(timeoutId)
        worker.terminate()
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