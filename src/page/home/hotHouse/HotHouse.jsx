import React from 'react'
import house from './house.module.css'
import { Grid } from 'antd-mobile'
import { useNavigate } from 'react-router'


export default function HotHouse(props) {
    const navigate=useNavigate()

    function toDetail(id){
        navigate('/detail/'+id)
    }

  return (
    <div>
        {
            props.list.map((ele,index)=>{
                return (
                    <div className={house.box} key={index} onClick={toDetail.bind(null,ele.id)}>
                        <img src={ele.img} alt="" />
                        <div className={house.desc}>
                            <Grid columns={3}>
                                <Grid.Item span={2}>
                                    <div className={house.left}>
                                        <div className={house.address}>{ele.address}</div>

                                        <div className={house.type}>
                                            {   //共用了人们房源组件，search页面有楼层，而热门房源没有，所以分两种情况
                                                ele.floor?< span>楼层：{ele.floor}</span>:''
                                            }
                                            {ele.type}<span>{ele.area}㎡</span></div>
                                    </div>
                                </Grid.Item>
                                <Grid.Item span={1}>
                                    <div className={house.right}>
                                        <div className={house.render}>{ele.render}</div>
                                        <div className={house.price}>{ele.price}/月</div>
                                    </div>
                                    
                                </Grid.Item>
                            </Grid>
                                
                        </div>

                    </div>
                )
            })
        }
    </div>
  )
}
