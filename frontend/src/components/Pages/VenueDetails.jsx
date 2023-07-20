import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function VenueDetails({ venue }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventsAPI = await axios.get(venue.venue_url);
        setEvents(eventsAPI.data.events);
        setLoading(false);
      } catch (error) {
        setError("Error fetching events. Please try again later.");
        setLoading(false);
      }
    };
    getEvents();
  }, [venue]);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Events:</h3>
      {events.length > 0 ? (
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={false}
          style={{ maxWidth: "800px", margin: "0 auto" }}
          renderThumbs={() => null} // Hide the carousel thumbnails
        >
          {events.map((event) => (
            <div key={event.id} style={{ display: "flex", justifyContent: "center" }}>
              <Container
                className="event-container"
                style={{
                  borderRadius: "15px",
                  background: "#CFCBC9",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  margin: "1rem",
                  padding: "1rem",
                  maxWidth: "600px", // Limit the slide width
                }}
              >
                <h4>{event.venue_name}</h4>
                <img
                  src={event.picture_link}
                  alt="Event"
                  style={{ width: "100%", height: "300px", objectFit: "cover", marginBottom: "1rem" }}
                />
                <p>Description: {event.description}</p>
                <p>Date: {event.date}</p>
                <p>Start Time: {event.start_time}</p>
                <p>End Time: {event.end_time}</p>
              </Container>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>No events found for this venue.</p>
      )}
    </div>
  );
}

export default VenueDetails;
