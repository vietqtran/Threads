import { HOME_MAIN_SECTION, HOME_SECTION } from '@/enums/home'
import { createStore, StateCreator } from 'zustand'
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware'

export type HomeState = {
  sections: {
    id: string
    title: string
    section: HOME_SECTION
  }[]
  mainSection: HOME_MAIN_SECTION
}

export type HomeActions = {
  setMainSection: (section: HOME_MAIN_SECTION) => void
  pinSection: (section: { id: string; title: string; section: HOME_SECTION }) => void
  unPinSection: (sectionId: string) => void
}

export type HomeStore = HomeState & HomeActions

export const defaultInitState: HomeState = {
  sections: [],
  mainSection: HOME_MAIN_SECTION.FOR_YOU
}

type HomePersist = (
  config: StateCreator<HomeStore>,
  options: PersistOptions<HomeStore>
) => StateCreator<HomeStore>

export const createHomeStore = (initState: HomeState = defaultInitState) => {
  return createStore<HomeStore>(
    (persist as HomePersist)(
      (set) => ({
        ...initState,
        setMainSection: (section: HOME_MAIN_SECTION) => set(state => ({ ...state, mainSection: section })),
        pinSection: (section: { id: string; title: string; section: HOME_SECTION }) =>
          set(state => ({ ...state, sections: [...state.sections, section] })),
        unPinSection: (sectionId: string) =>
          set(state => ({ ...state, sections: state.sections.filter(x => x.id !== sectionId) }))
      }),
      {
        name: 'home-sections-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
}