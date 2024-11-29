import { useLexicalStateShare } from "@/states/lexical/lexicalShareState/LexicalShareStateContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";

const ViewerPlugin = () => {
  const { stateStr, stateHtml, setStateHtml } = useLexicalStateShare();
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      setStateHtml(htmlString);
    });
  }, [editor, stateStr]);

  useEffect(() => {
    const domParser = new DOMParser();
    const htmlString = "<p>Hello World!</p>";
    const mimeType = "text/xml";
    domParser.parseFromString(htmlString, mimeType);
  }, [stateHtml]);

  return <div></div>;
};

export default ViewerPlugin;
