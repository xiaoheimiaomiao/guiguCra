import {
     Form,
     Input
 } from 'antd'
import React from 'react'

export default function Update(props) {
    // const name=props.categoryName
    // console.log(name)
    return (
        <div>
            <Form 
                layout="vertical">
                <Form.Item label="修改分类名称：">
                    <Input defaultValue={props.categoryName} placeholder="请输入名称" />
                </Form.Item>
            </Form>
        </div>
    )
}
