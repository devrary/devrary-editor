"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/layout/header/Header.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import Logo from "@/public/logo/logo.png";
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
      <Image
        src={Logo}
        alt="bera-meme-gen"
        width={42}
        height={42}
        priority
        quality={100}
        className={cx("image")}
      />
      <div className={cx("buttons-wrapper")}>
        {isMount && <ThemeButton />}
        <ConnectKitButton />
      </div>
    </header>
  );
};

export default Header;
