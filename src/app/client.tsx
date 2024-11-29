"use client";
import React from "react";
import styles from "@/app/client.module.scss";
import classNames from "classnames/bind";
import LexicalInput from "@/components/common/inputs/lexicalInput";

const cx = classNames.bind(styles);

const HomeClient = () => {
  return (
    <div className={cx("client")}>
      <div className={cx("client-inner")}>
        <LexicalInput />
      </div>
    </div>
  );
};

export default HomeClient;
