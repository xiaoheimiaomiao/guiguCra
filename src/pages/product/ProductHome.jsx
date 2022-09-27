import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select, Space, Table, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  reqProducts,
  reqSearchProducts,
  reqUpdateStatus,
} from '../../api/index';
import { PAGE_SIZE } from '../../utils/constants';
// import './product.less'
const { Option } = Select;
export default function ProductHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0); // 数据总数
  const [products, setProducts] = useState(); //商品数组
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('productName');
  const [pagesNum, setPagesNum] = useState('');
  const pushShow = (product) => {
    navigate('/product/detail', {
      replace: false,
      state: {
        product,
      },
    });
  };
  const update = (product) => {
    navigate('/product/addupdate', {
      replace: false,
      state: {
        product,
      },
    });
  };
  const updateStatus = async ({ _id: productId, status }) => {
    const newStatus = status === 1 ? 2 : 1;
    const result = await reqUpdateStatus(productId, newStatus);
    if (result.status === 0) {
      await getProducts(pagesNum);
      message.success('更新商品成功');
    }
  };
  const title = (
    <span>
      <Select
        style={{ width: 150 }}
        value={searchType}
        onChange={(value) => {
          setSearchType(value);
        }}
      >
        <Option value="productName">按名称搜索</Option>
        <Option value="productDesc">按内容搜索</Option>
      </Select>
      <Input
        placeholder="关键字"
        style={{ width: 150, margin: '0 15px' }}
        value={searchName}
        onChange={(event) => {
          setSearchName(event.target.value);
        }}
      />
      <Button
        onClick={() => {
          getProducts(1);
        }}
      >
        搜索
      </Button>
    </span>
  );
  const extra = (
    <Button
      onClick={() => {
        navigate('/product/addupdate');
      }}
    >
      <PlusOutlined />
      添加商品
    </Button>
  );
  const columns = [
    {
      key: 'name',
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      key: 'describe',
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      key: 'price',
      title: '价格',
      dataIndex: 'price',
      render: (price) => `¥${price}`, // 当前指定了对应的属性, 传入的是对应的属性值
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 150,
      render: (status, listData) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => {
                updateStatus(listData);
              }}
            >
              {status === 1 ? '下架' : '上架'}
            </Button>
            <span>{status === 1 ? '在售' : '未上架'}</span>
          </Space>
        );
      },
    },
    {
      width: 100,
      title: '操作',
      key: 'action',
      render: (product) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              pushShow(product);
            }}
          >
            详情
          </Button>
          <Button
            type="link"
            onClick={() => {
              update(product);
            }}
          >
            修改
          </Button>
        </Space>
      ),
    },
  ];

  // 获取指定页码数据显示
  const getProducts = useCallback(
    async (pageNum) => {
      setPagesNum(pageNum);
      setLoading(true);
      let result;
      if (searchName) {
        result = await reqSearchProducts({
          pageNum,
          pageSize: PAGE_SIZE,
          searchName,
          searchType,
        });
      } else {
        // 一般分页请求
        result = await reqProducts(pageNum, PAGE_SIZE);
      }
      // const result = await reqProducts(pageNum, PAGE_SIZE)
      setLoading(false);
      // console.log(result)
      if (result.status === 0) {
        // console.log(result.date)
        const { total, list } = result.data;
        setProducts(list);
        setTotal(total);
      }
    },
    [searchName, searchType],
  );

  useEffect(() => {
    getProducts(1);
  }, [getProducts]);
  return (
    <>
      <Card title={title} extra={extra}>
        <Table
          // // 是否展示外边框和列边框
          bordered={true}
          loading={loading}
          columns={columns}
          dataSource={products}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            total,
            showQuickJumper: true,
            onChange: getProducts,
          }}
        />
      </Card>
    </>
  );
}
