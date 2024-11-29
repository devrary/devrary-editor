import React, { useCallback, useRef, useState } from "react";
import styles from "@/components/lexical/plugins/editorToolbarPlugin/blockFormat/BlockFormat.module.scss";
import classNames from "classnames/bind";
import {
  LexicalBlockFormat,
  LexicalRootType,
} from "@/shared/constants/lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
} from "lexical";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $createCodeNode } from "@lexical/code";
import ParagraphIcon from "@/public/icon/text-paragraph.svg";
import Heading1Icon from "@/public/icon/type-h1.svg";
import Heading2Icon from "@/public/icon/type-h2.svg";
import Heading3Icon from "@/public/icon/type-h3.svg";
import Heading4Icon from "@/public/icon/type-h4.svg";
import Heading5Icon from "@/public/icon/type-h5.svg";
import Heading6Icon from "@/public/icon/type-h6.svg";
import BulletListIcon from "@/public/icon/list-ul.svg";
import NumberListIcon from "@/public/icon/list-ol.svg";
import CheckListIcon from "@/public/icon/square-check.svg";
import QuoteIcon from "@/public/icon/chat-square-quote.svg";
import CodeIcon from "@/public/icon/code.svg";
import IconButton from "@/components/common/button/iconButton";
import { useOnClick } from "@/shared/hooks/useOnClick";

const cx = classNames.bind(styles);

type Props = {
  direction: "row" | "column";
};

const BlockForamt = ({ direction }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor);
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const [blockType, setBlockType] =
    useState<keyof typeof LexicalBlockFormat>("paragraph");
  const [rootType, setRootType] =
    useState<keyof typeof LexicalRootType>("root");

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
      setBlockType("paragraph");
      setOpen(false);
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
      setBlockType(headingSize);
      setOpen(false);
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      setBlockType("bullet");
    } else {
      formatParagraph();
      setBlockType("paragraph");
    }
    setOpen(false);
  };

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
      setBlockType("check");
    } else {
      formatParagraph();
      setBlockType("paragraph");
    }
    setOpen(false);
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      setBlockType("number");
    } else {
      formatParagraph();
      setBlockType("paragraph");
    }
    setOpen(false);
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createQuoteNode());
      });
      setBlockType("quote");
      setOpen(false);
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();

        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertRawText(textContent);
            }
          }
        }
      });
      setBlockType("code");
      setOpen(false);
    }
  };

  const getIcon = useCallback(
    (blockType: keyof typeof LexicalBlockFormat) => {
      switch (blockType) {
        case "paragraph": {
          return <ParagraphIcon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "h1": {
          return <Heading1Icon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "h2": {
          return <Heading2Icon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "h3": {
          return <Heading3Icon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "h4": {
          return <Heading4Icon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "h5": {
          return <Heading5Icon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "h6": {
          return <Heading6Icon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "bullet": {
          return <BulletListIcon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "number": {
          return <NumberListIcon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "check": {
          return <CheckListIcon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "quote": {
          return <QuoteIcon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        case "code": {
          return <CodeIcon viewBox="0 0 16 16" className={cx("icon")} />;
        }
        default: {
          return <ParagraphIcon viewBox="0 0 16 16" className={cx("icon")} />;
        }
      }
    },
    [blockType]
  );

  useOnClick({
    ref: containerRef,
    handler: () => setOpen(false),
    mouseEvent: "click",
  });

  return (
    <div
      className={cx("container")}
      style={{ flexDirection: direction }}
      ref={containerRef}
    >
      <IconButton
        onClick={() => {
          setOpen(!open);
        }}
        title={blockType}
        icon={blockType}
      >
        {getIcon(blockType)}
      </IconButton>
      {open && (
        <div className={cx("list-container")}>
          <button className={cx("list-item")} onClick={formatParagraph}>
            {getIcon("paragraph")}
            <span className={cx("item-text")}>Normal</span>
            <span className={cx("item-command")}>⌘+Opt+0</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => formatHeading("h1")}
          >
            {getIcon("h1")}
            <span className={cx("item-text")}>Heading 1</span>
            <span className={cx("item-command")}>⌘+Opt+1</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => formatHeading("h2")}
          >
            {getIcon("h2")}
            <span className={cx("item-text")}>Heading 2</span>
            <span className={cx("item-command")}>⌘+Opt+2</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => formatHeading("h3")}
          >
            {getIcon("h3")}
            <span className={cx("item-text")}>Heading 3</span>
            <span className={cx("item-command")}>⌘+Opt+3</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => formatHeading("h4")}
          >
            {getIcon("h4")}
            <span className={cx("item-text")}>Heading 4</span>
            <span className={cx("item-command")}>⌘+Opt+4</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => formatHeading("h5")}
          >
            {getIcon("h5")}
            <span className={cx("item-text")}>Heading 5</span>
            <span className={cx("item-command")}>⌘+Opt+5</span>
          </button>
          <button
            className={cx("list-item")}
            onClick={() => formatHeading("h6")}
          >
            {getIcon("h6")}
            <span className={cx("item-text")}>Heading 6</span>
            <span className={cx("item-command")}>⌘+Opt+6</span>
          </button>
          <button className={cx("list-item")} onClick={formatBulletList}>
            {getIcon("bullet")}
            <span className={cx("item-text")}>Bullet List</span>
            <span className={cx("item-command")}>⌘+Opt+B</span>
          </button>
          <button className={cx("list-item")} onClick={formatNumberedList}>
            {getIcon("number")}
            <span className={cx("item-text")}>Number List</span>
            <span className={cx("item-command")}>⌘+Opt+N</span>
          </button>
          <button className={cx("list-item")} onClick={formatCheckList}>
            {getIcon("check")}
            <span className={cx("item-text")}>Check List</span>
            <span className={cx("item-command")}>⌘+Opt+C</span>
          </button>
          <button className={cx("list-item")} onClick={formatQuote}>
            {getIcon("quote")}
            <span className={cx("item-text")}>Quote</span>
            <span className={cx("item-command")}>⌘+Opt+Q</span>
          </button>
          <button className={cx("list-item")} onClick={formatCode}>
            {getIcon("code")}
            <span className={cx("item-text")}>Code Block</span>
            <span className={cx("item-command")}>⌘+Opt+P</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BlockForamt;
