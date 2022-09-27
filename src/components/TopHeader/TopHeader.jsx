import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Layout, Modal } from 'antd';
import menuList from '../SideMenu/menuList';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { formateDate } from '../../utils/dateUtils';
import { reqWeather } from '../../api/index';
import './TopHeader.less';
const { Header } = Layout;
const { confirm } = Modal;

export default function TopHeader() {
  const navigate = useNavigate();
  // 当前时间字符串
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
  // 一秒钟修改一次时间
  const intervalRef = useRef();
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(formateDate(Date.now()));
    }, 1000);
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  // 天气文本
  const [weather, setWeather] = useState('下雨');
  // 温度文本
  const [temperature, setTemperature] = useState('20');
  // ajxa 获取天气
  useEffect(() => {
    reqWeather('110000').then((result) => {
      const weather = result.weather;
      const temperature = result.temperature;
      setWeather(weather);
      setTemperature(temperature);
    });
  }, []);
  // 获取username
  const user = JSON.parse(localStorage.getItem('user'));
  // 获取标题
  const location = useLocation();
  const path = location.pathname;
  // console.log(path)

  const title = getTitle(menuList, path);
  // if (path.indexOf('/product') === 0) {
  //   path = '/product/home'
  // }
  function getTitle(list, key) {
    for (let item of list) {
      if (item.key === key) {
        return item.label;
      }
      if (item.children) {
        const value = getTitle(item.children, key);
        if (value) {
          return value;
        }
      }
    }
  }
  // 退出登录
  const showConfirm = () => {
    confirm({
      title: '确认要退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        clearInterval(intervalRef.current);
        localStorage.removeItem('user');
        navigate('/login');
      },
      onCancel() {},
    });
  };
  return (
    <div>
      <Header
        className="site-layout-background"
        style={{
          padding: '0 16px',
        }}
      >
        <div className="header-top">
          <span>欢迎{user?.username}</span>
          <Button type="link" onClick={showConfirm}>
            退出
          </Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <span>天气：{weather}</span>
            <span>温度：{temperature}℃</span>
          </div>
        </div>
      </Header>
    </div>
  );
}
