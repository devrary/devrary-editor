import styles from '@/components/lexical/plugins/editorToolbarPlugin/EditorToolbarPlugin.module.scss';
import classNames from 'classnames/bind';
import { Dispatch, SetStateAction } from 'react';
import BlockForamt from '@/components/lexical/plugins/editorToolbarPlugin/blockFormat';
import ElementForamt from '@/components/lexical/plugins/editorToolbarPlugin/elementFormat';
import InlineFormat from '@/components/lexical/plugins/editorToolbarPlugin/inlineFormat';
import EditorController from './editorController';
import NodeFormat from '@/components/lexical/plugins/editorToolbarPlugin/nodeFormat';
import EditorSetting from '@/components/lexical/plugins/editorToolbarPlugin/editorSetting';
import { useSelector } from 'react-redux';
import { getEditorSlice } from '@/states/global/slice/editor';
import FormatSetting from '@/components/lexical/plugins/editorToolbarPlugin/formatSetting';

const cx = classNames.bind(styles);

type Props = {
  setIsLinkEditMode: Dispatch<SetStateAction<boolean>>;
  showToolbar: boolean;
};

const EditorToolbarPlugin = ({ setIsLinkEditMode, showToolbar }: Props) => {
  const editor = useSelector(getEditorSlice);

  return (
    <section className={cx('container')}>
      <EditorController direction={'column'} />
      <BlockForamt direction={'column'} />
      <NodeFormat direction={'column'} />
      <ElementForamt direction={'column'} />
      {editor.showInputFormat && <InlineFormat />}
      <div className={cx('button-wrapper')}>
        {!editor.showInputFormat && <FormatSetting />}
        <EditorSetting direction={'column'} />
      </div>
    </section>
  );
};

export default EditorToolbarPlugin;
