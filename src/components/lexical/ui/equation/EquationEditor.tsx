import type { Ref, RefObject } from "react";
import * as React from "react";
import { ChangeEvent, forwardRef } from "react";
import styles from "@/components/lexical/ui/equation/EquationEditor.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type BaseEquationEditorProps = {
  equation: string;
  inline: boolean;
  setEquation: (equation: string) => void;
};

function EquationEditor(
  { equation, setEquation, inline }: BaseEquationEditorProps,
  forwardedRef: Ref<HTMLInputElement | HTMLTextAreaElement>
): JSX.Element {
  const onChange = (event: ChangeEvent) => {
    setEquation((event.target as HTMLInputElement).value);
  };

  return inline && forwardedRef instanceof HTMLInputElement ? (
    <span className={cx("equation-editor-input-background")}>
      <span className={cx("equation-editor-dollar-sign")}>$</span>
      <input
        aria-label="equation-editor-input"
        className={cx("equation-editor-inline-editor")}
        value={equation}
        onChange={onChange}
        autoFocus={true}
        ref={forwardedRef as RefObject<HTMLInputElement>}
      />
      <span className={cx("equation-editor-dollar-sign")}>$</span>
    </span>
  ) : (
    <div className={cx("equation-editor-input-background")}>
      <span className={cx("equation-editor-dollar-sign")}>{"$$\n"}</span>
      <textarea
        aria-label="equation-editor-textarea"
        className={cx("equation-editor-block-editor")}
        value={equation}
        onChange={onChange}
        ref={forwardedRef as RefObject<HTMLTextAreaElement>}
      />
      <span className={cx("equation-editor-dollar-sign")}>{"\n$$"}</span>
    </div>
  );
}

export default forwardRef(EquationEditor);
