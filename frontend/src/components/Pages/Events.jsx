import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import axios from "axios";
import ReactReadMoreReadLess from 'react-read-more-read-less';

function Events() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

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

  console.log(events)

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalShow(true);
  };

  const handleChange = (e) => {
    setSelectedEvent({ ...selectedEvent, [e.target.name]: e.target.value })
    console.log(selectedEvent)
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(selectedEvent, `http://54.193.32.199:8000/events/${selectedEvent.id}`)
      const response = await axios.put(`http://54.193.32.199:8000/events/${selectedEvent.id}`, selectedEvent)
      console.log(response)
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      console.log(selectedEvent, `http://54.193.32.199:8000/events/${selectedEvent.id}`)
      const response = await axios.delete(`http://54.193.32.199:8000/events/${selectedEvent.id}`)
      console.log(response)
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Container className='py-5'>
        <Row xl={3} md={2} sm={1} xs={1} style={{ justifyContent: `space-evenly`, gap: `0` }}>
          {events && events.map((event, index) => (
            <Col key={index} className="px-3">
              <div style={{ cursor: "pointer" }}>
                <Container
                  className='my-4 p-0'
                  style={{
                    borderRadius: `15px`,
                    background: `#e0e0e0`,
                    boxShadow: `10px 10px 60px #bebebe, -10px -10px 30px #020F12`,
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


      {selectedEvent && (
        <Modal
          show={modalShow}
          onHide={() => {
            // setSelectedEvent(null);
            setModalShow(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h5>{selectedEvent.name}</h5>

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
          <Modal.Footer >
            <Button onClick={() => {
              setModalShow(false)
              setModalShow2(true)
            }}>Edit</Button>
            {/* <Button onClick={() => setModalShow(false)}>Close</Button> */}
          </Modal.Footer>
        </Modal>
      )}

      {selectedEvent && (
        <Modal
          show={modalShow2}
          onHide={() => {
            // setSelectedEvent(null);
            setModalShow2(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h5>{selectedEvent.name}</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-modal">

            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={selectedEvent.name} />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    onChange={handleChange}
                    value={selectedEvent.date} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="start_time" className="form-label">Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="start_time"
                  name="start_time"
                  onChange={handleChange}
                  value={selectedEvent.start_time} />
              </div>
              <div className="mb-3">
                <label htmlFor="end_time" className="form-label">End Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="end_time"
                  name="end_time"
                  onChange={handleChange}
                  value={selectedEvent.end_time} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                  type="email"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  value={selectedEvent.description} />
              </div>

            </form>

          </Modal.Body>
          <Modal.Footer className="w-100 d-flex">
            <Button
              type="button"
              className="btn btn-danger me-auto"
              onClick={handleDelete}>Save</Button>
            <Button
              className="btn btn-secondary"
              onClick={() => {
                setModalShow(false)
                setModalShow2(false)
              }}>Discard</Button>
            <Button
              type="button"
              className="btn btn-success"
              onClick={handleUpdate}>Save</Button>
          </Modal.Footer>
        </Modal>
      )}

    </div>
  );
}

export default Events;
