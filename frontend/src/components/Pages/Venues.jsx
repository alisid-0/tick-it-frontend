import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import axios from "axios"

function Venues(){

    const [venues, setVenues] = useState(null)

    useEffect(()=>{
        const getVenues = async() => {
            const venueAPI = await axios.get('http://54.193.32.199:8000/venues/')
            console.log(venueAPI.data)
            setVenues(venueAPI.data)
            return venueAPI.data
        }
        getVenues()
    }, [])



    return(
        <div>
            <Container className='py-5'>
                <Row xl={3} md={2} sm={1} style={{justifyContent: `space-evenly`, gap: `1rem`}}>
                    {venues && venues.map((venue, index)=>(
                        <Col>
                            <Container className='my-4 p-0' key={index} style={{borderRadius: `50px`,
                                background: `#e0e0e0`,
                                boxShadow:  `20px 20px 60px #bebebe, -20px -20px 60px #ffffff`,
                                overflow: 'hidden'}}
                                >
                                    <img src={venue.picture_link} style={{width: '100%', maxHeight: `300px`, aspectRatio: '16/9'}}></img>
                                    <h1 className='pt-3'>{venue.name}</h1>
                                    <p>{venue.address}, {venue.city}</p>
                                    <p>{venue.state}, {venue.country}</p>
                            </Container> 
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Venues