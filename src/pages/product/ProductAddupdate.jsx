import React, { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons'
import {
  Card,
  Button,
  Form,
  Input,

  Modal,
  Upload,
  Cascader
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { reqCategorys } from '../../api/index'
import { useEffect } from 'react';
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });


export default function ProductAddupdate() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [options, setOptions] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([ ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const initOptions = (categorys) => {
    // 根据category数组 生成option数组
    const options = categorys.map((item) => ({
      value: item._id,
      label: item.name,
      isLeaf: false,
    }))
    // 更新option状态
    // console.log(options)
    setOptions(options)

  }

  // 获取一级、二级分类列表并显示
  const getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data

      if (parentId === '0') {
        initOptions(categorys)
        // console.log(categorys)
      } else {
        // 二级列表
        // 当前async函数返回的promise对象就会成功 且value为categorys
        return categorys
      }

    }
  }

  // 用于加载下一级列表的回调函数
  const loadData = async (selectedOptions) => {
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




  const onFinish = (values) => {
    console.log('Success:', values);
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

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
      <span>添加商品</span>
    </span>
  )
  useEffect(() => {
    getCategorys('0')
  }, [])
  return (
    <>
      <Card
        title={title}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
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
                message: '必须输入商品分类！！',
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
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>

          </Form.Item>
          <Form.Item
            label="商品详情"
          >
            商品详情
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
