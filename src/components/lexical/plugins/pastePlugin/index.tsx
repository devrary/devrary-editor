import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  COMMAND_PRIORITY_HIGH,
  FORMAT_TEXT_COMMAND,
  PASTE_COMMAND,
} from "lexical";

const PastePlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removePasteListener = editor.registerCommand(
      PASTE_COMMAND,
      (event) => {
        (async () => {
          const clipboardEvent = event as ClipboardEvent;
          clipboardEvent.preventDefault();

          const clipboardData = clipboardEvent.clipboardData
            ?.getData("text/plain")
            .split("\n");

          editor.update(async () => {});
        })();
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );

    return () => {
      removePasteListener();
    };
  }, [editor]);
  return null;
};

export default PastePlugin;
