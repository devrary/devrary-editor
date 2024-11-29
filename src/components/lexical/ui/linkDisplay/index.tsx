import React from "react";
import styles from "@/components/lexical/ui/linkDisplay/LinkDisplay.module.scss";
import classNames from "classnames/bind";
import { NodeKey } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const cx = classNames.bind(styles);

type Props = {
  nodeKey: NodeKey;
  data: string;
  display: "embed" | "mark";
};

const LinkDisplayComponent = ({ nodeKey, data, display }: Props) => {
  const [editor] = useLexicalComposerContext();

  return <div></div>;
};

export default LinkDisplayComponent;
