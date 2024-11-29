import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as React from "react";
import { useCallback, useState, Fragment } from "react";
import { ErrorBoundary } from "react-error-boundary";
import styles from "@/components/lexical/ui/katex/KatexEquationAlterer.module.scss";
import classNames from "classnames/bind";
import LexicalButton from "@/components/lexical/ui/button";
import KatexRenderer from "@/components/lexical/ui/katex/KatexRenderer";

const cx = classNames.bind(styles);

type Props = {
  initialEquation?: string;
  onConfirm: (equation: string, inline: boolean) => void;
};

export default function KatexEquationAlterer({
  onConfirm,
  initialEquation = "",
}: Props): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [equation, setEquation] = useState<string>(initialEquation);
  const [inline, setInline] = useState<boolean>(true);

  const onClick = useCallback(() => {
    onConfirm(equation, inline);
  }, [onConfirm, equation, inline]);

  const onCheckboxChange = useCallback(() => {
    setInline(!inline);
  }, [setInline, inline]);

  return (
    <Fragment>
      <div className={cx("katex-equation-alterer-default")}>
        Inline
        <input
          type="checkbox"
          aria-label="equation-checkbox"
          checked={inline}
          onChange={onCheckboxChange}
        />
      </div>
      <div className={cx("katex-equation-alterer-default")}>Equation </div>
      <div className={cx("katex-equation-alterer-center")}>
        {inline ? (
          <input
            aria-label="equation-input"
            onChange={(event) => {
              setEquation(event.target.value);
            }}
            value={equation}
            className={cx("katex-input")}
          />
        ) : (
          <textarea
            aria-label="equation-textarea"
            onChange={(event) => {
              setEquation(event.target.value);
            }}
            value={equation}
            className={cx("katex-input")}
          />
        )}
      </div>
      <div className={cx("katex-equation-alterer-default")}>Visualization </div>
      <div className={cx("katex-equation-alterer-center")}>
        <ErrorBoundary onError={(e) => editor._onError(e)} fallback={null}>
          <KatexRenderer
            equation={equation}
            inline={false}
            onDoubleClick={() => null}
          />
        </ErrorBoundary>
      </div>
      <div className={cx("katex-equation-alterer-dialog-action")}>
        <LexicalButton onClick={onClick}>Confirm</LexicalButton>
      </div>
    </Fragment>
  );
}
