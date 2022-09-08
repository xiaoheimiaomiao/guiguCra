// 添加分类
import React from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Select
} from 'antd'
import { useEffect } from 'react';
const { Option } = Select;

function Addform(props) {
    const [form] = Form.useForm();

    useEffect(() => {
        props.setform(form)
    }, [form])

    // useEffect(() => {
    //     form.setFieldValue('selectName', props.parentId)
    // }, [props.parentId])

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    selectName: props.parentId,
                    inputName: ''
                }}
                preserve={false}
                name={'addForm'}
            >
                <Form.Item label="所属分类：" name='selectName'>
                    <Select >
                        <Option value='0'>一级分类</Option>
                        {
                            props.categorys.map((Item) => {
                                return <Option key={Item.key} value={Item._id}>{Item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="分类名称："
                    name='inputName'
                    rules={[
                        {
                            required: true,
                            message: '分类名称必须输入'
                        }
                    ]}
                >
                    <Input placeholder="请输入名称" />
                </Form.Item>
            </Form>
        </div>
    )
}
Addform.propTypes = {
    // 一级分类数组
    // categorys: PropTypes.array.isRequired,
    // 夫分类的id
    // parentId: PropTypes.string.isRequired
}
export default Addform
