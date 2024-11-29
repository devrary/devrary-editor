import React, { useCallback, useEffect, useState } from "react";
import styles from "@/components/lexical/plugins/editorToolbarPlugin/editorController/EditorController.module.scss";
import classNames from "classnames/bind";
import {
  $getSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  LexicalEditor,
  UNDO_COMMAND,
} from "lexical";
import { IS_APPLE, mergeRegister } from "@lexical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import IconButton from "@/components/common/button/iconButton";
import UndoIcon from "@/public/icon/arrow-counterclockwise.svg";
import RedoIcon from "@/public/icon/arrow-clockwise.svg";

const cx = classNames.bind(styles);

type Props = {
  direction: "row" | "column";
};

const EditorController = ({ direction }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor);
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [activeEditor, editor]);

  return (
    <div className={cx("container")} style={{ flexDirection: direction }}>
      <IconButton
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
        icon="undo"
        tooltip
      >
        <UndoIcon viewBox="0 0 16 16" className={cx("icon")} />
      </IconButton>
      <IconButton
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? "Redo (⇧⌘Z)" : "Redo (Ctrl+Y)"}
        icon="redo"
        tooltip
      >
        <RedoIcon viewBox="0 0 16 16" className={cx("icon")} />
      </IconButton>
    </div>
  );
};

export default EditorController;
