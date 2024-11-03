import { Context, createContext } from "react";

type LexicalDropdownContextShape = {
  registerItem: (ref: React.RefObject<HTMLButtonElement>) => void;
};

const defaultValue: LexicalDropdownContextShape = {
  registerItem: () => {},
};

export const LexicalDropdownContext: Context<LexicalDropdownContextShape> =
  createContext<LexicalDropdownContextShape>(defaultValue);
