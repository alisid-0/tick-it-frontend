import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import Transition from '../Transition'
function AddEventAndVenue() {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventStartTime: '',
    eventEndTime: '',
    eventPictureLink: '',
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueState: '',
    venueCountry: '',
    venueCapacity: '',
    venueWebsite: '',
    venuePictureLink: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Create a new venue
    const venueFormData = {
      name: eventData.venueName,
      address: eventData.venueAddress,
      city: eventData.venueCity,
      state: eventData.venueState,
      country: eventData.venueCountry,
      capacity: eventData.venueCapacity,
      website: eventData.venueWebsite,
      picture_link: eventData.venuePictureLink,
    };

    const venueResponse = await fetch('http://54.193.32.199:8000/venues/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venueFormData),
    });

    const venueData = await venueResponse.json();

    // Step 2: Create a new event associated with the newly created venue
    const eventFormData = {
      name: eventData.eventName,
      description: eventData.eventDescription,
      date: eventData.eventDate,
      start_time: eventData.eventStartTime,
      end_time: eventData.eventEndTime,
      picture_link: eventData.eventPictureLink,
      venue: venueData.venue_url, // Use the venue_url from the venue response
      venue_name: eventData.venueName,
    };

    const eventResponse = await fetch('http://54.193.32.199:8000/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventFormData),
    });

    const newEventData = await eventResponse.json();

    // Reset the form data after submitting
    setEventData({
      eventName: '',
      eventDescription: '',
      eventDate: '',
      eventStartTime: '',
      eventEndTime: '',
      eventPictureLink: '',
      venueName: '',
      venueAddress: '',
      venueCity: '',
      venueState: '',
      venueCountry: '',
      venueCapacity: '',
      venueWebsite: '',
      venuePictureLink: '',
    });

    // Display a success message or redirect to a success page if needed
    console.log('New event and venue created successfully:', newEventData);
  };
  return (
    <Container
      style={{
        maxWidth: '500px',
        margin: 'auto',
        paddingTop: '50px',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
      }}
    >
     <Transition>
      <Form onSubmit={handleSubmit}>
        {/* Venue Details */}
        <h3 style={{ marginBottom: '20px', color: 'white' }}>Add a new Venue</h3>
         
        <Form.Group controlId="venueName">
          <Form.Label>Venue Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter venue name"
            value={eventData.venueName}
            onChange={(e) => setEventData({ ...eventData, venueName: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="venueAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter venue address"
            value={eventData.venueAddress}
            onChange={(e) => setEventData({ ...eventData, venueAddress: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="venueCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter venue city"
            value={eventData.venueCity}
            onChange={(e) => setEventData({ ...eventData, venueCity: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="venueState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter venue state"
            value={eventData.venueState}
            onChange={(e) => setEventData({ ...eventData, venueState: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="venueCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter venue country"
            value={eventData.venueCountry}
            onChange={(e) => setEventData({ ...eventData, venueCountry: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="venueCapacity">
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter venue capacity"
            value={eventData.venueCapacity}
            onChange={(e) => setEventData({ ...eventData, venueCapacity: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="venueWebsite">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter venue website"
            value={eventData.venueWebsite}
            onChange={(e) => setEventData({ ...eventData, venueWebsite: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="venuePictureLink">
          <Form.Label>Picture Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter venue picture link"
            value={eventData.venuePictureLink}
            onChange={(e) => setEventData({ ...eventData, venuePictureLink: e.target.value })}
            required
          />
        </Form.Group>

        {/* Event Details */}
        <h3 style={{ marginTop: '20px', color: 'white' }}>Add a new Event</h3>
        <Form.Group controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event name"
            value={eventData.eventName}
            onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventDescription">
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter event description"
            value={eventData.eventDescription}
            onChange={(e) => setEventData({ ...eventData, eventDescription: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventDate">
          <Form.Label>Event Date</Form.Label>
          <Form.Control
            type="date"
            value={eventData.eventDate}
            onChange={(e) => setEventData({ ...eventData, eventDate: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventStartTime">
          <Form.Label>Event Start Time</Form.Label>
          <Form.Control
            type="time"
            value={eventData.eventStartTime}
            onChange={(e) => setEventData({ ...eventData, eventStartTime: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventEndTime">
          <Form.Label>Event End Time</Form.Label>
          <Form.Control
            type="time"
            value={eventData.eventEndTime}
            onChange={(e) => setEventData({ ...eventData, eventEndTime: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventPictureLink">
          <Form.Label>Event Picture Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event picture link"
            value={eventData.eventPictureLink}
            onChange={(e) => setEventData({ ...eventData, eventPictureLink: e.target.value })}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="btn-primary"
          style={{ marginTop: '20px', background: '#007bff', border: 'none' }}
        >
          Submit
        </Button>
      </Form>
      </Transition>
    </Container>
  );
}

export default AddEventAndVenue;

 