import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import VenueDetails from "./VenueDetails";

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

  const handleVenueClick = (venue) => {
    setSelectedVenue((prevSelectedVenue) => (prevSelectedVenue && prevSelectedVenue.id === venue.id) ? null : venue);
  };

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
                <div style={{ cursor: "pointer" }}>
                  <Container
                    className="my-4 p-0"
                    style={{
                      borderRadius: `50px`,
                      background: `#e0e0e0`,
                      boxShadow: `20px 20px 60px #bebebe, -20px -20px 30px #020F12`,
                      overflow: "hidden",
                    }}
                    onClick={() => handleVenueClick(venue)}
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
                  </Container>
                </div>
                {selectedVenue && selectedVenue.id === venue.id && <VenueDetails venue={selectedVenue} />}
              </Col>
            ))
          ) : (
            <p>No venues found.</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Venues;
