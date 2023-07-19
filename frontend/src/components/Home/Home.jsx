import {Button, Form, InputGroup, Container} from 'react-bootstrap'

function Home(){

    return(
        <>
            <div className='home text-light'>
                <Container className='px-5 pt-5'>
                    <h1 style={{fontSize: `4vw`}}>Life's Too Short For Bad Seats.</h1>
                </Container>
                <Container className='py-5'style={{width: `30vw`, display: `flex`, flexDirection: 'column', alignItems: `center`}}>
                    <InputGroup className= 'mb-3'>
                        <Form.Control placeholder='Search for Venue or Event'></Form.Control>
                        <Button>Search</Button>
                    </InputGroup>
                    <p>Book smarter with us.</p>
                </Container>
            </div>
            <Container>

            </Container>
        </>

    )
}

export default Home