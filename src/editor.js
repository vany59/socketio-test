import React, { useRef } from "react";
import { Button } from "antd";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

export const Editor = (props) => {
  const { readonly, socket, options } = props;
  // console.log(withButton);

  const value = useRef();
  const showData = useRef();

  const play = () => {
    const data = value.current.editor.getValue();
    if (options.socketType === "on") {
      socket.on(data, (returnData) => {
        console.log(returnData);
        showData.current.editor.setValue(
          JSON.stringify(returnData, null, "\t"),
          -1
        );
      });
    } else {
      const getEditorValue = value.current.editor.getValue();
      let editorValue = JSON.stringify(
        getEditorValue.toString(),
        null,
        "\t"
      ).slice(1, -1);
      const valueJson = JSON.parse(
        editorValue.replace(/\\n/g, "").replace(/ /g, "").replace(/\\/g, "")
      );

      const { event, data } = valueJson;
      if (!event || !data) {
        showData.current.editor.setValue("ERROR");
      }
      socket.emit(event, data);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
      }}
    >
      <AceEditor
        ref={value}
        height="500px"
        mode="json"
        theme="github"
        name="blah1"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={""}
        readOnly={readonly || false}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          behavioursEnabled: true,
          highlightActiveLine: true,
        }}
      />
      <Button
        type="primary"
        shape="circle"
        onClick={play}
        style={{ margin: 20 }}
      >
        play
      </Button>
      <AceEditor
        ref={showData}
        height="500px"
        mode="json"
        theme="github"
        name="blah2"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={""}
        readOnly={true}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          behavioursEnabled: true,
          highlightActiveLine: true,
        }}
      />
    </div>
  );
};
