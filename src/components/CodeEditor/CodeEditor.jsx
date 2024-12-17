import React from 'react';
import AceEditor from 'react-ace';

// Import các theme và mode cần thiết
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

import './CodeEditor.css';

const CodeEditor = ({ code, onChange, language }) => {
  return (
    <div className="code-editor">
      <AceEditor
        mode={language}
        theme="monokai"
        onChange={onChange}
        value={code}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        width="100%"
        height="400px"
        fontSize={14}
      />
    </div>
  );
};

export default CodeEditor; 