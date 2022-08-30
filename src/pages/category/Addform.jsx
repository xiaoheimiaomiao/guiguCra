import React from 'react'
import {
    Form,
    Input,
    Select
} from 'antd'
const { Option } = Select;
export default function Addform() {
    return (
        <div>
            <Form
                layout="vertical">
                <Form.Item label="所属分类：">
                    <Select defaultValue='jack'>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Select>

                </Form.Item>
                <Form.Item label="分类名称：">
                    <Input placeholder="请输入名称" />
                </Form.Item>

            </Form>
        </div>

    )
}
