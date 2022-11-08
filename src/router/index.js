import Home from "../page/home/Home";
import About from "../page/about/About";
import Life from "../page/life/Life";
import Shop from "../page/shop/Shop";
import Layout from "../page/Layout";
import City from "../page/city/City";
import Find from "../page/find/Find";
import Shequ from "../page/shequ/Shequ";
import Search from "../page/search/Search";
import HouseDetail from "../page/houseDetail/HouseDetail";
import Login from '../page/login/Login'
import Comment from "../page/comment/Comment";
//配置路由
const routers=[
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Home/>,
               
            },
            {
                path:'/about',
                element:<About/>
            },
            {
                path:'/life',
                element:<Life/>
            },
            {
                path:'/shop',
                element:<Shop/>
            },
        ]
    },
    {
        path:'/city',
        element:<City/>
    },
    {
        path:'/find',
        element:<Find/>
    },
    {
        path:'/shequ',
        element:<Shequ/>
    },
    {
        path:'/search',
        element:<Search/>
    },
    {
        path:'/detail/:id',
        element:<HouseDetail/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/comment',
        element:<Comment/>
    }
    
]

export default routers