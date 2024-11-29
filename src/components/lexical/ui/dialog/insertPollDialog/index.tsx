import BaseDialog from "@/components/common/dialog/baseDialog";
import TextInput from "@/components/common/inputs/textInput";
import { INSERT_POLL_COMMAND } from "@/components/lexical/plugins/pollPlugin";
import { LexicalEditor } from "lexical";
import { Fragment, useState } from "react";
import LexicalButton from "@/components/lexical/ui/button";

export function InsertPollDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
}): JSX.Element {
  const [question, setQuestion] = useState<string>("");

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_POLL_COMMAND, question);
    onClose();
  };

  return (
    <Fragment>
      <TextInput label="Question" onChange={setQuestion} value={question} />
      <BaseDialog>
        <LexicalButton disabled={question.trim() === ""} onClick={onClick}>
          Confirm
        </LexicalButton>
      </BaseDialog>
    </Fragment>
  );
}
