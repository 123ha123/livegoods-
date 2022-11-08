import React from 'react'
import { Button, Space, Swiper, Toast } from 'antd-mobile'

export default function AntSwiper(props) {
    // console.log(props);
  return (
    <div >
        <Swiper autoplay loop  indicator={(total, current) => ( //自动指示器
              <div style={{position:'absolute',bottom:'10px' ,right:'10px',color:'#fff'}}>
                {`${current + 1} / ${total}`}
              </div>
            )}>
            {
                props.arr.map(ele=>{
                    return (
                    <Swiper.Item key={ele.id}>
                        <img src={ele.img} width='100%' alt="" />
                        
                    </Swiper.Item>
                    )
                })
            }
        </Swiper>
    </div>
  )
}
