import React, {
  useCallback,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from '@/components/lexical/plugins/editorToolbarPlugin/inlineFormat/InlineFormat.module.scss';
import classNames from 'classnames/bind';
import {
  LexicalInlineFormatOptions,
  LexicalInlineFormatTooltips,
} from '@/shared/constants/lexical';
import BoldIcon from '@/public/icon/type-bold.svg';
import ItalicIcon from '@/public/icon/type-italic.svg';
import UnderlineIcon from '@/public/icon/type-underline.svg';
import StrikethroughIcon from '@/public/icon/type-strikethrough.svg';
import CodeIcon from '@/public/icon/code.svg';
import SuperScriptIcon from '@/public/icon/type-superscript.svg';
import SubScriptIcon from '@/public/icon/type-subscript.svg';
import LinkIcon from '@/public/icon/link.svg';
import HighlightIcon from '@/public/icon/highlight.svg';
import ClearIcon from '@/public/icon/trash.svg';
import MarkdownIcon from '@/public/icon/markdown.svg';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
  TextFormatType,
} from 'lexical';
import { $isTableSelection } from '@lexical/table';
import { $getNearestBlockElementAncestorOrThrow } from '@lexical/utils';
import { $isHeadingNode, $isQuoteNode } from '@lexical/rich-text';
import { $isDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import useWindow from '@/shared/hooks/useWindow';
import { Tooltip } from '@mui/material';

const cx = classNames.bind(styles);

const InlineFormat = () => {
  const { windowWidth, windowHeight } = useWindow();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [side, setSide] = useState<'left' | 'right'>('right');
  const [editor] = useLexicalComposerContext();
  const ref = useRef<HTMLDivElement>(null);
  const [inlineFormat, setInlineFormat] = useState<
    typeof LexicalInlineFormatOptions
  >(LexicalInlineFormatOptions);

  const handleMouseDown = (event: ReactMouseEvent) => {
    if (event.shiftKey) {
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && ref.current?.clientWidth && ref.current?.clientHeight) {
        const newPosition = {
          x: event.clientX,
          y: event.clientY,
        };
        setPosition(newPosition);
      }
    };

    const handleMouseUp = () => {
      if (position) {
        const px =
          position.x < 0
            ? 0
            : position.x > windowWidth
            ? windowWidth
            : position.x;
        const py =
          position.y < 75
            ? 75
            : position.y > windowHeight
            ? windowHeight
            : position.y;
        setPosition({
          x: px > window.innerWidth / 2 ? windowWidth : 0,
          y: py,
        });
      }
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      // 이벤트 정리
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, side]);

  useEffect(() => {
    if (!isDragging && position) {
      setSide(position.x > window.innerWidth / 2 ? 'right' : 'left');
    }
  }, [isDragging, position, side]);

  const getIcon = useCallback(
    (format: keyof typeof LexicalInlineFormatOptions) => {
      switch (format) {
        case 'bold':
          return <BoldIcon viewBox="0 0 16 16" className={cx('icon')} />;
        case 'italic':
          return <ItalicIcon viewBox="0 0 16 16" className={cx('icon')} />;
        case 'underline':
          return <UnderlineIcon viewBox="0 0 16 16" className={cx('icon')} />;
        case 'strike':
          return (
            <StrikethroughIcon viewBox="0 0 16 16" className={cx('icon')} />
          );
        case 'code':
          return <CodeIcon viewBox="0 0 16 16" className={cx('icon')} />;
        case 'highlight':
          return (
            <HighlightIcon viewBox="0 0 24 24" className={cx('highlight')} />
          );
        case 'subscript':
          return <SubScriptIcon viewBox="0 0 16 16" className={cx('icon')} />;
        case 'superscript':
          return <SuperScriptIcon viewBox="0 0 16 16" className={cx('icon')} />;
        case 'strikethrough':
          return (
            <StrikethroughIcon viewBox="0 0 16 16" className={cx('icon')} />
          );
        case 'markdown':
          return <MarkdownIcon viewBox="0 0 16 16" className={cx('icon')} />;
        case 'link':
          return <LinkIcon viewBox="0 0 16 16" className={cx('icon')} />;
        case 'clear':
          return <ClearIcon viewBox="0 0 16 16" className={cx('clear')} />;
      }
    },
    [inlineFormat]
  );

  const clearFormatting = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || $isTableSelection(selection)) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const nodes = selection.getNodes();
        const extractedNodes = selection.extract();
        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return;
        }

        nodes.forEach((node, idx) => {
          if ($isTextNode(node)) {
            let textNode = node;
            if (idx === 0 && anchor.offset !== 0) {
              textNode = textNode.splitText(anchor.offset)[1] || textNode;
            }
            if (idx === nodes.length - 1) {
              textNode = textNode.splitText(focus.offset)[0] || textNode;
            }
            const extractedTextNode = extractedNodes[0];
            if (nodes.length === 1 && $isTextNode(extractedTextNode)) {
              textNode = extractedTextNode;
            }

            if (textNode.__style !== '') {
              textNode.setStyle('');
            }
            if (textNode.__format !== 0) {
              textNode.setFormat(0);
              $getNearestBlockElementAncestorOrThrow(textNode).setFormat('');
            }
            node = textNode;
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true);
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat('');
          }
        });
      }
    });
  }, [editor, inlineFormat]);

  useEffect(() => {
    return editor.registerTextContentListener(() => {
      editor.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const format = {
            bold: selection.hasFormat('bold'),
            italic: selection.hasFormat('italic'),
            underline: selection.hasFormat('underline'),
            strikethrough: selection.hasFormat('strikethrough'),
            code: selection.hasFormat('code'),
            highlight: selection.hasFormat('highlight'),
            subscript: selection.hasFormat('subscript'),
            superscript: selection.hasFormat('superscript'),
          };
          setInlineFormat(format);
          editor.focus();
        }
      });
    });
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes();
          nodes.forEach((node) => {
            if ($isTextNode(node)) {
              const format = {
                bold: selection.hasFormat('bold'),
                italic: selection.hasFormat('italic'),
                underline: selection.hasFormat('underline'),
                strikethrough: selection.hasFormat('strikethrough'),
                code: selection.hasFormat('code'),
                highlight: selection.hasFormat('highlight'),
                subscript: selection.hasFormat('subscript'),
                superscript: selection.hasFormat('superscript'),
              };
              setInlineFormat(format);
            }
          });
        }
      });
    });
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        return true;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, inlineFormat]);

  return (
    <div
      className={cx('list-container')}
      ref={ref}
      style={{
        top: position ? position.y : '100%',
        left: position
          ? isDragging
            ? position.x
            : side === 'left'
            ? 0
            : windowWidth
          : '100%',
        transform: position
          ? `translateX(${side === 'left' ? '0' : '-100%'})`
          : 'translate(-100%, -100%)',
        transition: isDragging ? 'none' : 'all 0.3s ease',
      }}
      onMouseDown={handleMouseDown}
    >
      {Object.keys(LexicalInlineFormatOptions).map(
        (key: string, index: number) => {
          return (
            <Tooltip
              key={`${key}-${index}`}
              title={`${LexicalInlineFormatTooltips[key]}`}
              placement="top"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -5],
                      },
                    },
                  ],
                },
              }}
            >
              <button
                className={cx('list-item', { active: inlineFormat[key] })}
                onClick={() => {
                  editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                      selection.formatText(key as TextFormatType);
                    }
                  });
                  editor.focus();
                }}
              >
                {getIcon(key)}
              </button>
            </Tooltip>
          );
        }
      )}
      <button
        className={cx('list-item', { last: true })}
        onClick={clearFormatting}
      >
        {getIcon('clear')}
      </button>
    </div>
  );
};

export default InlineFormat;
