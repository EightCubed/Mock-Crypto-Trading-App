import { createSlice } from '@reduxjs/toolkit'

export const CounterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
      console.log(state.value)
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = CounterSlice.actions

export const incrementAsync = (amount:number) => (dispatch:any) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export const selectCount = (state:any) => state.counter.value

export default CounterSlice.reducer
