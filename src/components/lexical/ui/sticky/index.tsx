import React, { useEffect, useLayoutEffect, useRef } from "react";
import { NodeKey, LexicalEditor, $getNodeByKey } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Position } from "@/shared/types/ui/position";
import { useCollaborationContext } from "@lexical/react/LexicalCollaborationContext";
import { calculateZoomLevel } from "@lexical/utils";
import { positionSticky } from "@/shared/libs/lexical/position";
import { $isStickyNode } from "../../nodes/stickyNode";
import { useLexicalHistory } from "@/states/lexical/lexicalHistory/LexicalHistoryProvider";
import styles from "@/components/lexical/ui/sticky/Sticky.module.scss";
import classNames from "classnames/bind";
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer";
import theme from "@/components/lexical/theme/lexicalTheme";
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { createWebsocketProvider } from "@/shared/libs/lexical/collaboration";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

const cx = classNames.bind(styles);

type Props = {
  caption: LexicalEditor;
  color: "pink" | "yellow";
  nodeKey: NodeKey;
  x: number;
  y: number;
};

const Sticky = ({ caption, color, nodeKey, x, y }: Props) => {
  const [editor] = useLexicalComposerContext();
  const stickyRef = useRef<null | HTMLDivElement>(null);
  const positioningRef = useRef<Position>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    rootElementRect: null,
    x: 0,
    y: 0,
  });
  const { isCollabActive } = useCollaborationContext();

  useEffect(() => {
    const position = positioningRef.current;
    position.x = x;
    position.y = y;

    const stickyContainer = stickyRef.current;
    if (stickyContainer !== null) {
      positionSticky(stickyContainer, position);
    }
  }, [x, y]);

  useLayoutEffect(() => {
    const position = positioningRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const { target } = entry;
        position.rootElementRect = target.getBoundingClientRect();
        const stickyContainer = stickyRef.current;
        if (stickyContainer !== null) {
          positionSticky(stickyContainer, position);
        }
      }
    });

    const removeRootListener = editor.registerRootListener(
      (nextRootElem, prevRootElem) => {
        if (prevRootElem !== null) {
          resizeObserver.unobserve(prevRootElem);
        }
        if (nextRootElem !== null) {
          resizeObserver.observe(nextRootElem);
        }
      }
    );

    const handleWindowResize = () => {
      const rootElement = editor.getRootElement();
      const stickyContainer = stickyRef.current;
      if (rootElement !== null && stickyContainer !== null) {
        position.rootElementRect = rootElement.getBoundingClientRect();
        positionSticky(stickyContainer, position);
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      removeRootListener();
    };
  }, [editor]);

  useEffect(() => {
    const stickyContainer = stickyRef.current;
    if (stickyContainer !== null) {
      // Delay adding transition so we don't trigger the
      // transition on load of the sticky.
      setTimeout(() => {
        stickyContainer.style.setProperty(
          "transition",
          "top 0.3s ease 0s, left 0.3s ease 0s"
        );
      }, 500);
    }
  }, []);

  const handlePointerMove = (event: PointerEvent) => {
    const stickyContainer = stickyRef.current;
    const positioning = positioningRef.current;
    const rootElementRect = positioning.rootElementRect;
    const zoom = calculateZoomLevel(stickyContainer);
    if (
      stickyContainer !== null &&
      positioning.isDragging &&
      rootElementRect !== null
    ) {
      positioning.x =
        event.pageX / zoom - positioning.offsetX - rootElementRect.left;
      positioning.y =
        event.pageY / zoom - positioning.offsetY - rootElementRect.top;
      positionSticky(stickyContainer, positioning);
    }
  };

  const handlePointerUp = (event: PointerEvent) => {
    const stickyContainer = stickyRef.current;
    const positioning = positioningRef.current;
    if (stickyContainer !== null) {
      positioning.isDragging = false;
      stickyContainer.classList.remove("dragging");
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isStickyNode(node)) {
          node.setPosition(positioning.x, positioning.y);
        }
      });
    }
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
  };

  const handleDelete = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isStickyNode(node)) {
        node.remove();
      }
    });
  };

  const handleColorChange = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isStickyNode(node)) {
        node.toggleColor();
      }
    });
  };

  const { historyState } = useLexicalHistory();

  return (
    <div ref={stickyRef} className={cx("sticky-note-container")}>
      <div
        className={cx("sticky-note")}
        style={{ backgroundColor: color }}
        onPointerDown={(event) => {
          const stickyContainer = stickyRef.current;
          if (
            stickyContainer == null ||
            event.button === 2 ||
            event.target !== stickyContainer.firstChild
          ) {
            return;
          }
          const stickContainer = stickyContainer;
          const position = positioningRef.current;
          if (stickContainer !== null) {
            const { top, left } = stickContainer.getBoundingClientRect();
            const zoom = calculateZoomLevel(stickContainer);
            position.offsetX = event.clientX / zoom - left;
            position.offsetY = event.clientY / zoom - top;
            position.isDragging = true;
            stickContainer.classList.add("dragging");
            document.addEventListener("pointermove", handlePointerMove);
            document.addEventListener("pointerup", handlePointerUp);
            event.preventDefault();
          }
        }}
      >
        <button
          onClick={handleDelete}
          className={cx("delete")}
          aria-label="delete-sticky-note"
          title="Delete"
        >
          X
        </button>
        <button
          onClick={handleColorChange}
          className={cx("color")}
          aria-label="change-sticky-note-color"
          title="Color"
        >
          O
        </button>
        <LexicalNestedComposer initialEditor={caption} initialTheme={theme}>
          {isCollabActive ? (
            <CollaborationPlugin
              id={caption.getKey()}
              providerFactory={createWebsocketProvider}
              shouldBootstrap={true}
            />
          ) : (
            <HistoryPlugin externalHistoryState={historyState} />
          )}
          <PlainTextPlugin
            contentEditable={
              <div className={cx("richtext-container")}>
                <ContentEditable
                  contentEditable
                  className={cx("richtext")}
                  role="textbox"
                />
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </LexicalNestedComposer>
      </div>
    </div>
  );
};

export default Sticky;
