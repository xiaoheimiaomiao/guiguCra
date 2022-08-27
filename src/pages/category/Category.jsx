import React, { useEffect, useState } from 'react'
import { Card, Button, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { reqCategorys } from '../../api/index'
import './Category.less'
export default function Category() {
  // 一级/erji分类列表
  const [categorys, setCategorys] = useState()
  // 当前需要显示的分级列表的parentid
  const [parentId, setParentId] = useState('0')
  // 当前显示父类分类列表的名称
  const [parentName, setParentName] = useState('')

  const title = "一级分类列表" + parentName
  const extra = (
    <Button>
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
          <Button type='link' >修改分类</Button>
          <Button type='link' onClick={() => { showSubCategorys(categorys) }}>查看子分类</Button>
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
  )
}
