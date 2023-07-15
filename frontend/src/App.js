import {Layout} from "antd";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import Newsletter from "./pages/Newsletter"
import {Route, Routes} from "react-router-dom";
import { SiteNavi } from "./pages/SiteNavi";
import Profile from "./pages/Profile";

const {Content } = Layout;

function App() {

    return (
        <Layout>
            <SiteNavi />
            <Content>
                <Routes>
                    <Route path="/" element={<Trips />} />
                    <Route path="/newsletter" element={<Newsletter />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </Content>
        </Layout>
    );
}
export default App;
