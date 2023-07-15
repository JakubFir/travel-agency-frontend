import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {errorNotification, successNotification} from "../notifications/Notifications";
import {authenticateUser} from "../clients/auth";
import RegisterDrawer from "../components/registerDrawer";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showDrawer, setShowDrawer] = useState(false)
    const navigate = useNavigate();

    const handleRegister = () => {
        setShowDrawer(true);
    }
    const close = () => {
        setShowDrawer(false);
    };


    function sendLoginRequest() {
        const reqBody = {
            username: username,
            password: password,
        };
        console.log(reqBody)
        authenticateUser(reqBody)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('jwt', data.token);
                successNotification("Welcome " + username)
                navigate('/');
            }).catch(error => {
                console.log(error)
                errorNotification("Provide a valid user credentials", error.status);
        })
    }

    return (
        <>
            <RegisterDrawer
                visible={showDrawer}
                close={close}
            />
            <div style={{
                backgroundColor: 'white',
                minHeight: '30vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input value={username} placeholder="here goes title"
                               onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{required: true, message: 'Please input your password!',}]}
                    >
                        <Input value={password} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}>
                        <div style={{display: 'flex'}}>
                            <Button
                                onClick={() => sendLoginRequest()}
                                style={{marginRight: '5px'}}
                                type="primary" htmlType="submit">
                                Login
                            </Button>
                            <Button
                                onClick={() => handleRegister()}
                                style={{marginRight: '5px'}}
                                type="primary" htmlType="submit">
                                Register
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}
export default Login;