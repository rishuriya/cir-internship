import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  value: object
}

interface userObj {
  name: string
  email: string
  isAdmin: boolean
  token: string
}

const initialState: UserState = {
  value: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    update:(state, actions)=>{
      state.value = {
            id: actions.payload.id,
            name: actions.payload.name,
            email: actions.payload.email,
            isAdmin: actions.payload.isAdmin, 
            token: actions.payload.token
    }
    },
    unsetUser: (state) => {
      state.value = null
    }
}})

export const { update,unsetUser } = userSlice.actions

export default userSlice.reducer