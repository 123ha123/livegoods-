import React, { useEffect, useState } from 'react'
import search from "./search.module.css";

//是一个公共组件，所以不能在这个组件进行网络请求，可以将输入框的内容传递到父组件，
//然后再进行网络请求
export default function Input(props) {
  const inputRef=React.createRef()
  const [value,setValue]=useState([''])
  

  //生命周期函数
  useEffect(()=>{
    //点击输入框进入页面时，自动聚焦输入框
    inputRef.current.focus()
  },[])


  //键盘事件
  function getKeyCode(e){
    // 输入回车键
    /* if(e.keyCode==13){
      //把输入框的内容给父组件
      props.getInputVal(value)
    } */

    //实时获取数据
    props.getInputVal(value)

  }

  //获取输入的值
  function changeInput(e){
    setValue(e.target.value)
  }

  return (
    <>
        <input type="text" className={search.ipt} ref={inputRef} value={value} onKeyUp={getKeyCode} onChange={changeInput}/>
    </>
  )
}
