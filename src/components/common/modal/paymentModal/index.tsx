import React from "react";
import styles from "@/components/common/modal/paymentModal/PaymentModal.module.scss";
import classNames from "classnames/bind";
import ReactDOM from "react-dom";

const cx = classNames.bind(styles);

const PaymentModal = () => {
  return ReactDOM.createPortal(
    <section className={cx("modal-container")}>
      <div></div>
    </section>,
    document.body
  );
};

export default PaymentModal;
