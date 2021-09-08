import logo from "./logo.svg";
import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login() {
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, password: values.password }),
    };
    fetch("http://localhost:3000/signin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          history.push("/home");
        } else {
          message.error("Failed to Login ! Please check email and password ");
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        height: "100vh",

        backgroundImage:
          "url(" +
          "https://capefearenrichmentprogram.org/wp-content/uploads/2018/01/Light-Grey-Background.jpg" +
          ")",

        paddingTop: "5%",
      }}
    >
      <center>
        <img
          src={"https://profilelogin.admissione.online/images/admin_login.gif"}
          alt="Logo"
        />
      </center>
      <center style={{ width: "70%", paddingTop: "3%" }}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </center>
    </div>
  );
}

export default Login;
