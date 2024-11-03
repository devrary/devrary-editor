"use client";
import React, { Fragment, ReactNode, useLayoutEffect } from "react";
import { getCookie } from "cookies-next";

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const theme = getCookie("theme");

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme ? theme : "dark");
  }, []);
  return <Fragment>{children}</Fragment>;
};

export default AppProvider;
