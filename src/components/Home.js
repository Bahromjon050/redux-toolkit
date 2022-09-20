import React, { useState } from 'react';
import { Avatar, Badge, Button, Form, Input, Table } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, addCrud, editCrud, delCrud } from '../redux/reducers/Counter';





const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const ButtonGroup = Button.Group;
const Home = () => {
    const { data, count } = useSelector(state => state.counter);
    const dispatch = useDispatch();



    const [form] = Form.useForm();

    const onFinish = (values) => {
        if (result) {
            console.log('add, home');
            dispatch(addCrud({ ...values, id: new Date().getTime() }))
            // dispatch(Add({ ...values, id: new Date().getTime() }))
            form.resetFields()
        } else {
            dispatch(editCrud(values))
            form.resetFields()
        }
        setResult(true)
    };
    const [result, setResult] = useState(true);
    const edit = (val) => {
        form.setFieldsValue({
            id: val.id,
            name: val.name,
            email: val.email,
            password: val.password
        });
        setResult(false)
    };
    const del = (id) => {
        dispatch(delCrud(id))
    }
    const colums = [
        {
            id: 0,
            title: 'User',
            dataIndex: 'name'
        },
        {
            id: 1,
            title: 'Email',
            dataIndex: 'email'
        },
        {
            id: 2,
            title: 'Password',
            dataIndex: 'password'
        },
        {
            id: 3,
            title: 'Action',
            render: (user) => (
                <>
                    <Button onClick={() => edit(user)} type='primary'>Edit</Button>
                    <Button onClick={() => del(user.id)} type='primary'>delete</Button>
                </>
            )
        }
    ]
    return (
        <>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="User name"
                    rules={[
                        {
                            required: true,
                            message: 'Your user name'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Your email"
                    rules={[
                        {
                            required: true,
                            message: 'Your email'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Your password"
                    rules={[
                        {
                            required: true,
                            message: 'Your password'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    hidden
                    name="id"
                    rules={[
                        {
                            required: false
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Table
                columns={colums}
                dataSource={data}
                loading={!data.length ? true : false}
            >
            </Table>






            <br /><br /><br /><br />
            <Badge count={count}>
                <Avatar shape="square" size="large" />
            </Badge>
            <br /><br />
            <ButtonGroup>
                <Button onClick={() => dispatch(Minus())}>
                    <MinusOutlined />
                </Button>
                <Button onClick={() => dispatch(Plus())}>
                    <PlusOutlined />
                </Button>
            </ButtonGroup>
        </>
    )
}

export default Home