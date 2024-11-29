import {
  DEFAULT_SETTINGS,
  INITIAL_SETTINGS,
} from "@/shared/configs/lexical/setting";

export type LexicalSettingKeyType = keyof typeof DEFAULT_SETTINGS;

export type LexicalSettingType = typeof INITIAL_SETTINGS;

export type ToolbarOptionType = {
  icon: string;
  iconRTL: string;
  name: string;
};

export type IndentationType = "indent" | "outdent";
