import { createContext, Context } from "react";

export type Suggestion = null | string;
export type CallbackFn = (newSuggestion: Suggestion) => void;
export type SubscribeFn = (callbackFn: CallbackFn) => () => void;
export type PublishFn = (newSuggestion: Suggestion) => void;
export type HookShape = [suggestion: Suggestion, setSuggestion: PublishFn];
export type LexicalAutoCompleteContextShape = [SubscribeFn, PublishFn];

export const LexicalAutoCompleteContext: Context<LexicalAutoCompleteContextShape> =
  createContext<LexicalAutoCompleteContextShape>([
    (_cb) => () => {
      return;
    },
    (_newSuggestion: Suggestion) => {
      return;
    },
  ]);
