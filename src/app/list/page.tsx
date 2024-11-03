import React from "react";
import styles from "@/app/list/page.module.scss";
import classNames from "classnames/bind";
import ListClient from "@/app/list/client";

const cx = classNames.bind(styles);

const ListPage = () => {
  return (
    <main className={cx("page")}>
      <ListClient />
    </main>
  );
};

export default ListPage;
