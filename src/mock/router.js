const express=require('express')
const router=express.Router()
const Mock=require('mockjs');
const city=require('./data/city/data.json')
//导入数据
const sqlFun=require('./mysql')


//banner---轮播图接口
router.get('/banner',(req,res)=>{
    let data=Mock.mock({
        msg:'ok',
        status:200,
        "banner|3":[
            {
                'id|+1':100,
                "href|1":['www.baidu.com','www.jd.com','www.taobao.com'],
                'img|+1':[
                    'http://iwenwiki.com/api/livable/banner/banner1.png',
                    'http://iwenwiki.com/api/livable/banner/banner2.png',
                    'http://iwenwiki.com/api/livable/banner/banner3.png',
                ],
            }
        ]
    })

    res.send(data)
})

//热门房源接口
router.get('/hotHouse',(req,res)=>{
    let city=req.query.city||'北京'
    let data=Mock.mock({
        info:'success',
        status:200,
        'list|6':[
            {
                'id|+1':1,
                'type|1':['一室一厅','两室一厅','三室一厅'],
                'address':city+'@cword(3, 5)',
                "area|40-100":40,
                "price|3000-8000":3000,
                "render|1":['整租','合租'],
                'img|+1':[
                    'http://iwenwiki.com/api/livable/details/1.jpg',
                    'http://iwenwiki.com/api/livable/details/2.jpg',
                    'http://iwenwiki.com/api/livable/details/3.jpg',
                    'http://iwenwiki.com/api/livable/details/4.jpg',
                    'http://iwenwiki.com/api/livable/details/5.jpg',
                    'http://iwenwiki.com/api/livable/details/6.jpg'
                ]
            }
        ]
    })

    res.send(data)
})

//城市接口
router.get('/city',(req,res)=>{
    let data={
        info:'城市信息',
        msg:'ok',
        city,
    }
    res.send(data)
})

//详情页接口
router.get('/houseInfo', (req, res) => {
    let id = req.query.id;
    res.send(Mock.mock({
        success: true,
        id,
        info: {
            title: '@cword(5,10)',
            'price|2900-10000': 1,
            'huxing|1': ['一室一厅', '两室一厅', '三室两厅'],
            'area|60-150.2': 1,
            'zong|6-32': 1,
            'cur|1-32': 1,
            floor: function () {
                if (this.zong >= this.cur) {
                    return this.cur + '/' + this.zong
                } else {
                    return this.zong + '/' + this.cur
                }
            },
            'chaoxiang|1': ['朝东', '朝西', '朝南', '朝北', '南北通透'],
            'zhuangxiu|1': ['精装', '简装', '毛坯'],
            'year|1985-2020': 1,
        },
        "banner|6": [{
            'img|1': [
                'http://iwenwiki.com/api/livable/details/1.jpg',
                'http://iwenwiki.com/api/livable/details/2.jpg',
                'http://iwenwiki.com/api/livable/details/3.jpg',
                'http://iwenwiki.com/api/livable/details/4.jpg',
                'http://iwenwiki.com/api/livable/details/5.jpg',
                'http://iwenwiki.com/api/livable/details/6.jpg',
                'http://iwenwiki.com/api/livable/details/7.jpg',
                'http://iwenwiki.com/api/livable/details/8.jpg',
                'http://iwenwiki.com/api/livable/details/9.jpg',
                'http://iwenwiki.com/api/livable/details/10.jpg',
                'http://iwenwiki.com/api/livable/details/11.jpg',
                'http://iwenwiki.com/api/livable/details/12.jpg',
                'http://iwenwiki.com/api/livable/details/13.jpg',
            ]
        }]
    }))
})


// 房屋的评价信息
router.get('/comment',(req,res)=>{
    let id = req.query.id;
    let page = req.query.page;
    res.send(Mock.mock({
        id,
        success:true,
        nextPage : +page + 1,
        'list|5':[
            {
                'id|+1':200,
                tel:/1\d{10}/,//手机号
                'star|1-5':1,//星星的个数 1-5 高亮
                content:'@cword(20,50)'//评论的文字描述
            }
        ]
    }))
});


