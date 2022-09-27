// 用于上传图片的组件
import React, { useImperativeHandle, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { reqDeleteImg } from '../../api/index';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

function PicturesWall(props, ref) {
  // 标识是否显示大图
  const [previewOpen, setPreviewOpen] = useState(false);
  // 大图的url
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  //
  const [fileList, setFileList] = useState([]);
  // 隐藏modal
  const handleCancel = () => setPreviewOpen(false);

  // 指定显示file对应的大图
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const handleChange = async ({ file, fileList: newFileList }) => {
    // 一旦上传成功 将当前的file的信息修正（name，url）
    if (file.status === 'done') {
      const result = file.response;
      if (result.status === 0) {
        message.success('上传图片成功');
        const { name, url } = result.data;
        console.log('result.data: ', result.data);
        file.name = name;
        file.url = url;
      } else {
        message.error('上传失败');
      }
    } else if (file.status === 'removed') {
      // 删除操作
      const result = await reqDeleteImg(file.name);
      if (result.status === 0) {
        message.success('删除图片成功！');
      } else {
        message.error('删除图片失败！');
      }
    }
    setFileList(newFileList);
  };
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
  const getImgs = () => {
    return fileList.map((item) => item.name);
  };

  useImperativeHandle(ref, () => {
    return {
      getImgs,
    };
  });
  return (
    <div>
      <Upload
        // 上传图片的接口
        action="/api/manage/img/upload"
        // 只接受图片格式
        accept="image/*"
        // 照片显示格式
        listType="picture-card"
        // 请求参数名
        name="image"
        // 所有已上传图片文件对象的数组
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
}

export default React.forwardRef(PicturesWall);
