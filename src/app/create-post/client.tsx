"use client";
import React from "react";
import styles from "@/app/create-post/client.module.scss";
import classNames from "classnames/bind";
import EditorInput from "@/components/common/inputs/editorInput";

const cx = classNames.bind(styles);

const CreatePostClient = () => {
  return (
    <div className={cx("client")}>
      <div className={cx("client-inner")}>
        <EditorInput />
      </div>
    </div>
  );
};

export default CreatePostClient;
