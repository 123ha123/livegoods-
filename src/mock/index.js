const express=require('express')
const app =express();
const router=require('./router')
//共享资源
/* const cors=require('cors');
app.use(cors()) */




/* const Mock=require('mockjs');
app.get('/',(req,res)=>{
    let data=Mock.mock({
        msg:'ok',
        status:200,
        'list|10':[
            {
                'id|+1':1,
                info:'hello mockjs',
                "string|1-10": "★",
                "number|1-100": 100,
                "object|1": {
                    "310000": "上海市",
                    "320000": "江苏省",
                    "330000": "浙江省",
                    "340000": "安徽省"
                  },
                "array|1": [
                    "AMD",
                    "CMD",
                    "UMD"
                ]
            }
        ]
    })
    res.send(data)
}) */

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/',router)


app.listen(4000,()=>{
    console.log('端口号：4000');
})
