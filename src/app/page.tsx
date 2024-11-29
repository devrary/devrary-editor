import React from "react";
import styles from "@/app/page.module.scss";
import classNames from "classnames/bind";
import HomeClient from "@/app/client";
import { getMetadata } from "@/shared/libs/metadata";

const cx = classNames.bind(styles);

export const generateMetadata = async () => {
  return getMetadata({});
};

const HomePage = () => {
  return (
    <main className={cx("page")}>
      <HomeClient />
    </main>
  );
};

export default HomePage;
