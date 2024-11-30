import React, { ReactNode } from 'react';
import styles from '@/components/common/button/baseButton/BaseButton.module.scss';
import classNames from 'classnames/bind';
import { ButtonSize } from '@/shared/types/ui/button';

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
  classNames?: string[];
  disabled?: boolean;
  onClick: () => void;
  title?: string;
  size: ButtonSize;
};

const BaseButton = ({
  children,
  classNames = [],
  onClick,
  disabled,
  size,
  title,
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={title}
      className={cx('button-container', ...classNames)}
    >
      {children}
    </button>
  );
};

export default BaseButton;
