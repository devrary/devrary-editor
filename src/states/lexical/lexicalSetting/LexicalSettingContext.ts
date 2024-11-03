import { INITIAL_SETTINGS } from "@/shared/configs/lexical/setting";
import { LexicalSettingKeyType } from "@/shared/types/lexical/setting";
import { Context, createContext } from "react";

type LexicalSettingContextShape = {
  setOption: (
    name: LexicalSettingKeyType,
    value: boolean
  ) => {
    name: LexicalSettingKeyType;
    value: boolean;
  };
  settings: Record<LexicalSettingKeyType, boolean>;
};

const defaultValue: LexicalSettingContextShape = {
  setOption: (name: LexicalSettingKeyType, value: boolean) => {
    return { name, value };
  },
  settings: INITIAL_SETTINGS,
};

export const LexicalSettingContext: Context<LexicalSettingContextShape> =
  createContext<LexicalSettingContextShape>(defaultValue);
