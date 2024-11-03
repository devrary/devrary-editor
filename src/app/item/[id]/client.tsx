import React from "react";
import styles from "@/app/item/[id]/client.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ItemClient = () => {
  return <div className={cx("client")}></div>;
};

export default ItemClient;
