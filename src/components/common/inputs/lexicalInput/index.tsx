import React, { ComponentProps, useState } from "react";
import "@/components/lexical/theme/Lexical.css";
import styles from "@/components/common/inputs/lexicalInput/LexicalInput.module.scss";
import classNames from "classnames/bind";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import LexicalRichTextPlugin from "@/components/lexical/plugins/richTextPlugin";
import UploadFileButton from "@/components/common/button/uploadFileButton";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LinkPlugin from "@/components/lexical/plugins/linkPlugin";
import { LexicalNodes } from "@/components/lexical/nodes";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import AutoLinkPlugin from "@/components/lexical/plugins/autoLinkPlugin";
import LexicalSettingProvider from "@/states/lexical/lexicalSetting/LexicalSettingProvider";
import LexicalHistoryProvider from "@/states/lexical/lexicalHistory/LexicalHistoryProvider";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import DragDropPaste from "@/components/lexical/plugins/dragDropPastePlugin";
import ImagePlugin from "@/components/lexical/plugins/imagePlugin";
import InlineImagePlugin from "@/components/lexical/plugins/inlineImagePlugin";
import KeywordsPlugin from "@/components/lexical/plugins/keywordPlugin";
import HistoryPlugin from "@/components/lexical/plugins/historyPlugin";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { LayoutPlugin } from "@/components/lexical/plugins/layoutPlugin";
import PageBreakPlugin from "@/components/lexical/plugins/pageBreakPlugin";
import ToolbarPlugin from "@/components/lexical/plugins/toolbarPlugin";
import theme from "@/components/lexical/theme/lexicalTheme";

const cx = classNames.bind(styles);

const LexicalInput = () => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] =
    {
      namespace: "editor-root",
      nodes: [...LexicalNodes],
      onError: (error: Error) => {
        console.error(error);
      },
      theme: theme,
    };
  return (
    <LexicalSettingProvider>
      <div className={cx("lexical-shell")}>
        <LexicalComposer initialConfig={initialConfig}>
          <LexicalHistoryProvider>
            <div className={cx("editor")}>
              <div className={cx("toolbar")}>
                <ToolbarPlugin
                  setIsLinkEditMode={setIsLinkEditMode}
                  showToolbar={showToolbar}
                />
              </div>
              <UploadFileButton
                show={showToolbar}
                onClick={() => setShowToolbar(!showToolbar)}
              />
              <LexicalRichTextPlugin />
              <AutoFocusPlugin />
              <LinkPlugin />
              <CheckListPlugin />
              <ClearEditorPlugin />
              <AutoLinkPlugin />
              <HorizontalRulePlugin />
              <ListPlugin />
              <DragDropPaste />
              <ImagePlugin />
              <InlineImagePlugin />
              <KeywordsPlugin />
              <HistoryPlugin />
              <HashtagPlugin />
              <LayoutPlugin />
              <PageBreakPlugin />
            </div>
          </LexicalHistoryProvider>
        </LexicalComposer>
      </div>
    </LexicalSettingProvider>
  );
};

export default LexicalInput;
