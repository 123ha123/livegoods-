import React, { useEffect, useState } from 'react'
import home from '../home/home.module.css'
import { useNavigate } from 'react-router';
import AntSwiper from '../../components/antSwiper/AntSwiper';
import api from '../../api/index';
import { NavLink } from 'react-router-dom';
import shop from './shop.module.css'
import { Grid } from 'antd-mobile'
import { Button, Space, Swiper, Toast } from 'antd-mobile'


export default function Shop() {
  const [arr,setArr]=useState([])
  const [newproduce,setProduce]=useState([])
  const [familyPro,setFamilyPro]=useState([])

  useEffect(()=>{
    //轮播图
    /* api.getBanner().then(res=>{
      // console.log(res.data);
      setArr(res.data.banner)
    }) */
    api.getShopBanner().then(res=>{
      console.log(res.data);
      setArr(res.data.model);
    })

    //热销单品
    api.getNewsComment().then(res=>{
      // console.log(res.data);
      setProduce(res.data.list)
    })

    //家庭常用
    api.getFaComment().then(res=>{
      setFamilyPro(res.data.list)
    })


  },[])

  return (
    <div>
      <div className={home.header}>
            <div className={home.location}>
            </div>
            <div className={home.search}>
              {/* <Search/> */}
              <div className={home.ipt} ></div>
            </div>
            <div className={home.shopcar }>
                <div className='iconfont icon-gouwuche' style={{fontSize:'0.4rem'}}></div>
            </div>
        </div>

      {/* banner */}
      {/* <AntSwiper arr={arr}/> */}
      <Swiper autoplay loop  indicator={(total, current) => ( //自动指示器
              <div style={{position:'absolute',bottom:'10px' ,right:'10px',color:'#fff'}}>
                {`${current + 1} / ${total}`}
              </div>
            )}>
            {
                arr.map((ele,index)=>{
                    return (
                    <Swiper.Item key={index}>
                        <img src={ele.PicUrl} width='100%' alt="" />
                    </Swiper.Item>
                    
                    )
                })
            }
        </Swiper>

      {/* 中间部分 */}
      <div className={home.commend}>
          <div > 
            <NavLink to='/newproduce'>新品上市</NavLink>
            
          </div>
          <div> 
            <NavLink to='/oldShop'>二手商城</NavLink>
          </div>
      </div>

      {/* 热销单品 */}
      <div className={shop.produce}>
        <h2 style={{textAlign:'center',fontSize:'0.28rem'}}>热销单品</h2>
        <div className={shop.produceBox}>
        <Grid columns={4} >
          {
            newproduce.map(ele=>{
              return (
                <Grid.Item>
                  <div className={shop.img}><img src={ele.imgUrl} width='100%' alt="" /> </div>
                  <p style={{textAlign:'center'}}>{ele.title}</p>
                </Grid.Item>
              )
            })
          }      
        </Grid>
        </div>
      </div>

      {/* 家庭常用 */}
      <div className={shop.produce}>
        <h2 style={{textAlign:'center',fontSize:'0.28rem'}}>家庭常用</h2>
        <div className={shop.produceBox}>
        <Grid columns={4} >
          {
            familyPro.map(ele=>{
              return (
                <Grid.Item>
                  <div className={shop.img}><img src={ele.imgUrl} width='100%' alt="" /> </div>
                  <p style={{textAlign:'center'}}>{ele.title}</p>
                </Grid.Item>
              )
            })
          }      
        </Grid>
        </div>
      </div>






    </div>
  )
}
