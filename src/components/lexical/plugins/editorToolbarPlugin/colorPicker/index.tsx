import React, { useState } from "react";
import styles from "@/components/lexical/plugins/editorToolbarPlugin/colorPicker/ColorPicker.module.scss";
import classNames from "classnames/bind";
import { COLOR } from "@/shared/constants/color";

const cx = classNames.bind(styles);

type Props = {
  type: "font" | "background";
};

const ColorPicker = ({ type }: Props) => {
  const [color, setColor] = useState<string>(COLOR.DARK);
  return <div></div>;
};

export default ColorPicker;
