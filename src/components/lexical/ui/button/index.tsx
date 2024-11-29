import { LexicalButtonProps } from "@/shared/types/ui/button";
import styles from "@/components/lexical/ui/button/LexicalButton.module.scss";
import classNames from "classnames/bind";
import React from "react";

const cx = classNames.bind(styles);

const LexicalButton = ({
  children,
  onClick,
  disabled,
  classNames,
  title,
  small,
}: LexicalButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={cx(
        "button-container",
        { small },
        classNames && [...classNames]
      )}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LexicalButton;
