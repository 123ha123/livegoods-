import { createSlice } from '@reduxjs/toolkit'

//获取本地城市名称
console.log(localStorage.getItem('cityname'));
//若本地有存储城市名则刷新之后仍为本地存储的城市，否则为默认的北京
let cityname=localStorage.getItem('cityname') || '北京'


const citySlice = createSlice({
    name: 'citys',
    initialState: {
    //   cityname:'北京'
        cityname
    },
    reducers: {
      change: (state,action) => {
        state.cityname=action.payload
      },
      delcity: state => {
        state.cityname=''
      },
      
    }
  })
  // 每个 case reducer 函数会生成对应的 Action creators
  export const { change,delcity } = citySlice.actions
  
  export default citySlice.reducer
  