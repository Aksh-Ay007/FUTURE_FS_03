import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import captainReducer from './captainSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        captain:captainReducer
    }
})

export default appStore