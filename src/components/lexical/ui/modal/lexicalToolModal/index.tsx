import React from 'react';
import styles from '@/components/lexical/ui/modal/lexicalToolModal/LexicalToolModal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LexicalToolModal = () => {
  return <section className={cx('modal-container')}></section>;
};

export default LexicalToolModal;
