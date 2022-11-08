import React from 'react'
import { Autoplay, Pagination ,EffectCube} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cube'

export default function MySwiper(props) {
  return (
    <div>
        <Swiper
            modules={[Pagination,Autoplay,EffectCube]}

            /*  轮播的样式 
            effect = 'cube'
            cubeEffect={{
              slideShadows: true,
              shadow: false,
              shadowOffset: 100,
              shadowScale: 0.6
            }} */

            pagination
            loop
            autoplay={{
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            }}
            // spaceBetween={50}
            slidesPerView={1}
           
        >
            {
                props.arr.map(ele=>{
                    return(
                        <SwiperSlide key={ele.id}>
                            <img src={ele.img} width='100%' alt="" />
                        </SwiperSlide>
                    )
                })
            }
        
        </Swiper>
    </div>
  )
}
