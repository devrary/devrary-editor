import React, { ReactNode } from "react";
import styles from "@/components/common/dialog/baseDialog/BaseDialog.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

const BaseDialog = ({ children }: Props) => {
  return <div className={cx("dialog-container")}>{children}</div>;
};

export default BaseDialog;
