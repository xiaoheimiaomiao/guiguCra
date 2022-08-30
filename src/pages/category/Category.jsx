import React, { useEffect, useState } from 'react'
import { Card, Button, Table, Space, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { reqCategorys } from '../../api/index'
import Addform from './Addform'
import './Category.less'
import Update from './Update';
export default function Category() {
  // 一级/erji分类列表
  const [categorys, setCategorys] = useState()
  // 当前需要显示的分级列表的parentid
  const [parentId, setParentId] = useState('0')
  // 当前显示父类分类列表的名称
  const [parentName, setParentName] = useState('')
  // 添加、更新的确认框是否显示，0都不显示，1显示添加，2显示更新
  const [showStatus, setShowStatus] = useState('0')

  // 点击一级分类列表 跳转到一级分类列表
  const shoeCategorys = () => {
    setParentId('0')
  }

  // 点击取消 隐匿确定框
  const handleCancel = () => {
    setShowStatus('0')
  };
  // 显示添加的确认框
  const showAdd = () => {
    setShowStatus('1')
  }
  // 显示更新的确认框
  const showUpdate = () => {
    setShowStatus('2')
  }
  // 添加分类
  const addCategory = () => {
    console.log("addCategory()")
  }
  // 更新分类
  const updateCategory = () => {
    console.log("updateCategory()")
  }


  const title = parentId === '0' ? '一级分类列表' : (
    <span>
      <Button type='link' onClick={shoeCategorys} >一级分类列表</Button>
      <ArrowRightOutlined />
      <span>{parentName}</span>
    </span>
  )
  const extra = (
    <Button onClick={showAdd} >
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
          <Button type='link' onClick={showUpdate} >修改分类</Button>
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
        visible={showStatus === '1'}
        // 添加分类 点击确认调用函数
        onOk={addCategory}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消">
          <Addform></Addform>
        

      </Modal>
      <Modal title="更新分类"
        visible={showStatus === '2'}
        // 确认更新分类
        onOk={updateCategory}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消">

        <Update></Update>

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
