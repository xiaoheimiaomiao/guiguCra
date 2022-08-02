import React, { useState } from 'react'
import './TopHeader.less'
import { useLocation } from "react-router-dom";
import { Layout } from 'antd';
import menuList from '../SideMenu/menuList';
import { formateDate } from '../../utils/dateUtils'
import { reqWeather } from '../../api/index'
const { Header } = Layout;
export default function TopHeader() {

  // 当前事件字符串
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()))

  // const currentTimeSetTimeout = setInterval(() => {
  //   setCurrentTime(formateDate(Date.now()))
  // }, 1000);

  // 天气文本
  const [weather, setWeather] = useState("下雨")
  // 温度文本
  const [temperature, setTemperature] = useState("20")
  // ajxa 获取天气
  reqWeather('110000').then(result => {
    const weather = result.weather
    const temperature = result.temperature
    setWeather(weather)
    setTemperature(temperature)
  })

  const user = JSON.parse(localStorage.getItem("user"))

  const location = useLocation();
  const path = location.pathname
  const title = menuList.forEach(()=>{
    
  })
    
    
  return (
    <div>
      <Header
        className="site-layout-background"
        style={{
          padding: '0 16px'
        }}
      >

        <div className="header-top">
          <span>欢迎{user.username}</span>

          <a>退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <span>{weather}</span>
            <span>{temperature}℃</span>

          </div>
        </div>
      </Header>

    </div>
  )
}
