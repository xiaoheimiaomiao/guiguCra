// 更新分类
import React from 'react';
import { Form, Input } from 'antd';
import { useEffect } from 'react';

export default function Update(props) {
  const [form] = Form.useForm();
  useEffect(() => {
    props.setform(form);
  }, [form, props]);

  useEffect(() => {
    form.setFieldValue('updateForm', props.categoryName);
  }, [form, props.categoryName]);

  // console.log(Form)
  return (
    <div>
      <Form
        // initialValues={{
        //     updateForm:props.categoryName
        // }}
        form={form}
        preserve={false}
        layout="vertical"
      >
        <Form.Item
          label="修改分类名称："
          name="updateForm"
          rules={[
            {
              required: true,
              message: '分类名称必须输入',
            },
          ]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>
      </Form>
    </div>
  );
}
