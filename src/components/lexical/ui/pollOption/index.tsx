import React, { useRef } from "react";
import styles from "@/components/lexical/ui/pollOption/PollOption.module.scss";
import classNames from "classnames/bind";
import { useCollaborationContext } from "@lexical/react/LexicalCollaborationContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import { Options, Option, PollNode } from "@/components/lexical/nodes/pollNode";

const cx = classNames.bind(styles);

type Props = {
  index: number;
  option: Option;
  options: Options;
  totalVotes: number;
  withPollNode: (
    cb: (pollNode: PollNode) => void,
    onSelect?: () => void
  ) => void;
};

const PollOption = ({
  index,
  option,
  options,
  totalVotes,
  withPollNode,
}: Props) => {
  const { clientID } = useCollaborationContext();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const votesArray = option.votes;
  const checkedIndex = votesArray.indexOf(clientID);
  const checked = checkedIndex !== -1;
  const votes = votesArray.length;
  const text = option.text;

  return (
    <div className={cx("poll-option-container")}>
      <div className={cx("poll-option-checkbox-wrapper")}>
        <input
          aria-label={`${text}-checkbox`}
          ref={checkboxRef}
          type="checkbox"
          name={text}
          id={`${text}-${index}`}
          checked={checked}
          className={cx("poll-option-checkbox")}
        />
      </div>
      <div className={cx("poll-option-input-wrapper")}>
        <div
          className={cx("poll-option-input-votes")}
          style={{ width: `${votes === 0 ? 0 : (votes / totalVotes) * 100}%` }}
        />
        <span className={cx("poll-option-input-vote-count")}>
          {votes > 0 && (votes === 1 ? "1 vote" : `${votes} votes`)}
        </span>
        <input
          type="text"
          value={text}
          aria-label={text}
          className={cx("poll-option-input")}
          onChange={(e) => {
            const target = e.target;
            const value = target.value;
            const selectionStart = target.selectionStart;
            const selectionEnd = target.selectionEnd;
            withPollNode(
              (node) => {
                node.setOptionText(option, value);
              },
              () => {
                target.selectionStart = selectionStart;
                target.selectionEnd = selectionEnd;
              }
            );
          }}
          placeholder={`Option ${index + 1}`}
        />
      </div>
      <button
        disabled={options.length < 3}
        className={cx("poll-option-delete")}
        aria-label="remove-option"
        onClick={() => {
          withPollNode((node) => {
            node.deleteOption(option);
          });
        }}
      >
        <span>x</span>
      </button>
    </div>
  );
};

export default PollOption;
