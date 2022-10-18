import React from 'react';
import { Button, Card, Table } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import { useState } from 'react';
import { reqRoles } from '../../api/index';
import { useEffect } from 'react';
const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '授权时间',
    dataIndex: 'auth_time',
    key: 'auth_time',
  },
  {
    title: '授权人',
    dataIndex: 'auth_name',
    key: 'auth_name',
    width: 150,
  },
];

export default function Role() {
  // 所有角色的列表
  const [roles, setRoles] = useState([]);
  // 选中角色的列表
  const [role, setRole] = useState({});
  const [dataSource, setDataSource] = useState();
  const title = (
    <span>
      <Button>创建角色</Button>
      <Button disabled={!role._id}>设置角色权限</Button>
    </span>
  );
  const onRow = (record) => {
    return {
      onClick: (event) => {
        console.log(record);
        setRole(record);
      }, // 点击行
    };
  };
  const getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      // console.log('roles: ', roles);

      setDataSource(roles);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);
  return (
    <>
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          className="rolesTable"
          columns={columns}
          dataSource={dataSource}
          // showQuickJumper 分页快速跳转
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
          }}
          onRow={onRow}
        ></Table>
      </Card>
    </>
  );
}
