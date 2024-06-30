import { MODAL } from '@/enums/modal'
import { createStore } from 'zustand/vanilla'

export type ModalState = {
  modal: MODAL
}

export type ModalActions = {
  setModal: (modal: MODAL) => void
}

export type ModalStore = ModalState & ModalActions

export const defaultInitState: ModalState = {
  modal: MODAL.DEFAULT
}

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()(set => ({
    ...initState,
    setModal: (modal: MODAL) => set(state => ({ ...state, modal })),
    closeModal: () => set(state => ({ ...state, modal: MODAL.DEFAULT }))
  }))
}
