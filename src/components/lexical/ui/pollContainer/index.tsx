import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  BaseSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  NodeKey,
} from "lexical";
import {
  $isPollNode,
  createPollOption,
  Option,
  Options,
  PollNode,
} from "@/components/lexical/nodes/pollNode";
import styles from "@/components/lexical/ui/pollContainer/PollContainer.module.scss";
import classNames from "classnames/bind";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import PollOption from "@/components/lexical/ui/pollOption";
import LexicalButton from "@/components/lexical/ui/button";

const cx = classNames.bind(styles);

type Props = {
  nodeKey: NodeKey;
  options: Options;
  question: string;
};

function getTotalVotes(options: Options): number {
  return options.reduce((totalVotes, next) => {
    return totalVotes + next.votes.length;
  }, 0);
}

const PollContainer = ({ nodeKey, options, question }: Props) => {
  const [editor] = useLexicalComposerContext();
  const totalVotes = useMemo(() => getTotalVotes(options), [options]);
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const $onDelete = useCallback(
    (payload: KeyboardEvent) => {
      const deleteSelection = $getSelection();
      if (isSelected && $isNodeSelection(deleteSelection)) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        editor.update(() => {
          deleteSelection.getNodes().forEach((node) => {
            if ($isPollNode(node)) {
              node.remove();
            }
          });
        });
      }
      return false;
    },
    [editor, isSelected]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        setSelection(editorState.read(() => $getSelection()));
      }),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;

          if (event.target === divRef.current) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        $onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        $onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
  }, [clearSelection, editor, isSelected, nodeKey, $onDelete, setSelected]);

  const withPollNode = (
    cb: (node: PollNode) => void,
    onUpdate?: () => void
  ): void => {
    editor.update(
      () => {
        const node = $getNodeByKey(nodeKey);
        if ($isPollNode(node)) {
          cb(node);
        }
      },
      { onUpdate }
    );
  };

  const addOption = () => {
    withPollNode((node) => {
      node.addOption(createPollOption());
    });
  };

  const isFocused = useMemo(() => {
    return $isNodeSelection(selection) && isSelected;
  }, [selection, isSelected]);

  return (
    <div className={cx("poll-container", { focus: isFocused })} ref={divRef}>
      <div className={cx("poll-inner")}>
        <h2 className={cx("poll-heading")}>{question}</h2>
        {options.map((option: Option, index: number) => {
          const key = option.uid;
          return (
            <PollOption
              key={key}
              index={index}
              withPollNode={withPollNode}
              option={option}
              options={options}
              totalVotes={totalVotes}
            />
          );
        })}
        <div className={cx("poll-footer")}>
          <LexicalButton onClick={addOption} small>
            Add Option
          </LexicalButton>
        </div>
      </div>
    </div>
  );
};

export default PollContainer;
