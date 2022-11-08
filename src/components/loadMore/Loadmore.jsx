import React, { useEffect } from 'react'

export default function Loadmore(props) {
    let flag=true;

    useEffect(()=>{
        window.addEventListener('scroll',fun)
        return ()=>{
            // 清除多次绑定的scroll事件
            window.removeEventListener('scroll',fun)
        }
    },[props.page])

    function fun(){
        //滚动的高度
        let height=document.documentElement.scrollTop;  
        //视口的高度
        let winHeight=document.documentElement.clientHeight;
        //文档的高度
        let domHeight=document.body.clientHeight;
        //判断
        if(height+winHeight>=domHeight-100 && flag){
            // console.log('加载更多数据');
            //关闭开关
            flag=false;
            // num++;
            // setPage(num);  //此处page改变，就会执行绑定事件，绑定后就又会执行fun，所以可以直接将page改变放在http中
            if(props.val){  //若存在传递的参数val执行
                props.getData(props.val,props.page)
            }else{

                props.getData(props.page)   //获取数据，进行渲染
            }
        }

    }


  return (
    <div></div>
  )
}
