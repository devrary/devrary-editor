import React from "react";
import styles from "@/app/create-post/page.module.scss";
import classNames from "classnames/bind";
import CreatePostClient from "@/app/create-post/client";
import { getMetadata } from "@/shared/libs/metadata";

const cx = classNames.bind(styles);

export const generateMetadata = async () => {
  return getMetadata({});
};

const CreatePostPage = () => {
  return (
    <main className={cx("page")}>
      <CreatePostClient />
    </main>
  );
};

export default CreatePostPage;
