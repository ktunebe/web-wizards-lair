import CodeEditor from "../components/CodeEditor"
import { Flex } from "antd"


const EditorSandbox = () => {
    return (
        <Flex style={{width: "80%", justifyContent: 'center'}} vertical>
            <CodeEditor />
        </Flex>
    )
}

export default EditorSandbox

