import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { closeModal } from '@/store';

export const Modal = () => {
  const { isOpen, modalType } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '4px',
          minWidth: '300px',
          textAlign: 'center',
        }}
      >
        <h1>{modalType || 'Модалка'}</h1>
        <button
          onClick={() => dispatch(closeModal())}
          style={{
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};
