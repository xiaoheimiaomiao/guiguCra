import React from 'react'
import {
  Card,
  Select,
  Button,
  Input,
  Table,
  Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import './product.less'
const { Option } = Select;
export default function ProductHome() {
  const navigate = useNavigate();
  const title = (
    <span>
      <Select
        style={{ width: 150 }}
      >
        <Option value='productName'>按名称搜索</Option>
        <Option value='productDesc'>按内容搜索</Option>
      </Select>
      <Input
        placeholder='关键字'
        style={{ width: 150, margin: '0 15px' }}
      />
      <Button  >搜索</Button>
    </span>
  )
  const extra = (
    <Button 
      onClick={() => {
        navigate('/product/addupdate')
      }}
    >
      <PlusOutlined />
      添加商品
    </Button>
  )
  const list = [
    {
      key: '1',
      name: '联想Thinkpad翼480',
      describe: '年度重量级新品更加轻薄设计',
      price: '6000',
      // condition: '在售',
    }
  ]
  const columns = [
    {
      key: 'name',
      title: '商品名称',
      dataIndex: 'name',

    },
    {
      key: 'describe',
      title: '商品描述',
      dataIndex: 'describe',
    },
    {
      key: 'price',
      title: '价格',
      dataIndex: 'price',
      render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
    },
    {
      key: 'condition',
      title: '状态',
      dataIndex: 'condition',
      width:150,
      render: () => {
        return (
          <Space size="middle">
            <span>在售</span>
            <Button>下架</Button>
          </Space>
        )
      }
    },
    {
      width: 100,
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type='link' >详情</Button>
          <Button type='link' >修改</Button>
        </Space>)
    }
  ]

  return (
    <>
      <Card
        title={title}
        extra={extra}
      >
        <Table
          // // 是否展示外边框和列边框
          bordered={true}
          columns={columns}
          dataSource={list}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </>
  )
}
