import { LexicalEditor } from "lexical";
import * as React from "react";
import { useState, Fragment } from "react";
import BaseButton from "@/components/common/button/baseButton";
import BaseDropdown from "@/components/common/dropdown/baseDropdown";
import { INSERT_LAYOUT_COMMAND } from "@/components/lexical/plugins/layoutPlugin";
import LexicalDropdownProvider from "@/states/lexical/lexicalDropdown/LexicalDropdownProvider";
import BaseDropdownItem from "@/components/common/dropdown/baseDropdown/BaseDropdownItem";
import styles from "@/components/common/dialog/insertLayoutDialog/InsertLayoutDialog.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const LAYOUTS = [
  { label: "2 columns (equal width)", value: "1fr 1fr" },
  { label: "2 columns (25% - 75%)", value: "1fr 3fr" },
  { label: "3 columns (equal width)", value: "1fr 1fr 1fr" },
  { label: "3 columns (25% - 50% - 25%)", value: "1fr 2fr 1fr" },
  { label: "4 columns (equal width)", value: "1fr 1fr 1fr 1fr" },
];

type Props = {
  activeEditor: LexicalEditor;
  onClose: () => void;
};

const InsertLayoutDialog = ({ activeEditor, onClose }: Props) => {
  const [layout, setLayout] = useState(LAYOUTS[0].value);
  const buttonLabel = LAYOUTS.find((item) => item.value === layout)?.label;

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_LAYOUT_COMMAND, layout);
    onClose();
  };

  return (
    <Fragment>
      <BaseDropdown
        buttonClassName="toolbar-item dialog-dropdown"
        buttonLabel={buttonLabel}
      >
        {LAYOUTS.map(({ label, value }) => (
          <BaseDropdownItem
            key={value}
            className="item"
            onClick={() => setLayout(value)}
          >
            <span className={cx("text")}>{label}</span>
          </BaseDropdownItem>
        ))}
      </BaseDropdown>
      <BaseButton size="medium" onClick={onClick}>
        Insert
      </BaseButton>
    </Fragment>
  );
};

export default InsertLayoutDialog;
