import React from 'react'
import top from './top.module.css'
import {useNavigate} from 'react-router-dom'
export default function Top(props) {
    const navigate=useNavigate()
    function goBack(){
        navigate(-1)
    }
  return (
      /* 另外一种方法是 Top组件中预留空间{props.children}，谁（双标签，双标签内的内容可以在预留的空间中显示）调用
        谁的内容就可以显示在预留空间内
        */
    <div className={top.box}>
        <span className='iconfont icon-zuojiantou' onClick={goBack}></span>
        <div className={top.title}>
            {props.children}
            {/* {
                props.title
            } */}
        </div>

    </div>
  )
}
