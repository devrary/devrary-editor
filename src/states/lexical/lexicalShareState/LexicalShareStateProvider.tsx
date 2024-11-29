"use client";
import { EditorState } from "lexical";
import React, { ReactNode, useMemo, useState } from "react";
import { LexicalShareStateContext } from "@/states/lexical/lexicalShareState/LexicalShareStateContext";

type Props = {
  children: ReactNode;
};

const LexicalShareStateProvider = ({ children }: Props) => {
  const [stateStr, setStateStr] = useState<string | null>(null);
  const [state, setState] = useState<EditorState | null>(null);
  const [stateHtml, setStateHtml] = useState<string | null>(null);

  const contextValue = useMemo(() => {
    return {
      stateStr,
      setStateStr,
      state,
      setState,
      stateHtml,
      setStateHtml,
    };
  }, [stateStr, state, stateHtml]);

  return (
    <LexicalShareStateContext.Provider value={contextValue}>
      {children}
    </LexicalShareStateContext.Provider>
  );
};

export default LexicalShareStateProvider;
