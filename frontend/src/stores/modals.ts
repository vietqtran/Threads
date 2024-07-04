import { MODAL } from '@/enums/modal'
import { createStore } from 'zustand/vanilla'

export type ModalState = {
  modal: MODAL
  threadMedias: {
    openIndex: number
    medias: string[]
  }
}

export type ModalActions = {
  setModal: (modal: MODAL) => void
  closeModal: () => void
  setViewThreadMedias: (openIndex: number, medias: string[]) => void
  closeViewThreadMedias: () => void
}

export type ModalStore = ModalState & ModalActions

export const defaultInitState: ModalState = {
  modal: MODAL.DEFAULT,
  threadMedias: {
    openIndex: 0,
    medias: []
  }
}

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()(set => ({
    ...initState,
    setModal: (modal: MODAL) => set(state => ({ ...state, modal })),
    closeModal: () => {
      set(state => ({ ...state, modal: MODAL.DEFAULT }))
    },
    setViewThreadMedias: (openIndex: number, medias: string[]) => {
      set(state => ({ ...state, modal: MODAL.VIEW_THREAD_IMAGES }))
      console.log({ openIndex, medias })
      set(state => ({ ...state, threadMedias: { ...state.threadMedias, openIndex, medias } }))
    },
    closeViewThreadMedias: () => {
      set(state => ({ ...state, modal: MODAL.DEFAULT }))
    }
  }))
}
