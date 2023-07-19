import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import axios from "axios"

function Venues(){

    const [venues, setVenues] = useState(null)

    useEffect(()=>{
        const getVenues = async() => {
            const venueAPI = await axios.get('http://54.193.32.199:8000/venues/')
            console.log(venueAPI)
            setVenues(venueAPI)
            return venueAPI
        }
        getVenues()
    }, [])


    return(
        <div>
            <h1>Venues</h1>
        </div>
    )
}

export default Venues