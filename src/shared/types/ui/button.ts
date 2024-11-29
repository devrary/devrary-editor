import { ReactNode } from "react";

export type ButtonSize = "small" | "medium" | "large";

export type LexicalButtonProps = {
  children: ReactNode;
  classNames?: string[];
  disabled?: boolean;
  onClick: () => void;
  small?: boolean;
  title?: string;
};
