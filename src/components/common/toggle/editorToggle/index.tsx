import React from "react";
import styles from "@/components/common/toggle/editorToggle/EditorToggle.module.scss";
import classNames from "classnames/bind";
import { EditorToggleProps } from "@/shared/types/ui/toggle";
import { getIcon } from "@/shared/constants/icon";

const cx = classNames.bind(styles);

type Props = EditorToggleProps & {};

const EditorToggle = ({ title, childrens }: Props) => {
  return (
    <div className={cx("toggle-container")} aria-label={title}>
      {childrens.map((item, index: number) => {
        return (
          <button
            onClick={item.onClick}
            className={cx("toggle-item")}
            key={index}
          >
            {item.icon && getIcon(item.icon)}
            <span className={cx("toggle-item-text")}>{item.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default EditorToggle;
