import React from 'react';
import styles from '@/components/lexical/plugins/editorToolbarPlugin/formatSetting/FormatSetting.module.scss';
import classNames from 'classnames/bind';
import IconButton from '@/components/common/button/iconButton';
import FormatIcon from '@/public/icon/pen-edit.svg';
import { useDispatch } from 'react-redux';
import { SET_STATE } from '@/states/global/slice/editor';

const cx = classNames.bind(styles);

const FormatSetting = () => {
  const dispatch = useDispatch();

  return (
    <div className={cx('container')}>
      <IconButton
        onClick={() =>
          dispatch(SET_STATE({ type: 'showInputFormat', value: true }))
        }
        title=""
        tooltip={false}
        icon="setting"
      >
        <FormatIcon viewBox="0 0 16 16" className={cx('icon')} />
      </IconButton>
    </div>
  );
};

export default FormatSetting;
