import React, { useCallback, useRef, useState } from 'react';
import styles from '@/components/lexical/plugins/editorToolbarPlugin/nodeFormat/NodeFormat.module.scss';
import classNames from 'classnames/bind';
import { LexicalNodeFormatOptions } from '@/shared/constants/lexical';
import HorizontalRuleIcon from '@/public/icon/horizontal-rule.svg';
import PageBreakIcon from '@/public/icon/scissors.svg';
import ImageIcon from '@/public/icon/file-image.svg';
import GifIcon from '@/public/icon/filetype-gif.svg';
import ExclidrawIcon from '@/public/icon/diagram-2.svg';
import TableIcon from '@/public/icon/table.svg';
import PollIcon from '@/public/icon/card-checklist.svg';
import ColumnIcon from '@/public/icon/3-columns.svg';
import EquationIcon from '@/public/icon/plus-slash-minus.svg';
import StickyIcon from '@/public/icon/sticky.svg';
import CollapsibleIcon from '@/public/icon/caret-right-fill.svg';
import TweetIcon from '@/public/icon/tweet.svg';
import YoutubeIcon from '@/public/icon/youtube.svg';
import FigmaIcon from '@/public/icon/figma.svg';
import TextIcon from '@/public/icon/text.svg';
import { useOnClick } from '@/shared/hooks/useOnClick';
import IconButton from '@/components/common/button/iconButton';
import LinkIcon from '@/public/icon/link-embed.svg';
import GithubIcon from '@/public/icon/github.svg';
import AdvancedCodeIcon from '@/public/icon/advanced-code.svg';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import {
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  TextNode,
} from 'lexical';
import { INSERT_PAGE_BREAK } from '@/components/lexical/plugins/pageBreakPlugin';
import { INSERT_IMAGE_INSERTION_COMMAND } from '../../imageInsertionPlugin';
import { ImageNode } from '@/components/lexical/nodes/imageNode';

const cx = classNames.bind(styles);

type Props = {
  direction: 'row' | 'column';
};

