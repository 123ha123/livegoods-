import React,{useEffect, useState} from 'react'
import home from "./home.module.css";
import { NavLink } from 'react-router-dom';
import Search from '../../components/input/Input';
import api from '../../api/index'
import AntSwiper from '../../components/antSwiper/AntSwiper';
import Swiper from '../../components/swiper/Swiper';
import HotHouse from './hotHouse/HotHouse';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export default function Home() {
    //轮播容器
  const [arr,setArr]=useState([])
  //热门房源
  const [list,setList]=useState([])
  const navigate=useNavigate()
  const cityname=useSelector(state=>state.city.cityname)

  //点击input框进入搜索页面
  function goSearch(){
    navigate('/search')

  }


  //请求轮播
  function getHomeBanner(){
    api.getBanner().then(res=>{
      // console.log(res.data);
      setArr(res.data.banner)
    })
  }

  //请求热门房源
  async function getHomeHouse(){
    let res=await api.getHotHouse({city:cityname});  //放入参数（对象）
    // console.log(res.data);
    setList(res.data.list)
  }

  useEffect(()=>{
    // console.log('banner');
    //轮播接口
    getHomeBanner()
    //热门房源
    getHomeHouse()
   

  },[])
  



  return (
    // <div style={{height:window.innerHeight,overflow:'hidden'}}>
    <div >
        {/* 顶部---- */}
        <div className={home.header}>
            <div className={home.location}>
                <NavLink to='/city'>{cityname}<span className='iconfont icon-xiajiantou1' ></span></NavLink>
            </div>
            <div className={home.search}>
              {/* <Search/> */}
              <div className={home.ipt} onClick={goSearch}></div>
            </div>
            <div className={home.shopcar }>
                <div className='iconfont icon-gouwuche' style={{fontSize:'0.4rem'}}></div>
            </div>
        </div>

        {/* banner区域 */}
        <div className={home.banner}>
          <AntSwiper arr={arr}/>
          {/* <Swiper arr={arr}/> */}
        </div>


        {/* 中间部分 */}
        <div className={home.commend}>
          <div > 
            <NavLink to='/find'>找舍友</NavLink>
          </div>
          <div> 
            <NavLink to='/shequ'>宜居社区</NavLink>
          </div>
        </div>


        {/* 热门房源区域 */}
        <div className={home.hotHouse}>
          <h2 style={{marginLeft:'10px'}}>热门房源</h2>
          <HotHouse list={list}/>
        </div>
    </div>
  )
}
