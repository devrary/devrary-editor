/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '@/components/lexical/ui/imageInsertion/ImageInsertionComponent.module.scss';
import classNames from 'classnames/bind';
import {
  ImageInsertionNode,
  ImageInsertionType,
} from '@/components/lexical/nodes/imageInsertionNode';
import {
  $getRoot,
  COMMAND_PRIORITY_CRITICAL,
  NodeKey,
  PASTE_COMMAND,
} from 'lexical';
import PreviewIcon from '@/public/icon/preview.svg';
import TrashIcon from '@/public/icon/trash.svg';
import CheckIcon from '@/public/icon/check.svg';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CONVERT_IMAGE_INSERTION_TO_IMAGE_COMMAND } from '../../plugins/imageInsertionPlugin';
import ImageIcon from '@/public/icon/square-image.svg';
import CloseIcon from '@/public/icon/close-x.svg';
import { mergeRegister } from '@lexical/utils';
import { useOnClick } from '@/shared/hooks/useOnClick';

const cx = classNames.bind(styles);

type Props = {
  id: string;
  mode: ImageInsertionType;
  nodeKey: NodeKey;
};

const ImageInsertionComponent = ({ id, mode }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState<boolean>(mode ? true : false);
  const [type, setType] = useState<ImageInsertionType>(mode ?? 'file');
  const [imageSource, setImageSource] = useState<
    string | ArrayBuffer | Blob | null
  >(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [kb, setKb] = useState<number>(0);
  const [caption, setCaption] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onFocus = useCallback(() => {
    setIsSelected(true);
  }, [editor, isSelected, id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const image = new Image();
    image.src = imageSource as string;
    image.onload = () => {
      if (ctx) {
        ctx?.drawImage(image, 0, 0);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
      }
    };
  }, [imageSource]);

  useEffect(() => {
    editor.registerUpdateListener(() => {
      onFocus();
    });
  }, [editor, onFocus, id]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        PASTE_COMMAND,
        (event) => {
          const clipboardEvent = event as ClipboardEvent;
          clipboardEvent.preventDefault();
          const clipboardData =
            clipboardEvent.clipboardData?.getData('text/plain');
          if (isSelected) {
            setImageUrl(clipboardData ?? '');
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [editor, onFocus, isSelected, id]);

  useOnClick({
    ref,
    handler: () => {
      setIsSelected(false);
    },
    mouseEvent: 'click',
  });
  return (
    <div
      className={cx('image-insertion-container', { open, unopen: !open })}
      ref={ref}
      onClick={onFocus}
    >
      {open ? (
        <div className={cx('image-insertion-wrapper')}>
          <div className={cx('insertion-header')}>
            {!imageSource && (
              <div className={cx('button-wrapper')}>
                <button
                  className={cx('tab-mode-button', { active: type === 'file' })}
                  onClick={() => setType('file')}
                >
                  <span className={cx('text')}>Upload</span>
                </button>
                <button
                  className={cx('tab-mode-button', { active: type === 'url' })}
                  onClick={() => setType('url')}
                >
                  <span className={cx('text')}>Embed</span>
                </button>
              </div>
            )}
            <button
              className={cx('close-button')}
              onClick={() => {
                editor.update(() => {
                  const root = $getRoot();
                  root.getChildren().forEach((node) => {
                    if (
                      node instanceof ImageInsertionNode &&
                      node.getType() === 'image-insertion' &&
                      node.__id === id
                    ) {
                      node.remove();
                    }
                  });
                });
              }}
            >
              <CloseIcon viewBox="0 0 24 24" className={cx('close-icon')} />
            </button>
          </div>
          <div className={cx('insertion-body')}>
            {!imageSource && type === 'file' && (
              <div className={'file-wrapper'}>
                <label htmlFor="file-input" className={cx('file-input-label')}>
                  <ImageIcon
                    viewBox="-0.5 0.5 42 42"
                    className={cx('image-icon')}
                  />
                  <span>Upload Image</span>
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
                    }}
                  />
                </label>
              </div>
            )}
            {!imageSource && type === 'url' && (
              <div className={cx('url-wrapper')}>
                <input
                  type="text"
                  name=""
                  id=""
                  value={imageUrl}
                  onChange={(event) => {
                    setImageUrl(event.target.value);
                  }}
                  placeholder="Import URL"
                  className={cx('url-input')}
                />
                <button
                  className={cx('url-button')}
                  onClick={async () => {
                    const data = await fetch(imageUrl as string, {
                      method: 'GET',
                    });
                    const blob = await data.blob();
                    const url = URL.createObjectURL(blob);
                    console.log(blob);
                    console.log(url);
                    const image = new Image();
                    image.src = url;
                    image.onload = () => {
                      setWidth(image.width);
                      setHeight(image.height);
                      setKb(Math.round(blob.size / 1024));
                      setImageSource(url);
                      setImageFile(blob as File);
                    };
                    console.log(blob);
                  }}
                >
                  <span className={cx('button-text')}>Embed</span>
                </button>
              </div>
            )}
            {imageSource && imageFile && (
              <div className={cx('canvas-wrapper')}>
                <canvas
                  ref={canvasRef}
                  style={{ width: '100%' }}
                  className={cx('canvas')}
                ></canvas>
              </div>
            )}
          </div>
          <div className={cx('ctrl-button-wrapper')}>
            <div className={cx('caption-wrapper')}>
              <input
                type="text"
                name=""
                id=""
                placeholder="Add Caption"
                className={cx('caption-input')}
              />
            </div>
            <div className={cx('button-wrapper')}>
              <button className={cx('ctrl-button')} onClick={() => {}}>
                <PreviewIcon
                  viewBox="0 0 24 24"
                  className={cx('preview-icon')}
                />
              </button>
              <button
                className={cx('ctrl-button')}
                onClick={() => {
                  setImageFile(null);
                  setImageSource(null);
                }}
              >
                <TrashIcon viewBox="0 0 16 16" className={cx('preview-icon')} />
              </button>
              <button
                className={cx('ctrl-button')}
                onClick={() => {
                  editor.update(() => {
                    editor.dispatchCommand(
                      CONVERT_IMAGE_INSERTION_TO_IMAGE_COMMAND,
                      {
                        altText: caption,
                        height: height,
                        width: width,
                        src: imageSource as string,
                        maxWidth: width,
                        showCaption: caption !== '',
                        id,
                      }
                    );
                  });
                }}
              >
                <CheckIcon viewBox="0 0 24 24" className={cx('check-icon')} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button className={cx('image-insertion')} onClick={() => setOpen(true)}>
          <ImageIcon viewBox="-0.5 0.5 42 42" className={cx('image-icon')} />
          <span className={cx('image-text')}>Add an image</span>
        </button>
      )}
    </div>
  );
};

export default ImageInsertionComponent;
