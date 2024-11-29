import React from "react";
import styles from "@/components/lexical/plugins/editorToolbarPlugin/editorSetting/EditorSetting.module.scss";
import classNames from "classnames/bind";
import IconButton from "@/components/common/button/iconButton";
import SettingIcon from "@/public/icon/setting.svg";

const cx = classNames.bind(styles);

type Props = {
  direction: "row" | "column";
};

const EditorSetting = ({ direction }: Props) => {
  return (
    <div className={cx("container")}>
      <IconButton onClick={() => {}} title="" tooltip={false} icon="setting">
        <SettingIcon viewBox="0 0 1024 1024" className={cx("icon")} />
      </IconButton>
    </div>
  );
};

export default EditorSetting;
