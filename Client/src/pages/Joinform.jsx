import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import OutlinedInput from '@mui/material/OutlinedInput';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Container = styled.div`
   display: flex; flex-direction: column;
`
const Wrapper = styled.div`
    height: 80vh; width: 90vw;
    display: flex; justify-content: center;
    align-items: center; 
`
const FormContainer = styled.div`
    width: 40%; display: flex;flex-direction: column;
    align-items: center; justify-content: center;
`
const Title = styled.h1`
   font-size: 24px;
   font-weight: 300;
`
const Form = styled.form`
   display: flex; flex-wrap: wrap;
`
const Button = styled.button`
    width: 40%; padding: 15px 20px;
    border: none;
    
`
const Error = styled.span`
   margin: 20px;
`
function JoinForm() {
    const navigate = useNavigate();
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [error, seterror] = useState(false)
    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/join", {FirstName, LastName ,Email});
            console.log(res.data)
            navigate("/");
        } catch (err) {
            console.log(err)
            seterror(true)
        }
    }
  
    return (
    <Container>
        <Navbar />
        <Wrapper>
            <FormContainer>
                <Title> Join Us</Title>
                <Form>
                   <OutlinedInput fullWidth={true} placeholder="First name" onChange={e => setFirstName(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Last name"onChange={e => setLastName(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Email"onChange={e => setEmail(e.target.value)}/>
                </Form>
                {error && <Error>Somethinng went wrong</Error>}
                <Button onClick={handleJoin}>confirm and send form</Button>
                
            </FormContainer>
            
        </Wrapper>
        <Footer />
    </Container>
    
  )
}

export default JoinForm