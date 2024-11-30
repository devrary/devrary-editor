/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils';
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical';
import { useEffect, useState } from 'react';

import {
  $createPageBreakNode,
  PageBreakNode,
} from '@/components/lexical/nodes/pageBreakNode';

export const INSERT_PAGE_BREAK: LexicalCommand<undefined> = createCommand();

export default function PageBreakPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const [sequence, setSequence] = useState<number>(0);

  useEffect(() => {
    if (!editor.hasNodes([PageBreakNode])) {
      throw new Error(
        'PageBreakPlugin: PageBreakNode is not registered on editor'
      );
    }

    editor.registerTextContentListener(() => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        }
        const root = $getRoot();
        let index = 1;
        root.getChildren().forEach((node) => {
          if (
            node.getType() === 'page-break' &&
            node instanceof PageBreakNode
          ) {
            const pgBreak = $createPageBreakNode(index);
            node.replace(pgBreak);
            index++;
          }
          setSequence(index);
        });
      });
    });

    return mergeRegister(
      editor.registerCommand(
        INSERT_PAGE_BREAK,
        () => {
          editor.update(() => {
            const selection = $getSelection();

            if (!$isRangeSelection(selection)) {
              return false;
            }
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
            const pgBreak = $createPageBreakNode(0);
            $insertNodeToNearestRoot(pgBreak);
          });
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor, sequence]);

  return null;
}
