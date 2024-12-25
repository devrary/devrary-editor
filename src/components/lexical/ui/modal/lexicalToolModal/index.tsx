import React, { useEffect, useRef, useState } from 'react';
import styles from '@/components/lexical/ui/modal/lexicalToolModal/LexicalToolModal.module.scss';
import classNames from 'classnames/bind';
import { ToolAggregationModalParam } from '@/states/lexical/lexicalModal/LexicalModalContext';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  KEY_ARROW_UP_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical';
import { useOnClick } from '@/shared/hooks/useOnClick';
import { useLexicalModal } from '@/states/lexical/lexicalModal/LexicalModalProvider';

const cx = classNames.bind(styles);

const LexicalToolModal = ({ position }: ToolAggregationModalParam) => {
  const [focus, setFocus] = useState<number>(0);
  const [editor] = useLexicalComposerContext();
  const modalRef = useRef<HTMLDivElement>(null);
  const { removeModal } = useLexicalModal();

  useEffect(() => {
    const removeUp = editor.registerCommand(
      KEY_ARROW_UP_COMMAND,
      (payload) => {
        payload.preventDefault();

        if (focus === 0) {
          setFocus(4);
        } else if (focus > 1) {
          setFocus((prev) => prev - 1);
        }
        return true;
      },
      COMMAND_PRIORITY_CRITICAL
    );
    const removeDown = editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      () => {
        if (focus === 0) {
          setFocus(1);
        } else if (focus < 4) {
          setFocus((prev) => prev + 1);
        }
        return true;
      },
      COMMAND_PRIORITY_CRITICAL
    );

    return () => {
      removeUp();
      removeDown();
    };
  }, [setFocus, focus, editor]);

  useOnClick({
    ref: modalRef,
    handler: () => {
      editor.focus();
      removeModal('tool-aggregation');
    },
    mouseEvent: 'click',
  });

  return (
    <section
      className={cx('modal-container')}
      ref={modalRef}
      style={{ position: 'fixed', left: position.x, top: position.y }}
    >
      <div className={cx('inner')}>
        <div tabIndex={1} className={cx('list-item', { focus: focus === 1 })}>
          <span className={cx('item-text')}>Block Format</span>
          <span className={cx('item-command')}>Shift+b</span>
        </div>
        <div tabIndex={2} className={cx('list-item', { focus: focus === 2 })}>
          <span className={cx('item-text')}>Node Format</span>
          <span className={cx('item-command')}>Shift+N</span>
        </div>
        <div tabIndex={3} className={cx('list-item', { focus: focus === 3 })}>
          <span className={cx('item-text')}>Element Format</span>
          <span className={cx('item-command')}>Shift+E</span>
        </div>
        <div tabIndex={4} className={cx('list-item', { focus: focus === 4 })}>
          <span className={cx('item-text')}>Inline Format</span>
          <span className={cx('item-command')}>Shift+I</span>
        </div>
      </div>
    </section>
  );
};

export default LexicalToolModal;
