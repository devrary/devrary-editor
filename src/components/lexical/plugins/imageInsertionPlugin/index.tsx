import { mergeRegister } from '@lexical/utils';
import { useEffect } from 'react';
import {
  $insertNodes,
  createCommand,
  LexicalCommand,
  $getRoot,
  COMMAND_PRIORITY_EDITOR,
  ParagraphNode,
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import {
  $createImageInsertionNode,
  ImageInsertionNode,
  ImageInsertionPayload,
} from '@/components/lexical/nodes/imageInsertionNode';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createImageNode,
  ImageNode,
  ImagePayload,
} from '../../nodes/imageNode';

export const INSERT_IMAGE_INSERTION_COMMAND: LexicalCommand<ImageInsertionPayload> =
  createCommand('INSERT_IMAGE_INSERTION_COMMAND');

export const CONVERT_IMAGE_INSERTION_TO_IMAGE_COMMAND: LexicalCommand<
  ImagePayload & {
    id: string;
  }
> = createCommand('CONVERT_IMAGE_INSERTION_TO_IMAGE_COMMAND');

const ImageInsertionPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageInsertionNode, ImageNode])) {
      throw new Error(
        'ImageInsertionPlugin: ImageInsertionNode not registered on editor'
      );
    }
    return mergeRegister(
      editor.registerCommand(
        CONVERT_IMAGE_INSERTION_TO_IMAGE_COMMAND,
        (payload) => {
          const root = $getRoot();
          root.getChildren().forEach((node) => {
            if (
              node instanceof ImageInsertionNode &&
              node.getType() === 'image-insertion' &&
              node.__id === payload.id
            ) {
              const imageNode = $createImageNode(payload);
              node.replace(imageNode);
            }
          });
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
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
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return false;
          const parent = selection.anchor.getNode().getParent();
          const imageInsertionNode = $createImageInsertionNode(payload);
          parent?.append(imageInsertionNode);
          selection.anchor.getNode().remove();
          const paragraphNode = new ParagraphNode();
          parent?.append(paragraphNode);
          paragraphNode.select();
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor]);
  return null;
};

export default ImageInsertionPlugin;
