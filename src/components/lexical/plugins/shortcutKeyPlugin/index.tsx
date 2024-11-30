import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  $createTextNode,
  TextNode,
  $getRoot,
} from 'lexical';
import {
  $createPageBreakNode,
  PageBreakNode,
} from '@/components/lexical/nodes/pageBreakNode';

const ShortCutKeyPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerTextContentListener((text: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        } else {
          const shorcut = selection.anchor.getNode().getTextContent();
          if (shorcut === '>>>') {
            const anchor = selection.anchor.getNode();
            if (anchor instanceof TextNode) {
              anchor.remove();
              const root = $getRoot();
              let index = 1;
              root.getChildren().forEach((node) => {
                if (
                  node.getType() === 'page-break' &&
                  node instanceof PageBreakNode
                ) {
                  index++;
                }
              });

              const pbNode = $createPageBreakNode(index);
              selection.insertNodes([pbNode]);
              const textNode = $createTextNode();
              selection.insertNodes([textNode]);
              textNode.select();
            }
          }
          if (text.slice(-1) === '/') {
            console.log('slash key pressed');
          }
        }
      });
    });
  }, [editor]);
  return null;
};

export default ShortCutKeyPlugin;
