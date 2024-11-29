import { EditorState } from "lexical";
import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export type LexicalShareStateShape = {
  stateStr: string | null;
  setStateStr: Dispatch<SetStateAction<string | null>>;
  state: EditorState | null;
  setState: Dispatch<SetStateAction<EditorState | null>>;
  stateHtml: string | null;
  setStateHtml: Dispatch<SetStateAction<string | null>>;
};

export const LexicalShareStateContext: Context<LexicalShareStateShape> =
  createContext<LexicalShareStateShape>({
    stateStr: null,
    setStateStr: () => {},
    state: null,
    setState: () => {},
    stateHtml: null,
    setStateHtml: () => {},
  });

export const useLexicalStateShare = () => {
  return useContext(LexicalShareStateContext);
};
