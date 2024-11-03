import React from "react";
import styles from "@/app/list/client.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ListClient = () => {
  return <div className={cx("client")}></div>;
};

export default ListClient;
