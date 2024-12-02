'use client';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  LexicalModalContext,
  LexicalModalShape,
  LexicalModalType,
} from '@/states/lexical/lexicalModal/LexicalModalContext';
import LexicalToolModal from '@/components/lexical/ui/modal/lexicalToolModal';

type Props = {
  children: ReactNode;
};

const LexicalModalProvider = ({ children }: Props) => {
  const [display, setDisplay] = useState<boolean>(false);
  const [modal, setModal] = useState<LexicalModalShape[]>([]);

  const addModal = useCallback(
    (newModal: LexicalModalShape) => {
      setModal([newModal, ...modal]);
    },
    [modal]
  );

  const removeModal = useCallback(
    (modalKey: LexicalModalType) => {
      setModal(modal.filter((m) => m.key !== modalKey));
    },
    [modal]
  );

  const clearModal = useCallback(() => {
    setModal([]);
  }, [modal]);

  const relocateModal = useCallback(
    (key: LexicalModalType, targetLayer: number) => {
      const targetModal = modal.find((m) => m.key === key);
      if (!targetModal) {
        return;
      }

      if (targetLayer <= 0) {
        setModal([targetModal, ...modal.filter((m) => m.key !== key)]);
      } else if (targetLayer >= modal.length) {
        setModal([...modal.filter((m) => m.key !== key), targetModal]);
      } else {
        setModal([
          ...modal.slice(0, targetLayer),
          targetModal,
          ...modal.slice(targetLayer),
        ]);
      }
    },
    [modal]
  );

  const renderModal = useCallback(() => {
    return modal.map((m) => {
      switch (m.key) {
        case 'tool-aggregation':
          return <LexicalToolModal key={m.key} position={m.params.position} />;
        default:
          return null;
      }
    });
  }, [modal]);

  const contextValue = useMemo(() => {
    return {
      display,
      setDisplay,
      modal,
      addModal,
      removeModal,
      clearModal,
      relocateModal,
    };
  }, [modal]);

  return (
    <LexicalModalContext.Provider value={contextValue}>
      {children}
      {renderModal()}
    </LexicalModalContext.Provider>
  );
};

export const useLexicalModal = () => {
  return useContext(LexicalModalContext);
};

export default LexicalModalProvider;
