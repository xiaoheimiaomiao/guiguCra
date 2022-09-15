import React, { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons'
import {
  Card,
  Button,
  Form,
  Input,
  message,
  Upload,
  Cascader
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { reqCategorys } from '../../api/index'
import { useEffect } from 'react';
const { TextArea } = Input;
// 上传图片
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

export default function ProductAddupdate() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [options, setOptions] = useState([]);

  const initOptions = (categorys) => {
    // 根据category数组 生成option数组
    const options = categorys.map((item) => ({
      value: item._id,
      label: item.name,
      isLeaf: false,
    }))
    // 更新option状态
    setOptions(options)
  }

  // 获取一级、二级分类列表并显示
  const getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data
      // console.log(categorys)
      initOptions(categorys)
    }
  }

  const loadData = (selectedOptions) => {
    // 选择的option对象
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true; // load options lazily

    // 根据选中的分类，请求二级列表

    // 模拟请求异步二级列表数据，并更新
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      setOptions([...options]);
    }, 1000);
  };

  // 上传图片
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );


  const onFinish = (values) => {
    console.log('Success:', values);
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
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
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
