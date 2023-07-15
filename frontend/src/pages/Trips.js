import {useEffect, useState} from "react";
import {getFlights, getHotels, getTrips} from "../clients/clients";
import {errorNotification, infoNotification} from "../notifications/Notifications";
import generateColumns from "../components/tripData";
import {Layout, Table,} from "antd";
import FlightModal from "../components/FlightModal";
import HotelModal from "../components/HotelModal";
import ReservationDrawer from "../components/ReservationDrawer";
import dayjs from "dayjs";

const {Content, Footer} = Layout;

function Trips() {
    const jwtToken = localStorage.getItem("jwt");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null)
    const [trips, setTrips] = useState([]);
    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false)
    const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
    const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null);


    const handleFlightModalOpen = () => {
        setIsFlightModalOpen(true);
    };

    const handleFlightModalClose = () => {
        setIsFlightModalOpen(false);
    };

    const handleHotelModalOpen = () => {
        setIsHotelModalOpen(true);
    };

    const handleHotelModalClose = () => {
        setIsHotelModalOpen(false);
    };

    const fetchFlights = (trip, date) => {
        if (userId == null) {
            errorNotification("Login to view available flights");
            return;
        }
        const formattedCheckInDate = dayjs(new Date()).format('YYYY-MM-DD');
        if (date == null) {
            date = formattedCheckInDate;
        }
        setSelectedTrip(trip)
        setSelectedDate(date)
        console.log(date)
        handleFlightModalOpen()
        getFlights(trip.tripId, userId, date)
            .then((res) => res.json())
            .then(data => {
                setFlights(data.data);
                infoNotification("Flights updated")
            }).catch(error => {
            error.response.text().then(errorMessage => {
                errorNotification(errorMessage);
            });
        });
    };

    const fetchHotels = (destination) => {
        handleHotelModalOpen();
        getHotels(destination)
            .then(res => res.json())
            .then(data => {
                setHotels(data)
                infoNotification("Hotels updated")
            }).catch(error => {
            error.response.text().then(errorMessage => {
                errorNotification(errorMessage);
            });
        });
    };
    const fetchTrips = () => {
        getTrips()
            .then(res => res.json())
            .then(data => {
                setTrips(data);
                infoNotification("Trips updated")
            }).catch(error => {
            error.response.text().then(errorMessage => {
                errorNotification(errorMessage);
            });
        });
    };
    const handleHotelSelect = (hotelName) => {
        setSelectedHotel(hotelName);
    };
    const handleFlightSelect = (flightId) => {
        setSelectedFlight(flightId);
    }
    const handleDepartureDate = (date) => {
        fetchFlights(selectedTrip, date)
    }
    const handleReservationClick = (trip) => {
        console.log(trip);
        setSelectedDestination(trip.destination)
        setSelectedTrip(trip.tripId)
        setShowDrawer(true);
    };
    const columns = generateColumns(setHotels, fetchHotels, fetchFlights, handleReservationClick);
    const renderTrips = () => {
        return (
            <>
                <Table columns={[...columns]} dataSource={trips} bordered/>
                <FlightModal
                    visible={isFlightModalOpen}
                    cancel={handleFlightModalClose}
                    flights={flights}
                    selectFlight={handleFlightSelect}
                    departureDate={handleDepartureDate}
                />
                <HotelModal
                    visible={isHotelModalOpen}
                    cancel={handleHotelModalClose}
                    hotels={hotels}
                    selectHotel={handleHotelSelect}

                />
                <ReservationDrawer
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    selectedDestination={selectedDestination}
                    selectedHotel={selectedHotel}
                    selectedFlight={selectedFlight}
                    selectedTrip={selectedTrip}
                    selectedDate={selectedDate}
                />
            </>
        );
    };

    useEffect(() => {
        fetchTrips();
        if (!jwtToken) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true);
            const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
            setUserId(decodedToken.userId)
        }
    }, []);

    return (
        <div className='app-container'>
            <Layout style={{minHeight: '100vh'}}>
                <Content className="content-container" style={{margin: '0 16px'}}>
                    {renderTrips()}
                </Content>
                <Footer style={{textAlign: 'center'}}>:)</Footer>
            </Layout>
        </div>
    );
}

export default Trips;
