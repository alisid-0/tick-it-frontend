import { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Container, Carousel } from 'react-bootstrap';
import Transitions from '../Transition';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [lastTenEvents, setLastTenEvents] = useState([]);

  useEffect(() => {
    fetchLastTenEvents();
  }, []);

  const fetchLastTenEvents = () => {
    const lastTenEventsEndpoint = 'http://54.193.32.199:8000/events/';
    const lastTenEventsLimit = 10;

    fetch(lastTenEventsEndpoint)
      .then((response) => response.json())
      .then((data) => setLastTenEvents(data.slice(-lastTenEventsLimit)))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleSearch = () => {
    const venuesEndpoint = `http://54.193.32.199:8000/venues/?search=${searchQuery}`;
    const eventsEndpoint = `http://54.193.32.199:8000/events/?search=${searchQuery}`;

    Promise.all([
      fetch(venuesEndpoint).then((response) => response.json()),
      fetch(eventsEndpoint).then((response) => response.json())
    ])
      .then(([venuesData, eventsData]) => {
        const filteredVenues = venuesData.filter((venue) =>
          venue.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const combinedData = filteredVenues.map((venue) => {
          const eventsForVenue = eventsData.filter((event) => event.venue === venue.venue_url);
          return { ...venue, events: eventsForVenue };
        });

        setSearchResults(combinedData);
      });
  };

  return (
    <div>
      <Transitions>
        <div className='home text-light' style={{ boxShadow: '0vw 1vw 2vw 1vw rgba(0, 0, 0, 0.318)' }}>
          <Container className='px-5 pt-5'>
            <h1 style={{ fontSize: '4vw', marginBottom: '1rem', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
              Life's Too Short For Bad Seats.
            </h1>
            <p
              style={{
                fontSize: '1.5vw',
                maxWidth: '60vw',
                margin: '0 auto',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Welcome to our ticket booking platform. Find the best venues and events for a memorable experience. Search for your favorite venues or events, and book your tickets in advance to secure the best seats!
            </p>
          </Container>
          <Container
            className='py-5'
            style={{ width: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <InputGroup className='mb-3'>
              <Form.Control
                placeholder='Search for Venue or Event'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                style={{ backgroundColor: '#2A2E45', color: '#ffffff', borderColor: '#2A2E45' }}
              >
                Search
              </Button>
            </InputGroup>
            <p>Book smarter with us.</p>
          </Container>
        </div>
      </Transitions>

      <Container>
        {searchResults.length === 0 && searchQuery !== '' ? null : (
          searchResults.map((venue) => (
            <div
              key={venue.venue_url}
              style={{
                borderRadius: '15px',
                background: '#CFCBC9',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                margin: '1rem',
                padding: '1rem',
              }}
            >
              <h1 style={{ fontSize: `5vw` }}>{venue.name}</h1>
              <p>
                Address: {venue.address}, {venue.city}, {venue.state}, {venue.country}
              </p>
              <p>Capacity: {venue.capacity}</p>
              <p>
                <a href={venue.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </p>

              <img src={venue.picture_link} alt="Venue" style={{ maxWidth: '80%', marginBottom: '1rem' }} />

              <h3 className='mt-5s'>Events:</h3>
              {venue.events.length > 0 ? (
                <Carousel interval={null} style={{ padding: '0 20px', margin: '10px 0', color: 'white' }}>
                  {venue.events.map((event) => (
                    <Carousel.Item key={event.event_url} className='text-dark py-5'>
                      <div>
                        <h4>{event.name}</h4>
                        <img className='mb-4' src={event.picture_link} alt="Event" style={{ maxWidth: '80%' }} />
                        <p>Date: {event.date}</p>
                        <p>Runtime: From {event.start_time} to {event.end_time}</p>
                        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <p style={{ maxWidth: '800px' }}>{event.description}</p>
                        </Container>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <p>No events found for this venue.</p>
              )}
            </div>
          ))
        )}
      </Container>

      
      <Container className='my-5'>
        <Transitions>
  <h2 style={{ color:'white', margin: '20px 0' }}className='text-center'>Featured Events</h2>
  {lastTenEvents.length > 0 ? (
    <Carousel interval={null} style={{ color:'white', margin: '20px 0' }}>
      {lastTenEvents.map((event) => (
        <Carousel.Item key={event.event_url}>
          <div className='d-flex flex-column align-items-center'>
            <h4>{event.name}</h4>
            <h5>Venue: {event.venue_name}</h5>
            <img className='mb-4' src={event.picture_link} alt="Event" style={{ boxShadow: '0px 20px 40px black', maxWidth: '80%', borderRadius: '10px' }} />
            <p>Date: {event.date}</p>
            <p>Runtime: From {event.start_time} to {event.end_time}</p>
            <Container className='my-3'>
              <p style={{ maxWidth: '100vmin', marginLeft:'10vmin', textAlign:'left' }}>{event.description}</p>
            </Container>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <p>No  events available.</p>
  )}
  </Transitions>
</Container>

    </div>
  );
}

export default Home;
