console.log('Worker started!')


    const handleEvalAnswer = data => {
      const testResults = []
      const userOutput = []
      const { codeToRun, answers, codeTests } = data
      
      for (i = 0; i < codeTests.length; i++) {
        const result = eval(`${codeToRun}  
          ${codeTests[i]}`)
        testResults.push(result == answers[i])
        console.log(result, answers[i])
        userOutput.push(result)
      }
      
      // const messageType = result === data.answer
      //   ? 'CORRECT'
      //   : 'INCORRECT'
    
      postMessage({ testResults, userOutput })
    }
    
    
    onmessage = e => {
      switch(e.data.type) {
        case 'EVAL_ANSWER':
          handleEvalAnswer(e.data)
      }
    }
