import {useEffect, useState} from "react";
import {successNotification} from "../notifications/Notifications";
import {Button, Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {Link, useNavigate} from "react-router-dom";

export function SiteNavi() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("jwt"));
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("jwt"));
    }, [localStorage.getItem("jwt")]);

    function handleLogout() {
        localStorage.removeItem('jwt');
        navigate('/login');
        successNotification("sucesfully logged out")
    }

    return (
        <>
            <Header
                style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div className="logo"/>
                <Menu theme="dark" mode="inline">
                    <div className="button-group">
                        <Link to="/">
                            <Button type="primary"
                                    shape="round">
                                Trips
                            </Button>
                        </Link>
                        <Link to="/newsletter">
                            <Button type="primary"
                                    shape="round">
                                Newsletter
                            </Button>
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile">
                                    <Button Button type="primary" shape="round">
                                        Profile
                                    </Button>
                                </Link>
                                <Button type="primary" shape="round" onClick={handleLogout}>
                                    Logout
                                </Button>

                            </>
                        ) : (
                            <Link to="/login">
                                <Button type="primary" shape="round">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </Menu>
            </Header>
        </>
    )
}