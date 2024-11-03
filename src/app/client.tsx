"use client";
import React from "react";
import styles from "@/app/client.module.scss";
import classNames from "classnames/bind";
import LexicalInput from "@/components/common/inputs/lexicalInput";
import ShareButton from "@/components/common/button/shareButton";
import PaymentButton from "@/components/common/button/paymentButton";

const cx = classNames.bind(styles);

const HomeClient = () => {
  return (
    <div className={cx("client")}>
      <div className={cx("client-inner")}>
        <LexicalInput />
        <div className={cx("nav-container")}>
          <PaymentButton />
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