const NodeFormat = ({ direction }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [nodeType, setNodeType] =
    useState<keyof typeof LexicalNodeFormatOptions>('plaintext');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const getIcon = useCallback(
    (nodeType: keyof typeof LexicalNodeFormatOptions) => {
      switch (nodeType) {
        case 'plaintext':
          return <TextIcon viewBox="0 0 24 24" className={cx('text-icon')} />;
        case 'horizontalrule':
          return (
            <HorizontalRuleIcon viewBox="0 0 16 16" className={cx('hr-icon')} />
          );
        case 'pagebreak':
          return (
            <PageBreakIcon viewBox="0 0 16 16" className={cx('pb-icon')} />
          );
        case 'image':
          return <ImageIcon viewBox="0 0 16 16" className={cx('image-icon')} />;
        case 'inlineimage':
          return <ImageIcon viewBox="0 0 16 16" className={cx('image-icon')} />;
        case 'gif':
          return <GifIcon viewBox="0 0 16 16" className={cx('gif-icon')} />;
        case 'excalidraw':
          return (
            <ExclidrawIcon
              viewBox="0 0 16 16"
              className={cx('excalidraw-icon')}
            />
          );
        case 'table':
          return <TableIcon viewBox="0 0 16 16" className={cx('table-icon')} />;
        case 'poll':
          return <PollIcon viewBox="0 0 16 16" className={cx('poll-icon')} />;
        case 'column':
          return (
            <ColumnIcon viewBox="0 0 16 16" className={cx('column-icon')} />
          );
        case 'equation':
          return (
            <EquationIcon viewBox="0 0 16 16" className={cx('equation-icon')} />
          );
        case 'sticky':
          return (
            <StickyIcon viewBox="0 0 16 16" className={cx('sticky-icon')} />
          );
        case 'collapsible':
          return (
            <CollapsibleIcon
              viewBox="0 0 16 16"
              className={cx('collapsible-icon')}
            />
          );
        case 'tweet':
          return <TweetIcon viewBox="0 0 16 16" className={cx('tweet-icon')} />;
        case 'youtube':
          return (
            <YoutubeIcon viewBox="0 0 16 16" className={cx('youtube-icon')} />
          );
        case 'figma':
          return (
            <FigmaIcon viewBox="0 0 384 512" className={cx('figma-icon')} />
          );
        case 'link':
          return <LinkIcon viewBox="0 0 24 24" className={cx('link-icon')} />;
        case 'github':
          return (
            <GithubIcon viewBox="0 0 98 96" className={cx('github-icon')} />
          );
        case 'advancedcode':
          return (
            <AdvancedCodeIcon
              viewBox="0 0 256 256"
              className={cx('advanced-code-icon')}
            />
          );
      }
    },
    [nodeType]
  );

  const insertHorizontalRule = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor.getNode();
        if (anchor && anchor instanceof TextNode) {
          anchor.remove();
        }
        const hrNode = $createHorizontalRuleNode();
        selection.insertNodes([hrNode]);
        const textNode = $createTextNode();
        selection.insertNodes([textNode]);
        textNode.select();
      }
    });
    setOpen(false);
  };

  useOnClick({
    ref: containerRef,
    handler: () => setOpen(false),
    mouseEvent: 'click',
  });

  return (
    <div
      className={cx('container')}
      style={{ flexDirection: direction }}
      ref={containerRef}
    >
      <IconButton
        onClick={() => {
          setOpen(!open);
        }}
        title={`${nodeType}`}
        icon={`${nodeType}`}
      >
        {getIcon(nodeType)}
      </IconButton>
      {open && (
        <div className={cx('list-container')}>
          <button className={cx('list-item')}>
            {getIcon('plaintext')}
            <span className={cx('item-text')}>Plain Text</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('link')}
            <span className={cx('item-text')}>Link</span>
          </button>
          <button
            className={cx('list-item')}
            onClick={() => insertHorizontalRule()}
          >
            {getIcon('horizontalrule')}
            <span className={cx('item-text')}>Horizontal Rule</span>
          </button>
          <button
            className={cx('list-item')}
            onClick={() => {
              editor.dispatchCommand(INSERT_PAGE_BREAK, undefined);
              setOpen(false);
            }}
          >
            {getIcon('pagebreak')}
            <span className={cx('item-text')}>Page Break</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('advancedcode')}
            <span className={cx('item-text')}>Advanced Code</span>
          </button>
          <button
            className={cx('list-item')}
            onClick={() => {
              editor.update(() => {
                editor.dispatchCommand(INSERT_IMAGE_INSERTION_COMMAND, {
                  mode: null,
                  status: false,
                });
              });

              setOpen(false);
            }}
          >
            {getIcon('image')}
            <span className={cx('item-text')}>Image</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('inlineimage')}
            <span className={cx('item-text')}>Inline Image</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('gif')}
            <span className={cx('item-text')}>GIF</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('excalidraw')}
            <span className={cx('item-text')}>Excalidraw</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('table')}
            <span className={cx('item-text')}>Table</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('poll')}
            <span className={cx('item-text')}>Poll</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('column')}
            <span className={cx('item-text')}>Columns Layout</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('equation')}
            <span className={cx('item-text')}>Equation</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('sticky')}
            <span className={cx('item-text')}>Sticky Note</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('collapsible')}
            <span className={cx('item-text')}>Collapsible Container</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('tweet')}
            <span className={cx('item-text')}>Tweet</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('youtube')}
            <span className={cx('item-text')}>Youtube</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('figma')}
            <span className={cx('item-text')}>Figma</span>
          </button>
          <button className={cx('list-item')}>
            {getIcon('github')}
            <span className={cx('item-text')}>Github</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NodeFormat;
