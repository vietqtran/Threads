import { HOME_MAIN_SECTION, HOME_SECTION } from '@/enums/home'

import { createStore } from 'zustand/vanilla'

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

export const createHomeStore = (initState: HomeState = defaultInitState) => {
  return createStore<HomeStore>()(set => ({
    ...initState,
    setMainSection: (section: HOME_MAIN_SECTION) => set(state => ({ ...state, mainSection: section })),
    pinSection: (section: { id: string; title: string; section: HOME_SECTION }) =>
      set(state => ({ ...state, sections: [...state.sections, section] })),
    unPinSection: (sectionId: string) =>
      set(state => ({ ...state, section: state.sections.filter(x => x.id !== sectionId) }))
  }))
}
