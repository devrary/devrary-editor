"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LexicalDropdownContext } from "@/states/lexical/lexicalDropdown/LexicalDropdownContext";
import styles from "@/components/common/dropdown/baseDropdown/BaseDropdown.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
  dropDownRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
};

const LexicalDropdownProvider = ({ children, dropDownRef, onClose }: Props) => {
  const [items, setItems] = useState<React.RefObject<HTMLButtonElement>[]>();
  const [highlightedItem, setHighlightedItem] =
    useState<React.RefObject<HTMLButtonElement>>();

  const registerItem = useCallback(
    (itemRef: React.RefObject<HTMLButtonElement>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
    },
    [setItems]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!items) {
      return;
    }

    const key = event.key;

    if (["Escape", "ArrowUp", "ArrowDown", "Tab"].includes(key)) {
      event.preventDefault();
    }

    if (key === "Escape" || key === "Tab") {
      onClose();
    } else if (key === "ArrowUp") {
      setHighlightedItem((prev) => {
        if (!prev) {
          return items[0];
        }
        const index = items.indexOf(prev) - 1;
        return items[index === -1 ? items.length - 1 : index];
      });
    } else if (key === "ArrowDown") {
      setHighlightedItem((prev) => {
        if (!prev) {
          return items[0];
        }
        return items[items.indexOf(prev) + 1];
      });
    }
  };

  const contextValue = useMemo(
    () => ({
      registerItem,
    }),
    [registerItem]
  );

  useEffect(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0]);
    }

    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus();
    }
  }, [items, highlightedItem]);

  return (
    <LexicalDropdownContext.Provider value={contextValue}>
      <div
        className={cx("dropdown")}
        ref={dropDownRef}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </LexicalDropdownContext.Provider>
  );
};

export default LexicalDropdownProvider;
