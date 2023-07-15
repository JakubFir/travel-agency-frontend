import React, {useState} from 'react';
import {Button, Col, Drawer, Form, Input, Row, Space} from 'antd';
import {registerUser} from "../clients/registerClient";
import {errorNotification, successNotification} from "../notifications/Notifications";


const RegisterDrawer = ({visible, close}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [origin, setOrigin] = useState("");
    const [originIataCode, setOriginIataCode] = useState("");


    function sendRegisterRequest() {
        const reqBody = {
            username: username,
            password: password,
            name: name,
            email: email,
            origin: origin,
            originIataCode: originIataCode
        };
        console.log(reqBody)
        registerUser(reqBody)
            .then(() => {
                successNotification("Account succesfully created")
                close(true);
            }).catch(error => {
                error.response.text().then(errorMessage => {
                    errorNotification(errorMessage);
                });
        });
    }

    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={close}
                open={visible}
                bodyStyle={{paddingBottom: 80}}
                extra={
                    <Space>
                        <Button onClick={close}>Cancel</Button>
                        <Button onClick={() => sendRegisterRequest()} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[{required: true, message: 'Please enter username'}]}
                            >
                                <Input value={username} placeholder="Please enter username"
                                       onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{required: true, message: 'Please enter password'}]}
                            >
                                <Input value={password} type={"password"}
                                       placeholder="Please enter password"
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter name'}]}
                            >
                                <Input
                                    value={name}
                                    placeholder="Please enter name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{required: true, message: 'Please enter email'}]}
                            >
                                <Input
                                    value={email}
                                    placeholder="Please enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="origin"
                                label="Origin"
                                rules={[{required: true, message: 'Please enter origin'}]}
                            >
                                <Input
                                    value={origin}
                                    placeholder="Please enter origin"
                                    onChange={(e) => setOrigin(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="originIataCode"
                                label="Oigin Iata Code"
                                rules={[{required: true, message: 'Please enter Origin Iata Code'}]}
                            >
                                <Input
                                    value={originIataCode}
                                    placeholder="Please enter Origin Iata Code"
                                    onChange={(e) => setOriginIataCode(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default RegisterDrawer;