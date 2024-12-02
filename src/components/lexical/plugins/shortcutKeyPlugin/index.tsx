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
import { useLexicalModal } from '@/states/lexical/lexicalModal/LexicalModalProvider';

const ShortCutKeyPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { addModal, removeModal } = useLexicalModal();

  useEffect(() => {
    editor.registerTextContentListener(() => {
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

          if (shorcut.slice(-1) === '/') {
            const anchor = selection.anchor.getNode();
            const key = anchor.getKey();
            const domRange = key
              ? editor.getElementByKey(key)?.getBoundingClientRect()
              : null;
            if (domRange) {
              addModal({
                key: 'tool-aggregation',
                params: {
                  position: { x: domRange.width, y: domRange.y },
                },
              });
            }
          } else {
            removeModal('tool-aggregation');
          }
        }
      });
    });
  }, [editor]);
  return null;
};

export default ShortCutKeyPlugin;
