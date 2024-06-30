'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'

import { useStore } from 'zustand'

import { createModalStore, type ModalStore } from '@/stores/modals'
import { createHomeStore, type HomeStore } from '@/stores/sections'

export type ModalStoreApi = ReturnType<typeof createModalStore>
export type HomeStoreApi = ReturnType<typeof createHomeStore>

export const ModalStoreContext = createContext<ModalStoreApi | undefined>(undefined)
export const HomeStoreContext = createContext<HomeStoreApi | undefined>(undefined)

export interface ModalStoreProviderProps {
  children: ReactNode
}
export interface HomeStoreProviderProps {
  children: ReactNode
}

export const StoresProvider = ({ children }: { children: React.ReactNode }) => {
  const modalStoreRef = useRef<ModalStoreApi>()
  const homeStoreRef = useRef<HomeStoreApi>()
  if (!modalStoreRef.current) {
    modalStoreRef.current = createModalStore()
  }
  if (!homeStoreRef.current) {
    homeStoreRef.current = createHomeStore()
  }
  return (
    <ModalStoreContext.Provider value={modalStoreRef.current}>
      <HomeStoreContext.Provider value={homeStoreRef.current}>{children}</HomeStoreContext.Provider>
    </ModalStoreContext.Provider>
  )
}

export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
  const modalStoreContext = useContext(ModalStoreContext)

  if (!modalStoreContext) {
    throw new Error(`useModalStore must be used within ModalStoreContext`)
  }

  return useStore(modalStoreContext, selector)
}
export const useHomeStore = <T,>(selector: (store: HomeStore) => T): T => {
  const homeStoreContext = useContext(HomeStoreContext)

  if (!homeStoreContext) {
    throw new Error(`useHomeStore must be used within HomeStoreContext`)
  }

  return useStore(homeStoreContext, selector)
}
