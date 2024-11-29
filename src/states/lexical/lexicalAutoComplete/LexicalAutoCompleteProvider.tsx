import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CallbackFn,
  HookShape,
  LexicalAutoCompleteContext,
  LexicalAutoCompleteContextShape,
  Suggestion,
} from "@/states/lexical/lexicalAutoComplete/LexicalAutoCompleteContext";

type Props = {
  children: ReactNode;
};

const LexicalAutoCompleteProvider = ({ children }: Props) => {
  const context: LexicalAutoCompleteContextShape = useMemo(() => {
    let suggestion: Suggestion | null = null;
    const listeners: Set<CallbackFn> = new Set();
    return [
      (cb: (newSuggestion: Suggestion) => void) => {
        cb(suggestion);
        listeners.add(cb);
        return () => {
          listeners.delete(cb);
        };
      },
      (newSuggestion: Suggestion) => {
        suggestion = newSuggestion;
        for (const listener of listeners) {
          listener(newSuggestion);
        }
      },
    ];
  }, []);

  return (
    <LexicalAutoCompleteContext.Provider value={context}>
      {children}
    </LexicalAutoCompleteContext.Provider>
  );
};

export const useLexicalAutoComplete = (): HookShape => {
  const [subscribe, publish]: LexicalAutoCompleteContextShape = useContext(
    LexicalAutoCompleteContext
  );
  const [suggestion, setSuggestion] = useState<Suggestion>(null);
  useEffect(() => {
    return subscribe((newSuggestion: Suggestion) => {
      setSuggestion(newSuggestion);
    });
  }, [subscribe]);
  return [suggestion, publish];
};

export default LexicalAutoCompleteProvider;
