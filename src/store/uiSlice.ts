import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ControlledDialogProps, defaultControlledDialogProps } from '@/components/ControlledDialog';

type uiSliceType = {
  isLoading: boolean;
  isModalOpen: boolean;
  modal: Partial<ControlledDialogProps>;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    isModalOpen: false,
    modal: defaultControlledDialogProps,
  } as uiSliceType,
  reducers: {
    showLoader: (state: uiSliceType) => {
      state.isLoading = true;
    },
    hideLoader: (state: uiSliceType) => {
      state.isLoading = false;
    },
    openDialog: (state: uiSliceType, action: PayloadAction<Partial<ControlledDialogProps>>) => {
      state.isModalOpen = true;
      state.modal = { ...state.modal, ...action.payload };
    },
    closeDialog: (state: uiSliceType) => {
      state.isModalOpen = false;
    },
  },
});

export const { showLoader, hideLoader, openDialog, closeDialog } = uiSlice.actions;
export default uiSlice.reducer;
