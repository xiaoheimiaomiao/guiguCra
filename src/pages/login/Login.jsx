import React from 'react'
import logo from './images/logo512.png'
import './Login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from 'antd';
import { reqLogin } from '../../api'


export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { username, password } = values
    reqLogin(username, password).then(result => {
      if (result.status === 0) {
        const user = result.data
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/")
        message.success('登录成功');
      } else {
        message.error('请输入正确的用户名或密码');
      }
    })
    
  };
  return (
    <div className='login'>
      <header className='login-header'>
        <img src={logo} alt='logo' />
        <h1>React项目:后台管理系统</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '用户名不能为空!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名称" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '密码不能为空!',
              },
              {
                min: 4,
                message: '密码需要大于4位'
              },
              {
                max: 16,
                message: '密码需要小于12位'
              }            
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入4-16位密码"
            />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>

          </Form.Item>
        </Form>
      </section>
    </div>
  )
}
