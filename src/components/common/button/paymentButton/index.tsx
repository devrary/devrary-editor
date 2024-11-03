import React, { useCallback } from "react";
import styles from "@/components/common/button/paymentButton/PaymentButton.module.scss";
import classNames from "classnames/bind";
import PaymentIcon from "@/public/icon/payment.svg";
import { useDispatch } from "react-redux";
import { SET_MODAL } from "@/states/global/slice/modal";
const cx = classNames.bind(styles);

const PaymentButton = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(SET_MODAL({ key: "payment", layer: 1, params: {} }));
  }, [dispatch]);
  return (
    <button className={cx("button-container")} onClick={onClick}>
      <PaymentIcon viewBox="0 0 24 24" className={cx("icon")} />
    </button>
  );
};

export default PaymentButton;
