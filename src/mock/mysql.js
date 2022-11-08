
//连接数据库
const mysql = require('mysql')

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sql',
    port:'3306'
})

//sql 

//封装一个函数
function sqlFun(sql,callback){
    con.query(sql,(error,result)=>{
        if(error){
            console.log('数据库操作失败');
            return ;
        }
        callback(result)
    })
}

module.exports =sqlFun;