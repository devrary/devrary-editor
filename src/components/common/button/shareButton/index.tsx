import React from "react";
import styles from "@/components/common/button/shareButton/ShareButton.module.scss";
import classNames from "classnames/bind";
import ShareIcon from "@/public/icon/share.svg";

const cx = classNames.bind(styles);

const ShareButton = () => {
  return (
    <button className={cx("button-container")} onClick={() => {}}>
      <ShareIcon viewBox="0 0 32 32" className={cx("icon")} />
    </button>
  );
};

export default ShareButton;
