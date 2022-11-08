import React, { useEffect, useState } from 'react'
import { json, useNavigate, useParams } from 'react-router'
import api from '../../api/index'
import AntSwiper from '../../components/antSwiper/AntSwiper'
import Top from '../../components/top/Top'
import detail from './detail.module.css'
import { JumboTabs,Grid,Rate, Space, Toast } from 'antd-mobile'
import LoadMore from '../../components/loadMore/Loadmore'

export default function HouseDetail() {
    const params=useParams()
    console.log(params);  //{id:xxx}
    const navigate=useNavigate()
    const [banner,setBanner]=useState([]);
    const [info,setInfo]=useState({})    //获取房屋信息
    const [list,setList]=useState([])    //获取评价信息
    const [page,setPage]=useState(0)    //分页设置
    const [isLogin,setLogin]=useState(false)  //设置是否登录，true表示已经登陆
    const [isCollect,setCollect]=useState(false)
    let flag = true;  //开关

    // localStorage.setItem('collects','["1","2","3"]')
    //生命周期函数
    useEffect(()=>{
        getData()
        getCommit(0)

        //已进入页面，就先获取本地存储，判断当前是否已经登陆
        let user= localStorage.getItem('user')
        console.log(JSON.parse(user));
        setLogin(JSON.parse(user).isLogin)
        // console.log(isLogin);

        //一进入页面，就先获取本地存储，判断当前页面是否被收藏
        let data=localStorage.getItem('collects')
        if(data){  //本地存储有数据存在
            let index=JSON.parse(data).indexOf(params.id)
            if(index!=-1){  //当前页面id再本地存储中，表示已被收藏
                setCollect(true)
            }
        }
        
        //绑定监听事件
        /* window.addEventListener('scroll',fun)
        return ()=>{
            window.removeEventListener('scroll',fun)
        } 
    },[page])*/
    },[])

   /*  function fun(){
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
            
            getCommit(page)
        }

    }
 */

    //网络请求
    async function getData(){
        let res=await api.getHouseDetail({id:params.id})
        // console.log(res.data);
        setBanner(res.data.banner)
        setInfo(res.data.info)
    }

    function getCommit(page){
        api.getHouseCommit({id:params.id,page}).then(res=>{
            // console.log(res.data);
            setList([...list,...res.data.list])
        })   
        setPage(page+1)   
    }

    //电话号码改格式
    function phone(tel){
        let arr=tel.split('')  //将tel字符串转换为数组
        arr.splice(3,4,'****')   //删除数组下标3开始的四个元素，再添加*
        return tel=arr.join('')   //将数组转化为字符串
    }

    //getCollect  点击收藏按钮
    //首先判断是否登录，若登录，在判断是否已经收藏，若已经收藏，则将对应的id在本地删除，按钮内容转变为’收藏‘，
    // 若没有收藏，则在本地存储中添加本页面的id，再将内容转换为’已收藏‘，否则转到登录页面先进行登录
    
    
    function getCollect(){ 
        // 点击收藏按钮后进入本地存储查看是否已经登录
        /* let user= localStorage.getItem('user')
        console.log(JSON.parse(user));
        setLogin(JSON.parse(user).isLogin)
        console.log(isLogin);   react中isLogin无法在当前事件中读取到，只有在下一个事件中读取，所以可以直接再生命周期中读取，在这个时间中直接应用 */
        
        // console.log(user);
        /* if(user){
            // console.log('成功');
            setLogin(true)
            console.log(isLogin);   //false ???
        } */ 
        
        if(isLogin){//表示已经登陆
            // console.log('已经登陆');
            var arr=[]
            let data=localStorage.getItem('collects')
            if(data){
                arr=JSON.parse(data)       
            }
            if(isCollect){
                let index=arr.indexOf(params.id) //获取当前页面id再arr数组中的下标
                arr.splice(index,1)   //删除下标为index的值，最后将改变后的arr重新放入本地存储
                // console.log(arr);
                setCollect(false)  //将已收藏变为收藏，表示未收藏                
            }else{  //未收藏
                arr.push(params.id);  //添加到arr数组，最后存储到本地
                // console.log(arr);
                setCollect(true)  //表示收藏
            }
            //不管是选择收藏还是不收藏，都要将结果存入本地
            localStorage.setItem('collects',JSON.stringify(arr))
        }else{
            alert('请先登录')
            navigate('/login')
        }
    }


  return (
    <div>
        <Top>详情信息</Top>
        {/* <p>房源详情信息id标识: {params.id}</p> */}
        {/* 轮播图 */}
        <AntSwiper arr={banner}/>

        {/* 房源介绍 */}
        <div className={detail.info}>
            <JumboTabs>
                <JumboTabs.Tab title='房源信息'  key='1'>
                    <div className={detail.box}>
                        <Grid columns={3}>
                            <Grid.Item>
                                <p className={detail.color}>{info.price}/月</p>
                                <p>租金</p>
                            </Grid.Item>
                            <Grid.Item>
                                <p className={detail.color}>{info.huxing}</p>
                                <p>户型</p>
                            </Grid.Item>
                            <Grid.Item>
                                <p className={detail.color}>{info.area}㎡</p>
                                <p>面积</p>
                            </Grid.Item>
            
                        </Grid>
     
                    </div>
                    <div className={detail.info}>
                        <p>名称：{info.title}</p>
                        <p>装修：{info.zhuangxiu}</p>
                        <p>楼层：{info.floor}</p>
                        <p>朝向：{info.chaoxiang}</p>
                    </div>
                </JumboTabs.Tab>
                <JumboTabs.Tab title='评价信息' key='2'>
                    {
                        list.map((ele,index)=>{
                            return(
                                <div className={detail.commit} key={index}>
                                    {/* <p>电话：{ele.tel}</p> */}
                                    <p>电话：{phone(ele.tel)}</p>
                                    <div>评分：{ele.star} <Rate readOnly value={ele.star} /></div>
                                    <p>评论内容：{ele.content}</p>
                                </div>
                            )
                        })
                    }

                    {/* 下拉加载更多数据 */}
                    <LoadMore page={page} getData={getCommit}/>


                </JumboTabs.Tab>

                
            </JumboTabs>
        </div>

        {/* 底部的收藏和购买按钮 */}
        {/* <div style></div> */}
        <div className={detail.footer}>
            <div className={detail.ele} onClick={getCollect}>
                {
                    isCollect?"已收藏":"收藏"
                }
            </div>
            <div className={detail.ele}>购买</div>
        </div>

    </div>
  )
}
