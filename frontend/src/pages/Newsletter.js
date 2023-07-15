import {Button, Input, Layout,} from "antd";
import {Content} from "antd/es/layout/layout";
import {errorNotification, successNotification} from "../notifications/Notifications";
import {subscribeToNewsletter} from "../clients/Newsletter";


const Newsletter = () => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const {email} = e.target.elements;

        let conFom = {
            email: email.value
        }
        subscribeToNewsletter(conFom)
            .then(() => {
                successNotification("Succesfully subscribed to newsletter")
            }).catch(error => {
            error.response.text().then(errorMessage => {
                errorNotification(errorMessage);
            });
        });

    }

    return (
        <Layout>
            <Content style={{
                backgroundColor: 'white',
                minHeight: '30vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div>
                    <h1>If you would like to be notify with every new trip, please subscribe</h1>
                    <form onSubmit={handleFormSubmit}>
                        <Input id="email" placeholder="Enter your email address" style={{marginBottom: 16}}/>
                        <Button type="primary" size="large" block htmlType="submit">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </Content>
        </Layout>
    );
};

export default Newsletter;