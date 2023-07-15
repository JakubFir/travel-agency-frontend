import {Button, Col, DatePicker, Form, Modal, Row, Table} from 'antd';
import dayjs from "dayjs";

const FlightModal = ({flights, visible, cancel,selectFlight,departureDate}) => {

    const handleFlightSelect = (flightId) => {
        selectFlight(flightId);
    };
    const handleDepartureDate = (date) => {
        const formattedCheckInDate = dayjs(date).format('YYYY-MM-DD');
        departureDate(formattedCheckInDate);
    }

    const flightColumns = () => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Departure',
            dataIndex: 'itineraries',
            key: 'departure',
            render: (itineraries) => {
                const departure = itineraries[0]?.segments[0]?.departure;
                return departure ? `${departure.iataCode} (${departure.at})` : '';
            },
        },
        {
            title: 'Arrival',
            dataIndex: 'itineraries',
            key: 'arrival',
            render: (itineraries) => {
                const arrival = itineraries[0]?.segments[itineraries[0].segments.length - 1]?.arrival;
                return arrival ? `${arrival.iataCode} (${arrival.at})` : '';
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price.total.toFixed(2)}`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, flight) => (
                <Button onClick={()=> handleFlightSelect(flight.id)}> Select</Button>
            ),
        },
    ];

    return (
        <Modal
            title="Flights"
            open={visible}
            onCancel={cancel}
            footer={null}
            width={1000}

        >
            <Table columns={flightColumns()} dataSource={flights} bordered/>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="checkInDate"
                        label="Departure date"
                        rules={[{required: true, message: 'yyyy-mm-dd'}]}
                    >
                        <DatePicker placeholder=""  onChange={(date) => handleDepartureDate(date)}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Modal>
    );
};

export default FlightModal;