import {
     Form,
     Input
 } from 'antd'
import React from 'react'

export default function Update() {
    return (
        <div>
            <Form
                layout="vertical">
                <Form.Item label="分类名称：">
                    <Input placeholder="请输入名称" />
                </Form.Item>
            </Form>
        </div>
    )
}
