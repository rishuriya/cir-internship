import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: object
}

const initialState: CounterState = {
  value: {
    name: 'mohan',
    email: 'mail@mail.com',
    isAdmin: false,
  },
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
    state.value = {
        name: 'admin bhai',
        email: 'admin@amru.edu',
        isAdmin: true
    }
    },
    decrement: (state) => {
    state.value = {
        name: 'test student',
        email: 'student@amru.edu',
        isAdmin: false
    }
    },
  },
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer