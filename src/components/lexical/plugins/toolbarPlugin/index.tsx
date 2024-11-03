import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  KEY_MODIFIER_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { Dispatch, useCallback, useEffect, useState, useMemo } from "react";
import * as React from "react";
import useLexicalModal from "@/shared/hooks/useLexicalModal";
import { getSelectedNode } from "@/shared/utils/lexical";
import { sanitizeUrl } from "@/shared/utils/url";
import { InsertImageDialog } from "@/components/lexical/plugins/imagePlugin";
import styles from "@/components/lexical/plugins/toolbarPlugin/ToolbarPlugin.module.scss";
import classNames from "classnames/bind";
import ImageIcon from "@/public/icon/image.svg";
import PenEditIcon from "@/public/icon/pen-edit.svg";
import { TOOLBAR_ITEMS } from "@/shared/constants/toolbar-item";
import { InsertInlineImageDialog } from "@/components/lexical/plugins/inlineImagePlugin";

const cx = classNames.bind(styles);

const rootTypeToRootName = {
  root: "Root",
  table: "Table",
};

export default function ToolbarPlugin({
  setIsLinkEditMode,
  showToolbar,
}: {
  setIsLinkEditMode: Dispatch<boolean>;
  showToolbar: boolean;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  useState<keyof typeof rootTypeToRootName>("root");
  const [isLink, setIsLink] = useState(false);
  const [modal, showModal] = useLexicalModal();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      let matchingParent;
      if ($isLinkNode(parent)) {
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }
    }
  }, [activeEditor, editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      })
    );
  }, [$updateToolbar, activeEditor, editor]);

  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === "KeyK" && (ctrlKey || metaKey)) {
          event.preventDefault();
          let url: string | null;
          if (!isLink) {
            setIsLinkEditMode(true);
            url = sanitizeUrl("https://");
          } else {
            setIsLinkEditMode(false);
            url = null;
          }
          return activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [activeEditor, isLink, setIsLinkEditMode]);

  const getIcon = (icon: string) => {
    switch (icon) {
      case "image": {
        return <ImageIcon viewBox="0 0 32 32" className={cx(`${icon}`)} />;
      }
      case "word": {
        return <PenEditIcon viewBox="0 0 16 16" className={cx(`${icon}`)} />;
      }
      default: {
        return <div />;
      }
    }
  };

  const getHook = (key: string) => {
    switch (key) {
      case "image": {
        return () => {
          showModal("Insert Image", (onClose) => (
            <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
          ));
        };
      }
      case "word": {
        return () => {
          showModal("Insert Inline Image", (onClose) => (
            <InsertInlineImageDialog
              activeEditor={activeEditor}
              onClose={onClose}
            />
          ));
        };
      }
      default: {
        return () => {};
      }
    }
  };

  const toolbarItems = useMemo(() => {
    const list = TOOLBAR_ITEMS.map((item) => {
      return {
        ...item,
        onClick: getHook(item.key),
      };
    });

    return list;
  }, [activeEditor, getHook, getIcon, showModal]);

  return (
    <div className={cx("toolbar")}>
      {toolbarItems.map(
        (
          item: { key: string; icon: string; onClick: () => void },
          index: number
        ) => {
          return (
            <button
              key={`${item.key}-${index}`}
              style={{
                transitionDelay: `${index * 0.1}s`,
                opacity: showToolbar ? 1 : 0,
                display: showToolbar ? "block" : "none",
              }}
              onClick={item.onClick}
              className={cx("item", `${item.key}-item`)}
            >
              {getIcon(item.icon)}
            </button>
          );
        }
      )}
      {modal}
    </div>
  );
}
