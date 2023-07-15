import React, {useEffect, useState} from 'react';
import { Collapse, Descriptions, Layout, Table} from 'antd';
import {fetchBookedTrips, fetchUserInfo} from "../clients/UserClient";

const flightColumns = () => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Departure',
        dataIndex: 'departure',
        key: 'departure',
    },
    {
        title: 'Arrival',
        dataIndex: 'arrival',
        key: 'arrival',

    },
];
const hotelColumns = () => [
    {
        title: 'City',
        dataIndex: 'cityInTrans',
        key: 'cityInTrans',
    },
    {
        title: 'Zip code',
        dataIndex: 'zip',
        key: 'zip',
    },
    {
        title: 'Review score',
        dataIndex: 'reviewScore',
        key: 'reviewScore',
    },
    {
        title: 'Address',
        dataIndex: 'addressTrans',
        key: 'addressTrans',
    },
    {
        title: 'Free parking',
        dataIndex: 'hasFreeParking',
        key: 'hasFreeParking',
    },
    {
        title: 'Price',
        dataIndex: 'minTotalPrice',
        key: 'minTotalPrice',
    },
];


function Profile() {
    const [data, setData] = useState(null);
    const [userId, setUserId] = useState(null)
    const [flightInfo, setFlightInfo] = useState(null)
    const [hotelInfo, setHotelInfo] = useState(null)
    const [userInfo, setUserInfo] = useState(null)


    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt");
        const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
        setUserId(decodedToken.userId);

        fetchBookedTrips(decodedToken.userId)
            .then(res => res.json())
            .then(data => {
                const flights = data.map(trip => trip.flight);
                const hotels = data.map(trip => trip.hotel);
                setFlightInfo(flights);
                setHotelInfo(hotels);
            })
        fetchUserInfo(decodedToken.userId)
            .then(res => res.json())
            .then(data => setUserInfo(data))
    }, []);

    const items = [
        {
            key: '1',
            label: 'Booked flights',
            children: <Table columns={flightColumns()} bordered dataSource={flightInfo}/>
            ,
        },
        {
            key: '2',
            label: 'Booked hotels',
            children: <Table columns={hotelColumns()} bordered dataSource={hotelInfo}/>,
        },
    ];
    return (
        <>
            <div className='app-container'>
                <Layout style={{minHeight: '100vh'}}>
                    <Descriptions title="User Info">
                        {userInfo && (
                            <>
                                <Descriptions.Item label="username">{userInfo.username}</Descriptions.Item>
                                <Descriptions.Item label="name">1{userInfo.name}</Descriptions.Item>
                                <Descriptions.Item label="email">{userInfo.email}</Descriptions.Item>
                                <Descriptions.Item label="origin">{userInfo.origin}</Descriptions.Item>
                                <Descriptions.Item label="originIataCode">{userInfo.originIataCode}</Descriptions.Item>
                            </>
                        )}

                    </Descriptions>
                    <Descriptions title="User trips">
                        <Descriptions.Item>
                            <Collapse items={items} defaultActiveKey={[' ']}  style={{ width: '100%' }}/>
                        </Descriptions.Item>
                    </Descriptions>
                </Layout>
            </div>
        </>
    );
}

export default Profile;