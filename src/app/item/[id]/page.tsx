import React from "react";
import styles from "@/app/item/[id]/page.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ItemPage = () => {
  return <main className={cx("page")}></main>;
};

export default ItemPage;
