import { HEADER_FLYOUT } from '@/constants/header'
import { createSlice } from '@reduxjs/toolkit'

const headerSlice = createSlice({
  name: 'header',
  initialState: {
    flyout: HEADER_FLYOUT.DEFAULT
  },
  reducers: {
    setFlyout: (state, action) => {
      state.flyout = action.payload
    },
    reset: () => ({ flyout: HEADER_FLYOUT.DEFAULT })
  }
})

const { actions, reducer } = headerSlice
export const { setFlyout, reset } = actions
export default reducer
