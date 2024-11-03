import React from "react";
import { HistoryPlugin as LexicalHistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalHistory } from "@/states/lexical/lexicalHistory/LexicalHistoryProvider";

const HistoryPlugin = () => {
  const { historyState } = useLexicalHistory();
  return <LexicalHistoryPlugin externalHistoryState={historyState} />;
};

export default HistoryPlugin;
