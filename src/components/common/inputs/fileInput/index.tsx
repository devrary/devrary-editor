import React from "react";
import styles from "@/components/common/inputs/fileInput/FileInput.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = Readonly<{
  accept?: string;
  label: string;
  onChange: (files: FileList | null) => void;
}>;

const FileInput = ({ accept, label, onChange }: Props) => {
  return (
    <div className={cx("input-container")}>
      <label className={cx("input-label")}>{label}</label>
      <input
        aria-label={label}
        type="file"
        accept={accept}
        className={cx("input")}
        onChange={(e) => onChange(e.target.files)}
      />
    </div>
  );
};

export default FileInput;
