import React,{useState} from 'react'
import {
     Form,
     Input
 } from 'antd'



export default function Update(props) {
    // const name=props.categoryName
    // console.log(name)
    const [value,setValue]=useState()
    const onChange=(event)=>{
        // const word=event.target.value
        // console.log(word)
        setValue(event.target.value)
        props.getNewCategoryName(event.target.value)
    }
    // console.log(value)
    return (
        <div>
            <Form 
                layout="vertical">
                <Form.Item label="修改分类名称：">
                    <Input  onInput={onChange} defaultValue={props.categoryName} placeholder="请输入名称" />
                </Form.Item>
            </Form>
        </div>
    )
}
