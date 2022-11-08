import axios from 'axios'
import base from './base'
import qs from 'querystring'

const api={
    //获取banner---轮播图
    getBanner(){
        // return axios.get(base.host+base.banner)
        return axios.get(base.banner)
    },

    //获取hetHouse----热门房源
    getHotHouse(val){
        // return axios.get(base.host+base.hotHouse,val)
        return axios.get(base.hotHouse,{params:val})
    },

    //获取城市
    getCity(){
        return axios.get(base.city)
    },

    //获取房源
    getHouse(params){
        return axios.get(base.search,{params})
    },

    //获取详情信息
    getHouseDetail(params){
        return axios.get(base.houseInfo,{params})
    },

    getHouseCommit(params){
        return axios.get(base.commit,{params})
    },

    //商城  热销单品
    getNewsComment(params){
        return axios.get(base.newsComment,{params})
    },

    getFaComment(params){
        return axios.get(base.faComment,{params})
    },

    //商品评价
    getProComment(params){
        return axios.get(base.proComment,{params})

    },

    //登录
    login(data){
        return axios.post(base.login,qs.stringify(data))
    },

    //shopBanner
    getShopBanner(){
        return axios.get(base.shopBanner)
    },
    

}

export default api;