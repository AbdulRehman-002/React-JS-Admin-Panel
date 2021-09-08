import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { Table, Divider, Tag, message } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";



const data = [
  {
    id: "1",
    name: "John Brown",
    age: 32,
    contact: "0321 1234567",
    location: "New York No. 1 Lake Park",
    type: [ "developer"],
  },
  {
    id: "2",
    name: "Jim Green",
    age: 42,
    contact: "0321 1234567",
    location: "London No. 1 Lake Park",
    type: ["tester"],
  },
  {
    id: "3",
    name: "Joe Black",
    age: 32,
    contact: "0321 1234567",
    location: "Sidney No. 1 Lake Park",
    type: [ "teacher"],
  },
  {
    id: "4",
    name: "Steve Kevin",
    age: 32,
    contact: "0321 1234567",
    location: "Sidney No. 2 View Park",
    type: [ "Manager"],
  },
];

const columns = [
  {
    title: "Service Name",
    dataIndex: "name",
    key: "id",
  },
  {
    title: "Service Location",
    dataIndex: "location",
    key: "id",
  },
  {
    title: "Service Type",
    dataIndex: "type",
    key: "id",
  },

  {
    title: "Service ID",
    dataIndex: "id",
    key: "id",
  },

  {
    title: "Contact Number",
    dataIndex: "contact",
    key: "id",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Link
          to={{
            pathname: "/edit/" + record.id,
            dataProps: { details: record },
          }}
        >
          Edit
        </Link>
        <Divider type="vertical" />
        <Link
          onClick={() => {
            deleteService(record.id);
          }}
        >
          Delete
        </Link>
      </span>
    ),
  },
];

const deleteService = (id) => {
  fetch("http://localhost:3000/service/delete/" + id, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        message.success("Successfully Deleted :) ");
      } else {
        message.error("Failed to delete ");
      }
    });
};



function Home() {
  const [servicelist, setservicelist] = useState();

  const fetchData = () => {
    // Simple GET request using fetch
    fetch("http://localhost:3000/service/get")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setservicelist(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <h1> SERVICES </h1>
      <br></br>

      <Link to="/add">
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontSize: "18px" }} />}
        >
          Add A New Service
        </Button>
      </Link>

      <br></br>
      <br></br>
      <div style={{ padding: "50px" }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default Home;
