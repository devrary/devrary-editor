import React, { Fragment, ReactNode } from "react";
import Header from "@/components/layout/header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default Layout;
