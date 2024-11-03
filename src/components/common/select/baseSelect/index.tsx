import React from "react";
import styles from "@/components/common/select/baseSelect/BaseSelect.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = JSX.IntrinsicElements["select"] & {
  label: string;
  classNames: string[];
};

const BaseSelect = ({ label, children, classNames = [], ...rest }: Props) => {
  return (
    <div className={cx("select-container")}>
      <label className={cx("select-label")}>{label}</label>
      <select {...rest} className={cx("select", ...classNames)}>
        {children}
      </select>
    </div>
  );
};

export default BaseSelect;
