import React, { useState } from 'react'
import login from './login.module.css'
import { Button, Space } from 'antd-mobile'
import {useNavigate} from 'react-router-dom'
import { insertUser,deleteUser } from '../../store/reducers/user'
import { useSelector,useDispatch } from 'react-redux'
import api from '../../api/index'

export default function Login() {
  const [user,setUser]=useState('')
  const [pwd,setPwd]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  function goindex(){
    if(user==''||pwd==''){
      alert('账号或者密码不能为空')
    }else{
      let obj={
        user:user,
        tooken:'qweeerr',
        isLogin:true
      }
      dispatch(insertUser(obj))
      localStorage.setItem('user',JSON.stringify(obj))
      //跳转页面
      navigate(-1)   //跳转到登陆之前浏览的页面
    } 


    /* if(user=='admin'&&pwd=='123'){
      //如果账号密码正确，就将其存储再本地
      localStorage.setItem('user',"{user:'admin',pwd:'123'}")
      navigate('/')
    }else{
      alert('账号或者密码错误，请重新输入！')
    } */



   /*  调用数据库 
    api.login({username:user,password:pwd}).then(res=>{
      console.log(res.data);
    }) */
    
    
  }
  function zhanghao(e){
    // console.log(e.target.value);
    setUser(e.target.value)
  }
  function password(e){
    setPwd(e.target.value)
  }




  return (
    <div>
      <div className={login.box}>
        <h3>宜居</h3>
        <div className={login.ipt}>
          <input type="text" placeholder='请输入账号' name='username' onChange={zhanghao}/>
          <input type="password" placeholder='请输入密码' name='password' onChange={password}/>
          <Button block color='primary' size='middle' onClick={goindex}>
            登录
          </Button>
        </div>

      </div>
    </div>
  )
}
