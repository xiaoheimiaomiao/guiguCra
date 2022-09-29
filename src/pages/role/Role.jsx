import React from 'react';
import { Button, Card, Table } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import { useState } from 'react';
const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '授权时间',
    dataIndex: 'authTime',
    key: 'authTime',
  },
  {
    title: '授权人',
    dataIndex: 'authName',
    key: 'authName',
    width: 150,
  },
];
const dataSource = [
  {
    key: '1',
    name: '测试',
    createTime: '2019-4-7',
    authTime: '2019-4-7',
    authName: 'admin',
  },
];
export default function Role() {
  const [roles, setRoles] = useState();
  const title = (
    <span>
      <Button>创建角色</Button>
      <Button disabled>设置角色权限</Button>
    </span>
  );
  return (
    <>
      <Card title={title}>
        <Table
          bordered
          // rowKey="_id"
          className="rolesTable"
          columns={columns}
          dataSource={dataSource}
          // showQuickJumper 分页快速跳转
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        ></Table>
      </Card>
    </>
  );
}
