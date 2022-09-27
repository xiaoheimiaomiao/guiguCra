import React, { useRef, useState, useEffect, useMemo } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons'
import {
  Card,
  Button,
  Form,
  Input,
  Modal,
  Upload,
  Cascader,
  message
} from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { reqCategorys, reqAddOrUpdateProduct } from '../../api/index'
import PicturesWall from './PicturesWall';
import RichTextEditor from './RichTextEditor';
const { TextArea } = Input;

export default function ProductAddupdate() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [options, setOptions] = useState([]);
  const pictureRef = useRef()
  const textRef = useRef()

  const location = useLocation()


  // 根据category数组 生成option数组
  const initOptions = async (categorys) => {

    const options = categorys.map((item) => ({
      value: item._id,
      label: item.name,
      isLeaf: false,
    }))
    // 更新option状态
    // 如果是一个二级分类的更新
    if (!!product) {
      const { pCategoryId } = product
      if (pCategoryId !== '0') {
        // 获取对应的二级列表
        const subCategorys = await getCategorys(pCategoryId)
        // 生成下拉的option
        const childOptions = subCategorys.map((item) => ({
          value: item._id,
          label: item.name,
          isLeaf: true,
        }))
        // 找到当前商品的对应的一级option对象
        const targetOption = options.find(option => option.value === pCategoryId)
        // 关联对应的一级option上
        targetOption.children = childOptions
      }
    }
    // console.log('product: ', product);
    setOptions(options)

  }

  // 获取一级、二级分类列表并显示
  const getCategorys = async (parentId) => {

    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data

      if (parentId === '0') {
        initOptions(categorys)
        // 
      } else {
        // 二级列表
        // 当前async函数返回的promise对象就会成功 且value为categorys
        return categorys
      }

    }

  }

  // 用于加载下一级列表的回调函数
  const loadData = async (selectedOptions) => {
    // console.log(11111111111)
    // 选择的option对象
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true; // load options lazily

    // 根据选中的分类，请求二级列表
    const subCategorys = await getCategorys(targetOption.value)
    targetOption.loading = false;
    if (subCategorys && subCategorys.length > 0) {
      const childOptions = subCategorys.map(item => ({
        value: item._id,
        label: item.name,
        isLeaf: true
      }))
      // 关联到当前option上
      targetOption.children = childOptions
    } else {
      // 如果当前选中的分类没有二级分i类
      targetOption.isLeaf = true

    }
    setOptions([...options]);
    // 模拟请求异步二级列表数据，并更新

  };

  const onFinish = async (values) => {
    // 1收集数据 并封装成product对象
    const { name, desc, price, categoryIds } = values
    let pCategoryId, categoryId
    if (categoryIds.length === 1) {
      pCategoryId = '0'
      categoryId = categoryIds[0]
    } else {
      pCategoryId = categoryIds[0]
      categoryId = categoryIds[1]
    }
    const imgs = pictureRef.current.getImgs()
    const detail = textRef.current?.getDetail()
    const newProduct = { name, desc, price, imgs, detail, pCategoryId, categoryId }

    if (!!product) {
      newProduct._id = product._id
    }
    // 2. 调用接口请求函数去添加/更新
    const result = await reqAddOrUpdateProduct(newProduct)
    // console.log('newProduct: ', newProduct);
    // 3. 根据结果提示
    if (result.status === 0) {
      message.success(`${!!product ? '更新' : '添加'}商品成功!`)
      navigate(-1)
    } else {
      message.error(`${!!product ? '更新' : '添加'}商品失败!`)
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("请按照要求输入商品信息")
  };

  // 获取product对象
  const product = useMemo(() => {
    const { product } = location.state || {}
    console.log('product: ', product);
    return product

  }, [location])

  const categoryIds = useMemo(() => {
    const categoryIds = [] //用来接收级联分类id的数组
    // 如果是添加商品
    if (!!product) {
      // 如果是一级列表
      if (product.pCategoryId === '0') {
        categoryIds.push(product.categoryId)
        // setCategoryIds(product.categoryId)
      } else {
        // // 如果是二级分类
        categoryIds.push(product.pCategoryId)
        categoryIds.push(product.categoryId)
      }
    }
    return categoryIds
  }, [])

  useEffect(() => {

    getCategorys('0')

  }, [])

  const title = (
    <span>
      <Button
        type='link'
        style={{ marginRight: 10, fontSize: 20 }}
        onClick={() => {
          navigate(-1)
        }}
      >
        <ArrowLeftOutlined />
      </Button>
      <span>{!!product ? '修改商品' : '添加商品'}</span>
    </span>
  )

  return (
    <>
      <Card
        title={title}
      // loading={loading}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          initialValues={{
            name: product?.name,
            desc: product?.desc,
            price: product?.price,
            categoryIds: categoryIds
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"

        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: '必须输入商品名称！！',
              },
            ]}
          >
            <Input placeholder='请输入商品名称' />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="desc"
            rules={[
              {
                required: true,
                message: '必须输入商品描述！！',
              },
            ]}
          >
            <TextArea rows={4} placeholder='请输入商品描述' />
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="price"
            rules={[
              {
                required: true,
                message: '必须输入商品价格！！',
              },
            ]}
          >
            <Input prefix="￥" suffix="RMB" />
          </Form.Item>
          <Form.Item
            label="商品分类"
            name="categoryIds"
            rules={[
              {
                required: true,
                message: '必须指定商品分类！！',
              },
            ]}
          >
            <Cascader
              options={options} //需要显示的列表数据数组
              loadData={loadData} //当选择某个列表，加载下一级列表的监听回调
              changeOnSelect
            />

          </Form.Item>
          <Form.Item
            label="商品图片"
          >
            < PicturesWall ref={pictureRef} imgs={product.imgs}></PicturesWall>

          </Form.Item>
          <Form.Item
            label="商品详情"
          >
            <RichTextEditor ref={textRef}></RichTextEditor>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
