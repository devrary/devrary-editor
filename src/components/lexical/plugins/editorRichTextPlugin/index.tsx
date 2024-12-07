import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import styles from '@/components/lexical/plugins/editorRichTextPlugin/EditorRichTextPlugin.module.scss';
import classNames from 'classnames/bind';
import React, { useCallback, useMemo } from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const cx = classNames.bind(styles);

type Props = {
  placeholder?: string;
};

const EditorRichTextPlugin = ({
  placeholder = `Hello, World... Hello, Devrary...`,
}: Props) => {
  const [editor] = useLexicalComposerContext();
  const value = useMemo(() => {
    return placeholder ?? 'Type something awesome here!';
  }, [placeholder]);
  const handleFocus = useCallback(() => {
    editor.focus();
  }, []);
  return (
    <div className={cx('richtext-wrapper')}>
      <RichTextPlugin
        contentEditable={
          <div className={cx('richtext-container')}>
            <ContentEditable
              contentEditable
              className={cx('richtext')}
              role="textbox"
            />
          </div>
        }
        placeholder={
          <div className={cx('placeholder-container')} onClick={handleFocus}>
            <span className={cx('placeholder-text')}>{value}</span>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
};

export default EditorRichTextPlugin;
