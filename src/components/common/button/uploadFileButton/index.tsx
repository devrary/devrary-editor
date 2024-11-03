import React from "react";
import styles from "@/components/common/button/uploadFileButton/UploadFileButton.module.scss";
import classNames from "classnames/bind";
import UploadIcon from "@/public/icon/upload-clip.svg";
import CloseIcon from "@/public/icon/close-x.svg";

const cx = classNames.bind(styles);

type Props = {
  show: boolean;
  onClick?: () => void;
};

const UploadFileButton = ({ show, onClick }: Props) => {
  return (
    <button className={cx("button-container")} onClick={onClick}>
      <CloseIcon viewBox="0 0 24 24" className={cx("close", { show: !show })} />
      <UploadIcon
        viewBox="0 0 24 24"
        className={cx("upload", { show: show })}
      />
    </button>
  );
};

export default UploadFileButton;
