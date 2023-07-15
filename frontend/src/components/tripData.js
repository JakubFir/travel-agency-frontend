import {Radio} from 'antd';

const generateColumns = (setHotels, fetchHotels, fetchFlights,handleReservationClick) => {
    const columns = [
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Destinations IataCode',
            dataIndex: 'destinationsIataCode',
            key: 'destinationsIataCode',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, trip) => (
                <Radio.Group>
                    <Radio.Button
                        type="primary"
                        onClick={() => {
                            fetchFlights(trip);
                        }}
                    >
                        View Available Flights
                    </Radio.Button>

                    <Radio.Button
                        type="primary"
                        onClick={() => {
                            setHotels([]);
                            fetchHotels(trip.destination);
                        }}
                    >
                        View Available Hotels
                    </Radio.Button>

                    <Radio.Button type="primary" onClick={() =>handleReservationClick(trip)
                    }>
                        Make Reservation
                    </Radio.Button>
                </Radio.Group>
            ),
        },
    ];

    return columns;
};

export default generateColumns;