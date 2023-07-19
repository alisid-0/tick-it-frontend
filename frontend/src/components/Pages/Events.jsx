import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import axios from "axios"
import ReactReadMoreReadLess from 'react-read-more-read-less'

function Events(){

    const [events, setEvents] = useState(null)

    useEffect(()=>{
        const getEvents = async() => {
            const eventAPI = await axios.get('http://54.193.32.199:8000/events/')
            console.log(eventAPI.data)
            setEvents(eventAPI.data)
            return eventAPI.data
        }
        getEvents()
    }, [])



    return(
        <div>
            <Container className='py-5'>
                <Row xl={3} md={2} sm={1} style={{justifyContent: `space-evenly`, gap: `1rem`}}>
                    {events && events.map((event, index)=>(
                        <Col key={index}>
                            <Container className='my-4 p-0'  style={{borderRadius: `50px`,
                                background: `#e0e0e0`,
                                boxShadow:  `20px 20px 60px #bebebe, -20px -20px 60px #ffffff`,
                                overflow: 'hidden'}}
                                >
                                    <img src={event.picture_link} style={{width: '100%', maxHeight: `300px`, aspectRatio: '16/9'}}></img>
                                    <Container className='px-5 pb-4'>
                                        <p className='pt-3'>{event.start_time} to {event.end_time}</p>
                                        <p><a href={event.venue}>Venue</a></p>
                                        <ReactReadMoreReadLess
                                            charLimit={170}
                                            readMoreText={"Read more ▼"}
                                            readLessText={"Read less ▲"}
                                        >
                                            {event.description}
                                        </ReactReadMoreReadLess>
                                    </Container>
                            </Container> 
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Events