import { createSlice } from '@reduxjs/toolkit'



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:'admin',
        tooken:'',
        isLogin:false

    },
    reducers: {
      insertUser: (state,action) => {  //箭头函数，只有一个语句，可以不写return
        state=action.payload;
        return state;
      },
      deleteUser: state => {  //有三个语句，要写return
        state.user='';
        state.tooken='';
        state.isLogin=false
        return state;
      },
      
    }
  })
  // 每个 case reducer 函数会生成对应的 Action creators
  export const { insertUser,deleteUser } = userSlice.actions
  
  export default userSlice.reducer
  