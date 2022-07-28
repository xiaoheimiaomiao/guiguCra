import React from 'react'
import './TopHeader.less'
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,

// } from '@ant-design/icons';
import { Layout } from 'antd';





const { Header } = Layout;
export default function TopHeader() {
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <Header
        className="site-layout-background"
        style={{
          padding: '0 16px'
        }}
      >
        <div className="header-top">
          <span>欢迎, ??</span>
          <a>退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">shouye</div>
          <div className="header-bottom-right">
            <span>shijian</span>
            {/* <img src={} alt="weather" /> */}
            <span>天气</span>
          </div>
        </div>
      </Header>

    </div>
  )
}
