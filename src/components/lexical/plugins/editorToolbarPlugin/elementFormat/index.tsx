import React, { useCallback, useRef, useState } from "react";
import styles from "@/components/lexical/plugins/editorToolbarPlugin/elementFormat/ElementFormat.module.scss";
import classNames from "classnames/bind";
import { LexicalElementFormatOptions } from "@/shared/constants/lexical";
import { useOnClick } from "@/shared/hooks/useOnClick";
import IconButton from "@/components/common/button/iconButton";
import CenterAlignIcon from "@/public/icon/text-center.svg";
import LeftAlignIcon from "@/public/icon/text-left.svg";
import RightAlignIcon from "@/public/icon/text-right.svg";
import JustifyAlignIcon from "@/public/icon/justify.svg";
import IndentIcon from "@/public/icon/indent.svg";
import OutdentIcon from "@/public/icon/outdent.svg";
import { IndentationType } from "@/shared/types/lexical/setting";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";

const cx = classNames.bind(styles);

type Props = {
  direction: "row" | "column";
};

const ElementForamt = ({ direction }: Props) => {
  const [editor] = useLexicalComposerContext();

  const [elementFormat, setElementFormat] =
    useState<keyof typeof LexicalElementFormatOptions>("left");
  const [inlineFormat, setInlineFormat] = useState<
    typeof LexicalElementFormatOptions
  >(LexicalElementFormatOptions);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [indentation, setIndentation] = useState<"indent" | "outdent" | null>(
    null
  );

  const getIcon = useCallback(
    (format: keyof typeof LexicalElementFormatOptions | IndentationType) => {
      switch (format) {
        case "center":
          return <CenterAlignIcon viewBox="0 0 16 16" className={cx("icon")} />;
        case "left":
          return <LeftAlignIcon viewBox="0 0 16 16" className={cx("icon")} />;
        case "right":
          return <RightAlignIcon viewBox="0 0 16 16" className={cx("icon")} />;
        case "justify":
          return (
            <JustifyAlignIcon viewBox="0 0 16 16" className={cx("icon")} />
          );
        case "start":
          return <LeftAlignIcon viewBox="0 0 16 16" className={cx("icon")} />;
        case "end":
          return <RightAlignIcon viewBox="0 0 16 16" className={cx("icon")} />;
        case "outdent":
          return <OutdentIcon viewBox="0 0 16 16" className={cx("icon")} />;
        case "indent":
          return <IndentIcon viewBox="0 0 16 16" className={cx("icon")} />;
      }
    },
    [elementFormat]
  );

  useOnClick({
    ref: containerRef,
    handler: () => setOpen(false),
    mouseEvent: "click",
  });

  return (
    <div
      className={cx("container")}
      ref={containerRef}
      style={{ flexDirection: direction }}
    >
      <IconButton
        onClick={() => {
          setOpen(!open);
        }}
        title={elementFormat}
        icon={elementFormat}
      >
        {getIcon(elementFormat)}
      </IconButton>
      {open && (
        <div className={cx("list-container")}>
          <button
            className={cx("list-item")}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
              setElementFormat("left");
              setOpen(false);
            }}
          >
            {getIcon("left")}
            <span className={cx("item-text")}>Left Align</span>
            <span className={cx("item-command")}>⌘+Shift+L</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
              setElementFormat("center");
              setOpen(false);
            }}
          >
            {getIcon("center")}
            <span className={cx("item-text")}>Center Align</span>
            <span className={cx("item-command")}>⌘+Shift+C</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
              setElementFormat("right");
              setOpen(false);
            }}
          >
            {getIcon("right")}
            <span className={cx("item-text")}>Right Align</span>
            <span className={cx("item-command")}>⌘+Shift+R</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
              setElementFormat("justify");
              setOpen(false);
            }}
          >
            {getIcon("justify")}
            <span className={cx("item-text")}>Justify Align</span>
            <span className={cx("item-command")}>⌘+Shift+J</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "start");
              setElementFormat("start");
              setOpen(false);
            }}
          >
            {getIcon("start")}
            <span className={cx("item-text")}>Start Align</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "end");
              setElementFormat("end");
              setOpen(false);
            }}
          >
            {getIcon("end")}
            <span className={cx("item-text")}>End Align</span>
          </button>
          <div className={cx("divider")} />
          <button
            className={cx("list-item")}
            onClick={() => {
              editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
              setOpen(false);
            }}
          >
            {getIcon("outdent")}
            <span className={cx("item-text")}>Outdent</span>
            <span className={cx("item-command")}>{`⌘+[`}</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => {
              editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
              setOpen(false);
            }}
          >
            {getIcon("indent")}
            <span className={cx("item-text")}>Indent</span>
            <span className={cx("item-command")}>{`⌘+]`}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ElementForamt;
