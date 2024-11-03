"use client";
import React, { useMemo, useState } from "react";
import styles from "@/components/common/button/themeButton/ThemeButton.module.scss";
import classNames from "classnames/bind";
import SunIcon from "@/public/icon/sun.svg";
import MoonIcon from "@/public/icon/moon.svg";
import { getCookie, setCookie } from "cookies-next";
import { ThemeType } from "@/shared/types/etc/theme";

const cx = classNames.bind(styles);

const ThemeButton = () => {
  const theme = getCookie("theme") as ThemeType;
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(theme ?? "dark");

  const targetTheme = useMemo(() => {
    return currentTheme === "dark" ? "light" : "dark";
  }, [currentTheme]);

  return (
    <button
      className={cx("button-container")}
      onClick={() => {
        setCurrentTheme(targetTheme);
        setCookie("theme", targetTheme);
        document.documentElement.setAttribute("data-theme", targetTheme);
      }}
    >
      {currentTheme === "dark" ? (
        <MoonIcon viewBox="0 0 24 24" className={cx("icon", "moon")} />
      ) : (
        <SunIcon viewBox="0 0 24 24" className={cx("icon", "sun")} />
      )}
    </button>
  );
};

export default ThemeButton;
