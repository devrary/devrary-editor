import styles from "@/components/lexical/plugins/editorToolbarPlugin/EditorToolbarPlugin.module.scss";
import classNames from "classnames/bind";
import { $isCodeHighlightNode } from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
  SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { getSelectedNode, getDOMRangeRect } from "@/shared/utils/lexical";
import {
  LexicalBlockFormat,
  LexicalRootType,
} from "@/shared/constants/lexical";
import BlockForamt from "@/components/lexical/plugins/editorToolbarPlugin/blockFormat";
import ElementForamt from "@/components/lexical/plugins/editorToolbarPlugin/elementFormat";
import InlineFormat from "@/components/lexical/plugins/editorToolbarPlugin/inlineFormat";
import FontSize from "@/components/lexical/plugins/editorToolbarPlugin/fontSize";
import ColorPicker from "@/components/lexical/plugins/editorToolbarPlugin/colorPicker";
import EditorController from "./editorController";
import NodeFormat from "./nodeFormat";
import EditorSetting from "./editorSetting";

const cx = classNames.bind(styles);

type Props = {
  setIsLinkEditMode: Dispatch<SetStateAction<boolean>>;
  showToolbar: boolean;
};

const EditorToolbarPlugin = ({ setIsLinkEditMode, showToolbar }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null
  );

  return (
    <section className={cx("container")}>
      <EditorController direction={"column"} />
      <BlockForamt direction={"column"} />
      <NodeFormat direction={"column"} />
      <ElementForamt direction={"column"} />
      <InlineFormat />
      <div className={cx("button-wrapper")}>
        <EditorSetting direction={"column"} />
      </div>
    </section>
  );
};

export default EditorToolbarPlugin;
