import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { COMMAND_PRIORITY_CRITICAL, KEY_ESCAPE_COMMAND } from 'lexical';
import { useLexicalModal } from '@/states/lexical/lexicalModal/LexicalModalProvider';

const ModalPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { clearModal } = useLexicalModal();

  useEffect(() => {
    editor.registerCommand(
      KEY_ESCAPE_COMMAND,
      () => {
        clearModal();
        return true;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);
  return null;
};

export default ModalPlugin;
