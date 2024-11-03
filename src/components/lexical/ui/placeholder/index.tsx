import React from "react";
import styles from "@/components/lexical/ui/placeholder/Placeholder.module.scss";
import classNames from "classnames/bind";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

type Props = {
  placeholder: string;
};

const cx = classNames.bind(styles);

const Placeholder = ({ placeholder }: Props) => {
  const [editor] = useLexicalComposerContext();

  return (
    <div
      className={cx("placeholder-container")}
      onClick={() => {
        editor.focus();
      }}
    >
      <span className={cx("placeholder")}>{placeholder}</span>
    </div>
  );
};

export default Placeholder;
