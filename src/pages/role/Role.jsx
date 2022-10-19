import React from 'react';
import { Button, Card, Modal, Table, message } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import { useState } from 'react';
import { reqRoles } from '../../api/index';
import { useEffect } from 'react';
import AddRoleForm from './AddRoleForm';
import { reqAddRole } from '../../api/index';
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

  const [isShowAddRole, setIsShowAddRole] = useState();

  const [form, setForm] = useState();

  const title = (
    <span>
      <Button
        onClick={() => {
          setIsShowAddRole(true);
        }}
      >
        创建角色
      </Button>
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
      setDataSource(roles);
    }
  };

  const handleCancel = () => {
    setIsShowAddRole(false);
  };

  const addRole = async () => {
    try {
      // 收集数据
      const values = await form.validateFields();
      const roleName = values.inputRoleName;
      // 请求添加
      const result = await reqAddRole(roleName);
      if (result.status === 0) {
        console.log('result: ', result);
        message.success('添加角色成功');
        // 产生新的角色
        setIsShowAddRole(false);
        getRoles();
      } else {
        message.error('添加角色失败');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const setform = (form) => {
    setForm(form);
  };

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <>
      <Modal
        title="添加角色"
        open={isShowAddRole}
        // 添加分类 点击确认调用函数
        onOk={addRole}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <AddRoleForm setform={setform}></AddRoleForm>
      </Modal>
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
