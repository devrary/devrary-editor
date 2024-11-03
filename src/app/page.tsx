import React from "react";
import styles from "@/app/page.module.scss";
import classNames from "classnames/bind";
import HomeClient from "@/app/client";

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <main className={cx("page")}>
      <HomeClient />
    </main>
  );
};

export default HomePage;
