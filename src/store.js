import { configureStore } from '@reduxjs/toolkit'
import Counter from './redux/reducers/Counter'
import Student from './redux/reducers/Student'

export const store = configureStore({
    reducer: {
        counter: Counter,
        student: Student,
        crud: 'CRUD'
    }
})