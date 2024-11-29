import React from "react";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { PLAYGROUND_TRANSFORMERS } from "@/shared/libs/lexical/markdown";

const MarkdownPlugin = () => {
  return <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />;
};

export default MarkdownPlugin;
