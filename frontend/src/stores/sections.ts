import { HOME_MAIN_SECTION, HOME_SECTION } from '@/enums/home'

import { createStore } from 'zustand/vanilla'

export type HomeState = {
  sections: HOME_SECTION[]
  mainSection: HOME_MAIN_SECTION
}

export type HomeActions = {
  setMainSection: (section: HOME_MAIN_SECTION) => void
  pinSection: (section: HOME_SECTION) => void
  unPinSection: (section: HOME_SECTION) => void
}

export type HomeStore = HomeState & HomeActions

export const defaultInitState: HomeState = {
  sections: [HOME_SECTION.DEFAULT],
  mainSection: HOME_MAIN_SECTION.FOR_YOU
}

export const createHomeStore = (initState: HomeState = defaultInitState) => {
  return createStore<HomeStore>()(set => ({
    ...initState,
    setMainSection: (section: HOME_MAIN_SECTION) => set(state => ({ ...state, mainSection: section })),
    pinSection: (section: HOME_SECTION) => set(state => ({ ...state, section: [...state.sections, section] })),
    unPinSection: (section: HOME_SECTION) =>
      set(state => ({ ...state, section: state.sections.filter(x => x !== section) }))
  }))
}
