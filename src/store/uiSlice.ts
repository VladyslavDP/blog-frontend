import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type uiSliceType = {
  isLoading: boolean;
  isOpen: boolean;
  modalType: string | null;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    isOpen: false,
    modalType: 'Пример модалки',
  } as uiSliceType,
  reducers: {
    showLoader: (state: uiSliceType) => {
      state.isLoading = true;
    },
    hideLoader: (state: uiSliceType) => {
      state.isLoading = false;
    },
    openModal: (state: uiSliceType, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: (state: uiSliceType) => {
      state.isOpen = false;
      state.modalType = null;
    },
  },
});

export const { showLoader, hideLoader, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