//新品推荐  热销单品
router.get('/getNewsComment', (req, res) => {
    //接受参数：城市名字  默认北京
    let city = req.query.city || '北京';
    //返回数据
    res.send(Mock.mock({
        status: 200,
        "list|4": [{
            "id|+1": 100,
            "imgUrl|+1": [
                'http://iwenwiki.com/api/livable/homehot/img_aijiaodeng.png',
                'http://iwenwiki.com/api/livable/homehot/img_baozhen.png',
                'http://iwenwiki.com/api/livable/homehot/img_chuwugui.png',
                'http://iwenwiki.com/api/livable/homehot/img_jingzi.png'
            ],
            "title|+1": [
                city + '储物柜',
                city + '抱枕',
                city + '储物架',
                city + '镜子'
            ]
        }]
    }))

})

//家用推荐
router.get('/getFaComment', (req, res) => {
    //接受参数：城市名字  默认北京
    let city = req.query.city || '北京';
    //返回数据
    res.send(Mock.mock({
        status: 200,
        "list|4": [{
            "id|+1": 200,
            "imgUrl|+1": [
                'http://iwenwiki.com/api/livable/homehot/img_luodideng.png',
                'http://iwenwiki.com/api/livable/homehot/img_maojin.png',
                'http://iwenwiki.com/api/livable/homehot/img_zhaoming.png',
                'http://iwenwiki.com/api/livable/homehot/img_zhiwujia.png'
            ],
            "title|+1": [
                city + '落地灯',
                city + '毛巾',
                city + '照明',
                city + '置物架'
            ]
        }]
    }))

})


//购物车列表数据
router.get('/shopcar',(req,res)=>{
    let user = req.query.user;
    let city=req.query.city
    res.send(Mock.mock({
        success:true,
        user,
        'list|6':[
            {
                "id|+1":300,
                title:'@cword(10,20)',
                'price|2900-20000':1,
                'huxing|1':['一室一厅','两室一厅','三室两厅'],
                'area|60-150.2':1,
                'iscommit|4-6':true, //产生true的概率是40% true评论 
                'img|1':[
                    'http://iwenwiki.com/api/livable/shop/z1.jpg',
                    'http://iwenwiki.com/api/livable/shop/z2.jpg',
                    'http://iwenwiki.com/api/livable/shop/z3.jpg',
                    'http://iwenwiki.com/api/livable/shop/z4.jpg',
                    'http://iwenwiki.com/api/livable/shop/z5.jpg',
                    'http://iwenwiki.com/api/livable/shop/z6.jpg',
                ]
            }
        ]
    }))
})



//搜索房源接口
router.get('/search', (req, res) => {
    // 当前城市
    // 搜索关键字
    // 请求的页码
    let city = req.query.city;
    let keyword = req.query.val;
    let page = req.query.page || 0; //后台定义的page=0 
    res.send(Mock.mock({
        success: true,
        nextPage: +page + 1,
        'list|10': [{ //list数据容器  10条数据
            'img|1': [ //图片随机获取一个
                'http://iwenwiki.com/api/livable/search/1.jpg',
                'http://iwenwiki.com/api/livable/search/2.JPG',
                'http://iwenwiki.com/api/livable/search/3.jpg',
                'http://iwenwiki.com/api/livable/search/4.JPG',
                'http://iwenwiki.com/api/livable/search/5.jpg',
                'http://iwenwiki.com/api/livable/search/6.jpg',
            ],
            // temptitle:,//生成文字描述
            "id|+1": 200, //id自增
            // id:function(){
            //     return v4();
            // },//id自增
            address: city + keyword + '- @cword(5,8)', //房源信息
            'zong|6-32': 1, //总楼层高度  最小值--最大值 获取一个值 数字
            'cur|1-32': 1, //楼层  1-32层
            floor: function () { //楼层 层数/总高  
                if (this.zong >= this.cur) {
                    return this.cur + '/' + this.zong
                } else {
                    return this.zong + '/' + this.cur
                }
            },
            'type|1': ['一室一厅', '两室一厅', '三室两厅'], //户型
            'area|60-150.2': 1, //总面积
            'render|1': ['整租', '合租'], //出租类型
            'price|2900-20000': 1, //租金
        }]
    }))
})


//登录接口
router.post('/login',(req,res)=>{
    let user=req.body.username;
    let pwd=req.body.password
    let sql=`select * from users where username='${user}' and password='${pwd}'`

    sqlFun(sql,result=>{
        // console.log(result);
        if(result.length>0){
            res.send({
                msg:'success',
                status:200,
                user
            })
        }else{
            res.send({
                msg:'fail',
                status:402,
                info:'账号或者密码错误'
            })
        }
    })
})


module.exports= router