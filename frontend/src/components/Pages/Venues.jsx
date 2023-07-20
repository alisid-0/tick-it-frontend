import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Card } from "react-bootstrap";
import axios from "axios";

function Venues() {
  const [venues, setVenues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const venueAPI = await axios.get("http://54.193.32.199:8000/venues/");
        setVenues(venueAPI.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching venues. Please try again later.");
        setLoading(false);
      }
    };
    getVenues();
  }, []);

  const [modalShow, setModalShow] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Container className="py-5">
        <Row xl={3} md={2} sm={1} style={{ justifyContent: `space-evenly`, gap: `1rem`, }}>
          {venues && venues.length > 0 ? (
            venues.map((venue) => (
              <Col key={venue.id}>
                <div>
                  <Container
                    className="my-4 p-0"
                    style={{
                      borderRadius: `50px`,
                      background: `#e0e0e0`,
                      boxShadow: `20px 20px 60px #bebebe, -20px -20px 30px #020F12`,
                      overflow: "hidden",
                    }}
                    // onClick={() => handleVenueClick(venue)}
                  >
                    <img
                      src={venue.picture_link}
                      style={{ width: "100%", maxHeight: `300px`, aspectRatio: "16/9" }}
                      alt="Venue"
                    />
                    <h1 className="pt-3">{venue.name}</h1>
                    <p>
                      {venue.address}, {venue.city}
                    </p>
                    <p>
                      {venue.state}, {venue.country}
                    </p>
                    <Button className='mb-3'  onClick={()=> {setSelectedVenue(venue);setModalShow(true)}} >View Events</Button>
                  </Container>
                </div>

              </Col>
            ))
          ) : (
            <p>No venues found.</p>
          )}
          {selectedVenue && <EventModal show={modalShow} onHide={()=> {setSelectedVenue(null); setModalShow(false)}} venue={selectedVenue} />}
        </Row>
      </Container>
    </div>
  );
}

function EventModal({venue, ...props}){
    return(
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Upcoming Events for {venue.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    {venue.events.map((event,index)=>(
                        <Container key={index} className='my-3 pb-3' style={{borderBottom: `1px solid black`}}>
                            <Row>
                                <Col>
                                    Date: {event.date}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    From {event.start_time} to {event.end_time}
                                </Col>
                            </Row>
                            <Row>
                                <Col className='py-2'>
                                    <img src={event.picture_link} style={{maxWidth: '100%'}}></img>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='py-2'>
                                    {event.description}
                                </Col>
                            </Row>
                        </Container>
                    ))}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Venues;
