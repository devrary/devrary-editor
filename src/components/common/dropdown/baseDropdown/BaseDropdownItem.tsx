import { LexicalDropdownContext } from "@/states/lexical/lexicalDropdown/LexicalDropdownContext";
import { useContext, useEffect, useRef } from "react";
import styles from "@/components/common/dropdown/baseDropdown/BaseDropdownItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function BaseDropDownItem({
  children,
  className,
  onClick,
  title,
}: {
  children: React.ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const dropDownContext = useContext(LexicalDropdownContext);

  if (dropDownContext === null) {
    throw new Error("DropDownItem must be used within a DropDown");
  }

  const { registerItem } = dropDownContext;

  useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);

  return (
    <button
      className={cx(className)}
      onClick={onClick}
      ref={ref}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
}

export default BaseDropDownItem;
