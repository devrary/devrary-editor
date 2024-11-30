import { LexicalNodes } from '@/components/lexical/nodes';
import theme from '@/components/lexical/theme/lexicalTheme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { ComponentProps, useState } from 'react';
import styles from '@/components/common/inputs/editorInput/EditorInput.module.scss';
import classNames from 'classnames/bind';
import LexicalSettingProvider from '@/states/lexical/lexicalSetting/LexicalSettingProvider';
import LexicalHistoryProvider from '@/states/lexical/lexicalHistory/LexicalHistoryProvider';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import AutoLinkPlugin from '@/components/lexical/plugins/autoLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import DragDropPastePlugin from '@/components/lexical/plugins/dragDropPastePlugin';
import ImagePlugin from '@/components/lexical/plugins/imagePlugin';
import InlineImagePlugin from '@/components/lexical/plugins/inlineImagePlugin';
import KeywordsPlugin from '@/components/lexical/plugins/keywordPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { LayoutPlugin } from '@/components/lexical/plugins/layoutPlugin';
import PageBreakPlugin from '@/components/lexical/plugins/pageBreakPlugin';
import EditorRichTextPlugin from '@/components/lexical/plugins/editorRichTextPlugin';
import PastePlugin from '@/components/lexical/plugins/pastePlugin';
import LexicalShareStateProvider from '@/states/lexical/lexicalShareState/LexicalShareStateProvider';
import ShareStateSenderPlugin from '@/components/lexical/plugins/shareStateSender';
import ViewerPlugin from '@/components/lexical/plugins/viewerPlugin';
import PollPlugin from '@/components/lexical/plugins/pollPlugin';
import StickyPlugin from '@/components/lexical/plugins/stickyPlugin';
import dynamic from 'next/dynamic';
import EmojiListPlugin from '@/components/lexical/plugins/emojiListPlugin';
import ExcalidrawPlugin from '@/components/lexical/plugins/excalidrawPlugin';
import EquationsPlugin from '@/components/lexical/plugins/equationPlugin';
import AutocompletePlugin from '@/components/lexical/plugins/autoCompletePlugin';
import TwitterPlugin from '@/components/lexical/plugins/tweetPlugin';
import YouTubePlugin from '@/components/lexical/plugins/youtubePlugin';
import FigmaPlugin from '@/components/lexical/plugins/figmaPlugin';
import CollapsiblePlugin from '@/components/lexical/plugins/collapsiblePlugin';
import MarkdownPlugin from '@/components/lexical/plugins/markdownPlugin';
import AutoEmbedPlugin from '@/components/lexical/plugins/autoEmbedPlugin';
import MultiLinkDisplayPlugin from '@/components/lexical/plugins/multiLinkDisplayPlugin';
import HorizontalRulePlugin from '@/components/lexical/plugins/horizontalRulePlugin';
import '@/components/lexical/theme/LexicalTheme.scss';
import ShortCutKeyPlugin from '@/components/lexical/plugins/shortcutKeyPlugin';

const cx = classNames.bind(styles);

const EditorToolbarPlugin = dynamic(
  () => import('@/components/lexical/plugins/editorToolbarPlugin'),
  { ssr: false }
);

const MentionPlugin = dynamic(
  () => import('@/components/lexical/plugins/mentionPlugin'),
  { ssr: false }
);

const EmojiPickerPlugin = dynamic(
  () => import('@/components/lexical/plugins/emojiPickerPlugin'),
  { ssr: false }
);

const EditorInput = () => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] =
    {
      namespace: 'editor-root',
      nodes: [...LexicalNodes],
      onError: (error: Error) => {
        console.error(error);
      },
      theme: theme,
    };

  return (
    <LexicalShareStateProvider>
      <LexicalSettingProvider>
        <div className={cx('editor-input')}>
          <LexicalComposer initialConfig={initialConfig}>
            <LexicalHistoryProvider>
              <div className={cx('editor')}>
                <div className={cx('toolbar')}>
                  <EditorToolbarPlugin
                    setIsLinkEditMode={setIsLinkEditMode}
                    showToolbar={showToolbar}
                  />
                </div>
                <EditorRichTextPlugin />
                {/* <AutoFocusPlugin /> */}
                <PastePlugin />
                <LinkPlugin />
                <CheckListPlugin />
                <ClearEditorPlugin />
                <AutoLinkPlugin />
                <HorizontalRulePlugin />
                <ListPlugin />
                <DragDropPastePlugin />
                <ImagePlugin />
                <InlineImagePlugin />
                <KeywordsPlugin />
                <HistoryPlugin />
                <HashtagPlugin />
                <LayoutPlugin />
                <PageBreakPlugin />
                <ShareStateSenderPlugin />
                <PollPlugin />
                <StickyPlugin />
                <MentionPlugin />
                <EmojiListPlugin />
                <EmojiPickerPlugin />
                <ExcalidrawPlugin />
                <EquationsPlugin />
                <AutocompletePlugin />
                <TwitterPlugin />
                <YouTubePlugin />
                <FigmaPlugin />
                <CollapsiblePlugin />
                <MarkdownPlugin />
                <AutoEmbedPlugin />
                <MultiLinkDisplayPlugin />
                <ShortCutKeyPlugin />
                <ViewerPlugin />
              </div>
            </LexicalHistoryProvider>
          </LexicalComposer>
        </div>
      </LexicalSettingProvider>
    </LexicalShareStateProvider>
  );
};

export default EditorInput;
