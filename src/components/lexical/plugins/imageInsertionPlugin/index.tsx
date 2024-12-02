import { CAN_USE_DOM, mergeRegister, $wrapNodeInElement } from '@lexical/utils';
import React, { useEffect } from 'react';
import {
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  $isRootOrShadowRoot,
  createCommand,
  LexicalCommand,
  COMMAND_PRIORITY_EDITOR,
  $createParagraphNode,
} from 'lexical';
import {
  $createImageInsertionNode,
  ImageInsertionNode,
  ImageInsertionPayload,
} from '@/components/lexical/nodes/imageInsertionNode';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const getDOMSelection = (targetWindow: Window | null): Selection | null =>
  CAN_USE_DOM ? (targetWindow || window).getSelection() : null;

export const INSERT_IMAGE_INSERTION_COMMAND: LexicalCommand<ImageInsertionPayload> =
  createCommand('INSERT_IMAGE_INSERTION_COMMAND');

const ImageInsertionPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageInsertionNode])) {
      throw new Error(
        'ImageInsertionPlugin: ImageInsertionNode not registered on editor'
      );
    }

    return editor.registerUpdateListener(() => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        }
      });
    });
  }, [editor]);

  useEffect(() => {
    if (!editor.hasNodes([ImageInsertionNode])) {
      throw new Error(
        'ImageInsertionPlugin: ImageInsertionNode not registered on editor'
      );
    }
    return mergeRegister(
      editor.registerCommand<ImageInsertionPayload>(
        INSERT_IMAGE_INSERTION_COMMAND,
        (payload) => {
          const imageInsertionNode = $createImageInsertionNode(payload);
          $insertNodes([imageInsertionNode]);
          if ($isRootOrShadowRoot(imageInsertionNode.getParentOrThrow())) {
            $wrapNodeInElement(
              imageInsertionNode,
              $createParagraphNode
            ).selectEnd();
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor]);
  return null;
};

export default ImageInsertionPlugin;
