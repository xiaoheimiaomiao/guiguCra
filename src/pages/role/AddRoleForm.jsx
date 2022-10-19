// 添加分类
import { Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
// const { Option } = Select;

export default function AddRoleForm(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    props.setform(form);
  }, [form, props]);

  // useEffect(() => {
  //     form.setFieldValue('selectName', props.parentId)
  // }, [props.parentId])

  return (
    <div>
      <Form form={form} layout="vertical" preserve={false} name={'addRoleForm'}>
        <Form.Item
          label="角色名称："
          name="inputRoleName"
          rules={[
            {
              required: true,
              message: ' 请输入角色名称',
            },
          ]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
      </Form>
    </div>
  );
}
