console.log('Worker started!')


    const handleEvalAnswer = data => {
      const testResults = []
      const userOutput = []
      const { codeToRun, answers, codeTests } = data

      let status = true
      for (zebra = 0; zebra < codeTests.length; zebra++) {
        const result = eval(`${codeToRun}  
          ${codeTests[zebra]}`)
          console.log(JSON.stringify(result).replaceAll(' ', ''), answers[zebra].replaceAll(' ', ''))

          console.log(answers[zebra])
          console.log(zebra)
        if (JSON.stringify(result).replaceAll(' ', '') == answers[zebra].replaceAll(' ', '')){
          testResults.push(true)
        } else {
          testResults.push(false)
          status = false
        }
        userOutput.push(result)
      }
      
    
      postMessage({ testResults, userOutput, status })
    }
    
    
    onmessage = e => {
      switch(e.data.type) {
        case 'EVAL_ANSWER':
          handleEvalAnswer(e.data)
      }
    }
