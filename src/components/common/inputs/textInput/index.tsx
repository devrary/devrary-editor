import React, { HTMLInputTypeAttribute } from "react";
import styles from "@/components/common/inputs/textInput/TextInput.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = Readonly<{
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
}>;

const TextInput = ({
  label,
  onChange,
  placeholder,
  value,
  type = "text",
}: Props) => {
  return (
    <div className={cx("input-container")}>
      <label className={cx("input-label")}>{label}</label>
      <input
        aria-label={label}
        type={type}
        className={cx("input")}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
