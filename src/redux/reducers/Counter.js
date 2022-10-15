import { createSlice } from "@reduxjs/toolkit";
import { ActionType } from '../action/ActionType'

export const couterSlice = createSlice({
    name: 'Counter',
    initialState: {
        data: JSON.parse(localStorage.getItem('crud')) || [],
        count: 0
    },
    reducers: {
        Plus: (state) => {
            state.count += 1
        },
        Minus: (state) => {
            state.count -= 1
        },
        addCrud: (state, { payload, type }) => {
            localStorage.setItem('crud', JSON.stringify([...state.data, payload]))
            state.data = JSON.parse(localStorage.getItem('crud'))
        },
        editCrud: (state, { payload }) => {
            localStorage.setItem('crud', JSON.stringify(state.data.map((val) => val.id === payload.id ? payload : val)))
            state.data = JSON.parse(localStorage.getItem('crud'))
        },
        delCrud: (state, { payload }) => {
            localStorage.setItem('crud', JSON.stringify(state.data.filter((val) => val.id !== payload)))
            state.data = JSON.parse(localStorage.getItem('crud'))
        }
    }
})
export const { Plus, Minus, addCrud, editCrud,delCrud } = couterSlice.actions
export default couterSlice.reducer