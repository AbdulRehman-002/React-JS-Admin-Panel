import logo from "./logo.svg";
import React, { Component, useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Upload, Typography, message } from "antd";
import { useHistory } from "react-router-dom";

import placeHolder from "./upload.png";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const EditService = (props) => {
  const history = useHistory();

  const [file, setFile] = useState("");
  const [loading, setloading] = useState(false);
  const [image, setImage] = useState(placeHolder);
  useEffect(() => {
    console.log(props);
  }, []);
  const onFinish = (values) => {
    console.log("Success:", values);

    var formData = new FormData();
    formData.append("name", values.name);
    formData.append("contact", values.contact);
    formData.append("type", values.type);
    formData.append("location", values.location);
    formData.append("time", values.time);
    formData.append("picture", file);

    const requestOptions = {
      method: "PUT",
      body: formData,
    };
    fetch("http://localhost:3000/service/edit/"+props.location.dataProps.details.id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          history.push("/home");
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ height: "100vh", 
    
    backgroundImage: "url(" + "https://capefearenrichmentprogram.org/wp-content/uploads/2018/01/Light-Grey-Background.jpg" + ")",

    
    paddingTop: "5%" }}>
      <h1>  EDIT SERVICE </h1>
      <center style={{ width: "70%", paddingTop: "3%" }}>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            name: props.location.dataProps.details.name,
            contact: props.location.dataProps.details.contact,
            type: props.location.dataProps.details.type,
            location: props.location.dataProps.details.location,
            time: props.location.dataProps.details.time,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contact"
            rules={[{ required: true, message: "Please input your contact!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Service Type"
            name="type"
            rules={[{ required: true, message: "Please input your type!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=" Service Location"
            name="location"
            rules={[{ required: true, message: "Please input your location!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label=" Service Time"
            name="time"
            rules={[{ required: true, message: "Please input service time!" }]}
          >
            <Input />
          </Form.Item>

          
          {/* <Form.Item label=" Service Image">
      <Form.Item
          name="picture"
          rules={[
            {
              required: true,
              message: "Please input something about this charity !",
            },
          ]}
          valuePropName="picture"
          noStyle
        >
           <Upload.Dragger
                       accept="image/*"

            beforeUpload={(file) => {
              setFile(file);
              let reader = new FileReader();
              reader.onload = (e) => {
                setImage(e.target.result);
              };
              reader.readAsDataURL(file);

              // Prevent upload
              return false;
            }}
            name="picture"
          >
            <img style={{height:200, width:200}} src={image}></img>
            <br></br>{" "}   <br></br>{" "}   <br></br>{" "}
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item> */}

      {/* </Form.Item> */}

      
      <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>


        </Form>
      </center>
    </div>
  );
};

export default EditService;
