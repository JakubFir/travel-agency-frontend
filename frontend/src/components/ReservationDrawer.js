import {Button, Col, Drawer, Form, Input, Row, Table} from "antd";
import {useEffect, useState} from "react";
import {fetchHotelsByCoordinates} from "../clients/hotelClient";
import {DatePicker,} from 'antd';
import {errorNotification, infoNotification, successNotification} from "../notifications/Notifications";
import dayjs from 'dayjs';
import {bookTrip} from "../clients/BookingClient";



function ReservationDrawer({
                               showDrawer,
                               setShowDrawer,
                               selectedDestination,
                               selectedHotel,
                               selectedFlight,
                               selectedTrip,
                               selectedDate
                           }) {
    const jwtToken = localStorage.getItem("jwt");
    const [userId, setUserId] = useState(null)
    const [visible, setVisible] = useState(false);
    const [availableHotels, setAvailableHotels] = useState([]);
    const [id, setHotelId] = useState([]);

    useEffect(() => {
        form.setFieldsValue({
            destination: selectedDestination || '',
            placeName: selectedHotel || '',
            flightId: selectedFlight || '',
            hotelId: id || '',
            tripId: selectedTrip || ''

        })
        if (!jwtToken) {
        } else {
            const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
            setUserId(decodedToken.userId)
        }
        ;

    }, [selectedDestination, selectedHotel, selectedFlight, id, selectedTrip]);

    const close = () => {
        setVisible(false)
    }
    const onClose = () => {
        form.setFieldsValue({
            destination: '',
            placeName: '',
            flightId: '',
        });
        setShowDrawer(false);
    };
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const formattedCheckInDate = dayjs(values.checkInDate).format('YYYY-MM-DD');
        values.checkInDate = formattedCheckInDate;
        const formattedCheckOutDate = dayjs(values.checkOutDate).format('YYYY-MM-DD');
        values.checkOutDate = formattedCheckOutDate;
        const reservationInformation = {
            checkInDate: formattedCheckInDate,
            checkOutDate: formattedCheckOutDate,
            destination: values.destination,
            adultsNumber: values.adultsNumber,
            placeName: values.placeName,
        };
        fetchHotels(reservationInformation);
    };

    const handleHotelId = (id) => {
        setHotelId(id)
    }
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const fetchHotels = (reservationInformation) => {
        fetchHotelsByCoordinates(reservationInformation)
            .then((res) => res.json())
            .then(data => {
                setAvailableHotels(data.result);
                infoNotification("Hotels updated")
            }).catch(error => {
            error.response.text().then(errorMessage => {
                errorNotification(errorMessage);
            });
        });
    };
    const columns = [
        {
            title: 'Adress',
            dataIndex: 'address_trans',
            key: 'address_trans',
        },
        {
            title: 'City',
            dataIndex: 'city_in_trans',
            key: 'city_in_trans',
        },
        {
            title: 'Has free parking',
            dataIndex: 'has_free_parking',
            key: 'has_free_parking',
        },
        {
            title: 'Hotel id',
            dataIndex: 'hotel_id',
            key: 'hotel_id',
        },
        {
            title: 'Review score',
            dataIndex: 'review_score',
            key: 'review_score',
        },
        {
            title: 'Min total price',
            dataIndex: 'min_total_price',
            key: 'min_total_price',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, hotel) => (
                <Button onClick={() => handleHotelId(hotel.hotel_id)}> Select</Button>
            ),
        },
    ];

    const showHotels = () => {
        return (
            <Drawer
                title="Basic Drawer"
                placement="left"
                onClose={close}
                open={visible}
                width={1000}
            >
                <div style={{textAlign: 'right'}}>
                    <Table columns={columns} dataSource={availableHotels} bordered/>
                </div>
            </Drawer>
        );
    };

    const handleSubmitRequest = (request) => {
        if (userId == null) {
            errorNotification("Please log in to book a trip")
            return;
        }
        const formattedCheckInDate = dayjs(request.checkInDate).format('YYYY-MM-DD');
        request.checkInDate = formattedCheckInDate;
        const formattedCheckOutDate = dayjs(request.checkOutDate).format('YYYY-MM-DD');
        request.checkOutDate = formattedCheckOutDate;
        const formattedRequest = {
            tripId: parseInt(request.tripId),
            flightRequest: {
                flightId: parseInt(request.flightId),
                departureDate: selectedDate
            },
            bookingHotelRequest: {
                checkInDate: formattedCheckInDate,
                checkOutDate: formattedCheckOutDate,
                destination: request.destination,
                adultsNumber: request.adultsNumber,
                placeName: request.placeName,
                hotelId: parseInt(request.hotelId)
            }
        };
        console.log(formattedRequest);
        bookTrip(formattedRequest, userId).then(() =>
            successNotification("trip booked successfully")
        ).catch(error => {
            error.response.text().then(errorMessage => {
                errorNotification(errorMessage);
            });
        });
    }

    return <Drawer
        title={"Show hotels in city"}
        width={720}
        onClose={onClose}
        open={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onClose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
                checkInDate: "",
                checkOutDate: "",
                placeName: selectedHotel,
                destination: selectedDestination || '',
                adultsNumber: undefined,
                hotelId: undefined,
                flightId: selectedFlight,
                tripId: undefined
            }}

        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="checkInDate"
                        label="Check in Date"
                        rules={[{required: true, message: 'yyyy-mm-dd'}]}
                    >
                        <DatePicker placeholder=""/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="checkOutDate"
                        label="Check out date"
                        rules={[{required: true, message: 'yyyy-mm-dd'}]}
                    >
                        <DatePicker placeholder=""/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="placeName"
                        label="Place Name"
                        rules={[{required: true, message: 'place name'}]}
                    >
                        <Input placeholder="here goes title"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="destination"
                        label="Destination"
                        rules={[{required: true, message: 'destination'}]}
                    >
                        <Input placeholder="here goes title"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="adultsNumber"
                        label="Number of adults"
                        rules={[{required: true, message: ''}]}
                    >
                        <Input placeholder=""/>
                    </Form.Item>
                </Col>
            </Row>
            <Col span={12}>
                <Form.Item>
                    <Button
                        onClick={() => setVisible(true)}
                        type="primary" htmlType="submit">
                        Check Hotels
                    </Button>
                </Form.Item>
            </Col>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="hotelId"
                        label="Selected Hotel"
                        rules={[{required: false, message: 'hotelId'}]}
                    >
                        <Input placeholder="hotelId"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="tripId"
                        label="Selected Trip"
                        rules={[{required: false, message: 'hotelId'}]}
                    >
                        <Input placeholder="hotelId"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="flightId"
                        label="Selected Flight"
                        rules={[{required: false, message: 'hotelId'}]}
                    >
                        <Input placeholder="hotelId"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button
                            onClick={() => handleSubmitRequest(form.getFieldsValue())}
                            type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        {showHotels()}
    </Drawer>
}

export default ReservationDrawer;