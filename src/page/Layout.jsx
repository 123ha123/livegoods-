import React from 'react'
import {Outlet} from 'react-router-dom'
import Footer from '../components/footer/Footer'


export default function Layout() {
  return (
    <div>
        <Outlet/>

        {/* 底部 footer */}
        <div style={{height:'1rem'}}>
          <Footer/>
        </div>
    </div>
  )
}
