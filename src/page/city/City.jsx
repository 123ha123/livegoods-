import React, { useEffect, useState } from 'react'
import api from '../../api'
import Top from '../../components/top/Top'
import city from './city.module.css'
import { IndexBar, List } from 'antd-mobile'
import {useSelector,useDispatch} from 'react-redux'
import { change } from '../../store/reducers/citys'
import { useNavigate } from 'react-router'





const getRandomList = (min, max) => {
  return new Array(Math.floor(Math.random() * (max - min) + min)).fill('')
}


const charCodeOfA = 'A'.charCodeAt(0)
/* const groups = Array(26)
  .fill('')
  .map((_, i) => ({
    
    title: String.fromCharCode(charCodeOfA + i),
    items: [1,2,3].map(()=>123),
    
  })) */
  // console.log(groups);   [{title:'',items:''},{},{},{},...]

export default function City() {
  const [current,setCurrent]=useState('')  //当前城市
  const [hotCity,setHotCity]=useState([])  //热门城市
  const [citylist,setList]=useState([])  //城市列表
  const navigate=useNavigate()

  // 使用 useSelector 钩子从 store 中读取数据
  // 使用 useDispatch 钩子获取 dispatch 函数，并根据需要 dispatch actions
  const dispatch=useDispatch()
  const cityname=useSelector(state=>{
      // console.log(state.city.cityname);
      return state.city.cityname;
  })

  //获取城市接口
  function getCurrent(){
    api.getCity().then(res=>{
      console.log(res.data.city.indexCitys);
      // setCurrent(res.data.city.indexCitys.pos[0].name)
      setCurrent(cityname)
      setHotCity(res.data.city.indexCitys.hot)

      const citys=res.data.city.indexCitys
      //自己创建groups，设置为跟上面groups的格式， [{title:'',items:''},{},{},{},...]
      let groups=[];
      for(let key in citys){
        if(key=='pos'||key=="hot"){
          continue;
        }
        let obj={}
        obj.title=key;
        obj.items=citys[key]
        groups.push(obj)
      }

      console.log(groups);
      setList(groups)
      
    })
  }

  

  //生命周期函数
  useEffect(()=>{
    getCurrent()
  },[])

  function changeCity(val){
    // console.log(val);  //获取点击的城市名称
    //存储点击的城市名称
    dispatch(change(val));
    //将点击的城市存储到本地----持久化
    localStorage.setItem('cityname',val);
    //点击一个城市名称，跳转到首页，首页上方的城市名改变，热门房源的城市地改变
    navigate('/')
  }






  return (
    <div >
        <div className={city.top}>
          {/* 另外一种方法是 Top组件中预留空间{props.children}，谁（双标签，双标签内的内容可以在预留的空间中显示）调用
            谁的内容就可以显示在预留空间内
          */}
          {/* <Top>城市选择</Top> */}

          <Top title='城市选择'/>
        </div>

        {/* 当前城市 */}
        <div className={city.content}>
          <div className={city.title}>当前城市</div>
          <div className={ city.cityname}>{current}</div>

          {/* 热门城市 */}
          <div className={city.title}>热门城市</div>

           <div className={city.hotcity}>
              {
                  hotCity.map(ele=>{
                    return (
                      <div className={city.cityname} onClick={changeCity.bind(null,ele.name)} key={ele.id} >{ele.name}</div>

                    )
                  })
                }
           </div>
        </div>

        {/* 城市列表 */}
        <div className={city.cityList} style={{ height: window.innerHeight-220 }}>
            <IndexBar>
              {citylist.map(group => {
                const { title, items } = group
                // console.log(title)    A-Z
                // console.log(items);   //就是标题下面对应的内容
                return (
                  <IndexBar.Panel
                    index={title}
                    title={`标题${title}`}
                    key={`标题${title}`}
                >
                  <List>
                    {items.map((item, index) => (
                      // 点击标题下面的城市，跳转到首页，最上面的城市名改变，热门城市的城市名改变
                      <List.Item key={index} onClick={changeCity.bind(null,item.name)}>{item.name }</List.Item>
                    ))}
                  </List>
                </IndexBar.Panel>
              )
            })}
            </IndexBar>
        </div>

        
    </div>
  )
}
