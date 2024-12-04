import React, { useState } from 'react';
import styles from '@/components/lexical/ui/imageInsertion/ImageInsertionComponent.module.scss';
import classNames from 'classnames/bind';
import { ImageInsertionType } from '@/components/lexical/nodes/imageInsertionNode';
import { NodeKey } from 'lexical';
import FilePlusIcon from '@/public/icon/file-plus.svg';
import ImportIcon from '@/public/icon/import.svg';
import PreviewIcon from '@/public/icon/preview.svg';
import TrashIcon from '@/public/icon/trash.svg';
import CheckIcon from '@/public/icon/check.svg';

const cx = classNames.bind(styles);

type Props = {
  mode: ImageInsertionType;
  nodeKey: NodeKey;
};

const ImageInsertionComponent = ({ mode, nodeKey }: Props) => {
  const [type, setType] = useState<ImageInsertionType>(mode);
  const [imageSource, setImageSource] = useState<
    string | ArrayBuffer | Blob | null
  >(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [kb, setKb] = useState<number>(0);

  return (
    <div className={cx('image-insertion-container')}>
      <div className={cx('wrapper-left')}>
        <div className={cx('button-wrapper')}>
          <button
            className={cx('tab-mode-button', { active: type === 'file' })}
            onClick={() => setType('file')}
          >
            <FilePlusIcon
              viewBox="0 0 24 24"
              className={cx('file-plus-icon')}
            />
            <span className={cx('text')}>Add File</span>
          </button>
          <button
            className={cx('tab-mode-button', { active: type === 'url' })}
            onClick={() => setType('url')}
          >
            <ImportIcon viewBox="0 0 24 24" className={cx('import-icon')} />
            <span className={cx('text')}>Import URL</span>
          </button>
        </div>
        {type === 'file' && (
          <div className={'file-wrapper'}>
            <label htmlFor="file-input">
              <div>Upload from device </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className={cx('file-input')}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      const image = new Image();
                      image.src = reader.result as string;
                      image.onload = () => {
                        setWidth(image.width);
                        setHeight(image.height);
                        setKb(Math.round(file.size / 1024));
                        setImageFile(file);
                        setImageSource(reader.result);
                      };
                    };
                  }
                  console.log(event);
                }}
              />
            </label>
          </div>
        )}
        {type === 'url' && (
          <div className={cx('url-wrapper')}>
            <input type="text" name="" id="" placeholder="Import URL" />
          </div>
        )}
        {type && (
          <div className={cx('caption-wrapper')}>
            <input type="text" name="" id="" placeholder="Add Caption" />
          </div>
        )}
      </div>
      <div className={cx('wrapper-right')}>
        <div className={cx('image-info-wrapper')}>
          <span className={cx('image-info-text')}>Width: {width}px</span>
          <span className={cx('image-info-text')}>Height: {height}px</span>
          <span className={cx('image-info-text')}>Size: {kb}KB</span>
        </div>
        <div className={cx('button-wrapper')}>
          <button className={cx('ctrl-button')} onClick={() => {}}>
            <PreviewIcon viewBox="0 0 24 24" className={cx('preview-icon')} />
          </button>
          <button className={cx('ctrl-button')} onClick={() => {}}>
            <TrashIcon viewBox="0 0 16 16" className={cx('preview-icon')} />
          </button>
          <button className={cx('ctrl-button')} onClick={() => {}}>
            <CheckIcon viewBox="0 0 24 24" className={cx('check-icon')} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageInsertionComponent;
