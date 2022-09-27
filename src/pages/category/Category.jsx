import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Space, Table } from 'antd';
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import {
  reqAddCategory,
  reqCategorys,
  reqUpdateCategory,
} from '../../api/index';
import Addform from './Addform';
import './Category.less';
import Update from './Update';
export default function Category() {
  // 一级分类列表
  const [categorys, setCategorys] = useState();
  // 二级分类列表
  const [subCategorys, setSubCategorys] = useState();
  // 当前需要显示的分级列表的parentid
  const [parentId, setParentId] = useState('0');

  // 当前显示父类分类列表的名称
  const [parentName, setParentName] = useState('');
  // 添加、更新的确认框是否显示，0都不显示，1显示添加，2显示更新
  const [showStatus, setShowStatus] = useState('0');
  //  用于保存将要更新的信息
  const [category, setCategory] = useState();

  // form实例
  const [form, setForm] = useState();
  const [loading, setLoading] = useState(false);
  // 异步获取一级/二级分类列表显示
  const getCategorys = async (parentId) => {
    setLoading(true);
    const result = await reqCategorys(parentId);
    setLoading(false);
    if (result.status === 0) {
      // 可能为一级，也有可能为二级
      const list = result.data;
      if (parentId === '0') {
        setCategorys(list);
      } else {
        setSubCategorys(list);
      }
    }
  };
  // 获取一,二级级分类列表
  useEffect(() => {
    getCategorys(parentId);
  }, [parentId]);

  // 点击查看子分类按钮 获取二级分类列表
  const showSubCategorys = (categorys) => {
    setParentId(categorys._id);
    setParentName(categorys.name);
  };

  // 父组件向子组件传递函数，用于子传父数据
  const setform = (form) => {
    setForm(form);
  };

  // 点击一级分类列表 跳转到一级分类列表
  const shoeCategorys = () => {
    setParentId('0');
  };
  // 点击取消 隐匿确定框
  const handleCancel = () => {
    setShowStatus('0');
    // form.resetFields('')
  };
  // 显示添加的确认框
  const showAdd = () => {
    setShowStatus('1');
    // addCategorysForm.resetFields('')
  };
  // 显示更新的确认框
  const showUpdate = (categorys) => {
    setShowStatus('2');
    setCategory(categorys);
  };
  // 点击添加按钮，添加分类
  const addCategory = async () => {
    // console.log("addCategory()")
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      // 1隐藏框
      setShowStatus('0');
      // 2收集数据
      const parentId = values.selectName;
      const categoryName = values.inputName;
      // 3发送更新列表
      const result = await reqAddCategory(categoryName, parentId);
      if (result.status === 0) {
        if (parentId === parentId) {
          getCategorys(parentId);
        } else if (parentId === '0') {
          getCategorys('0');
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  // 确定更新分类按钮
  const updateCategory = async () => {
    try {
      const values = await form.validateFields();
      // console.log('Success:', values);
      // 1隐藏确定框
      setShowStatus('0');
      // 2发送请求更新分类
      const categoryId = category._id;
      const categoryName = values.updateForm;
      const result = await reqUpdateCategory({ categoryId, categoryName });
      if (result.status === 0) {
        getCategorys(parentId);
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const title =
    parentId === '0' ? (
      '一级分类列表'
    ) : (
      <span>
        <Button type="link" onClick={shoeCategorys}>
          一级分类列表
        </Button>
        <ArrowRightOutlined />
        <span>{parentName}</span>
      </span>
    );
  const extra = (
    <Button onClick={showAdd}>
      <PlusOutlined />
      添加
    </Button>
  );
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
          <Button
            type="link"
            onClick={() => {
              showUpdate(categorys);
            }}
          >
            修改分类
          </Button>
          {parentId === '0' ? (
            <Button
              type="link"
              onClick={() => {
                showSubCategorys(categorys);
              }}
            >
              查看子分类
            </Button>
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="添加分类"
        open={showStatus === '1'}
        // 添加分类 点击确认调用函数
        onOk={addCategory}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <Addform
          categorys={categorys}
          parentId={parentId}
          setform={setform}
        ></Addform>
      </Modal>
      <Modal
        title="更新分类"
        open={showStatus === '2'}
        // 确认更新分类
        onOk={updateCategory}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <Update setform={setform} categoryName={category?.name}></Update>
      </Modal>
      <Card title={title} extra={extra}>
        <Table
          // 是否展示外边框和列边框
          loading={loading}
          bordered={true}
          columns={columns}
          dataSource={parentId === '0' ? categorys : subCategorys}
          pagination={{ pageSize: 5 }}
          // scroll={{y:300}}
        />
      </Card>
    </>
  );
}
