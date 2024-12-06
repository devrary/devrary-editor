import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  $createTextNode,
  TextNode,
  $getRoot,
  KEY_ENTER_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical';
import {
  $createPageBreakNode,
  PageBreakNode,
} from '@/components/lexical/nodes/pageBreakNode';
import { useLexicalModal } from '@/states/lexical/lexicalModal/LexicalModalProvider';
import { INSERT_IMAGE_INSERTION_COMMAND } from '@/components/lexical/plugins/imageInsertionPlugin';

const ShortCutKeyPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { addModal, removeModal } = useLexicalModal();

  useEffect(() => {
    editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        } else {
          const shortcut = selection.anchor.getNode().getTextContent();
          if (shortcut === '>> image-insertion-file') {
            const anchor = selection.anchor.getNode();
            if (anchor instanceof TextNode) {
              anchor.remove();
            }
            editor.dispatchCommand(INSERT_IMAGE_INSERTION_COMMAND, {
              mode: 'file',
              status: false,
              id: Date.now().toString(),
            });
            event?.preventDefault();
            return true;
          } else if (shortcut === '>> image-insertion-url') {
            const anchor = selection.anchor.getNode();
            if (anchor instanceof TextNode) {
              anchor.remove();
            }
            editor.dispatchCommand(INSERT_IMAGE_INSERTION_COMMAND, {
              mode: 'url',
              status: false,
              id: Date.now().toString(),
            });
            event?.preventDefault();
            return true;
          } else if (shortcut === '>> image-insertion') {
            const anchor = selection.anchor.getNode();
            if (anchor instanceof TextNode) {
              anchor.remove();
            }
            editor.dispatchCommand(INSERT_IMAGE_INSERTION_COMMAND, {
              mode: null,
              status: false,
              id: Date.now().toString(),
            });
            event?.preventDefault();
            return true;
          }
          return false;
        }
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  useEffect(() => {
    editor.registerTextContentListener(() => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        } else {
          const shortcut = selection.anchor.getNode().getTextContent();
          if (shortcut === '>>>') {
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

          if (shortcut.slice(-1) === '/') {
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
