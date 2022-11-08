import React, { useEffect,useState,useRef } from 'react'
import Top from '../../components/top/Top'
import {useSelector,useDispatch} from 'react-redux'
import api from '../../api/index'
import comment from './comment.module.css'
import { Rate, Space, Toast } from 'antd-mobile'
import Loadmore from '../../components/loadMore/Loadmore'

export default function Comment() {
    //获取用户名
    const username=useSelector((store)=>store.user.user)
    //获取城市名
    const cityname=useSelector((store)=>store.city.cityname)
    //定理列表
    const [list,setList]=useState([])
    const [page,setPage]=useState(0)
    //开关
    let flag=true

    const [current,setCurrent]=useState(-1)
    const [value,setValue]=useState('')
    const [star,setStar]=useState(0)

    // const myRef=React.createRef()
    // const myRef=useRef()



    useEffect(()=>{
        
        gteComment()
        
    },[])

    function gteComment(){
        api.getProComment({city:cityname,user:username}).then(res=>{
            // console.log(res.data);
            // setList(res.data.list)
            setList([...list,...res.data.list])
            flag=true;
            setPage(page+1)
        })
    }

    

    function getstar(val){
        // console.log(val);   //点击的几颗星，val就是几
        setStar(val)
    }

    //提交按钮
    function submit(id,index){
        console.log(id,value,index,star);
        if(value==''||star==0){
            alert('评论后再提交信息！')
            return ;
        }


        //提交信息后隐藏评论框
        list[index].iscommit=true;   //list中第index个评论框的iscommit属性值改变
        setList([...list])  //将改变后的list重新存入，试图同步
        //清除
        setCurrent(-1);
        setValue('')

    }

    //取消按钮
    function cancel(){
        // console.log(myRef.current);
        //清除
        setCurrent(-1);
        setValue('')
    }

  return (
    <div>
        <Top>房源评价</Top>
        <p>用户名：{username}</p>
        <p>房源城市：{cityname}</p>
        <ul className={comment.list}>
            {
                list.map((ele,index)=>{
                    return (
                        <li key={index} >
                            <div className={comment.item}>
                                <img src={ele.img}  alt="" className={comment.img}/>
                                <div className={comment.info}>
                                    <p>标题：{ele.title}</p>
                                    <p>户型：{ele.huxing}</p>
                                    <p>价格：{ele.price}/月</p>
                                </div>
                                {/* 评论 */}
                                <div className={comment.ping}>
                                    {
                                        ele.iscommit?<div className={comment.gray} >已评论</div>:<div onClick={()=>setCurrent(ele.id)}>评论</div>
                                    }
                                </div>
                            </div>
                                {/* 评论信息  点击id==id标识？xx：00 */}
                                {
                                    current==ele.id?<div className={comment.commentBox}>
                                        <textarea placeholder='请输入内容'  cols="30" rows="5" onChange={(e)=>setValue(e.target.value)} value={value}></textarea>
                                        <div>评分：<Rate onChange={getstar} /></div>
                                        <button onClick={submit.bind(null,ele.id,index)}>提交</button>
                                        <button onClick={cancel}>取消</button>
                                        {/* <button onClick={cancel} >取消</button> */}
                                    </div>:''
                                }
                                
                            
                        </li>
                    )
                })
            }
        </ul>
        
        {/* 加载更多 */}
        <Loadmore getData={gteComment} page={page}/>
    </div>
  )
}
