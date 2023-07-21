import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import axios from "axios";
// import ReactReadMoreReadLess from 'react-read-more-read-less';
import Transitions from "../Transition";

function Events() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventAPI = await axios.get('http://54.193.32.199:8000/events/');
        setEvents(eventAPI.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching events. Please try again later.");
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalShow(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Transitions>
      <Container className='py-5'>
        <Row xl={3} md={2} sm={1} style={{ justifyContent: `space-evenly`, gap: `1rem` }}>
          {events && events.map((event, index) => (
            <Col key={index}>
              <div style={{ cursor: "pointer" }}>
                <Container
                  className='my-4 p-0'
                  style={{
                    borderRadius: `15px`,
                    background: `#e0e0e0`,
                    boxShadow: `20px 20px 60px #bebebe, -20px -20px 30px #020F12`,
                    overflow: "hidden",
                  }}
                  onClick={() => handleEventClick(event)}
                >
                  <div style={{ width: '100%', maxHeight: `300px`, aspectRatio: '16/9', borderRadius: '15px 15px 0 0', overflow: 'hidden' }}>
                    <img src={event.picture_link} alt='Event' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {/* <Container className='px-4 pb-3'>
                    <h5 className='pt-1 event-date'>{event.date}</h5>
                    <h5 className='pt-1 event-name'>{event.name}</h5>
                    <p className='event-time' style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>From: {event.start_time} Until: {event.end_time}</p>
                    
                    <ReactReadMoreReadLess
                      charLimit={170}
                      readMoreText={"Read more ▼"}
                      readLessText={"Read less ▲"}
                    >
                      {JSON.stringify(event.description)}
                    </ReactReadMoreReadLess>
                  </Container> */}
                </Container>
                
              </div>
              
            </Col>
          ))}
          
        </Row>
        
      </Container>
      </Transitions>

       
      {selectedEvent && (
       <Modal
       show={modalShow}
       onHide={() => {
         setSelectedEvent(null);
         setModalShow(false);
       }}
       aria-labelledby="contained-modal-title-vcenter"
     >
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter">
           <h5>{selectedEvent.name}</h5>
           <h5>Venue: {selectedEvent.venue_name}</h5>  
         </Modal.Title>
       </Modal.Header>
       <Modal.Body className="grid-modal">
         <Container>
           <Row>
             <Col>Date: {selectedEvent.date}</Col>
           </Row>
           <Row>
             <Col>
               From {selectedEvent.start_time} to {selectedEvent.end_time}
             </Col>
           </Row>
           <Row>
             <Col className="py-2">
               <img src={selectedEvent.picture_link} style={{ maxWidth: '100%' }} alt="Event" />
             </Col>
           </Row>
           <Row>
             <Col className="py-2">{selectedEvent.description}</Col>
           </Row>
         </Container>
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={() => setModalShow(false)}>Close</Button>
       </Modal.Footer>
     </Modal>
     
      )}
    </div>
  );
}

export default Events;
