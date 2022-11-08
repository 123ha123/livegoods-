import React, { useEffect, useState } from 'react'
import Input from '../../components/input/Input'
import Top from '../../components/top/Top'
import search from './search.module.css'
import api from '../../api/index'
import {useSelector} from 'react-redux'
import HotHouse from '../home/hotHouse/HotHouse'
import Loadmore from '../../components/loadMore/Loadmore'

export default function Search() {

    const cityname=useSelector(state=>state.city.cityname)
    let [list,setList]=useState([])
    const [msg,setMsg]=useState('')
    let [page,setPage]=useState(0)
    const [val,setVal]=useState('')
    let num=0,flag=true;


    //生命周期函数
    // useEffect(()=>{
    //     //一进入页面就只会绑定scroll事件，当page改变时，会再次绑定，也会执行return清除，所以最后还是只有第一次的scroll事件
    //     //所以自始至终只绑定了一次scroll事件
    //     window.addEventListener('scroll',fun);

    //     // 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数,React 会在组件卸载的时候执行清除操作
    //     return ()=>{
    //         window.removeEventListener('scroll',fun)  
    //     }
    // },[page])  //当page改变时，会再次绑定scroll事件，执行fun，所以会重复执行fun函数

    //整体只绑定一次，这样就不用去清除
    /* window.onscroll=function(){
        fun()
    } */

    function getInputVal(val){
        // console.log(val);
        //从子组件中获取到输入框的内容后进行网络请求
        //若搜索框内容为空
        if(val.trim()==''){
            setList([])
            setMsg('请输入信息！')
            return;
            
        }
        //当搜索框中val值改变时，原先的page值和list应该改变，而不是list在原先的基础上再添加，
        //所以page值和list要先清空，或者是一开始的状态
        page=0;   //val值改变之前page有值，若直接setPage(0),那么page仍为之前的值，setPage(page+1)不会变为1，所以要page=0
        setPage(0);//因为page=0，setPage(0)会发生修改，所以为let
        list=[];
        setList([])

        http(val)
        setVal(val)
    }

    //网络请求函数
    async function http(val,page=0){
        let res=await api.getHouse({
            city:cityname,
            val,
            page,

        })
        
        // console.log(res.data);
        // setList(res.data.list)
        setMsg('')
        if(page==0){
            setList(res.data.list)
        }else{

            setList([...list,...res.data.list])
            flag=true;
        }

        //page增加放在此处，就不会多次增加滚动事件
        setPage(page+1)
        // console.log('-------------page----------');

        // console.log(list);


    }

    //下拉加载更多函数
    function fun(){   //调用了Loadmore组件，则不需用执行此函数了
        // console.log('------------------------fun-------------');  //一直绑定的事件，所以会一直执行
        //滚动的高度
        let height=document.documentElement.scrollTop;  
        //视口的高度
        let winHeight=document.documentElement.clientHeight;
        //文档的高度
        let domHeight=document.body.clientHeight;
        //判断
        if(height+winHeight>=domHeight-100 && flag){
            // console.log('加载更多数据');
            //关闭开关
            flag=false;
            // num++;
            // setPage(num);  //此处page改变，就会执行绑定事件，绑定后就又会执行fun，所以可以直接将page改变放在http中
            http(val,page);


        }

    }

    


  return (
    <div>
        <Top>
            <div className={search.ipt}>
                <Input getInputVal={getInputVal} />
            </div>
        </Top>

        {/* 调用热门房源组件，传递参数list */}
        <HotHouse list={list}/>
        {/* {       
            list?<div style={{marginLeft:'0.2rem',marginTop:'0.1rem'}}>{msg}</div>:<HotHouse list={list}/>
        } */}
        {msg}

        {/* 调用传递更多组件  */}
        <Loadmore page={page} getData={http} val={val}/>
    </div>
  )
}
