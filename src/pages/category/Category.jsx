import React, { useEffect, useState } from 'react'
import { Card, Button, Table, Space, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { reqCategorys } from '../../api/index'
import './Category.less'
export default function Category() {
  // 一级/erji分类列表
  const [categorys, setCategorys] = useState()
  // 当前需要显示的分级列表的parentid
  const [parentId, setParentId] = useState('0')
  // 当前显示父类分类列表的名称
  const [parentName, setParentName] = useState('')

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  // 点击一级分类列表 跳转到一级分类列表
  const shoeCategorys = () => {
    setParentId('0')
  }
  // 显示添加框
  const showModal = () => {
    setIsModalVisible(true);
  };
  // 添加
  const addCategory = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // 显示修改框
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  // 修改
  const updateCategory = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const title = parentId === '0' ? '一级分类列表' : (
    <span>
      <Button type='link' onClick={shoeCategorys} >一级分类列表</Button>
      <ArrowRightOutlined />
      <span>{parentName}</span>
    </span>
  )

  const extra = (
    <Button onClick={showModal} >
      <PlusOutlined />
      添加
    </Button>
  )

  const showSubCategorys = (categorys) => {
    setParentId(categorys._id)
    setParentName(categorys.name)
  }

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      name: '',
    },
    {
      title: '操作',
      key: 'action',
      render: (categorys) => (
        <Space size="middle">
          <Button type='link' onClick={showModal2} >修改分类</Button>
          {parentId === '0' ? <Button type='link' onClick={() => { showSubCategorys(categorys) }}>查看子分类</Button> : null}
        </Space>
      ),
    },
  ]
  useEffect(() => {
    reqCategorys(parentId).then(result => {
      // console.log(result)
      const list = result.data
      // console.log(list)
      setCategorys(list)
    })
  }, [parentId])
  return (
    <>
      <Modal title="添加分类"
        visible={isModalVisible}
        onOk={addCategory}
        onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal title="更新分类"
        visible={isModalVisible2}
        onOk={updateCategory}
        onCancel={handleCancel2}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Card title={title} extra={extra} >
        <Table
          // 是否展示外边框和列边框
          bordered={true}
          columns={columns}
          dataSource={categorys}
          pagination={{ pageSize: 5 }}
        // scroll={{y:300}}
        />
      </Card>
    </>
  )
}
