// 更新分类
import React from 'react'
import {
    Form,
    Input
} from 'antd'
import { useEffect } from 'react';

export default function Update(props) {
    const [form] = Form.useForm();
    useEffect(() => {
        props.setUpdateForm(form)
    }, [form])

    useEffect(() => {
        form.setFieldValue('updateForm', props.categoryName)
    }, [props.categoryName])

    // console.log(Form)
    return (
        <div>
            <Form
                form={form}
                layout="vertical">
                <Form.Item label="修改分类名称：" name='updateForm' >
                    <Input placeholder="请输入名称" />
                </Form.Item>
            </Form>
        </div>
    )
}
