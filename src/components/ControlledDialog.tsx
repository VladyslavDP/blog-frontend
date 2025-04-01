import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { closeDialog, useAppDispatch, useAppSelector } from '@/store';

export type ControlledDialogProps = {
  title?: string;
  subTitle?: string;
  size?: 'sm' | 'md' | 'lg';
  description?: string;
  body?: React.ReactNode;
  buttons: {
    primary: {
      text?: string;
    };
    secondary?: {
      text?: string;
    };
  };
  onSubmit?: () => Promise<void>;
  onClose?: () => Promise<void>;
};

export const defaultControlledDialogProps: ControlledDialogProps = {
  title: 'Dear user',
  size: 'md',
  subTitle: 'subTitle',
  description: 'description',
  buttons: {
    primary: {
      text: 'confirm',
    },
  },
};

function ControlledDialog(data: Partial<ControlledDialogProps>) {
  const [isLoading, setIsLoading] = React.useState(false);

  const { isModalOpen, modal } = useAppSelector((state) => state.ui);

  const { title, subTitle, description, size, buttons, onSubmit, onClose } = { ...data, ...modal };

  console.log(size);

  const dispatch = useAppDispatch();

  if (!isModalOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div>
      <Dialog
        open={isModalOpen}
        onOpenChange={async () => {
          dispatch(closeDialog());
          await onClose?.apply(this);
        }}
      >
        <DialogContent className={sizeClasses[size || 'md']}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subTitle}</DialogDescription>
          </DialogHeader>
          <div>
            <p>{description}</p>
          </div>
          <DialogFooter>
            <button
              onClick={async () => {
                setIsLoading(true);
                try {
                  if (typeof onSubmit === 'function') {
                    await onSubmit.apply(this);
                  }
                  dispatch(closeDialog());
                } catch (error) {
                  console.error('Ошибка выполнения onSubmit:', error);
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
              style={{
                padding: '10px 20px',
                backgroundColor: isLoading ? 'gray' : 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? 'Loading...' : buttons?.primary?.text || 'Confirm'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ControlledDialog;
