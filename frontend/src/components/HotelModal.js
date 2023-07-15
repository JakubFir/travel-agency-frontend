import {Button, Modal, Table} from 'antd';

const HotelModal = ({ hotels, visible, cancel, selectHotel }) => {

    const handleHotelSelect = (hotel) => {
        selectHotel(hotel.name);
    };

    const hotelColumns = () => [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'City',
            dataIndex: 'city_name',
            key: 'city_name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Number of Hotels',
            dataIndex: 'hotels',
            key: 'hotels',
        },
        {
            title: 'Destination Type',
            dataIndex: 'dest_type',
            key: 'dest_type',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, hotel) => (
                <Button onClick={()=> handleHotelSelect(hotel)}> Select</Button>
            ),
        },
    ];


    return (
        <Modal
            title="Hotels"
            open={visible}
            onCancel={cancel}
            footer={null}
            width={1000}

        >
            <Table columns={hotelColumns()} dataSource={hotels} bordered />
        </Modal>
    );
};

export default HotelModal;