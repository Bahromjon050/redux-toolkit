import React, { useEffect, useState } from "react";
import { Avatar, Badge, Button, Form, Input, Table } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  Minus,
  Plus,
  addCrud,
  editCrud,
  delCrud,
} from "../redux/reducers/Counter";
import { getStudent } from "../redux/reducers/Student";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
  const { data, count } = useSelector((state) => state.counter);
  const { array, status } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  console.log(array);
  console.log(status);
  useEffect(() => {
    dispatch(getStudent());
  }, []);

  const [form] = Form.useForm();

  const [result, setResult] = useState(true);
  const edit = (val) => {
    setValue("id", val.id);
    setValue("name", val.name);
    setValue("email", val.email);
    setValue("password", val.password);
    setResult(false);
  };
  const del = (id) => {
    dispatch(delCrud(id));
  };
  const colums = [
    {
      id: 0,
      title: "User",
      dataIndex: "name",
    },
    {
      id: 1,
      title: "Email",
      dataIndex: "email",
    },
    {
      id: 2,
      title: "Password",
      dataIndex: "password",
    },
    {
      id: 3,
      title: "Action",
      render: (user) => (
        <>
          <Button onClick={() => edit(user)} type="primary">
            Edit
          </Button>
          <Button onClick={() => del(user.id)} type="primary">
            delete
          </Button>
        </>
      ),
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.number().required(),
    })
    .required();
  const onFinish = (values) => {
    if (result) {
      dispatch(addCrud({ ...values, id: new Date().getTime() }));
      // dispatch(Add({ ...values, id: new Date().getTime() }))
    } else {
      dispatch(editCrud(values));
    }
    reset();
    setResult(true);
  };
  return (
    <>
      <div className="cards_team">
        <h1>CRUD users</h1>
        <form className="mt-2" onSubmit={handleSubmit(onFinish)}>
          <input
            type="text"
            {...register("name", {
              required: "Please enter your first name",
            })}
            placeholder="Enter Your Name"
            className={
              errors.name ? "border inputActiv activ" : "border inputActiv"
            }
          />
          {errors.name ? (
            <p className="errors">Please enter your first name</p>
          ) : null}
          <input
            type="text"
            {...register("email", { required: "Please enter your Email" })}
            placeholder="Enter your email address"
            className={
              errors.email ? "border inputActiv activ" : "border inputActiv"
            }
          />
          {errors.email ? (
            <p className="errors">Please enter your email</p>
          ) : null}
          <input
            type="password"
            className={
              errors.password ? "border inputActiv activ" : "border inputActiv"
            }
            {...register("password", { required: "Please enter your message" })}
            placeholder="Enter Password"
          />
          {errors.password ? (
            <p className="errors">Please enter your password</p>
          ) : null}
          <div>
            <button className="btn" style={{ marginTop: "18px" }}>
              Jo'natish
            </button>
          </div>
        </form>
      </div>

      {/* <Form
        {...layout}
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="User name"
          rules={[
            {
              required: true,
              message: "Your user name",
            },
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
              message: "Your email",
            },
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
              message: "Your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          hidden
          name="id"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
      <Table
        columns={colums}
        dataSource={data}
      ></Table>
    </>
  );
};

export default Home;  
