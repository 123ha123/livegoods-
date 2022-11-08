import React, { useEffect } from 'react'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
  } from 'antd-mobile-icons'
  import { useState } from 'react'
  import { Badge, TabBar } from 'antd-mobile'
import { useNavigate,useLocation } from 'react-router-dom';

export default function Footer() {
    const [active,setActive]=useState('/')
    const navigate=useNavigate()
    const location=useLocation()
    // console.log(location);

    useEffect(()=>setActive(location.pathname),[])  

    function changeTab(key){
        console.log(key);
        // 点击图标高亮
        setActive(key);
        //切换页面
        navigate(key)

    }
  return (
    <div style={{position:'fixed',bottom:'0',left:'0',right:'0',borderTop:'1px solid #eee',backgroundColor:'#fff'}} >
        <TabBar activeKey={active} onChange={changeTab}>
            {/* key	对应 activeKey */}
            <TabBar.Item key={'/'} icon={<AppOutline />} title={'首页'} />
            <TabBar.Item key={'/shop'} icon={<UnorderedListOutline />} title={'商城'} />
            <TabBar.Item key={'/life'} icon={<MessageOutline />} title={'生活服务'} />
            <TabBar.Item key={'/about'} icon={<UserOutline />} title={'我的'} />
        </TabBar>
         
    </div>
  )
}
