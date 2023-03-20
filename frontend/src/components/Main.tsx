import Editor from "@monaco-editor/react";
import CodeEditor from '@uiw/react-textarea-code-editor';

export function Main ( { binData, language, setBinData }: any ): JSX.Element
{
  return <section className="main">

    {/* <CodeEditor
      className="editor"
      value={ binData }
      language={ language }
      placeholder="Start typing..."
      onChange={ ( event ) =>
      {
        setBinData( event.target.value );
      } }
      style={ {} } /> */}

    <Editor
      theme="vs-dark"
      className="editor"
      value={ binData }
      language={ language }
      defaultValue="// Start typing..."
      options={ {
        fontSize: 20,
      } }
      onChange={ ( event ) =>
      {
        setBinData( event! );
        // console.log( event );
      } }
      />

  </section>;
}
