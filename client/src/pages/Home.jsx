import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

const Home = () => {
  // useRef is a react hook similar to useState. Difference is all it holds is a reference to an element on the page
  const editorRef = useRef(null);
  const [code, setCode] = useState("// type code here");

  function handleEditorDidMount(editor, monaco) {
    console.log("here")
    console.log(editor)
    // when editor mounts (added to virual DOM) function runs and and sets the editorRef's current property to the editor element so we can access it later
    editorRef.current = editor;
  } 

  function handleEditorChange(value, event) {

    console.log(value)
    // setCode(value)
  }

  function getEditorCode()
  {
    if(editorRef.current)
    {
      return editorRef.current.getValue()
    }

    return null
  }

  function showValue() {
    alert(getEditorCode());
    // console.log(code)
  }

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>Home</h1>
          <Editor 
            height="500px" 
            defaultLanguage="javascript"
            defaultValue={code}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
          />
          <button className='btn btn-secondary' onClick={showValue}>
            Click Me
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
