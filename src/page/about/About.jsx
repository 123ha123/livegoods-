import React from 'react'
import style from './style.module.scss'
import classnames from 'classnames'
import {useNavigate} from 'react-router'
export default function About() {
  const navigate=useNavigate()
  function tocomment(){
    navigate('/comment')
  }
  return (
    <div>
      {/* 顶部区域 */}
    <div className={style['me-header']}>
        <div className={style['user-img']}>
            <i className='iconfont icon-yonghutouxiang'></i>
        </div>
        <i className='iconfont icon-shezhi' ></i>
    </div>
    {/* 导航分类 */}
    <ul className={style.list}>
      <li>
        <i className='iconfont icon-youhuiquan'></i>
        <p>优惠券</p>
      </li>
      <li>
        <i className='iconfont icon-shoucang'></i>
        <p>收藏</p>
      </li>
      <li>
        <i className='iconfont icon-shijian'></i>
        <p>约看</p>
      </li>
      <li>
        <i className='iconfont icon-dingdan'></i>
        <p>订单</p>
      </li>
      <li>
        <i className='iconfont icon-weixin'></i>
        <p>私人助理</p>
      </li>
      <li>
        <i className='iconfont icon-weixin'></i>
        <p>微聊</p>
      </li>
      <li onClick={tocomment}>
        <i className='iconfont icon-pingjia'></i>
        <p>评价</p>
      </li>
      <li>
        <i className='iconfont icon-wodetousu'></i>
        <p>投诉建议</p>
      </li>
    </ul>

    {/* 宜居管家 */}
    <div className={style.box}>
      <h3>宜居管家</h3>
      <ul className={classnames(style.list,style.wrapper)}>
        <li>
          <i className='iconfont icon-hetong'></i>
          <p>我的合同</p>
        </li>
        <li>
          <i className='iconfont icon-zulin'></i>
          <p>转租</p>
        </li>
        <li>
          <i className='iconfont icon-youhuiquan'></i>
          <p>退租</p>
        </li>
        <li>
          <i className='iconfont icon-dingdangdaizhimaxinyongshouquan'></i>
          <p>芝麻信用</p>
        </li>
        <li>
          <i className='iconfont icon-yanchituifang'></i>
          <p>续租</p>
        </li>
        <li>
          <i className='iconfont icon-zhangdan'></i>
          <p>账单</p>
        </li>
      </ul>
    </div>
</div>
  )
}
