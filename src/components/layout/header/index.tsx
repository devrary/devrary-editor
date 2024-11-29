"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/layout/header/Header.module.scss";
import classNames from "classnames/bind";
import Logo from "@/public/logo/logo.svg";
import { ConnectKitButton } from "connectkit";
import ThemeButton from "@/components/common/button/themeButton";

const cx = classNames.bind(styles);

const Header = () => {
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    setIsMount(true);

    return () => setIsMount(false);
  }, []);
  return (
    <header className={cx("header")}>
      <Logo viewBox="0 0 1280 1280" className={cx("image")} />
      <div className={cx("buttons-wrapper")}>
        {isMount && <ThemeButton />}
        <ConnectKitButton />
      </div>
    </header>
  );
};

export default Header;
