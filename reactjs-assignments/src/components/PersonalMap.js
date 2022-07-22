import React, { useState } from "react";
import {
    EditOutlined,
    DeleteFilled,
    HeartOutlined,
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    HeartFilled
} from "@ant-design/icons";
import { Card, Space, Typography, Modal, Form, Input } from "antd";
import "antd/dist/antd.min.css";
import "./style.css";

const { Text } = Typography;
const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!"
    },
    number: {
        range: "${label} must be between ${min} and ${max}"
    }
};

function PersonalMap({ post, posts, setPosts }) {
    const { Meta } = Card;
    const { name, phone, website, email, username, id } = post;
    const [isTrue, setIsTrue] = useState(true);
    const [values, setValues] = useState({});
    const [form] = Form.useForm();
    const images = `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;

    function heartInOut() {
        setIsTrue(!isTrue);
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleShowModal = () => {       
        form.setFieldsValue({ user: { name, phone, website, email } });
        setValues({ name, phone, website, email });
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (
            values.name !== "" &&
            values.email !== "" &&
            values.phone !== "" &&
            values.website !== ""
        ) {
            setIsModalVisible(false);
            const tempPosts = [...posts];           
            tempPosts.forEach((post) => {
                if (post.id === id) {
                    post.name = values.name;
                    post.email = values.email;
                    post.phone = values.phone;
                    // console.log(values.name);
                    post.website = values.website;
                }
            });
            setPosts(tempPosts);
        }
    };

    const handleDelete = (id) => {       
        const filteredPosts = posts.filter((post) => post.id !== id);
        setPosts(filteredPosts);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <div className="card">
            <Card
                style={{
                    minWidth: 440
                }}
                cover={<img className="image" alt="example" src={images} />}
                actions={[
                    isTrue ? (
                        <HeartOutlined
                            style={{ color: "red" }}
                            className="red"
                            onClick={heartInOut}
                        />
                    ) : (
                        <HeartFilled
                            style={{ color: "red" }}
                            className="red"
                            onClick={heartInOut}
                        />
                    ),
                    <EditOutlined key="edit" type="primary" onClick={handleShowModal} />,
                    <DeleteFilled onClick={() => handleDelete(id)} />
                ]}
            >
                <Meta title={name} />

                <Space direction="vertical" className="flex">
                    <div>
                        <MailOutlined className="margin" />
                        <Text className="flex">{email}</Text>
                    </div>
                    <div>
                        <PhoneOutlined className="margin" />
                        <Text className="flex">{phone}</Text>
                    </div>
                    <div>
                        <GlobalOutlined className="margin" />
                        <Text className="flex">{website}</Text>
                    </div>
                </Space>
            </Card>
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    form={form}
                >
                    <Form.Item
                        initialValue={name}
                        name={["user", "name"]}
                        label="Name"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input
                            value={name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        initialValue={email}
                        name={["user", "email"]}
                        label="Email"
                        rules={[
                            {
                                required: true,
                                type: "email"
                            }
                        ]}
                    >
                        <Input
                            value={email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        initialValue={phone}
                        name={["user", "number"]}
                        label="Phone"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input
                            value={phone}
                            onChange={(e) => setValues({ ...values, phone: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        initialValue={website}
                        name={["user", "website"]}
                        label="Website"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input
                            value={website}
                            onChange={(e) =>
                                setValues({ ...values, website: e.target.value })
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default PersonalMap;
