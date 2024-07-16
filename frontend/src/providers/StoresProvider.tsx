'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'

import { useStore } from 'zustand'

import { createModalStore, type ModalStore } from '@/stores/modals'
import { createHomeStore, type HomeStore } from '@/stores/sections'
import { createUserStore, type UserStore } from '@/stores/user'

export type ModalStoreApi = ReturnType<typeof createModalStore>
export type HomeStoreApi = ReturnType<typeof createHomeStore>
export type UserStoreApi = ReturnType<typeof createUserStore>

export const ModalStoreContext = createContext<ModalStoreApi | undefined>(undefined)
export const HomeStoreContext = createContext<HomeStoreApi | undefined>(undefined)
export const UserStoreContext = createContext<UserStoreApi | undefined>(undefined)

export interface ModalStoreProviderProps {
  children: ReactNode
}
export interface HomeStoreProviderProps {
  children: ReactNode
}
export interface UserStoreProviderProps {
  children: ReactNode
}

export const StoresProvider = ({ children }: { children: React.ReactNode }) => {
  const modalStoreRef = useRef<ModalStoreApi>()
  const homeStoreRef = useRef<HomeStoreApi>()
  const userStoreRef = useRef<UserStoreApi>()

  if (!modalStoreRef.current) {
    modalStoreRef.current = createModalStore()
  }
  if (!homeStoreRef.current) {
    homeStoreRef.current = createHomeStore()
  }
  if (!userStoreRef.current) {
    userStoreRef.current = createUserStore()
  }

  return (
    <UserStoreContext.Provider value={userStoreRef.current}>
      <ModalStoreContext.Provider value={modalStoreRef.current}>
        <HomeStoreContext.Provider value={homeStoreRef.current}>{children}</HomeStoreContext.Provider>
      </ModalStoreContext.Provider>
    </UserStoreContext.Provider>
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

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext)

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreContext`)
  }

  return useStore(userStoreContext, selector)
}
