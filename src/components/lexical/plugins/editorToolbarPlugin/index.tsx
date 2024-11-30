import styles from '@/components/lexical/plugins/editorToolbarPlugin/EditorToolbarPlugin.module.scss';
import classNames from 'classnames/bind';
import { Dispatch, SetStateAction } from 'react';
import BlockForamt from '@/components/lexical/plugins/editorToolbarPlugin/blockFormat';
import ElementForamt from '@/components/lexical/plugins/editorToolbarPlugin/elementFormat';
import InlineFormat from '@/components/lexical/plugins/editorToolbarPlugin/inlineFormat';
import EditorController from './editorController';
import NodeFormat from '@/components/lexical/plugins/editorToolbarPlugin/nodeFormat';
import EditorSetting from '@/components/lexical/plugins/editorToolbarPlugin/editorSetting';

const cx = classNames.bind(styles);

type Props = {
  setIsLinkEditMode: Dispatch<SetStateAction<boolean>>;
  showToolbar: boolean;
};

const EditorToolbarPlugin = ({ setIsLinkEditMode, showToolbar }: Props) => {
  return (
    <section className={cx('container')}>
      <EditorController direction={'column'} />
      <BlockForamt direction={'column'} />
      <NodeFormat direction={'column'} />
      <ElementForamt direction={'column'} />
      <InlineFormat />
      <div className={cx('button-wrapper')}>
        <EditorSetting direction={'column'} />
      </div>
    </section>
  );
};

export default EditorToolbarPlugin;
