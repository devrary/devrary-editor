import React from "react";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import styles from "@/components/lexical/plugins/richTextPlugin/RichTextPlugin.module.scss";
import classNames from "classnames/bind";
import Placeholder from "@/components/lexical/ui/placeholder";

const cx = classNames.bind(styles);

type Props = {
  placeholder?: string;
};

const LexicalRichTextPlugin = ({
  placeholder = `Create a meme you love to see out there!`,
}: Props) => {
  return (
    <RichTextPlugin
      contentEditable={
        <div className={cx("richtext-container")}>
          <ContentEditable
            contentEditable
            className={cx("richtext")}
            role="textbox"
          />
        </div>
      }
      placeholder={<Placeholder placeholder={placeholder} />}
      ErrorBoundary={LexicalErrorBoundary}
    />
  );
};

export default LexicalRichTextPlugin;
