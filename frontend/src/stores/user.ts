import { User } from '@/types/user'
import { createStore, StateCreator } from 'zustand'
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware'

export type UserState = {
  user: User | null
}

export type UserActions = {
  setUser: (user: User | null) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  user: null
}

type UserPersist = (config: StateCreator<UserStore>, options: PersistOptions<UserStore>) => StateCreator<UserStore>

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>(
    (persist as UserPersist)(
      set => ({
        ...initState,
        setUser: user => set(state => ({ ...state, user: user }))
      }),
      {
        name: 'user',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
}
