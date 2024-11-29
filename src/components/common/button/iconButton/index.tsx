import React, { ReactNode } from "react";
import styles from "@/components/common/button/iconButton/IconButton.module.scss";
import classNames from "classnames/bind";
import { Tooltip } from "@mui/material";

const cx = classNames.bind(styles);

type Props = {
  onClick: () => void;
  icon: string;
  disabled?: boolean;
  title: string;
  tooltip?: boolean;
  children: ReactNode;
};

const IconButton = ({
  onClick,
  icon,
  disabled = false,
  title,
  tooltip,
  children,
}: Props) => {
  if (tooltip) {
    return (
      <Tooltip
        title={title}
        placement="right"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -10],
                },
              },
            ],
          },
        }}
      >
        <button
          disabled={disabled}
          className={cx("button-container")}
          onClick={onClick}
        >
          {children}
        </button>
      </Tooltip>
    );
  }
  return (
    <button
      disabled={disabled}
      className={cx("button-container")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
