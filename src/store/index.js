import { configureStore } from '@reduxjs/toolkit'
import citySlice from './reducers/citys'
import userSlice from './reducers/user'

const store= configureStore({
  reducer: {
    city:citySlice,
    user:userSlice

  }
})

export default store