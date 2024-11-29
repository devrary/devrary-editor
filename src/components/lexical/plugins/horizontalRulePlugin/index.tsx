import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  TextNode,
} from "lexical";
import { $createHorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HorizontalRulePlugin as LexicalHorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";

const HorizontalRulePlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeListener = editor.registerTextContentListener(() => {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const text = selection.anchor.getNode().getTextContent();
          if (text === "---") {
            const anchor = selection.anchor.getNode();
            if (anchor instanceof TextNode) {
              anchor.remove();
              const hrNode = $createHorizontalRuleNode();
              selection.insertNodes([hrNode]);
              const textNode = $createTextNode();
              selection.insertNodes([textNode]);
              textNode.select();
            }
          }
        }
      });
    });
    return () => {
      removeListener();
    };
  }, [editor]);
  return <LexicalHorizontalRulePlugin />;
};

export default HorizontalRulePlugin;
