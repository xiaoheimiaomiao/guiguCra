import React, { useState } from 'react'
import { Layout, Menu } from 'antd';

import { useNavigate, useLocation } from "react-router-dom";
import './SideMenu.css'
import menuList from './menuList.js';
const { Sider } = Layout;

export default function SideMenu() {
  const [collapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname)

  return (

    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" >后台管理系统</div>
      <Menu
        theme="dark"
        mode="inline"
        items={menuList}
        defaultSelectedKeys={location.pathname}
        onClick={(menuList) => {
          navigate(menuList.key) }}
      />
    </Sider>

  )
}
