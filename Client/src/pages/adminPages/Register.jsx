import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import OutlinedInput from '@mui/material/OutlinedInput';
import Sidebar from '../../components/admin/Sidebar';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Button } from '@mui/material'

const Container = styled.div`
   display: flex;
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
// const Button = styled.button`
//     width: 40%; padding: 15px 20px; margin-top: 20px;
//     border: none;
    
// `
const Error = styled.span`
   margin: 20px;
`
function Register() {
    const navigate = useNavigate();
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Password, setPassword] = useState("");
    const [isAdmin, setisAdmin] = useState(false)
    const [error, seterror] = useState(false)
    console.log(isAdmin)
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", {FirstName, LastName ,Email, Phone, Password, isAdmin});
            console.log(res.data)
            navigate("/admin/users");
        } catch (err) {
            console.log(err)
            seterror(true)
        }
    }
  
    return (
    <Container>
        <Sidebar />
        <Wrapper>
            <FormContainer>
                <Title>Create a new accout</Title>
                <Form>
                   <OutlinedInput fullWidth={true} placeholder="First name" onChange={e => setFirstName(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Last name"onChange={e => setLastName(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Email"onChange={e => setEmail(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Phone number"onChange={e => setPhone(e.target.value)}/>
                   <OutlinedInput fullWidth={true} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

                   <select defaultValue={false} onChange={e => setisAdmin(e.target.value)}>
                       <option value={false}> non admin</option>
                       <option value={true}>admin</option>
                   </select>
                </Form>
                {error && <Error>Somethinng went wrong</Error>}
                <Button sx={{ paddingLeft: '40px', paddingRight: '40px', marginTop: '20px', borderRadius: '10px'}}variant="contained" onClick={handleRegister}><DoneOutlineIcon /></Button>
                
            </FormContainer>
            
        </Wrapper>
        
    </Container>
    
  )
}

export default Register